import fs from "fs";
import cartesian from "fast-cartesian";
import { createBuilderStatusReporter } from "typescript";

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

        let curX = x1
        let curY = y1
        do {
          antiNodes[curX] = antiNodes[curX].substring(0, curY) + '#' + antiNodes[curX].substring(curY + 1);
          if (slope && slope >0 ) {
            curX += dX
            curY += dY
          } else {
            curX -= dX
            curY += dY
          }

        } while (curX >= 0 && curX < antiNodes.length && curY >= 0 && curY < antiNodes[0].length)

        curX = x1
        curY = y1
        do {
          antiNodes[curX] = antiNodes[curX].substring(0, curY) + '#' + antiNodes[curX].substring(curY + 1);
          if (slope && slope >0 ) {
            curX -= dX
            curY -= dY
          } else {
            curX += dX
            curY -= dY
          }

        } while (curX >= 0 && curX < antiNodes.length && curY >= 0 && curY < antiNodes[0].length)
      });
  }
}

antiNodes.forEach(a=>console.log(a))

console.log(antiNodes.reduce((a,c) => {
  return a + [...c].filter(v=>v=="#").length
},0))