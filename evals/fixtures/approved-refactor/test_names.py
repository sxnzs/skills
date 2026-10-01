import unittest
from names import label, key

class NameTests(unittest.TestCase):
    def test_public_functions_preserve_normalization(self):
        for function in (label, key):
            self.assertEqual(function("  Mixed Case  "), "mixed-case")
            self.assertEqual(function("x  y"), "x--y")
            self.assertEqual(function(""), "")

if __name__ == "__main__":
    unittest.main()
