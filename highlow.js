/*input: current card: int, guess: high/low or 0/1
1.0 next card is constant;compare the current with next and return result
1.1 randomly pick the next card
1.2 update the current card to have a suit and value
1.3 update the randomizer to pick a suit as well
1.4 ensure the next card does not match the current card for suit and value
2.0 create an encompassing function to play the game
2.1 ask user for high or low and print result
2.2 keep track of the number of the correct guesses
*/
function randomNumber(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min)
}

const face_cards = new Map([['J',11], ['Q', 12], ['K', 13], ['A',14]]);
const suits = ['clubs', 'spades', 'hearts', 'diamonds'];

//Version 1.0
function highLowv1(current_card, guess) {
  console.log(`current_card, next_card and guess in v1 ${current_card} ${next_card} ${guess}`);
  if(face_cards.has(next_card)) {
    next_card = face_cards.get(next_card);
  }

  if(face_cards.has(current_card)) {
    current_card = face_cards.get(current_card);
  }

  if(current_card == next_card) {
    return 'draw';
  }

  if(current_card > next_card) {
    return (guess === 'high') ?  'lose' :  'win';
  }
  else {
    return (guess === 'high') ? 'win' : 'lose';
  }
}

//Version 1.1
function highLowv2(current_card, guess) {
  let next_card = randomNumber(2,14);
  console.log(`current_card, next_card and guess in v2 ${current_card} ${next_card} ${guess}`);

  if(face_cards.has(current_card)) {
    current_card = face_cards.get(current_card);
  }

  if(current_card == next_card) {
    return 'draw';
  }

  if(current_card > next_card) {
    return (guess === 'high') ?  'lose' :  'win';
  }
  else {
    return (guess === 'high') ? 'win' : 'lose';
  }
}

//Version 1.2
function highLowv3(current_card, guess) {
  let next_card = randomNumber(2,14);

  if(face_cards.has(current_card.value)) {
    current_card.value = face_cards.get(current_card.value);
  }

  //current_card = current_card.value;
  console.log('current card in v3: ',current_card);
  console.log(`next_card and guess in v3 ${next_card} ${guess}`);
  if(current_card.value == next_card) {
    return 'draw';
  }

  if(current_card.value > next_card) {
    return (guess === 'high') ?  'lose' :  'win';
  }
  else {
    return (guess === 'high') ? 'win' : 'lose';
  }
}

//Version 1.3
function highLowv4(current_card, guess) {
  let next_card = {
    suit: suits[randomNumber(0,3)],
    value: randomNumber(2,14)
  }
  console.log('next_card in v4 ',next_card);

  current_card = current_card.value;

  if(face_cards.has(current_card)) {
    current_card = face_cards.get(current_card);
  }
  console.log(current_card);
  console.log(`guess in v4 ${guess}`);
  if(current_card == next_card.value) {
    return 'draw';
  }

  if(current_card > next_card.value) {
    return (guess === 'high') ?  'lose' :  'win';
  }
  else {
    return (guess === 'high') ? 'win' : 'lose';
  }
}

//Version 1.4
function highLowv5(current_card, guess) {
  console.log('current card in v5');
  console.log(current_card);

  let flag = true;
  let next_card = generateNextCard(current_card,flag);
  console.log('next card in v5');
  console.log(next_card);
  /*while(flag) {
    next_card.suit = suits[randomNumber(0,3)];
    next_card.value = randomNumber(2,14);

    if(current_card.suit === next_card.suit && current_card.value === next_card.value) {
      next_card.suit = suits[randomNumber(0,3)];
      next_card.value = randomNumber(2,14);
      flag = true;
    }
    else {
      flag = false;
    }
  }*/

  current_card = current_card.value;

  if(face_cards.has(current_card)) {
    current_card = face_cards.get(current_card);
  }
  console.log(`guess in v5 ${guess}`);
  console.log(`current card in v5 ${current_card}`);
  if(current_card.value === next_card.value) {
    return 'draw';
  }
  let result = '';
  if(current_card.value > next_card.value) {
    result = (guess === 'high') ?  'lose' :  'win';
    result = (guess === 'low') ?  'win' :  'lose';
  }
  else {
    result = (guess === 'high') ? 'win' : 'lose';
    result = (guess === 'low') ?  'lose' :  'win';
  }
  console.log('result ',result);
  return result;
}

function generateNextCard(flag,current_card) {
  let next_card = {
    suit: '',
    value: 0
  };

  while(flag) {
    next_card.suit = suits[randomNumber(0,3)];
    next_card.value = randomNumber(2,14);

    if(current_card.suit === next_card.suit && current_card.value === next_card.value) {
      next_card.suit = suits[randomNumber(0,3)];
      next_card.value = randomNumber(2,14);
      flag = true;
    }
    else {
      flag = false;
    }
  }

  return next_card;
}

//version 2.0
function highLowv6(guess) {
  console.log(guess);

  let current_card = {
    suit: suits[randomNumber(0,3)],
    value: randomNumber(2,14)
  };

  let next_card = {
    suit: '',
    value: 0
  };


}

let next_card = 'J';
const current_card_value = 'K';
const current_card = {
  suit: 'clubs',
  value: 'J'
};
let guess = 'low';

//console.log(highLowv1(current_card_value,guess));
//console.log(highLowv2(current_card_value,guess));
console.log(highLowv3(current_card,guess));
/*console.log('card', current_card);
console.log(highLowv4(current_card,guess));
console.log('card', current_card);*/
//console.log(highLowv5(current_card,guess));
//console.log('card', current_card);
//highLowv6('low');
