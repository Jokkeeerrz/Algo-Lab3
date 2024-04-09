import Board from "./board";

class SearchNode {
  board: Board;
  prevNode: SearchNode | null;

  constructor(board: Board, prevNode: SearchNode | null = null) {
    this.board = board;
    this.prevNode = prevNode;
  }
}

export default SearchNode;
