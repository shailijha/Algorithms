/*Write a separate class for attack since it is not a property of the dice.
The constructor of Dice class can be modified to set the number of sides*/

//var readlineSync = require('readline-sync');

//var modifier = readlineSync.question('Please provide a modifier ');
const min = 1;

class Dice {
  //constructor to initialize the dice
  constructor(value) {
    this.sides = value;
    this.diceRoll = 0;
  }

  //function to roll an n-sided dice
  rollDice() {
    let max = this.sides;
    return this.diceRoll = Math.floor(Math.random() * (+max - +min)) + +min;
  }
}

class Attack {
  static detectCritical(dice) {
    //console.log(dice.diceRoll);
    return dice.diceRoll === 1 ? ('Critical Miss') : (dice.diceRoll === 20 ? 'Critical Hit' : 'Continue');
  }

  static determineHit(dice, enemyAC) {
    //console.log(dice.diceRoll+parseInt(modifier));
    let newDiceRoll = dice.diceRoll+parseInt(modifier);
    return newDiceRoll <= enemyAC ? ('Miss') : ('Hit');
  }

  static calculateDamage(weaponDamage){
    weaponDamage = weaponDamage.split('');
    let times = weaponDamage[0]; let side = weaponDamage[2];
    let hitDice = new Dice(side);
    console.log(times, side, hitDice);
    let result = 0;
    for(let i=0;i<times;i++) {
      console.log('Result before attack ',result);
      let temp = hitDice.rollDice();
      console.log('temp is ',temp);
      result += temp;
      console.log('Result after attack ',result);
    }
    console.log(`You got to Hit and your damage is ${result}`);
    //console.log(weaponDamage);
  }
}

var sample = new Dice(20);

var test = {
  sides: 20,
  diceRoll: 20
};

var modifier = "20";

var enemyAC = 5;

console.log(`The roll of the ${sample.sides}-sided dice is ${sample.rollDice()}`);
console.log(sample);
//console.log(test);
//detectCritical(sample)
console.log(`Detect Critical is ${Attack.detectCritical(sample)}`);
console.log(`Determine Hit is ${Attack.determineHit(sample,enemyAC)}`);
if(Attack.determineHit(sample,enemyAC) === 'Hit') {
  let weaponDamage = '2d6';
  Attack.calculateDamage(weaponDamage)
}

/*var criticalState = sample.detectCritical();

switch (criticalState) {
  case 'Critical Miss':
    console.log('Critical Miss')
    break;
  case 'Critical Hit':
    let weaponDamage = readlineSync.question('Please provide weapon damage ');
    weaponDamage = weaponDamage.split('');
    let times = weaponDamage[0]; let sides = weaponDamage[2];
    //console.log(weaponDamage);
    break;
  case 'Continue':
    var enemyAC = readlineSync.question('Please provide enemy attack class value ');
    let hitOrMiss = sample.determineHit(enemyAC);
    console.log(hitOrMiss)
    if(hitOrMiss === 'Hit') {
      let weaponDamage = readlineSync.question('Please provide weapon damage ');
      weaponDamage = weaponDamage.split('');
      let times = weaponDamage[0]; let sides = weaponDamage[2];
      let hitDice = new Dice(0);
      let result = 0;
      for(let i=0;i<times;i++) {
        result += hitDice.rollDice(1,sides);
      }
      console.log(`You got to Hit and your damage is ${result}`);
      //console.log(weaponDamage);
    }
    else {
      console.log('Unfortunately you missed');
    }
    break;
  default:
    console.log('Default');
    break;
}*/

//console.log("2d6".split(''));
