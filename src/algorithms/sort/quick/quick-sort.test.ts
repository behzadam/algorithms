import { quickSort } from "./quick-sort";

describe("quickSort", () => {
  it("sorts an empty array", () => {
    expect(quickSort([])).toEqual([]);
  });

  it("sorts an array with one element", () => {
    expect(quickSort([1])).toEqual([1]);
  });

  it("sorts an array of numbers in ascending order", () => {
    expect(quickSort([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])).toEqual([
      1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9,
    ]);
  });

  it("sorts an array of strings in alphabetical order", () => {
    expect(quickSort(["banana", "apple", "cherry", "date"])).toEqual([
      "apple",
      "banana",
      "cherry",
      "date",
    ]);
  });

  it("sorts an array of objects using a custom comparator", () => {
    const arr = [{ value: 3 }, { value: 1 }, { value: 4 }, { value: 2 }];
    const compareFn = (a: { value: number }, b: { value: number }) =>
      a.value - b.value;

    expect(quickSort(arr, compareFn)).toEqual([
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
    ]);
  });

  it("sorts an array of negative numbers", () => {
    expect(quickSort([-3, -1, -4, -1, -5, -9])).toEqual([
      -9, -5, -4, -3, -1, -1,
    ]);
  });

  it("sorts an array with a mix of positive and negative numbers", () => {
    expect(quickSort([3, -1, 4, -1, 5, -9, 2, 6, -5, 3, 5])).toEqual([
      -9, -5, -1, -1, 2, 3, 3, 4, 5, 5, 6,
    ]);
  });
});
