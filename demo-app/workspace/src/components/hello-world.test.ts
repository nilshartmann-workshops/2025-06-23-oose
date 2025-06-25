import { expect, test } from "vitest";

function add(a: number, b: number) {
  return a + b;
}

// @Test("...")
test("4 + 4 sollen 8 sein", () => {
  const result = add(4, 4);
  expect(result).toBe(8);
});
