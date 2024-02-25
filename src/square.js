export default class Square {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.ship = null;
    this.hit = false;
    this.img = null;
    this.orientation = "horizontal";
    this.name = coordinates.join("");
  }
}
