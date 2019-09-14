//Create classes for dice and card.Deck class should have function for shuffling, creation and layout of the
//cards
const minDiceRoll = 1;
const maxCard = 15;
const invalidCards = [0,1,2,11,12,13];
const invalidPositions = [0,1,2,12,13,14];
var randomIndex = [];
var newCards = [];
const suitsMap = new Map([[-1, '\u25A0'], [0,'\u2660'], [1,'\u2665'], [2, '\u2666'], [3,'\u2663']]);
var mainstring = '';
var readlineSync = require('readline-sync');
const validMarkers = ['A', 'B', 'C', 'a', 'b', 'c'];

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
  //constructor to initialize the deck
  // constructor(num_suits, max_card) {
  //   deck.push({suit:-1, value: 0, player1markers:'', player2markers:''});
  //   deck.push({suit:-1, value: 0, player1markers:'', player2markers:''});
  //   let i = 0;
  //   //for (let i = 0; i < 4; i++) {
  //     for (let j = 1; j <= 13; j++) {
  //       let obj = { suit: i, value: j, player1markers:'', player2markers:'' };
  //       deck.push(obj);
  //     }
  //   //}
  // }

  //function to create the deck. Refactored from best hand algo
  static createDeck() {
    deck.push({suit:-1, value: 0, player1markers:'', player2markers:''});
    deck.push({suit:-1, value: 0, player1markers:'', player2markers:''});
    let i = 0;
    //for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        let obj = { suit: i, value: j, player1markers:'', player2markers:'' };
        deck.push(obj);
      }
    //}
  }

  //function to shuffle the array. Refactored from best hand algo
  static shuffleDeck() {
    var currentIndex = deck.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }
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
  static checkEdgeCards() {
    Deck.swap(deck[0], 0);
    Deck.swap(deck[1], 1);
    Deck.swap(deck[2], 2);
    Deck.swap(deck[deck.length-3], deck.length-3);
    Deck.swap(deck[deck.length-2], deck.length-2);
    Deck.swap(deck[deck.length-1], deck.length-1);
  }

  //function to display board to user. it first displays the card values, then the player1 markers and lastly the
  //player2 markers. Built using String builder concept
  static displayBoard() {
    let i = 0;
    let j = 0;
    let k = 0;

    while(i < deck.length) {
      if(i % 7 == 0 && i > 0) {
        mainstring += '\n';
        let marker_str = '';
        while(j < i) {
            marker_str = deck[j].player1markers+'\t';
            mainstring += marker_str;
            j += 1;
        }
        if(j % 7 == 0) {
          mainstring += '\n';
          let marker_str1 = '';
          while(k < j) {
              marker_str1 = deck[k].player2markers+'\t';
              mainstring += marker_str1;
              k += 1;
          }
          mainstring += '\n';
        }
        mainstring += '\n';
      }
      if(i < deck.length) {
        let card_str = suitsMap.get(deck[i].suit)+' '+deck[i].value+'\t';
        mainstring += card_str;
        i += 1;
      }
    }
    if(i == deck.length) {
      mainstring += '\n';
      let marker_str = '';
      let marker_str1 = '';
      while(j < i) {
          marker_str = deck[j].player1markers+'\t';
          mainstring += marker_str;
          j += 1;
      }

      mainstring += '\n';

      while(k < i) {
          marker_str1 = deck[k].player2markers+'\t';
          mainstring += marker_str1;
          k += 1;
      }
    }
    console.log(mainstring);
    mainstring = '';
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
which is the current card the marker is on, next move which is curr_posn+1, stop flag to indicate if the marker
was stopped by the stop value and reached flag to keep track of it has reached the end of the board.
simpleMove is a function used to actually move the markers. The dice roll and stop value are the inputs. Based
on stop value, the marker moves either till it reaches the stop value or the number of paces.*/
const mapMarkerToIndex = new Map([['A',0], ['B',1], ['C',2]]);
class Marker
{
  constructor(name) {
    this.name = name;
    this.position = -1;
    this.card = {suit: -1, value: -1};
    this.stop_flag = false;
    this.reached = false;
  }

  simpleMove(diceRollValue, stopValue) {
    console.log('attempting to move', diceRollValue);

    this.position += 1;
    this.card = deck[this.position];

    /*if((stopValue <= deck[0].value && this.position == -1) || stopValue <= deck[this.position+1].value) {
      this.stop_flag = true;
    }*/
    if(stopValue <= this.card.value) {
      console.log('found stop value');
      this.stop_flag = true;
    }

    else {
      let paces = 1;
      while(paces < diceRollValue && this.position < (deck.length - 1) && this.card.value < stopValue) {
        this.position += 1;
        if(this.postion > deck.length - 1) {
          this.position = deck.length - 1;
        }
        this.card = deck[this.position];
        paces++;
        /*console.log('current markers position ',this.position);
        //console.log('current markers position+1 ',this.position+1);
        console.log('current markers card ',this.card);
        console.log('paces '+paces);*/
      }

      if(this.card.value >= stopValue) {
        console.log('found stop value');
        this.stop_flag = true;
      }
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

//checks to see if the game is over for either player
function checkGameOver() {
  if(player1Markers[0].reached && player1Markers[1].reached && player1Markers[2].reached)
    return [true,'Player 1 won the game'];
  else if(player2Markers[0].reached && player2Markers[1].reached && player2Markers[2].reached)
    return [true,'Player 2 won the game'];
  else
    return false;
}

/*special case: what to do if only one marker is left and it is stopped by the black dice roll?*/
function checkTwoMarkersReached(playerMarkers) {
  let flag1 = playerMarkers[0].reached;
  let flag2 = playerMarkers[1].reached;
  let flag3 = playerMarkers[2].reached;

  if((flag1 && flag2 && !flag3) || (flag2 && flag3 && !flag1) || (flag1 && flag3 && !flag2)) {
    return true;
  } else {
    return false;
  }
}

//function to play the black dice roll on player marker
function playBlackDice(userMarker1,playerMarkers, player) {
  if(playerMarkers[mapMarkerToIndex.get(userMarker1)].reached) {
    let chooseAnotherMarker;
    do {
      chooseAnotherMarker = readlineSync.question(`This marker already reached the end.Please choose other marker `);
    } while(playerMarkers[mapMarkerToIndex.get(chooseAnotherMarker.toUpperCase())].reached);
    playerMarkers[mapMarkerToIndex.get(chooseAnotherMarker.toUpperCase())].simpleMove(player.blackDiceRoll, player.stopValue);
  } else {
       playerMarkers[mapMarkerToIndex.get(userMarker1)].simpleMove(player.blackDiceRoll, player.stopValue);
   }
}

//function to play the red dice roll on player marker
function playRedDice(userMarker2,playerMarkers, player) {
  if(playerMarkers[mapMarkerToIndex.get(userMarker2)].stop_flag) {
    let chooseAnotherMarker;
    do {
        chooseAnotherMarker = readlineSync.question(`This marker was stopped by the stop value in the first dice roll. Please choose other marker `);
        if(checkTwoMarkersReached(playerMarkers)) {
          console.log('2 out of 3 markers have reached the end is true');
          playerMarkers[mapMarkerToIndex.get(userMarker2)].simpleMove(player.redDiceRoll, player.stopValue);
          break;
        }
    } while(playerMarkers[mapMarkerToIndex.get(chooseAnotherMarker.toUpperCase())].stop_flag);
    playerMarkers[mapMarkerToIndex.get(chooseAnotherMarker.toUpperCase())].simpleMove(player.redDiceRoll, player.stopValue);
  } else if(playerMarkers[mapMarkerToIndex.get(userMarker2)].reached) {
    let chooseAnotherMarker;
    do {
        chooseAnotherMarker = readlineSync.question(`This marker already reached the end.Please choose other marker `);
    } while(playerMarkers[mapMarkerToIndex.get(chooseAnotherMarker.toUpperCase())].reached);
    playerMarkers[mapMarkerToIndex.get(chooseAnotherMarker.toUpperCase())].simpleMove(player.redDiceRoll, player.stopValue);
  }
  else  {
      playerMarkers[mapMarkerToIndex.get(userMarker2)].simpleMove(player.redDiceRoll, player.stopValue);
  }
  playerMarkers[0].stop_flag = playerMarkers[1].stop_flag = playerMarkers[2].stop_flag = false;
}

//recursive function that gets called until one of the players reaches the end
function recurseGame(playerMarkers, player) {
  let userMarker1, userMarker2, gameOver;

  do {
    userMarker1 = readlineSync.question(`Your black dice roll is ${player.blackDiceRoll}. Please provide which marker you want apply black dice roll to `);
  } while(validMarkers.indexOf(userMarker1) == -1);

  playBlackDice(userMarker1.toUpperCase(),playerMarkers, player);

  gameOver = checkGameOver();

  if(gameOver[0]) {
    //console.log(gameOver[1]);
    return gameOver;
  }
  else {
    do {
        userMarker2 = readlineSync.question(`Your red dice roll is ${player.redDiceRoll}. Please provide which marker you want apply red dice roll to `);
      } while(validMarkers.indexOf(userMarker2) == -1);

    //let userMarker2 = readlineSync.question(`Please provide which marker you want apply red dice roll to `);
    playRedDice(userMarker2.toUpperCase(),playerMarkers, player);
    gameOver = checkGameOver();
    return gameOver;
  }
}

//function to play the game. Takes in the n players markers and actually plays the game using them.
function playGame() {
  while((player1Markers[0].position < deck.length-1 || player1Markers[1].position < deck.length-1 || player1Markers[2].position < deck.length-1)
     && (player2Markers[0].position < deck.length-1 || player2Markers[1].position < deck.length-1 || player2Markers[2].position < deck.length-1)) {
    player1.rollDice();
    console.log(`Player 1 => Black dice roll: ${player1.blackDiceRoll}, Red dice roll: ${player1.redDiceRoll}, Stop value: ${player1.stopValue}`)
    let gameOverFlag = recurseGame(player1Markers,player1);

    //let gameOver = checkGameOver();

    if(gameOverFlag[0]) {
      console.log(`Game over. ${gameOver[1]} won the game`);
    }
    else {
      console.log();

      player2.rollDice();
      console.log(`Player 2 => Black dice roll: ${player2.blackDiceRoll}, Red dice roll: ${player2.redDiceRoll}, Stop value: ${player2.stopValue}`)
      recurseGame(player2Markers,player2);
    }
    // console.log('player1 markers after ',player1Markers);
    // console.log('player2 markers after ',player2Markers);

    player1Markers.forEach((marker) => {
      if(marker.card.value > -1) {
        let index = marker.position;
        deck[index].player1markers += marker.name;
      }
    })

    player2Markers.forEach((marker) => {
      if(marker.card.value > -1) {
        let index = marker.position;
        deck[index].player2markers += marker.name;
      }
    })

    Deck.displayBoard();
    // console.log('temp deck ',deck);

    //console.clear();

    deck.forEach(card => {
      card.player1markers = '';
      card.player2markers = '';
    })
  }
}

//function to initiate the game. Deck is created, shuffled, checked for edge cards and playGame() is called on valid deck.
function initiateGame() {
  Deck.createDeck();
  Deck.shuffleDeck();
  // console.log('shuffle deck');
  // console.log(deck);
  Deck.checkEdgeCards();
  //console.log(deck);
  //console.log('initial deck ',deck);
  console.log('Final valid deck');
  Deck.displayBoard();
  playGame();
}


var player1 = new Player();
var player2 = new Player();

var player1Markers = [];
initializeMarkers(player1Markers);

var player2Markers = [];
initializeMarkers(player2Markers);

initiateGame();
