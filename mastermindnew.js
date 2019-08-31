/*function takes in a guess, code. compare the guess against the code and return [int,int]
arr[0] represents the number of correct chars in the code. arr[1] is the no. of items in the
correct position
1.0 only return matching items
1.1 return the matching items and posn.
1.2 accept an 8 char code;accept any numerical values
2.0 create an encompassing function that tracks no. of guesses and returns game over when it exceeds
the number of guesses
2.1 return true if the guess is correct*/

const guess = '1014';
const code = '1212';

function masterMind(guess,code) {
  /*let char_count = 0;
  let posn_count = 0;*/
  let count = [0,0];
  let guess_split = guess.split('');
  let code_split = code.split('');

  for(let i = 0; i < guess_split.length; i++) {
    for(let j = 0; j < code_split.length; j++) {
      if(guess_split[i] == code_split[j] && i == j && guess_split[i]!='') {
        count[0]++;
        count[1]++;
        guess_split[i] = code_split[j] = '';
      }
      else if(guess_split[i] == code_split[j] && (i < j || i > j) && guess_split[i]!='') {
        if(code_split[j] == guess_split[j]) {
          guess_split[i] = '';
        }
        else {
          count[0]++;
          guess_split[i] = code_split[j] = '';
        }
      }
    }
  }
  return count;
}

function playGame() {
  let num_guesses = 10;
  let guess_num = 0;
  let flag = true;
  console.log(`The code is comprised of 4 numerical characters.You have ${num_guesses} guesses.`)
  while(num_guesses > 0 && flag) {
    if(num_guesses == 0) {
      break;
    }
    var readlineSync = require('readline-sync');
    let guess = readlineSync.question(`Please enter your guess `);
    let result = masterMind(guess,code);
    if(result[0] == 4 && result[1] == 4) {
      flag = false;
      console.log(`Congratulations! :) You won the game in ${guess_num+1} turn(s)`)
      break;
    }
    num_guesses--;
    guess_num++;
    console.log(`You got ${result[0]} character(s) right.You got ${result[1]} character(s) right in the right position`);
    console.log(`You have ${num_guesses} guesses left`);
    console.log();
  }
  if(num_guesses == 0) {
    console.log('You are out of guesses. You lost :(');
  }
}

playGame();
