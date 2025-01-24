import { Comparator, ComparatorFunction } from "@/utils";

/**
 * Sorts the given array using the quicksort algorithm.
 * The time complexity of this algorithm is:
 * - Best case: O(n log n)
 * - Average case: O(n log n)
 * - Worst case: O(n^2) occurs when the array is already sorted or reverse sorted, as the pivot selection is always the last element
 *
 * @param arr - The array to be sorted.
 * @param compareFn - An optional comparison function to use for sorting. If not provided, the default comparison function will be used.
 * @returns The sorted array.
 */
export function quickSort<Item>(
  arr: Item[],
  compareFn?: ComparatorFunction<Item>
): Item[] {
  const comparator = new Comparator(compareFn);

  // Optimized version of QuickSort with in-place partitioning that maintains O(log n) space complexity.
  // This version is more efficient than the original QuickSort algorithm, as it avoids the overhead of creating new arrays for the left and right subarrays.
  function partition(low: number, high: number): number {
    // Choose the pivot element as the last element in the subarray
    const pivot = arr[high];

    // Initialize the index of the smaller element
    let i = low - 1;

    // Iterate through the subarray and move elements smaller than the pivot to the left of the pivot
    for (let j = low; j < high; j++) {
      // If the current element is smaller than or equal to the pivot, swap it with the element at index i
      if (comparator.lessThanOrEqual(arr[j], pivot)) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    // Swap the element at index i+1 with the pivot element
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    // Return the index of the pivot element
    return i + 1;
  }

  // Recursive function to sort the subarrays
  function sort(low: number, high: number): void {
    if (low < high) {
      const pivotIndex = partition(low, high);
      sort(low, pivotIndex - 1);
      sort(pivotIndex + 1, high);
    }
  }

  // Call the recursive function to sort the entire array
  sort(0, arr.length - 1);
  return arr;
}
