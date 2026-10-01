/*
 * A deliberately small, dependency-free motion example.
 *
 * The controllers below keep logical state separate from playback. That makes
 * an interrupted animation safe: only the latest request may commit its
 * completion, while reduced motion can commit the same state synchronously.
 * Open index.html through a local HTTP server to try the browser portion.
 */

const OPEN = 'open';
const CLOSED = 'closed';

const DISCLOSURE_FRAMES = Object.freeze({
  [OPEN]: Object.freeze({ opacity: 1, transform: 'translateY(0px)' }),
  [CLOSED]: Object.freeze({ opacity: 0, transform: 'translateY(-8px)' }),
});

function frameFor(state) {
  return { ...DISCLOSURE_FRAMES[state] };
}

function normalizeDisclosureState(value) {
  return value === OPEN || value === true ? OPEN : CLOSED;
}

function isAbortError(error) {
  return error && (error.name === 'AbortError' || error.code === 20);
}

/**
 * Coordinate imperative animation with the state that requested it.
 *
 * `play` receives `{from, to, duration, state, token}` and returns a Web
 * Animation-like object with `finished` and `cancel`. Tests can supply a
 * deterministic fake with the same shape.
 */
export function createDisclosureController({
  initial = CLOSED,
  reducedMotion = false,
  duration = 180,
  capture = () => null,
  apply = () => {},
  play = () => ({ finished: Promise.resolve(), cancel() {} }),
  onStateChange = () => {},
  onMotionStart = () => {},
  onMotionEnd = () => {},
  onError = () => {},
} = {}) {
  let logical = normalizeDisclosureState(initial);
  let target = logical;
  let serial = 0;
  let active = null;
  let reduce = Boolean(reducedMotion);
  let destroyed = false;

  const stableApply = (state, reason) => {
    apply({
      state,
      target: state,
      presentation: frameFor(state),
      visible: state === OPEN,
      reason,
    });
  };

  stableApply(logical, 'initial');

  const safeCapture = () => {
    try {
      const value = capture();
      return value && typeof value === 'object' ? { ...value } : null;
    } catch (error) {
      onError(error, { phase: 'capture' });
      return null;
    }
  };

  const cancelRecord = (record) => {
    try {
      record?.animation?.cancel?.();
    } catch (error) {
      // Cancellation errors are not allowed to turn a newer request stale.
      onError(error, { phase: 'cancel', token: record?.token });
    }
  };

  const stateSnapshot = () => ({
    logical,
    target,
    animating: Boolean(active),
    token: serial,
    reducedMotion: reduce,
    destroyed,
  });

  function setOpen(nextValue, reason = 'request') {
    if (destroyed) return stateSnapshot();

    const next = normalizeDisclosureState(nextValue);
    const token = ++serial;
    target = next;

    // Capture the presentation value before canceling. A stale finished
    // callback is still allowed to run later, but it cannot own this token.
    const interrupted = Boolean(active);
    let from = active ? safeCapture() : null;
    if (active) {
      const previous = active;
      active = null;
      cancelRecord(previous);
      apply({
        state: logical,
        target: next,
        presentation: from ?? frameFor(logical),
        visible: true,
        reason: 'interrupt',
      });
    }

    // Reversing toward the committed state still needs playback from the
    // captured presentation. Only an already resting surface can skip it.
    if (next === logical && !interrupted) {
      stableApply(logical, reason === 'request' ? 'stable' : reason);
      return stateSnapshot();
    }

    if (reduce) {
      logical = next;
      stableApply(logical, 'reduced-motion');
      onStateChange(logical, { reason: 'reduced-motion', token });
      return stateSnapshot();
    }

    const start = from ?? frameFor(logical);
    // Make an opening surface available before playback starts, and keep a
    // closing surface visible until its latest request actually commits.
    apply({
      state: logical,
      target: next,
      presentation: start,
      visible: true,
      reason: 'start',
    });
    let animation;
    try {
      animation = play({
        from: start,
        to: frameFor(next),
        duration,
        state: next,
        token,
        reason,
      });
    } catch (error) {
      onError(error, { phase: 'play', token, state: next });
      return stateSnapshot();
    }

    const record = { animation, token, target: next };
    active = record;
    onMotionStart({ state: next, token, from: start, to: frameFor(next) });

    Promise.resolve(animation?.finished ?? Promise.resolve()).then(
      () => {
        // Both checks matter: a promise can already be queued while another
        // request has replaced the active record.
        if (
          destroyed ||
          serial !== token ||
          active !== record ||
          record.target !== target
        ) {
          return;
        }
        active = null;
        logical = next;
        stableApply(logical, 'finish');
        onStateChange(logical, { reason: 'finish', token });
        onMotionEnd({ state: logical, token });
      },
      (error) => {
        if (
          destroyed ||
          serial !== token ||
          active !== record ||
          record.target !== target
        ) {
          return;
        }
        active = null;
        if (!isAbortError(error)) {
          onError(error, { phase: 'finish', token, state: next });
        }
      },
    );

    return stateSnapshot();
  }

  function setReducedMotion(value) {
    reduce = Boolean(value);
    if (reduce && active) {
      // Commit the latest requested state without waiting for an animation end
      // event. setOpen performs the same ownership check as a normal request.
      setOpen(target, 'reduced-motion-change');
    }
    return stateSnapshot();
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    serial += 1;
    const record = active;
    active = null;
    cancelRecord(record);
  }

  return {
    getState: stateSnapshot,
    setOpen,
    setReducedMotion,
    destroy,
  };
}

