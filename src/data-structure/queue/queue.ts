import LinkedList from "@/linked-list/linked-list";
import { Nullable } from "@/types";

/**
 * A Queue is defined as a linear data structure that
 * is open at both ends and the operations are performed
 * in First In First Out (FIFO) order.
 *
 * This queue is based on the LinkedList because
 * they are quite similar.
 */
export default class Queue<Element> {
  private list: LinkedList<Element>;
  constructor() {
    this.list = new LinkedList<Element>();
  }

  /**
   * Removes an element at front of the queue.
   * @returns null or element.
   */
  public dequeue(): Nullable<Element> {
    const removed = this.list.shift();
    return removed ? removed.value : null;
  }

  /**
   * Adds an element to the end of the queue.
   * @param value
   */
  public enqueue(value: Element): void {
    this.list.append(value);
  }

  /**
   * Returns the element at front of the queue whitout removing it.
   * @returns null or element.
   */
  public peek(): Nullable<Element> {
    if (this.isEmpty()) return null;
    return this.list.head?.value;
  }

  /**
   * Checks if queue is empty or not.
   * @returns
   */
  public isEmpty(): boolean {
    return !this.list.head;
  }

  /**
   * Returns comma separate string form the queue.
   * @param callback optional callback function.
   * @returns string
   */
  public toString(callback?: (value: Element) => string): string {
    return this.list.toString(callback);
  }
}
