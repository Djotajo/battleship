import Ship from "../src/ship";

test("length", () => {
  expect(new Ship(5).length).toEqual(5);
});

test("if the new ship is sunk", () => {
  expect(new Ship(5).isSunk()).toEqual(false);
});

test("if the new ship is hit", () => {
  expect(new Ship(5).hits).toEqual(0);
});

test("if the testShip got hit", () => {
  let testShip1 = new Ship(5);
  testShip1.isHit();
  expect(testShip1.hits).toEqual(1);
});

test("if the testShip is sunk, 3/5", () => {
  let testShip2 = new Ship(5);
  testShip2.hits = 3;
  expect(testShip2.isSunk()).toEqual(false);
});

test("if the testShip is sunk, 4/5 + a hit", () => {
  let testShip3 = new Ship(5);
  testShip3.hits = 4;
  testShip3.isHit();
  expect(testShip3.isSunk()).toEqual(true);
});
