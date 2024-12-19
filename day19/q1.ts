import fs from "fs";
import Heap from "heap-js";

const [p, d] = fs.readFileSync("day19/input.txt").toString().split("\n\n");

const availablePatterns = p
  .replace(" ", "")
  .split(",")
  .map((q) => q.trim());
const wantedDesigns = d.split("\n").map((q) => q.trim());

console.log(wantedDesigns.filter((p,i)=>{
  console.log(i)
  return isSolveable(p)
}).length)

function isSolveable(design: string): boolean {
  const stack = new Heap((a: string, b: string) => a.length - b.length);
  stack.push(design)

  while(!stack.isEmpty()) {
    const des = stack.pop()!
    if (des.length === 0) return true;
    availablePatterns.forEach((pat) => {
      if (des.endsWith(pat)) {
        stack.push(des.slice(0, -pat.length));
      }
    });
  }

  return false;
}
