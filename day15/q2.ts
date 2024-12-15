import fs from "fs";

let p = [-1, -1];

const [g, d] = fs
  .readFileSync("day15/input.txt")
  .toString()
  .split("\n\n")
  .map((l) => l);
const dirs = [...d.replace("\n", "")];
const grid = g
  .split("\n")
  .filter((c) => c != "")
  .map((l, i) => {
    l = l
      .replaceAll("#", "##")
      .replaceAll("O", "[]")
      .replaceAll(".", "..")
      .replaceAll("@", "@.");
    if (l.indexOf("@") > -1) p = [l.indexOf("@"), i];
    return [...l.replace("@", ".")];
  });

for (let i = 0; i < dirs.length; i++) {
  const [x, y] = p;

  if (dirs[i] === ">") {
    if (grid[y][x + 1] === "#") continue;
    if (grid[y][x + 1] === ".") p = [x + 1, y];
    else {
      let n = x + 1;
      while (["[", "]"].includes(grid[y][n])) n++;
      if (grid[y][n] != "#") {
        p = [x + 1, y];
        while (n > x) grid[y][n] = grid[y][--n];
      }
    }
  }

  if (dirs[i] === "<") {
    if (grid[y][x - 1] === "#") continue;
    if (grid[y][x - 1] === ".") p = [x - 1, y];
    else {
      let n = x - 1;
      while (["[", "]"].includes(grid[y][n])) n--;
      if (grid[y][n] != "#") {
        p = [x - 1, y];
        while (n < x) grid[y][n] = grid[y][++n];
      }
    }
  }

  if (dirs[i] === "^") {
    if (grid[y - 1][x] === "#") continue;
    if (grid[y - 1][x] === ".") p = [x, y - 1];
    else {
      const cc = findConnected(x, y - 1, -1).sort((a, b) => a[1] - b[1]);
      if (cc.every((p) => ["[", "]", "."].includes(grid[p[1] - 1][p[0]]))) {
        cc.forEach((p) => {
          const [x, y] = p;
          grid[y - 1][x] = grid[y][x];
          grid[y][x] = ".";
        });
        p = [x, y - 1];
      }
    }
  }

  if (dirs[i] === "v") {
    if (grid[y + 1][x] === "#") continue;
    if (grid[y + 1][x] === ".") p = [x, y + 1];
    else {
      const cc = findConnected(x, y + 1, 1).sort((a, b) => b[1] - a[1]);
      if (cc.every((p) => ["[", "]", "."].includes(grid[p[1] + 1][p[0]]))) {
        cc.forEach((p) => {
          const [x, y] = p;
          grid[y + 1][x] = grid[y][x];
          grid[y][x] = ".";
        });
        p = [x, y + 1];
      }
    }
  }
}

let score = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[1].length; x++) {
    if (grid[y][x] === "[") score += 100 * y + x;
  }
}

console.log(score);

function findConnected(x: number, y: number, d: number): number[][] {
  const queue: number[][] = [[x, y]];
  const visited = new Set<string>();
  const cc: number[][] = [];

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;
    const key = `${x},${y}`;

    if (visited.has(key)) continue;
    cc.push([x, y]);
    visited.add(key);

    if (["[", "]"].includes(grid[y + d][x])) queue.push([x, y + d]);
    if (grid[y][x] === "[") queue.push([x + 1, y]);
    if (grid[y][x] === "]") queue.push([x - 1, y]);
  }

  return cc;
}
