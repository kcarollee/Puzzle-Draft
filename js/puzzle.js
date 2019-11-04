var puzzle_N;  // numberOfTilesPerRow
var none_col; // noneColIndex;
var none_row; // noneRowIndex;

var tileArray;
var tileWidth;
var tileHeight;
var numberArray = [];
var randomizedNumberArray;
var dropzone;
var puzzleImage;
var imageMode;
var inputBar;
var rowNumReset;
var goalStateArr;
var puzzleImage

var testImage;

function setup() {
  rowNumReset = false;
  // dropzone init
  imageMode = false;
  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile, unhighlight);
  // put setup code here
  var canvas = createCanvas(450, 450);
  //var backgroundCanvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("puzzle");


  // default is 5 rows
  setPuzzle(3);

  // tile = new Tile(2, 30, 30, 100, 100);
}

function draw() {
  // put drawing code here
  background(0);
  //ellipse(30, 30, 30, 30);
  //tile.display();
  if (rowNumReset) {
    setPuzzle(puzzle_N);
    rowNumReset = false;
    imageMode = false;
  }


  stroke(20, 20, 400);
  ellipse(mouseX, mouseY, 2 * (mouseX - pmouseX), 2 * (mouseY - pmouseY));
  if (puzzleSolved()) {
    tileArray.forEach(function (element) {
      element.forEach(function (e) {
        e.color = color(random(0, 244), random(0, 244), random(0, 244));
      });
    });
  }
  if (imageMode) {
    puzzleImage.resize(450, 450);
    //testImage = puzzleImage.get(0, 0, 30, 30);
    //image(puzzleImage, 0, 0);
    //image(testImage, 50, 100);
    for (var row = 0; row < puzzle_N; row++) {
      for (var col = 0; col < puzzle_N; col++) {
        if (tileArray[row][col].getNumber() !== "") {
          tileArray[row][col].displayImage(
            puzzleImage.get(tileArray[row][col].imagePosx,
              tileArray[row][col].imagePosy, tileWidth, tileHeight));
        }
      }
    }

  } else {
    for (var row = 0; row < puzzle_N; row++) {
      for (var col = 0; col < puzzle_N; col++) {
        tileArray[row][col].display();
      }
    }
  }
}




function highlight() {
  dropzone.style('background-color', '#ccc');
}

function unhighlight() {
  dropzone.style('background-color', '#fff');
}



function mouseMoved() {
  for (var row = 0; row < puzzle_N; row++) {
    for (var col = 0; col < puzzle_N; col++) {
      tileArray[row][col].mouseMovedOver(mouseX, mouseY);
    }
  }

}

function swapNumber(tile1, tile2) {
  var temp = tile1.getNumber();
  tile1.changeNumber(tile2.getNumber());
  tile2.changeNumber(temp);
}

function swapImagePos(tile1, tile2) {
  var tempx = tile1.imagePosx;
  var tempy = tile1.imagePosy;

  tile1.changeImagePos(tile2.imagePosx, tile2.imagePosy);
  tile2.changeImagePos(tempx, tempy);
}

function puzzleSolved() {

  for (var row = 0; row < puzzle_N; row++) {
    for (var col = 0; col < puzzle_N; col++) {

      if (row == puzzle_N - 1 && col == puzzle_N - 1) {
        if (tileArray[row][col].getNumber() != "") {
          return false;
        }
      } else {
        if (tileArray[row][col].getNumber() != row * puzzle_N + col + 1) {
          return false;
        }
      }
    }
  }
  return true;
}
