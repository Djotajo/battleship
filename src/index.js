import "./normalize.css";
import "./styles.css";

import Gameboard from "./gameboard";
import game from "./game";

export default function index() {
  let tijelo = document.querySelector(".test1");
  tijelo.innerHTML = "rukaj brala";
  let n = new Gameboard();
  n.boardFill();
  tijelo.innerHTML = n.board[1].coordinates;
  //   console.log(n.board[1]);
  n.placeShip("destroyer", 5, [0, 1]);
  n.placeShip("carrier", 4, [2, 2]);
  n.placeShip("submarine", 3, [3, 3]);
  n.placeShip("frigate", 2, [7, 5]);
  n.placeShip("fishing boat", 1, [9, 6]);
  n.paint();

  n.allShipsSunk();
  game();
}

index();
