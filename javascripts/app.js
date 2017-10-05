// An object called rovers moves in a given direction starting from the point (0,0).
var roverObj = {direction: "N", x: 0, y: 0, travelLog: []};

// New array where new Rovers will be contained.
var extraRov = [];
// Counter variable for the new Rovers created.
var c = 0;

// Given the movement grid that will contain the object rovers.
// The grid system used goes from (0,0) to (9,9).
var grid = [
  ['R','','','','','','','','',''],
  ['','','','','','','','','',''],
  ['','','','','','','','','',''],
  ['','','','','','','','','',''],
  ['','','','','','','','','',''],
  ['','','','','','','','','',''],
  ['','','','','','','','','',''],
  ['','','','','','','','','',''],
  ['','','','','','','','','',''],
  ['','','','','','','','','','']
];

// Instructions given to the user at the start of the script.
console.log("Rover starts facing " + roverObj.direction + " in coordinates (" + roverObj.x + "," + roverObj.y + ")");
console.log("To start moving, use the function command('stringInHere'), which will take a string as argument where you'll use 'f' to move forward, 'b' to move backwards, 'r' to turn right and 'l' to turn left.");
console.log("For example command('rffrf') ends in (2,1).");
console.log("If you want to create obstacles in the grid, use the function createObstacle(n) and it will create n random obstacles.");
console.log("If you want to add an aditional Rovers, use the function createRovers(a,b) where (a,b) are the coordinates of the new Rovers. They will be facing N like the original.");
console.log("If you want to move the new Rovers, use commandOther('stringHere',n) where the string are the instructions and n is the number of the Rovers.");

function createObstacle (n) {
  // Function to create a new obstacle.
  var newX, newY;
  // Generates a new random x and y for the obstacle.
  for (j = 0; j < n; j++) {
    newX = Math.floor(Math.random() * (10 - 0));
    newY = Math.floor(Math.random() * (10 - 0));
    // Insert new obstacle in the grid if the space is free.
    if (grid[newX][newY] === '') {
    grid[newX][newY] = 'O';
    }
  }
  console.log(grid);
}

function createRovers (a,b) {
  // Function to create a new rovers element in the grid.
  if( 0 < a < 9 && 0 < b < 9) {
    // Pushes the new rovers into the array containing rovers objects.
    extraRov.push({direction: "N", x: a, y: b, travelLog: []});
    // Counter variable to number the new rovers.
    c = c + 1;
    // Add new rovers if the space is free.
    if (grid[extraRov[c - 1].y][extraRov[c - 1].x] === '') {
      grid[extraRov[c - 1].y][extraRov[c - 1].x] = "R" + c;
      console.log("New Rovers created in coordinates: (" + extraRov[c - 1].x + "," + extraRov[c - 1].y + ")");
      console.log(grid);
    } else {
      console.log ("Coordinates already used by another element!");
    }
  } else {
    console.log ("Can't create a Rovers out of boundaries.");
  }
}

function turnLeft(rover) {
  //Simple function to turn the rovers to the left depending on the given direction.
  switch(rover.direction) {
    case 'N':
      rover.direction = "W";
      break;
    case 'W':
      rover.direction = "S";
      break;
    case 'S':
      rover.direction = "E";
      break;
    case 'E':
      rover.direction = "N";
      break;
    default:
      console.log("Incorrect Orientation");
  }
  console.log("Rover is now facing " + rover.direction);
}

function turnRight(rover) {
  //Simple function to turn the rovers to the right depending on the given direction.
 switch(rover.direction) {
    case 'N':
      rover.direction = "E";
      break;
    case 'E':
      rover.direction = "S";
      break;
    case 'S':
      rover.direction = "W";
      break;
    case 'W':
      rover.direction = "N";
      break;
    default:
      console.log("Incorrect Orientation");
  }
  console.log("Rover is now facing " + rover.direction);
}

function moveForward(rover) {
  var moved = true;
  // Limited movement when 0 < x < 9 and 0 < y < 9.
  if  (rover.direction === 'N' && rover.y > 0) {
    // Conditional to look for an obstacle, if not, the rovers moves.
    if (grid[rover.y - 1][rover.x] != '') {
        console.log("There is an obstacle in (" + rover.x + "," + (rover.y - 1) + ")!!");
        moved = false;
    } else {
    rover.y = rover.y - 1;
    }
  } else if (rover.direction === 'W' && rover.x > 0) {
    if (grid[rover.y][rover.x - 1] != '') {
        console.log("There is an obstacle in (" + (rover.x - 1) + "," + rover.y + ")!!");
        moved = false;
    } else {
    rover.x = rover.x - 1;
    }
  } else if (rover.direction === 'S' && rover.y < 9) {
    if (grid[rover.y + 1][rover.x] != '') {
        console.log("There is an obstacle in (" + rover.x + "," + (rover.y + 1) + ")! Couldn't move!");
        moved = false;
    } else {
    rover.y = rover.y + 1;
    }
  } else if (rover.direction === 'E' && rover.x < 9) {
    if (grid[rover.y][rover.x + 1] != '') {
        console.log("There is an obstacle in (" + (rover.x + 1) + "," + rover.y + ")!!");
        moved = false;
    } else {
    rover.x = rover.x + 1;
    }
  } else {
    console.log ("Movement blocked by boundaries!");
    moved = false;
  }
  //Can only move if it didn't reach boundaries, so no log given.
  if (moved === true) {
  console.log("Rover moved forward to coordinates (" + rover.x + ","+ rover.y + ")");
  }
}

