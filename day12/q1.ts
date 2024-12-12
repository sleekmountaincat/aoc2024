import fs from "fs";

const rgnPts = new Set<string>();
const regions = new Map<string, number[][]>();

const map = fs
  .readFileSync("day12/input.txt")
  .toString()
  .split("\n")
  .map((l) => l);

buildRegions();

let cost = 0

regions.forEach((pts) => {
  const [x, y] = pts[0];
  cost += pts.length * getRegionPerimeter(map[x][y], pts.slice());
});

console.log(cost)

function getRegionPerimeter(rgn: string, pts: number[][]): number {
  let p = 0;

  while (pts.length) {
    const [x, y] = pts.shift()!;

    if ((x > 0 && map[x - 1][y] != rgn) || x === 0) p++;
    if ((x < map.length - 1 && map[x + 1][y] != rgn) || x === map.length - 1)
      p++;
    if ((y > 0 && map[x][y - 1] != rgn) || y === 0) p++;
    if ((y < map[0].length - 1 && map[x][y + 1] != rgn) || y === map.length - 1)
      p++;
  }

  return p;
}

function buildRegions() {
  map.forEach((l, y) => {
    [...l].forEach((c, x) => {
      if (!rgnPts.has(`${x},${y}`)) {
        findRegion([x, y]);
      }
    });
  });
}

function findRegion(start: number[]) {
  const [x, y] = start;
  const rgn = map[x][y];
  const queue: number[][] = [start];
  const visited = new Set<string>();
  const rgnKey = `${rgn}-${x},${y}`;

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;
    const key = `${x},${y}`;

    if (visited.has(key) || rgnPts.has(key)) continue;

    visited.add(key);
    rgnPts.add(key);
    regions.get(rgnKey)
      ? regions.get(rgnKey)!.push([x, y])
      : regions.set(rgnKey, [[x, y]]);

    if (x > 0 && map[x - 1][y] === rgn) queue.push([x - 1, y]);
    if (x < map.length - 1 && map[x + 1][y] === rgn) queue.push([x + 1, y]);
    if (y > 0 && map[x][y - 1] === rgn) queue.push([x, y - 1]);
    if (y < map[0].length - 1 && map[x][y + 1] === rgn) queue.push([x, y + 1]);
  }
}
