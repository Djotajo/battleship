export default class ShipImg {
  constructor(name, length, img) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.img = img;
    this.coordinates = [];
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
