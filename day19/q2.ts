import fs from "fs";
import memoize from 'memoize';

const [p, d] = fs.readFileSync("day19/input.txt").toString().split("\n\n");

const availablePatterns = p
  .replace(" ", "")
  .split(",")
  .map((q) => q.trim());
const wantedDesigns = d.split("\n").map((q) => q.trim());

let isSolveable = (design: string): number => {
  let sum = 0
  if (design.length === 0) return 1;

  availablePatterns.forEach((pat) => {
    if (design.startsWith(pat)) {
      sum += isSolveable(design.slice(pat.length));
    }
  });

  return sum;
}

isSolveable = memoize(isSolveable)

const sum = wantedDesigns.reduce((a,c,i)=>{
  console.log(i)
  return a + isSolveable(c)
},0)

console.log(sum)
