import Comparator from "./comparator";

type Category = {
  priority: number;
};

type Product = {
  name: string;
  price: number;
  category: Category;
};

const product1 = {
  name: "Product 1",
  price: 20,
  category: { priority: 1 },
};

const product2 = {
  name: "Product 2",
  price: 30,
  category: { priority: 2 },
};

describe("Comparator", () => {
  it("creates a comparator with default natural order", () => {
    const comparator = new Comparator<number>();

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

  it("compares two strings by length", () => {
    const stringComparator = Comparator.comparing((a: string) => a.length);
    const comparator = new Comparator(stringComparator);

    expect(comparator.equal("a", "b")).toBe(true);
    expect(comparator.equal("a", "")).toBe(false);
    expect(comparator.lessThan("b", "aa")).toBe(true);
    expect(comparator.greaterThanOrEqual("a", "aa")).toBe(false);
    expect(comparator.greaterThanOrEqual("aa", "a")).toBe(true);
    expect(comparator.greaterThanOrEqual("a", "a")).toBe(true);
  });

  it("compares two strings by localeCompare", () => {
    const customComparator = (a: string, b: string) => b.localeCompare(a);
    const comparator = new Comparator<string>(customComparator);
    expect(comparator.equal("a", "b")).toBe(false);
    expect(comparator.equal("b", "a")).toBe(false);
    expect(comparator.equal("a", "a")).toBe(true);
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

  it("compares two objects with custom comparator function", () => {
    const productComparator = Comparator.comparing(
      (product: Product) => product.price
    );
    const comparator = new Comparator(productComparator);
    expect(comparator.equal(product1, product2)).toBe(false);
    expect(comparator.greaterThan(product1, product2)).toBe(false);
    expect(comparator.lessThanOrEqual(product1, product2)).toBe(true);
    expect(comparator.greaterThanOrEqual(product1, product2)).toBe(false);
  });

  it("compares two objects with custom and reversed comparator function", () => {
    const productComparator = Comparator.comparing(
      (product: Product) => product.price,
      Comparator.reverseOrder()
    );
    const comparator = new Comparator(productComparator);
    expect(comparator.equal(product1, product2)).toBe(false);
    expect(comparator.greaterThan(product1, product2)).toBe(true);
    expect(comparator.lessThanOrEqual(product1, product2)).toBe(false);
    expect(comparator.lessThan(product1, product2)).toBe(false);
    expect(comparator.greaterThanOrEqual(product1, product2)).toBe(true);
  });

  it("compares numbers using a key extractor", () => {
    const numberComparator = Comparator.comparing((n: number) => n * 2);
    const comparator = new Comparator(numberComparator);

    expect(comparator.equal(2, 2)).toBe(true);
    expect(comparator.equal(1, 2)).toBe(false);
    expect(comparator.lessThan(1, 2)).toBe(true);
    expect(comparator.greaterThan(3, 2)).toBe(true);
  });

  it("compares objects using a nested property as key", () => {
    const nestedComparator = Comparator.comparing(
      (product: Product) => product.category.priority
    );
    const comparator = new Comparator(nestedComparator);
    expect(comparator.equal(product1, product2)).toBe(false);
    expect(comparator.greaterThan(product1, product2)).toBe(false);
    expect(comparator.lessThanOrEqual(product1, product2)).toBe(true);
    expect(comparator.greaterThanOrEqual(product1, product2)).toBe(false);
  });

  it("compares arrays using their length as key", () => {
    const arrayLengthComparator = Comparator.comparing(
      (arr: any[]) => arr.length
    );
    const comparator = new Comparator(arrayLengthComparator);

    expect(comparator.equal([1, 2], ["a", "b"])).toBe(true);
    expect(comparator.equal([1], [1, 2])).toBe(false);
    expect(comparator.lessThan([1], [1, 2, 3])).toBe(true);
    expect(comparator.greaterThan([1, 2, 3], [1])).toBe(true);
  });

  it("compares two objects with complex comparator function", () => {
    const complexComparator = Comparator.comparing(
      (product: Product) => product.price * product.category.priority
    );
    const comparator = new Comparator(complexComparator);

    // Product 1: 20
    // Product 2: 60
    expect(comparator.equal(product1, product2)).toBe(false);
    expect(comparator.greaterThan(product1, product2)).toBe(false);
    expect(comparator.lessThanOrEqual(product1, product2)).toBe(true);
    expect(comparator.greaterThanOrEqual(product1, product2)).toBe(false);
    expect(comparator.lessThan(product1, product2)).toBe(true);
    expect(comparator.greaterThan(product2, product1)).toBe(true);
    expect(comparator.lessThanOrEqual(product2, product1)).toBe(false);
    expect(comparator.greaterThanOrEqual(product2, product1)).toBe(true);
  });
});
