import HashTable from "./hash-table";

describe("HashTable", () => {
  it("creates hash table of certain size", () => {
    const defaultHashTable = new HashTable();
    expect(defaultHashTable.size()).toBe(32);

    const biggerHashTable = new HashTable(64);
    expect(biggerHashTable.size()).toBe(64);
  });

  it("sets, reads and delete data with collisions", () => {
    const hashTable = new HashTable<string>(3);

    hashTable.set("a", "sky-old");
    hashTable.set("a", "sky");
    hashTable.set("b", "sea");
    hashTable.set("c", "earth");
    hashTable.set("d", "ocean");

    expect(hashTable.has("x")).toBe(false);
    expect(hashTable.has("b")).toBe(true);
    expect(hashTable.has("c")).toBe(true);

    expect(hashTable.get("a")).toBe("sky");
    expect(hashTable.get("d")).toBe("ocean");
    expect(hashTable.get("x")).toBeNull();

    hashTable.remove("a");

    expect(hashTable.remove("not-existing")).toBeNull();

    expect(hashTable.get("a")).toBeNull();
    expect(hashTable.get("d")).toBe("ocean");

    hashTable.set("d", "ocean-new");
    expect(hashTable.get("d")).toBe("ocean-new");
  });

  it("adds objects to hash table", () => {
    const hashTable = new HashTable<{ prop1: string; prop2: string }>();

    hashTable.set("objectKey", { prop1: "a", prop2: "b" });

    const object = hashTable.get("objectKey");
    expect(object).toBeDefined();
    expect(object?.prop1).toBe("a");
    expect(object?.prop2).toBe("b");
  });

  it("tracks actual keys", () => {
    const hashTable = new HashTable(3);

    hashTable.set("a", "sky-old");
    hashTable.set("a", "sky");
    hashTable.set("b", "sea");
    hashTable.set("c", "earth");
    hashTable.set("d", "ocean");

    expect(hashTable.getKeys()).toEqual(["a", "b", "c", "d"]);
    expect(hashTable.has("a")).toBe(true);
    expect(hashTable.has("x")).toBe(false);

    hashTable.remove("a");

    expect(hashTable.has("a")).toBe(false);
    expect(hashTable.has("b")).toBe(true);
    expect(hashTable.has("x")).toBe(false);
  });

  it("gets all the values", () => {
    const hashTable = new HashTable(3);

    hashTable.set("a", "alpha");
    hashTable.set("b", "beta");
    hashTable.set("c", "gamma");

    expect(hashTable.getValues()).toEqual(["gamma", "beta", "alpha"]);
  });

  it("gets all the values from empty hash table", () => {
    const hashTable = new HashTable();
    expect(hashTable.getValues()).toEqual([]);
  });

  it("gets all the values in case of hash collision", () => {
    const hashTable = new HashTable(3);

    // Keys `ab` and `ba` in current implementation should result in one hash (one bucket).
    // We need to make sure that several items from one bucket will be serialized.
    hashTable.set("ab", "one");
    hashTable.set("ba", "two");

    hashTable.set("ac", "three");

    expect(hashTable.getValues()).toEqual(["one", "two", "three"]);
  });
});
