import randomAIAttack from "./randomAIAttack";

export default function currentTurn(player1, player2) {
  if (!player1.board.allShipsSunk() && !player2.board.allShipsSunk()) {
    setTimeout(() => {
      player1.board.receiveAttack(randomAIAttack());
    }, 1000);
  }
}
