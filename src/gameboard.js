import Square from "./square";

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

  placeShip(coordinates) {}

  receiveAttack(coords) {
    // console.log(coordinates);
    console.log(this.board);
    const result = this.board.filter(
      (e) => e.coordinates.toString() == coords.toString()
    )[0];
    console.log(result);
    result.hit = true;
  }

  allShipsSunk() {}
}
