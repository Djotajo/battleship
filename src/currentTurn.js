import Player from "./player";
import randomAIAttack from "./randomAIAttack";

export default function currentTurn(player1, player2) {
  //   if (player1.turn === true) {
  //   }
  //   if (player2.turn === true) {
  player1.board.receiveAttack(randomAIAttack());
  //     player2.turn = false;
  //     player1.turn = true;
  //   }
}
