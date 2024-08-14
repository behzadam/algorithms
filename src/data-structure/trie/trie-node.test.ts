import TrieNode from "./trie-node";

describe("TrieNode", () => {
  it("creates trie node", () => {
    const trieNode = new TrieNode("c", true);

    expect(trieNode.character).toBe("c");
    expect(trieNode.isWord).toBe(true);
    expect(trieNode.toString()).toBe("c*");
  });

  it("adds child nodes", () => {
    const trieNode = new TrieNode("c");

    trieNode.addChild("a", true);
    trieNode.addChild("o");

    expect(trieNode.toString()).toBe("c:a,o");
  });

  it("returns child nodes", () => {
    const trieNode = new TrieNode("c");

    trieNode.addChild("a");
    trieNode.addChild("o");

    expect(trieNode?.getChild("a")?.toString()).toBe("a");
    expect(trieNode?.getChild("a")?.character).toBe("a");
    expect(trieNode?.getChild("o")?.toString()).toBe("o");
    expect(trieNode?.getChild("b")).toBeNull();
  });

  it("checks if node has children", () => {
    const trieNode = new TrieNode("c");

    expect(trieNode.hasChildren()).toBe(false);

    trieNode.addChild("a");

    expect(trieNode.hasChildren()).toBe(true);
  });

  it("checks if node has specific child", () => {
    const trieNode = new TrieNode("c");

    trieNode.addChild("a");
    trieNode.addChild("o");

    expect(trieNode.hasChild("a")).toBe(true);
    expect(trieNode.hasChild("o")).toBe(true);
    expect(trieNode.hasChild("b")).toBe(false);
  });

  it("suggests next children", () => {
    const trieNode = new TrieNode("c");

    trieNode.addChild("a");
    trieNode.addChild("o");

    expect(trieNode.suggestChildren()).toEqual(["a", "o"]);
  });

  it("deletes child node if the child node doesn't have children", () => {
    const trieNode = new TrieNode("c");
    trieNode.addChild("a");
    expect(trieNode.hasChild("a")).toBe(true);

    trieNode.removeChild("a");
    expect(trieNode.hasChild("a")).toBe(false);
  });

  it("doesn't delete child node if the child node has children", () => {
    const trieNode = new TrieNode("c");
    trieNode.addChild("a");
    const childNode = trieNode.getChild("a");
    childNode?.addChild("r");

    trieNode.removeChild("a");
    expect(trieNode.hasChild("a")).toEqual(true);
  });

  it("doesn't delete child node if the child node is a word", () => {
    const trieNode = new TrieNode("c");
    const IS_WORD = true;
    trieNode.addChild("a", IS_WORD);

    trieNode.removeChild("a");
    expect(trieNode.hasChild("a")).toEqual(true);
  });

  it("generates string representation of the current node and children", () => {
    const trieNode = new TrieNode("a", true);
    trieNode.addChild("b");
    trieNode.addChild("c");

    const childNode = trieNode.getChild("c");
    childNode?.addChild("d");
    // console.log(trieNode.toString());
    expect(trieNode.toString()).toBe("a*:b,c");
  });
});
