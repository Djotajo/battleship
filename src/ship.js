export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  isHit() {
    return this.hits++;
  }

  isSunk() {
    return this.hits === this.length
      ? (this.sunk = true) && console.log("Sunk")
      : (this.sunk = false);
  }
}
