import fs from "fs";

const stones = fs
  .readFileSync("day11/input.txt")
  .toString()
  .split("\n")
  .map((l) => l.split(" ").map((c) => +c))
  .flatMap((c) => c);

for (let i = 0; i < 25; i++) {
  blink();
  console.log(i,stones.length)
}

function blink() {
  for (let i = 0; i < stones.length; i++) {
    if(stones[i] === 0) stones[i] = 1
    else if (!(`${stones[i]}`.length % 2)) {
      const stone = `${stones[i]}`
      stones[i] = +stone.slice(0, stone.length/2)
      stones.splice(++i, 0, +stone.slice(stone.length/2))
    } else stones[i] *= 2024
  }
}