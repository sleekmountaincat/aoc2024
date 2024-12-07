import fs from "fs";

interface Point {
  x: number;
  y: number;
}

let startLoc: Point = { x: 0, y: 0 };
let sum = 0;
let visited = new Map<string, string>();

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

isBlocked();

for (let k of new Map(visited).keys()) {
  const [x, y] = k.split(",");
  if (map[parseInt(x)][parseInt(y)] == ".") {
    map[parseInt(x)][parseInt(y)] = "#";
    if (isBlocked()) sum++;
    map[parseInt(x)][parseInt(y)] = ".";
  }
}

console.log(sum);

function isBlocked(): boolean {
  let loc = startLoc;
  let dir = "U";
  visited.clear();

  do {
    visited.set(`${loc.x},${loc.y}`, dir);
    let nextLoc = getNext(loc, dir);

    while (map[nextLoc.x][nextLoc.y] == "#") {
      dir = turn(dir);
      nextLoc = getNext(loc, dir);
    }

    loc = nextLoc;

    if (visited.get(`${loc.x},${loc.y}`) === dir) return true;
  } while (map[loc.x][loc.y] != "O");
  return false;
}

function getNext(loc: Point, dir: string): Point {
  if (dir == "U") return { x: loc.x - 1, y: loc.y };
  else if (dir == "D") return { x: loc.x + 1, y: loc.y };
  else if (dir == "L") return { x: loc.x, y: loc.y - 1 };
  else return { x: loc.x, y: loc.y + 1 };
}

function turn(h: string) {
  if (h == "U") return "R";
  else if (h == "D") return "L";
  else if (h == "L") return "U";
  else return "D";
}
