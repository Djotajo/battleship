import Square from "./square";
import Ship from "./ship";

export default class Gameboard {
  constructor() {
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
    let field = this.fieldRandomizerHorizontal(length);
    console.log(field);
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

  fieldRandomizerHorizontal(length) {
    return [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * (10 - length)),
    ];
  }

  fieldRandomizerVertical(length) {
    return [
      Math.floor(Math.random() * (10 - length)),
      Math.floor(Math.random() * 10),
    ];
  }

  receiveAttack(field) {
    const result = this.board.filter(
      (e) => e.coordinates.toString() == field.toString()
    )[0];
    if (result.hit === true) {
      console.log("Can't hit the same field twice");
    } else {
      result.hit = true;
      if (result.ship) {
        console.log("Hit!");
        result.ship.hits++;
        result.ship.isSunk();
        this.allShipsSunk();
      } else {
        console.log("Miss!");
      }
    }
  }

  allShipsSunk() {
    console.log(this.ships);
    let gameOver = this.ships.every((ship) => ship.sunk === true);
    if (gameOver === true) {
      console.log("game over");
    }
  }

  paint() {
    const gameboardsDiv = document.getElementById("gameboard");
    const visualBoard = document.createElement("div");

    for (let n = 0; n < this.board.length; n++) {
      let visualField = document.createElement("button");
      visualField.addEventListener("click", (e) => {
        this.receiveAttack([this.board[n].coordinates]);
        visualField.style.backgroundColor = "red";
        visualField.disabled = true;
      });
      visualField.innerHTML = this.board[n].coordinates;
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
