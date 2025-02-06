import { bubbleSort } from "./bubble-sort";

describe("bubbleSort", () => {
  it("sorts array of strings alphabetically", () => {
    const input = ["zebra", "apple", "banana", "cat"];
    const expected = ["apple", "banana", "cat", "zebra"];
    expect(bubbleSort(input, 0, input.length - 1)).toEqual(expected);
  });

  it("sorts array of objects by custom comparator", () => {
    type Person = { age: number };
    const input: Person[] = [{ age: 30 }, { age: 25 }, { age: 35 }];
    const expected: Person[] = [{ age: 25 }, { age: 30 }, { age: 35 }];
    const compareFn = (a: Person, b: Person) => a.age - b.age;

    expect(bubbleSort(input, 0, input.length - 1, compareFn)).toEqual(expected);
  });
});
