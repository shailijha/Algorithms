function calculateInterestv1(bal, time, interest) {
  let time_in_months = time * 12;
  let new_bal = 0;
  for(let i = 0; i < time_in_months; i++) {
    new_bal = bal + ((bal * interest) / 100);
    new_bal *= 100;
    new_bal = Math.floor(new_bal);
    new_bal /= 100;
    bal = new_bal;
    //console.log('bal ',bal);
  }
  return new_bal;
}

function calculateInterestv2(bal,time, interest, deposit) {
  let time_in_months = time * 12;
  let new_bal = 0;
  for(let i = 0; i < time_in_months; i++) {
    new_bal = bal + ((bal * interest) / 100);
    new_bal *= 100;
    new_bal = Math.floor(new_bal);
    new_bal /= 100;
    //console.log('new_bal ',new_bal);
    new_bal += deposit;
    bal = new_bal;
    //console.log('bal ',bal);
  }

  return new_bal;
}

function calculateInterestv3(bal,time, interest, deposit, dep_occur) {
  let time_in_months = time * 12;
  let new_bal = 0;
  for(let i = 0; i < time_in_months; i++) {
    new_bal = bal + ((bal * interest) / 100);
    new_bal *= 100;
    new_bal = Math.floor(new_bal);
    new_bal /= 100;
    console.log('new_bal ',new_bal);
    if(i % dep_occur) {
      new_bal += deposit;
    }

    bal = new_bal;
    console.log('bal ',bal);
  }

  return new_bal;
}

//add new params withdrawal and withdrawal occurence. Withdrawals are applied pre-interest. Return new bal
function calculateInterestv4(bal,time, interest, deposit, dep_occur, wthdrw, wthdrw_occur) {
  let time_in_months = time * 12;
  let new_bal = 0;
  for(let i = 0; i < time_in_months; i++) {
    new_bal = bal + ((bal * interest) / 100);
    new_bal *= 100;
    new_bal = Math.floor(new_bal);
    new_bal /= 100;
    console.log('new_bal ',new_bal);
    if(i % dep_occur) {
      new_bal += deposit;
    }

    bal = new_bal;
    console.log('bal ',bal);
  }

  return new_bal;
}

//console.log(calculateInterestv1(100,1,1));
//console.log(calculateInterestv2(100,1,1,100));
console.log(calculateInterestv3(100,1,1,100,6));
