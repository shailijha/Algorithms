//Create classes for dice and card.Deck class should have function for shuffling, creation and layout of the
//cards
const minDiceRoll = 1;
const maxCard = 54;
const invalidCards = [0,1,2,11,12,13];
const invalidPositions = [0,1,2,51,52,53];
var randomIndex = [];
var newCards = [];
var readlineSync = require('readline-sync');

class Dice {
  //constructor to initialize the dice. Refactored from simpled&d
  constructor(value,color) {
    this.sides = value;
    this.diceRoll = 0;
    this.diceColor = color;
  }

  //function to roll an n-sided dice.  Refactored from simpled&d
  rollDice() {
    let max = this.sides+1;
    let random = Math.floor(Math.random() * Math.floor(max));
    random = (random === 0 ? 1: random);
    return this.diceRoll = random;
  }
}

class Deck {
  /*constructor(max) {

  }*/
  //function to create the deck. Refactored from best hand algo
  static createDeck() {
    deck.push({suit:-1, value: 0});
    deck.push({suit:-1, value: 0});
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        let obj = { suit: i, value: j };
        deck.push(obj);
      }
    }
  }

  //function to shuffle the array. Refactored from best hand algo
  static shuffleDeck(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  //function to generate random card index
  static generateRandomCardIndex() {
    return Math.floor(Math.random() * Math.floor(maxCard));
  }

  /*swap checks to see if the card is invalid. If yes, then it generates a random index
  until it satisfies two conditions: the new index lies b/w [3,50] and the new index card
  value is not invalid*/
  static swap(card,index) {
    if(invalidCards.indexOf(card.value) > -1) {
      let randIdx = Deck.generateRandomCardIndex();
      while(invalidPositions.indexOf(randIdx) > -1 || invalidCards.indexOf(deck[randIdx].value) > -1) {
        randIdx = Deck.generateRandomCardIndex();
      }
      randomIndex.push(randIdx);
      newCards.push(deck[randIdx]);
      let temp = card;
      deck[index] = deck[randIdx];
      deck[randIdx] = temp;
    }
    else {
      randomIndex.push(-1);
    }
  }

  //checkEdgeCards as the name suggests checks the edge cards
  static checkEdgeCards(deck) {
    //console.log(invalidCards);
    //console.log(deck[0]);console.log(deck[1]);console.log(deck[2]);
    //console.log(deck[51]);console.log(deck[52]);console.log(deck[53]);

    Deck.swap(deck[0], 0);
    Deck.swap(deck[1], 1);
    Deck.swap(deck[2], 2);
    Deck.swap(deck[51], 51);
    Deck.swap(deck[52], 52);
    Deck.swap(deck[53], 53);

    //console.log(randomIndex);
    //console.log(newCards);
  }
}

/*Player class is used to initialize each player. It has attributes of black dice roll, red dice
roll and stop value. rollDice function rolls the respective dice and stop value is the sum of
red+black dice rolls.*/
class Player
{
  constructor() {
    this.blackDiceRoll = 0;
    this.redDiceRoll = 0;
    this.stopValue = 0;
  }

  rollDice() {
    this.blackDiceRoll = dice1.rollDice();
    this.redDiceRoll = dice2.rollDice();
    this.stopValue = this.blackDiceRoll+this.redDiceRoll;
  }
}

/*Each player gets 3 markers. Each has a position that indicates the current position it is on, card
which is the current card the marker is on and next move which is curr_posn+1.
simpleMove is a function used to actually move the markers. The dice roll is the input. Based
on its value, the marker moves either till it reaches the stop value or the number of paces.*/
class Marker
{
  constructor() {
    this.position = -1;
    this.card = -1;
    this.next_move = 0;
    this.stop_flag = false;
  }

  simpleMove(diceRollValue) {
    //console.log('card before while loop');
    //console.log(this.card);
    //console.log(diceRollValue <= deck[0].value);
    if(diceRollValue <= deck[0].value) {
      this.position += 1;
      this.next_move += 1;
      this.card = deck[this.position];
      this.stop_flag = true;
      //console.log(this.position); console.log(this.next_move); console.log(this.card);
    }
    else {
      //console.log('next move ',this.next_move);
      //console.log('card\'s value ',this.card.value);
      this.card = deck[0];
      //console.log(this.next_move < diceRollValue);
      //console.log(this.card.value <= diceRollValue);
      while(this.next_move < diceRollValue && this.card.value < diceRollValue) {
        if(this.card.value >= diceRollValue) {
          this.stop_flag = true;
        }
        this.next_move += 1;
        this.position += 1;
        //console.log(this.position);
        this.card = deck[this.position];
      }
    }
  }
}

var deck = new Array();
Deck.createDeck();
Deck.shuffleDeck(deck);
//console.log('shuffle deck');
//console.log(deck);
Deck.checkEdgeCards(deck);
console.log('Final valid deck');
console.log(deck);

var dice1 = new Dice(6,'black');
var dice2 = new Dice(6,'red');
//console.log(dice1);console.log(dice2);

var player1 = new Player();
player1.rollDice();
console.log(player1);

const markers = [];

function initializeMarkers() {
  for(let i = 0; i < 3; i++) {
    markers[i] = new Marker();
  }
}

initializeMarkers();

var userMarker1 = readlineSync.question(`Your black dice roll is ${player1.blackDiceRoll}.
Please provide which marker you want apply this value to `);
markers[userMarker1-1].simpleMove(player1.blackDiceRoll);
console.log('markers after first dice roll ',markers);

var userMarker2 = readlineSync.question(`Your red dice roll is ${player1.redDiceRoll}.
Please provide which marker you want apply this value to `);
console.log(markers[userMarker2-1].stop_flag);
if(markers[userMarker2-1].stop_flag) {
  var chooseAnotherMarker = readlineSync.question(`This marker was stopped by the stop value in the first dice roll. It cannot be chosen again. Please choose other marker `);
  markers[chooseAnotherMarker-1].simpleMove(player1.blackDiceRoll);
}
else  {
    markers[userMarker2-1].simpleMove(player1.redDiceRoll);
}
console.log('markers after second dice roll ',markers);
