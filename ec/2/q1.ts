import fs from "fs";

let words: string[] = [];
let ins: string[] = [];
let sum = 0;

fs.readFileSync("ec/2/input.txt")
  .toString()
  .split("\n")
  .forEach((l) => {
    if (l.includes("WORDS:")) words = l.replace("WORDS:", "").split(",");
    else if (l.length > 0) ins.push(l.trim().replace(/\d\s.,/g, ""));
  });

console.log(words, ins);

const test = ins[3]
let chars = [...test]
words.forEach((w) => {
  const forwardMatches = test.matchAll(new RegExp(`(?=(${w}))`, "g"))

  for (const match of forwardMatches) {
    console.log("c", match.index, match[1].length)
    chars.fill("*", match.index, match[1].length)
    console.log(chars.join(""))
  }


  // const t = Array.from(), (match) => match.);
  // console.log(t)
  // sum+=Array.from([...test].reverse().join("").matchAll(new RegExp(`(?=(${w}))`, "g")), (match) => match[1]).length;
});

console.log(chars.join(""))

// ins.forEach(i=>{
//   let sum = 0
//   words.forEach((w) => {
//     sum+=Array.from(i.matchAll(new RegExp(`(?=(${w}))`, "g")), (match) => match[1]).length;
//     sum+=Array.from([...i].reverse().join("").matchAll(new RegExp(`(?=(${w}))`, "g")), (match) => match[1]).length;
//   });
//   console.log(i, sum);
// })



