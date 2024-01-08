export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  isHit() {
    return this.hits++;
  }

  isSunk() {
    return this.hits === this.length ? true : false;
  }
}
