import Square from "./square";
import Ship from "./ship";

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
        resultField.style.backgroundColor = "yellow";
        result.ship.hits++;
        result.ship.isSunk();
        this.allShipsSunk();
      } else {
        console.log("Miss!");
        resultField.style.backgroundColor = "red";
      }
    }
  }

  allShipsSunk() {
    console.log(this.ships);
    let gameOver = this.ships.every((ship) => ship.sunk === true);
    if (gameOver === true) {
      return true;
    }
  }

  paint() {
    const gameboardsDiv = document.getElementById("gameboard");
    const visualBoard = document.createElement("div");
    visualBoard.id = this.name;

    for (let n = 0; n < this.board.length; n++) {
      let visualField = document.createElement("button");
      visualField.addEventListener("click", (e) => {
        this.receiveAttack([this.board[n].coordinates]);
        visualField.style.backgroundColor = "red";
        visualField.disabled = true;
      });
      visualField.innerHTML = this.board[n].coordinates;
      visualField.id = `${this.name}_${this.board[n].coordinates}`;
      if (this.board[n].ship === null) {
        visualField.style.backgroundColor = "green";
      } else if (this.board[n].hit === true) {
        visualField.style.backgroundColor = "red";
      } else {
        visualField.style.backgroundColor = "blue";
      }
      visualBoard.appendChild(visualField);
    }
    gameboardsDiv.append(visualBoard);
  }

  paintAI() {
    const gameboardsDiv = document.getElementById("gameboard");
    const visualBoard = document.createElement("div");
    visualBoard.id = this.name;

    for (let n = 0; n < this.board.length; n++) {
      let visualField = document.createElement("button");
      visualField.addEventListener("click", (e) => {
        this.receiveAttack([this.board[n].coordinates]);
        visualField.style.backgroundColor = "red";
        visualField.disabled = true;
      });
      visualField.innerHTML = this.board[n].coordinates;
      if (this.board[n].hit === true) {
        visualField.style.backgroundColor = "red";
      }
      visualBoard.appendChild(visualField);
    }
    gameboardsDiv.append(visualBoard);
  }
}

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
