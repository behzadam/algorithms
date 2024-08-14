import { LinkedListNode } from "./linked-list-node";

type Item = { key: number; value: string };
let item: Item = { key: 1, value: "test" };

describe("LinkedListNode", () => {
  it("creates list node with value", () => {
    const node = new LinkedListNode<number>(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
  });

  it("creates list node with object as a value", () => {
    const node = new LinkedListNode<Item>(item);

    expect(node.value.value).toBe("test");
    expect(node.value.key).toBe(1);
    expect(node.next).toBeNull();
  });

  it("links nodes together", () => {
    const node2 = new LinkedListNode<number>(2);
    const node1 = new LinkedListNode<number>(1, node2);

    expect(node1.next).toBeDefined();
    expect(node2.next).toBeNull();
    expect(node1.value).toBe(1);
    expect(node1.next?.value).toBe(2);
  });

  it("converts node to string", () => {
    const node = new LinkedListNode<number>(1);

    expect(node.toString()).toBe("1");
    node.value = 2;
    expect(node.toString()).toBe("2");
  });

  it("converts node to string with custom stringifier", () => {
    const node = new LinkedListNode<Item>(item);
    const toStringCallback = (item: Item) =>
      `value: ${item.value}, key: ${item.key}`;

    expect(node.toString(toStringCallback)).toBe("value: test, key: 1");
  });
});
