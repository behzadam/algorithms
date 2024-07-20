import { range } from "./range";

describe("range", () => {
  it("returns range of numbers", () => {
    expect([...range(0, 5)]).toEqual([0, 1, 2, 3, 4]);
    expect([...range(3, -1, -1)]).toEqual([3, 2, 1, 0]);
    expect([...range(2, 2)]).toEqual([]);
  });
});
