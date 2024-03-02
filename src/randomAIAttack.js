export default function randomAIAttack() {
  let attack = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  while (attacks.includes(JSON.stringify(attack))) {
    attack = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }
  attacks.push(JSON.stringify(attack));
  console.log(attacks);
  return attack;
  // return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

const attacks = [];
