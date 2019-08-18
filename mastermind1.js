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

const guess = "1014";
const code = "2315";

let count_char = 0;
let count_correct_posn = 0;

let cc_map = new Map();
let cp_map = new Map();

function masterMind(guess,code) {
  console.log(guess, code);
  console.log('cc_map and cp_map before');
  console.log(cc_map);
  console.log(cp_map);
  let guess_split = guess.split('');
  let code_split = code.split('');
  for(let num = 0;num < guess_split.length; num++) {
    for(let num1 = 0; num1 < code_split.length; num1++) {
      if(guess_split[num] === code_split[num1]) {
        // If pos doesn't matches
        if(num !== num1) {
          if(!cc_map.has(code_split[num1]) && !cp_map.has(code_split[num1])) {
            if(count_char == 0) {
              count_char += 1;
              cc_map.set(code_split[num1], count_char);
              //console.log('Not matching positions If')
              console.log(cc_map);
              console.log(cp_map);
              console.log(`position doesn't if if match cc=0, cp=0 guess and code ${guess_split} ${code_split}`);
            }
          }
          else if(cp_map.has(code_split[num1]))
          {
            let temp_count_char = cc_map.get(code_split[num1]);
            temp_count_char += 1;
            cc_map.set(code_split[num1], temp_count_char);
            //console.log('Not matching positions Else')
            console.log(cc_map);
            console.log(cp_map);
            console.log(`position doesn't match cc>0, cp>0 guess and code ${guess_split} ${code_split}`);
          }
          guess_split[num] = '';
          if(num > num1) {
            code_split[num1] = '';
          }
          //code_split[num1] = '';
          count_char = 0;
          console.log('If pos doesnt matches ', guess_split, code_split);
        }
        //If position matches
        else {
          if(!cc_map.has(code_split[num1]) && !cp_map.has(code_split[num1])) {
            count_char += 1;
            count_correct_posn += 1;
            cc_map.set(code_split[num1], count_char);
            cp_map.set(code_split[num1], count_correct_posn);
            //guess_split[num] = '';
            //code_split[num1] = '';
            //console.log('matching positions, cc=0, cp=0')
            console.log(cc_map);
            console.log(cp_map);
            console.log(`position matches cc=0, cp=0 guess and code ${guess_split} ${code_split}`);
          }
          else if(cc_map.get(code_split[num1]) > 0) {
            let temp_count_char = cc_map.get(code_split[num1]);
            temp_count_char += 1;
            cc_map.set(code_split[num1], temp_count_char);
            if(cp_map.get(code_split[num1]) == undefined) {
              count_correct_posn += 1;
              cp_map.set(code_split[num1], count_correct_posn);
              //console.log('matching positions, cc>0, cp=0')
              console.log(cc_map);
              console.log(cp_map);
              console.log(`position matches cc>0, cp=0 guess and code ${guess_split} ${code_split}`);
            }
            else {
              //let temp_count_char = cc_map.get(code_split[num1]);
              //temp_count_char += 1;
              //cc_map.set(code_split[num1], temp_count_char);
              let temp_count_posn = cp_map.get(code_split[num1]);
              temp_count_posn += 1;
              cp_map.set(code_split[num1], temp_count_posn);
              //console.log('matching positions, cc>0, cp>0')
              console.log(cc_map);
              console.log(cp_map);
              console.log(`position matches cc>0, cp>0 guess and code ${guess_split} ${code_split}`);
            }
          }
          guess_split[num] = '';
          code_split[num1] = '';
          console.log('Else posn matches ',guess_split, code_split);
          count_char = 0;
          count_correct_posn = 0;
        }
      }
    }
  }
  //console.log(`${count_char}  ${count_correct_posn}`);
  //console.log(cc_map);
  //console.log(cp_map);

  for(const v of cc_map.values()) {
    count_char += v;
  }

  for(const v of cp_map.values()) {
    count_correct_posn += v;
  }

  console.log(`No. of characters that match: ${count_char}  No. of characters that match and are in the
    right position:${count_correct_posn}`);
}

masterMind(guess,code);
