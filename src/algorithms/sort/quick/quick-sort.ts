import { Comparator, ComparatorFunction } from "@/utils";

/**
 * Partitions the given array `arr` around the pivot element `pivot` using the provided `comparator`.
 *
 * @param arr - The array to be partitioned.
 * @param low - The lower index of the partition range.
 * @param high - The upper index of the partition range.
 * @param comparator - The comparator function to use for comparing elements.
 * @returns The index of the pivot element after partitioning.
 */
function partition<Item>(
  arr: Item[],
  low: number,
  high: number,
  comparator: Comparator<Item>
): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (comparator.lessThanOrEqual(arr[j], pivot)) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

/**
 * Sorts the given array `arr` in-place using the quicksort algorithm and the provided comparator function.
 *
 * @param arr - The array to be sorted.
 * @param compareFn - An optional comparator function to use for comparing elements. If not provided, the default comparator will be used.
 * @returns The sorted array.
 */
export function quickSort<Item>(
  arr: Item[],
  compareFn?: ComparatorFunction<Item>
): Item[] {
  if (arr.length <= 1) return arr;

  // By default, the natural order comparator will be used.
  const comparator = new Comparator(compareFn);

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(arr, low, high, comparator);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  sort(0, arr.length - 1);
  return arr;
}
