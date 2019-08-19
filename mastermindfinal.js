/*function takes in a guess, code. compare the guess against the code and return [int,int]
arr[0] represents the number of correct chars in the code. arr[1] is the no. of items in the
correct position
1.0 only return matching items
1.1 return the matching items and posn.
1.2 accept an 8 char code;accept any numerical values
2.0 create an encompassing function that tracks no. of guesses and returns game over when it exceeds
the number of guesses
2.1 return true if the guess is correct
Ask the answer for 1014 and 2315*/

const guess = "55555";
const code = "12359";

let count_char = 0;
let count_correct_posn = 0;

let cc_map = new Map();
let cp_map = new Map();

function masterMind(guess,code) {
  let guess_split = guess.split('');
  let code_split = code.split('');
  console.log(`guess_split: ${guess_split}, code_split: ${code_split}`);
  
  console.log('cc_map final');console.log(cc_map);console.log('cp_map final');console.log(cp_map);
  //console.log(`guess_split: ${guess_split}, code_split: ${code_split}`);
}

masterMind(guess,code);
