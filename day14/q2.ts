import fs from "fs";

const W = 101;
const H = 103;

const grid = [...Array(H)].map(() => Array(W).fill(0));

const guards = fs
  .readFileSync("day14/input.txt")
  .toString()
  .split("\n")
  .map((l) => {
    const [pX, pY, vX, vY] = l
      .match(/(-?\d+)*(-?\d+)*(-?\d+)*(-?\d+)/g)!
      .map((d) => +d);
    grid[pY][pX] += 1;
    return [pX, pY, vX, vY];
  });

let cnt = 0;

do {
  elapseSecond();
  cnt++;
} while (grid.reduce((a, c) => a + c.filter((n) => n > 0).length, 0) < 499);

grid.forEach((l) => {
  console.log(l.join("").replaceAll("0", "."));
});

console.log(cnt);

function elapseSecond() {
  guards.forEach((g, i) => {
    const [pX, pY, vX, vY] = g;

    grid[pY][pX] -= 1;

    let eX = pX + 1 * vX;
    let eY = pY + 1 * vY;

    eX = eX > 0 ? eX % W : (W - (Math.abs(eX) % W)) % W;
    eY = eY > 0 ? eY % H : (H - (Math.abs(eY) % H)) % H;

    grid[eY][eX] += 1;
    guards[i][0] = eX;
    guards[i][1] = eY;
  });
}
