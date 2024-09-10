import { Nullable } from "@/types";
import { isDefined } from "@/utils/is-defined";
import TrieNode from "./trie-node";

const HEAD_CHARACTER = "*";

/**
 * Trie is a sorted tree-based that usually implements by HastTable.
 * 
 */
export default class Trie {
  public head: TrieNode;

  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER);
  }

  /**
   * Returns the last character of a word
   * @param word
   * @returns last character or null.
   */
  private getLeaf(word: string): Nullable<TrieNode> {
    const characters = Array.from(word);

    let currentNode = this.head;
    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      if (!currentNode.hasChild(characters[charIndex])) return null;
      currentNode = currentNode.getChild(characters[charIndex]) as TrieNode;
    }

    return currentNode;
  }

  /**
   * Adds new word
   * @param word
   * @returns an instance of current Trie.
   */
  add(word: string): Trie {
    const characters = Array.from(word);

    let currentNode = this.head;
    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      const isWord = charIndex === characters.length - 1;
      currentNode = currentNode.addChild(characters[charIndex], isWord);
    }

    return this;
  }

  /**
   * Removes word
   * @param word
   * @returns an instance of current Trie.
   */
  remove(word: string) {
    const depthFirstDelete = (currentNode: TrieNode, charIndex = 0) => {
      if (charIndex >= word.length) {
        // Return if we're trying to delete the character that is out of word's scope.
        return;
      }

      const character = word[charIndex];
      const nextNode = currentNode.getChild(character);

      if (nextNode == null) {
        // Return if we're trying to delete a word that has not been added to the Trie.
        return;
      }

      depthFirstDelete(nextNode, charIndex + 1);

      // Since we're going to delete a word let's un-mark its last character isCompleteWord flag.
      if (charIndex === word.length - 1) {
        nextNode.isWord = false;
      }

      // childNode is deleted only if:
      // - childNode has NO children
      // - childNode.isCompleteWord === false
      currentNode.removeChild(character);
    };

    // Start depth-first deletion from the head node.
    depthFirstDelete(this.head);

    return this;
  }

  /**
   * Suggests next characters.
   * @param word
   * @returns null or array of string.
   */
  suggestNextCharacters(word: string): Nullable<string[]> {
    const lastCharacter = this.getLeaf(word);
    return lastCharacter?.suggestChildren() ?? null;
  }

  /**
   * Checks if a word is exists in Trie.
   * @param word
   * @returns
   */
  isExist(word: string): boolean {
    const lastCharacter = this.getLeaf(word);
    return isDefined(lastCharacter) && lastCharacter.isWord;
  }
}
