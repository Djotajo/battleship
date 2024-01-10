import "./normalize.css";
import "./styles.css";

import Gameboard from "./gameboard";

export default function index() {
  let tijelo = document.querySelector(".test1");
  tijelo.innerHTML = "rukaj brala";
  let n = new Gameboard();
  n.boardFill();
  tijelo.innerHTML = n.board[1].coordinates;
  //   console.log(n.board[1]);
  n.placeShip("destroyer", 5, [0, 1]);
  //   //   console.log(n.board[1]);
  //   n.receiveAttack([0, 1]);
  //   console.log(n.board[1]);
  //   n.receiveAttack([0, 1]);
  //   console.log(n.board[1]);
  //   n.receiveAttack([0, 1]);
  //   n.receiveAttack([0, 1]);
  //   n.receiveAttack([0, 1]);
  //   console.log(n.board[1].ship);
  //   n.receiveAttack([0, 1]);
  //   console.log(n.board[1].ship);
  //   console.log(n.board[1].ship);
  //   n.receiveAttack([0, 3]);
  //   console.log(n.board[1].ship);
  //   n.receiveAttack([0, 4]);
  //   console.log(n.board[1].ship);
  //   n.receiveAttack([0, 5]);
  //   console.log(n.board[1].ship);
  //   console.log(n.board[2].ship);
  //   console.log(n.board[0]);
  //   console.log(n.board[1]);
  //   console.log(n.board[2]);
  //   console.log(n.board[3]);
  //   console.log(n.board[4]);
  n.paint();
}

index();
