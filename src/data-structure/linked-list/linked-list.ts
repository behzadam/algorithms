import { Comparator, ComparatorFunction } from "@/utils/comparator";
import { LinkedListNode } from "./linked-list-node";

/**
 * Linked list data structure.
 */
export class LinkedList<Item> {
  public head: LinkedListNode<Item> | null;
  public tail: LinkedListNode<Item> | null;

  private comparator: Comparator<Item>;

  constructor(compareFn?: ComparatorFunction<Item>) {
    this.head = null;
    this.tail = this.head;
    this.comparator = new Comparator(compareFn);
  }

  /**
   * Prepends a node to the linked list.
   * @param value
   * @returns LinkedList
   */
  public prepend(value: Item): LinkedList<Item> {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * Appends a node to the linked list.
   * @param value to append.
   * @returns LinkedList
   */
  public append(value: Item): LinkedList<Item> {
    const newNode = new LinkedListNode(value);
    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    // Attach new node to the end of linked list.
    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;

    return this;
  }

  /**
   * Inserts a node to the linked list at the specified index.
   * @param value to insert.
   * @param rawIndex to insert.
   * @returns LinkedList
   */
  public insert(value: Item, rawIndex: number): LinkedList<Item> {
    const index = rawIndex < 0 ? 0 : rawIndex;
    if (index === 0) {
      this.prepend(value);
    } else {
      let count = 1;
      let currentNode = this.head;
      const newNode = new LinkedListNode(value);

      // Find the position to insert.
      while (currentNode) {
        if (count === index) break;
        currentNode = currentNode.next;
        count += 1;
      }

      if (currentNode) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      } else {
        if (this.tail) {
          this.tail.next = newNode;
          this.tail = newNode;
        } else {
          this.head = newNode;
          this.tail = newNode;
        }
      }
    }
    return this;
  }

  /**
   * Deletes a node from the linked list by value.
   * @param value to delete
   * @returns deletedNode
   */
  public delete(value: Item): LinkedListNode<Item> | null {
    if (!this.head) {
      // If there is no head then definitely the list is empty.
      return null;
    }

    let deletedNode = null;
    // If the head must be deleted then make next node head.
    while (this.head && this.comparator.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;
    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (this.comparator.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.tail && this.comparator.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }
    return deletedNode;
  }

  /**
   * Deletes the head node.
   * @returns deleted head node.
   */
  public deleteHead(): LinkedListNode<Item> | null {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedHead;
  }

  /**
   * Deletes the tail node.
   * @returns deleted tail node.
   */
  public deleteTail(): LinkedListNode<Item> | null {
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;
      return deletedTail;
    }

    // If there are many nodes in linked list...
    // Iterate to the one before the tail.
    let currentNode = this.head;
    while (currentNode?.next) {
      // If next node is a tail...
      if (!currentNode.next.next) {
        // Set the next of the current node to be null.
        // In this case the current node will become a new tail.
        // Then the tail has been deleted.
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    // Set the tail to be the last node.
    this.tail = currentNode;
    return deletedTail;
  }

  /**
   * Finds a node by value.
   * @param value to find.
   * @returns found node or null.
   */
  public find({
    value,
    callback,
  }: {
    value?: Item;
    callback?: (item: Item) => boolean;
  }): LinkedListNode<Item> | null {
    // If there is no head then linked list is empty.
    if (!this.head) {
      return null;
    }

    let currentNode: LinkedListNode<Item> | null = this.head;
    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // If value is specified then try to compare by value..
      if (
        value !== undefined &&
        this.comparator.equal(currentNode.value, value)
      ) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }
    return null;
  }

  /**
   * Generates a linked list from an array.
   * @param values array of items to append to the linked list.
   * @returns LinkedList
   */
  public fromArray(values: Item[]): LinkedList<Item> {
    values.forEach((value) => this.append(value));
    return this;
  }

  /**
   * Converts linked list to an array.
   * @returns array of nodes.
   */
  public toArray(): LinkedListNode<Item>[] {
    const nodes: LinkedListNode<Item>[] = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * Reverses linked list.
   * @returns reversed linked list.
   */
  public reverse(): LinkedList<Item> {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      // Next node in the original list.
      nextNode = currNode.next;
      // Invert the next pointer.
      currNode.next = prevNode;
      // Move prevNode and currNode one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }
    //  Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  /**
   * Converts linked list to a string.
   * @param callback to convert node to string.
   * @returns string representation of the linked list.
   * @example
   * linkedList.toString(node => node.value)
   * // returns "1,2,3,4,5"
   * linkedList.toString(node => node.value + node.next.value)
   * // returns "12,23,34,45"
   */
  public toString(callback?: (item: Item) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
