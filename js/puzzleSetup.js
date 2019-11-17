// name simplify
// var puzzle_N = numberOfTilesPerRow;
// var none_col = noneColIndex;
// var none_row = noneRowIndex;
// var reset = rowNumReset;

function myInputEvent() {
    if(document.getElementById("rowNum").value == "")
        puzzle_N = default_N;
    puzzle_N = document.getElementById("rowNum").value;
    reset = true;
}

function setup() {
    reset = false;
    // dropzone init
    imgMode = false;
    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, unhighlight);
    // put setup code here
    var canvas = createCanvas(450, 450);
    //var backgroundCanvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("puzzle");
  
    setPuzzle();
    
}


async function setPuzzle(newNum=puzzle_N) {
    puzzle_N = newNum;
    tileArray = new Array(puzzle_N);
    tileWidth = width / puzzle_N;
    tileHeight = height / puzzle_N;

    //init_array();
    init_tile();
    //init_shuffle();
}

function init_array() {
    numberArray = [];
    for (var i = 1; i < Math.pow(puzzle_N, 2); i++) {
        numberArray.push(i);
        console.log(i);
    }
}
function init_tile() {
    console.log("javaScript init")

    for (var row = 0; row < puzzle_N; row++) {
        tileArray[row] = new Array(puzzle_N);
        for (var col = 0; col < puzzle_N; col++) {
            if(numberArray[row * puzzle_N + col] == 0){
                tileArray[row][col] = new Tile("", col * tileWidth, row * tileHeight, tileWidth, tileHeight);
                none_row = row;
                none_col = col;
            }else{
                tileArray[row][col] = new Tile(numberArray[row * puzzle_N + col], col * tileWidth, row * tileHeight, tileWidth, tileHeight);
            }
            tileArray[row][col].imgPosx = col * tileWidth;
            tileArray[row][col].imgPosy = row * tileHeight;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
