/**
 * Comparator function type.
 *
 * @param {Item} left
 * @param {Item} right
 * @returns {number}
 * -1 if left is less than right.
 * 0 if left is equal to right.
 * 1 if left is greater than right.
 *
 */
export type ComparatorFunction<Item> = (
  left: Item,
  right: Item
) => number | 1 | -1 | 0;

export class Comparator<Item> {
  private _comparator: ComparatorFunction<Item>;

  constructor(comparator?: ComparatorFunction<Item>) {
    // Use default comparator function if no comparator is provided.
    this._comparator = comparator || Comparator.naturalOrder();
  }

  /**
   * Returns a negative value if left is less than right.
   * Returns zero if left is equal to right.
   * Returns a positive value if left is greater than right.
   */
  public compare(left: Item, right: Item): number {
    return this._comparator(left, right);
  }

  /**
   * Checks if left and right are equal.
   * @param left
   * @param right
   * @returns true if the variables are equal.
   */
  public equal(left: Item, right: Item): boolean {
    return this.compare(left, right) === 0;
  }

  /**
   * Checks if left is less than right.
   * @param left
   * @param right
   * @returns true if the left is less than the right.
   */
  public lessThan(left: Item, right: Item): boolean {
    return this.compare(left, right) < 0;
  }

  /**
   * Checks if left is greater than right.
   * @param left
   * @param right
   * @returns true if the left is greater than the right.
   */
  public greaterThan(left: Item, right: Item): boolean {
    return this.compare(left, right) > 0;
  }

  /**
   * Checks if left is less than or equal to right.
   * @param left
   * @param right
   * @returns true if left is less than or equal right.
   */
  public lessThanOrEqual(left: Item, right: Item): boolean {
    return this.lessThan(left, right) || this.equal(left, right);
  }

  /**
   * Checks if left is greater than or equal to right.
   * @param left
   * @param right
   * @returns true if left is greater than or equal right.
   */
  public greaterThanOrEqual(left: Item, right: Item): boolean {
    return this.greaterThan(left, right) || this.equal(left, right);
  }

  /**
   * Returns an natural comparator function.
   * @returns function.
   */
  static naturalOrder<Item>(): ComparatorFunction<Item> {
    return (left: Item, right: Item) => {
      return left < right ? -1 : left > right ? 1 : 0;
    };
  }

  /**
   * Returns an natural but reversed comparator function.
   * @returns function.
   */
  static reverseOrder<Item>(): ComparatorFunction<Item> {
    return (left: Item, right: Item) => {
      return left < right ? 1 : left > right ? -1 : 0;
    };
  }

  /**
   * Returns a comparator function that compares two object properties.
   * @param keyExtractor - Item
   * @param keyComparator - optional custom comparator that by default is natural order.
   * @returns comparator function.
   * @example
   * ```ts
   * // Compares by lenght property
   * const stringComparator = Comparator.comparing((a: string) => a.length);
   * const comparator = new Comparator(stringComparator);
   * comparator.equal("a", "b") // true
   * ```
   */
  public static comparing<Item, Property>(
    keyExtractor: (item: Item) => Property,
    keyComparator: ComparatorFunction<Property> = Comparator.naturalOrder()
  ): ComparatorFunction<Item> {
    return (left: Item, right: Item): number => {
      return keyComparator(keyExtractor(left), keyExtractor(right));
    };
  }
}
