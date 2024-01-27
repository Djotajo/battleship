import Player from "./player";
import firstMove from "./firstMove";
import Gameboard from "./gameboard";
import isGameOver from "./isGameOver";
import randomAIAttack from "./randomAIAttack";
import currentTurn from "./currentTurn";

export default function game() {
  //   let player1 = new Player(prompt("Enter your name"));
  let player1 = new Player("Djordje");
  let player2 = new Player("AI");
  // firstMove(player1, player2);
  player1.board = new Gameboard("player1");
  player1.board.boardFill();
  player2.board = new Gameboard("player2");
  player2.board.boardFill();
  player1.board.placeShip("destroyer", 5, [0, 1]);
  player1.board.placeShip("carrier", 4, [2, 2]);
  player1.board.placeShip("submarine", 3, [3, 3]);
  player1.board.placeShip("frigate", 2, [7, 5]);
  player1.board.placeShip("fishing boat", 1, [9, 6]);
  player1.board.paint();
  player1.board.allShipsSunk();

  player2.board.placeShipAI("destroyer", 5);
  player2.board.placeShipAI("carrier", 4);
  player2.board.placeShipAI("submarine", 3);
  player2.board.placeShipAI("frigate", 2);
  player2.board.placeShipAI("fishing boat", 1);
  player2.board.paint();
  player2.board.allShipsSunk();

  console.log(player1);
  console.log(player2);

  player1.board.receiveAttack([0, 1]);
  player1.board.receiveAttack([1, 1]);
  console.log(randomAIAttack());
  player1.board.receiveAttack(randomAIAttack());
  player2.turn = false;

  if (player2.turn === true) {
    player1.board.receiveAttack(randomAIAttack());
    player2.turn = false;
  }
  // console.log(isGameOver());

  let turn2 = document.createElement("button");
  turn2.addEventListener("click", (e) => {
    player2.turn = true;
    console.log(player2);
  });
  let test1 = document.querySelector(".test1");
  test1.appendChild(turn2);

  let turn3 = document.createElement("button");
  turn3.addEventListener("click", (e) => {
    currentTurn(player1, player2);
  });
  test1.appendChild(turn3);

  let board2 = document.querySelectorAll("#player2 > button");

  board2.forEach((element) =>
    element.addEventListener("click", () => {
      console.log("kru te jebo");
      currentTurn(player1, player2);
    })
  );
}
