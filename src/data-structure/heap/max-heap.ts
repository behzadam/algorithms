import Heap from "./heap";

/**
 * MaxHeap is a class that represents a max heap data structure.
 */
export class MaxHeap<Item> extends Heap<Item> {
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} left
   * @param {*} right
   * @return {boolean}
   */
  order(left: Item, right: Item): boolean {
    return this.comparator.greaterThanOrEqual(left, right);
  }
}
