import Board from "./classes/board";
import Solver from "./classes/solver";
import { readFileSync } from "fs";

const fileName: string = process.argv[2];

const lines: string[] = readFileSync(`./puzzles/${fileName}`, "utf8").split(
  "\n"
);
const n: number = parseInt(lines[0]);
const tiles: number[][] = [];

lines.forEach((line, row) => {
  if (row === 0) {
    return;
  }

  const nums = line
    .split(" ")
    .map((s) => parseInt(s))
    .filter((x) => !isNaN(x));

  if (nums.length === 0) {
    return;
  }

  tiles.push(nums);
});

console.log(tiles);

const initialBoard = new Board(tiles);

const solver = new Solver(initialBoard);
