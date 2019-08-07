const input_string = '10 + 20 x 30 / 10 % 55 - 6';

function stringCalculatorv3(input_string) {
  let split_string = input_string.split(' ');
  let idx = 0;
  while(idx<split_string.length)
  {
    if(split_string[idx]=='/' || split_string[idx]=='x' || split_string[idx]=='%') {
      split_string = tempCalculation(split_string,idx);
      console.log('Group 1: ',split_string);
    }
    else {
      idx++;
      continue;
    }
  }
    idx=0;
    while(split_string.length>1) {
      if(split_string[idx]=='+' || split_string[idx]=='-'){
        split_string = tempCalculation(split_string,idx);
        console.log('Group 2: ',split_string);
        continue;
      }
      else {
        idx++;
        continue;
      }
    }
}

function tempCalculation(split_string,idx) {
  let operator = split_string[idx];
  let num1 = parseInt(split_string[idx-1]);
  let num2 = parseInt(split_string[idx+1]);
  let result = calculate(operator,num1,num2);
  console.log(`${num1} ${operator} ${num2} = ${result}`);
  let temp_arr1 = split_string.slice(0,idx-1);
  let temp_arr2 = split_string.slice(idx+2);
  split_string = [];
  split_string.push(...temp_arr1);
  split_string.push(result);
  split_string.push(...temp_arr2);
  return split_string;
}

function calculate(operator,num1,num2) {
  switch(operator) {
    case '+':
      return num1+num2;
      break;
    case '-':
      return num1-num2;
      break;
    case 'x':
      return num1*num2;
      break;
    case '/':
      return num1/num2;
    case '%':
      return num1%num2;
      break;
    default:
      console.log('Not a valid operator');
      break;
  }
}

stringCalculatorv3(input_string);
