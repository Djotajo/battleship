import Player from "./player";
import firstMove from "./firstMove";
import Gameboard from "./gameboard";
import gameOver from "./gameOver";
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

  const text = document.querySelector("#text");
  const modalShipButtons = document.createElement("div");
  modalShipButtons.classList.add("modalShipButtons");
  text.insertAdjacentElement("afterbegin", modalShipButtons);

  // Storage
  confirmBtn.disabled = true;

  addNewNote.addEventListener("click", () => {
    // addNote.showModal();
    gameOverDialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    addNote.close();
    noteForm.reset();
  });

  function checkConfirmBtn(board) {
    if (board.ships.length >= 5) {
      confirmBtn.disabled = false;
    }
  }

  confirmBtn.addEventListener("click", () => {
    addNote.close();
    text.remove();
    player1.board.paint();
    player2.board.paintAI();
    let board2 = document.querySelectorAll("#player2 > button");
    board2.forEach((element) =>
      element.addEventListener("click", () => {
        currentTurn(player1, player2);
      })
    );
    addNewNote.disabled = true;
    addNewNote.hidden = true;
    test1.style.display = "none";
    noteForm.reset();
    const player1Name = document.getElementById("playerName");
    player1Name.innerText = `${player1.name}`;
    const player2Name = document.getElementById("aiName");
    player2Name.innerText = `${player2.name}`;
  });

  player1.board = new Gameboard("player1");
  player1.board.boardFill();
  player2.board = new Gameboard("player2");
  player2.board.boardFill();
  let newOriginal = player1.board.paintModal();

  let copyLocation = document.querySelector("#text");
  copyLocation.append(newOriginal);

  // dialog kraj

  player1.board.allShipsSunk();

  player2.board.placeImgShipAI("battleship", 5, "../assets/battleship00");
  player2.board.placeImgShipAI("destroyer", 4, "../assets/destroyer00");
  player2.board.placeImgShipAI("submarine", 3, "../assets/submarine00");
  player2.board.placeImgShipAI("cruiser", 3, "../assets/cruiser00");
  player2.board.placeImgShipAI("gunboat", 2, "../assets/gunboat00");

  // player2.board.paintAI();
  player2.board.allShipsSunk();

  // if (player2.turn === true) {
  //   player1.board.receiveAttack(randomAIAttack());
  //   if (player1.board.allShipsSunk()) {
  //     console.log("You lose");
  //   }
  //   player2.turn = false;
  // }

  const modalLog = document.getElementById("caption");
  const shipDirectionButton = document.getElementById("shipDirectionButton");

  let shipDirection = shipDirectionButton.innerText;

  shipDirectionButton.addEventListener("click", () => {
    changeDirection(shipDirectionButton.innerText);
  });

  function changeDirection(direction) {
    if (direction === "Horizontal") {
      shipDirectionButton.innerText = "Vertical";
      shipDirection = shipDirectionButton.innerText;
    } else {
      shipDirectionButton.innerText = "Horizontal";
      shipDirection = shipDirectionButton.innerText;
    }
  }

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
    let butId = button.id;
    let free = undefined;
    if (shipDirection === "Horizontal") {
      for (let n = 0; n < length; n++) {
        let newButton = document.getElementById(
          `${butId.slice(0, -1)}${Number(butId.slice(-1)) + n}`
        );
        if (newButton.classList.contains("shipped")) {
          free = false;
          return free;
        }
        free = true;
      }
    } else if (shipDirection === "Vertical") {
      for (let n = 0; n < length; n++) {
        let replacedNum = [...butId];
        replacedNum[8] = Number(replacedNum[8]) + n;
        let newButton = document.getElementById(`${replacedNum.join("")}`);
        if (newButton.classList.contains("shipped")) {
          free = false;
          return free;
        }
        free = true;
      }
    }
    return free;
  }

  for (let button of testButtons) {
    let butId = button.id;
    button.addEventListener("mouseover", (e) => {
      if (currentShip === undefined) {
      } else if (
        shipDirection === "Horizontal" &&
        Number(butId.slice(-1)) + currentShip.length <= 10 &&
        checkFree(button, currentShip.length) === true
      ) {
        for (let n = 0; n < currentShip.length; n++) {
          let newButton = document.getElementById(
            `${butId.slice(0, -1)}${Number(butId.slice(-1)) + n}`
          );
          if (newButton.classList.contains("shipped")) {
            newButton.style.backgroundColor = "white";
          } else {
            newButton.style.backgroundColor = "blue";
          }
        }
      } else if (
        shipDirection === "Vertical" &&
        Number([...butId][8]) + currentShip.length <= 10 &&
        checkFree(button, currentShip.length) === true
      ) {
        for (let n = 0; n < currentShip.length; n++) {
          let replacedNum = [...butId];
          replacedNum[8] = Number(replacedNum[8]) + n;
          let newButton = document.getElementById(`${replacedNum.join("")}`);
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
      } else if (
        shipDirection === "Horizontal" &&
        Number(butId.slice(-1)) + currentShip.length <= 10
      ) {
        for (let n = 0; n < currentShip.length; n++) {
          let newButton = document.getElementById(
            `${butId.slice(0, -1)}${Number(butId.slice(-1)) + n}`
          );
          newButton.style.backgroundColor = "rgb(239, 239, 239)";
        }
      } else if (
        shipDirection === "Vertical" &&
        Number([...butId][8]) + currentShip.length <= 10
      ) {
        for (let n = 0; n < currentShip.length; n++) {
          let replacedNum = [...butId];
          replacedNum[8] = Number(replacedNum[8]) + n;
          let newButton = document.getElementById(`${replacedNum.join("")}`);
          newButton.style.backgroundColor = "rgb(239, 239, 239)";
        }
      }
    });
    button.addEventListener("click", (e) => {
      if (currentShip === undefined) {
      } else if (
        currentShip != undefined &&
        shipDirection === "Horizontal" &&
        Number(butId.slice(-1)) + currentShip.length <= 10 &&
        checkFree(button, currentShip.length) === true
      ) {
        addShipToField(button);
        currentShip = undefined;
        checkConfirmBtn(player1.board);
      } else if (
        currentShip != undefined &&
        shipDirection === "Vertical" &&
        Number([...butId][8]) + currentShip.length <= 10 &&
        checkFree(button, currentShip.length) === true
      ) {
        addShipToField(button);
        currentShip = undefined;
        checkConfirmBtn(player1.board);
      }
    });
  }

  function drawShips(fields, length, shipDirection) {
    let butId = fields.id;
    if (shipDirection === "Horizontal") {
      for (let n = 0; n < length; n++) {
        let shipField = document.getElementById(
          `${butId.slice(0, -1)}${Number(butId.slice(-1)) + n}`
        );
        const found = player1.board.board.find(
          (element) => element.name === `${butId[8]}${Number(butId[10]) + n}`
        );
        shipField.classList.add("shipped");
        shipField.style.backgroundImage = `url(${found.img})`;
      }
    } else if (shipDirection === "Vertical") {
      for (let n = 0; n < length; n++) {
        let replacedNum = [...butId];
        replacedNum[8] = Number(replacedNum[8]) + n;
        let shipField = document.getElementById(`${replacedNum.join("")}`);
        const found = player1.board.board.find(
          (element) => element.name === `${Number(butId[8]) + n}${butId[10]}`
        );
        shipField.classList.add("shipped");
        shipField.style.backgroundImage = `url(${found.img.slice(
          0,
          10
        )}rotated${found.img.slice(10)})`;
      }
    }
  }
  // test kopija
  function addShipToField(field) {
    let testCoordinates = field.id
      .slice(8)
      .split(",")
      .map((element) => Number(element));
    player1.board.placeImgShipPlayer(
      currentShip.name,
      currentShip.length,
      currentShip.img,
      testCoordinates,
      shipDirection
    );
    currentButton.disabled = true;
    drawShips(field, currentShip.length, shipDirection);
    modalLog.innerText = "Choose your ship";
    if (player1.board.ships.length >= 5) {
      modalLog.innerText = "Give 'em hell captain";
    }
    return;
  }

  const gameOverDiv = document.createElement("div");
  gameOverDiv.setAttribute("id", "gameOverDiv");
  gameOverDiv.innerHTML = gameOver();
  gameboardsDiv.insertAdjacentElement("afterend", gameOverDiv);

  const gameOverForm = document.querySelector("#gameOverForm");
  function handleForm(event) {
    event.preventDefault();
  }
  // vec definisano handleForm
  gameOverForm.addEventListener("submit", handleForm);

  const gameOverDialog = document.getElementById("gameOverDialog");
  const confirmBtnGameOver = gameOverDialog.querySelector(
    "#confirmBtnGameOver"
  );

  const gameOverContent = document.querySelector("#gameOverContent");

  confirmBtnGameOver.addEventListener("click", () => {
    window.location.reload();
    // gameOverDialog.close();
    // game();
  });
}

// shipButton1.innerHTML = "Battleship";
// shipButton2.innerHTML = "Destroyer";
// shipButton3.innerHTML = "Submarine";
// shipButton4.innerHTML = "Cruiser";
// shipButton5.innerHTML = "Gunboat";
