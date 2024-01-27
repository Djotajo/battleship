export default function isGameOver(board1, board2) {
  if (board1.allShipsSunk() || board2.allShipsSunk()) {
    return true;
  }
}
