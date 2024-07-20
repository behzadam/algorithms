import { Nullable } from "@/types";

export class BinaryTree<Value> {
  value: Value;
  left: Nullable<BinaryTree<Value>>;
  right: Nullable<BinaryTree<Value>>;

  constructor(value: Value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
