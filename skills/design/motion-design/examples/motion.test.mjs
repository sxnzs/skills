import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  createDisclosureController,
  createSnapController,
  VelocityTracker,
} from './motion.mjs';

const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

function deferredAnimations() {
  const records = [];
  const play = (options) => {
    let resolve;
    let reject;
    const finished = new Promise((resolvePromise, rejectPromise) => {
      resolve = resolvePromise;
      reject = rejectPromise;
    });
    const record = {
      ...options,
      cancelled: false,
      finish: () => resolve(),
      fail: (error) => reject(error),
      animation: null,
    };
    record.animation = {
      finished,
      // Deliberately leave `finished` pending: the tests can resolve a stale
      // promise after cancel to model a callback already queued by the browser.
      cancel: () => { record.cancelled = true; },
    };
    records.push(record);
    return record.animation;
  };
  return { play, records };
}

test('latest disclosure request owns a queued completion after reversal', async () => {
  const fake = deferredAnimations();
  const applied = [];
  const controller = createDisclosureController({
    play: fake.play,
    capture: () => ({ opacity: 0.45, transform: 'matrix(1, 0, 0, 1, 0, -4)' }),
    apply: (change) => applied.push(change),
  });

  controller.setOpen(true);
  fake.records[0].finish();
  await flush();
  assert.equal(controller.getState().logical, 'open');

  controller.setOpen(false);
  const staleClose = fake.records[1];
  // Queue the old completion before issuing the reopening request. A browser
  // can deliver this promise callback even after cancel() has been called.
  staleClose.finish();
  controller.setOpen(true);
  await flush();

  assert.equal(controller.getState().logical, 'open');
  assert.equal(controller.getState().target, 'open');
  assert.equal(controller.getState().animating, true);
  assert.equal(fake.records[2].from.opacity, 0.45);
  fake.records[2].finish();
  await flush();
  assert.equal(controller.getState().animating, false);
  assert.equal(applied.at(-1).visible, true);
  assert.equal(applied.at(-1).target, 'open');
  assert.equal(staleClose.cancelled, true);
});

test('reversal toward an initial closed state continues from its visible frame', () => {
  const fake = deferredAnimations();
  const controller = createDisclosureController({
    play: fake.play,
    capture: () => ({opacity: 0.4, transform: 'translateY(-4px)'}),
  });
  controller.setOpen(true);
  controller.setOpen(false);
  assert.equal(fake.records.length, 2);
  assert.equal(fake.records[1].from.opacity, 0.4);
  assert.equal(fake.records[1].to.opacity, 0);
  assert.equal(controller.getState().animating, true);
});

test('negative control: an unowned stale completion would hide a reopened surface', async () => {
  const source = await readFile(new URL('./motion.mjs', import.meta.url), 'utf8');
  const guard = /if \(\s*destroyed \|\|\s*serial !== token \|\|\s*active !== record \|\|\s*record\.target !== target\s*\) \{\s*return;\s*\}/;
  assert.match(source, guard);
  const unsafe = await import(`data:text/javascript;base64,${Buffer.from(source.replace(guard, '')).toString('base64')}`);
  const fake = deferredAnimations();
  const controller = unsafe.createDisclosureController({ play: fake.play });
  controller.setOpen(true);
  fake.records[0].finish();
  await flush();
  controller.setOpen(false);
  const staleClose = fake.records[1];
  staleClose.finish();
  controller.setOpen(true);
  await flush();

  // Run the same controller with only its completion guard removed. A queued
  // obsolete close now commits after the latest reopening request.
  assert.throws(
    () => assert.equal(controller.getState().logical, 'open'),
    /Expected values to be strictly equal/,
  );
  assert.equal(controller.getState().logical, 'closed');
});

test('reduced motion commits logical state without an animation end event', () => {
  let playCalls = 0;
  const applied = [];
  const controller = createDisclosureController({
    reducedMotion: true,
    play: () => { playCalls += 1; },
    apply: (change) => applied.push(change),
  });

  controller.setOpen(true);

  assert.equal(playCalls, 0);
  assert.deepEqual(controller.getState(), {
    logical: 'open',
    target: 'open',
    animating: false,
    token: 1,
    reducedMotion: true,
    destroyed: false,
  });
  assert.equal(applied.at(-1).visible, true);
  assert.equal(applied.at(-1).reason, 'reduced-motion');
});

