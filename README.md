# Merge Collection

A TypeScript implementation of `merge(collection_1, collection_2, collection_3)`
that returns a new array in ascending numeric order without using any sorting
function. All values, including duplicates, are preserved. Inputs are unchanged.

Repository: [Janeninie/merge-collection](https://github.com/Janeninie/merge-collection)

## Requirements and setup

Install Node.js 22 or newer and npm, then run:

```sh
git clone https://github.com/Janeninie/merge-collection.git
cd merge-collection
npm ci
```

`npm ci` installs the exact development dependencies in `package-lock.json`:
TypeScript and Node.js type definitions. There are no runtime dependencies.
Tests use the [built-in Node.js test runner](https://nodejs.org/api/test.html).

## Execute the example

```sh
npm start
```

This compiles the project and runs `src/example.ts`. Its output is:

```text
[0,1,2,3,4,5,6,7,8]
```

## Execute unit tests

```sh
npm test
```

This type-checks and compiles the source and tests, then runs all unit tests.
Tests cover interleaved values, duplicates, zeros, empty inputs, singleton inputs,
each collection running out first, safe integer limits, unchanged inputs, and
large collections of unequal lengths. Test expectations also avoid sorting.

To compile without running the example or tests:

```sh
npm run build
```

The [TypeScript compiler](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
writes JavaScript to `dist/`.

## Function usage

```ts
import { merge } from "./src/merge.js";

const result = merge([0, 3, 6], [8, 5, 2], [1, 4, 7]);
// [0, 1, 2, 3, 4, 5, 6, 7, 8]
```

The import above is for a TypeScript file in the project root. NodeNext uses
`.js` import paths in TypeScript because these are the filenames after compilation.
For JavaScript usage after building, import from `./dist/src/merge.js`.

```ts
merge(
  collection_1: readonly number[],
  collection_2: readonly number[],
  collection_3: readonly number[],
): number[]
```

TypeScript represents integers as `number`. The function assumes non-negative
safe integers (`0` through `Number.MAX_SAFE_INTEGER`), with `collection_1` and
`collection_3` already in ascending order and `collection_2` in descending order.
Empty arrays are valid. These preconditions are not validated at runtime.
Mutable `number[]` inputs are accepted too; `readonly` prevents accidental writes
inside the function.

## How it works

Three pointers start at the beginning of collections 1 and 3, and at the end of
collection 2. At each step, the smallest available value is appended to the result,
then only its pointer advances. An exhausted collection is treated as `Infinity`,
so it cannot be selected while valid values remain. No sort or reverse function
is needed.

For `N = collection_1.length + collection_2.length + collection_3.length`:

- Time: **O(N)**; every input value is visited once.
- Space: **O(N)** for the returned array, with **O(1)** auxiliary space.

## Project files

```text
src/merge.ts        Merge function
src/example.ts      Runnable example
test/merge.test.ts  Unit tests
tsconfig.json      Strict TypeScript compiler configuration
package.json       Dependencies and commands
package-lock.json  Reproducible dependency versions
```
