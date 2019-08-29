



  /*function to check the validity of edge cards. Keeps generating random index to swap with until it
  finds a card that is not of the same index or not one of the invalid cards*/
  static checkValidity(card,index) {
    console.log('checking card', card);
    if(Deck.checkInvalid(card.value)) {
      console.log('card was found as invalid')
      let randIdx = Deck.generateRandomCardIndex();
      while(randIdx == index) {
        randIdx = Deck.generateRandomCardIndex();
        while(Deck.checkInvalid(deck[randIdx].value)) {
          randIdx = Deck.generateRandomCardIndex();
        }
      }
      console.log(`values before swapping in ${index} card`);
      console.log(deck[index],deck[randIdx]);
      let temp = deck[randIdx];
      deck[randIdx] = card;
      deck[index] = temp;
      console.log(`values after swapping in ${index} card`);
      console.log(deck[index],deck[randIdx]);
    } else {
      console.log(card,` is a valid card`);
    }
  }

  /*function to check the deck after swapping. Calls checkValidity for the edge cards until they
  aren't [1,2,6,7]*/
  static checkDeck() {
    let firstCard = deck[0];
    let secondCard = deck[1];
    let thirdCard = deck[2];
    let lastoneoneCard = deck[51];
    let lastoneCard = deck[52];
    let lastCard = deck[53];
    console.log(firstCard);console.log(secondCard);console.log(thirdCard);
    console.log(lastoneoneCard);console.log(lastoneCard);console.log(lastCard);
    //console.log(Deck.checkInvalid(firstCard.value));console.log(Deck.checkInvalid(secondCard.value));
    //console.log(Deck.checkInvalid(lastoneCard.value));console.log(Deck.checkInvalid(lastCard.value));
     while(Deck.checkInvalid(firstCard.value) && Deck.checkInvalid(secondCard.value) && Deck.checkInvalid(thirdCard.value)) {
      Deck.checkValidity(firstCard,0);
      Deck.checkValidity(secondCard,1);
      Deck.checkValidity(thirdCard,2);
      firstCard = deck[0];
      secondCard = deck[1];
      thirdCard = deck[2];
     }

    while(Deck.checkInvalid(lastoneoneCard.value) && Deck.checkInvalid(lastoneCard.value) && Deck.checkInvalid(lastCard.value)) {
      Deck.checkValidity(lastoneoneCard,51);
      Deck.checkValidity(lastoneCard,52);
      Deck.checkValidity(lastCard,53);
      lastoneoneCard = deck[51];
      lastoneCard = deck[52];
      lastCard = deck[53];
    }
  }

  //function to pick random card index
  static generateRandomCardIndex() {
    return Math.floor(Math.random() * Math.floor(maxCard));
    //return Math.floor(Math.random() * (+max - +min)) + +min;
  }
