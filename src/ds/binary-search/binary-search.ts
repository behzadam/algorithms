/**
 * Binary search is an efficient algorithm for finding an item from a sorted list of items. 
 * It works by repeatedly dividing in half the portion of the list that could contain the item, 
 * until you've narrowed down the possible locations to just one.
 * @param sortedArray - the given array.
 * @param item - the item to search for.
 * @returns - the index item or -1 if it's not found.
 */
export function binarySearch(sortedArray: number[], item: number) {
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    // Let's calculate the index of the middle element.
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    // If we've found the element just return its position.
    if (sortedArray[middleIndex] === item) {
      return middleIndex;
    }

    // Decide which half to choose for seeking next: left or right one.
    if (sortedArray[middleIndex] < item) {
      // Go to the right half of the array.
      startIndex = middleIndex + 1;
    } else {
      // Go to the left half of the array.
      endIndex = middleIndex - 1;
    }
  }
  return -1;
}
