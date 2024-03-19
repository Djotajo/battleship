import Player from "./player";
import firstMove from "./firstMove";
import Gameboard from "./gameboard";
import gameOver from "./gameOver";
import currentTurn from "./currentTurn";
import placeShipsModal from "./placeShipsModal";
import footer from "./footer";
import gitLogo from "../assets/github-mark-white.png";

export default function game() {
  let player1 = new Player("Player");
  let player2 = new Player("Computer");
  // firstMove(player1, player2);

  const gameboardsDiv = document.getElementById("gameboard");
  const inputSection = document.querySelector(".input-section");

  // Dialog start
  const placeShipsButton = document.createElement("button");
  placeShipsButton.innerHTML = "Place your ships";
  inputSection.appendChild(placeShipsButton);

  const placeShipsDiv = document.createElement("div");
  placeShipsDiv.innerHTML = placeShipsModal();
  inputSection.appendChild(placeShipsDiv);

  const placeShipsForm = document.querySelector("#noteForm");
  function handleForm(event) {
    event.preventDefault();
  }
  placeShipsForm.addEventListener("submit", handleForm);

  const addNote = document.getElementById("addNote");
  const confirmBtn = addNote.querySelector("#confirmBtn");
  const closeBtn = addNote.querySelector("#closeBtn");

  const text = document.querySelector("#text");
  const modalShipButtons = document.createElement("div");
  modalShipButtons.classList.add("modalShipButtons");
  text.insertAdjacentElement("afterbegin", modalShipButtons);

  // Storage
  confirmBtn.disabled = true;

  placeShipsButton.addEventListener("click", () => {
    addNote.showModal();
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
    placeShipsButton.disabled = true;
    placeShipsButton.hidden = true;
    inputSection.style.display = "none";
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

  text.append(newOriginal);

  // dialog kraj

  player1.board.allShipsSunk();

  player2.board.placeImgShipAI("battleship", 5, "battleship00");
  player2.board.placeImgShipAI("destroyer", 4, "destroyer00");
  player2.board.placeImgShipAI("submarine", 3, "submarine00");
  player2.board.placeImgShipAI("cruiser", 3, "cruiser00");
  player2.board.placeImgShipAI("gunboat", 2, "gunboat00");

  player2.board.allShipsSunk();

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

  function changeCaption(ship) {
    modalLog.innerText = `Place your ${ship}!`;
  }

  shipButton1.addEventListener("click", function () {
    currentShip = {
      name: "Battleship",
      length: 5,
      img: "battleship00",
    };
    currentButton = shipButton1;
    changeCaption(currentShip.name);
  });
  modalShipButtons.appendChild(shipButton1);

  shipButton2.addEventListener("click", function () {
    currentShip = {
      name: "Destroyer",
      length: 4,
      img: "destroyer00",
    };
    currentButton = shipButton2;
    changeCaption(currentShip.name);
  });
  modalShipButtons.appendChild(shipButton2);

  shipButton3.addEventListener("click", function () {
    currentShip = {
      name: "Submarine",
      length: 3,
      img: "submarine00",
    };
    currentButton = shipButton3;
    changeCaption(currentShip.name);
  });
  modalShipButtons.appendChild(shipButton3);

  shipButton4.addEventListener("click", function () {
    currentShip = { name: "Cruiser", length: 3, img: "cruiser00" };
    currentButton = shipButton4;
    changeCaption(currentShip.name);
  });
  modalShipButtons.appendChild(shipButton4);

  shipButton5.addEventListener("click", function () {
    currentShip = { name: "Gunboat", length: 2, img: "gunboat00" };
    currentButton = shipButton5;
    changeCaption(currentShip.name);
  });
  modalShipButtons.appendChild(shipButton5);

  shipButton1.style.backgroundImage = `url("05-Battleship.png")`;
  shipButton2.style.backgroundImage = `url("04-Destroyer.png")`;
  shipButton3.style.backgroundImage = `url("03-Submarine.png")`;
  shipButton4.style.backgroundImage = `url("03-Cruiser.png")`;
  shipButton5.style.backgroundImage = `url("02-Gunboat.png")`;

  let testButtons = document.querySelectorAll("#player1 > button");

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
        shipField.style.backgroundImage = `url(rotated${found.img})`;
      }
    }
  }

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

  const body = document.querySelector("body");
  body.appendChild(footer());

  document.getElementById("githubLogo").src = gitLogo;
}
