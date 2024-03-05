import Square from "./square";
import Ship from "./ship";
import ShipImg from "./shipWithImage";
import isGameOver from "./gameOver";

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

  placeShip(name, length, field) {
    let ship = new Ship(name, length);
    let fieldsArray = [];
    for (let a = 0; a < length; a++) {
      let startPosition = this.board.filter(
        (e) =>
          e.coordinates.toString() ==
          `${field[0].toString()},${(field[1] + a).toString()}`
      )[0];
      startPosition.ship = ship;
    }
    this.ships.push(ship);
  }

  placeShipPlayer(name, length, field) {
    let ship = new Ship(name, length);
    for (let a = 0; a < length; a++) {
      let startPosition = this.board.filter(
        (e) =>
          e.coordinates.toString() ==
          `${field[0].toString()},${(field[1] + a).toString()}`
      )[0];
      startPosition.ship = ship;
    }
    this.ships.push(ship);
  }

  // placeImgShipPlayer(name, length, img, field) {
  //   let ship = new ShipImg(name, length, img);
  //   for (let a = 0; a < length; a++) {
  //     let startPosition = this.board.filter(
  //       (e) =>
  //         e.coordinates.toString() ==
  //         `${field[0].toString()},${(field[1] + a).toString()}`
  //     )[0];
  //     if (startPosition.ship != undefined) {
  //       alert("Can't place this ship here capt'n");
  //       return null;
  //     }
  //   }
  //   for (let a = 0; a < length; a++) {
  //     let startPosition = this.board.filter(
  //       (e) =>
  //         e.coordinates.toString() ==
  //         `${field[0].toString()},${(field[1] + a).toString()}`
  //     )[0];
  //     startPosition.ship = ship;
  //     startPosition.img = `${ship.img}${a}.png`;
  //     console.log(startPosition);
  //   }
  //   this.ships.push(ship);
  // }

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
        console.log(startPosition);
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
        console.log(startPosition);
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
      }
    }
    this.ships.push(ship);
  }

  placeShipAI(name, length) {
    let ship = new Ship(name, length);
    if (Math.random() < 0.5) {
      let field = this.horizontalFieldRandomizer(length);
      for (let a = 0; a < length; a++) {
        let startPosition = this.board.filter(
          (e) =>
            e.coordinates.toString() ==
            `${field[0].toString()},${(field[1] + a).toString()}`
        )[0];
        startPosition.ship = ship;
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
        startPosition.orientation = "vertical";
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
        const image = document.createElement("img");
        image.src = "../assets/flame.png";
        resultField.innerHTML = '<img src="../assets/flame.png">';
        resultField.style.borderColor = "red";
        resultField.classList.add("miss");
        result.ship.hits++;

        result.ship.isSunk();
        if (this.allShipsSunk()) {
          console.log(this.ships);
          if (this.name === "player2") {
            console.log("You win!");
          } else {
            console.log("You lose");
          }
        }
        // this.allShipsSunk();
      } else {
        console.log("Miss!");
        resultField.classList.add("miss");
        // resultField.style.backgroundColor = "red";
      }
    }
  }

  allShipsSunk() {
    if (this.ships.every((ship) => ship.sunk === true)) {
      return true;
    }
  }

  // original
  paint() {
    const gameboardsDiv = document.getElementById("gameboard");
    const playerPanel = document.createElement("div");
    const playerName = document.createElement("h3");
    playerName.setAttribute("id", "playerName");
    const visualBoard = document.createElement("div");
    visualBoard.id = this.name;
    for (let n = 0; n < this.board.length; n++) {
      let visualField = document.createElement("button");
      visualField.innerHTML = this.board[n].coordinates;
      if (this.board[n].orientation === "vertical") {
        visualField.classList.add("rotated");
      }
      if (this.board[n].img != null) {
        visualField.style.backgroundImage = `url(${this.board[n].img})`;
      }

      visualField.id = `${this.name}_${this.board[n].coordinates}`;
      visualBoard.appendChild(visualField);
    }
    playerPanel.appendChild(playerName);
    playerPanel.appendChild(visualBoard);
    gameboardsDiv.insertAdjacentElement("afterbegin", playerPanel);
    // gameboardsDiv.append(visualBoard);
  }

  paintModal() {
    const visualBoard = document.createElement("div");
    visualBoard.id = this.name;

    for (let n = 0; n < this.board.length; n++) {
      let visualField = document.createElement("button");
      visualField.innerHTML = this.board[n].coordinates;
      visualField.style.backgroundImage = `url(${this.board[n].img})`;
      visualField.id = `${this.name}_${this.board[n].coordinates}`;
      // visualField.style.backgroundColor = "blue";
      visualBoard.appendChild(visualField);
    }
    return visualBoard;
  }

  paintAI() {
    const gameboardsDiv = document.getElementById("gameboard");
    const aiPanel = document.createElement("div");
    const aiName = document.createElement("h3");
    aiName.setAttribute("id", "aiName");
    const visualBoard = document.createElement("div");
    visualBoard.id = this.name;

    for (let n = 0; n < this.board.length; n++) {
      let visualField = document.createElement("button");
      visualField.addEventListener("click", (e) => {
        this.receiveAttack([this.board[n].coordinates]);
        if (this.board[n].orientation === "vertical") {
          visualField.classList.add("rotated");
        }
        visualField.disabled = true;
        if (this.board[n].ship === null) {
          visualField.style.backgroundColor = "red";
        } else if (this.board[n].hit === true) {
          // visualField.style.backgroundColor = "red";
          visualField.style.backgroundImage = `url(${this.board[n].img})`;
        } else {
          visualField.style.backgroundColor = "blue";
        }
      });
      visualField.innerHTML = this.board[n].coordinates;
      // if (this.board[n].hit === true) {
      //   visualField.style.backgroundColor = "red";
      // }
      visualField.id = `${this.name}_${this.board[n].coordinates}`;
      visualBoard.appendChild(visualField);
    }
    aiPanel.appendChild(aiName);
    aiPanel.appendChild(visualBoard);
    gameboardsDiv.append(aiPanel);
  }
}

