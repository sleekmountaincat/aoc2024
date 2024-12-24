import fs from "fs";

const outputs = new Map<string, number>();

const [init, gates] = fs
  .readFileSync("day24/input.txt")
  .toString()
  .split("\n\n")
  .map((l) => l.split("\n"));

init.forEach((i) => {
  const [wire, val] = i.split(":").map((o) => o.trim());
  outputs.set(wire, +val);
});

while (gates.length) {
  const g = gates.shift()!;
  const [g1, op, g2, _, out] = g.split(" ");

  if (outputs.has(g1) && outputs.has(g2)) {
    const g1Val = +outputs.get(g1)!;
    const g2Val = +outputs.get(g2)!;

    if (op === "XOR") outputs.set(out, g1Val ^ g2Val);
    else if (op === "OR") outputs.set(out, g1Val | g2Val);
    else if (op === "AND") outputs.set(out, g1Val & g2Val);
    else throw `KERNEL PANIC AT THE DISCO`;
  } else {
    gates.push(g);
  }
}

const X = getNum("x")

console.log(`${X}`, parseInt(X, 2));

function getNum(id: string): string {
  return [...outputs.keys()]
  .filter((k) => k.startsWith(id))
  .sort()
  .map((k) => outputs.get(k))
  .reverse()
  .join("");
}

