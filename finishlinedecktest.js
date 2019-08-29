const maxCard = 54;
const invalidCards = [0,1,2,11,12,13];
const invalidPositions = [0,1,2,51,52,53];

function createDeck()
{
  deck.push({suit:-1, value: 0});
  deck.push({suit:-1, value: 0});
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      let obj = { suit: i, value: j };
      deck.push(obj);
    }
  }
}

function shuffleDeck(array) {
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

function generateRandomCardIndex() {
  return Math.floor(Math.random() * Math.floor(maxCard));
  //return Math.floor(Math.random() * (+max - +min)) + +min;
}

var randomIndex = [];
var newCards = [];

function swap(card,index) {
  if(invalidCards.indexOf(card.value) > -1) {
    //let flag = true;
    //if(flag[0]) {
      let randIdx = generateRandomCardIndex();
      while(invalidPositions.indexOf(randIdx) > -1 || invalidCards.indexOf(deck[randIdx].value) > -1) {
        randIdx = generateRandomCardIndex();
      }
      randomIndex.push(randIdx);
      newCards.push(deck[randIdx]);
      let temp = card;
      deck[index] = deck[randIdx];
      deck[randIdx] = temp;
    //}
  }
  else {
    randomIndex.push(-1);
  }
}

function checkEdgeCards(deck) {
  console.log(invalidCards);
  console.log(deck[0]);console.log(deck[1]);console.log(deck[2]);
  console.log(deck[51]);console.log(deck[52]);console.log(deck[53]);

  swap(deck[0], 0);
  swap(deck[1], 1);
  swap(deck[2], 2);
  swap(deck[51], 51);
  swap(deck[52], 52);
  swap(deck[53], 53);

  console.log(randomIndex);
  console.log(newCards);
}

var deck = new Array();
createDeck();
console.log('Initial Deck');
console.log(deck);
shuffleDeck(deck);
console.log('Shuffled Deck');
console.log(deck);
checkEdgeCards(deck);
console.log('Valid deck');
console.log(deck);
