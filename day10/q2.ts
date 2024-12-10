import fs from "fs";

const trailheads: number[][] = [];
const map = fs
  .readFileSync("day10/input.txt")
  .toString()
  .split("\n")
  .map((l, x) => {
    [...l].forEach((c, y) => {
      if (c == "0") trailheads.push([x+1, y+1]);
    });
    return `X${l}X`;
  });
map.push(new Array(map[0].length + 1).join("X"));
map.unshift(new Array(map[0].length + 1).join("X"));

console.log(trailheads.reduce((a,c) => a + getScore(c),0));

function getScore(currentPos: number[]): number {
  let score = 0
  const [x, y] = currentPos;
  const currentTile = map[x][y]

  if (currentTile == "9") return 1;

  if (+currentTile +1 == +map[x - 1][y])
    score += getScore([x - 1, y]);

  if (+currentTile +1 == +map[x + 1][y])
    score += getScore([x + 1, y]);

  if (+currentTile + 1== +map[x][y-1])
    score += getScore([x, y-1]);

  if (+currentTile + 1 == +map[x][y+1])
    score += getScore([x, y+1]);

  return score;
}