// console.log(e.target.getBoundingClientRect());

// placeShipAI(name, length) {
//   let ship = new Ship(name, length);
//   let field = this.verticalFieldRandomizer(length);
//   for (let a = 0; a < length; a++) {
//     let startPosition = this.board.filter(
//       (e) =>
//         e.coordinates.toString() ==
//         `${field[0].toString()},${(field[1] + a).toString()}`
//     )[0];
//     startPosition.ship = ship;
//   }
//   this.ships.push(ship);
// }

// original
// paint() {
//   const gameboardsDiv = document.getElementById("gameboard");
//   const visualBoard = document.createElement("div");
//   visualBoard.id = this.name;

//   for (let n = 0; n < this.board.length; n++) {
//     let visualField = document.createElement("button");
// visualField.addEventListener("click", (e) => {
//   this.receiveAttack([this.board[n].coordinates]);
//   // visualField.style.backgroundColor = "red";
//   if (this.board[n].orientation === "vertical") {
//     visualField.classList.add("rotated");
//   }
//   visualField.disabled = true;
//   if (this.board[n].ship === null) {
//     visualField.style.backgroundColor = "red";
//   } else if (this.board[n].hit === true) {
//     // visualField.style.backgroundColor = "red";
//     visualField.style.backgroundImage = `url(${this.board[n].img})`;
//   } else {
//     visualField.style.backgroundColor = "blue";
//   }
// });
// visualField.innerHTML = this.board[n].coordinates;
// visualField.style.backgroundImage = `url(${this.board[n].img})`;
// visualField.id = `${this.name}_${this.board[n].coordinates}`;
// visualField.style.backgroundColor = "blue";
//   visualBoard.appendChild(visualField);
// }
// gameboardsDiv.append(visualBoard);
// }
