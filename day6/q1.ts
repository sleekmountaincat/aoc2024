import fs from "fs";

interface Point {
  x: number;
  y: number;
}

let loc: Point = { x: 0, y: 0 };
let dir = "U";

const map = fs
  .readFileSync("day6/input.txt")
  .toString()
  .split("\n")
  .map((l, i) => {
    if (l.indexOf("^") > 0) {
      loc.x = i + 1;
      loc.y = l.indexOf("^") + 1;
    }
    return [...`O${l}O`];
  });
map.push([...new Array(map[0].length + 1).join("O")]);
map.unshift([...new Array(map[0].length + 1).join("O")]);

do {
  const nextLoc = getNext(loc, dir);
  map[loc.x][loc.y] = "X";

  if (map[nextLoc.x][nextLoc.y] == "#") {
    loc = turn(loc, dir);
  } else {
    loc = nextLoc;
  }
} while (map[loc.x][loc.y] != "O");

console.log(
  map.reduce((a, c) => {
    return a + c.filter((l) => l === "X").length;
  }, 0)
);

function getNext(loc: Point, dir: string): Point {
  if (dir == "U") return { x: loc.x - 1, y: loc.y };
  if (dir == "D") return { x: loc.x + 1, y: loc.y };
  if (dir == "L") return { x: loc.x, y: loc.y - 1 };
  else return { x: loc.x, y: loc.y + 1 };
}

function turn(loc: Point, h: string): Point {
  if (h == "U") dir = "R";
  if (h == "D") dir = "L";
  if (h == "L") dir = "U";
  if (h == "R") dir = "D";
  return getNext(loc, dir);
}
