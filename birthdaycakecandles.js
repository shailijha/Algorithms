//why doesn't sort function in js work for numbers?
const ar = [18,90,90,13,90,75,90,8,90,43];
const ar1 = [44,53,31,27,77,60,66,77,26,36];

let ar3 = new Array();

function populateArray() {
  let j = 0;
  console.log('j ',j);
  while(j < 99999)
  {
    ar3.push(1000);
    j += 1;
    //console.log('j ',j);
  }
  ar3.push(100);
  //console.log('array in populateArray ',ar3);
}

function birthdayCakeCandles(ar) {
    /*let size = ar.length;
    let maximum = ar[0];
    let blownCandles = 0;
    for (let i = 0; i+1 < size; i++) {
      console.log(maximum, ar[i+1], maximum <= ar[i + 1]);
        if (maximum <= ar[i + 1]) {
            maximum = ar[i+1];
            blownCandles += 1;
            console.log(`maximum: ${maximum},blownCandles: ${blownCandles}`);
        }
    }
    //console.log(blownCandles);
    return blownCandles;*/
    populateArray();
    let size = ar.length;
    ar.sort();
    //console.log('sorted array ',ar);
    let maximum = ar[size-1];
    let blownCandles = 1;
    for (let i = 0; i < size-1; i++) {
      if(ar[i] == maximum)
      {
        blownCandles += 1;
      }
    }
    console.log(blownCandles);
    return blownCandles;
}
//console.log('array ',ar3);
console.log(birthdayCakeCandles(ar3));
