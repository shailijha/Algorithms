/*Create a deck of cards from A-7 included. The first and last 2 cards can't be A,2,6,7.Shuffle the cards until
this condition is satisfied. Build a 1 6-sided die. Lay out the cards and start the race with one player.
Based on what the player rolls, the player moves along in the race until they encounter a card equal to
or greater than the number. The  player to reach there first is the winner*/

//Create classes for dice and card.Deck class should have function for shuffling, creation and layout of the
//cards
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

var deck = new Array();
const min = 0;
const max = 27;
let invalidCards = [1,2,6,7];
class Deck {
  //const suits = ['clubs', 'spades', 'hearts', 'diamonds'];
  //const cards = [1,2,3,4,5,6,7];

  static createDeck() {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 7; j++) {
        let obj = { suit: i, value: j };
        deck.push(obj);
      }
    }
  }

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

  static checkValid(value) {
    if(invalidCards.indexOf(value) > -1) {
      return true;
    }
    return false;
  }

  static checkDeck() {
    let firstCard = deck[0];
    let secondCard = deck[1];
    let lastoneCard = deck[26];
    let lastCard = deck[27];
    console.log(firstCard);console.log(secondCard);console.log(lastoneCard);console.log(lastCard);
    if(Deck.checkValid(firstCard.value)) {
      let randIdx = Deck.swap();
      console.log(`randIdx in firstCard ${randIdx}`);
      console.log('deck[randIdx] in first card');
      console.log(deck[randIdx].value);
      console.log(Deck.checkValid(deck[randIdx].value));
      while(randIdx === 0 && Deck.checkValid(deck[randIdx].value)) {
        randIdx = Deck.swap();
        console.log(`randIdx in while firstCard ${randIdx}`)
      }
      console.log('values before swapping in first card');
      console.log(deck[0],deck[randIdx]);
      let temp = deck[randIdx];
      deck[randIdx] = firstCard;
      deck[0] = temp;
      console.log('values after swapping in first card');
      console.log(deck[0],deck[randIdx]);
    }
    if(Deck.checkValid(secondCard.value)) {
      let randIdx = Deck.swap();
      console.log(`randIdx in secondCard ${randIdx}`);
      console.log('deck[randIdx] in second card');
      console.log(deck[randIdx]);
      while(randIdx === 1 && Deck.checkValid(deck[randIdx].value)) {
        randIdx = Deck.swap();
      }
      console.log('values before swapping in second card');
      console.log(deck[1],deck[randIdx]);
      let temp = deck[randIdx];
      deck[randIdx] = secondCard;
      deck[1] = temp;
      console.log('values after swapping in second card');
      console.log(deck[1],deck[randIdx]);
    }
    if(Deck.checkValid(lastoneCard.value)) {
      let randIdx = Deck.swap();
      console.log(`randIdx in lastoneCard ${randIdx}`);
      console.log('deck[randIdx] in lastoneCard card');
      console.log(deck[randIdx]);
      while(randIdx === 26 && Deck.checkValid(deck[randIdx].value)) {
        randIdx = Deck.swap();
      }
      console.log('values before swapping in lastoneCard card');
      console.log(deck[26],deck[randIdx]);
      let temp = deck[randIdx];
      deck[randIdx] = lastoneCard;
      deck[26] = temp;
      console.log('values after swapping in lastoneCard card');
      console.log(deck[26],deck[randIdx]);
    }
    if(Deck.checkValid(lastCard.value)) {
      let randIdx = Deck.swap();
      console.log(`randIdx in lastCard ${randIdx}`);
      console.log('deck[randIdx] in lastCard card');
      console.log(deck[randIdx]);
      while(randIdx === 27 && Deck.checkValid(deck[randIdx].value)) {
        randIdx = Deck.swap();
      }
      console.log('values before swapping in lastCard card');
      console.log(deck[27],deck[randIdx]);
      let temp = deck[randIdx];
      deck[randIdx] = lastCard;
      deck[27] = temp;
      console.log('values after swapping in lastCard card');
      console.log(deck[27],deck[randIdx]);
    }
  }

  static swap() {
    return Math.floor(Math.random() * (+max - +min)) + +min;
  }
}

//console.log(deck);
Deck.createDeck();
//console.log(deck);
Deck.shuffle(deck);
console.log('shuffle deck');
console.log(deck);
Deck.checkDeck();
console.log('check deck');
console.log(deck);
//console.log(deck.length);
