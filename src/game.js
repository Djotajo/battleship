import Player from "./player";
import firstMove from "./firstMove";

export default function game() {
  //   let player1 = new Player(prompt("Enter your name"));
  let player1 = new Player("Djordje");
  let player2 = new Player("AI");
  firstMove(player1, player2);
  console.log(player1);
  console.log(player2);
}
