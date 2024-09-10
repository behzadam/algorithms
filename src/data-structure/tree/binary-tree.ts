import { Nullable } from "@/types";

/**
 * Represents a node in a binary tree data structure.
 *
 * @template Value - The type of the value stored in the node.
 */
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
