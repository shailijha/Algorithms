/*Write a separate class for attack since it is not a property of the dice.
The constructor of Dice class can be modified to set the number of sides*/

var readlineSync = require('readline-sync');

var modifier = readlineSync.question('Please provide a modifier ');
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
  //static function that determines if the dice roll is a critical hit or miss
  static detectCritical(dice) {
    return dice.diceRoll === 1 ? ('Critical Miss') : (dice.diceRoll === 20 ? 'Critical Hit' : 'Continue');
  }

  //static function that determines if the dice roll is a normal hit or miss
  static determineHit(dice, enemyAC) {
    let newDiceRoll = dice.diceRoll+parseInt(modifier);
    return newDiceRoll <= enemyAC ? ('Miss') : ('Hit');
  }

  //static function to calculate weapon damage
  static calculateDamage(weaponDamage){
    weaponDamage = weaponDamage.split('');
    let times = weaponDamage[0]; let side = weaponDamage[2];
    let hitDice = new Dice(side);
    let result = 0;
    for(let i=0;i<times;i++) {
      let temp = hitDice.rollDice();
      //console.log(`temp roll is ${temp}`);
      result += temp;
    }
    return result;
  }
}

var sample = new Dice(20);
sample.rollDice();
//console.log(`The roll of the ${sample.sides}-sided dice is ${sample.rollDice()}`);
console.log(sample);

/*var test = {
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
}*/

var criticalState = Attack.detectCritical(sample);

switch (criticalState) {
  case 'Critical Miss':
    console.log('Unfortunately you got a Critical Miss');
    break;
  case 'Critical Hit':
    let weaponDamage = readlineSync.question('Please provide weapon damage ');
    console.log(`You got to Critical Hit and your damage is ${Attack.calculateDamage(weaponDamage)}`);
    break;
  case 'Continue':
    var enemyAC = readlineSync.question('Please provide enemy attack class value ');
    let hitOrMiss = Attack.determineHit(sample,enemyAC);
    console.log(hitOrMiss)
    if(hitOrMiss === 'Hit') {
      let weaponDamage = readlineSync.question('Please provide weapon damage ');
      console.log(`You got to Hit and your damage is ${Attack.calculateDamage(weaponDamage)}`);
    }
    else {
      console.log('Unfortunately you missed your turn');
    }
    break;
  default:
    console.log('Invalid case');
    break;
}
