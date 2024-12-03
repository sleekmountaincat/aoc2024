import fs from "fs";

const safeReports = fs
  .readFileSync("day2/input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const report = line.split(/\s+/).map((l) => parseInt(l));

    return isReportSafe(report);
  })
  .filter((x) => x).length;

console.log(safeReports);

function isReportSafe(report: number[]): boolean {
  let valence = ""

  for (let x = 1; x < report.length; x++) {
    const diff = report[x - 1] - report[x];
    if (diff == 0 ||(diff > 0 && valence == "-") || (diff < 0 && valence == "+") || Math.abs(diff) > 3) {
      return false;
    } else if (valence == "") {
      valence = diff > 0 ? "+" : "-";
    }
  }

  return true;
}
