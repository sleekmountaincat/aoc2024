import fs from "fs";

const steps = 2000;

const bana: number[][][] = []
const possibleSeq = new Set<string>()

fs.readFileSync("day22/input.txt")
  .toString()
  .split("\n")
  .forEach((n,i) => {
    let num = +n;
    let price = num % 10
    let delta = 0
    bana[i] = []

    for (let x = 0; x < steps; x++) {
      num = getSecret(num);
      let newPrice = num % 10
      delta = newPrice - price
      price = newPrice

      bana[i].push([price, delta])
    }

  });

bana.forEach(b=>{
  b.forEach((d,i)=>{
    if(i+3<steps) possibleSeq.add(`${b[i][1]}|${b[i+1][1]}|${b[i+2][1]}|${b[i+3][1]}`)
  })
})

let bestSeq = ""
let bananannanan = 0
console.log(possibleSeq.size)
let idx=0

for(const seq of possibleSeq) {
  console.log("i", idx++)
  let banTot = 0;

  for(const b of bana) {
    let index = 0
    for(const [price,delta] of b) {
      if(index+3<steps && `${b[index][1]}|${b[index+1][1]}|${b[index+2][1]}|${b[index+3][1]}` === seq) {
        banTot+=b[index+3][0]
        break 
      }
      index++
    }
  }

  if (banTot > bananannanan) {
    bananannanan = banTot
    bestSeq = seq
  }
}

console.log(bananannanan, bestSeq)

function getSecret(n: number): number {
  return (
    ((((n ^ (n * 64)) % 16777216 ^
      Math.floor(((n ^ (n * 64)) % 16777216) / 32)) %
      16777216 ^
      ((((n ^ (n * 64)) % 16777216 ^
        Math.floor(((n ^ (n * 64)) % 16777216) / 32)) %
        16777216) *
        2048)) >>>
      0) %
    16777216
  );
}

