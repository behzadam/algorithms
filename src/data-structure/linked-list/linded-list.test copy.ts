import { Comparator } from "@/comparator";
import LinkedList from "./linked-list";

describe("LinkedList Refactored", () => {
  it("creates an empty linked list", () => {
    const linkedList = new LinkedList();

    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    expect(linkedList.toArray()).toStrictEqual([]);
    expect(linkedList.toString()).toBe("");
  });

  it("creates a linked list from an array", () => {
    const linkedList = new LinkedList();
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    linkedList.fromArray(arr);
    expect(linkedList.toString()).toBe("1,2,3,4,5,6,7,8,9");
  });

  it("appends to the linked list", () => {
    const linkedList = new LinkedList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.toString()).toBe("1,2,3");
    expect(linkedList.tail?.next).toBeNull();
  });

  it("prepends to the linked list", () => {
    const linkedList = new LinkedList<number>();

    linkedList.prepend(2);
    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("2");

    linkedList.append(1);
    linkedList.prepend(3);

    expect(linkedList.toString()).toBe("3,2,1");
  });

  it("finds node by primitive value", () => {
    const stringComparator = Comparator.comparing((a: string) => a.length);
    const linkedList = new LinkedList<string>(stringComparator);

    linkedList.append("one");
    linkedList.append("two");
    linkedList.append("three");

    const node = linkedList.find({ value: "one" });

    expect(node).not.toBeNull();
    expect(node?.value).toBe("one");

    const withCallback = linkedList.find({
      filter: (a: string) => a.startsWith("t", 0),
    });

    expect(withCallback).not.toBeNull();
    expect(withCallback?.value).toBe("two");

    const notFound = linkedList.find({ value: "four" });
    expect(notFound).toBeNull();
  });

  it("gets node by index", () => {
    const linkedList = new LinkedList<string>();

    linkedList.append("one");
    linkedList.append("two");
    linkedList.append("three");

    const node0 = linkedList.get(0);
    expect(node0?.value).toBe("one");

    const node2 = linkedList.get(2);
    expect(node2?.value).toBe("three");
  });

  it("sets node by index", () => {
    const linkedList = new LinkedList<string>();

    linkedList.append("one");

    const notFound = linkedList.set(1, "Two");
    expect(notFound).toBe(false);

    const result = linkedList.set(0, "Two");
    const node = linkedList.get(0);
    expect(result).toBe(true);
    expect(node?.value).toBe("Two");
  });

  it("inserts node by index", () => {
    const linkedList = new LinkedList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.toString()).toBe("1,2,3");

    linkedList.insert(1, 4);

    expect(linkedList.toString()).toBe("1,4,2,3");

    // index = -1
    expect(linkedList.insert(-1, 5)).toBe(false);
    // index > list.lenght
    expect(linkedList.insert(6, 5)).toBe(false);
    // index == list.lenght
    // console.log(linkedList.size());
    expect(linkedList.insert(linkedList.size(), 5)).toBe(true);
    expect(linkedList.toString()).toBe("1,4,2,3,5");
  });

  it("removes node from the end of the linked list", () => {
    const linkedList = new LinkedList<number>();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);

    linkedList.pop();
    expect(linkedList.toString()).toBe("1,2,3");

    linkedList.pop();
    expect(linkedList.toString()).toBe("1,2");

    linkedList.pop();
    expect(linkedList.toString()).toBe("1");
  });

  it("removes node from the head of the linked list", () => {
    const linkedList = new LinkedList<number>();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);

    linkedList.shift();
    expect(linkedList.toString()).toBe("2,3,4");

    linkedList.shift();
    expect(linkedList.toString()).toBe("3,4");

    linkedList.shift();
    expect(linkedList.toString()).toBe("4");

    linkedList.shift();
    expect(linkedList.toString()).toBe("");
  });

  it("removes node by index of the linked list", () => {
    const linkedList = new LinkedList<number>();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);

    linkedList.removeAt(1);
    expect(linkedList.toString()).toBe("1,3,4");

    linkedList.removeAt(2);
    expect(linkedList.toString()).toBe("1,3");

    // Out of the bounded
    expect(linkedList.removeAt(linkedList.size() + 1)).toBeNull();
    expect(linkedList.removeAt(-1)).toBeNull();
  });

  it("removes node by value of the linked list", () => {
    const linkedList = new LinkedList<number>();

    linkedList.append(1);
    expect(linkedList.remove(2)).toBeNull();

    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);

    linkedList.remove(1);
    expect(linkedList.toString()).toBe("2,3,4");
    expect(linkedList.head?.toString()).toBe("2");
    expect(linkedList.tail?.toString()).toBe("4");
  });

  it("reverses linked list", () => {
    const linkedList = new LinkedList<number>();

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
