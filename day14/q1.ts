import fs from "fs";

const W = 101;
const H = 103;
const S = 100;
const XMID = Math.floor(W / 2);
const YMID = Math.floor(H / 2);

const grid = [...Array(H)].map(() => Array(W).fill(0));

fs.readFileSync("day14/input.txt")
  .toString()
  .split("\n")
  .forEach((l) => {
    const [pX, pY, vX, vY] = l
      .match(/(-?\d+)*(-?\d+)*(-?\d+)*(-?\d+)/g)!
      .map((d) => +d);

    let eX = pX + S * vX;
    let eY = pY + S * vY;

    eX = eX > 0 ? eX % W : (W - (Math.abs(eX) % W)) % W;
    eY = eY > 0 ? eY % H : (H - (Math.abs(eY) % H)) % H;

    grid[eY][eX] += 1;
  });

let [q1, q2, q3, q4] = [0, 0, 0, 0];
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (x < XMID && y < YMID) q1 += grid[y][x];
    if (x > XMID && y < YMID) q2 += grid[y][x];
    if (x > XMID && y > YMID) q3 += grid[y][x];
    if (x < XMID && y > YMID) q4 += grid[y][x];
  }
}

console.log(q1 * q2 * q3 * q4);
// eX % W
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27
// 0 1 2 3 4 5 6 7 8 9 10  0  1  2  3  4  5  6  7  8  9 10 11  0  1  2  3

// (W - (Math.abs(eX) % W)) % W
// -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1  0 1 2 3 4 5 6 7 8 9 10 11 12 13
//   9  10   0   1  2  3  4  5  6  7  8  9 10  0
