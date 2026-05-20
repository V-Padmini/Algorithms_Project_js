export type Board = string[][];

export class SudokuSolver {
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  private isValid(row: number, col: number, char: string): boolean {
    for (let i = 0; i < 9; i++) {
      if (this.board[row][i] === char || this.board[i][col] === char) return false;

      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (this.board[boxRow][boxCol] === char) return false;
    }
    return true;
  }

  private findEmpty(): [number, number] | null {
    let minOptions = 10;
    let target: [number, number] | null = null;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (this.board[r][c] === ".") {
          const options = this.possibleValues(r, c).length;
          if (options < minOptions) {
            minOptions = options;
            target = [r, c];
          }
        }
      }
    }
    return target;
  }

  private possibleValues(row: number, col: number): string[] {
    const values: string[] = [];
    for (let n = 1; n <= 9; n++) {
      const char = n.toString();
      if (this.isValid(row, col, char)) values.push(char);
    }
    return values;
  }

  solve(): boolean {
    const empty = this.findEmpty();
    if (!empty) return true; // solved

    const [row, col] = empty;
    for (const char of this.possibleValues(row, col)) {
      this.board[row][col] = char;
      if (this.solve()) return true;
      this.board[row][col] = "."; // backtrack
    }

    return false;
  }

  printBoard() {
    console.table(this.board);
  }
}