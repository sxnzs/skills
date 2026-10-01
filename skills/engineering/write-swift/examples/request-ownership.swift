// From the repository root, compile and run with explicit Swift 6 settings:
// mkdir -p artifacts/swift-ownership
// swiftc -swift-version 6 -strict-concurrency=complete -parse-as-library \
//   -module-cache-path artifacts/swift-ownership/module-cache \
//   skills/engineering/write-swift/examples/request-ownership.swift \
//   -o artifacts/swift-ownership/request-ownership
// artifacts/swift-ownership/request-ownership
// Add --negative-control to observe stale publication when ownership is ignored.
// Controlled suspension points make the three scenarios deterministic.

import Foundation

#if canImport(Darwin)
import Darwin
#elseif canImport(Glibc)
import Glibc
#endif

enum PlannedOutcome: Sendable {
    case success(String)
    case failure(String)
}

enum RequestError: Error, Equatable, Sendable {
    case failed(String)
    case cancelled
}

struct RequestID: Equatable, Sendable {
    let rawValue: Int
}

enum Event: Equatable, Sendable {
    case published(RequestID, String)
    case failed(RequestID, String)
    case cancelled(RequestID)
    case ignored(RequestID)
}

actor Gate {
    private var isOpen = false
    private var hasEntered = false
    private var waiters: [CheckedContinuation<Void, Never>] = []
    private var entryWaiters: [CheckedContinuation<Void, Never>] = []

    func wait() async {
        hasEntered = true
        let pendingEntryWaiters = entryWaiters
        entryWaiters.removeAll()
        pendingEntryWaiters.forEach { $0.resume() }
        if isOpen {
            return
        }
        await withCheckedContinuation { continuation in
            waiters.append(continuation)
        }
    }

    func waitUntilEntered() async {
        if hasEntered {
            return
        }
        await withCheckedContinuation { continuation in
            entryWaiters.append(continuation)
        }
    }

    func open() {
        guard !isOpen else {
            return
        }
        isOpen = true
        let pendingWaiters = waiters
        waiters.removeAll()
        pendingWaiters.forEach { $0.resume() }
    }
}

struct RequestPlan: Sendable {
    let gate: Gate
    let outcome: PlannedOutcome

    func resolve() async -> Result<String, RequestError> {
        await gate.wait()
        guard !Task.isCancelled else {
            return .failure(.cancelled)
        }
        switch outcome {
        case let .success(value):
            return .success(value)
        case let .failure(message):
            return .failure(.failed(message))
        }
    }
}

@MainActor
final class RequestModel {
    private let enforceOwnership: Bool
    private var nextID = 0

    private(set) var visible = "initial"
    private(set) var loading: RequestID?
    private(set) var events: [Event] = []

    init(enforceOwnership: Bool) {
        self.enforceOwnership = enforceOwnership
    }

    func start(_ plan: RequestPlan) -> (RequestID, Task<Void, Never>) {
        nextID += 1
        let id = RequestID(rawValue: nextID)
        loading = id
        let task = Task { @MainActor [weak self] in
            let result = await plan.resolve()
            self?.finish(id: id, result: result)
        }
        return (id, task)
    }

    private func finish(id: RequestID, result: Result<String, RequestError>) {
        if enforceOwnership, loading != id {
            events.append(.ignored(id))
            return
        }

        switch result {
        case let .success(value):
            visible = value
            events.append(.published(id, value))
        case let .failure(.failed(message)):
            events.append(.failed(id, message))
        case .failure(.cancelled):
            events.append(.cancelled(id))
        }

        // The educational control reaches this cleanup without the
        // ownership guard above, so a stale task can clear newer loading.
        loading = nil
    }
}

struct AssertionFailure: Error {
    let name: String
    let message: String
}

@MainActor
enum Scenarios {
    static func run(enforceOwnership: Bool) async throws {
        try await staleSuccess(enforceOwnership: enforceOwnership)
        try await staleFailureCleanup(enforceOwnership: enforceOwnership)
        try await cooperativeCancellation(enforceOwnership: enforceOwnership)
    }

