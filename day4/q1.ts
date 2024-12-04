import fs from "fs";

const grid = fs.readFileSync("day4/input.txt").toString().split("\n");

let xmasCnt = 0;

for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[0].length; y++) {
    if (grid[x][y] === "X") xmasCnt += findXmas(x, y);
  }
}

console.log(xmasCnt);

function findXmas(x: number, y: number): number {
  let cnt = 0;

  // up
  if (
    x > 2 &&
    grid[x - 1][y] === "M" &&
    grid[x - 2][y] === "A" &&
    grid[x - 3][y] === "S"
  ) {
    cnt++;
  }

  // down
  if (
    x + 3 < grid.length &&
    grid[x + 1][y] === "M" &&
    grid[x + 2][y] === "A" &&
    grid[x + 3][y] === "S"
  ) {
    cnt++;
  }

  // left
  if (
    y > 2 &&
    grid[x][y - 1] === "M" &&
    grid[x][y - 2] === "A" &&
    grid[x][y - 3] === "S"
  ) {
    cnt++;
  }

  // right
  if (
    y + 3 < grid[0].length &&
    grid[x][y + 1] === "M" &&
    grid[x][y + 2] === "A" &&
    grid[x][y + 3] === "S"
  ) {
    cnt++;
  }

  // up left
  if (
    x > 2 &&
    y > 2 &&
    grid[x - 1][y - 1] === "M" &&
    grid[x - 2][y - 2] === "A" &&
    grid[x - 3][y - 3] === "S"
  ) {
    cnt++;
  }

  // up right
  if (
    x > 2 &&
    y + 3 < grid[0].length &&
    grid[x - 1][y + 1] === "M" &&
    grid[x - 2][y + 2] === "A" &&
    grid[x - 3][y + 3] === "S"
  ) {
    cnt++;
  }

  // down left
  if (
    x + 3 < grid.length &&
    y > 2 &&
    grid[x + 1][y - 1] === "M" &&
    grid[x + 2][y - 2] === "A" &&
    grid[x + 3][y - 3] === "S"
  ) {
    cnt++;
  }

  // down right
  if (
    x + 3 < grid.length &&
    y + 3 < grid[0].length &&
    grid[x + 1][y + 1] === "M" &&
    grid[x + 2][y + 2] === "A" &&
    grid[x + 3][y + 3] === "S"
  ) {
    cnt++;
  }

  return cnt;
}
