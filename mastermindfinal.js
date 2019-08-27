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


//soluttion - check if there is a num matching it above that character. if yes, then skip that char coz you are going
//to encounter it later on.

const guess = "1122";
const code = "1212";

let count_char = 0;
let count_correct_posn = 0;

let cc_map = new Map();
let cp_map = new Map();

function masterMind(guess,code) {
  let guess_split = guess.split('');
  let code_split = code.split('');
  //console.log(`guess_split: ${guess_split}, code_split: ${code_split}`);
  for(let num = 0; num < guess_split.length; num ++) {
    for(let num1 = 0; num1 < code_split.length; num1++) {
      if(guess_split[num] === code_split[num1]) {
        if(num !== num1) {
          //console.log(cp_map.has(code_split[num1]));
          if(cc_map.has(code_split[num1])) {
            guess_split[num] = '';
          }
          else if(!cc_map.has(code_split[num1]) && !cp_map.has(code_split[num1])) {
            count_char += 1;
            cc_map.set(code_split[num1], count_char);
            guess_split[num] = '';
            console.log(`POSITION DOESN'T MATCH IF guess_split: ${guess_split} code_split: ${code_split}`);
            console.log(cc_map);console.log(cp_map);
            console.log();
          }
          else if(cc_map.has(code_split[num1]) && !cp_map.has(code_split[num1]) && num > num1) {
            code_split[num1] = '';
          }
          else if(cc_map.has(code_split[num1]) && cp_map.has(code_split[num1])) {
            let temp_count_char = cc_map.get(code_split[num1]);
            temp_count_char += 1;
            cc_map.set(code_split[num1], temp_count_char);
            guess_split[num] = '';
            console.log(`POSITION DOESN'T MATCH ELSE IF guess_split: ${guess_split} code_split: ${code_split}`);
            console.log(cc_map);console.log(cp_map);
            console.log();
          }
          count_char = 0;
        }
        else if(num === num1) {
          if(!cc_map.has(code_split[num1]) && !cp_map.has(code_split[num1])) {
            count_char += 1;
            count_correct_posn += 1;
            cc_map.set(code_split[num1], count_char);
            cp_map.set(code_split[num1], count_correct_posn);
            code_split[num1] = ''; guess_split[num] = '';
            console.log(`POSITION MATCHES IF guess_split: ${guess_split} code_split: ${code_split}`);
            console.log(cc_map);console.log(cp_map);
            console.log();
          }
          else if(cc_map.has(code_split[num1]) && !cp_map.has(code_split[num1])) {
            count_correct_posn += 1;
            cp_map.set(code_split[num1], count_correct_posn);
            let temp_count_char = cc_map.get(code_split[num1]);
            if(temp_count_char == cp_map.get(code_split[num1])) {
                cc_map.set(code_split[num1], temp_count_char+=1);
            }
            code_split[num1] = ''; guess_split[num] = '';
            console.log(`POSITION MATCHES ELSE IF 1 guess_split: ${guess_split} code_split: ${code_split}`);
            console.log(cc_map);console.log(cp_map);
            console.log();
          }
          else if(cc_map.has(code_split[num1]) && cp_map.has(code_split[num1])) {
            let temp_count_char = cc_map.get(code_split[num1]);
            let temp_count_posn = cp_map.get(code_split[num1]);
            temp_count_char += 1;
            temp_count_posn += 1;
            cc_map.set(code_split[num1], temp_count_char);
            cp_map.set(code_split[num1], temp_count_posn);
            code_split[num1] = ''; guess_split[num] = '';
            console.log(`POSITION MATCHES ELSE IF 2 guess_split: ${guess_split} code_split: ${code_split}`);
            console.log(cc_map);console.log(cp_map);
            console.log();
          }
          count_char = 0;
          count_correct_posn = 0;
        }
      }
    }
  }
  console.log('cc_map final');console.log(cc_map);console.log('cp_map final');console.log(cp_map);
  //console.log(count_char);
  //console.log(`guess_split: ${guess_split}, code_split: ${code_split}`);
}

masterMind(guess,code);
