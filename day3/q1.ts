import fs from "fs";

const program = fs
  .readFileSync("day3/input.txt")
  .toString()
  .match(/mul\(\d{1,3},\d{1,3}\)/g)
  ?.reduce((a, c) => {
    const term = c.match(/\d{1,3}/g);
    return a + parseInt(term![0]) * parseInt(term![1]);
  }, 0);

console.log(program);
