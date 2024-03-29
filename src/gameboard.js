import Square from "./square";
// import Ship from "./ship";
import ShipImg from "./shipWithImage";
// import isGameOver from "./gameOver";
import victory from "./victory";
import defeat from "./defeat";

export default class Gameboard {
  constructor(name) {
    this.name = name;
    this.board = [];
    this.ships = [];
  }

  boardFill() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.board.push(new Square([i, j]));
      }
    }
  }

  // original
  placeImgShipPlayer(name, length, img, field, shipDirection) {
    let ship = new ShipImg(name, length, img);
    if (shipDirection === "Horizontal") {
      for (let a = 0; a < length; a++) {
        let startPosition = this.board.filter(
          (e) =>
            e.coordinates.toString() ==
            `${field[0].toString()},${(field[1] + a).toString()}`
        )[0];
        startPosition.ship = ship;
        startPosition.img = `${ship.img}${a}.png`;
      }
    } else if (shipDirection === "Vertical") {
      for (let a = 0; a < length; a++) {
        let startPosition = this.board.filter(
          (e) =>
            e.coordinates.toString() ==
            `${(field[0] + a).toString()},${field[1].toString()}`
        )[0];
        startPosition.ship = ship;
        startPosition.img = `${ship.img}${a}.png`;
        startPosition.orientation = "vertical";
      }
    }
    this.ships.push(ship);
  }

  placeImgShipAI(name, length, img) {
    let ship = new ShipImg(name, length, img);
    if (Math.random() < 0.5) {
      let field = this.horizontalFieldRandomizer(length);
      for (let a = 0; a < length; a++) {
        let startPosition = this.board.filter(
          (e) =>
            e.coordinates.toString() ==
            `${field[0].toString()},${(field[1] + a).toString()}`
        )[0];
        startPosition.ship = ship;
        startPosition.img = `${ship.img}${a}.png`;
        ship.coordinates.push(startPosition.coordinates);
      }
    } else {
      let field = this.verticalFieldRandomizer(length);
      for (let a = 0; a < length; a++) {
        let startPosition = this.board.filter(
          (e) =>
            e.coordinates.toString() ==
            `${(field[0] + a).toString()},${field[1].toString()}`
        )[0];
        startPosition.ship = ship;
        startPosition.img = `${ship.img}${a}.png`;
        startPosition.orientation = "vertical";
        ship.coordinates.push(startPosition.coordinates);
      }
    }
    this.ships.push(ship);
  }

  horizontalFieldRandomizer(length) {
    let fields = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * (11 - length)),
    ];
    for (let a = 0; a < length; a++) {
      let startPosition = this.board.filter(
        (e) =>
          e.coordinates.toString() ==
          `${fields[0].toString()},${(fields[1] + a).toString()}`
      )[0];
      while (startPosition.ship != null) {
        return this.horizontalFieldRandomizer(length);
      }
    }
    return fields;
  }

  verticalFieldRandomizer(length) {
    let fields = [
      Math.floor(Math.random() * (11 - length)),
      Math.floor(Math.random() * 10),
    ];
    for (let a = 0; a < length; a++) {
      let startPosition = this.board.filter(
        (e) =>
          e.coordinates.toString() ==
          `${(fields[0] + a).toString()},${fields[1].toString()}`
      )[0];
      while (startPosition.ship != null) {
        return this.verticalFieldRandomizer(length);
      }
    }
    return fields;
  }

  receiveAttack(field) {
    const gameboardsDiv = document.getElementById("gameboard");
    const result = this.board.filter(
      (e) => e.coordinates.toString() == field.toString()
    )[0];
    if (result.hit === true) {
      console.log("Can't hit the same field twice");
    } else {
      result.hit = true;
      let resultField = document.getElementById(`${this.name}_${field}`);
      if (result.ship) {
        console.log("Hit!");
        resultField.innerHTML = '<img src="flame.png" class="flameImage">';
        result.ship.hits++;

        result.ship.isSunk();
        if (this.allShipsSunk()) {
          const gameOverDialog = document.getElementById("gameOverDialog");
          if (this.name === "player2") {
            victory();
            gameOverDialog.show();
            gameboardsDiv.style.display = "none";
          } else {
            defeat();
            gameOverDialog.show();
            gameboardsDiv.style.display = "none";
          }
        }
        if (result.ship.isSunk() === undefined) {
          return "sunk";
        }
        return true;
      } else {
        console.log("Miss!");
        resultField.classList.add("miss");
      }
    }
  }

  allShipsSunk() {
    if (this.ships.every((ship) => ship.sunk === true)) {
      return true;
    }
  }

  paint() {
    const gameboardsDiv = document.getElementById("gameboard");
    const playerPanel = document.createElement("div");
    const playerName = document.createElement("h2");
    playerName.setAttribute("id", "playerName");
    const visualBoard = document.createElement("div");
    visualBoard.id = this.name;
    for (let n = 0; n < this.board.length; n++) {
      let visualField = document.createElement("button");
      if (this.board[n].orientation === "vertical") {
        visualField.style.backgroundImage = `url(rotated${this.board[n].img})`;
      } else if (this.board[n].img != null) {
        visualField.style.backgroundImage = `url(${this.board[n].img})`;
      }

      visualField.id = `${this.name}_${this.board[n].coordinates}`;
      visualBoard.appendChild(visualField);
    }
    playerPanel.appendChild(playerName);
    playerPanel.appendChild(visualBoard);
    gameboardsDiv.insertAdjacentElement("afterbegin", playerPanel);
  }

  paintModal() {
    const visualBoard = document.createElement("div");
    visualBoard.id = this.name;

    for (let n = 0; n < this.board.length; n++) {
      let visualField = document.createElement("button");
      visualField.style.backgroundImage = `url(${this.board[n].img})`;
      visualField.id = `${this.name}_${this.board[n].coordinates}`;
      visualBoard.appendChild(visualField);
    }
    return visualBoard;
  }

  paintAI() {
    const gameboardsDiv = document.getElementById("gameboard");
    const aiPanel = document.createElement("div");
    const aiName = document.createElement("h2");
    aiName.setAttribute("id", "aiName");
    const visualBoard = document.createElement("div");
    visualBoard.id = this.name;

    for (let n = 0; n < this.board.length; n++) {
      let visualField = document.createElement("button");
      visualField.id = `${this.name}_${this.board[n].coordinates}`;
      visualField.addEventListener("click", (e) => {
        this.receiveAttack([this.board[n].coordinates]);
        visualField.disabled = true;
        if (this.board[n].ship && this.board[n].ship.sunk === true) {
          this.board[n].ship.coordinates.forEach((element) => {
            let shipDown = document.getElementById(`player2_${element}`);
            let numbers = `${element[0]}${element[1]}`;
            if (this.board[n].orientation === "vertical") {
              shipDown.style.backgroundImage = `url(rotated${
                this.board[Number(numbers)].img
              })`;
            } else {
              shipDown.style.backgroundImage = `url(${
                this.board[Number(numbers)].img
              })`;
            }
          });
        }
      });
      visualBoard.appendChild(visualField);
    }
    aiPanel.appendChild(aiName);
    aiPanel.appendChild(visualBoard);
    gameboardsDiv.append(aiPanel);
  }
}
