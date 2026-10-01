from __future__ import annotations

import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


REPOSITORY = Path(__file__).resolve().parents[1]
SOURCE = REPOSITORY / "skills" / "write-swift" / "examples" / "request-ownership.swift"
ARTIFACT_ROOT = (
    Path(os.environ["SWIFT_EXAMPLE_TEST_DIR"])
    if os.environ.get("SWIFT_EXAMPLE_TEST_DIR")
    else REPOSITORY / "artifacts" / "swift-example-tests"
)
EXPECTED_POSITIVE = (
    "PASS request-ownership: stale success, stale failure cleanup, "
    "cooperative cancellation\n"
)
EXPECTED_NEGATIVE = (
    "EDUCATIONAL NEGATIVE CONTROL: FAILED [stale-publication-ownership] "
    "old success replaced the newest visible value\n"
)


class SwiftRequestOwnershipExampleTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.swiftc = shutil.which("swiftc")
        if cls.swiftc is None:
            raise unittest.SkipTest("swiftc is unavailable; skipping Swift example")
        ARTIFACT_ROOT.mkdir(parents=True, exist_ok=True)

    def setUp(self) -> None:
        self._run_dir = tempfile.TemporaryDirectory(
            prefix="run-", dir=str(ARTIFACT_ROOT)
        )
        self.run_root = Path(self._run_dir.name)
        self.module_cache = self.run_root / "module-cache"
        self.module_cache.mkdir()
        self.executable = self.run_root / "request-ownership"
        self.compile_command = [
            self.swiftc,
            "-swift-version",
            "6",
            "-strict-concurrency=complete",
            "-parse-as-library",
            str(SOURCE),
            "-module-cache-path",
            str(self.module_cache),
            "-o",
            str(self.executable),
        ]
        compiled = subprocess.run(
            self.compile_command,
            cwd=REPOSITORY,
            text=True,
            capture_output=True,
            timeout=30,
            check=False,
        )
        self.assertEqual(
            compiled.returncode,
            0,
            f"swiftc failed:\nstdout:\n{compiled.stdout}\nstderr:\n{compiled.stderr}",
        )

    def tearDown(self) -> None:
        self._run_dir.cleanup()

    def test_compiled_example_and_educational_negative_control(self) -> None:
        version = subprocess.run(
            [self.swiftc, "--version"],
            cwd=REPOSITORY,
            text=True,
            capture_output=True,
            timeout=10,
            check=True,
        )
        positive_command = [str(self.executable)]
        positive = subprocess.run(
            positive_command,
            cwd=REPOSITORY,
            text=True,
            capture_output=True,
            timeout=10,
            check=False,
        )
        negative_command = [str(self.executable), "--negative-control"]
        negative = subprocess.run(
            negative_command,
            cwd=REPOSITORY,
            text=True,
            capture_output=True,
            timeout=10,
            check=False,
        )
        report = {
            "swiftc": self.swiftc,
            "swiftc_version": version.stdout.strip(),
            "compile_command": self.compile_command,
            "positive_command": positive_command,
            "negative_command": negative_command,
            "positive_returncode": positive.returncode,
            "negative_returncode": negative.returncode,
        }
        (ARTIFACT_ROOT / "latest-report.json").write_text(
            json.dumps(report, indent=2) + "\n", encoding="utf-8"
        )

        self.assertEqual(positive.returncode, 0, positive.stderr)
        self.assertEqual(positive.stdout, EXPECTED_POSITIVE)
        self.assertEqual(positive.stderr, "")
        self.assertNotEqual(negative.returncode, 0)
        self.assertEqual(negative.stdout, EXPECTED_NEGATIVE)
        self.assertEqual(negative.stderr, "")


if __name__ == "__main__":
    unittest.main()
