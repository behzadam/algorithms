import { Comparator } from "@/utils";
import { LinkedList } from "./linked-list";

type Pair = { value: number; key: string };

describe("LinkedList", () => {
  it("creates an empty linked list", () => {
    const linkedList = new LinkedList();
    expect(linkedList.toString()).toBe("");
  });

  it("prepends node to linked list", () => {
    const linkedList = new LinkedList();

    linkedList.prepend(2);
    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("2");

    linkedList.append(1);
    linkedList.prepend(3);

    expect(linkedList.toString()).toBe("3,2,1");
  });

  it("appends node to linked list", () => {
    const linkedList = new LinkedList();

    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.toString()).toBe("1,2");
    expect(linkedList.tail?.next).toBeNull();
  });

  it("inserts node to linked list", () => {
    const linkedList = new LinkedList();

    linkedList.insert(4, 3);
    // It prepends the node to empty list.
    expect(linkedList.head?.toString()).toBe("4");
    expect(linkedList.tail?.toString()).toBe("4");

    // It appends the node to the end of the list because is out of the range.
    // List: 4,3
    linkedList.insert(3, 2);
    // List: 4,2,3
    linkedList.insert(2, 1);
    // It appends to the head of the list because index is -7 and would be 0 in the function.
    // List: 1,4,2,3
    linkedList.insert(1, -7);
    // List: 1,4,2,3,10
    linkedList.insert(10, 9);
    expect(linkedList.toString()).toBe("1,4,2,3,10");
  });

  it("deletes node by value from linked list", () => {
    const linkedList = new LinkedList();

    expect(linkedList.delete(5)).toBeNull();

    linkedList.append(1);
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);

    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("5");

    const deletedNode = linkedList.delete(3);
    expect(deletedNode?.value).toBe(3);
    expect(linkedList.toString()).toBe("1,1,2,4,5");

    linkedList.delete(3);
    expect(linkedList.toString()).toBe("1,1,2,4,5");

    linkedList.delete(1);
    expect(linkedList.toString()).toBe("2,4,5");

    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("5");

    linkedList.delete(5);
    expect(linkedList.toString()).toBe("2,4");

    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("4");

    linkedList.delete(4);
    expect(linkedList.toString()).toBe("2");

    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("2");

    linkedList.delete(2);
    expect(linkedList.toString()).toBe("");
  });

  it("deletes linked list tail", () => {
    const linkedList = new LinkedList();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("3");

    const deletedNode1 = linkedList.deleteTail();

    expect(deletedNode1?.value).toBe(3);
    expect(linkedList.toString()).toBe("1,2");
    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("2");

    const deletedNode2 = linkedList.deleteTail();

    expect(deletedNode2?.value).toBe(2);
    expect(linkedList.toString()).toBe("1");
    expect(linkedList.head?.toString()).toBe("1");
    expect(linkedList.tail?.toString()).toBe("1");

    const deletedNode3 = linkedList.deleteTail();

    expect(deletedNode3?.value).toBe(1);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("finds node by value", () => {
    const linkedList = new LinkedList();

    expect(linkedList.find({ value: 5 })).toBeNull();

    linkedList.append(1);
    expect(linkedList.find({ value: 1 })).toBeDefined();

    linkedList.append(2).append(3);

    const node = linkedList.find({ value: 2 });

    expect(node?.value).toBe(2);
    expect(linkedList.find({ value: 5 })).toBeNull();
  });

  it("finds node by callback", () => {
    const linkedList = new LinkedList<Pair>();

    linkedList
      .append({ value: 1, key: "test1" })
      .append({ value: 2, key: "test2" })
      .append({ value: 3, key: "test3" });

    const node = linkedList.find({
      callback: (value) => value.key === "test2",
    });

    expect(node).toBeDefined();
    expect(node?.value.value).toBe(2);
    expect(node?.value.key).toBe("test2");
    expect(
      linkedList.find({ callback: (value) => value.key === "test5" })
    ).toBeNull();
  });

  it("finds node by means of custom compare function", () => {
    const comparatorFunction = Comparator.comparing((a: Pair) => a.key);
    const linkedList = new LinkedList<Pair>(comparatorFunction);

    linkedList
      .append({ value: 1, key: "test1" })
      .append({ value: 2, key: "test2" })
      .append({ value: 3, key: "test3" });

    const node = linkedList.find({
      value: { value: 2, key: "test2" },
    });

    expect(node).toBeDefined();
    expect(node?.value.value).toBe(2);
    expect(node?.value.key).toBe("test2");
    expect(linkedList.find({ value: { value: 2, key: "test5" } })).toBeNull();
  });

  it("creates linked list from array", () => {
    const linkedList = new LinkedList();
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

    expect(linkedList.toString()).toBe("1,1,2,3,3,3,4,5");
  });

  it("finds preferring callback over compare function", () => {
    const greaterThan = (value: number, compareTo: number) =>
      value > compareTo ? 0 : 1;

    const linkedList = new LinkedList(greaterThan);
    linkedList.fromArray([1, 2, 3, 4, 5]);

    let node = linkedList.find({ value: 3 });
    expect(node?.value).toBe(4);

    node = linkedList.find({ callback: (value) => value < 3 });
    expect(node?.value).toBe(1);
  });

  it("stores objects in the list and to print them out", () => {
    const linkedList = new LinkedList<Pair>();

    const nodeValue1: Pair = { value: 1, key: "key1" };
    const nodeValue2: Pair = { value: 2, key: "key2" };

    linkedList.append(nodeValue1).prepend(nodeValue2);

    const nodeStringifier = (pair: Pair) => {
      return `${pair.key}:${pair.value}`;
    };

    expect(linkedList.toString(nodeStringifier)).toBe("key2:2,key1:1");
  });

  it("reverses linked list", () => {
    const linkedList = new LinkedList();

    // Add test values to linked list.
    linkedList.append(1).append(2).append(3);

    expect(linkedList.toString()).toBe("1,2,3");
    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.tail?.value).toBe(3);

    // Reverse linked list.
    linkedList.reverse();
    expect(linkedList.toString()).toBe("3,2,1");
    expect(linkedList.head?.value).toBe(3);
    expect(linkedList.tail?.value).toBe(1);

    // Reverse linked list back to initial state.
    linkedList.reverse();
    expect(linkedList.toString()).toBe("1,2,3");
    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.tail?.value).toBe(3);
  });
});
