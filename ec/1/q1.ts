import fs from "fs";

const battle = fs.readFileSync("ec/1/input.txt").toString();

const points = new Map<string, number>();
points.set("A", 0);
points.set("B", 1);
points.set("C", 3);
points.set("D", 5);
points.set("x", 0);
points.set("0", 6);
points.set("1", 2);
points.set("2", 0);
points.set("3", 0);

let sum = 0;

for (let x = 0; x < battle.length - 2; x += 3) {
  const extra = points.get((`${battle[x]}${battle[x+1]}${battle[x+2]}`.match(/x/g) || []).length.toString(10))!
  console.log(`${battle[x]}${battle[x+1]}${battle[x+2]}`, extra, points.get(battle[x])! + points.get(battle[x+1])! + points.get(battle[x+2])! + extra)
  sum += points.get(battle[x])! + points.get(battle[x+1])! + points.get(battle[x+2])! + extra;
}

console.log(sum)

