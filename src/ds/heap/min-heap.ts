import Heap from "./heap";

export default class MinHeap<TData> extends Heap<TData> {
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} left
   * @param {*} right
   * @return {boolean}
   */
  order(left: TData, right: TData): boolean {
    return this.compare.lessThanOrEqual(left, right);
  }
}
