import Board from "./board";
import { MinHeap } from "min-heap-typed";

class Solver {
    // find a solution to the initial board (using the A* algorithm)
    constructor(initial: Board) {
        // YOUR CODE HERE
    }

    // is the initial board solvable? (see below)
    isSolvable(): boolean {
        // PLS MODIFY
        return true;
    }

    // min number of moves to solve initial board; -1 if unsolvable
    moves(): number {
        // PLS MODIFY
        return 0;
    }

    // sequence of boards in a shortest solution; null if unsolvable
    solution(): Board[] {
        // PLS MODIFY
        return [];
    }
}

export default Solver;
