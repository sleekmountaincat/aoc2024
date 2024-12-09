import fs from "fs";

let blocks: string[] = [];
let cnt = 0;
let size = new Map<number, number>();
fs.readFileSync("day9/input.txt")
  .toString()
  .split("\n")
  .forEach((l) => {
    [...l].forEach((c, i) => {
      if (i % 2) {
        blocks = blocks.concat(Array(+c).fill("."));
      } else {
        if (+c <= 0) console.log("wtf"); // file size 0?
        size.set(cnt, +c);
        blocks =
          +c > 0
            ? blocks.concat(Array(+c).fill(`${cnt}`))
            : blocks.concat(Array(1).fill("X"));
        cnt++;
      }
    });
  });

for (const id of [...size.keys()].sort((a, b) => b - a)) {
  const idSize = size.get(id)!;
  const freeSpaceIdx = blocks
    .join("")
    .search(new RegExp(`\\.{${idSize}}`, "g"));
  if (freeSpaceIdx > -1) {
    const idIdx = blocks.findIndex((c) => c == `${id}`);
    if (idIdx >= freeSpaceIdx) {
      for (let i = idIdx; i < idIdx + idSize; i++) {
        blocks[i] = ".";
      }
      for (let i = freeSpaceIdx; i < freeSpaceIdx + idSize; i++) {
        blocks[i] = `${id}`;
      }
    }
  }
}
// console.log(blocks.join(""));
console.log(
  blocks
    .filter((c) => c != "X")
    .reduce((a, c, i) => (c != "." ? a + BigInt(i * +c) : a), BigInt(0))
);
