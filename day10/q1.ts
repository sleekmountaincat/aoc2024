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

console.log(trailheads.reduce((a,c) => a + getScore(c, new Set<string>()),0));

function getScore(currentPos: number[], visited: Set<string>): number {
  let score = 0
  const [x, y] = currentPos;
  const currentTile = map[x][y]

  let key = `${x},${y}`;
  if (visited.has(key)) return 0;
  visited.add(key);

  if (currentTile == "9") return 1;

  if (+currentTile +1 == +map[x - 1][y])
    score += getScore([x - 1, y], visited);

  if (+currentTile +1 == +map[x + 1][y])
    score += getScore([x + 1, y], visited);

  if (+currentTile + 1== +map[x][y-1])
    score += getScore([x, y-1], visited);

  if (+currentTile + 1 == +map[x][y+1])
    score += getScore([x, y+1], visited);

  return score;
}
