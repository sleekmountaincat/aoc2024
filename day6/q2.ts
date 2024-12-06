import fs from "fs";

interface Point {
  x: number;
  y: number;
}

let startLoc: Point = { x: 0, y: 0 };
let loc: Point;
let dir = "U";
let visited = new Map<string, string>();
let sum = 0;

let map = fs
  .readFileSync("day6/input.txt")
  .toString()
  .split("\n")
  .map((l, i) => {
    if (l.indexOf("^") >= 0) {
      startLoc.x = i + 1;
      startLoc.y = l.indexOf("^") + 1;
    }
    return [...`O${l.trim()}O`];
  });
map.push([...new Array(map[0].length + 1).join("O")]);
map.unshift([...new Array(map[0].length + 1).join("O")]);

// i dont think we need to test every coordinate here, but it runs in < 15 seconds so ill take it lol
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    if (map[i][j] === ".") {
      map[i][j] = "#";
      if (isBlocked()) sum++;
      map[i][j] = ".";
    }
  }
}

console.log(sum);

function isBlocked(): boolean {
  loc = startLoc;
  dir = "U"
  visited.clear();

  do {
    visited.set(`${loc.x},${loc.y}`, dir);
    let nextLoc = getNext(loc, dir);

    while (map[nextLoc.x][nextLoc.y] == "#") {
      turn(dir)
      nextLoc = getNext(loc, dir);
    }

    loc = nextLoc;

    if (visited.get(`${loc.x},${loc.y}`) === dir) return true;
  } while (map[loc.x][loc.y] != "O");
  return false;
}

function getNext(loc: Point, dir: string): Point {
  if (dir == "U") return { x: loc.x - 1, y: loc.y };
  if (dir == "D") return { x: loc.x + 1, y: loc.y };
  if (dir == "L") return { x: loc.x, y: loc.y - 1 };
  else return { x: loc.x, y: loc.y + 1 };
}

function turn(h: string) {
  if (h == "U") dir = "R";
  if (h == "D") dir = "L";
  if (h == "L") dir = "U";
  if (h == "R") dir = "D";
}
