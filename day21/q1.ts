// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+

//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+   

type Keypad = {
  [key: string]: number[];
};

type Directions = {
  [key: string]: number[];
};

type Node = {
  x: number;
  y: number;
  p: string;
};

const doorKeypad: Keypad = {
  0: [1, 3],
  1: [0, 2],
  2: [1, 2],
  3: [2, 2],
  4: [0, 1],
  5: [1, 1],
  6: [2, 1],
  7: [0, 0],
  8: [1, 0],
  9: [2, 0],
  A: [2, 3],
};
const doorKeypadCoords: number[][] = Object.keys(doorKeypad).map(
  (b) => doorKeypad[b]
);

const ctlKeypad: Keypad = {
  "A": [2, 0],
  "<": [0, 1],
  "v": [1, 1],
  "^": [1, 0],
  ">": [2, 1],
};
const ctlKeypadCoords: number[][] = Object.keys(ctlKeypad).map(
  (b) => ctlKeypad[b]
);

const dirs: Directions = {
  "v": [0, 1],
  ">": [1, 0],
  "^": [0, -1],
  "<": [-1, 0],
};

function shortest(s: number[], e: number[], valid: number[][]): string[] {
  const q: Node[] = [{ x: s[0], y: s[1], p: "" }];
  const visited = new Map<string, number>();
  let paths: string[][] = [];
  let best = Infinity;

  if (s[0] === e[0] && s[1] === e[1]) return ["A"];

  while (q.length) {
    const cur = q.shift();
    const key = `${cur!.x},${cur!.y}`;

    if (cur!.x === e[0] && cur!.y === e[1]) {
      if (cur!.p.length < best) {
        best = cur!.p.length;
        paths = [[...cur!.p]];
      } else if (cur!.p.length === best) paths.push([...cur!.p]);
    }
    if (visited.has(key) && visited.get(key)! < cur!.p.length) continue;

    visited.set(key, cur!.p.length);

    for (const dir of Object.keys(dirs)) {
      const [dX, dY] = dirs[dir];
      const next = { x: cur!.x + dX, y: cur!.y + dY, p: `${dir}${cur!.p}` };
      if (valid.find((c) => c[0] === next.x && c[1] === next.y)) q.push(next);
    }
  }

  return paths
    .sort((x, y) => {
      const xLeft = x.reduce((a, c, i) => a + (c === "<" ? i : 0), 0);
      const yLeft = y.reduce((a, c, i) => a + (c === "<" ? i : 0), 0);

      const xUpDown = x.reduce(
        (a, c, i) => a + (c === "^" || c === "v" ? i : 0),
        0
      );
      const yUpDown = y.reduce(
        (a, c, i) => a + (c === "^" || c === "v" ? i : 0),
        0
      );

      if (xLeft !== yLeft) return xLeft - yLeft;
      if (xUpDown !== yUpDown) return xUpDown - yUpDown;
      return 0;
    })
    .map((p) => [...p, "A"])[0];
}

const codes = ["029A", "980A", "179A", "456A", "379A"];

//////////////////////////////////////////////////////////////

const sum = codes.reduce((a, c) => {
  const sequence = buildSequence([...c]);
  console.log(c, sequence.length, parseInt(c));
  return a + parseInt(c) * sequence.length;
}, 0);

console.log(sum);

function buildSequence(code: string[]): string {
  const doorSequence = buildDoorSequence(code);
  const ctrl1 = buildCtrlSequence(doorSequence);
  const ctrl2 = buildCtrlSequence(ctrl1);

  return ctrl2.join("");
}

function buildDoorSequence(code: string[]): string[] {
  return code
    .map((c, i) => [
      ...shortest(
        i > 0 ? doorKeypad[code[i - 1]] : doorKeypad["A"],
        doorKeypad[c],
        doorKeypadCoords
      ),
    ])
    .flatMap((p) => p);
}

function buildCtrlSequence(sequence: string[]): string[] {
  return sequence
    .map((c, i) => [
      ...shortest(
        i > 0 ? ctlKeypad[sequence[i - 1]] : ctlKeypad["A"],
        ctlKeypad[c],
        ctlKeypadCoords
      ),
    ])
    .flatMap((p) => p);
}