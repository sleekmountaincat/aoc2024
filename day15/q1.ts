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
      while (grid[y][n] === "O") n++;
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
      while (grid[y][n] === "O") n--;
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
      let n = y - 1;
      while (grid[n][x] === "O") n--;
      if (grid[n][x] != "#") {
        p = [x, y - 1];
        while (n < y) grid[n][x] = grid[++n][x];
      }
    }
  }

  if (dirs[i] === "v") {
    if (grid[y + 1][x] === "#") continue;
    if (grid[y + 1][x] === ".") p = [x, y + 1];
    else {
      let n = y + 1;
      while (grid[n][x] === "O") n++;
      if (grid[n][x] != "#") {
        p = [x, y + 1];
        while (n > y) grid[n][x] = grid[--n][x];
      }
    }
  }
}
grid.forEach((l) => console.log(l.join("")));

let score = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[1].length; x++) {
    if (grid[y][x] === "O") score += 100 * y + x;
  }
}

console.log(score);
