export class LinkedListNode<Item> {
  constructor(
    public value: Item,
    public next: LinkedListNode<Item> | null = null
  ) {}

  toString(callback?: (value: Item) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
