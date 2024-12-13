import fs from "fs";

const rgnPts = new Set<string>();
const regions = new Map<string, number[][]>();

const map = fs
  .readFileSync("day12/input.txt")
  .toString()
  .split("\n")
  .map((l) => `.${l}.`);
map.push(Array(map[0].length).fill(".").join(""));
map.unshift(Array(map[0].length).fill(".").join(""));
buildRegions();

let cost = 0;

regions.forEach((pts) => {
  cost += pts.length * getRegionSides(pts);
});

console.log(cost);

function getRegionSides(pts: number[][]): number {
  const rgnPtsSet = new Set<string>(pts.map(p=>`${p[0]},${p[1]}`))

  const vtxCnt = pts.reduce((a,c) => {
    const [x, y] = c;
    let sum = 0

  if (
      (!rgnPtsSet.has(`${x-1},${y}`) && !rgnPtsSet.has(`${x},${y-1}`)) || 
      (rgnPtsSet.has(`${x-1},${y}`) && rgnPtsSet.has(`${x},${y-1}`) && !rgnPtsSet.has(`${x-1},${y-1}`))
    ) sum += 1

    if (
      (!rgnPtsSet.has(`${x+1},${y}`) && !rgnPtsSet.has(`${x},${y-1}`)) || 
      (rgnPtsSet.has(`${x+1},${y}`) && rgnPtsSet.has(`${x},${y-1}`) && !rgnPtsSet.has(`${x+1},${y-1}`))
    ) sum += 1

    if (
      (!rgnPtsSet.has(`${x+1},${y}`) && !rgnPtsSet.has(`${x},${y+1}`)) || 
      (rgnPtsSet.has(`${x+1},${y}`) && rgnPtsSet.has(`${x},${y+1}`) && !rgnPtsSet.has(`${x+1},${y+1}`))
    ) sum += 1

    if (
      (!rgnPtsSet.has(`${x-1},${y}`) && !rgnPtsSet.has(`${x},${y+1}`)) || 
      (rgnPtsSet.has(`${x-1},${y}`) && rgnPtsSet.has(`${x},${y+1}`) && !rgnPtsSet.has(`${x-1},${y+1}`))
    ) sum += 1
    return a + sum
  },0);

  return vtxCnt;
}

function buildRegions() {
  map.forEach((l, y) => {
    [...l].forEach((c, x) => {
      if (!rgnPts.has(`${x},${y}`) && map[y][x] != ".") {
        findRegion([x, y]);
      }
    });
  });
}

function findRegion(start: number[]) {
  const [x, y] = start;
  const rgn = map[y][x];
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
    if (map[y - 1][x] === rgn) queue.push([x, y - 1]);
    if (map[y + 1][x] === rgn) queue.push([x, y + 1]);
    if (map[y][x - 1] === rgn) queue.push([x - 1, y]);
    if (map[y][x + 1] === rgn) queue.push([x + 1, y]);
  }
}