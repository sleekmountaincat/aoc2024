import fs from "fs";

const list1: number[] = new Array<number>();
const list2: number[] = new Array<number>();

fs.readFileSync("day1/input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const [l, r] = line.split(/\s+/);
    list1.push(parseInt(l));
    list2.push(parseInt(r));
  });

let sum = list1.reduce((a, c, i) => {
  let simScore = (list2.filter(x => x == list1[i]).length) * list1[i]
  return a + simScore;
}, 0);

console.log(sum);