function moveBackwards(rover) {
  var moved = true;
  if  (rover.direction === 'N' && rover.y < 9) {
    // Conditional to look for an obstacle, if not, the rovers moves.
    if (grid[rover.y + 1][rover.x] != '') {
        console.log("There is an obstacle in (" + rover.x + "," + (rover.y + 1) + ")!!");
        moved = false;
    } else {
    rover.y = rover.y + 1;
    }
  } else if (rover.direction === 'W' && rover.x < 9) {
    if (grid[rover.y][rover.x + 1] != '') {
        console.log("There is an obstacle in (" + (rover.x + 1) + "," + rover.y + ")!!");
        moved = false;
    } else {
    rover.x = rover.x + 1;
    }
  } else if (rover.direction === 'S' && rover.y > 0) {
    if (grid[rover.y - 1][rover.x] != '') {
        console.log("There is an obstacle in (" + rover.x + "," + (rover.y - 1) + ")! Couldn't move!");
        moved = false;
    } else {
    rover.y = rover.y - 1;
    }
  } else if (rover.direction === 'E' && rover.x > 0) {
    if (grid[rover.y][rover.x - 1] != '') {
        console.log("There is an obstacle in (" + (rover.x - 1) + "," + rover.y + ")!!");
        moved = false;
    } else {
    rover.x = rover.x - 1;
    }
  } else {
    console.log ("Movement blocked by boundaries!");
    moved = false;
  }
  //Can only move if it didn't reach boundaries, so no log given.
  if (moved === true) {
  console.log("Rover moved forward to coordinates (" + rover.x + ","+ rover.y + ")");
  }
}

function command (order) {
  // Delete the actual position of the rovers in the grid before using command again.
  grid[roverObj.y][roverObj.x] = '';
  var start = true;
  // Loop to iterate for the whole command string.
  for (i = 0; i < order.length; i++ ){
    // Conditional to validate inputs (only for f,b,r,l)
    if (order[i] != 'f' && order[i] != 'b' && order[i] != 'r' && order[i] != 'l') {
      console.log("Wrong input! Use only f, b, r and l to move!");
      start = false;
    }
    }
    // If the input is correct, execute functions depending on the letter chosen.
    if (start === true) {
      for (i = 0; i < order.length; i++) {
        if (order[i] === 'f') {
          moveForward(roverObj);
          roverObj.travelLog.push("(" + roverObj.x + "," + roverObj.y + ")");
        } else if (order[i] === 'b'){
          moveBackwards(roverObj);
          roverObj.travelLog.push("(" + roverObj.x + "," + roverObj.y + ")");
        } else if (order[i] === 'r') {
          turnRight(roverObj);
        } else if (order[i] === 'l') {
          turnLeft(roverObj);
        }
      }
      // Give the final result and the coordinates log when finishing.
      console.log("Rover ends moving facing " + roverObj.direction + " in coordinates (" + roverObj.x + "," + roverObj.y + ")");
      console.log("Coordinates log: " + roverObj.travelLog);
      grid[roverObj.y][roverObj.x] = 'R';
      console.log("The Rovers in the grid ends like this: ");
      console.log(grid);
    }
}

function commandOther (order, d) {
  if (extraRov[d - 1] === undefined){
    console.log("No Rovers number " + d + " was defined.");
  } else {
    // Function to move additional rovers.
    // Delete the actual rovers from it position.
    grid[extraRov[d - 1].y][extraRov[d - 1].x] = '';
    var start = true;
    // Loop to iterate for the whole command string.
    for (i = 0; i < order.length; i++ ){
        // Conditional to validate inputs (only for f,b,r,l)
        if (order[i] != 'f' && order[i] != 'b' && order[i] != 'r' && order[i] != 'l') {
          console.log("Wrong input! Use only f, b, r and l to move!");
          start = false;
        }
      }
      // If the input is correct, execute functions depending on the letter chosen.
    if (start === true) {
      for (i = 0; i < order.length; i++) {
        if (order[i] === 'f') {
          moveForward(extraRov[d -1]);
          extraRov[d -1].travelLog.push("(" + extraRov[d -1].x + "," + extraRov[d -1].y + ")");
        } else if (order[i] === 'b'){
            moveBackwards(extraRov[d -1]);
            extraRov[d -1].travelLog.push("(" + extraRov[d -1].x + "," + extraRov[d -1].y + ")");
          } else if (order[i] === 'r') {
            turnRight(extraRov[d -1]);
          } else if (order[i] === 'l') {
            turnLeft(extraRov[d -1]);
          }
        }
        // Give the final result and the coordinates log when finishing.
        console.log("Rover " + d + " ends moving facing " + extraRov[d -1].direction + " in coordinates (" + extraRov[d -1].x + "," + extraRov[d -1].y + ")");
        console.log("Coordinates log: " + extraRov[d -1].travelLog);
        grid[extraRov[d -1].y][extraRov[d -1].x] = 'R' + d;
        console.log("The Rovers " + d + " in the grid ends like this: ");
        console.log(grid);
      }
    }
}