test('enabling reduced motion commits the in-flight target immediately', () => {
  const fake = deferredAnimations();
  const controller = createDisclosureController({ play: fake.play });
  controller.setOpen(true);
  assert.equal(controller.getState().animating, true);

  controller.setReducedMotion(true);

  assert.equal(controller.getState().logical, 'open');
  assert.equal(controller.getState().animating, false);
  assert.equal(fake.records[0].cancelled, true);
});

test('velocity is measured in px/s and old samples expire after a pause', () => {
  const tracker = new VelocityTracker({ pauseMs: 120 });
  tracker.sample(0, 0, 0);
  tracker.sample(10, 0, 100);
  assert.deepEqual(tracker.velocity(), { x: 100, y: 0, unit: 'px/s', sampleCount: 2 });

  tracker.sample(30, 0, 300); // 200 ms gap: start a fresh release window.
  assert.deepEqual(tracker.velocity(), { x: 0, y: 0, unit: 'px/s', sampleCount: 1 });
  tracker.sample(40, 0, 350);
  assert.equal(tracker.velocity().x, 200);
  assert.equal(tracker.velocity().unit, 'px/s');
});

test('snap release uses measured velocity, then resets stale velocity after a pause', () => {
  const animations = [];
  const captured = [];
  const released = [];
  const controller = createSnapController({
    snapPoints: [0, 100],
    initial: 0,
    pauseMs: 120,
    projectionMs: 200,
    setPosition: () => {},
    animateTo: (motion) => animations.push(motion),
    capturePointer: (id) => captured.push(id),
    releasePointer: (id) => released.push(id),
  });

  controller.pointerDown({ pointerId: 1, position: 0, timeMs: 0, grabOffset: 0 });
  controller.pointerMove({ pointerId: 1, position: 40, timeMs: 100 });
  const quick = controller.pointerUp({ pointerId: 1, position: 80, timeMs: 150 });
  assert.equal(quick.velocity.unit, 'px/s');
  assert.equal(quick.velocity.x, 533.3333333333334);
  assert.equal(quick.to, 100);

  controller.pointerDown({ pointerId: 2, position: 100, timeMs: 0, grabOffset: 0 });
  controller.pointerMove({ pointerId: 2, position: 20, timeMs: 50 });
  const paused = controller.pointerUp({ pointerId: 2, position: 25, timeMs: 250 });
  assert.deepEqual(paused.velocity, { x: 0, y: 0, unit: 'px/s', sampleCount: 1 });
  assert.equal(paused.to, 0);
  assert.deepEqual(captured, [1, 2]);
  assert.deepEqual(released, [1, 2]);
  assert.equal(animations[0].velocity.unit, 'px/s');
  assert.equal(animations[1].velocity.x, 0);
});

test('pointer cancellation restores the committed snap and releases capture once', () => {
  const positions = [];
  const releases = [];
  const commits = [];
  const cancels = [];
  const controller = createSnapController({
    snapPoints: [0, 100],
    initial: 0,
    setPosition: (value, change) => positions.push({ value, reason: change.reason }),
    capturePointer: () => {},
    releasePointer: (id) => releases.push(id),
    onCommit: (commit) => commits.push(commit),
    onCancel: (cancel) => cancels.push(cancel),
  });

  controller.pointerDown({ pointerId: 9, position: 0, timeMs: 0, grabOffset: 0 });
  controller.pointerMove({ pointerId: 9, position: 60, timeMs: 40 });
  assert.equal(controller.pointerCancel({ pointerId: 9 }), true);
  assert.equal(controller.getState().pointerId, null);
  assert.equal(controller.getState().position, 0);
  assert.deepEqual(releases, [9]);
  assert.equal(commits.length, 0);
  assert.equal(cancels.length, 1);
  assert.equal(cancels[0].reason, 'cancel');
  assert.equal(controller.lostPointerCapture({ pointerId: 9 }), false);
  assert.equal(releases.length, 1);
  assert.deepEqual(positions.at(-1), { value: 0, reason: 'cancel' });
});

test('keyboard arrows use the same snap commit path', () => {
  const motions = [];
  const commits = [];
  const controller = createSnapController({
    snapPoints: [0, 100, 200],
    initial: 0,
    animateTo: (motion) => motions.push(motion),
    onCommit: (commit) => commits.push(commit),
  });

  assert.equal(controller.key('ArrowRight'), true);
  assert.equal(motions[0].to, 100);
  assert.equal(motions[0].velocity.unit, 'px/s');
  assert.equal(commits[0].reason, 'keyboard');
  assert.equal(controller.key('End'), true);
  assert.equal(motions[1].to, 200);
  assert.equal(controller.key('ArrowLeft'), true);
  assert.equal(motions[2].to, 100);
});
