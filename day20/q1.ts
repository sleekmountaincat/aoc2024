import fs from "fs";
import Heap from "heap-js";

let S = [-1, -1];
let E = [-1, -1];
const dirs = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

type Node = {
  x: number;
  y: number;
  g: number;
};

const grid = fs
  .readFileSync("day20/input.txt")
  .toString()
  .split("\n")
  .map((l, i) => {
    if (l.indexOf("S") > -1) S = [l.indexOf("S"), i];
    if (l.indexOf("E") > -1) E = [l.indexOf("E"), i];
    return [...l];
  });
grid[S[1]][S[0]] = ".";
grid[E[1]][E[0]] = ".";

const path = astar(S, E);
let cnt = 0;

for (let p of path.keys()) {
  const [x, y] = p.split(",").map((n) => +n);

  if (grid[y][x] === ".") {
    for (let [dX, dY] of dirs) {
      const nextX = x + dX;
      const nextY = y + dY;

      if (
        nextX > 0 &&
        nextY > 0 &&
        nextX < grid[0].length - 1 &&
        nextY < grid.length - 1 &&
        grid[nextY][nextX] === "#" &&
        grid[nextY + dY][nextX + dX] === "."
      ) {
        const diff =
          path.get(`${nextX + dX},${nextY + dY}`)! - path.get(`${x},${y}`)! + 2;
        if (diff <= -100) {
          cnt++;
        }
      }
    }
  }
}

console.log(cnt);

function astar(S: number[], E: number[]): Map<string, number> {
  const heap = new Heap((a: Node, b: Node) => a.g - b.g);
  const [startX, startY] = S;
  const [endX, endY] = E;
  const costs: Map<string, number> = new Map();

  heap.push({ x: startX, y: startY, g: 0 });
  costs.set(`${startX},${startY}`, 0);

  while (!heap.isEmpty()) {
    let cur = heap.pop()!;

    if (cur.x == endX && cur.y == endY) return costs;

    for (let [dX, dY] of dirs) {
      const nX = cur.x + dX;
      const nY = cur.y + dY;
      const key = `${nX},${nY}`;
      const g = cur.g + 1;
      const n = { x: nX, y: nY, g };
      if (grid[nY][nX] != "#" && !costs.has(key)) {
        costs.set(key, g);
        heap.push(n);
      }
    }
  }
  return new Map<string, number>();
}
