import Comparator from "@/comparator/comparator";
import { ComparatorFunction } from "@/comparator/comparator-function";
import { Nullable } from "@/types";
import LinkedListNode from "./linked-list-node";

/**
 * Finding a node by value or a callback funtion.
 * @internal
 */
type FindOptions<Value> = Partial<
  Required<{ value: Value; filter: (value: Value) => boolean }>
>;

/**
 * A linked list is a linear data structure consisting of a sequence of elements known as nodes.
 * Each node contains two parts: the data and a reference to the next node in the sequence.
 *
 * Unlike arrays, linked lists do not require contiguous memory allocation.
 * Each node is dynamically allocated and can be scattered in different memory locations.
 * The connection between nodes is established through pointers or references.
 *
 * Linked lists provide flexibility in terms of insertion and deletion compared to arrays,
 * as they do not require shifting elements to accommodate changes.
 * However, accessing a specific element in a linked list requires traversing through the nodes from the head,
 * which can be slower than direct indexing in arrays.
 * Linked lists are used in various scenarios,
 * such as implementing stacks, queues, hash tables, and as the foundation for more complex data structures like graphs and trees.
 *
 * @public
 */
export default class LinkedList<Value> {
  public head: Nullable<LinkedListNode<Value>>;
  public tail: Nullable<LinkedListNode<Value>>;

  private compare: Comparator<Value>;

  constructor(comparator?: ComparatorFunction<Value>) {
    this.head = null;
    this.tail = this.head;
    this.compare = new Comparator(comparator);
  }

  /**
   * Traverse the linked list and yield items.
   * @returns Generator<LinkedListNode<Value>, void, unknown>
   */
  private *traverse() {
    let currentNode = this.head;
    while (currentNode) {
      yield currentNode;
      currentNode = currentNode.next;
    }
  }

  /**
   * Adds a node to the end of the list.
   * @param value
   * @returns this
   */
  public append(value: Value): LinkedList<Value> {
    const newNode = new LinkedListNode(value);

    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }

    return this;
  }

  /**
   * Adds a node to the beginning of the list.
   * @param value
   * @returns this
   */
  public prepend(value: Value): LinkedList<Value> {
    const newNode = new LinkedListNode<Value>(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    return this;
  }

  /**
   * Inserts new node by index into the list.
   * @param index - index of new node.
   * @param value - value of new node.
   * @returns
   */
  public insert(index: number, value: Value): boolean {
    const length = this.size();

    if (index < 0 || index > length) return false;
    else if (index === 0) this.prepend(value);
    else if (index === length) this.append(value);
    else {
      const newNode = new LinkedListNode<Value>(value);
      // Find previous node of current index.
      const prev = this.get(index - 1) as LinkedListNode<Value>;
      // Push new node between current and previous node.
      newNode.next = prev.next;
      prev.next = newNode;
    }

    return true;
  }

  /**
   * Creates a linked list by an array.
   * @param values
   * @returns this
   */
  public fromArray(values: Value[]): LinkedList<Value> {
    values.forEach((value) => this.append(value));
    return this;
  }

  /**
   * Removes a node from the end of the list.
   * @returns - removed node or null.
   */
  public pop(): Nullable<LinkedListNode<Value>> {
    if (!this.head) return null;

    let current = this.head;
    let temp = this.head;
    while (current.next) {
      temp = current;
      current = current.next;
    }
    this.tail = temp;
    this.tail.next = null;

    if (this.size() === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  /**
   * Removes a node from the head of the list.
   * @returns - removed node or null.
   */
  public shift(): Nullable<LinkedListNode<Value>> {
    if (!this.head) return null;

    const current = this.head;
    this.head = this.head.next;
    current.next = null;
    if (this.size() === 0) {
      this.tail = null;
    }

    return current;
  }

  /**
   * Removes a node from the list by index.
   * @param index - index of the node.
   * @returns removed node or null.
   */
  public removeAt(index: number): Nullable<LinkedListNode<Value>> {
    const lenght = this.size();

    if (index === 0) return this.shift();
    if (index === lenght) return this.pop();
    if (index < 0 || index >= lenght) return null;

    const prev = this.get(index - 1) as LinkedListNode<Value>;
    const current = prev?.next as LinkedListNode<Value>;

    prev.next = current?.next;
    current.next = null;

    return current;
  }

  /**
   * Removes a node from the list by index.
   * @param index - index of the node.
   * @returns removed node or null.
   */
  public remove(value: Value): Nullable<LinkedListNode<Value>> {
    if (!this.head) return null;

    let deleted: Nullable<LinkedListNode<Value>> = null;
    // If the head must be deleted then make next node that is different
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleted = this.head;
      this.head = this.head.next;
    }

    let current = this.head;
    if (current !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (current?.next) {
        if (this.compare.equal(current.next.value, value)) {
          deleted = current.next;
          current.next = current.next.next;
        } else {
          current = current.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.tail && this.compare.equal(this.tail.value, value)) {
      this.tail = current;
    }
    return deleted;
  }

  /**
   * Returns node by index.
   * @param index - index of node.
   * @returns null or node.
   */
  public get(index: number): Nullable<LinkedListNode<Value>> {
    if (index < 0 || index >= this.size()) return null;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current?.next;
    }
    return current;
  }

  /**
   * Updates a node value by index.
   * @param index - index of node.
   * @param value - value to set.
   * @returns true if node is set with new value and otherwise false.
   */
  public set(index: number, value: Value): boolean {
    const node = this.get(index);
    if (!node) return false;
    node.value = value;
    return true;
  }

  /**
   * Searchs in the list by
   * @param value - to search.
   * @param filter - is a callback function that if is passed then compare function would be ignore.
   * @returns the first node that matched or null.
   */
  public find({
    value,
    filter,
  }: FindOptions<Value>): Nullable<LinkedListNode<Value>> {
    for (const node of this.traverse()) {
      if (filter && filter(node.value)) return node;
      if (value && this.compare.equal(node.value, value)) return node;
    }
    return null;
  }

  /**
   * Reverses linked list
   */
  public reverse(): void {
    let current = this.head;
    let next: Nullable<LinkedListNode<Value>>;
    let prev: Nullable<LinkedListNode<Value>>;

    while (current) {
      // Store next node.
      next = current.next;
      // Change next node of the current node so it would link to previous node.
      current.next = prev;

      // Move prev and current nodes one step forward.
      prev = current;
      current = next;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prev;
  }

  /**
   * Generates an array of nodes.
   * @returns array of nodes.
   */
  public toArray(): LinkedListNode<Value>[] {
    return Array.from(this.traverse());
  }

  /**
   * Returns the lenght of the list.
   * @returns - 0 or lenght.
   */
  public size(): number {
    return this.toArray().length;
  }

  /**
   * Invokes an optional callback function for each node and returns comma separated string.
   * @param callback - Optional callback function
   * @returns string
   */
  public toString(callback?: (value: Value) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
