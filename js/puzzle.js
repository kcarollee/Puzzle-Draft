//var puzzle_N = 3; // numberOfTilesPerRow
var none_col; // noneColIndex;
var none_row; // noneRowIndex;
var reset; // rowNumReset;

var tileArray;
var tileWidth;
var tileHeight;
//var numberArray = [];
var randomizedNumberArray;
var dropzone;
var puzzleImg;
var imgMode;
var inputBar;

var goalStateArr;
var puzzleImg

var testImg;

function draw() {
  if (reset) {
    setPuzzle(puzzle_N);
    reset = false;
    imgMode = false;
    console.log("!!!");
  }
  
  // put drawing code here
  background(0);
  //ellipse(30, 30, 30, 30);
  //tile.display();

  stroke(20, 20, 400);
  ellipse(mouseX, mouseY, 2 * (mouseX - pmouseX), 2 * (mouseY - pmouseY));
  if (puzzleSolved()) {
    tileArray.forEach(function (element) {
      element.forEach(function (e) {
        e.color = color(random(0, 244), random(0, 244), random(0, 244));
      });
    });
  }
  if (imgMode) {
    puzzleImg.resize(450, 450);
    //testImg = puzzleImg.get(0, 0, 30, 30);
    //img(puzzleImg, 0, 0);
    //img(testImg, 50, 100);
    for (var row = 0; row < puzzle_N; row++) {
      for (var col = 0; col < puzzle_N; col++) {
        if (tileArray[row][col].getNumber() !== "") {
          tileArray[row][col].displayImg(
            puzzleImg.get(tileArray[row][col].imgPosx,
              tileArray[row][col].imgPosy, tileWidth, tileHeight));
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


function swapNumber(tile1, tile2) {
  var temp = tile1.getNumber();
  tile1.changeNumber(tile2.getNumber());
  tile2.changeNumber(temp);
}

function swapImgPos(tile1, tile2) {
  var tempx = tile1.imgPosx;
  var tempy = tile1.imgPosy;

  tile1.changeImgPos(tile2.imgPosx, tile2.imgPosy);
  tile2.changeImgPos(tempx, tempy);
}


