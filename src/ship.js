export default class Ship {
  constructor(length) {
    this.length = length;
    this.hit = 0;
  }

  isSunk() {
    return this.hit === this.length ? true : false;
    // return false;
    // console.log("sunk");
  }
}

// export default Ship;
