export function merge(
  collection_1: readonly number[],
  collection_2: readonly number[],
  collection_3: readonly number[],
): number[] {
  const result: number[] = [];
  let i = 0;
  let j = collection_2.length - 1;
  let k = 0;

  while (i < collection_1.length || j >= 0 || k < collection_3.length) {
    const first = collection_1[i] ?? Infinity;
    const second = collection_2[j] ?? Infinity;
    const third = collection_3[k] ?? Infinity;

    if (first <= second && first <= third) {
      result.push(first);
      i++;
    } else if (second <= third) {
      result.push(second);
      j--;
    } else {
      result.push(third);
      k++;
    }
  }

  return result;
}
