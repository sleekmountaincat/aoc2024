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

// console.log(path[0].length);
console.log(grid.reduce((a,c) => a + [...c.matchAll(/\./g)].length,0))

function astar(S: number[], E: number[]): Node[][] {
  const heap = new Heap((a: Node, b: Node) => a.g - b.g);
  const visited = new Map<string, Node>();
  let paths: Node[][] = [];
  let best = Infinity;

  heap.push({ x: S[0], y: S[1], d: "r", g: 0});

  while (!heap.isEmpty()) {
    const cur = heap.pop();
    const key = `${cur!.x},${cur!.y}`;

    if (cur!.x === E[0] && cur!.y === E[1]) {
      const fullPath = reconstructPath(cur!);
      if (cur!.g < best) {
        best = cur!.g;
        paths = [fullPath];
      } else if (cur!.g === best) {
        console.log("WHAT THE FUCK")
        paths.push(fullPath);
      }
    }

    if (visited.has(key) && visited.get(key)!.g < cur!.g) continue;

    visited.set(key, cur!);

    for (let [dX, dY] of dirs) {
      const nX = cur!.x + dX;
      const nY = cur!.y + dY;

      const d = getDir(cur!.x, cur!.y, nX, nY);
      const g = cur!.g + (d === cur!.d ? 1 : 1);
      const n = { x: nX, y: nY, d, g, parent: cur }

      if (grid[nY][nX]!== "#") heap.push(n);
    }
  }
  console.log(paths.length)
  console.log(paths.reduce((a,c) => {
    return a + c.length
  }, 0))
  
  return paths;
}

function reconstructPath(node: Node): Node[] {
  const path = [];
  while (node) {
      path.unshift(node); // Add to the start of the array
      node = node.parent;
  }
  return path;
}

function getDir(pX: number, pY: number, nX: number, nY: number): string {
  if (pX < nX) return "r";
  if (pX > nX) return "l";
  if (pY < nY) return "d";
  else return "u";
}
