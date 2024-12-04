import fs from "fs";

const grid = fs.readFileSync("day4/input.txt").toString().split("\n");

let xmasCnt = 0;

for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[0].length; y++) {
    if (grid[x][y] === "A") xmasCnt += findXmas(x, y);
  }
}

console.log(xmasCnt);

function findXmas(x: number, y: number): number {
  let cnt = 0;

  if (x>0 && x<grid.length-1 && y>0 && y<grid.length-1) {
    if ( ((grid[x-1][y-1] === "M" && grid[x+1][y+1] === "S") || (grid[x-1][y-1] === "S" && grid[x+1][y+1] === "M")) && ((grid[x-1][y+1] === "M" && grid[x+1][y-1] === "S") || (grid[x-1][y+1] === "S" && grid[x+1][y-1] === "M"))) {
      cnt++
    }
  }

  return cnt;
}
