import fs from "fs";

type Opcodes = {
  [key: number]: (operand: number) => void;
};

type ComboOperands = {
  [key: number]: () => number;
};

const [r, p] = fs.readFileSync("day17/input.txt").toString().split("\n\n");

let [A,B,C] = r.replaceAll("\n", "").match(/(\d+)*(\d+)*(\d+)/g)!.map(a=>+a);
const program = p.split(" ")[1].split(",").map(q=>+q)

const out: number[] = [];
let idx = 0;

const opcodes: Opcodes = {
  0: (operand: number) => {
    A = Math.floor(A / (2 ** comboOperands[operand]()));
    idx += 2;
  },
  1: (operand: number) => {
    B ^= operand;
    idx += 2;
  },
  2: (operand: number) => {
    B = comboOperands[operand]() % 8;
    idx += 2;
  },
  3: (operand: number) => {
    idx = A === 0 ? idx + 2 : operand
  },
  4: (operand: number) => {
    B ^= C
    idx += 2;
  },
  5: (operand: number) => {
    out.push(comboOperands[operand]() % 8);
    idx += 2;
  },
  6: (operand: number) => {
    B = Math.floor(A / (2 ** comboOperands[operand]()));
    idx += 2;
  },
  7: (operand: number) => {
    C = Math.floor(A / (2 ** comboOperands[operand]()));
    idx += 2;
  },
};

const comboOperands: ComboOperands = {
  0: () => 0,
  1: () => 1,
  2: () => 2,
  3: () => 3,
  4: () => A,
  5: () => B,
  6: () => C,
  7: () => {
    throw "ABORT ABORT";
  },
};

while (idx < program.length) {
  opcodes[program[idx]](program[idx + 1]);
}

console.log(A, B, C);
console.log(out.join(","));
