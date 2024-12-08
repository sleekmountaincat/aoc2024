import fs from "fs";

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

    if (dfsCheck(terms, tot, 0, terms[0])) {
      testValTot += tot;
    }
  });

console.log(testValTot);

function dfsCheck(terms: number[], target: number, index: number, currentTotal: number): boolean {
  if(currentTotal > target) return false
  if (index === terms.length - 1) {
    return currentTotal === target;
  }

  for (const op of ops) {
    const nextTerm = terms[index + 1];
    let newTotal = currentTotal;

    if (op === "*") {
      newTotal *= nextTerm;
    } else if (op === "+") {
      newTotal += nextTerm;
    } else if (op === "|") {
      newTotal = +`${newTotal}${nextTerm}`;
    }

    if (dfsCheck(terms, target, index + 1, newTotal)) {
      return true;
    }
  }

  return false; 
}
