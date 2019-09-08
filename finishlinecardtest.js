var readlineSync = require('readline-sync');
const validMarkers = ['A', 'B', 'C', 'a', 'b', 'c'];
let userMarker1,userMarker2;

do {
  userMarker1 = readlineSync.question(`Please provide which marker you want apply black dice roll to `);
  //console.log(userMarker1);
} while(validMarkers.indexOf(userMarker1) == -1);


//let userMarker2 = readlineSync.question(`Please provide which marker you want apply red dice roll to `);
