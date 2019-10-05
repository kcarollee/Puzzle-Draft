function myInputEvent(){
  numberOfTilesPerRow = document.getElementById("rowNum").value;
  rowNumReset = true;
  console.log(numberOfTilesPerRow);
  console.log("CALLED");
}

function initNumberArray(){
  numberArray = [];
  for (var i = 0; i < Math.pow(numberOfTilesPerRow, 2) - 1; i++){
    numberArray.push(i);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function setPuzzle(newNum){
  numberOfTilesPerRow = newNum;
  tileArray = new Array(numberOfTilesPerRow);
  tileWidth = width / numberOfTilesPerRow;
  tileHeight = height / numberOfTilesPerRow;
 
  // initialize number array
  initNumberArray();

  // initialize tiles
  for (var row = 0; row < numberOfTilesPerRow; row++){
    tileArray[row] = new Array(numberOfTilesPerRow);
    for (var column = 0; column < numberOfTilesPerRow; column++){
      if (row == numberOfTilesPerRow - 1 && column == numberOfTilesPerRow - 1){
        tileArray[row][column] = new Tile("", column * tileWidth, 
        row * tileHeight, tileWidth, tileHeight);
        noneRowIndex = row;
        noneColIndex = column;
      }
      else{
      tileArray[row][column] = new Tile(numberArray[row * numberOfTilesPerRow + column], column * tileWidth, 
        row * tileHeight, tileWidth, tileHeight);
      }
    }
  }

  // shuffle in reverse
  for (var i = 0; i < 1000; i++){
    var j = Math.floor(Math.random() * 4);
    //await sleep(20);
    switch(j){
      // up
      case 0:
        if (noneRowIndex != 0){
          swapNumber(tileArray[noneRowIndex][noneColIndex], tileArray[noneRowIndex - 1][noneColIndex]);
          noneRowIndex -= 1;
        }
        break;

      // down
      case 1:
        if (noneRowIndex != numberOfTilesPerRow - 1){
          swapNumber(tileArray[noneRowIndex][noneColIndex], tileArray[noneRowIndex + 1][noneColIndex]);
          noneRowIndex += 1;
        }
        break;
      // left
      case 2:
        if (noneColIndex != 0){
          swapNumber(tileArray[noneRowIndex][noneColIndex], tileArray[noneRowIndex][noneColIndex - 1]);
          noneColIndex -= 1;
        }
        break;

      //right
      case 3:
      if (noneColIndex != numberOfTilesPerRow - 1){
          swapNumber(tileArray[noneRowIndex][noneColIndex], tileArray[noneRowIndex][noneColIndex + 1]);
          noneColIndex += 1;
        }
        break;

    }
  }

}