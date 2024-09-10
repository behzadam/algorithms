import { Comparator } from "@/utils/comparator";
import { binarySearch } from "./binary-search";

describe("binarySearch", () => {
  it("searchs number in sorted array", () => {
    expect(binarySearch([], 1)).toBe(-1);
    expect(binarySearch([1], 1)).toBe(0);
    expect(binarySearch([1, 2], 1)).toBe(0);
    expect(binarySearch([1, 2], 2)).toBe(1);
    expect(binarySearch([1, 5, 10, 12], 1)).toBe(0);
    expect(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 17)).toBe(5);
    expect(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 1)).toBe(0);
    expect(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 100)).toBe(7);
    expect(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 0)).toBe(-1);
  });

  it("searchs object in sorted array of objects", () => {
    type Object = { key: number; value?: string };
    const sortedArrayOfObjects = [
      { key: 1, value: "value1" },
      { key: 2, value: "value2" },
      { key: 3, value: "value3" },
    ];

    const comparator = Comparator.comparing((a: Object) => a.key);

    // Alternative comparator function
    // But we don't want to repeat ourselves and use comparing function to generate it.
    // const comparator = (a: Object, b: Object) => {
    //   if (a.key === b.key) return 0;
    //   return a.key < b.key ? -1 : 1;
    // };

    expect(binarySearch([], { key: 1, value: "" }, comparator)).toBe(-1);
    expect(binarySearch(sortedArrayOfObjects, { key: 4, value: "" }, comparator)).toBe(-1);
    expect(binarySearch(sortedArrayOfObjects, { key: 1, value: "" }, comparator)).toBe(0);
    expect(binarySearch(sortedArrayOfObjects, { key: 2, value: "" }, comparator)).toBe(1);
    expect(binarySearch(sortedArrayOfObjects, { key: 3, value: "" }, comparator)).toBe(2);
  });});
