import randomAIAttack from "./randomAIAttack";
import { attacks } from "./randomAIAttack";

export default function currentTurn(player1, player2) {
  if (!player1.board.allShipsSunk() && !player2.board.allShipsSunk()) {
    let attack;
    let attackData;
    console.log(`These are attacks ${attacks}`);
    if (fieldsArray.length === 0) {
      attack = randomAIAttack();
    } else {
      attackData = fieldsArray.shift();
      attack = attackData.slice(0, 2);
      console.log(attackData);
      console.log(attack);
    }
    attacks.push(JSON.stringify(attack));
    setTimeout(() => {
      console.log(attack);
      if (player1.board.receiveAttack(attack) === true) {
        if (fieldsArray.length === 0) {
          surroundingFieldLeft(attack);
          surroundingFieldRight(attack);
          surroundingFieldBottom(attack);
          surroundingFieldTop(attack);
        } else if (attackData[2] === "horizontal") {
          fieldsArray = fieldsArray.filter((e) => e[2] === "horizontal");
          console.log("horizontal hit");
          console.log(fieldsArray);
          surroundingFieldLeft(attack);
          surroundingFieldRight(attack);
        } else if (attackData[2] === "vertical") {
          fieldsArray = fieldsArray.filter((e) => e[2] === "vertical");
          surroundingFieldBottom(attack);
          surroundingFieldTop(attack);
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
    console.log("this is it");
    console.log(JSON.stringify([field[0], field[1] - 1]));
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
