import fs from "fs";

let flag = true;

const program = fs
  .readFileSync("day3/input.txt")
  .toString()
  .match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g)
  ?.reduce((a, c) => {
    console.log(c);
    if(c == "do()") {
      flag = true
      return a
    }

    if(c == "don't()") {
      flag = false
      return a
    }
    
    const term = c.match(/\d{1,3}/g);
    return flag ? a + parseInt(term![0]) * parseInt(term![1]) : a; 
  }, 0);

console.log(program);
