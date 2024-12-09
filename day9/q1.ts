import fs from "fs";

let blocks: number[] = [];
let cnt = 0;
fs.readFileSync("day9/input.txt")
  .toString()
  .split("\n")
  .forEach((l) => {
    [...l].forEach((c, i) => {
      blocks =
        i % 2
          ? blocks.concat(Array(+c).fill(-1))
          : blocks.concat(Array(+c).fill(cnt++));
    });
  });

for (let x = blocks.length - 1; x >= 0; x--) {
  let i = blocks.indexOf(-1);

  if (i < 0) break;

  blocks[i] = blocks[x];
  blocks.pop();
}

console.log(blocks.reduce((a, c, i) => a + i * c, 0));
