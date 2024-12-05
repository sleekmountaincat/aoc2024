import fs from "fs";

const rules = new Map<string, string[]>();
const books: string[][] = [];

fs.readFileSync("day5/input.txt")
  .toString()
  .split("\n")
  .forEach((l) => {
    if (l.includes("|")) {
      const [k, v] = l.split("|");
      rules.has(k) ? rules.get(k)?.push(v) : rules.set(k, [v]);
    } else if (l != "") {
      books.push(l.split(","));
    }
  });

const sum = books
  .filter((book) => !isBookValid(book))
  .map((book) => fixBook(book))
  .reduce((a, c) => {
    return a + parseInt(c[Math.floor(c.length / 2)]);
  }, 0);

console.log(sum);

function fixBook(book: string[]): string[] {
  return book.sort((a, b) => {
    const pageRules = rules.get(a);

    if (a === null) return 1;
    else if (pageRules?.includes(b)) return -1;
    else return 0;
  });
}

function isBookValid(book: string[]): boolean {
  for (const [idx, page] of book.entries()) {
    const pageRules = rules.get(page);

    if (pageRules != null) {
      for (const pr of pageRules) {
        if (book.includes(pr) && book.indexOf(pr) < idx) return false;
      }
    }
  }
  return true;
}
