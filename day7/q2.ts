import fs from "fs";
import cartesian from "fast-cartesian";

let ops = ["*", "+", "|"];
let testValTot = 0;

const map = fs
  .readFileSync("day7/input.txt")
  .toString()
  .split("\n")
  .forEach((l) => {
    const tot = parseInt(l.split(": ")[0]);
    const terms = l
      .split(": ")[1]
      .split(" ")
      .map((n) => +n);
    const configurations = cartesian(Array(terms.length - 1).fill(ops));

    if (isValid(configurations, terms, tot)) testValTot += tot;
  });

console.log(testValTot);

function isValid(
  configurations: unknown[][],
  terms: number[],
  tot: number
): boolean {
  for (const config of configurations) {
    let cnt = 0;
    let configTotal = 0;

    if (config[cnt] === "*") configTotal = terms[0] * terms[1];
    else if (config[cnt] === "+") configTotal = terms[0] + terms[1];
    else configTotal = +`${terms[0]}${terms[1]}`;
    cnt++;

    for (let x = 2; x < terms.length; x++) {
      if (config[cnt] === "*") configTotal *= terms[x];
      else if (config[cnt] === "+") configTotal += terms[x];
      else configTotal = +`${configTotal}${terms[x]}`;
      cnt++
    }

    if (configTotal == tot) return true;
  }
  return false;
}
