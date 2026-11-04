# Merge Collection

A TypeScript function that merges three sorted arrays into one ascending array
without using a sort function. Duplicates are preserved and inputs are unchanged.

- `collection_1` and `collection_3`: ascending order
- `collection_2`: descending order
- Values: non-negative safe integers; empty arrays are allowed

## Setup

Requires Node.js 22+ and npm.

```sh
git clone https://github.com/Janeninie/merge-collection.git
cd merge-collection
npm ci
```

## Run

```sh
npm start
```

Output:

```text
[0,1,2,3,4,5,6,7,8]
```

## Test

```sh
npm test
```

Uses Node.js built-in `node:test` and `node:assert/strict`.
Includes 17 tests covering duplicates, zeros, empty arrays, unequal lengths,
safe integer limits, and unchanged inputs.

Both `npm start` and `npm test` compile TypeScript before running.

## Usage

```ts
import { merge } from "./src/merge.js";

const result = merge([0, 3, 6], [8, 5, 2], [1, 4, 7]);
// [0, 1, 2, 3, 4, 5, 6, 7, 8]
```

The function uses three pointers, reading `collection_2` backward.
Time: **O(N)**. Space: **O(N)** for the result, where N is the total input length.
Input values and ordering are assumed valid and are not checked at runtime.
