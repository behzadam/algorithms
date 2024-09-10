import { Comparator } from "@/utils/comparator";
import linearSearch from "./linear-search";

describe("linearSearch", () => {
  it("searches all numbers in array", () => {
    const array = [1, 2, 4, 6, 2];

    expect(linearSearch(array, 10)).toEqual([]);
    expect(linearSearch(array, 1)).toEqual([0]);
    expect(linearSearch(array, 2)).toEqual([1, 4]);
  });

  it("searches all strings in array", () => {
    const array = ["a", "b", "a"];

    expect(linearSearch(array, "c")).toEqual([]);
    expect(linearSearch(array, "b")).toEqual([1]);
    expect(linearSearch(array, "a")).toEqual([0, 2]);
  });

  it("searches through objects as well", () => {
    type Key = { key: number };
    const array: Key[] = [{ key: 5 }, { key: 6 }, { key: 7 }, { key: 6 }];
    const comparator = Comparator.comparing((el: Key) => el.key);

    expect(linearSearch(array, { key: 10 }, comparator)).toEqual([]);
    expect(linearSearch(array, { key: 5 }, comparator)).toEqual([0]);
    expect(linearSearch(array, { key: 6 }, comparator)).toEqual([1, 3]);
  });
});
