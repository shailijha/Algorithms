const guess = "1122";
const code = "1212";

function masterMind(guess,code) {
  let guess_split = guess.split('');
  let code_split = code.split('');
  let cc_counter = 0;
  let cp_counter = 0;
  let cc_map = new Map();
  let cp_map = new Map();
  //console.log(guess_split, code_split);
  for(let num = 0; num < guess_split.length; num++) {
    for(let num1 = 0; num1 < code_split.length; num1++) {
      if(guess_split[num] === code_split[num1]) {
        //if positions do not match
        if(num !== num1) {
          if(cc_map.has(code_split[num1])) {
            if(num > num1) {
              guess_split[num] = '';
              code_split[num1] = '';
            }
            if(guess_split[num1] === code_split[num1] && num < num1) {
              guess_split[num] = '';
            }
            else if(guess_split[num1] !== code_split[num1] && num < num1) {
              let temp_count = cc_map.get(code_split[num1]);
              temp_count += 1;
              cc_map.set(code_split[num1], temp_count);
              guess_split[num] = '';
            }
            //let temp_count = cc_map.get(code_split[num1]);
            //temp_count += 1;
            //cc_map.set(code_split[num1], temp_count);
            console.log('POSITIONS DON\'T MATCH IF');
            console.log(cc_map);
            console.log(cp_map);
            console.log(guess_split, code_split);
          } else if(!cc_map.has(code_split[num1]) && !cp_map.has(code_split[num1])) {
            cc_counter++;
            cc_map.set(code_split[num1], cc_counter);
            guess_split[num] = '';
            console.log('POSITIONS DON\'T MATCH ELSE IF');
            console.log(cc_map);
            console.log(cp_map);
            console.log(guess_split, code_split);
          }
          cc_counter = 0;
        }
        //if positions match
        else if(num === num1) {
          if(!cc_map.has(code_split[num1]) && !cp_map.has(code_split[num1])) {
            cc_counter++;
            cp_counter++;
            cc_map.set(code_split[num1], cc_counter);
            cp_map.set(code_split[num1], cp_counter);
            guess_split[num] = code_split[num1] = '';
            console.log('POSITIONS MATCH IF');
            console.log(cc_map);
            console.log(cp_map);
            console.log(guess_split, code_split);
          }
          else if(cc_map.has(code_split[num1]) && cp_map.has(code_split[num1])) {
            let temp_count = cc_map.get(code_split[num1]);
            let temp_posn = cp_map.get(code_split[num1]);
            temp_count++; temp_posn++;
            cc_map.set(code_split[num1], temp_count);
            cp_map.set(code_split[num1], temp_posn);
            guess_split[num] = code_split[num1] = '';
            console.log('POSITIONS MATCH ELSE IF1');
            console.log(cc_map);
            console.log(cp_map);
            console.log(guess_split, code_split);
          }
          else if(cc_map.has(code_split[num1]) && !cp_map.has(code_split[num1])) {
            cp_counter++;
            cp_map.set(code_split[num1], cp_counter);
            guess_split[num] = code_split[num1] = '';
            console.log('POSITIONS MATCH ELSE IF2');
            console.log(cc_map);
            console.log(cp_map);
            console.log(guess_split, code_split);
          }
          cc_counter = cp_counter = 0;
        }
      }
    }
  }
  //console.log(cc_counter);
  console.log('final map')
  console.log(cc_map);
  //console.log(cp_counter);
  console.log(cp_map);
  console.log(guess_split, code_split);
}

masterMind(guess,code);
