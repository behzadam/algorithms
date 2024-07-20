import Comparator from "../comparator";

type Product = {
  rate: number;
};
let product1: Product;
let product2: Product;

beforeAll(() => {
  product1 = {
    rate: 1,
  };

  product2 = {
    rate: 2,
  };
});

describe("Comparator", () => {
  it("compares with default natural order comparator function", () => {
    const comparator = new Comparator();

    // equal
    expect(comparator.equal(0, 0)).toBe(true);
    expect(comparator.equal(0, 1)).toBe(false);
    // less than
    expect(comparator.lessThan(1, 2)).toBe(true);
    expect(comparator.lessThan(-1, 2)).toBe(true);
    expect(comparator.lessThan(10, 2)).toBe(false);
    // less than or equal
    expect(comparator.lessThanOrEqual(10, 2)).toBe(false);
    expect(comparator.lessThanOrEqual(1, 1)).toBe(true);
    expect(comparator.lessThanOrEqual(0, 0)).toBe(true);
    // greater than
    expect(comparator.greaterThan(0, 0)).toBe(false);
    expect(comparator.greaterThan(10, 0)).toBe(true);

    // greater than or equal
    expect(comparator.greaterThanOrEqual(10, 0)).toBe(true);
    expect(comparator.greaterThanOrEqual(10, 10)).toBe(true);
    expect(comparator.greaterThanOrEqual(0, 10)).toBe(false);
  });

  it("compares two strings by lenght and natural ordering", () => {
    const stringComparator = Comparator.comparing((a: string) => a.length);
    const comparator = new Comparator(stringComparator);

    expect(comparator.equal("a", "b")).toBe(true);
    expect(comparator.equal("a", "")).toBe(false);
    expect(comparator.lessThan("b", "aa")).toBe(true);
    expect(comparator.greaterThanOrEqual("a", "aa")).toBe(false);
    expect(comparator.greaterThanOrEqual("aa", "a")).toBe(true);
    expect(comparator.greaterThanOrEqual("a", "a")).toBe(true);
  });

  it("compares two strings by lenght and reverse ordering", () => {
    const stringComparator = Comparator.comparing(
      (a: string) => a.length,
      Comparator.reverseOrder()
    );
    const comparator = new Comparator(stringComparator);

    expect(comparator.equal("a", "b")).toBe(true);
    expect(comparator.equal("a", "")).toBe(false);
    expect(comparator.lessThan("b", "aa")).toBe(false);
    expect(comparator.greaterThanOrEqual("a", "aa")).toBe(true);
    expect(comparator.greaterThanOrEqual("aa", "a")).toBe(false);
    expect(comparator.greaterThanOrEqual("a", "a")).toBe(true);
  });

  it("compares objects with custom comparator function", () => {
    const productComparator = Comparator.comparing(
      (product: Product) => product.rate
    );
    const comparator = new Comparator(productComparator);
    expect(comparator.equal(product1, product2)).toBe(false);
    expect(comparator.greaterThan(product1, product2)).toBe(false);
    expect(comparator.lessThanOrEqual(product1, product2)).toBe(true);
    expect(comparator.greaterThanOrEqual(product1, product2)).toBe(false);
  });

  it("compares objects with custom comparator function", () => {
    const productComparator = Comparator.comparing(
      (product: Product) => product.rate,
      Comparator.reverseOrder()
    );
    const comparator = new Comparator(productComparator);
    expect(comparator.equal(product1, product2)).toBe(false);
    expect(comparator.greaterThan(product1, product2)).toBe(true);
    expect(comparator.lessThanOrEqual(product1, product2)).toBe(false);
    expect(comparator.lessThan(product1, product2)).toBe(false);
    expect(comparator.greaterThanOrEqual(product1, product2)).toBe(true);
  });
});
