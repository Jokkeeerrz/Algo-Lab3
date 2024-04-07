import Board from './board';
import { MinHeap } from 'min-heap-typed';

class SearchNode {
  board: Board;
  moves: number;
  previousSearchNode: SearchNode | null;

  constructor(board: Board, moves: number, previousSearchNode: SearchNode | null = null) {
    this.board = board;
    this.moves = moves;
    this.previousSearchNode = previousSearchNode
  }

  priority(): number {
    return this.moves; //+ board.hamming()
  }
}

const heap = new MinHeap<SearchNode>([], {comparator: (a, b) => a.priority() - b.priority()});