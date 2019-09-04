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
    deck.push({suit:-1, value: 0, markers:''});
    deck.push({suit:-1, value: 0, markers:''});
    let i = 0;
    //for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 5; j++) {
        let obj = { suit: i, value: j, markers:'' };
        deck.push(obj);
      }
    //}
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
    Deck.swap(deck[0], 0);
    Deck.swap(deck[1], 1);
    Deck.swap(deck[2], 2);
    Deck.swap(deck[51], 51);
    Deck.swap(deck[52], 52);
    Deck.swap(deck[53], 53);
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
  constructor(name) {
    this.name = name;
    this.position = -1;
    this.card = {suit: -1, value: -1};
    this.next_move = 0;
    this.stop_flag = false;
    this.reached = false;
  }

  simpleMove(diceRollValue, stopValue) {
    if(diceRollValue <= deck[0].value && this.position == -1 || diceRollValue <= deck[this.next_move].value) {
      this.position += 1;
      this.next_move += 1;
      this.card = deck[this.position];
      this.stop_flag = true;
      //deck[this.position].markers.push(this.name);
      //console.log(this.position); console.log(this.next_move); console.log(this.card);
    }
    else if(diceRollValue > deck[this.next_move].value) {
      let paces = 0;
      while(paces < diceRollValue && this.position < (deck.length - 1) && this.card.value < stopValue) {

        this.next_move += 1;
        this.position += 1;
        this.card = deck[this.position];
        paces++;
         // console.log('current markers position ',this.position);
         // console.log('current markers next_move ',this.next_move);
         // console.log('current markers card ',this.card);
         // console.log('paces '+paces);
      }

      if(this.position < deck.length && this.card.value == stopValue) {
        this.stop_flag = true;
      }
      //deck[this.position].markers.push(this.name);
      //console.log('Markers in simpleMove function ',player1Markers);
    }
    if(this.position == deck.length - 1) {
      this.reached = true;
    }
  }
}

const markerNames = ['A', 'B', 'C'];
function initializeMarkers(markers) {
  for(let i = 0; i < 3; i++) {
    markers[i] = new Marker(markerNames[i]);
  }
}


var deck = new Array();
var dice1 = new Dice(6,'black');
var dice2 = new Dice(6,'red');

function playGame() {
  Deck.createDeck();
  //Deck.shuffleDeck(deck);
  //console.log('shuffle deck');
  //console.log(deck);
  //Deck.checkEdgeCards(deck);
  console.log('Final valid deck');
  console.log(deck);

  var player1 = new Player();
  var player2 = new Player();
  //player2.rollDice();
  //console.log(player2);

  let player1Markers = [];
  initializeMarkers(player1Markers);
  //console.log(player1Markers);

  let player2Markers = [];
  initializeMarkers(player2Markers);
  //console.log(player2Markers);


  while(player1Markers[0].next_move < 7 || player1Markers[1].next_move < 7 || player1Markers[2].next_move < 7) {
    if(player1Markers[0].next_move == 7 && player1Markers[1].next_move == 7 && player1Markers[2].next_move == 7) {
      break;
    }
    //console.log('Markers before ',player1Markers);
    player1.rollDice();
    console.log(player1);

    let userMarker1 = readlineSync.question(`Your black dice roll is ${player1.blackDiceRoll}.
    Please provide which marker you want apply this value to `);

    if(player1Markers[userMarker1-1].reached) {
      let chooseAnotherMarker = readlineSync.question(`This marker already reached the end.Please choose other marker `);
      player1Markers[chooseAnotherMarker-1].simpleMove(player1.redDiceRoll, player1.stopValue);
    } else {
        player1Markers[userMarker1-1].simpleMove(player1.blackDiceRoll, player1.stopValue);
    }
    if(player1Markers[0].reached && player1Markers[1].reached && player1Markers[2].reached) {
      console.log('Game over');
    }
    else {
      let userMarker2 = readlineSync.question(`Your red dice roll is ${player1.redDiceRoll}.
      Please provide which marker you want apply this value to `);
      
      if(player1Markers[userMarker2-1].stop_flag) {
        let chooseAnotherMarker = readlineSync.question(`This marker was stopped by the stop value in the first dice roll. It cannot be chosen again.
          Please choose other marker `);
        player1Markers[chooseAnotherMarker-1].simpleMove(player1.redDiceRoll, player1.stopValue);
      } else if(player1Markers[userMarker2-1].reached) {
        let chooseAnotherMarker = readlineSync.question(`This marker already reached the end.Please choose other marker `);
        player1Markers[chooseAnotherMarker-1].simpleMove(player1.redDiceRoll, player1.stopValue);
      }
      else  {
          player1Markers[userMarker2-1].simpleMove(player1.redDiceRoll, player1.stopValue);
      }
    }

    player1Markers.forEach((marker) => {
      //console.log('current marker ',marker);
      //console.log('card value ',marker.card.value);
      if(marker.card.value > -1) {
        // let index = deck.findIndex(c => c.value === marker.card.value);
        let index = marker.position;
        //console.log('index ',index);
        deck[index].markers += marker.name;
      }
    })
    console.log('Markers after ',player1Markers);
    console.log('Deck after ',deck);
    deck.forEach(card => {
      card.markers = '';
    })
    player1Markers[0].stop_flag = player1Markers[1].stop_flag = player1Markers[2].stop_flag = false;
  }

  console.log('markers final ',player1Markers);
}

playGame();
