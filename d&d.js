/*Write a separate class for attack since it is not a property of the dice.
The constructor of Dice class can be modified to set the number of sides*/

var readlineSync = require('readline-sync');

var modifier = readlineSync.question('Please provide a modifier ');

class Dice {
  //constructor to initialize the dice
  constructor(value) {
    this.dice = value;
  }

  //function to roll the 20 sided dice
  rollDice(min,max) {
    return this.dice = Math.floor(Math.random() * (+max - +min)) + +min;
  }

  detectCritical() {
    return this.dice === 1 ? ('Critical Miss') : (this.dice === 20 ? 'Critical Hit' : 'Continue');
  }

  determineHit(enemyAC) {
    console.log(this.dice+parseInt(modifier));
    return (this.dice+parseInt(modifier)) <= enemyAC ? ('Miss') : ('Hit');
  }
}

var sample = new Dice(0);

console.log(`The roll of the 20-sided dice is ${sample.rollDice(1,20)}`);

var criticalState = sample.detectCritical();

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
}

//console.log("2d6".split(''));
