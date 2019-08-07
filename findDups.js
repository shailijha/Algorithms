let findDups = new Map();

const constVal = 0;
let dups = false;

for(let num=0;num<a.length;num++) {
  if(findDups.has(a[num]))
  {
    //console.log(findDups);
    console.log('The first duplicate in the array is:',a[num]);
    break;
  }
  else {
    findDups.set(a[num],constVal);
    dups = false;
  }
}

if(!dups) {
  console.log('There are no duplicates in the present array');
}
