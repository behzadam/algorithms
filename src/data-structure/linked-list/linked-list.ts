import { Nullable } from "@/types";
import { Comparator, ComparatorFunction } from "@/utils/comparator";
import { LinkedListNode } from "./linked-list-node";

/**
 * Linked list data structure.
 */
export class LinkedList<Item> {
  public head: Nullable<LinkedListNode<Item>>;
  public tail: Nullable<LinkedListNode<Item>>;

  private comparator: Comparator<Item>;

  constructor(compareFn?: ComparatorFunction<Item>) {
    this.head = null;
    this.tail = this.head;
    this.comparator = new Comparator(compareFn);
  }

  public toString(callback?: (item: Item) => string): string {
    return "";
  }
}
