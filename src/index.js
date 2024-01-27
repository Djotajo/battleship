import "./normalize.css";
import "./styles.css";

import Gameboard from "./gameboard";
import game from "./game";

export default function index() {
  let tijelo = document.querySelector(".test1");
  game();
}

index();
