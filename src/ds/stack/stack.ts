import LinkedList from "@/linked-list/linked-list";
import { Nullable } from "@/types";

/**
 * A stack is a linear data structure that follows the Last In First Out (LIFO) principle.
 * This means that the last element added to the stack will be the first one to be removed.
 * The two main operations performed on a stack are push,
 * which adds an element to the top of the stack, and pop, which removes the top element from the stack.
 * Other operations include peek, which returns the top element without removing it,
 * and isEmpty, which checks if the stack is empty. Stacks are commonly used in programming languages,
 * compilers, and operating systems.
 */
export default class Stack<Element> {
  private list: LinkedList<Element>;
  constructor() {
    this.list = new LinkedList<Element>();
  }

  /**
   * Checks if the stack is empty or not;
   * @returns true if the stack is empty, false otherwise.
   */
  public isEmpty(): boolean {
    return !this.list.head;
  }

  /**
   * Returns the top of the stack without deleting it or null if stack is empty.
   */
  public peek(): Nullable<Element> {
    if (this.isEmpty()) return null;
    return this.list.head?.value;
  }

  /**
   * Adds element to top of the stack.
   */
  public push(element: Element): void {
    this.list.prepend(element);
  }

  /**
   * Removes the top of the stack.
   */
  public pop(): Nullable<Element> {
    const removedElement = this.list.shift();
    return removedElement ? removedElement.value : null;
  }

  /**
   * Returns array of all elements in the stack.
   * @returns array of elements or empty array if stack is empty.
   */
  public toArray(): Array<Element> {
    return this.list.toArray().map((item) => item.value);
  }

  /**
   * Invokes an optional callback function for each node and returns comma separated string.
   * @param callback Optional callbacl function.
   * @returns string
   */
  public toString(callback?: (value: Element) => string): string {
    return this.list.toString(callback);
  }
}
