/*function takes in a guess, code. compare the guess against the code and return [int,int]
arr[0] represents the number of correct chars in the code. arr[1] is the no. of items in the
correct position
1.0 only return matching items
1.1 return the matching items and posn.
1.2 accept an 8 char code;accept any numerical values
2.0 create an encompassing function that tracks no. of guesses and returns game over when it exceeds
the number of guesses
2.1 return true if the guess is correct*/

const guess = "1122";
const code = "1321";

let count_char = 0;
let count_correct_posn = 0;

let result_map = new Map();

function masterMind(guess,code) {
  let guess_split = guess.split('');
  let code_split = code.split('');
  for(let num=0;num<guess_split.length;num++) {
    for(let num1=0;num1<code_split.length;num1++) {
      if(guess_split[num] === code_split[num1]) {
        if(num !== num1) {
          if(!result_map.has(code_split[num1])) {
            count_char+=1;
          }
          result_map.set(code_split[num1],count_correct_posn);
          //code_split[num1]='';
          guess_split[num]='';
          //console.log('map if index doesn\'t match ',result_map);
        }
        else if(num === num1) {
          if(result_map.has(code_split[num1]))
          {
            count_correct_posn+=1;
            //console.log(`if ${code_split[num1]}: ${count_correct_posn}`);
            result_map.set(code_split[num1],count_correct_posn);
          }
          else {
            count_char+=1;
            count_correct_posn=1;
            //console.log(`else ${code_split[num1]}: ${count_correct_posn}`);
            result_map.set(code_split[num1],count_correct_posn);
          }
          guess_split[num]='';
          code_split[num1]='';
          //console.log('map if index matches ',result_map);
        }
      }
    }
  }
  console.log(`The number of matching characters in the code are ${count_char}`);
  console.log(result_map);
  let keys = result_map.keys();
  count_correct_posn = 0;
  console.log(`result_map.length ${result_map.size}`);
  console.log('keys ',keys);
  if(result_map.size == 1) {
    count_correct_posn += result_map.get(keys.next().value);
  }
  else {
      while(keys.next().value) {
        count_correct_posn += result_map.get(keys.next().value);
        //continue;
      }
    }
  console.log(`The number of matching characters in the correct position in the code are ${count_correct_posn}`);
}

masterMind(guess,code);
