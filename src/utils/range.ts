/**
 * The range() function generates the immutable sequence of numbers starting from the given start integer to the stop integer.
 *
 * @example
 * ``` ts
 * [...range(0, 5)]
 * [0, 1, 2, 3, 4]
 *
 * [...range(3, -1, -1)]
 * [3, 2, 1, 0]
 *
 * ```
 * @param start - start position
 * @param stop - end position
 * @param step - step value
 */
export function* range(start = 0, stop?: number, step = 1): Generator<number> {
  if (!stop) [start, stop] = [0, start];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) yield i;
}
