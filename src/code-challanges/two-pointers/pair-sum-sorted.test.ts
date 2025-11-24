import { pairSumSorted } from "./pair-sum-sorted";

describe("pairSumSorted", () => {
  it.each([
    {
      input: [],
      target: 0,
      expected: [],
    },
    {
      input: [2, 2, 3],
      target: 5,
      expected: [0, 2],
    },
    {
      input: [-1, 2, 3],
      target: 2,
      expected: [0, 2],
    },
    {
      input: [-3, -2, -1],
      target: -5,
      expected: [0, 1],
    },
  ])(
    "returns $expected for input $input and target $target",
    ({ input, target, expected }) => {
      expect(pairSumSorted(input, target)).toEqual(expected);
    }
  );
});
