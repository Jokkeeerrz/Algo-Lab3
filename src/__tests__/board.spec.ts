import Board from '../classes/board';

function test() {
  const tiles: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 8]
  ];

  const board = new Board(tiles);

  console.log("Board Representation:");
  console.log(board.toString());

  console.log("Board Dimension:", board.dimension());
  console.log("Hamming Distance:", board.hamming());
  console.log("Manhattan Distance:", board.manhattan());
  console.log("Is Goal Board?", board.isGoal());

  const twinBoard = board.twin();
}