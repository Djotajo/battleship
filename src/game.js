import Player from "./player";
import firstMove from "./firstMove";
import Gameboard from "./gameboard";
import isGameOver from "./isGameOver";
import randomAIAttack from "./randomAIAttack";
import currentTurn from "./currentTurn";
import newNoteForm from "./newNoteForm";

export default function game() {
  //   let player1 = new Player(prompt("Enter your name"));
  let player1 = new Player("Djordje");
  let player2 = new Player("AI");
  // firstMove(player1, player2);
  player1.board = new Gameboard("player1");
  player1.board.boardFill();
  player2.board = new Gameboard("player2");
  player2.board.boardFill();
  // player1.board.placeShip("destroyer", 5, [0, 1]);
  player1.board.placeImgShipPlayer(
    "battleship",
    5,
    "../assets/battleship00",
    [0, 1]
  );

  player1.board.placeImgShipPlayer(
    "destroyer",
    4,
    "../assets/destroyer00",
    [2, 2]
  );

  // player1.board.placeShip("carrier", 4, [2, 2]);
  player1.board.placeShip("submarine", 3, [3, 3]);
  player1.board.placeShip("frigate", 2, [7, 5]);
  player1.board.placeShip("fishing boat", 1, [9, 6]);
  player1.board.paint();
  player1.board.allShipsSunk();

  player2.board.placeImgShipAI("battleship", 5, "../assets/battleship00");
  player2.board.placeImgShipAI("destroyer", 4, "../assets/destroyer00");
  player2.board.placeImgShipAI("submarine", 3, "../assets/submarine00");
  player2.board.placeImgShipAI("cruiser", 3, "../assets/cruiser00");
  player2.board.placeImgShipAI("gunboat", 2, "../assets/gunboat00");

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
  addNewNote.innerHTML = "Place your ships";
  test1.appendChild(addNewNote);

  const newNoteFormDiv = document.createElement("div");
  newNoteFormDiv.innerHTML = newNoteForm(player1.board.paint);
  test1.appendChild(newNoteFormDiv);

  const forma = document.querySelector("#noteForm");
  function handleForm(event) {
    event.preventDefault();
  }
  forma.addEventListener("submit", handleForm);

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
      currentTurn(player1, player2);
    })
  );

  // ships buttons

  // player1.board.placeShip("destroyer", 5, [0, 1]);
  // player1.board.placeShip("carrier", 4, [2, 2]);
  // player1.board.placeShip("submarine", 3, [3, 3]);
  // player1.board.placeShip("frigate", 2, [7, 5]);
  // player1.board.placeShip("fishing boat", 1, [9, 6]);

  const shipButton1 = document.createElement("button");
  const shipButton2 = document.createElement("button");
  const shipButton3 = document.createElement("button");
  const shipButton4 = document.createElement("button");
  const shipButton5 = document.createElement("button");

  let currentShip;
  let currentButton;

  shipButton1.innerHTML = "Battleship";
  shipButton1.addEventListener("click", function () {
    currentShip = {
      name: "battleship",
      length: 5,
      img: "../assets/battleship00",
    };
    currentButton = shipButton1;
    console.log(currentShip);

    for (let button of testButtons) {
      let defCoords = button.innerHTML;
      if (currentShip === undefined) {
        return;
      } else if (Number(defCoords[2]) + currentShip.length <= 10) {
        button.addEventListener("mouseover", (e) => {
          for (let n = 0; n < currentShip.length; n++) {
            let newButton = document.getElementById(
              `player1_${defCoords[0]}${defCoords[1]}${
                Number(defCoords[2]) + n
              }`
            );
            newButton.style.backgroundColor = "blue";
          }
        });
        button.addEventListener("mouseout", (e) => {
          for (let n = 0; n < currentShip.length; n++) {
            let newButton = document.getElementById(
              `player1_${defCoords[0]}${defCoords[1]}${
                Number(defCoords[2]) + n
              }`
            );
            newButton.style.backgroundColor = "white";
          }
        });
        button.addEventListener("click", (e) => {
          for (let n = 0; n < currentShip.length; n++) {
            let newButton = document.getElementById(
              `player1_${defCoords[0]}${defCoords[1]}${
                Number(defCoords[2]) + n
              }`
            );
            addShipToField(newButton);
            return;
          }
          return;
        });
      }
    }
  });
  test1.appendChild(shipButton1);

  shipButton2.innerHTML = "Destroyer";
  shipButton2.addEventListener("click", function () {
    currentShip = {
      name: "destroyer",
      length: 4,
      img: "../assets/destroyer00",
    };
    currentButton = shipButton2;
    console.log(currentShip);

    for (let button of testButtons) {
      let defCoords = button.innerHTML;
      if (currentShip === undefined) {
        return;
      } else if (Number(defCoords[2]) + currentShip.length <= 10) {
        button.addEventListener("mouseover", (e) => {
          for (let n = 0; n < currentShip.length; n++) {
            let newButton = document.getElementById(
              `player1_${defCoords[0]}${defCoords[1]}${
                Number(defCoords[2]) + n
              }`
            );
            newButton.style.backgroundColor = "blue";
          }
        });
        button.addEventListener("mouseout", (e) => {
          for (let n = 0; n < currentShip.length; n++) {
            let newButton = document.getElementById(
              `player1_${defCoords[0]}${defCoords[1]}${
                Number(defCoords[2]) + n
              }`
            );
            newButton.style.backgroundColor = "white";
          }
        });
        button.addEventListener("click", (e) => {
          for (let n = 0; n < currentShip.length; n++) {
            let newButton = document.getElementById(
              `player1_${defCoords[0]}${defCoords[1]}${
                Number(defCoords[2]) + n
              }`
            );
            addShipToField(newButton);
            return;
          }
          return;
        });
      }
    }
  });
  test1.appendChild(shipButton2);

  shipButton3.innerHTML = "Submarine";
  shipButton3.addEventListener("click", function () {
    currentShip = {
      name: "submarine",
      length: 3,
      img: "../assets/submarine00",
    };
    currentButton = shipButton3;
    console.log(currentShip);
  });
  test1.appendChild(shipButton3);

  shipButton4.innerHTML = "Cruiser";
  shipButton4.addEventListener("click", function () {
    currentShip = { name: "cruiser", length: 3, img: "../assets/cruiser00" };
    currentButton = shipButton4;
    console.log(currentShip);
  });
  test1.appendChild(shipButton4);

  shipButton5.innerHTML = "Gunboat";
  shipButton5.addEventListener("click", function () {
    currentShip = { name: "gunboat", length: 2, img: "../assets/gunboat00" };
    currentButton = shipButton5;
    console.log(currentShip);
  });
  test1.appendChild(shipButton5);

  let testButtons = document.querySelectorAll("#player1 > button");
  testButtons.forEach((item) => addShipToField(item));

  // for (let button of testButtons) {
  //   button.addEventListener("mouseover", (e) => {
  //     button.style.backgroundColor = "blue";
  //   });
  //   button.addEventListener("mouseout", (e) => {
  //     button.style.backgroundColor = "green";
  //   });
  // }
  // let testButton = document.getElementById("player1_6,7");

  // original
  // function addShipToField(field) {
  //   let testCoordinates = field.innerHTML
  //     .split(",")
  //     .map((element) => Number(element));
  //   field.addEventListener("click", function () {
  //     if (currentShip === undefined) {
  //       console.log("no ship selected");
  //     } else if (testCoordinates[1] + currentShip.length > 9) {
  //       console.log("ship too large");
  //     } else {
  //       player1.board.placeShip(
  //         currentShip.name,
  //         currentShip.length,
  //         testCoordinates
  //       );
  //       currentButton.disabled = true;
  //       currentShip = undefined;
  //       console.log(currentButton);
  //       console.log(player1.board);
  //     }
  //   });
  //   field.addEventListener("mouseenter", (e) => {
  //     field.style.setProperty("--field-background-color", "#00ff00");
  //   });
  // }

  // test kopija
  function addShipToField(field) {
    let testCoordinates = field.innerHTML
      .split(",")
      .map((element) => Number(element));
    field.addEventListener("click", function () {
      if (currentShip === undefined) {
        console.log("no ship selected");
      } else if (testCoordinates[1] + currentShip.length > 10) {
        console.log("ship too large");
      } else {
        player1.board.placeImgShipPlayer(
          currentShip.name,
          currentShip.length,
          currentShip.img,
          testCoordinates
        );
        currentButton.disabled = true;
        currentShip = undefined;
        console.log(currentButton);
        console.log(player1.board);
        return;
      }
    });
    // field.addEventListener("mouseenter", (e) => {
    //   field.style.setProperty("--field-background-color", "#00ff00");
    // });
    return currentShip;
  }
}

