import fs from "fs";

let blocks: number[] = [];
let cnt = 0;
let size = new Map<number, number>();
fs.readFileSync("day9/input.txt")
  .toString()
  .split("\n")
  .forEach((l) => {
    [...l].forEach((c, i) => {
      if (i % 2) {
        blocks = blocks.concat(Array(+c).fill(-1));
      } else {
        size.set(cnt, +c);
        blocks = blocks.concat(Array(+c).fill(cnt))
        cnt++;
      }
    });
  });

for (const id of [...size.keys()].sort((a, b) => b - a)) {
  const idSize = size.get(id)!;
  let freeSpaceIdx = findFree(idSize)

  if (freeSpaceIdx > -1) {
    const idIdx = blocks.findIndex((c) => c == id);

    if (idIdx >= freeSpaceIdx) {
      for (let i = idIdx; i < idIdx + idSize; i++) {
        blocks[i] = -1;
      }
      for (let i = freeSpaceIdx; i < freeSpaceIdx + idSize; i++) {
        blocks[i] = id;
      }
    }
  }
}

console.log(blocks.reduce((a, c, i) => (c >= 0 ? a + i * c : a), 0));

function findFree(idSize: number): number {
  for(let [i, v] of blocks.entries()) {
    if(v == -1) {
      let curIdx =i
      let startIdx = i
      let cnt = 1
      while (blocks[curIdx]==-1) {
        if (cnt==idSize) return startIdx
        curIdx++
        cnt++
      }
    }
  }
  return -1
}

