import { Nullable } from "@/types";

export class LinkedListNode<Item> {
  constructor(
    public value: Item,
    public next: Nullable<LinkedListNode<Item>> = null
  ) {}

  toString(callback?: (value: Item) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
