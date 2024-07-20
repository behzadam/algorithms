import { Comparator } from "@/comparator";
import LinkedList from "@/linked-list/linked-list";
import { Pair } from "@/types/pair";

/**
 * Hash table (also known as a hash map) is a data structure that allows efficient
 * insertion, deletion, and retrieval of key-value pairs.
 * It uses a hash function to map keys to indices in an array, where the corresponding values are stored.
 * The hash function takes the key as input and computes a hash code, which is used to determine the index.
 */
export default class HashTable<Value> {
  private buckets: LinkedList<Pair<Value>>[];
  private keys: Record<string, number> = {};

  constructor(size = 32) {
    // By default compares by value
    const pairComparator = Comparator.comparing(
      (pair: Pair<Value>) => pair.value
    );
    // Create hash table of certain size and fill each bucket with empty linked list.
    this.buckets = Array(size)
      .fill(null)
      .map(() => new LinkedList<Pair<Value>>(pairComparator));
  }

  /**
   * Generate number to use as index in the hash table.
   * @param key - The key of the hash table.
   * @returns number.
   */
  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 23) % this.buckets.length;
    }
    return hash;
  }

  /**
   * Adds or update a key/value pair to the hash table.
   * @param key
   * @param value
   * @returns
   */
  public set(key: string, value: Value): HashTable<Value> {
    const index = this.hash(key);
    this.keys[key] = index;

    const bucketLinkedList = this.buckets[index];
    const node = bucketLinkedList.find({
      filter: (item) => item.key === key,
    });

    if (!node) {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update value of existing node.
      node.value.value = value;
    }

    return this;
  }

  /**
   * Returns a node value with the given key.
   * @param key - The given key.
   * @returns node value or null.
   */
  public get(key: string) {
    const index = this.hash(key);
    const bucketLinkedList = this.buckets[index];
    const node = bucketLinkedList.find({
      filter: (item) => item.key === key,
    });

    if (node) {
      return node.value.value;
    }

    return null;
  }

  /**
   * Removes item by the given key.
   * @param key - The key to remove.
   * @returns null or removed key.
   */
  public remove(key: string) {
    const index = this.hash(key);
    delete this.keys[key];

    const bucketLinkedList = this.buckets[index];
    const node = bucketLinkedList.find({
      filter: (item) => item.key === key,
    });

    if (node) {
      return bucketLinkedList.remove(node.value);
    }

    return null;
  }

  /**
   * Checks if the given key is exists.
   * @param key - The given key.
   * @returns true or false.
   */
  public has(key: string): boolean {
    return key in this.keys;
  }

  /**
   * Returns all the keys.
   * @returns array of keys.
   */
  public getKeys(): string[] {
    return Object.keys(this.keys);
  }

  /**
   * Returns all hash table values.
   * @returns array of values.
   */
  getValues(): Value[] {
    return this.buckets.reduce(
      (values: Value[], bucket: LinkedList<Pair<Value>>) => {
        const bucketValues = bucket
          .toArray()
          .map((linkedListNode) => linkedListNode.value.value);
        return values.concat(bucketValues as Value);
      },
      []
    );
  }

  /**
   * Lenght of the hash table.
   * @returns number
   */
  public size(): number {
    return this.buckets.length;
  }
}
