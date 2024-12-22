import fs from "fs";

const steps = 2000;
let sum = 0;

fs.readFileSync("day22/input.txt")
  .toString()
  .split("\n")
  .forEach((n) => {
    let num = +n;
    for (let x = 0; x < steps; x++) {
      num = getSecret(num);
    }
    sum += num;
  });

console.log(sum);

function getSecret(n: number): number {
  return (
    ((((n ^ (n * 64)) % 16777216 ^
      Math.floor(((n ^ (n * 64)) % 16777216) / 32)) %
      16777216 ^
      ((((n ^ (n * 64)) % 16777216 ^
        Math.floor(((n ^ (n * 64)) % 16777216) / 32)) %
        16777216) *
        2048)) >>>
      0) %
    16777216
  );
}
