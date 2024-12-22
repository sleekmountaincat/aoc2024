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
  d: string;
  g: number;
  parent?: Node;
};

// good example of all paths and state, ie turns cost more

const grid = fs
  .readFileSync("day16/input.txt")
  .toString()
  .split("\n")
  .map((l, i) => {
    if (l.indexOf("S") > -1) S = [l.indexOf("S"), i];
    if (l.indexOf("E") > -1) E = [l.indexOf("E"), i];
    return l;
  });

const allPts = new Set<string>() 

astar(S, E).forEach(p => {
  p.forEach(n=>{
    allPts.add(`${n.x},${n.y}`)
  })
})

console.log(allPts.size);

function astar(S: number[], E: number[]): Node[][] {
  const heap = new Heap((a: Node, b: Node) => a.g - b.g);
  // state is direction and cost
  const visited = new Map<string, Map<string, number>>();
  const bestPaths: Node[][] = [];
  let bestCost = Infinity;

  heap.push({ x: S[0], y: S[1], d: "", g: 0 });

  while (!heap.isEmpty()) {
    const cur = heap.pop();

    if (bestCost < Infinity && cur!.g > bestCost) continue;

    if (cur!.x === E[0] && cur!.y === E[1]) {
      if (cur!.g < bestCost) {
        bestCost = cur!.g;
        bestPaths.length = 0;
      }
      bestPaths.push(reconstructPath(cur!));
      continue;
    }

    for (let [dX, dY] of dirs) {
      const nX = cur!.x + dX;
      const nY = cur!.y + dY;

      if (grid[nY][nX] === "#") continue;

      if (cur!.parent && nX === cur!.parent.x && nY === cur!.parent.y) continue;

      const d = getDir(cur!.x, cur!.y, nX, nY);
      const g = cur!.g + (d === cur!.d ? 1 : 1001);

      if (bestCost < Infinity && g > bestCost) continue;

      const posKey = `${nX},${nY}`;
      if (!visited.has(posKey)) {
        visited.set(posKey, new Map());
      }

      const dirCosts = visited.get(posKey)!;
      const prevCost = dirCosts.get(d);

      if (!prevCost || g <= prevCost) {
        dirCosts.set(d, g);
        heap.push({ x: nX, y: nY, d, g, parent: cur });
      }
    }
  }

  return bestPaths;
}

function reconstructPath(node: Node): Node[] {
  const path = [];
  while (node) {
    path.unshift(node);
    node = node.parent!;
  }
  return path;
}

function getDir(pX: number, pY: number, nX: number, nY: number): string {
  if (pX < nX) return "r";
  if (pX > nX) return "l";
  if (pY < nY) return "d";
  return "u";
}
