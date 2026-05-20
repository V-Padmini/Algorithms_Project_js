export type GridNode = {
  x: number;
  y: number;
  walkable: boolean;
  g: number;
  h: number;
  f: number;
  parent: GridNode | null;
};

export class AStarAdvanced {
  private grid: GridNode[][];
  private directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
  ];

  constructor(width: number, height: number, obstacles: [number, number][]) {
    this.grid = Array.from({ length: height }, (_, y) =>
      Array.from({ length: width }, (_, x) => ({
        x, y, walkable: true, g: 0, h: 0, f: 0, parent: null
      }))
    );
    obstacles.forEach(([x, y]) => { this.grid[y][x].walkable = false; });
  }

  private heuristic(a: GridNode, b: GridNode) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  findPath(startX: number, startY: number, goalX: number, goalY: number): string[] {
    const start = this.grid[startY][startX];
    const goal = this.grid[goalY][goalX];
    const openList: GridNode[] = [start];
    const closedSet = new Set<GridNode>();

    while (openList.length) {
      openList.sort((a, b) => a.f - b.f);
      const current = openList.shift()!;
      if (current === goal) return this.reconstructPath(goal);

      closedSet.add(current);

      for (const [dx, dy] of this.directions) {
        const nx = current.x + dx;
        const ny = current.y + dy;
        if (nx < 0 || ny < 0 || ny >= this.grid.length || nx >= this.grid[0].length) continue;

        const neighbor = this.grid[ny][nx];
        if (!neighbor.walkable || closedSet.has(neighbor)) continue;

        const tentativeG = current.g + (dx === 0 || dy === 0 ? 1 : Math.SQRT2);

        if (!openList.includes(neighbor) || tentativeG < neighbor.g) {
          neighbor.parent = current;
          neighbor.g = tentativeG;
          neighbor.h = this.heuristic(neighbor, goal);
          neighbor.f = neighbor.g + neighbor.h;
          if (!openList.includes(neighbor)) openList.push(neighbor);
        }
      }
    }

    return [];
  }

  private reconstructPath(goal: GridNode) {
    const path: string[] = [];
    let current: GridNode | null = goal;
    while (current) {
      path.push(`(${current.x},${current.y})`);
      current = current.parent;
    }
    return path.reverse();
  }
}