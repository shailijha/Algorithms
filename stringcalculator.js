/*input from the user is a string which has numbers and mathematical operators
1.0 extract the numbers and 1 operator. Evaluate the equation. There is a space after every character. + - x / %
1.1 accept multiple numbers and operators. Not necessary to implement PEMDAS
1.2 apply MDAS
1.3 take 2nd parameter from the user which is the base. convert into that base,calculate the result
and return it in decimal format
1.4 return result of 1.3 in the base system.*/

const input_string = '5 x 10';
const input_string1 = '10 + 5 x 10 - 6';
const input_string2 = '10 + 20 x 30 / 10 % 55 - 6';
const input_string3 = '10 x 20 / 4 % 39 - 10 + 6';
const input_string4 = '3 x 10';

function tempCalculation(split_string,idx) {
  let operator = split_string[idx];
  let num1 = parseInt(split_string[idx-1]);
  let num2 = parseInt(split_string[idx+1]);
  let result = calculate(operator,num1,num2);
  //console.log(`${num1} ${operator} ${num2} = ${result}`);
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

//version 1.0
function stringCalculatorv1(input_string) {
  let split_string = input_string.split(' ');
  let num1 = parseInt(split_string[0]);
  let num2 = parseInt(split_string[2]);
  let operator = split_string[1];
  return calculate(operator,num1,num2);
}

//version 1.1
function stringCalculatorv2(input_string) {
  let split_string = input_string.split(' ');
  let idx = 0;
  while(idx < split_string.length && split_string.length > 1) {
    if(split_string[idx] == '+' || split_string[idx] == '-' || split_string[idx] == '/' || split_string[idx] == 'x' || split_string[idx] == '%') {
      split_string = tempCalculation(split_string,idx);
    }
    else {
      idx++;
      continue;
    }
  }
  return split_string;
}

//version 1.2
function stringCalculatorv3(input_string) {
  let split_string = input_string.split(' ');
  let idx = 0;
  while(idx<split_string.length)
  {
    if(split_string[idx]=='/' || split_string[idx]=='x' || split_string[idx]=='%') {
      split_string = tempCalculation(split_string,idx);
      //console.log('Group 1: ',split_string);
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
        //console.log('Group 2: ',split_string);
        continue;
      }
      else {
        idx++;
        continue;
      }
    }
  return split_string;
}

//version 1.3
//if it encounters a number, change it into the base and then do the calculation
function stringCalculatorv4(input_string,radix) {
  //split_string[idx] != '+' || split_string[idx] != '-' || split_string[idx] != '/' || split_string[idx] != 'x' || split_string[idx] != '%'
  let split_string = input_string.split(' ');
  let idx = 0;
  for(idx;idx < split_string.length; idx++) {
    if(!isNaN(parseInt(split_string[idx]))) {
      console.log(split_string[idx]);
      let base_conversion = parseInt(split_string[idx],radix);
      console.log('base_conversion ',base_conversion);
      split_string[idx] = base_conversion;
    }
  }

  idx = 0;

  while(idx < split_string.length && split_string.length > 1) {
    if(split_string[idx] == '+' || split_string[idx] == '-' || split_string[idx] == '/' || split_string[idx] == 'x' || split_string[idx] == '%') {
      split_string = tempCalculation(split_string,idx);
    }
    else {
      idx++;
      continue;
    }
  }

  return split_string;
}

console.log(`Version 1.0: ${input_string} = ${stringCalculatorv1(input_string)}`);
console.log(`Version 1.1: ${input_string1} = ${stringCalculatorv2(input_string1)}`);
console.log(`Version 1.2: ${input_string1} = ${stringCalculatorv3(input_string1)}`);
console.log(`Version 1.2: ${input_string2} = ${stringCalculatorv3(input_string2)}`);
console.log(`Version 1.2: ${input_string3} = ${stringCalculatorv3(input_string3)}`);
console.log(`Version 1.3: ${input_string4} = ${stringCalculatorv4(input_string4,4)}`);
