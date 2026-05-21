// Word Search in Grid - TypeScript
type Direction = [number, number];

export class WordSearch {
  private grid: string[][];
  private directions: Direction[] = [
    [0, 1],  [1, 0], [0, -1], [-1, 0], // Right, Down, Left, Up
    [1, 1],  [1, -1], [-1, 1], [-1, -1] // Diagonals
  ];

  constructor(grid: string[][]) {
    this.grid = grid;
  }

  search(word: string): [number, number][] | null {
    const height = this.grid.length;
    const width = this.grid[0].length;

    const isValid = (x: number, y: number) => x >= 0 && y >= 0 && y < height && x < width;

    const searchFrom = (x: number, y: number, word: string, dx: number, dy: number) => {
      for (let k = 0; k < word.length; k++) {
        const nx = x + dx * k;
        const ny = y + dy * k;
        if (!isValid(nx, ny) || this.grid[ny][nx] !== word[k]) return false;
      }
      return true;
    };

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        for (const [dx, dy] of this.directions) {
          if (searchFrom(x, y, word, dx, dy)) {
            return Array.from({ length: word.length }, (_, i) => [x + dx * i, y + dy * i]);
          }
        }
      }
    }

    return null; // word not found
  }
}

