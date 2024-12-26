import fs from "fs";

const keys: number[][] = [];
const locks: number[][] = [];
let size = 0;

fs.readFileSync("day25/input.txt")
  .toString()
  .split("\n\n")
  .forEach((l) => {
    const g = l
      .split("\n")
      .map((o) => [...o])[0]
      .map((_, i) =>
        l
          .split("\n")
          .map((o) => [...o])
          .map((row) => row[i])
      )
      .map((i) =>
        i.reduce((a, c) => a + [...c].filter((v) => v === "#").length, -1)
      );
    size = g.length;
    if (l[0] === "#") locks.push(g);
    else keys.push(g);
  });

const combos = keys.flatMap((d) => locks.map((v) => [d, v]));

const ans = combos.reduce((a, c) => {
  let [k, l] = c;
  for (let i = 0; i < size; i++) if (k[i] + l[i] > size) return a;
  return a + 1;
}, 0);

console.log(ans);
