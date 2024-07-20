import { Pair } from "@/types/pair";
import Stack from "../stack";

describe("Stack", () => {
  it("creates empty stack", () => {
    const stack = new Stack();
    expect(stack).not.toBeNull();
    expect(stack.isEmpty()).toBe(true);
  });

  it("stacks data to stack", () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);

    expect(stack.toString()).toBe("2,1");
  });

  it("peeks data from stack", () => {
    const stack = new Stack();

    expect(stack.peek()).toBeNull();

    stack.push(1);
    stack.push(2);

    expect(stack.peek()).toBe(2);
    expect(stack.peek()).toBe(2);
  });

  it("checks if stack is empty", () => {
    const stack = new Stack();

    expect(stack.isEmpty()).toBe(true);

    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  it("pops data from stack", () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeNull();
    expect(stack.isEmpty()).toBe(true);
  });

  it("pushs/pops objects", () => {
    const stack = new Stack<Pair<string>>();

    stack.push({ value: "test1", key: "key1" } as Pair<string>);
    stack.push({ value: "test2", key: "key2" } as Pair<string>);

    const stringifier = (value: Pair<string>) => `${value.key}:${value.value}`;

    expect(stack.toString(stringifier)).toBe("key2:test2,key1:test1");
    expect(stack.pop()?.value).toBe("test2");
    expect(stack.pop()?.value).toBe("test1");
  });

  it("converts stack to array", () => {
    const stack = new Stack();

    expect(stack.peek()).toBeNull();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.toArray()).toEqual([3, 2, 1]);
  });
});
