import fs from "fs";
import cartesian from "fast-cartesian";

const nodes = new Map<string, number[][]>();
const antiNodes: string[] = [] 

fs.readFileSync("day8/input.txt")
  .toString()
  .split("\n")
  .forEach((l, x) => {
    antiNodes.push(Array(l.length).fill(".").join(""));

    [...l].forEach((c, y) => {
      if (c != ".") {
        nodes.has(c) ? nodes.get(c)!.push([x, y]) : nodes.set(c, [[x, y]]);
      }
    });
  });

for (const node of nodes.keys()) {
  findAntinodes(nodes.get(node)!);
}

function findAntinodes(points: number[][]) {
  if (points.length > 1) {
    points
      .flatMap((v, i) => points.slice(i + 1).map((w) => [v, w]))
      .forEach((nodePair) => {
        const x1 = nodePair[0][0]
        const x2 = nodePair[1][0]
        const y1 = nodePair[0][1]
        const y2 = nodePair[1][1]

        const slope = (x1 === x2) ? null : (y2- y1) / (x2 - x1);
        const dX = Math.abs(x1 - x2)
        const dY = Math.abs(y1 - y2)

        let antinode1: number[] = []
        let antinode2: number[] = []

        if (slope == null || slope > 0) {
          antinode1 = x1 < x2 ? [x1-dX, y1-dY] : [x2+dX, y2+dY]
          antinode2 = x1 < x2 ? [x2+dX, y2+dY] : [x1-dX, y1-dY]
        } else {
          antinode1 = x1 < x2 ? [x1-dX, y1+dY] : [x2+dX, y2-dY]
          antinode2 = x1 < x2 ? [x2+dX, y2-dY]: [x1-dX, y1+dY]
        }
   
        if (antinode1[0] >= 0 && antinode1[0] < antiNodes.length && antinode1[1] >= 0 && antinode1[1] < antiNodes[0].length) {
          antiNodes[antinode1[0]] = antiNodes[antinode1[0]].substring(0, antinode1[1]) + '#' + antiNodes[antinode1[0]].substring(antinode1[1] + 1);
        }

        if (antinode2[0] >= 0 && antinode2[0] < antiNodes.length && antinode2[1] >= 0 && antinode2[1] < antiNodes[0].length) {
          antiNodes[antinode2[0]] = antiNodes[antinode2[0]].substring(0, antinode2[1]) + '#' + antiNodes[antinode2[0]].substring(antinode2[1] + 1);
        }
      });
  }
}

console.log(antiNodes.reduce((a,c) => {
  return a + [...c].filter(v=>v=="#").length
},0))