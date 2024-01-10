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
    let position = this.board.filter(
      (e) => e.coordinates.toString() == field.toString()
    )[0];
    position.ship = destroyer;
  }

  receiveAttack(field) {
    // console.log(coordinates);
    // console.log(this.board);
    const result = this.board.filter(
      (e) => e.coordinates.toString() == field.toString()
    )[0];
    console.log(result.ship);
    result.hit = true;
    if (result.ship) {
      result.ship.hits++;
      console.log(result.ship.isSunk());
    }
  }

  allShipsSunk() {}
}
