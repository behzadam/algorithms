import HashTable from "@/hash-table/hash-table";
import { Nullable } from "@/types";

/**
 * This class uses Map to implement children and
 * it may would change.
 * @alpha
 */
export default class TrieNode {
  public character: string;
  public isWord: boolean;
  private children: HashTable<TrieNode>;

  constructor(character: string, isWord = false) {
    this.character = character;
    this.isWord = isWord;
    this.children = new HashTable();
  }

  /**
   * Returns node child.
   * @param character
   * @returns child or node.
   */
  public getChild(character: string): Nullable<TrieNode> {
    return this.children.get(character);
  }

  /**
   * Adds child to current node.
   * @param character
   * @param isWord
   * @returns child node.
   */
  public addChild(character: string, isWord = false): TrieNode {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isWord));
    }

    const childNode = this.children.get(character) as TrieNode;
    // In cases similar to adding "car" after "carpet" we need to mark "r" character as complete.
    childNode.isWord = childNode?.isWord || isWord;

    return childNode;
  }

  /**
   * Removes child from current node.
   * @param character
   * @returns Current node (this).
   */
  public removeChild(character: string): TrieNode {
    const childNode = this.getChild(character);

    // Delete childNode only if:
    // - childNode doesn't have children,
    // - childNode.isWord === false.
    if (childNode && !childNode.isWord && !childNode.hasChildren()) {
      this.children.remove(character);
    }
    return this;
  }

  /**
   * Checks if current node has child.
   * @param character
   * @returns true if current node has child and false otherwise.
   */
  public hasChild(character: string): boolean {
    return this.children.has(character);
  }

  /**
   * Checks if current node has children.
   * @returns true if current node has children and false otherwise.
   */
  public hasChildren(): boolean {
    return this.children.getKeys().length !== 0;
  }

  /**
   * Extracts the children key.
   * @returns array of keys(string) if current node has children or an empty array.
   */
  public suggestChildren(): string[] {
    return [...this.children.getKeys()];
  }

  /**
   * Generates a string representation of the current node and children.
   * `*`: represent a complete word.
   * ':': separates node from children.
   * ',': separates node children.
   *
   * @example
   * See test cases.
   * @returns string of node with children or just node.
   */
  public toString(): string {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : "";
    const isCompleteString = this.isWord ? "*" : "";

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
