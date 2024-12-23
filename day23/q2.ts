// BronKerbosch algo for next years aoc
import fs from "fs";
const puters = new Map<string, string[]>();

fs.readFileSync("day23/input.txt")
  .toString()
  .split("\n")
  .forEach((l) => {
    const [c1, c2] = l.split("-");

    puters.has(c1) ? puters.get(c1)!.push(c2) : puters.set(c1, [c2]);
    puters.has(c2) ? puters.get(c2)!.push(c1) : puters.set(c2, [c1]);
  });

const visited = new Set<string>()
let biggest = 0

for (const [p, n] of puters) {
  if(!visited.has(p)) {
    const clique = bronAlgo([p], n, [])
    clique.forEach(c=>visited.add(c))
    if (clique.length > biggest) {
      biggest = clique.length
      console.log(clique.sort().join())
    }
  }
}


function bronAlgo(R: string[], P: string[], X: string[]) {
  if (P.length || X.length)  {
    const v = P.pop()!;
    R.push(v);

    const vCx = puters.get(v)!;
    bronAlgo(R, P.filter((p) => vCx.includes(p)), X.filter((p) => vCx.includes(p)))

    X.push(v)
  }
  return R
}
