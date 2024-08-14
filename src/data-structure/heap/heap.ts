import { ComparatorFunction, Nullable } from "@/types";
import { Comparator } from "@/utils";

/**
 * This class is a base class for Heap.
 * Don't use it directly and use MaxHeap or MinHeap instead.
 */
export default abstract class Heap<Item> {
  protected heap: Item[];
  protected comparator: Comparator<Item>;

  constructor(comparator?: ComparatorFunction<Item>) {
    this.heap = [];
    this.comparator = new Comparator(comparator);
  }

  /**
   * Returns left child index of the parent.
   * @param parentIndex
   * @returns
   */
  protected getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  /**
   * Returns right child index of the parent.
   * @param parentIndex
   * @returns
   */
  protected getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  /**
   * Returns parent index.
   * @param childIndex - index we are going to find the parent index.
   * @returns - parent index.
   */
  protected getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * Checks if the given index has parent or not.
   * @param childIndex the given index.
   * @returns true if has parent or false otherwise.
   */
  protected hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0;
  }

  /**
   * Checks if parent index has left child or not.
   * @param parentIndex - the parent index.
   * @returns true if parent has left child, false otherwise.
   */
  protected hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }

  /**
   * Checks if parent index has right child or not.
   * @param parentIndex - the parent index.
   * @returns true if parent has right child, false otherwise.
   */
  protected hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }

  /**
   *  Returns the left child of the given index.
   * @param parentIndex - the given parent index.
   * @returns - Item.
   */
  protected leftChild(parentIndex: number): Item {
    return this.heap[this.getLeftChildIndex(parentIndex)];
  }

  /**
   *  Returns the right child of the given index.
   * @param parentIndex - the given parent index.
   * @returns - Item.
   */
  protected rightChild(parentIndex: number): Item {
    return this.heap[this.getRightChildIndex(parentIndex)];
  }

  /**
   * Returns the parent of the given index.
   * @param childIndex - the given index.
   * @returns Item.
   */
  protected parent(childIndex: number): Item {
    return this.heap[this.getParentIndex(childIndex)];
  }

  /**
   * Swaps items by index.
   * @param indexOne - the index to swap.
   * @param indexTwo - the index to swap.
   */
  protected swap(indexOne: number, indexTwo: number): void {
    const tmp = this.heap[indexTwo];
    this.heap[indexTwo] = this.heap[indexOne];
    this.heap[indexOne] = tmp;
  }

  /**
   * Takes the last element (last in array or the bottom left in a tree)
   * in the heap container and lift it up until it is in the correct
   * order with respect to its parent element.
   * @param startIndex - start index.
   */
  protected heapifyUp(startIndex?: number): void {
    let currentIndex = startIndex || this.size() - 1;

    while (
      this.hasParent(currentIndex) &&
      !this.order(this.parent(currentIndex), this.heap[currentIndex])
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * Compares the parent element to its children and swap parent with the appropriate
   * child (smallest child for MinHeap, largest child for MaxHeap).
   * @param startIndex
   */
  protected heapifyDown(startIndex = 0): void {
    let currentIndex = startIndex;
    let nextIndex = -1;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.order(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (this.order(this.heap[currentIndex], this.heap[nextIndex])) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * This is comparator that checks the order of the list.
   * In MaxHeap left > right and in MinHeap left < right.
   * * This method must be override in the subclass.
   * @param left - left item.
   * @param right - right item.
   */
  protected order(left: Item, right: Item): boolean {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${left} and ${right} values.
      `);
  }

  /**
   * Finds item in the list with optional comparator function.
   * @param item - the given item to find.
   * @param comparator - optional comparator, by default uses: Comparator.naturalOrder.
   * @returns - array of indices.
   */
  public find(item: Item, compareFn = this.comparator): number[] {
    const foundItemIndices: number[] = [];
    for (let itemIndex = 0; itemIndex < this.size(); itemIndex += 1) {
      if (compareFn.equal(item, this.heap[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }
    return foundItemIndices;
  }

  /**
   * Adds item to the heap and heapifies up.
   * @param item - the item to add.
   * @returns - this.
   */
  public add(item: Item): Heap<Item> {
    this.heap.push(item);
    this.heapifyUp();
    return this;
  }

  /**
   * Returns the top item without removing it.
   * @returns
   */
  public peek(): Nullable<Item> {
    if (this.size() === 0) return null;
    return this.heap[0];
  }

  /**
   * Retrieves and removes the head of this queue, or returns null if this queue is empty.
   * @returns - head item or null.
   */
  public poll(): Nullable<Item> {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const item = this.heap[0];
    // Move the last element from the end to the head.
    this.heap[0] = this.heap.pop() as Item;
    this.heapifyDown();

    return item;
  }

  /**
   * Remove items from the heap that are matched with the given item.
   * @param item - the item to be removed.
   * @param comparator - optional comparator.
   * @returns - this.
   */
  remove(item: Item, compareFn = this.comparator): Heap<Item> {
    // Find number of items to remove.
    const numberOfItemsToRemove = this.find(item, compareFn).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      // We need to find item index to remove each time after removal since
      // indices are being changed after each heapify process.
      const indexToRemove = this.find(item, compareFn).pop() as number;

      // If we need to remove last child in the heap then just remove it.
      // There is no need to heapify the heap afterwards.
      if (indexToRemove === this.size() - 1) {
        this.heap.pop();
      } else {
        // Move last element in heap to the vacant (removed) position.
        this.heap[indexToRemove] = this.heap.pop() as Item;
        // Get parent.
        const parentItem = this.parent(indexToRemove);
        // If there is no parent or parent is in correct order with the node
        // we're going to delete then heapify down. Otherwise heapify up.
        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem || this.order(parentItem, this.heap[indexToRemove]))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  /**
   * Checks if the heap is empty.
   * @returns - true if is empty and false otherwise.
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Returns the heap lenght.
   * @returns
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Invokes the heap{array} toString() method.
   * @returns
   */
  toString() {
    return this.heap.toString();
  }
}
