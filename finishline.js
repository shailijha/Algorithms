//Create classes for dice and card.Deck class should have function for shuffling, creation and layout of the
//cards
const minDiceRoll = 1;
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
    //console.log(max);
    let random = Math.floor(Math.random() * Math.floor(max));
    random = (random === 0 ? 1: random);
    //console.log(random);
    return this.diceRoll = random;
  }
}

class Deck {
  //function to create the deck. Refactored from best hand algo
  /*constructor(max) {

  }*/
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
  static shuffle(array) {
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

  //function to check if card is valid
  static checkInvalid(value) {
    console.log('checking', value)
    if(invalidCards.indexOf(value) > -1) {
      return true;
    }
    return false;
  }

  /*function to check the validity of edge cards. Keeps generating random index to swap with until it
  finds a card that is not of the same index or not one of the invalid cards*/
  static checkValidity(card,index) {
    console.log('checking card', card);
    if(Deck.checkInvalid(card.value)) {
      console.log('card was found as invalid')
      let randIdx = Deck.generateRandomCardIndex();
      while(randIdx == index) {
        randIdx = Deck.generateRandomCardIndex();
        while(Deck.checkInvalid(deck[randIdx].value)) {
          randIdx = Deck.generateRandomCardIndex();
        }
      }
      console.log(`values before swapping in ${index} card`);
      console.log(deck[index],deck[randIdx]);
      let temp = deck[randIdx];
      deck[randIdx] = card;
      deck[index] = temp;
      console.log(`values after swapping in ${index} card`);
      console.log(deck[index],deck[randIdx]);
    } else {
      console.log(card,` is a valid card`);
    }
  }

  static finalCheckDeck() {
    let firstCard = deck[0];
    let secondCard = deck[1];
    let thirdCard = deck[2];
    let lastoneoneCard = deck[51];
    let lastoneCard = deck[52];
    let lastCard = deck[53];
    console.log(firstCard);console.log(secondCard);console.log(thirdCard);
    console.log(lastoneoneCard);console.log(lastoneCard);console.log(lastCard);
    console.log(invalidCards.indexOf(firstCard));console.log(invalidCards.indexOf(secondCard));console.log(invalidCards.indexOf(thirdCard));
    console.log(invalidCards.indexOf(lastoneoneCard));console.log(invalidCards.indexOf(lastoneCard));console.log(invalidCards.indexOf(lastCard));
    if(invalidCards.indexOf(parseInt(firstCard.value)) > -1 && invalidCards.indexOf(parseInt(secondCard.value)) > -1 && invalidCards.indexOf(parseInt(thirdCard.value)) > -1) {
      return true;
    }
    if(invalidCards.indexOf(parseInt(lastoneoneCard.value)) > -1 && invalidCards.indexOf(parseInt(lastoneCard.value)) > -1 && invalidCards.indexOf(parseInt(lastCard.value)) > -1) {
      return true;
    }
    return false;
  }

  /*function to check the deck after swapping. Calls checkValidity for the edge cards until they
  aren't [1,2,6,7]*/
  static checkDeck() {
    let firstCard = deck[0];
    let secondCard = deck[1];
    let thirdCard = deck[2];
    let lastoneoneCard = deck[51];
    let lastoneCard = deck[52];
    let lastCard = deck[53];
    console.log(firstCard);console.log(secondCard);console.log(thirdCard);
    console.log(lastoneoneCard);console.log(lastoneCard);console.log(lastCard);
    //console.log(Deck.checkInvalid(firstCard.value));console.log(Deck.checkInvalid(secondCard.value));
    //console.log(Deck.checkInvalid(lastoneCard.value));console.log(Deck.checkInvalid(lastCard.value));
     while(Deck.checkInvalid(firstCard.value) || Deck.checkInvalid(secondCard.value) || Deck.checkInvalid(thirdCard.value)) {
      Deck.checkValidity(firstCard,0);
      Deck.checkValidity(secondCard,1);
      Deck.checkValidity(thirdCard,2);
      firstCard = deck[0];
      secondCard = deck[1];
      thirdCard = deck[2];
     }

    while(Deck.checkInvalid(lastoneoneCard.value) || Deck.checkInvalid(lastoneCard.value) || Deck.checkInvalid(lastCard.value)) {
      Deck.checkValidity(lastoneoneCard,51);
      Deck.checkValidity(lastoneCard,52);
      Deck.checkValidity(lastCard,53);
      lastoneoneCard = deck[51];
      lastoneCard = deck[52];
      lastCard = deck[53];
    }
  }

  //function to pick random card index
  static generateRandomCardIndex() {
    return Math.floor(Math.random() * Math.floor(maxCard));
    //return Math.floor(Math.random() * (+max - +min)) + +min;
  }
}


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

class Marker
{
  constructor() {
    this.position = -1;
    this.card = -1;
    this.next_move = 0;
  }

  //this.next_move < player.stopValue-1 || this.card.value < player1.stopValue
  simpleMove(player) {
    this.card = deck[this.position+1];
    //console.log('card before while loop');
    //console.log(this.card);

    while(this.next_move < player.stopValue && this.card.value < player1.stopValue) {
      this.next_move += 1;
      this.position += 1;
      //console.log(this.position);
      this.card = deck[this.position];
    }
  }
}

/** look into swapping functionality. Not working properly. Maybe do the 3-50 card swap or
Joe's method***/

var deck = new Array();
Deck.createDeck();
console.log(deck);
var dice1 = new Dice(6,'black');
var dice2 = new Dice(6,'red');
console.log(dice1);console.log(dice2);

var player1 = new Player();
player1.rollDice();
console.log(player1);
const markers = [];
function initializeMarkers() {
  console.log('In initialize markers function');
  for(let i = 0; i < 3; i++) {
    markers[i] = new Marker();
    markers[i].simpleMove(player1);
  }
}

initializeMarkers();
console.log(markers);
/*var marker1 = new Marker();
marker1.simpleMove(player1);
console.log(marker1);
var marker2 = new Marker();
marker2.simpleMove(player1);
console.log(marker2);
var marker3 = new Marker();
marker3.simpleMove(player1);
console.log(marker3);*/
//console.log(player1.blackDiceRoll+player1.redDiceRoll);

//constants for minimum and maximum values of Card, invalid edge cards and minimum roll of Dice
const maxCard = 53;
const invalidCards = [0,1,2,11,12,13];

/*Deck.createDeck();
console.log(deck);
Deck.shuffle(deck);
console.log('shuffle deck');
console.log(deck);
Deck.checkDeck();
console.log('check deck');
console.log(deck);
console.log(Deck.finalCheckDeck());*/


/*console.log(sixSidedDice);
console.log(sixSidedDice.rollDice());
console.log(sixSidedDice);*/
