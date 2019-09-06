function createDeck() {
  deck.push({ suit:-1, value: 0, player1markers: 'A', player2markers: 'B' });
  deck.push({ suit:-1, value: 0, player1markers: 'A', player2markers: 'B' });
  //let i = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      let obj = { suit: i, value: j, player1markers: 'A', player2markers: 'B' };
      deck.push(obj);
    }
  }
}

function displayBoard() {
  let i = 0;
  let j = 0;
  let k = 0;

  while(i < deck.length) {
    if(i % 7 == 0 && i > 0) {
      //console.log('i%7=0 ',i);
      mainstring += '\n';
      let marker_str = '';
      while(j < i) {
          marker_str = deck[j].player1markers+'\t';
          mainstring += marker_str;
          j += 1;
          //console.log('j ',j);
      }
      if(j % 7 == 0) {
        mainstring += '\n';
        let marker_str1 = '';
        while(k < j) {
            marker_str1 = deck[k].player2markers+'\t';
            mainstring += marker_str1;
            k += 1;
            //console.log('j ',j);
        }
        mainstring += '\n';
      }
      //console.log('j after while loop ',j);
      mainstring += '\n';
    }
    if(i < deck.length) {
      let card_str = suitsMap.get(deck[i].suit)+' '+deck[i].value+'\t';
      mainstring += card_str;
      //console.log('i!=5 ',i);
      i += 1;
    }
    /*console.log('temp string ');
    console.log(mainstring);
    console.log();*/
  }
  //console.log('i outside while loop ',i)
  if(i == deck.length) {
    mainstring += '\n';
    let marker_str = '';
    let marker_str1 = '';
    while(j < i) {
        marker_str = deck[j].player1markers+'\t';
        mainstring += marker_str;
        j += 1;
        //console.log('j ',j);
    }

    mainstring += '\n';

    while(k < i) {
        marker_str1 = deck[k].player2markers+'\t';
        mainstring += marker_str1;
        k += 1;
        //console.log('j ',j);
    }
    //console.log('j after while loop ',j);
    //mainstring += '\n';
  }
  console.log(mainstring);
}

var deck = [];

const suitsMap = new Map([[-1, '\u25A0'], [0,'\u2660'], [1,'\u2665'], [2, '\u2666'], [3,'\u2663']]);
var mainstring = '';

createDeck();
//console.log(deck);
displayBoard();
