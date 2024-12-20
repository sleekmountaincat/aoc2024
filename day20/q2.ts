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

const pts = new Map<number, number[]>();
const path = notAStarAtAll(S, E);
const CUTOFF = 100;
const BLINK = 20;
let cnt = 0;

for (let step = 0; step < path.length - CUTOFF; step++) {
  for (let short = step + CUTOFF; short < path.length; short++) {
    const [scStartX, scStartY] = pts.get(step)!;
    const [scEndX, scEndY] = pts.get(short)!;
    const d = Math.abs(scStartX - scEndX) + Math.abs(scStartY - scEndY);

    if (d <= BLINK && short - step - d >= CUTOFF) cnt++;
  }
}

console.log(cnt);

function notAStarAtAll(S: number[], E: number[]): number[] {
  const heap = new Heap((a: Node, b: Node) => a.g - b.g);
  const [startX, startY] = S;
  const [endX, endY] = E;
  const costs: Map<string, number> = new Map();

  heap.push({ x: startX, y: startY, g: 0 });
  costs.set(`${startX},${startY}`, 0);
  pts.set(0, [startX, startY]);

  while (!heap.isEmpty()) {
    let cur = heap.pop()!;

    if (cur.x == endX && cur.y == endY)
      return [...costs.entries()].map((k, v) => v);

    for (let [dX, dY] of dirs) {
      const nX = cur.x + dX;
      const nY = cur.y + dY;
      const key = `${nX},${nY}`;
      const g = cur.g + 1;
      const n = { x: nX, y: nY, g };
      if (grid[nY][nX] != "#" && !costs.has(key)) {
        costs.set(key, g);
        pts.set(g, [nX, nY]);
        heap.push(n);
      }
    }
  }
  return [];
}
