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
var deg;

var imgHintMode;

var numberOfMoves;

function draw() {
    if (reset) {
        setPuzzle(puzzle_N);
        reset = false;
        imgMode = false;
    }
    background(0);

    if (puzzleSolved()) {
        tileArray.forEach(function (element) {
            element.forEach(function (e) {
                e.color = color(Math.abs(200 * Math.sin(frameCount / 20 - e.posx)), Math.abs(80 * Math.cos(frameCount / 20 - e.posy)), 50 * Math.sin(frameCount / 15 - e.posx * e.posy));
            });
        });
    }

    if (imgMode) {
        puzzleImg.resize(450, 450);
        for (var row = 0; row < puzzle_N; row++) {
            for (var col = 0; col < puzzle_N; col++) {
                if (!puzzleSolved()) {
                    if (tileArray[row][col].getNumber() !== "") {
                        tileArray[row][col].displayImg(
                            puzzleImg.get(tileArray[row][col].imgPosx,
                                tileArray[row][col].imgPosy, TILE_SIZE, TILE_SIZE));
                    }
                } else {
                    tileArray[row][col].displayImg(
                        puzzleImg.get(tileArray[row][col].imgPosx,
                            tileArray[row][col].imgPosy, TILE_SIZE, TILE_SIZE));
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
    drawScoreboard();
}

function drawScoreboard() {
    noStroke();
    fill('rgba(50, 100, 150, 0.8)');
    rect(0, 450, 450, 50);
    fill(255);
    textSize(15);
    if (!puzzleSolved()) text("Number of moves: " + String(numberOfMoves), 5, 480);
    else text("Puzzle solved in " + String(numberOfMoves) + " moves. Press 'Submit' for a new puzzle!", 5, 480);
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