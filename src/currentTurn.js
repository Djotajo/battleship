import randomAIAttack from "./randomAIAttack";

export default function currentTurn(player1, player2) {
  if (!player1.board.allShipsSunk() && !player2.board.allShipsSunk()) {
    let attack;
    let attackData;
    if (fieldsArray.length === 0) {
      attack = randomAIAttack();
    } else {
      attackData = fieldsArray.shift();
      attack = attackData.slice(0, 2);
      console.log(fieldsArray);
    }
    setTimeout(() => {
      console.log(attack);
      if (player1.board.receiveAttack(attack) === true) {
        if (fieldsArray.length === 0) {
          surroundingFieldLeft(attack);
          surroundingFieldRight(attack);
          surroundingFieldBottom(attack);
          surroundingFieldTop(attack);
        } else if (fieldsArray.length === 2) {
          fieldsArray = [];
          surroundingFieldLeft(attack);
          surroundingFieldRight(attack);
        } else if (fieldsArray.length === 3) {
          fieldsArray = [];
          surroundingFieldBottom(attack);
          surroundingFieldTop(attack);
        }
      }
    }, 1000);
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
  if (field[0] - 1 >= 0) {
    fieldsArray.push([field[0] - 1, field[1], "vertical"]);
  }
}

function surroundingFieldBottom(field) {
  if (field[0] + 1 <= 9) {
    fieldsArray.push([field[0] + 1, field[1], "vertical"]);
  }
}

function surroundingFieldLeft(field) {
  if (field[1] - 1 >= 0) {
    fieldsArray.push([field[0], field[1] - 1, "horizontal"]);
  }
}

function surroundingFieldRight(field) {
  if (field[1] + 1 <= 9) {
    fieldsArray.push([field[0], field[1] + 1, "horizontal"]);
  }
}
