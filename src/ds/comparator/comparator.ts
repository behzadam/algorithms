import { ComparatorFunction } from "./comparator-function";

export default class Comparator<Element> {
  private _comparator: ComparatorFunction<Element>;

  constructor(comparator?: ComparatorFunction<Element>) {
    this._comparator = comparator || Comparator.naturalOrder();
  }

  /**
   * Returns a negative value if left is less than right.
   * Returns zero if left is equal to right.
   * Returns a positive value if left is greater than right.
   */
  public compare(left: Element, right: Element): number {
    return this._comparator(left, right);
  }

  /**
   * Checks if left and right are equal.
   * @param left
   * @param right
   * @returns true if the variables are equal.
   */
  public equal(left: Element, right: Element): boolean {
    return this.compare(left, right) === 0;
  }

  /**
   * Checks if left is less than right.
   * @param left
   * @param right
   * @returns true if the left is less than the right.
   */
  public lessThan(left: Element, right: Element): boolean {
    return this.compare(left, right) < 0;
  }

  /**
   * Checks if left is greater than right.
   * @param left
   * @param right
   * @returns true if the left is greater than the right.
   */
  public greaterThan(left: Element, right: Element): boolean {
    return this.compare(left, right) > 0;
  }

  /**
   * Checks if left is less than or equal to right.
   * @param left
   * @param right
   * @returns true if left is less than or equal right.
   */
  public lessThanOrEqual(left: Element, right: Element): boolean {
    return this.lessThan(left, right) || this.equal(left, right);
  }

  /**
   * Checks if left is greater than or equal to right.
   * @param left
   * @param right
   * @returns true if left is greater than or equal right.
   */
  public greaterThanOrEqual(left: Element, right: Element): boolean {
    return this.greaterThan(left, right) || this.equal(left, right);
  }

  /**
   * Returns an natural comparator function.
   * @returns function.
   */
  static naturalOrder<Element>(): ComparatorFunction<Element> {
    return (left: Element, right: Element) => {
      return left < right ? -1 : left > right ? 1 : 0;
    };
  }

  /**
   * Returns an natural but reversed comparator function.
   * @returns function.
   */
  static reverseOrder<Element>(): ComparatorFunction<Element> {
    return (left: Element, right: Element) => {
      return left < right ? 1 : left > right ? -1 : 0;
    };
  }

  /**
   * Returns a comparator function that compares two object properties.
   * @param keyExtractor - Element
   * @param keyComparator - optional custom comparator that by default is natural order.
   * @returns comparator function.
   * @example
   * ```ts
   * // Compares by lenght property
   * const stringComparator = Comparator.comparing((a: string) => a.length);
   * const comparator = new Comparator(stringComparator);
   * comparator.equal("a", "b") // true
   * ```
   * @beta
   */
  static comparing<Element, Property>(
    keyExtractor: (element: Element) => Property,
    keyComparator: ComparatorFunction<Property> = Comparator.naturalOrder()
  ): ComparatorFunction<Element> {
    return (left: Element, right: Element): number => {
      return keyComparator(keyExtractor(left), keyExtractor(right));
    };
  }
}
