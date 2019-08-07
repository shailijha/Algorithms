//write the board as an input string anf give coordinates to each of the array elements.

const board = ['O','X','X','O','X','X','O','O','X'];
const boardWithCoord = [];

//function to assign coordinates to the input board
function assignCoord(board) {
  console.log('original board '+board);
  let idx=0;
  for(let i = 0;i<3;i++) {
    for(let j=0;j<3;j++) {
      if(idx<board.length)
      {
        const newVal = {coord:[i,j],val:board[idx]};
        boardWithCoord.push(newVal);
        idx++
      }
    }
  }
  for(let k=0;k<boardWithCoord.length;k++)
    console.log(boardWithCoord[k]);
}

assignCoord(board);

/*function to check the validity of the board. If this is satisfied then the board is checked for a win,tie
or ongoing game*/
function checkValidity(board) {
  /*there are two sub conditions for this. when the game is ongoing or when the board given is full
  for ongoing check no. of X and O's to be less than 3. then check to see O should not exceed X and
  countX-countO should not be 2 or more. for filled board, countX and countO are equal either in the
  horzn. or vertical posn., then both win which is invalid*/
  let countX = 0;
  let countO = 0;

  for(let num=0;num<board.length;num++) {
    if(board[num]=='X')
      countX++;
    else if(board[num]=='O')
      countO++
  }
  //ongoing game condition
  if(countO+countX < 9 && countO < 3 && countX < 3) {
    if(countO > countX || countX - countO >= 2) {
      return 'invalid board due to consecutive play'
    }
  }
  //check condition for both winners
  else if(countO+countX==9) {

  }
  else
    solveGame(board,countO,countX);
}

function solveGame(board,countO,countX) {
  //ongoing game
  let oCordCount = 0;
  let xCordCount = 0;
  let posn=0;
  if(countO+countX < 9 && countO < 3 && countX < 3) {
    if(countX=countO+1 || countX == countO) {
      return 'game still ongoing'
    }
  }
  //win game
  if(countO+countX==9) {
    if(boardWithCoord[posn].coord[0]==0||boardWithCoord[posn].coord[1]==0)
    {
      for(let i=0;i<3;i++) {
        if(boardWithCoord[i].val=='O') {
          oCordCount=boardWithCoord[i].coord[0]+boardWithCoord[i].coord[1];
        }
        else if(boardWithCoord[i].val=='X') {
          xCordCount=boardWithCoord[i].coord[0]+boardWithCoord[i].coord[1];
        }
      }
      if(oCordCount==3)
        return 'O won the game!';
      else if(xCordCount==3)
        return 'X won the game!';
      else
        return 'It is a tie!';
    }

    if(boardWithCoord[posn].coord[0]==1||boardWithCoord[posn].coord[1]==1)
    {
      for(let i=0;i<3;i++) {
        if(boardWithCoord[i].val=='O') {
          oCordCount=boardWithCoord[i].coord[0]+boardWithCoord[i].coord[1];
        }
        else if(boardWithCoord[i].val=='X') {
          xCordCount=boardWithCoord[i].coord[0]+boardWithCoord[i].coord[1];
        }
      }
      if(oCordCount==3)
        return 'O won the game!';
      else if(xCordCount==3)
        return 'X won the game!';
      else
        return 'It is a tie!';
    }

    if(boardWithCoord[posn].coord[0]==2||boardWithCoord[posn].coord[1]==2)
    {
      for(let i=0;i<3;i++) {
        if(boardWithCoord[i].val=='O') {
          oCordCount=boardWithCoord[i].coord[0]+boardWithCoord[i].coord[1];
        }
        else if(boardWithCoord[i].val=='X') {
          xCordCount=boardWithCoord[i].coord[0]+boardWithCoord[i].coord[1];
        }
      }
      if(oCordCount==3)
        return 'O won the game!';
      else if(xCordCount==3)
        return 'X won the game!';
      else
        return 'It is a tie!';
    }
  }



  if(countO+countX==9) {
    if(boardWithCoord[i].coord[0]==0 ||  || boardWithCoord[i].coord[0]==2) {
      if(boardWithCoord[i].val=='O') {
        oCordCount=boardWithCoord[i].coord[0]+boardWithCoord[i].coord[1];
      }
      else if(boardWithCoord[i].val=='X') {
        xCordCount=boardWithCoord[i].coord[0]+boardWithCoord[i].coord[1];
      }
    }
    else if()
    if(oCordCount==3 || oCordCount==6 || oCordCount==9 || oCordCount==12)
      console.log('O won the game!');
    else if(xCordCount==3 || xCordCount==6 || xCordCount==9 || xCordCount==12)
      console.log('X won the game');

  }

  //tie game
}
