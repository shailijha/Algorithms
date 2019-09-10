function interest(bal,time,interest) {
  this.bal = bal;
  this.time = time * 12;
  this.interest = interest;
  this.calculateInterestv1 = calculateInterestv1;
}

function calculateInterestv1() {
    let new_bal = 0;
    for(let i = 0; i < this.time; i++) {
      new_bal = this.bal + ((this.bal * this.interest) / 100);
      new_bal *= 100;
      new_bal = Math.floor(new_bal);
      new_bal /= 100;
      this.bal = new_bal;
      //console.log('bal ',bal);
    }
    return new_bal;
}

function interestWithDeposit(bal,time, interest, deposit, dep_occur) {
  this.bal = bal;
  this.time = time * 12;
  this.interest = interest;
  this.deposit = deposit;
  this.dep_occur = dep_occur;
  this.calculateInterestv2 = calculateInterestv2;
}

function calculateInterestv2() {
    let new_bal = 0;
    for(let i = 0; i < this.time; i++) {
      new_bal = this.bal + ((this.bal * this.interest) / 100);
      new_bal *= 100;
      new_bal = Math.floor(new_bal);
      new_bal /= 100;
      //console.log('new_bal ',new_bal);
      if((i+1) % this.dep_occur == 0 && i > 0) {
        //console.log(i, dep_occur-1);
        new_bal += this.deposit;
      }

      this.bal = new_bal;
      //console.log('bal ',bal);
    }
    return new_bal;
}

function interestWithDepWthdrw(bal,time, interest, deposit, dep_occur, wthdrw, wthdrw_occur) {
  this.bal = bal;
  this.time = time * 12;
  this.interest = interest;
  this.deposit = deposit;
  this.dep_occur = dep_occur;
  this.wthdrw = wthdrw;
  this.wthdrw_occur = wthdrw_occur;
  this.calculateInterestv3 = calculateInterestv3;
}

function calculateInterestv3() {
  let new_bal = 0;
  for(let i = 0; i < this.time; i++) {
    if((i+1) % this.wthdrw_occur == 0 && i > 0) {
      //console.log('withdraw ',i+1,wthdrw_occur);
      this.bal -= this.wthdrw;
    }
    //console.log('bal after withdraw ',bal);
    new_bal = this.bal + ((this.bal * this.interest) / 100);
    new_bal *= 100;
    new_bal = Math.floor(new_bal);
    new_bal /= 100;
    //console.log('after interest ',new_bal);
    if((i+1) % this.dep_occur == 0 && i > 0) {
      //console.log('deposit ',i+1,dep_occur);
      new_bal += this.deposit;
    }

    this.bal = new_bal;
    //console.log('final bal ',bal);
  }
  return new_bal;
}

// console.log(calculateInterestv1(100,1,1));
// console.log(calculateInterestv2(100,1,1,100));
// console.log(calculateInterestv3(100,1,1,100,6));
// console.log(calculateInterestv4(1000,1,1,500,6,50,2));

var in1 = new interest(100,1,1);
console.log(in1.calculateInterestv1());
var in2 = new interestWithDeposit(100,1,1,100,6);
console.log(in2.calculateInterestv2());
var in3 = new interestWithDepWthdrw(1000,1,1,500,6,50,2);
console.log(in3.calculateInterestv3());
