import Heap from "./heap";
export default class MaxHeap<TItem> extends Heap<TItem> {
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} left
   * @param {*} right
   * @return {boolean}
   */
  order(left: TItem, right: TItem): boolean {
    return this.compare.greaterThanOrEqual(left, right);
  }
}
