import {
  Comparator,
  ComparatorFunction,
} from "../../../data-structure/comparator";

/**
 * Binary search is an efficient algorithm for finding an item from a sorted list of items.
 * It works by repeatedly dividing in half the portion of the list that could contain the item,
 * until you've narrowed down the possible locations to just one.
 *
 * @param sortedArray - the given array.
 * @param seekElement - the item to search for.
 * @returns - the index item or -1 if it's not found.
 *
 * @example
 * ```ts
 * const index = binarySearch([1, 2, 3, 4, 5], 4); // 3
 * ```
 */
export function binarySearch<Element>(
  sortedArray: Element[],
  seekElement: Element,
  compareFn?: ComparatorFunction<Element>
) {
  // By default creates natural comparator.
  const comparator = new Comparator(compareFn);

  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    // Let's calculate the index of the middle element.
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    // If we've found the element just return its position.
    if (comparator.equal(sortedArray[middleIndex], seekElement)) {
      return middleIndex;
    }

    // Decide which half to choose for seeking next: left or right one.
    if (comparator.lessThan(sortedArray[middleIndex], seekElement)) {
      // Go to the right half of the array.
      startIndex = middleIndex + 1;
    } else {
      // Go to the left half of the array.
      endIndex = middleIndex - 1;
    }
  }
  return -1;
}
