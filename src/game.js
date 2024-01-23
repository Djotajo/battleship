import Player from "./player";
import firstMove from "./firstMove";
import Gameboard from "./gameboard";

export default function game() {
  //   let player1 = new Player(prompt("Enter your name"));
  let player1 = new Player("Djordje");
  let player2 = new Player("AI");
  firstMove(player1, player2);
  player1.board = new Gameboard();
  player1.board.boardFill();
  player2.board = new Gameboard();
  player2.board.boardFill();
  player1.board.placeShip("destroyer", 5, [0, 1]);
  player1.board.placeShip("carrier", 4, [2, 2]);
  player1.board.placeShip("submarine", 3, [3, 3]);
  player1.board.placeShip("frigate", 2, [7, 5]);
  player1.board.placeShip("fishing boat", 1, [9, 6]);
  player1.board.paint();
  player1.board.allShipsSunk();

  player2.board.placeShip("destroyer", 5, [0, 1]);
  player2.board.placeShip("carrier", 4, [2, 2]);
  player2.board.placeShip("submarine", 3, [3, 3]);
  player2.board.placeShip("frigate", 2, [7, 5]);
  player2.board.placeShip("fishing boat", 1, [9, 6]);
  player2.board.paint();
  player2.board.allShipsSunk();

  console.log(player1);
  console.log(player2);
}
