import { Nullable } from "@/types";

export default class LinkedListNode<Value = unknown> {
  constructor(
    public value: Value,
    public next: Nullable<LinkedListNode<Value>> = null
  ) {}

  toString(callback?: (value: Value) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
