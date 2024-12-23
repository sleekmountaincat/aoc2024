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

const cx = new Set<string>();
for (const [p, n] of puters) {
  n.flatMap((p1, i) =>
    n.slice(i + 1).forEach((p2) => {
      if (puters.get(p1)!.includes(p2)) {
        cx.add([p, p1, p2].sort().join("-"));
      }
    })
  );
}

console.log(cx);
