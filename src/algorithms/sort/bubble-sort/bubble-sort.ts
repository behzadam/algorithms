import { Comparator, ComparatorFunction } from "@/utils";

/**
 * Sorts the given array using the bubble sort algorithm.
 *
 * @param arr - The array to be sorted.
 * @param from - The starting index of the array to be sorted (default is 0).
 * @param to - The ending index of the array to be sorted (default is the last index).
 * @param compareFn - An optional comparison function to use for sorting.
 * @returns The sorted array.
 */
export function bubbleSort<Element>(
  arr: Element[],
  from = 0,
  to = arr.length - 1,
  compareFn?: ComparatorFunction<Element>
) {
  const comparator = new Comparator(compareFn);
  for (let j = to; j > from; j--) {
    for (let i = from; i < j; i++) {
      if (comparator.greaterThan(arr[i], arr[i + 1])) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }
  return arr;
}
