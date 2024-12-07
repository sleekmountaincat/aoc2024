import fs from "fs";
import cartesian from "fast-cartesian";

let ops = ["*", "+"];
let testValTot = 0;

const map = fs
  .readFileSync("day7/input.txt")
  .toString()
  .split("\n")
  .forEach((l) => {
    const tot = parseInt(l.split(": ")[0])
    const terms = l.split(": ")[1].split(" ").map((n) => parseInt(n));
    const spaces = terms.length-1;
    const configurations = cartesian(Array(spaces).fill(ops));

    if(isValid(configurations, terms, tot)) testValTot += tot
  });

console.log(testValTot)

function isValid(configurations: unknown[][], terms: number[], tot: number): boolean {
  for (const config of configurations) {
    let cnt = 0;

    let configTotal = config[cnt++] === "*"
        ? terms[0] * terms[1]
        : terms[0] + terms[1];

    for (let x = 2; x < terms.length; x++) {
      config[cnt++] === "*"
        ? configTotal *= terms[x]
        : configTotal += terms[x];
    }

    if(configTotal == tot) return true
  };
  return false
}