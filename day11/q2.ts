import fs from "fs";
import memoize from 'memoize';

let sum = 0;
const lengths = new Map<string, number>()

let blinkStone = (num: number): number[] => {
  if (num === 0) return [1, -1];
  else if (!(`${num}`.length % 2))
    return [
      +`${num}`.slice(0, `${num}`.length / 2),
      +`${num}`.slice(`${num}`.length / 2),
    ];
  else return [num * 2024, -1];
};

blinkStone = memoize(blinkStone);

let stoneLength = (num: number, blinkCnt: number): number => {
  const [l, r] = blinkStone(num);
  if (blinkCnt == 1) return r > -1 ? 2 : 1;

  let length = stoneLength(l, blinkCnt - 1);
  if (r > -1) length += stoneLength(r, blinkCnt - 1)
  
  return length
};

stoneLength = memoize(stoneLength, {
  cacheKey: (arguments_: number[]) => arguments_.join(',')
});

fs.readFileSync("day11/input.txt")
  .toString()
  .split("\n")
  .forEach(
    (l) => (sum += l.split(" ").reduce((a, c) => a + stoneLength(+c, 75), 0))
  );

console.log(sum);