/*Create a deck of cards from A-7 included. The first and last 2 cards can't be A,2,6,7.Shuffle the cards until
this condition is satisfied. Build a 1 6-sided die. Lay out the cards and start the race with one player.
Based on what the player rolls, the player moves along in the race until they encounter a card equal to
or greater than the number. The  player to reach there first is the winner*/

//Create classes for dice and card.Deck class should have function for shuffling, creation and layout of the
//cards
const minDiceRoll = 1;
class Dice {
  //constructor to initialize the dice. Refactored from simpled&d
  constructor(value) {
    this.sides = value;
    this.diceRoll = 0;
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
  static createDeck() {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 7; j++) {
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
  static checkValid(value) {
    if(invalidCards.indexOf(value) > -1) {
      return true;
    }
    return false;
  }

  /*function to check the validity of edge cards. Keeps generating random index to swap with until it
  finds a card that is not of the same index or not one of the invalid cards*/
  static checkValidity(card,index) {
    if(Deck.checkValid(card.value)) {
      let randIdx = Deck.generateRandomCardIndex();
      while(randIdx === index && Deck.checkValid(deck[randIdx].value)) {
        randIdx = Deck.generateRandomCardIndex();
      }
      console.log(`values before swapping in ${index} card`);
      console.log(deck[index],deck[randIdx]);
      let temp = deck[randIdx];
      deck[randIdx] = card;
      deck[index] = temp;
      console.log(`values after swapping in ${index} card`);
      console.log(deck[index],deck[randIdx]);
    }
  }

  /*function to check the deck after swapping. Calls checkValidity for the edge cards until they
  aren't [1,2,6,7]*/
  static checkDeck() {
    let firstCard = deck[0];
    let secondCard = deck[1];
    let lastoneCard = deck[26];
    let lastCard = deck[27];
    console.log(firstCard);console.log(secondCard);console.log(lastoneCard);console.log(lastCard);
    console.log(Deck.checkValid(firstCard.value));console.log(Deck.checkValid(secondCard.value));
    console.log(Deck.checkValid(lastoneCard.value));console.log(Deck.checkValid(lastCard.value));
    while(Deck.checkValid(firstCard.value) || Deck.checkValid(secondCard.value) || Deck.checkValid(lastoneCard.value) || Deck.checkValid(lastCard.value)) {
      Deck.checkValidity(firstCard,0);
      Deck.checkValidity(secondCard,1);
      Deck.checkValidity(lastoneCard,26);
      Deck.checkValidity(lastCard,27);
      firstCard = deck[0];
      secondCard = deck[1];
      lastoneCard = deck[26];
      lastCard = deck[27];
    }
  }

  //function to pick random card index
  static generateRandomCardIndex() {
    let random = Math.floor(Math.random() * Math.floor(maxCard));
    return random;
    //return Math.floor(Math.random() * (+max - +min)) + +min;
  }
}

//Player class
class Player {
  //constructor to initialize current_position, playerDiceRoll and i.
  //current_position stops at the place where playerDiceRoll <= card.value.
  //i is needed since the next round will start from the next card and not from the beginning
  constructor() {
    this.current_position = -1;
    this.playerDiceRoll = -1;
    this.i = 0;
  }

  /*function for navigation of player. Player rolls dice. checks to see if the roll value is less
  than or equal to deck[0].value. if yes, then sets current position to 0 and increments i. Else,
  runs a while loop until it reaches a card that has a higher value than the roll*/
  navigate(player) {
    console.log('in player navigate function');
    this.playerDiceRoll = sixSidedDice.rollDice();
    //console.log('dice roll ',this.playerDiceRoll);
    console.log(player);
    console.log('values before starting');
    console.log('1st value in the deck');
    console.log(deck[this.i].value);
    console.log('while condition check');
    console.log(this.playerDiceRoll > deck[this.i].value)
    if(this.playerDiceRoll == deck[this.i].value || this.playerDiceRoll < deck[this.i].value) {
      this.current_position = this.i;
      this.i += 1;
      console.log(player);
    }else {
      while(this.playerDiceRoll > deck[this.i].value && this.i < 28) {
        if(this.playerDiceRoll == deck[this.i].value) {
          break;
        }
        console.log('deck[i] value in while loop');
        console.log(deck[this.i].value);
        this.i += 1;
        this.current_position = this.i;
        console.log('player');console.log(player);
      }
    }
  }
}

var deck = new Array();
var sixSidedDice = new Dice(6);

//constants for minimum and maximum values of Card, invalid edge cards and minimum roll of Dice
const minCard = 0;
const maxCard = 28;
const invalidCards = [1,2,6,7];

Deck.createDeck();
Deck.shuffle(deck);
console.log('shuffle deck');
console.log(deck);
Deck.checkDeck();
console.log('check deck');
console.log(deck);

let player1 = new Player();
while(player1.current_position!=27) {
    player1.navigate(player1);
}
/*console.log(sixSidedDice);
console.log(sixSidedDice.rollDice());
console.log(sixSidedDice);*/
