import Board from "./board";
import SearchNode from "./searchnode";
import { MinHeap } from "min-heap-typed";

class Solver {
  private readonly initialBoard: Board;
  private readonly isSolvableFlag: boolean;
  private readonly minMoves: number;
  private readonly solutionSequence: Board[];

  constructor(initial: Board) {
    if (!initial) {
      throw new Error("Initial board cannot be null");
    }
    this.initialBoard = initial;
    this.isSolvableFlag = this.solvePuzzle();
    if (this.isSolvableFlag) {
      this.solutionSequence = this.calculateSolutionSequence();
      this.minMoves = this.solutionSequence.length - 1;
    } else {
      this.minMoves = -1;
      this.solutionSequence = [];
    }
  }

  private solvePuzzle(): boolean {
    const initialNode = new SearchNode(this.initialBoard);
    const minHeap = new MinHeap<SearchNode>();
    minHeap.add(initialNode);

    const twinInitialNode = new SearchNode(this.initialBoard.twin());
    const twinMinHeap = new MinHeap<SearchNode>();
    twinMinHeap.add(twinInitialNode);

    while (!minHeap.isEmpty() && !twinMinHeap.isEmpty()) {
      const minNode: any | null = minHeap.poll();
      const twinMinNode: any | null = twinMinHeap.poll();
      if (minNode.board.isGoal()) {
        return true;
      } else if (twinMinNode.board.isGoal()) {
        return false;
      }

      for (const neighbor of minNode.board.neighbors()) {
        if (
          minNode.prevNode === null ||
          !neighbor.equals(minNode.prevNode.board)
        ) {
          minHeap.add(new SearchNode(neighbor, minNode));
        }
      }

      for (const neighbor of twinMinNode.board.neighbors()) {
        if (
          twinMinNode.prevNode === null ||
          !neighbor.equals(twinMinNode.prevNode.board)
        ) {
          twinMinHeap.add(new SearchNode(neighbor, twinMinNode));
        }
      }
    }

    return false;
  }

  private calculateSolutionSequence(): Board[] {
    if (!this.isSolvableFlag) return [];
    const sequence: Board[] = [];
    let currentNode: SearchNode | null = this.solutionNode();
    while (currentNode !== null) {
      sequence.unshift(currentNode.board);
      currentNode = currentNode.prevNode;
    }
    return sequence;
  }

  private solutionNode(): SearchNode | null {
    const initialNode = new SearchNode(this.initialBoard);
    const minHeap = new MinHeap<SearchNode>();
    minHeap.add(initialNode);

    while (!minHeap.isEmpty()) {
      const minNode: any | null = minHeap.poll();
      if (minNode.board.isGoal()) {
        return minNode;
      }
      for (const neighbor of minNode.board.neighbors()) {
        if (
          minNode.prevNode === null ||
          !neighbor.equals(minNode.prevNode.board)
        ) {
          minHeap.add(new SearchNode(neighbor, minNode));
        }
      }
    }
    return null;
  }

  isSolvable(): boolean {
    return this.isSolvableFlag;
  }

  moves(): number {
    return this.minMoves;
  }

  solution(): Board[] {
    return this.solutionSequence;
  }
}

export default Solver;
