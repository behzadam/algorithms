import { LinkedList } from "./linked-list";

describe("LinkedList", () => {
  it("creates an empty linked list", () => {
    const linkedList = new LinkedList();
    expect(linkedList.toString()).toBe("");
  });
});