    private static func staleSuccess(enforceOwnership: Bool) async throws {
        let model = RequestModel(enforceOwnership: enforceOwnership)
        let oldGate = Gate()
        let newGate = Gate()
        let (oldID, oldTask) = model.start(
            RequestPlan(gate: oldGate, outcome: .success("old-success"))
        )
        await oldGate.waitUntilEntered()
        let (_, newTask) = model.start(
            RequestPlan(gate: newGate, outcome: .success("new-success"))
        )
        await newGate.waitUntilEntered()

        await newGate.open()
        await newTask.value
        try expect(model.visible == "new-success", "latest-success-visible",
                   "the newest success should be visible")
        try expect(model.loading == nil, "latest-success-cleanup",
                   "the newest task should release loading")

        await oldGate.open()
        await oldTask.value
        try expect(model.visible == "new-success", "stale-publication-ownership",
                   "old success replaced the newest visible value")
        try expect(model.loading == nil, "stale-cleanup-ownership",
                   "old success changed loading after the newest task settled")
        if enforceOwnership {
            try expect(model.events.contains(.ignored(oldID)),
                       "stale-success-ignored",
                       "old success should settle without publishing")
        }
    }

    private static func staleFailureCleanup(enforceOwnership: Bool) async throws {
        let model = RequestModel(enforceOwnership: enforceOwnership)
        let oldGate = Gate()
        let newGate = Gate()
        let (oldID, oldTask) = model.start(
            RequestPlan(gate: oldGate, outcome: .failure("old-failure"))
        )
        await oldGate.waitUntilEntered()
        let (newID, newTask) = model.start(
            RequestPlan(gate: newGate, outcome: .success("new-value"))
        )
        await newGate.waitUntilEntered()

        await oldGate.open()
        await oldTask.value
        try expect(model.visible == "initial", "stale-failure-publication",
                   "old failure should not publish a value")
        try expect(model.loading == newID, "stale-failure-cleanup-ownership",
                   "old failure cleared the newer loading state")

        await newGate.open()
        await newTask.value
        try expect(model.visible == "new-value", "latest-after-failure-visible",
                   "new success should publish after old failure settles")
        try expect(model.loading == nil, "latest-after-failure-cleanup",
                   "new success should release loading")
        if enforceOwnership {
            try expect(model.events.contains(.ignored(oldID)),
                       "stale-failure-ignored",
                       "old failure should settle without cleanup")
        }
    }

    private static func cooperativeCancellation(enforceOwnership: Bool) async throws {
        let model = RequestModel(enforceOwnership: enforceOwnership)
        let oldGate = Gate()
        let newGate = Gate()
        let (oldID, oldTask) = model.start(
            RequestPlan(gate: oldGate, outcome: .success("cancelled-old"))
        )
        await oldGate.waitUntilEntered()
        let (newID, newTask) = model.start(
            RequestPlan(gate: newGate, outcome: .success("cancelled-new"))
        )
        await newGate.waitUntilEntered()

        oldTask.cancel()
        await oldGate.open()
        await oldTask.value
        try expect(model.visible == "initial", "cancelled-not-published",
                   "cancelled work published a value")
        try expect(model.loading == newID, "cancelled-cleanup-ownership",
                   "cancelled old work cleared newer loading state")

        await newGate.open()
        await newTask.value
        try expect(model.visible == "cancelled-new", "cancelled-latest-visible",
                   "the latest request did not publish")
        try expect(model.loading == nil, "cancelled-latest-cleanup",
                   "the latest request did not release loading")
        if enforceOwnership {
            try expect(model.events.contains(.ignored(oldID)),
                       "cancelled-old-ignored",
                       "cancelled old work should settle without cleanup")
        }
    }

    private static func expect(
        _ condition: Bool, _ name: String, _ message: String
    ) throws {
        guard condition else {
            throw AssertionFailure(name: name, message: message)
        }
    }
}

@main
struct RequestOwnershipExample {
    static func main() async {
        let negativeControl = CommandLine.arguments.contains("--negative-control")
        do {
            try await Scenarios.run(enforceOwnership: !negativeControl)
            if negativeControl {
                print("EDUCATIONAL NEGATIVE CONTROL: unexpected pass")
                exit(2)
            }
            print(
                "PASS request-ownership: stale success, stale failure cleanup, cooperative cancellation"
            )
        } catch let failure as AssertionFailure {
            if negativeControl {
                print(
                    "EDUCATIONAL NEGATIVE CONTROL: FAILED [\(failure.name)] \(failure.message)"
                )
            } else {
                print("ASSERTION FAILED [\(failure.name)] \(failure.message)")
            }
            exit(1)
        } catch {
            print("ASSERTION FAILED [unexpected-error] \(error)")
            exit(1)
        }
    }
}
