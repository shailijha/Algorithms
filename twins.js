let arr = [];

const min = -1000;
const max = 1000;

function generateRandom() {
    return Math.floor(Math.random() * (max - min) + min);
}

function populateArray(length) {
  //let length = 100;
  for(let i = 0; i < length; i++) {
    arr.push(generateRandom());
  }
}

function twins(arr) {
  let twins = [];
  for(let i = 0;i < arr.length; i++) {
    //for(let j = i+1; j < arr.length; j++) {
      //if(arr[i]+arr[j] == 0) {
      if(arr.indexOf(arr[i] * -1) > -1) {
        let j = arr.indexOf(arr[i] * -1);
        twins.push({index: i,value:arr[i]});
        twins.push({index:j, value:arr[j]});
        arr.splice(i,1);
        arr.splice(j,1);
      }
      //}
    //}
  }
  //console.log(twins);
  if(twins.length > 0) {
      return `There are ${twins.length/2} twins in the given array`;
  } else {
    return 'No twins found';
  }
}
var start = new Date().getTime();
populateArray(1000000);
//console.log(arr);
console.log(twins(arr));

var end = new Date().getTime();
var time = end - start;
console.log(`Execution time: ${time} ms`);