// original ship place manual function
// shipButton2.innerHTML = "Destroyer";
// shipButton2.addEventListener("click", function () {
//   currentShip = {
//     name: "destroyer",
//     length: 4,
//     img: "../assets/destroyer00",
//   };
//   currentButton = shipButton2;
//   console.log(currentShip);

//   for (let button of testButtons) {
//     let defCoords = button.innerHTML;
//     if (Number(defCoords[2]) + currentShip.length > 10) {
//       button.addEventListener("mouseover", (e) => {
//         button.style.backgroundColor = "red";
//       });
//       button.addEventListener("mouseout", (e) => {
//         button.style.backgroundColor = "white";
//       });
//     } else {
//       button.addEventListener("mouseover", (e) => {
//         for (let n = 0; n < currentShip.length; n++) {
//           let newButton = document.getElementById(
//             `player1_${defCoords[0]}${defCoords[1]}${
//               Number(defCoords[2]) + n
//             }`
//           );
//           newButton.style.backgroundColor = "blue";
//         }
//         // button.style.backgroundColor = "blue";
//       });
//       button.addEventListener("mouseout", (e) => {
//         for (let n = 0; n < currentShip.length; n++) {
//           let newButton = document.getElementById(
//             `player1_${defCoords[0]}${defCoords[1]}${
//               Number(defCoords[2]) + n
//             }`
//           );
//           newButton.style.backgroundColor = "white";
//         }
//       });
//       button.addEventListener("click", (e) => {
//         for (let n = 0; n < currentShip.length; n++) {
//           let newButton = document.getElementById(
//             `player1_${defCoords[0]}${defCoords[1]}${
//               Number(defCoords[2]) + n
//             }`
//           );
//           newButton.style.backgroundColor = "red";
//           addShipToField(newButton);

//           return;
//         }
//         // button.style.backgroundColor = "blue";
//       });
//     }
//   }
// });