/**
 * Estimate release velocity in pixels per second from monotonic pointer
 * samples. A pause starts a fresh sample window so old movement cannot launch
 * a snap after the user has stopped.
 */
export class VelocityTracker {
  constructor({ pauseMs = 120, maxSamples = 5 } = {}) {
    if (!(pauseMs > 0)) throw new RangeError('pauseMs must be positive');
    if (!Number.isInteger(maxSamples) || maxSamples < 2) {
      throw new RangeError('maxSamples must be at least 2');
    }
    this.pauseMs = pauseMs;
    this.maxSamples = maxSamples;
    this.samples = [];
  }

  reset() {
    this.samples = [];
  }

  sample(x, y = 0, timeMs) {
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(timeMs)) {
      return false;
    }
    const last = this.samples[this.samples.length - 1];
    if (last && timeMs <= last.timeMs) return false;
    if (last && timeMs - last.timeMs >= this.pauseMs) {
      this.samples = [];
    }
    this.samples.push({ x, y, timeMs });
    if (this.samples.length > this.maxSamples) this.samples.shift();
    return true;
  }

  velocity() {
    const last = this.samples[this.samples.length - 1];
    const first = this.samples[0];
    if (!first || !last || first === last) {
      return { x: 0, y: 0, unit: 'px/s', sampleCount: this.samples.length };
    }
    const seconds = (last.timeMs - first.timeMs) / 1000;
    if (!(seconds > 0)) {
      return { x: 0, y: 0, unit: 'px/s', sampleCount: this.samples.length };
    }
    return {
      x: (last.x - first.x) / seconds,
      y: (last.y - first.y) / seconds,
      unit: 'px/s',
      sampleCount: this.samples.length,
    };
  }
}

function finiteOr(value, fallback) {
  return Number.isFinite(value) ? value : fallback;
}

/**
 * Manage a one-dimensional draggable control with snap points.
 *
 * Pointer callbacks use local pixels and event timestamps in milliseconds.
 * `animateTo` receives release velocity in the same explicit `px/s` unit as
 * `VelocityTracker`. Keyboard actions use the exact same snap/commit path.
 */
