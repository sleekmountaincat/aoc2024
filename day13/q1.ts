import fs from "fs";

let sum = 0;

fs.readFileSync("day13/input.txt")
  .toString()
  .split("\n\n")
  .forEach((l) => {
    const [l1, l2, l3] = l.split("\n");
    const [aX, aY] = l1.match(/(\d+)(\d+)/g)!;
    const [bX, bY] = l2.match(/(\d+)(\d+)/g)!;
    const [pX, pY] = l3.match(/(\d+)(\d+)/g)!;

    const solution = cramerSolve(+aX, +bX, +pX, +aY, +bY, +pY);

    if (solution === undefined) {
      console.log("uh oh", l1, l2, l3);
    } else {
      const [aCnt, bCnt] = solution;
      if (
        Number.isInteger(aCnt) &&
        Number.isInteger(bCnt) &&
        aCnt <= 100 &&
        bCnt <= 100
      ) {
        sum += 3 * aCnt + bCnt;
      }
    }
  });

console.log(sum);

function cramerSolve(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number
): [number, number] | undefined {
  let determinate = a1 * b2 - a2 * b1;

  if (determinate === 0) return undefined;

  let x = (c1 * b2 - c2 * b1) / determinate;
  let y = (a1 * c2 - a2 * c1) / determinate;

  return [x, y];
}
