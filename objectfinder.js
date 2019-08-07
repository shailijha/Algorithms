const input = [{name: 'Shaili', age: 32}, {name: 'Shaili1', age: 31}, {name: 'Shaili1', age: 31}, {name: 'Shaili2', age: 30}, {name: 'Shaili3', age: 29}];

const input1 = [{name: 'Cliff', age: 32}, {name: 'John', age: 25}, {name: 'Andy', age: 21}, {name: 'Mary', age: 32}, {name: 'Sally', age: 25}]

const key = 'age';

const value = 31;

const value1 = 25;

function objectfinder(input, key, value) {
  let found_index = -1;
  for(let i=0; i<input.length; i++) {
    if(input[i][key] == value) {
      found_index = i;
      break;
    }
  }
  if(found_index!=-1)
    console.log(found_index);
  else
    console.log('The given key value is not present in the array');
}

function objectfinderaddln1(input, key, value) {
  let found_index_array = new Array();
  for(let i=0; i<input.length; i++) {
    if(input[i][key] == value) {
      found_index_array.push(i);
    }
  }
  if(found_index_array.length==0)
    console.log('The given key value is not present in the array');
  else
    console.log(found_index_array);
}

objectfinder(input,key,value);
objectfinder(input1,key,value);
objectfinderaddln1(input,key,value);
objectfinderaddln1(input1,key,value);

objectfinder(input1,key,value1);
objectfinder(input1,key,value);
objectfinderaddln1(input1,key,value1);
objectfinderaddln1(input1,key,value);
