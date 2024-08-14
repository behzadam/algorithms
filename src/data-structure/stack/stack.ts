import { LinkedList } from "@/data-structure/linked-list";

/**
 * Stack data structure.
 */
export class Stack<Item> {
  public list: LinkedList<Item>;
  constructor() {
    this.list = new LinkedList<Item>();
  }

  /**
   * Checks if the stack is empty or not;
   * @returns true if the stack is empty, false otherwise.
   */
  public isEmpty(): boolean {
    return !this.list.head;
  }

  /**
   * Returns element at the top of the stack without removing it.
   * @returns element or null if stack is empty.
   */
  public peek(): Item | null {
    if (this.isEmpty()) return null;
    return this.list.head?.value ?? null;
  }

  /**
   * Adds element to the top of the stack.
   * @param element
   */
  public push(item: Item) {
    this.list.prepend(item);
  }

  /**
   * Removes element at the top of the stack.
   * @returns element or null if stack is empty.
   */
  public pop(): Item | null {
    const removedElement = this.list.deleteHead();
    return removedElement ? removedElement.value : null;
  }

  /**
   * Returns array of all elements in the stack.
   * @returns array of elements or empty array if stack is empty.
   */
  public toArray(): Array<Item> {
    return this.list.toArray().map((item) => item.value);
  }

  /**
   * Invokes an optional callback function for each node and returns comma separated string.
   * @param callback Optional callbacl function.
   * @returns string
   */
  public toString(callback?: (value: Item) => string): string {
    return this.list.toString(callback);
  }
}
