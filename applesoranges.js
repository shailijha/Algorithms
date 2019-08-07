//start and end positions of the house
let s = 7;
let t = 11;

//coordinate of the apple and orange tree
const a = 5;
const b = 15;

//apple and orange array
let apples = [-2,2,1];
let oranges = [5,-6];

//counter for apple and oranges
let countApple = 0;
let countOranges = 0;

function countApplesAndOranges(s,t,a,b,apples,oranges) {
  //determining the number of apple and orange
  let loop_limit = 0;

  if(apples.length > oranges.length)
    loop_limit = apples.length;
  else
    loop_limit = oranges.length;

  for(let num = 0; num < loop_limit; num++) {
    if(apples[num]!=null) {
      let apple_posn = a+apples[num];
      if(apple_posn >= s && apple_posn <= t) {
        //console.log(apple_posn);
        countApple+=1;
      }
    }


    if(oranges[num]!=null) {
      let orange_posn = b+oranges[num];

      if(orange_posn >= s && orange_posn <= t) {
        //console.log(orange_posn);
        countOranges+=1;
      }
    }
  }

  /*for(let a_num = 0;a_num<apples.length;a_num++) {
    let apple_posn = a+apples[a_num];
    if(apple_posn >= s && apple_posn <= t) {
      //console.log(apple_posn);
      countApple+=1;
    }
  }

  for(let o_num = 0;o_num<oranges.length;o_num++) {
    let orange_posn = b+oranges[o_num];

    if(orange_posn >= s && orange_posn <= t) {
      //console.log(orange_posn);
      countOranges+=1;
    }
  }*/
  //console.log(countApple+' '+countOranges);
  return [countApple,countOranges];
}

let result = countApplesAndOranges(s,t,a,b,apples,oranges);
console.log(result[0]+'\n'+result[1]);
