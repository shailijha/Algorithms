const base = new Array();

//use parseInt() function to find the representation of the number in a base.
function populateBases() {
  for(let i=2;i<=10;i++) {
    base.push(i);
  }
}

//write a function to generate all primes below 100
function primeFactorsTo(max)
{
    var store  = [], i, j, primes = [];
    for (i = 2; i <= max; ++i)
    {
        if (!store [i])
          {
            primes.push(i);
            for (j = i << 1; j <= max; j += i)
            {
                store[j] = true;
            }
        }
    }
    return primes;
}

let primes_below_100 = new Array();

//function to replace a character at a specific index of a string since there is no built-in function in JS
function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}

//function to generate all possible combinations of 0 & 1. Pushes 1 in the beginning and end, makes n-2
//characters ?. initial string is pushed into queue. Extracted to find the index of ? which is replaced by
//0 & 1 and these new temp_str are pushed into que. Continues until que is empty and all the ? are replaced
//by 0 or 1. these are then stored in final_que

function generatePossibleNumbers(n) {
  let temp_str = '';
  temp_str+='1';
  for(let i = 0; i < n-2; i++) {
    temp_str+='?';
  }
  temp_str+='1';
  //console.log(temp_str);

  let temp_que = new Array();
  let final_que = new Array();

  temp_que.push(temp_str);

  while(temp_que.length!==0) {
    let temp_var = temp_que.pop();
    let index = temp_var.indexOf('?');
    if(index!=-1) {
      temp_var = setCharAt(temp_var,index,'0');
      temp_que.push(temp_var);

      temp_var = setCharAt(temp_var,index,'1');
      temp_que.push(temp_var);
    }
    else {
        final_que.push(temp_var);
    }
    console.log('hi');
//10000000000000000000000000000001
  }
  //console.log(final_que);
  return final_que;
}

//To check if the number is Prime, find the square root, find all prime numbers up until the sq.root and
//check to see if the given number divides evenly by any of them, If yes, return false. Else return true
function checkPrime(number) {
  //check if the number is part of primes_below_100
  if(number%2==0 || number%3==0 || number%7==0) {
    return false;
  }
  else if(primes_below_100.indexOf(number)!=-1) {
    return true;
  }
  else {
    let sq_root = Math.sqrt(number);
    //console.log(`sqroot of ${number}:${sq_root}`);

    //helper function for findIndex() JS function
    function largestPrime(val) {
      return val>sq_root
    }

    //get all the numbers below sq_root from the prime array and check against them
    let largestPrimeIndex = primes_below_100.findIndex(largestPrime);
    let candidates = primes_below_100.slice(0,largestPrimeIndex);

    for(let num = 0; num < candidates.length; num++) {
      if(number%candidates[num]==0) {
        return false;
      }
    }
  }

  return true;
}

/*1. the search space for the for loop is 2^(n-2)
2.find out if the number is a prime number in each of the base. If yes, then it is not a jamcoin. Use
the square root function and the primes below it to speed up the process
3.find out the prime factorization of the number after representing it in each of the bases and have an array
that keeps track of the non-trivial divisors
4.Find all the primes below 100 by seive of erathoneses*/

function coinjam(t,n,j) {
  if(t==1) {
    let final_result = new Array();
    populateBases();

    primes_below_100 = primeFactorsTo(100);

    let all_strings = generatePossibleNumbers(n);
    //console.log('all_strings ',all_strings);
    let possible_candidates = new Array();
    for(let i = 0; i < all_strings.length; i++) {
      let count = 0;
      let candidate = all_strings[i];
      //console.log('candidate ',candidate);
      for(let num = 0; num < base.length; num++) {
        //console.log(`candidate,base[num],count: ${candidate} ${base[num]} ${count}`);
        let temp_val = parseInt(candidate,base[num]);
        if(!checkPrime(temp_val) && count<8) {
          count+=1;
          continue;
        }
        if(count==8) {
          possible_candidates.push(candidate);
        }
      }
    }

    if(possible_candidates.length == 0) {
      console.log('There are no jamcoins that satisfy the condition');
    }
    else {
      //console.log(possible_candidates);
      final_result = findPrimeFactorization(possible_candidates,j);
    }

    let result_str = `Case #${test_case}: \n`;
    for(let i = 0; i < final_result.length; i++) {
      result_str += `${final_result[i].join(' ')} \n`;
    }
    return result_str;
  }
  else {
    console.log('Invalid number of test cases');
  }
}


//1.convert the number into all bases.
//2.find the prime factorization of the candidate in that base and if it doesn't leave a remainder
//then it is a valid jamcoin
function findPrimeFactorization(possible_candidates,j) {
  let final_result = new Array();
  for(let i = 0; i < possible_candidates.length; i++)
  {
    let factors = new Array();
    let candidate = possible_candidates[i];
    for(let idx = 1; idx <= 9; idx++)
    {
      let temp_val = parseInt(candidate,idx+1);
      let sq_root = Math.floor(Math.sqrt(temp_val));
      //console.log(`${candidate} in base ${idx+1} is ${temp_val} and the sqrt is ${sq_root}`);
      for(let num = 2;num <= sq_root; num++) {
        if(temp_val % num == 0) {
          //console.log(`${temp_val}/${num}:${Math.floor(temp_val/num)}`);
          //factors.push(num);
          factors.push(Math.floor(temp_val/num));
          break;
        }
      }
    }
    if(final_result.length < j && factors.length == 9) {
      //console.log(`The factors of ${candidate} are ${factors}`);
      final_result.push([candidate,...factors]);
    }
  }
  //console.log(final_result);
  return final_result;
}

const test_case = 1;
// n represents the length of the jamcoin
const n = 32;
//j represents the number of different jamcoins
const j = 500;

console.log(coinjam(test_case,n,j));
/*1. n=16/j=50 takes 20 seconds to run
2. n=32/j=500 gives FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out
of memory*/
