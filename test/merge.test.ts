import assert from "node:assert/strict";
import { test } from "node:test";
import { merge } from "../src/merge.js";

interface MergeCase {
  name: string;
  collections: [number[], number[], number[]];
  expected: number[];
}

const cases: MergeCase[] = [
  {
    name: "merges interleaved collections in ascending numeric order",
    collections: [[0, 3, 6], [8, 5, 2], [1, 4, 7]],
    expected: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    name: "preserves duplicates and zeroes across all collections",
    collections: [[0, 2, 2], [3, 2, 0], [0, 2, 4]],
    expected: [0, 0, 0, 2, 2, 2, 2, 3, 4],
  },
  {
    name: "handles three empty collections",
    collections: [[], [], []],
    expected: [],
  },
  {
    name: "handles only the first collection being populated",
    collections: [[0, 2, 10], [], []],
    expected: [0, 2, 10],
  },
  {
    name: "reads the second collection backward when it is the only input",
    collections: [[], [10, 2, 0], []],
    expected: [0, 2, 10],
  },
  {
    name: "handles only the third collection being populated",
    collections: [[], [], [0, 2, 10]],
    expected: [0, 2, 10],
  },
  {
    name: "handles an empty first collection",
    collections: [[], [6, 2, 0], [1, 3]],
    expected: [0, 1, 2, 3, 6],
  },
  {
    name: "handles an empty second collection",
    collections: [[0, 4], [], [1, 3, 6]],
    expected: [0, 1, 3, 4, 6],
  },
  {
    name: "handles an empty third collection",
    collections: [[0, 4], [6, 3, 1], []],
    expected: [0, 1, 3, 4, 6],
  },
  {
    name: "handles singleton inputs",
    collections: [[2], [0], [1]],
    expected: [0, 1, 2],
  },
  {
    name: "continues after the first collection is exhausted",
    collections: [[0, 1], [3, 2], [4, 5]],
    expected: [0, 1, 2, 3, 4, 5],
  },
  {
    name: "continues after the second collection is exhausted",
    collections: [[2, 3], [1, 0], [4, 5]],
    expected: [0, 1, 2, 3, 4, 5],
  },
  {
    name: "continues after the third collection is exhausted",
    collections: [[4, 5], [3, 2], [0, 1]],
    expected: [0, 1, 2, 3, 4, 5],
  },
  {
    name: "handles all values being equal",
    collections: [[7, 7], [7, 7, 7], [7]],
    expected: [7, 7, 7, 7, 7, 7],
  },
  {
    name: "handles values at the safe integer boundary",
    collections: [[0, Number.MAX_SAFE_INTEGER], [Number.MAX_SAFE_INTEGER, 10], [2]],
    expected: [0, 2, 10, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  },
];

for (const { name, collections, expected } of cases) {
  test(name, () => {
    assert.deepEqual(merge(...collections), expected);
  });
}

test("returns a new array without modifying any input", () => {
  const first = Object.freeze([0, 3]);
  const second = Object.freeze([4, 1]);
  const third = Object.freeze([2, 5]);
  const result = merge(first, second, third);

  assert.deepEqual(result, [0, 1, 2, 3, 4, 5]);
  assert.notStrictEqual(result, first);
  assert.notStrictEqual(result, second);
  assert.notStrictEqual(result, third);
  assert.deepEqual(first, [0, 3]);
  assert.deepEqual(second, [4, 1]);
  assert.deepEqual(third, [2, 5]);
});

test("handles large collections with unequal lengths", () => {
  const first = Array.from({ length: 10_000 }, (_, i) => i * 2);
  const second = Array.from({ length: 10_000 }, (_, i) => 19_999 - i * 2);
  const third = [0, 10_000, 20_000];
  const expected: number[] = [];

  for (let value = 0; value <= 20_000; value++) {
    expected.push(value);
    if (value === 0 || value === 10_000) expected.push(value);
  }

  assert.deepEqual(merge(first, second, third), expected);
});
