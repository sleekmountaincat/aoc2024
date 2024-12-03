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

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

let sum = 0;
for (let x = 0; x < list1.length; x++) {
  sum += Math.abs(list1[x] - list2[x]);
}

console.log(sum)