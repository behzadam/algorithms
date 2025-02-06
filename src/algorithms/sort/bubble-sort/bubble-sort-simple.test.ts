import { bubbleSortSimple } from "./bubble-sort-simple";

describe("bubbleSortSimple", () => {
  test.each([
    {
      title: "sorts array with negative numbers",
      input: [-5, -2, -8, -1, -9],
      expected: [-9, -8, -5, -2, -1],
    },
    {
      title: "sorts array with mixed positive and negative numbers",
      input: [3, -1, 0, 4, -5, 2],
      expected: [-5, -1, 0, 2, 3, 4],
    },
    {
      title: "handles array with duplicate numbers",
      input: [4, 2, 4, 1, 2, 3],
      expected: [1, 2, 2, 3, 4, 4],
    },
    {
      title: "handles single element array",
      input: [1],
      expected: [1],
    },
    {
      title: "handles empty array",
      input: [],
      expected: [],
    },
    {
      title: "sorts array with floating point numbers",
      input: [3.14, 1.41, 2.71, 0.58],
      expected: [0.58, 1.41, 2.71, 3.14],
    },
  ])("$title", ({ input, expected }) => {
    expect(bubbleSortSimple(input)).toEqual(expected);
  });

  // Special cases that need separate handling
  it("maintains original array reference", () => {
    const arr = [3, 1, 4, 1, 5];
    const sorted = bubbleSortSimple(arr);
    expect(sorted).toBe(arr);
  });

  it("sorts a portion of array using from and to parameters", () => {
    const arr = [5, 4, 3, 2, 1];
    expect(bubbleSortSimple(arr, 1, 3)).toEqual([5, 2, 3, 4, 1]);
  });
});
