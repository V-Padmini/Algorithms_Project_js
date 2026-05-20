export class ExpressionEvaluator {
  private text: string;
  private pos: number = 0;
  private currentChar: string | null;

  constructor(text: string) {
    this.text = text.replace(/\s+/g, "");
    this.currentChar = this.text[this.pos] ?? null;
  }

  private advance(): void {
    this.pos++;
    this.currentChar = this.pos < this.text.length ? this.text[this.pos] : null;
  }

  private parseNumber(): number {
    let numStr = "";
    while (this.currentChar !== null && /[0-9.]/.test(this.currentChar)) {
      numStr += this.currentChar;
      this.advance();
    }
    if (numStr === "") throw new Error("Expected number but found none");
    return parseFloat(numStr);
  }

  private factor(): number {
    const ch = this.currentChar;
    if (ch === null) throw new Error("Unexpected end of input");

    if (ch === "+") {
      this.advance();
      return this.factor();
    }

    if (ch === "-") {
      this.advance();
      return -this.factor();
    }

    if (ch === "(") {
      this.advance();
      const val = this.expr();
      if (this.currentChar !== ")") throw new Error("Mismatched parentheses");
      this.advance();
      return val;
    }

    return this.parseNumber();
  }

  private power(): number {
    let result = this.factor();
    while (this.currentChar === "^") {
      this.advance();
      result = Math.pow(result, this.factor());
    }
    return result;
  }

  private term(): number {
    let result = this.power();
    while (this.currentChar === "*" || this.currentChar === "/") {
      const op = this.currentChar!;
      this.advance();
      const right = this.power();
      result = op === "*" ? result * right : result / right;
    }
    return result;
  }

  private expr(): number {
    let result = this.term();
    while (this.currentChar === "+" || this.currentChar === "-") {
      const op = this.currentChar!;
      this.advance();
      const right = this.term();
      result = op === "+" ? result + right : result - right;
    }
    return result;
  }

  public evaluate(): number {
    const result = this.expr();
    if (this.currentChar !== null) {
      throw new Error("Invalid expression, unexpected characters remaining");
    }
    return result;
  }
}

// Example usage:
// const evaluator = new AdvancedExpressionEvaluator("3 + 4 * 2 / (1 - 5)^2^3 - -2");
// console.log(evaluator.evaluate());