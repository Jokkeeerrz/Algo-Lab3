import Board from "./board";
import MinHeap from "min-heap-typed";

type Comparator<T> = (a: T, b: T) => number;

class SearchNode {
  board: Board;
  moves: number;
  prevNode: SearchNode | null;

  constructor(board: Board, moves: number, prevNode: SearchNode | null) {
    this.board = board;
    this.moves = moves;
    this.prevNode = prevNode;
  }

  priority(): number {
    return this.moves + this.board.manhattan();
  }
}

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
      this.minMoves = this.calculateMinMoves();
      this.solutionSequence = this.calculateSolutionSequence();
    } else {
      this.minMoves = -1;
      this.solutionSequence = [];
    }
  }

  private solvePuzzle(): boolean {
    const initialNode = new SearchNode(this.initialBoard, 0, null);
    const minHeap = new MinHeap<SearchNode>();
    minHeap.insert(
      initialNode,
      (a: SearchNode, b: SearchNode) => a.priority() - b.priority()
    );

    const twinInitialNode = new SearchNode(this.initialBoard.twin(), 0, null);
    const twinMinHeap = new MinHeap<SearchNode>();
    twinMinHeap.insert(
      twinInitialNode,
      (a: SearchNode, b: SearchNode) => a.priority() - b.priority()
    );

    while (!minHeap.isEmpty() && !twinMinHeap.isEmpty()) {
      const minNode = minHeap.delete();
      const twinMinNode = twinMinHeap.delete();

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
          minHeap.insert(
            new SearchNode(neighbor, minNode.moves + 1, minNode),
            (a: SearchNode, b: SearchNode) => a.priority() - b.priority()
          );
        }
      }

      for (const neighbor of twinMinNode.board.neighbors()) {
        if (
          twinMinNode.prevNode === null ||
          !neighbor.equals(twinMinNode.prevNode.board)
        ) {
          twinMinHeap.insert(
            new SearchNode(neighbor, twinMinNode.moves + 1, twinMinNode),
            (a: SearchNode, b: SearchNode) => a.priority() - b.priority()
          );
        }
      }
    }

    return false;
  }

  private calculateMinMoves(): number {
    return this.isSolvableFlag ? this.solutionSequence.length - 1 : -1;
  }

  private calculateSolutionSequence(): Board[] {
    if (!this.isSolvableFlag) return [];
    const sequence: Board[] = [];
    let currentNode: SearchNode | null = null;
    for (
      currentNode = this.solutionSequence[this.solutionSequence.length - 1];
      currentNode !== null;
      currentNode = currentNode.prevNode
    ) {
      sequence.unshift(currentNode.board);
    }
    return sequence;
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
