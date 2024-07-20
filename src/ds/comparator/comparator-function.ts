export type ComparatorFunction<Element> = (
  left: Element,
  right: Element
) => number | 1 | -1 | 0;
