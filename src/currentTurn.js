import randomAIAttack from "./randomAIAttack";
import { attacks } from "./randomAIAttack";

export default function currentTurn(player1, player2) {
  if (!player1.board.allShipsSunk() && !player2.board.allShipsSunk()) {
    let attack;
    let attackData;
    // console.log(`These are attacks ${attacks}`);
    if (fieldsArray.length === 0) {
      attack = randomAIAttack();
    } else {
      attackData = fieldsArray.shift();
      attack = attackData.slice(0, 2);
    }
    attacks.push(JSON.stringify(attack));
    setTimeout(() => {
      let test = player1.board.receiveAttack(attack);
      if (test === "sunk") {
        fieldsArray = [];
      } else if (test === true) {
        // console.log(attackData);
        if (attackData) {
          if (attackData[2] === "horizontal") {
            fieldsArray = fieldsArray.filter((e) => e[2] === "horizontal");
            surroundingFieldLeft(attack);
            surroundingFieldRight(attack);
          } else if (attackData[2] === "vertical") {
            fieldsArray = fieldsArray.filter((e) => e[2] === "vertical");
            surroundingFieldBottom(attack);
            surroundingFieldTop(attack);
          }
        } else if (fieldsArray.length === 0) {
          surroundingFieldLeft(attack);
          surroundingFieldTop(attack);
          surroundingFieldRight(attack);
          surroundingFieldBottom(attack);
        }
      }
    }, 500);
  }
}
let fieldsArray = [];

// function surroundingFields(field) {
//   fieldsArray.push([field[0] + 1, field[1]]);
//   fieldsArray.push([field[0] - 1, field[1]]);
//   fieldsArray.push([field[0], field[1] + 1]);
//   fieldsArray.push([field[0], field[1] - 1]);
// }

function surroundingFieldTop(field) {
  if (
    field[0] - 1 >= 0 &&
    !attacks.includes(JSON.stringify([field[0] - 1, field[1]]))
  ) {
    fieldsArray.push([field[0] - 1, field[1], "vertical"]);
  }
}

function surroundingFieldBottom(field) {
  if (
    field[0] + 1 <= 9 &&
    !attacks.includes(JSON.stringify([field[0] + 1, field[1]]))
  ) {
    fieldsArray.push([field[0] + 1, field[1], "vertical"]);
  }
}

function surroundingFieldLeft(field) {
  if (
    field[1] - 1 >= 0 &&
    !attacks.includes(JSON.stringify([field[0], field[1] - 1]))
  ) {
    fieldsArray.push([field[0], field[1] - 1, "horizontal"]);
  }
}

function surroundingFieldRight(field) {
  if (
    field[1] + 1 <= 9 &&
    !attacks.includes(JSON.stringify([field[0], field[1] + 1]))
  ) {
    fieldsArray.push([field[0], field[1] + 1, "horizontal"]);
  }
}
