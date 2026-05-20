export class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  frequency: number;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.frequency = 0;
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) node.children.set(char, new TrieNode());
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
    node.frequency++;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  delete(word: string): boolean {
    const deleteHelper = (node: TrieNode, depth: number): boolean => {
      if (depth === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        node.frequency = 0;
        return node.children.size === 0;
      }
      const char = word[depth];
      const child = node.children.get(char);
      if (!child) return false;
      const shouldDelete = deleteHelper(child, depth + 1);
      if (shouldDelete) node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    };
    return deleteHelper(this.root, 0);
  }

  autocomplete(prefix: string): string[] {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char)!;
    }

    const results: [string, number][] = [];
    const dfs = (n: TrieNode, path: string) => {
      if (n.isEndOfWord) results.push([path, n.frequency]);
      for (const [c, child] of n.children.entries()) dfs(child, path + c);
    };
    dfs(node, prefix);
    results.sort((a, b) => b[1] - a[1]);
    return results.map(r => r[0]);
  }
}