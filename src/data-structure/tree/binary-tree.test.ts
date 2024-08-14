import { BinaryTree } from "./binary-tree";

describe("BinaryTree", () => {
  it("creates node", () => {
    const node = new BinaryTree(2);

    expect(node).toBeDefined();

    expect(node.value).not.toBeNull();
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();

    node.left = new BinaryTree(1);
    node.right = new BinaryTree(3);

    expect(node.value).toBe(2);
    expect(node.left.value).toBe(1);
    expect(node.right.value).toBe(3);
  });
});
