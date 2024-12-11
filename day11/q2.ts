import fs from "fs";
import moize from "moize";

let sum = 0;

let blinkStone = (num: number): number[] => {
  if (num === 0) return [1, -1];
  else if (!(`${num}`.length % 2))
    return [
      +`${num}`.slice(0, `${num}`.length / 2),
      +`${num}`.slice(`${num}`.length / 2),
    ];
  else return [num * 2024, -1];
};
const blinkStoneM = moize(blinkStone);

let stoneLength = (num: number, blinkCnt: number): number => {
  const [l, r] = blinkStoneM(num);
  if (blinkCnt == 1) return r > -1 ? 2 : 1;

  return r > -1
    ? stoneLength(r, blinkCnt - 1) + stoneLength(l, blinkCnt - 1)
    : stoneLength(l, blinkCnt - 1);
};
const stoneLengthM = moize(stoneLength);

fs.readFileSync("day11/input.txt")
  .toString()
  .split("\n")
  .forEach(
    (l) => (sum += l.split(" ").reduce((a, c) => a + stoneLengthM(+c, 75), 0))
  );

console.log(sum);