export function createSnapController({
  snapPoints = [0, 1],
  initial = snapPoints[0],
  pauseMs = 120,
  projectionMs = 140,
  setPosition = () => {},
  animateTo = () => {},
  stopMotion = () => {},
  readPosition = () => null,
  capturePointer = () => {},
  releasePointer = () => {},
  onCommit = () => {},
  onCancel = () => {},
} = {}) {
  const points = [...new Set(snapPoints.map(Number))]
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
  if (points.length === 0) throw new RangeError('snapPoints must contain a number');
  const min = points[0];
  const max = points[points.length - 1];
  const nearest = (value) => points.reduce((best, point) => (
    Math.abs(point - value) < Math.abs(best - value) ? point : best
  ), points[0]);
  const clamp = (value) => Math.min(max, Math.max(min, value));

  let position = nearest(finiteOr(initial, min));
  let committed = position;
  let pointer = null;
  let destroyed = false;
  const tracker = new VelocityTracker({ pauseMs });

  setPosition(position, { reason: 'initial' });

  function readPresented() {
    try {
      const value = readPosition();
      return Number.isFinite(value) ? clamp(value) : null;
    } catch {
      return null;
    }
  }

  function stopCurrentMotion() {
    const presented = readPresented();
    if (presented !== null) position = presented;
    stopMotion({ position });
  }

  function cleanupPointer(id) {
    if (!pointer || pointer.id !== id) return false;
    pointer = null;
    tracker.reset();
    try {
      releasePointer(id);
    } catch {
      // The browser may have released capture already. Logical cleanup still
      // must happen exactly once and cancellation should reach its caller.
    }
    return true;
  }

  function pointerDown({ pointerId, position: pointerPosition, timeMs, grabOffset } = {}) {
    if (destroyed || pointerId === undefined) return false;
    if (pointer) pointerCancel({ pointerId: pointer.id, reason: 'replaced' });
    stopCurrentMotion();
    const local = finiteOr(pointerPosition, position);
    const offset = finiteOr(grabOffset, local - position);
    pointer = { id: pointerId, offset };
    tracker.reset();
    tracker.sample(local, 0, finiteOr(timeMs, 0));
    capturePointer(pointerId);
    return true;
  }

  function pointerMove({ pointerId, position: pointerPosition, timeMs } = {}) {
    if (destroyed || !pointer || pointer.id !== pointerId) return false;
    const local = finiteOr(pointerPosition, position + pointer.offset);
    tracker.sample(local, 0, finiteOr(timeMs, 0));
    position = clamp(local - pointer.offset);
    setPosition(position, { reason: 'drag' });
    return true;
  }

  function finishPointer({ pointerId, position: pointerPosition, timeMs, reason = 'release' } = {}) {
    if (!pointer || pointer.id !== pointerId) return { handled: false };
    pointerMove({ pointerId, position: pointerPosition, timeMs });
    const from = position;
    const velocity = tracker.velocity();
    const projected = clamp(from + velocity.x * (projectionMs / 1000));
    const to = nearest(projected);
    cleanupPointer(pointerId);
    committed = to;
    position = to;
    animateTo({ from, to, velocity, reason });
    onCommit({ from, to, velocity, reason });
    return { handled: true, from, to, velocity, reason };
  }

  function pointerUp(args = {}) {
    return finishPointer({ ...args, reason: 'release' });
  }

  function pointerCancel({ pointerId, reason = 'cancel' } = {}) {
    if (destroyed || !pointer || pointer.id !== pointerId) return false;
    const from = position;
    cleanupPointer(pointerId);
    position = committed;
    setPosition(position, { reason });
    onCancel({ from, to: committed, reason });
    return true;
  }

  function key(keyValue) {
    if (destroyed) return false;
    if (pointer) pointerCancel({ pointerId: pointer.id, reason: 'keyboard' });
    stopCurrentMotion();
    const current = position;
    let to;
    if (keyValue === 'Home') to = min;
    else if (keyValue === 'End') to = max;
    else if (keyValue === 'ArrowLeft') {
      to = [...points].reverse().find((point) => point < current - 0.0001) ?? min;
    } else if (keyValue === 'ArrowRight') {
      to = points.find((point) => point > current + 0.0001) ?? max;
    } else {
      return false;
    }
    const from = current;
    const velocity = { x: 0, y: 0, unit: 'px/s', sampleCount: 0 };
    committed = to;
    position = to;
    animateTo({ from, to, velocity, reason: 'keyboard', key: keyValue });
    onCommit({ from, to, velocity, reason: 'keyboard', key: keyValue });
    return true;
  }

  function destroy() {
    if (destroyed) return;
    if (pointer) cleanupPointer(pointer.id);
    stopCurrentMotion();
    destroyed = true;
    tracker.reset();
  }

  return {
    getState: () => ({
      position,
      committed,
      pointerId: pointer?.id ?? null,
      snapPoints: [...points],
      destroyed,
    }),
    pointerDown,
    pointerMove,
    pointerUp,
    pointerCancel,
    lostPointerCapture: (args = {}) => pointerCancel({ ...args, reason: 'lost-capture' }),
    key,
    destroy,
  };
}

function capturePanelFrame(element) {
  const computed = getComputedStyle(element);
  const opacity = Number.parseFloat(computed.opacity);
  return {
    opacity: Number.isFinite(opacity) ? opacity : 1,
    transform: computed.transform === 'none' ? 'translateY(0px)' : computed.transform,
  };
}

