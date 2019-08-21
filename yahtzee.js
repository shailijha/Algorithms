function rollDie() {
  let min = 1;
  let max = 6;
  let random = Math.floor(Math.random() * (+max - +min)) + +min;
  return random;
}

var result = new Array();

function rollDice(num) {
  let counter = 0;
  let counter1 = 0;

  while (counter1 < 3) {
    result = [];
    counter = 0;
    while (counter < num) {
      let roll = rollDie();
      result.push(roll);
      counter++;
    }
    counter1++;
    console.log('result is ', result);
  }

  return result;
}

rollDice(5);

function reRollDice(diceToReroll) {
  for (let num = 0; num < diceToReroll.length; num++) {
    result[diceToReroll[num] - 1] = rollDie();
  }
  console.log(result);
}

let diceToReroll = new Array();

let times = 0;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(`Pick a dice to re-roll `, dice => {
  if (parseInt(dice) < 1 || parseInt(dice) > 5) {
    console.log(`Please choose a dice between 1 and 5`);
    readline.close();
  } else {
    while (times < 3) {
      readline.question(`Choose another dice to re-roll`, anotherDice => {
        if (parseInt(anotherDice) < 1 || parseInt(anotherDice) > 5) {
          console.log(`Please choose a dice between 1 and 5`);
          readline.close();
        } else {
          console.log(`The dice chosen are ${dice} ${anotherDice}`);
          diceToReroll.push(parseInt(dice));
          diceToReroll.push(parseInt(anotherDice));
          reRollDice(diceToReroll);
          times += 1;
          readline.close();
        }
      });
    }
  }
});
