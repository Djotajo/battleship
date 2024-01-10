import Square from "./square";
import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.board = [];
  }

  boardFill() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.board.push(new Square([i, j]));
      }
    }
  }

  placeShip(name, length, field) {
    let destroyer = new Ship(length);
    let fieldsArray = [];
    for (let a = 0; a < length; a++) {
      let startPosition = this.board.filter(
        (e) =>
          e.coordinates.toString() ==
          `${field[0].toString()},${(field[1] + a).toString()}`
      )[0];
      console.log(startPosition);
      startPosition.ship = destroyer;
    }
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
      } else {
        console.log("Miss!");
      }
    }
  }

  allShipsSunk() {}

  paint() {
    const visualBoard = document.getElementById("gameboard");
    for (let n = 0; n < this.board.length; n++) {
      let visualField = document.createElement("button");
      visualField.addEventListener("click", (e) => {
        this.receiveAttack([this.board[n].coordinates]);
        visualField.style.backgroundColor = "red";
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
    // this.board.forEach((element) => visualBoard.appendChild(visualField));
  }
}

// placeShip(name, length, field) {
//     let destroyer = new Ship(length);
//     let fieldsArray = [];
//     for (let a = 0; a < length; a++) {
//       fieldsArray.push([field[0], field[1] + a]);
//       //   ide ovdje polu recursion lagano
//     }
//     console.log(fieldsArray);
//     console.log("evo problema");
//     let positions = this.board.filter((item) => fieldsArray.includes(item));
//     console.log(positions);
//     let startPosition = this.board.filter(
//       (e) => e.coordinates.toString() == field.toString()
//     )[0];
//     console.log(startPosition);
//     for (let n = 0; n < length; n++) {
//       let ab;
//     }
//     startPosition.ship = destroyer;
//   }