function readTranslateX(element) {
  const transform = getComputedStyle(element).transform;
  if (!transform || transform === 'none') return 0;
  if (transform.startsWith('matrix3d(')) {
    const values = transform.slice(9, -1).split(',').map(Number);
    return Number.isFinite(values[12]) ? values[12] : 0;
  }
  const match = transform.match(/^matrix\([^,]+,\s*[^,]+,\s*[^,]+,\s*[^,]+,\s*([^,]+),/);
  return match ? Number.parseFloat(match[1]) || 0 : 0;
}

/** Start the browser demo when this module is loaded by index.html. */
export function startDemo(documentLike = globalThis.document) {
  if (!documentLike) return null;
  const panel = documentLike.querySelector('[data-details]');
  const toggle = documentLike.querySelector('[data-toggle]');
  const track = documentLike.querySelector('[data-track]');
  const thumb = documentLike.querySelector('[data-thumb]');
  const status = documentLike.querySelector('[data-status]');
  if (!panel || !toggle || !track || !thumb || !status) return null;

  const motionQuery = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
  let reduced = Boolean(motionQuery?.matches);
  let panelAnimation = null;
  let dragAnimation = null;

  const setStatus = (text) => {
    status.textContent = text;
  };

  const disclosure = createDisclosureController({
    initial: CLOSED,
    reducedMotion: reduced,
    capture: () => capturePanelFrame(panel),
    apply: ({ presentation, target, visible, reason }) => {
      panel.hidden = !visible;
      panel.style.opacity = String(presentation.opacity);
      panel.style.transform = presentation.transform;
      toggle.setAttribute('aria-expanded', String(target === OPEN));
      setStatus(`details: ${target}; reduced motion: ${reduced ? 'on' : 'off'} (${reason})`);
    },
    play: ({ from, to, duration }) => {
      panelAnimation?.cancel();
      panelAnimation = panel.animate([from, to], {
        duration,
        easing: 'cubic-bezier(.2,.8,.2,1)',
        fill: 'forwards',
      });
      return panelAnimation;
    },
  });

  toggle.addEventListener('click', () => {
    disclosure.setOpen(disclosure.getState().target !== OPEN, 'toggle');
  });

  const maxPosition = () => Math.max(0, track.clientWidth - thumb.offsetWidth - 2 * thumb.offsetLeft);
  const displayPosition = (value) => {
    const max = maxPosition();
    const clamped = Math.min(max, Math.max(0, value));
    thumb.style.transform = `translateX(${clamped}px)`;
    thumb.setAttribute('aria-valuenow', String(max ? Math.round((clamped / max) * 100) : 0));
    setStatus(`snap: ${Math.round(clamped)}px; reduced motion: ${reduced ? 'on' : 'off'}`);
  };

  const snap = createSnapController({
    snapPoints: [0, 0.5, 1].map((fraction) => fraction * maxPosition()),
    initial: 0,
    pauseMs: 120,
    projectionMs: 140,
    setPosition: displayPosition,
    readPosition: () => readTranslateX(thumb),
    stopMotion: () => {
      dragAnimation?.commitStyles?.();
      dragAnimation?.cancel?.();
      dragAnimation = null;
    },
    animateTo: ({ from, to, velocity }) => {
      dragAnimation?.cancel?.();
      if (reduced || from === to) {
        displayPosition(to);
        dragAnimation = null;
        return;
      }
      const animation = thumb.animate(
        [{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }],
        {
          duration: Math.max(120, Math.min(320, 220 - Math.min(100, Math.abs(velocity.x) * 0.04))),
          easing: 'cubic-bezier(.2,.8,.2,1)',
          fill: 'forwards',
        },
      );
      dragAnimation = animation;
      animation.finished.then(() => {
        if (dragAnimation !== animation) return;
        displayPosition(to);
        animation.cancel();
        dragAnimation = null;
      }, () => {
        if (dragAnimation === animation) dragAnimation = null;
      });
    },
    capturePointer: (pointerId) => thumb.setPointerCapture?.(pointerId),
    releasePointer: (pointerId) => {
      if (thumb.hasPointerCapture?.(pointerId)) thumb.releasePointerCapture(pointerId);
    },
  });

  const localX = (event) => {
    const bounds = track.getBoundingClientRect();
    return Math.min(maxPosition(), Math.max(0, event.clientX - bounds.left));
  };
  thumb.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    const x = localX(event);
    const current = readTranslateX(thumb);
    snap.pointerDown({
      pointerId: event.pointerId,
      position: x,
      timeMs: event.timeStamp,
      grabOffset: x - current,
    });
  });
  thumb.addEventListener('pointermove', (event) => {
    snap.pointerMove({ pointerId: event.pointerId, position: localX(event), timeMs: event.timeStamp });
  });
  thumb.addEventListener('pointerup', (event) => {
    snap.pointerUp({ pointerId: event.pointerId, position: localX(event), timeMs: event.timeStamp });
  });
  thumb.addEventListener('pointercancel', (event) => {
    snap.pointerCancel({ pointerId: event.pointerId });
  });
  thumb.addEventListener('lostpointercapture', (event) => {
    snap.lostPointerCapture({ pointerId: event.pointerId });
  });
  thumb.addEventListener('keydown', (event) => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      snap.key(event.key);
    }
  });

  const onReducedMotionChange = (event) => {
    reduced = Boolean(event.matches);
    disclosure.setReducedMotion(reduced);
    if (reduced && dragAnimation) {
      dragAnimation.cancel();
      dragAnimation = null;
      displayPosition(snap.getState().position);
    }
    setStatus(`reduced motion: ${reduced ? 'on' : 'off'}`);
  };
  motionQuery?.addEventListener?.('change', onReducedMotionChange);

  // Keep these handles available for manual smoke checks in DevTools.
  const demo = { disclosure, snap, onReducedMotionChange };
  if (globalThis.window) globalThis.window.motionDemo = demo;
  return demo;
}

if (typeof document !== 'undefined') startDemo(document);
