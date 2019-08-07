let a = [2,1,2,1,2,1];

let firstIndexDup1 = 0;
let firstIndexDup2 = 0;
let secondIndexDup1 = 0;
let secondIndexDup2 = 0;
let count = 0;
var dup1,dup2;

for(i=0;i<a.length;i++) {
  for(j=i+1;j<a.length;j++) {
        if(a[i]==a[j])
        {
          if(count==0) {
            firstIndexDup1 = a.indexOf(a[i]);
            secondIndexDup1 = a.indexOf(a[i],i+1);
            dup1=a[i];
            count++;
          }
          else if(count==1) {
            firstIndexDup2 = a.indexOf(a[i]);
            secondIndexDup2 = a.indexOf(a[i],i+1);
            dup2=a[i];
            count++;
          }
        }
  }
}
console.log(firstIndexDup1,'',secondIndexDup1,firstIndexDup2,'',secondIndexDup2);

if(secondIndexDup1<secondIndexDup2) {
  console.log('The first occurence of duplicate is ',dup1);
}
else
  console.log('The first occurence of duplicate is ',dup2);
