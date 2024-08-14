/**
 * Comparator function type.
 *
 * @param {Element} left
 * @param {Element} right
 * @returns {number}
 * -1 if left is less than right.
 * 0 if left is equal to right.
 * 1 if left is greater than right.
 * 
 */
export type ComparatorFunction<Element> = (
  left: Element,
  right: Element
) => number | 1 | -1 | 0;
