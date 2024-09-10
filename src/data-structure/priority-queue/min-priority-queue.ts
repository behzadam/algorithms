import { Comparator } from "@/utils/comparator";
import { MinHeap } from "../heap/min-heap";

/**
 * A min priority queue is a data structure that stores a collection of elements
 * with associated priorities. It supports the following operations:
 *
 * - Add: Adds an element with a priority to the queue.
 * - Poll: Removes and returns the element with the minimum priority.
 * - Peek: Returns the element with the minimum priority without removing it.
 *
 * The min priority queue ensures that the element with the highest priority
 * is always accessible for poll or peek operations.
 * The priority of each element determines its position in the queue,
 * with lower priority values indicating higher priority.
 */
export default class MinPriorityQueue<Item> extends MinHeap<Item> {
  private queue: Map<Item, number>;

  constructor() {
    super();
    this.queue = new Map<Item, number>();
    this.comparator = new Comparator(this.internalComparator.bind(this));
  }

  /**
   * Internal comparator function that compares two items,
   * based on their positions in the queue.
   * @param left - left item to compare.
   * @param right - right item to compare.
   * @returns - 0 | 1 | -1
   */
  private internalComparator(left: Item, right: Item): number {
    if (this.queue.get(left) === this.queue.get(right)) {
      return 0;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.queue.get(left)! < this.queue.get(right)! ? -1 : 1;
  }

  /**
   * Adds item to the priority queue.
   * @param item - item to add.
   * @param priority - item priority.
   * @returns this.
   */
  public add(item: Item, priority = 0) {
    this.queue.set(item, priority);
    super.add(item);
    return this;
  }

  /**
   * Removes item from priority queue.
   * @param item - item to remove.
   * @param comparator - optional custom comparator.
   * @returns - this.
   */
  public remove(item: Item, comparator?: Comparator<Item>) {
    super.remove(item, comparator);
    this.queue.delete(item);
    return this;
  }

  /**
   * Changes the priority of an item in the queue.
   * @param item - item to re-prioritize.
   * @param priority - new item's priority.
   * @returns - this.
   */
  public changePriority(item: Item, priority: number) {
    this.remove(item, new Comparator(Comparator.naturalOrder()));
    this.add(item, priority);
    return this;
  }

  /**
   * Finds items in the queue and returns the indices.
   * @param item
   * @returns array of indices.
   */
  public findByValue(item: Item): number[] {
    return this.find(item, new Comparator(Comparator.naturalOrder()));
  }

  /**
   * Checks if a given item already exists in the queue.
   * @param item - the given item to check.
   * @returns - true if the item exists, false if is not exists.
   */
  public isExists(item: Item): boolean {
    return this.findByValue(item).length > 0;
  }
}
