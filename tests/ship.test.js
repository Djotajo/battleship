import Ship from "../src/ship";

test("length", () => {
  expect(new Ship(5).length).toEqual(5);
});

test("if the ship is sunk", () => {
  expect(new Ship(5).isSunk()).toEqual(false);
});

test("if the ship is sunk", () => {
  expect(new Ship(5).hits).toEqual(0);
});

test("if the testShip is sunk", () => {
  let testShip1 = new Ship(5);
  testShip1.hits = 5;
  expect(testShip1.isSunk()).toEqual(true);
});

test("if the testShip got hit", () => {
  let testShip2 = new Ship(5);
  testShip2.isHit();
  expect(testShip2.hits).toEqual(1);
});
