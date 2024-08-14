import { LinkedList } from "@/data-structure/linked-list";

/**
 * A queue is a linear data structure that follows the First In First Out (FIFO) principle.
 */
export class Queue<Item> {
  public list: LinkedList<Item>;

  constructor() {
    this.list = new LinkedList<Item>();
  }

  /**
   * Removes the item at the front of the queue and returns it.
   * @returns the removed item or null if queue is empty.
   */
  public dequeue(): Item | null {
    const removed = this.list.deleteHead();
    return removed ? removed.value : null;
  }

  /**
   * Adds an item to the end of the queue.
   * @param item to be added.
   */
  public enqueue(item: Item) {
    this.list.append(item);
  }

  /**
   * Returns the item at front of the queue whitout removing it.
   * @returns null or item.
   */
  public peek(): Item | null {
    if (this.isEmpty()) return null;
    return this.list.head?.value ?? null;
  }

  /**
   * Checks if queue is empty or not.
   * @returns true or false.
   */
  public isEmpty(): boolean {
    return !this.list.head;
  }

  /**
   * Returns comma separate string form the queue.
   * @param callback optional callback function.
   * @returns string form of the queue or empty string.
   */
  public toString(callback?: (value: Item) => string): string {
    return this.list.toString(callback);
  }
}
