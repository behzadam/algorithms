import { ComparatorFunction, Nullable } from "@/types";
import { Comparator } from "@/utils";
import LinkedListNode from "./linked-list-node";

/**
 * Linked list data structure.
 */
export class LinkedList<Item> {
  public head: Nullable<LinkedListNode<Item>>;
  public tail: Nullable<LinkedListNode<Item>>;

  private compare: Comparator<Item>;

  constructor(comparator?: ComparatorFunction<Item>) {
    this.head = null;
    this.tail = this.head;
    this.compare = new Comparator(comparator);
  }

  /**
   * Traverse the linked list and yield items.
   * @returns Generator<LinkedListNode<Item>, void, unknown>
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
   * @param item
   * @returns this
   */
  public append(item: Item): LinkedList<Item> {
    const newNode = new LinkedListNode(Item);

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
   * @param item - item of new node.
   * @returns this
   */
  public prepend(item: Item): LinkedList<Item> {
    const newNode = new LinkedListNode<Item>(item);
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
   * @param item - item of new node.
   * @returns
   */
  public insert(index: number, item: Item): boolean {
    const length = this.size();

    if (index < 0 || index > length) return false;
    else if (index === 0) this.prepend(item);
    else if (index === length) this.append(item);
    else {
      const newNode = new LinkedListNode<Item>(item);
      // Find previous node of current index.
      const prev = this.get(index - 1) as LinkedListNode<Item>;
      // Push new node between current and previous node.
      newNode.next = prev.next;
      prev.next = newNode;
    }

    return true;
  }

  /**
   * Creates a linked list by an array.
   * @param items
   * @returns this
   */
  public fromArray(items: Item[]): LinkedList<Item> {
    items.forEach((item) => this.append(item));
    return this;
  }

  /**
   * Removes a node from the end of the list.
   * @returns - removed node or null.
   */
  public pop(): Nullable<LinkedListNode<Item>> {
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
  public shift(): Nullable<LinkedListNode<Item>> {
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
  public removeAt(index: number): Nullable<LinkedListNode<Item>> {
    const lenght = this.size();

    if (index === 0) return this.shift();
    if (index === lenght) return this.pop();
    if (index < 0 || index >= lenght) return null;

    const prev = this.get(index - 1) as LinkedListNode<Item>;
    const current = prev?.next as LinkedListNode<Item>;

    prev.next = current?.next;
    current.next = null;

    return current;
  }

  /**
   * Removes a node from the list by index.
   * @param index - index of the node.
   * @returns removed node or null.
   */
  public remove(item: Item): Nullable<LinkedListNode<Item>> {
    if (!this.head) return null;

    let deleted: Nullable<LinkedListNode<Item>> = null;
    // If the head must be deleted then make next node that is different
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, item)) {
      deleted = this.head;
      this.head = this.head.next;
    }

    let current = this.head;
    if (current !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (current?.next) {
        if (this.compare.equal(current.next.value, item)) {
          deleted = current.next;
          current.next = current.next.next;
        } else {
          current = current.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.tail && this.compare.equal(this.tail.value, item)) {
      this.tail = current;
    }
    return deleted;
  }

  /**
   * Returns node by index.
   * @param index - index of node.
   * @returns null or node.
   */
  public get(index: number): Nullable<LinkedListNode<Item>> {
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
   * @param item - new value of node.
   * @returns true if node is set with new value and otherwise false.
   */
  public set(index: number, item: Item): boolean {
    const node = this.get(index);
    if (!node) return false;
    node.value = item;
    return true;
  }

  /**
   * Searchs in the list by
   * @param item - to search.
   * @param filter - is a callback function that if is passed then compare function would be ignore.
   * @returns the first node that matched or null.
   */
  public find({
    item,
    filter,
  }: {
    item: Item;
    filter: (item: Item) => boolean;
  }) {
    for (const node of this.traverse()) {
      if (filter && filter(node.value)) return node;
      if (item && this.compare.equal(node.value, item)) return node;
    }
    return null;
  }

  /**
   * Reverses linked list
   */
  public reverse(): void {
    let current = this.head;
    let next: Nullable<LinkedListNode<Item>>;
    let prev: Nullable<LinkedListNode<Item>>;

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
  public toArray(): LinkedListNode<Item>[] {
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
  public toString(callback?: (item: Item) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
