// AdvancedWebCrawler.ts
import fetch from "node-fetch";

// AdvancedWebCrawler.ts
export class AdvancedWebCrawler {
  private visited = new Set<string>();
  private maxDepth: number;

  constructor(maxDepth = 3) {
    this.maxDepth = maxDepth;
  }

  async crawl(url: string, depth = 0): Promise<void> {
    if (depth > this.maxDepth || this.visited.has(url)) return;
    this.visited.add(url);

    console.log("Visiting:", url);

    let html: string;
    try {
      const res = await fetch(url);
      html = await res.text();
    } catch (e) {
      console.error("Fetch error:", url, e);
      return;
    }

    const links = this.extractLinks(html, url);
    for (const link of links) {
      await this.crawl(link, depth + 1);
    }
  }

  private extractLinks(html: string, base: string): string[] {
    const regex = /href="(.*?)"/g;
    const matches = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      const url = new URL(match[1], base).toString();
      matches.push(url);
    }
    return matches;
  }
}