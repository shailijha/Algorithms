/*function takes in a guess, code. compare the guess against the code and return [int,int]
arr[0] represents the number of correct chars in the code. arr[1] is the no. of items in the
correct position
1.0 only return matching items
1.1 return the matching items and posn.
1.2 accept an 8 char code;accept any numerical values
2.0 create an encompassing function that tracks no. of guesses and returns game over when it exceeds
the number of guesses
2.1 return true if the guess is correct*/

const guess = '1122';
const code = '1212';

function masterMind(guess,code) {
  let char_count = 0;
  let posn_count = 0;
  let guess_split = guess.split('');
  let code_split = code.split('');
  for(let i = 0; i < guess_split.length; i++) {
    for(let j = 0; j < code_split.length; j++) {
      //console.log(`i and j is ${i},${j}. chars compared are ${guess_split[i]},${code_split[j]}`);
      //console.log(guess_split, code_split);
      if(guess_split[i] == code_split[j] && i == j && guess_split[i]!='') {
        char_count++;
        posn_count++;
        guess_split[i] = code_split[j] = '';
      }
      else if(guess_split[i] == code_split[j] && (i < j || i > j) && guess_split[i]!='') {
        if(code_split[j] == guess_split[j]) {
          guess_split[i] = '';
        }
        else {
          char_count++;
          guess_split[i] = code_split[j] = '';
        }
      }

      //console.log(`char_count and posn_count is ${char_count},${posn_count}`);
      //console.log();
    }
  }
  console.log(char_count);
  console.log(posn_count);
  console.log(guess_split, code_split);
}

masterMind(guess,code);
