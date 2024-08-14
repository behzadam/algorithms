import Trie from "./trie";

describe("Trie", () => {
  it("creates trie", () => {
    const trie = new Trie();

    expect(trie).toBeDefined();
    expect(trie.head.toString()).toBe("*");
  });

  it("adds words to trie", () => {
    const trie = new Trie();

    trie.add("cat");

    expect(trie.head.toString()).toBe("*:c");
    expect(trie.head.getChild("c")?.toString()).toBe("c:a");

    trie.add("car");
    expect(trie.head.toString()).toBe("*:c");
    expect(trie.head.getChild("c")?.toString()).toBe("c:a");
    expect(trie.head.getChild("c")?.getChild("a")?.toString()).toBe("a:t,r");
    expect(
      trie.head.getChild("c")?.getChild("a")?.getChild("t")?.toString()
    ).toBe("t*");
  });

  it("deletes words from trie", () => {
    const trie = new Trie();

    trie.add("carpet");
    trie.add("car");
    trie.add("cat");
    trie.add("cart");
    expect(trie.isExist("carpet")).toBe(true);
    expect(trie.isExist("car")).toBe(true);
    expect(trie.isExist("cart")).toBe(true);
    expect(trie.isExist("cat")).toBe(true);

    // Try to delete not-existing word first.
    trie.remove("carpool");
    expect(trie.isExist("carpet")).toBe(true);
    expect(trie.isExist("car")).toBe(true);
    expect(trie.isExist("cart")).toBe(true);
    expect(trie.isExist("cat")).toBe(true);

    trie.remove("carpet");
    expect(trie.isExist("carpet")).toEqual(false);
    expect(trie.isExist("car")).toEqual(true);
    expect(trie.isExist("cart")).toBe(true);
    expect(trie.isExist("cat")).toBe(true);

    trie.remove("cat");
    expect(trie.isExist("car")).toEqual(true);
    expect(trie.isExist("cart")).toBe(true);
    expect(trie.isExist("cat")).toBe(false);

    trie.remove("car");
    expect(trie.isExist("car")).toEqual(false);
    expect(trie.isExist("cart")).toBe(true);

    trie.remove("cart");
    expect(trie.isExist("car")).toEqual(false);
    expect(trie.isExist("cart")).toBe(false);
  });

  it("suggests next characters", () => {
    const trie = new Trie();

    trie.add("cat");
    trie.add("cats");
    trie.add("car");
    trie.add("caption");

    expect(trie.suggestNextCharacters("ca")).toEqual(["t", "r", "p"]);
    expect(trie.suggestNextCharacters("cat")).toEqual(["s"]);
    expect(trie.suggestNextCharacters("cab")).toBeUndefined();
  });

  it("checks if word exists", () => {
    const trie = new Trie();

    trie.add("cat");
    trie.add("cats");
    trie.add("carpet");
    trie.add("car");
    trie.add("caption");

    expect(trie.isExist("cat")).toBe(true);
    expect(trie.isExist("cats")).toBe(true);
    expect(trie.isExist("carpet")).toBe(true);
    expect(trie.isExist("car")).toBe(true);
    expect(trie.isExist("cap")).toBe(false);
    expect(trie.isExist("call")).toBe(false);
  });
});
