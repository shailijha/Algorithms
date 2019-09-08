static displayBoard() {
  for(let i = 0; i < deck.length; i++) {
    if(i % 7 == 0 && i > 0) {
      mainstring += '\n';
      let marker_str = '';
      let j = i-7;
      //console.log('i,j ',i,j);
      for(j; j < i; j++) {
         if(j % 6 == 0 && j > 0) {
           mainstring += '\n';
           let marker_str1 = '';
           let k = j-6;
           //console.log(j,k);
           //console.log('mainstring ',mainstring);
           for(k; k < j; k++) {
             marker_str1 = deck[k].player2markers+'\t';
             mainstring += marker_str1;
           }
           mainstring += '\n';
         }
        //console.log(deck[j].player1markers);
        marker_str = deck[j].player1markers+'\t';
        mainstring += marker_str;
        //console.log('mainstring ',mainstring);
      }
      mainstring += '\n';
    }
    let card_str = suitsMap.get(deck[i].suit)+' '+deck[i].value+'\t';
    mainstring += card_str;
    //let marker_str = '\n'+deck[i].markers;
    //mainstring += marker_str;
    //console.log(mainstring);
  }

  /*let marker_str = '';

  //code for displaying player1 markers
  for(let i = 0; i < deck.length; i++) {
    if(i % 7 == 0) {
      mainstring += '\n';
    }
    marker_str = deck[i].player1markers+'\t';
    mainstring += marker_str;
  }

  marker_str='';
  //code for displaying player2 markers
  for(let i = 0; i < deck.length; i++) {
    if(i % 7 == 0) {
      mainstring += '\n';
    }
    marker_str = deck[i].player2markers+'\t';
    mainstring += marker_str;
  }

  marker_str='';*/

  console.log(mainstring);
  mainstring = '';
}
