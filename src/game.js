import Player from "./player";
import firstMove from "./firstMove";
import Gameboard from "./gameboard";
import isGameOver from "./isGameOver";
import randomAIAttack from "./randomAIAttack";
import currentTurn from "./currentTurn";
import newNoteForm from "./dialog";

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

  // let turn3 = newNoteForm();
  // // turn3.addEventListener("click", (e) => {
  // //   currentTurn(player1, player2);
  // // });
  // test1.appendChild(turn3);

  // dialog pocetak
  const addNewNote = document.createElement("button");
  addNewNote.innerHTML = "Add new note";
  test1.appendChild(addNewNote);

  const newNoteFormDiv = document.createElement("div");
  newNoteFormDiv.innerHTML = newNoteForm(player1.board.paint);
  test1.appendChild(newNoteFormDiv);

  const addNote = document.getElementById("addNote");
  const confirmBtn = addNote.querySelector("#confirmBtn");
  const closeBtn = document.querySelector("#closeBtn");

  // const title = document.querySelector("#title");
  const text = document.querySelector("#text");

  // Storage

  addNewNote.addEventListener("click", () => {
    addNote.showModal();
  });

  closeBtn.addEventListener("click", () => {
    addNote.close();
    noteForm.reset();
  });

  let original = document.querySelector("#player1");
  let copy = original.cloneNode(true);

  let copyLocation = document.querySelector("#text");
  copyLocation.append(copy);

  // dialog kraj

  let board2 = document.querySelectorAll("#player2 > button");

  board2.forEach((element) =>
    element.addEventListener("click", () => {
      console.log("kru te jebo");
      currentTurn(player1, player2);
    })
  );

  // board2.forEach((element) =>
  //   element.addEventListener("click", function () {
  //     setTimeout(function () {
  //       console.log("kru te jebo");
  //       // currentTurn(player1, player2);
  //     }, 5000);
  //   })
  // );
}
