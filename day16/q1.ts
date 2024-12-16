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
  x: number; // position
  y: number; // position
  d: string; // direction we are traveling
  g: number; // for A*, total cost to arrive here from the start
  h: number; // for A*, this is our heuristic and is an estimation of cost from this node to the end, just manhattan for now
  f: number; // for A*, this is g+h and is used to determine the best candidate to evaluate next thanks to our min heap
  parent?: Node; // node we got here from
};

const grid = fs
  .readFileSync("day16/input.txt")
  .toString()
  .split("\n")
  .map((l, i) => {
    if (l.indexOf("S") > -1) S = [l.indexOf("S"), i];
    if (l.indexOf("E") > -1) E = [l.indexOf("E"), i];
    return l;
  });
grid.forEach((p) => console.log(p));

const path = astar(S, E);

console.log(path![path!.length-1].g)

function astar(S: number[], E: number[]) {
  const heap = new Heap((a: Node, b: Node) => a.f - b.f);
  const [x, y] = S;
  const [xE, yE] = E;
  const v: Map<string, number> = new Map();
  let dis = Math.abs(x - xE) + Math.abs(y - yE);

  heap.push({ x, y, d: "r", g: 0, h: dis, f: dis });
  v.set(`${x},${y}`, 0);

  while (!heap.isEmpty()) {
    let cur = heap.pop()!;

    if (cur.x == xE && cur.y == yE) {
      let path: Node[] = []

      while (cur.parent) {
          path.push(cur)
          cur = cur.parent
      }

      return path.reverse()
    }

    for (let [dX, dY] of dirs) {
      const nX = cur.x + dX;
      const nY = cur.y + dY;
      const key = `${nX},${nY}`;

      const d = getDir(cur.x, cur.y, nX, nY);
      const g = cur.g + (d === cur.d ? 1 : 1001);
      const h = Math.abs(nX - xE) + Math.abs(nY - yE);

      if (
        (!v.has(key) || (v.has(key) && g < v.get(key)!)) &&
        grid[nY][nX] != "#"
      ) {
        v.set(key, g);
        heap.push({ x: nX, y: nY, d, g, h, f: g + h, parent: cur });
      }
    }
  }
}

function getDir(pX: number, pY: number, nX: number, nY: number): string {
  if (pX < nX) return "r";
  if (pX > nX) return "l";
  if (pY < nY) return "d";
  else return "u";
}
