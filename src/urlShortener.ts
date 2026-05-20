export class URLShortener {
  private urlToCode: Map<string, string>;
  private codeToUrl: Map<string, string>;
  private chars: string;

  constructor() {
    this.urlToCode = new Map();
    this.codeToUrl = new Map();
    this.chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  }

  private generateCode(length = 6): string {
    let code: string;
    do {
      code = "";
      for (let i = 0; i < length; i++) {
        code += this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    } while (this.codeToUrl.has(code));
    return code;
  }

  shorten(longURL: string): string {
    if (this.urlToCode.has(longURL)) {
      return `https://short.ly/${this.urlToCode.get(longURL)}`;
    }
    const code = this.generateCode();
    this.urlToCode.set(longURL, code);
    this.codeToUrl.set(code, longURL);
    return `https://short.ly/${code}`;
  }

  expand(shortURL: string): string | undefined {
    const code = shortURL.split("/").pop();
    return code ? this.codeToUrl.get(code) : undefined;
  }

  delete(longURL: string) {
    const code = this.urlToCode.get(longURL);
    if (code) {
      this.urlToCode.delete(longURL);
      this.codeToUrl.delete(code);
    }
  }
}