//take the following inputs from the user
const size = 10;
const start = [2,2];
const instructions = [{heading: 'N', steps: 9},{heading: 'E', steps: 3},{heading: 'S', steps: 2},{heading: 'W', steps: 1}];

function initializeBoard(size) {
  let board = new Array(size);

  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(size);
  }

  for(let i=0;i<size;i++) {
    for(let j=0;j<size;j++) {
      board[i][j] = 0;
    }
  }
  //console.log(board);
  findTreasure(board,size);
}

function findTreasure(board,size) {
  let x_coord = start[0];
  let y_coord = start[1];
  //board[x_coord,y_coord] = 1;
  let dirn = '';
  for(let num = 0; num<instructions.length;num++) {
    dirn = instructions[num].heading;
    switch (dirn) {
      //add steps to y and keep x const
      case 'N':
              y_coord +=instructions[num].steps;
              if(y_coord>size-1) {
                y_coord = y_coord%size;
                break;
              }
              //board[x_coord][y_coord] = 1;
              break;
      //add steps to x and keep y const
      case 'E':
              x_coord +=instructions[num].steps;
              if(x_coord>size-1) {
                x_coord = x_coord%size;
                break;
              }
              //board[x_coord][y_coord] = 1;
              break;
      //sub steps from y and keep x const
      case 'S':
              y_coord -=instructions[num].steps;
              if(y_coord<0) {
                y_coord = size + y_coord;
                break;
              }
              //board[x_coord][y_coord] = 1;
              break;
      //sub steps from x and keep y const
      case 'W':
              x_coord -=instructions[num].steps;
              if(x_coord<0) {
                x_coord = size + x_coord;
                break;
              }
              //board[x_coord][y_coord] = 1;
              break;
      //Write special case for wrap-around condition
      case 'NE':
              x_coord += instructions[num].steps;
              y_coord += instructions[num].steps;
              if(x_coord>size-1 && y_coord>size-1) {
                x_coord = size - instructions[num].steps;
                y_coord = size - instructions[num].steps;
              }
      case 'SW':
              x_coord -= instructions[num].steps;
              y_coord -= instructions[num].steps;
              if(x_coord<0 && y_coord<0) {
                x_coord = size-(size - instructions[num].steps);
                y_coord = size-(size - instructions[num].steps);
              }
      case 'SE':
              x_coord += instructions[num].steps;
              y_coord -= instructions[num].steps;
              if(x_coord>size-1) {
                x_coord = size - instructions[num].steps;
                y_coord = size - instructions[num].steps;
              }
      case 'NW':
              x_coord -= instructions[num].steps;
              y_coord += instructions[num].steps;
      default:
        console.log('Invalid direction');
        return;
    }
  }

  console.log(`The treasure is at (${x_coord},${y_coord})`);
}

initializeBoard(size);
