/*best hand takes player 1 and player 2 as input. Each is a deck of 7 cards 
1.0 create a function to tabulate the hands and pick a winner
1.1 randomie the two hands
1.2 ensure that the randomizer doesn't pick an already picked card 
1.2.0 create a deck
1.2.1 create a deck shuffle function
1.2.3 create a way to draw a card 
1.3 use the deck to create two hands*/
//each player is an array of objects.
let player1 = [
  { suit: '', value: 10 },
  { suit: '', value: 9 },
  { suit: '', value: 10 },
  { suit: '', value: 'J' },
  { suit: '', value: 'A' },
  { suit: '', value: 4 },
  { suit: '', value: 6 }
];
let player2 = [
  { suit: '', value: 'K' },
  { suit: '', value: 'Q' },
  { suit: '', value: 2 },
  { suit: '', value: 7 },
  { suit: '', value: 'J' },
  { suit: '', value: 'A' },
  { suit: '', value: 7 }
];

const face_cards = new Map([['J', 11], ['Q', 12], ['K', 13], ['A', 14]]);
const suits = ['clubs', 'spades', 'hearts', 'diamonds'];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function bestHandv1(player1, player2) {
  let player1_sum = 0;
  let player2_sum = 0;

  player1.forEach(card => {
    if (face_cards.has(card.value)) {
      card.value = face_cards.get(card.value);
    }
    player1_sum += card.value;
  });

  player2.forEach(card => {
    if (face_cards.has(card.value)) {
      card.value = face_cards.get(card.value);
    }
    player2_sum += card.value;
  });

  if (player1_sum === player2_sum) {
    return 'It is a draw';
  }

  return player1_sum > player2_sum
    ? 'Player 1 won the game'
    : 'Player 2 won the game';
}

function bestHandv2() {
  let player1_random = new Array();
  let player2_random = new Array();

  let player1_sum = 0;
  let player2_sum = 0;

  let i = 0;
  while (i < 7) {
    player1_random.push(randomNumber(2, 14));
    player2_random.push(randomNumber(2, 14));
    i++;
  }

  console.log(`The random deck of cards are`);
  console.log(`${player1_random} ${player2_random}`);

  player1_random.forEach(value => {
    player1_sum += value;
  });

  player2_random.forEach(value => {
    player2_sum += value;
  });

  console.log(`player sums in v1.1 ${player1_sum} ${player2_sum}`);

  if (player1_sum === player2_sum) {
    return 'It is a draw';
  }

  return player1_sum > player2_sum
    ? 'Player 1 won the game'
    : 'Player 2 won the game';
}

var deck = new Array();

//function to create the deck
function createDeck() {
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j <= 14; j++) {
      let obj = { suit: i, value: j };
      deck.push(obj);
    }
  }
}

//function to shuffle the deck
function shuffle(array) {
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

function drawCard() {
  return randomNumber(0, deck.length - 1);
  //return rand_card_index;
}

function compareHands(player1, player2) {
  for (let i = 0; i < player1.length; i++) {
    for (let j = 0; j < player2.length; j++) {
      if (
        player1[i].suit === player2[j].suit &&
        player1[i].value === player2[j].value
      ) {
        console.log(player1[i]);
        console.log(player2[j]);
        return true;
      }
    }
  }
  return false;
}

//Verison 1.3
function bestHandv3() {
  //create the deck
  createDeck();
  shuffle(deck);
  //console.log(deck);
  let player1 = new Array();
  let player2 = new Array();

  let i = 0;
  while (i < 7) {
    let rand_card_index = drawCard();
    let rand_card = deck[rand_card_index];
    player1.push(rand_card);
    deck.splice(rand_card_index, 1);

    let rand_card_index1 = drawCard();
    let rand_card1 = deck[rand_card_index1];
    player2.push(rand_card1);
    deck.splice(rand_card_index1, 1);

    i++;
  }

  console.log(player1);
  console.log(player2);
  let flag = compareHands(player1, player2);
  if (!flag) {
    let player1_sum = 0;
    let player2_sum = 0;

    player1.forEach(card => {
      player1_sum += card.value;
    });

    player2.forEach(card => {
      player2_sum += card.value;
    });

    if (player1_sum === player2_sum) {
      return 'It is a draw';
    }

    console.log(
      `player sums in v1.3 after calculation ${player1_sum} ${player2_sum}`
    );

    return player1_sum > player2_sum
      ? 'Player 1 won the game'
      : 'Player 2 won the game';
  } else {
    return 'There was a duplicate card generated. Try again';
  }
}

/*console.log('Best Card version 1.0');
console.log(bestHandv1(player1, player2));

console.log('Best Card version 1.1');
console.log(bestHandv2());*/
console.log(bestHandv3());
