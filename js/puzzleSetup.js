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
function hintEvent(){
    if (imgMode) imgHintMode = !imgHintMode;
    frameCount = 0;
}

function setup() {
    numberOfMoves = 0;
    reset = false;
    // dropzone init
    deg = 0;
    imgMode = false;
    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, unhighlight);
    // put setup code here
    var canvas = createCanvas(450, 500);
    //var backgroundCanvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("puzzle");
  
    setPuzzle();
}


async function setPuzzle(newNum=puzzle_N) {
    puzzle_N = newNum;
    tileArray = new Array(puzzle_N);
    TILE_SIZE = 450 / puzzle_N;

    init_tile();
}

function init_tile() {
    for (var row = 0; row < puzzle_N; row++) {
        tileArray[row] = new Array(puzzle_N);
        for (var col = 0; col < puzzle_N; col++) {

            var num = numberArray[row * puzzle_N + col];

            tileArray[row][col] = new Tile(num, col * TILE_SIZE, row * TILE_SIZE);

            if (num == 0){
                tileArray[row][col] = new Tile("", col * TILE_SIZE, row * TILE_SIZE);
                sR = none_row = row;
                sC = none_col = col;
            }
        }
    }
    
    for (var i = 1; i <= Math.pow(puzzle_N, 2); i++){      
        if (i == Math.pow(puzzle_N, 2)){
            for (var row = 0; row < puzzle_N; row++){
                for (var col = 0; col < puzzle_N; col++){
                    if (tileArray[row][col].getNumber() == ""){
                        tileArray[row][col].imgPosx = ((i - 1) % puzzle_N) * TILE_SIZE;
                        tileArray[row][col].imgPosy = Math.floor(((i - 1) / puzzle_N)) * TILE_SIZE;                        
                        break;
                    }            
                }
             }
        }
        else{
            for (var row = 0; row < puzzle_N; row++){
                for (var col = 0; col < puzzle_N; col++){                
                    if (tileArray[row][col].getNumber() == i){
                        tileArray[row][col].imgPosx = ((i - 1) % puzzle_N) * TILE_SIZE;
                        tileArray[row][col].imgPosy = Math.floor(((i - 1) / puzzle_N)) * TILE_SIZE;
                        
                        break;
                    }
                }
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
