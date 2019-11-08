var puzzle_N = 3; // numberOfTilesPerRow
var none_col; // noneColIndex;
var none_row; // noneRowIndex;
var reset; // rowNumReset;

var tileArray;
var tileWidth;
var tileHeight;
var numberArray = [];
var randomizedNumberArray;
var dropzone;
var puzzleImage;
var imageMode;
var inputBar;

var goalStateArr;
var puzzleImage

var testImage;

function draw() {
  if (reset) {
    setPuzzle(puzzle_N);
    reset = false;
    imageMode = false;
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
	var N = puzzle_N;
	if (tileArray[N - 1][N - 1].getNumber() != "")
		return false;
	for (var num = 0; num < N * N - 1; num++) {
		if (tileArray[num / N][num % N].getNumber() != num + 1)
			return false;
	}

	return true;
}