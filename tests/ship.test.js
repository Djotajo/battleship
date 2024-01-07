import Ship from "../src/ship";

const testShip = new Ship(5);
testShip.hit = 5;

test("length", () => {
  expect(new Ship(5).length).toEqual(5);
});

test("if the ship is sunk", () => {
  expect(new Ship(5).isSunk()).toEqual(false);
});

test("if the ship is sunk", () => {
  expect(new Ship(5).hit).toEqual(0);
});

test("if the testShip is sunk", () => {
  expect(testShip.isSunk()).toEqual(true);
});
