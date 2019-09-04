var deck = [];
const suitsMap = new Map([[-1, '\u25A0'], [0,'\u2660'], [1,'\u2665'], [2, '\u2666'], [3,'\u2663']]);
var mainstring = '';

const invalidCards = [0,1,2,11,12,13];
const invalidPositions = [0,1,2,51,52,53];
var randomIndex = [];
var newCards = [];
const maxCard = 54;

function createDeck() {
  deck.push({suit:-1, value: 0});
  deck.push({suit:-1, value: 0});
  //let i = 0;
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

  //return array;
}

function generateRandomCardIndex() {
  return Math.floor(Math.random() * Math.floor(maxCard));
}

/*swap checks to see if the card is invalid. If yes, then it generates a random index
until it satisfies two conditions: the new index lies b/w [3,50] and the new index card
value is not invalid*/
function swap(card,index) {
  if(invalidCards.indexOf(card.value) > -1) {
    let randIdx = generateRandomCardIndex();
    while(invalidPositions.indexOf(randIdx) > -1 || invalidCards.indexOf(deck[randIdx].value) > -1) {
      randIdx = generateRandomCardIndex();
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
function checkEdgeCards(deck) {
  swap(deck[0], 0);
  swap(deck[1], 1);
  swap(deck[2], 2);
  swap(deck[51], 51);
  swap(deck[52], 52);
  swap(deck[53], 53);
}

//console.clear();
createDeck();
console.log(deck);
shuffleDeck(deck);
console.log('shuffle deck');
console.log(deck);
checkEdgeCards(deck);
console.log('Final valid deck');
console.log(deck);

function displayBoard() {
  let j = 0;
  for(let i = 0; i < deck.length; i++) {
    if(j == 7) {
      mainstring += '\n\n\n';
      j = 0;
    }
    let card_str = suitsMap.get(deck[i].suit)+' '+deck[i].value+'\t';
    mainstring += card_str;
    j += 1;
  }
  console.log(mainstring);
}

displayBoard();
