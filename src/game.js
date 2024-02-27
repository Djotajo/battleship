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

  const gameboardsDiv = document.getElementById("gameboard");

  let test1 = document.querySelector(".test1");
  // dialog pocetak
  const addNewNote = document.createElement("button");
  addNewNote.innerHTML = "Place your ships";
  test1.appendChild(addNewNote);

  const newNoteFormDiv = document.createElement("div");
  newNoteFormDiv.innerHTML = newNoteForm();
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
  const modalShipButtons = document.createElement("div");
  modalShipButtons.classList.add("modalShipButtons");
  text.insertAdjacentElement("afterbegin", modalShipButtons);

  // Storage

  addNewNote.addEventListener("click", () => {
    addNote.showModal();
  });

  closeBtn.addEventListener("click", () => {
    addNote.close();
    // privremeno rjesenje za dvije tabele
    text.remove();
    // copy.removeAttribute("id");
    player1.board.paint();
    player2.board.paintAI();
    let board2 = document.querySelectorAll("#player2 > button");
    board2.forEach((element) =>
      element.addEventListener("click", () => {
        currentTurn(player1, player2);
      })
    );
    addNewNote.disabled = true;
    noteForm.reset();
  });

  player1.board = new Gameboard("player1");
  player1.board.boardFill();
  player2.board = new Gameboard("player2");
  player2.board.boardFill();
  // player2.board.paintAI();
  let newOriginal = player1.board.paintModal();

  let copyLocation = document.querySelector("#text");
  // copyLocation.append(copy);
  copyLocation.append(newOriginal);

  // dialog kraj

  // player1.board = new Gameboard("player1");
  // player1.board.boardFill();
  // player2.board = new Gameboard("player2");
  // player2.board.boardFill();
  // player1.board.paint();

  player1.board.allShipsSunk();

  player2.board.placeImgShipAI("battleship", 5, "../assets/battleship00");
  player2.board.placeImgShipAI("destroyer", 4, "../assets/destroyer00");
  player2.board.placeImgShipAI("submarine", 3, "../assets/submarine00");
  player2.board.placeImgShipAI("cruiser", 3, "../assets/cruiser00");
  player2.board.placeImgShipAI("gunboat", 2, "../assets/gunboat00");

  // player2.board.paintAI();
  player2.board.allShipsSunk();

  if (player2.turn === true) {
    player1.board.receiveAttack(randomAIAttack());
    console.log("rukaj");
    player2.turn = false;
  }
  // console.log(isGameOver());

  // let turn2 = document.createElement("button");
  // turn2.addEventListener("click", (e) => {
  //   player2.turn = true;
  //   console.log(player2);
  // });

  // test1.appendChild(turn2);

  // let turn3 = newNoteForm();
  // // turn3.addEventListener("click", (e) => {
  // //   currentTurn(player1, player2);
  // // });
  // test1.appendChild(turn3);

  // dialog pocetak

  // dialog kraj

  const modalLog = document.getElementById("caption");

  let board2 = document.querySelectorAll("#player2 > button");

  board2.forEach((element) =>
    element.addEventListener("click", () => {
      currentTurn(player1, player2);
    })
  );

  const shipButton1 = document.createElement("button");
  const shipButton2 = document.createElement("button");
  const shipButton3 = document.createElement("button");
  const shipButton4 = document.createElement("button");
  const shipButton5 = document.createElement("button");

  let currentShip;
  let currentButton;

  function changeCaption(ship, length) {
    modalLog.innerText = `Place your ${ship}! It has a size of ${length}`;
  }

  shipButton1.addEventListener("click", function () {
    currentShip = {
      name: "Battleship",
      length: 5,
      img: "../assets/battleship00",
    };
    currentButton = shipButton1;
    changeCaption(currentShip.name, currentShip.length);
  });
  modalShipButtons.appendChild(shipButton1);

  shipButton2.addEventListener("click", function () {
    currentShip = {
      name: "Destroyer",
      length: 4,
      img: "../assets/destroyer00",
    };
    currentButton = shipButton2;
    changeCaption(currentShip.name, currentShip.length);
  });
  modalShipButtons.appendChild(shipButton2);

  shipButton3.addEventListener("click", function () {
    currentShip = {
      name: "Submarine",
      length: 3,
      img: "../assets/submarine00",
    };
    currentButton = shipButton3;
    changeCaption(currentShip.name, currentShip.length);
  });
  modalShipButtons.appendChild(shipButton3);

  shipButton4.addEventListener("click", function () {
    currentShip = { name: "Cruiser", length: 3, img: "../assets/cruiser00" };
    currentButton = shipButton4;
    changeCaption(currentShip.name, currentShip.length);
  });
  modalShipButtons.appendChild(shipButton4);

  shipButton5.addEventListener("click", function () {
    currentShip = { name: "Gunboat", length: 2, img: "../assets/gunboat00" };
    currentButton = shipButton5;
    changeCaption(currentShip.name, currentShip.length);
  });
  modalShipButtons.appendChild(shipButton5);

  shipButton1.style.backgroundImage = `url("../assets/Full ships/05 - Battleship.png")`;
  shipButton2.style.backgroundImage = `url("../assets/Full ships/04 - Destroyer.png")`;
  shipButton3.style.backgroundImage = `url("../assets/Full ships/03 - Submarine.png")`;
  shipButton4.style.backgroundImage = `url("../assets/Full ships/03 - Cruiser.png")`;
  shipButton5.style.backgroundImage = `url("../assets/Full ships/02 - Gunboat.png")`;

  let testButtons = document.querySelectorAll("#player1 > button");

  // text.appendChild(modalShipButtons);

  function checkFree(button, length) {
    let defCoords = button.innerHTML;
    let free = undefined;
    for (let n = 0; n < length; n++) {
      let newButton = document.getElementById(
        `player1_${defCoords[0]}${defCoords[1]}${Number(defCoords[2]) + n}`
      );
      if (newButton.classList.contains("shipped")) {
        free = false;
        return free;
      }
      free = true;
    }
    return free;
  }

  for (let button of testButtons) {
    let defCoords = button.innerHTML;
    button.addEventListener("mouseover", (e) => {
      if (currentShip === undefined) {
      } else if (
        Number(defCoords[2]) + currentShip.length <= 10 &&
        checkFree(button, currentShip.length) === true
      ) {
        for (let n = 0; n < currentShip.length; n++) {
          let newButton = document.getElementById(
            `player1_${defCoords[0]}${defCoords[1]}${Number(defCoords[2]) + n}`
          );
          if (newButton.classList.contains("shipped")) {
            newButton.style.backgroundColor = "white";
          } else {
            newButton.style.backgroundColor = "blue";
          }
        }
      }
    });
    button.addEventListener("mouseout", (e) => {
      if (currentShip === undefined) {
      } else if (Number(defCoords[2]) + currentShip.length <= 10) {
        for (let n = 0; n < currentShip.length; n++) {
          let newButton = document.getElementById(
            `player1_${defCoords[0]}${defCoords[1]}${Number(defCoords[2]) + n}`
          );
          newButton.style.backgroundColor = "white";
        }
      }
    });
    button.addEventListener("click", (e) => {
      if (currentShip === undefined) {
      } else if (
        currentShip != undefined &&
        Number(defCoords[2]) + currentShip.length <= 10 &&
        checkFree(button, currentShip.length) === true
      ) {
        let newButton = document.getElementById(
          `player1_${defCoords[0]}${defCoords[1]}${Number(defCoords[2])}`
        );
        addShipToField(newButton);
        currentShip = undefined;
      }
    });
  }

  function drawShips(fields, length) {
    let defCoords = fields.innerHTML;
    for (let n = 0; n < length; n++) {
      let shipField = document.getElementById(
        `player1_${defCoords[0]}${defCoords[1]}${Number(defCoords[2]) + n}`
      );

      const found = player1.board.board.find(
        (element) =>
          element.name === `${defCoords[0]}${Number(defCoords[2]) + n}`
      );
      shipField.classList.add("shipped");
      shipField.style.backgroundImage = `url(${found.img})`;
      // ideja
      // shipField.disabled = true;
      console.log(found);
    }
  }
  // test kopija
  function addShipToField(field) {
    let testCoordinates = field.innerHTML
      .split(",")
      .map((element) => Number(element));
    player1.board.placeImgShipPlayer(
      currentShip.name,
      currentShip.length,
      currentShip.img,
      testCoordinates
    );
    console.log(field);
    currentButton.disabled = true;
    // currentShip = undefined;
    console.log(currentButton);
    console.log(player1.board);
    drawShips(field, currentShip.length);
    modalLog.innerText = "Choose your ship";
    return;
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
        console.log(`${currentShip.img}${imgField}.png`);
        console.log(field);
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

// shipButton1.innerHTML = "Battleship";
// shipButton2.innerHTML = "Destroyer";
// shipButton3.innerHTML = "Submarine";
// shipButton4.innerHTML = "Cruiser";
// shipButton5.innerHTML = "Gunboat";

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

//
// for (let button of testButtons) {
//   let defCoords = button.innerHTML;
//   if (currentShip === undefined) {
//     return;
//   } else if (Number(defCoords[2]) + currentShip.length <= 10) {
//     button.addEventListener("mouseover", (e) => {
//       for (let n = 0; n < currentShip.length; n++) {
//         let newButton = document.getElementById(
//           `player1_${defCoords[0]}${defCoords[1]}${
//             Number(defCoords[2]) + n
//           }`
//         );
//         newButton.style.backgroundColor = "blue";
//       }
//     });
//     button.addEventListener("mouseout", (e) => {
//       for (let n = 0; n < currentShip.length; n++) {
//         let newButton = document.getElementById(
//           `player1_${defCoords[0]}${defCoords[1]}${
//             Number(defCoords[2]) + n
//           }`
//         );
//         newButton.style.backgroundColor = "white";
//       }
//     });
//     button.addEventListener("click", (e) => {
//       for (let n = 0; n < currentShip.length; n++) {
//         let newButton = document.getElementById(
//           `player1_${defCoords[0]}${defCoords[1]}${
//             Number(defCoords[2]) + n
//           }`
//         );

//         addShipToField(newButton, n);
//         return;
//       }

//       return;
//     });
//   }
// }

//
//
// for (let button of testButtons) {
//   let defCoords = button.innerHTML;
//   button.addEventListener("mouseover", (e) => {
//     if (currentShip === undefined) {
//     } else if (Number(defCoords[2]) + currentShip.length <= 10) {
//       for (let n = 0; n < currentShip.length; n++) {
//         let newButton = document.getElementById(
//           `player1_${defCoords[0]}${defCoords[1]}${
//             Number(defCoords[2]) + n
//           }`
//         );
//         newButton.style.backgroundColor = "blue";
//       }
//     }
//   });
//   button.addEventListener("mouseout", (e) => {
//     if (currentShip === undefined) {
//     } else if (Number(defCoords[2]) + currentShip.length <= 10) {
//       for (let n = 0; n < currentShip.length; n++) {
//         let newButton = document.getElementById(
//           `player1_${defCoords[0]}${defCoords[1]}${
//             Number(defCoords[2]) + n
//           }`
//         );
//         newButton.style.backgroundColor = "white";
//       }
//     }
//   });
//   button.addEventListener("click", (e) => {
//     if (currentShip === undefined) {
//     } else if (Number(defCoords[2]) + currentShip.length <= 10) {
//       for (let n = 0; n < currentShip.length; n++) {
//         console.log("moze li se doci ovdje");
//         let newButton = document.getElementById(
//           `player1_${defCoords[0]}${defCoords[1]}${
//             Number(defCoords[2]) + n
//           }`
//         );
//         addShipToField(newButton, n);
//       }
//     }
//   });
// }
