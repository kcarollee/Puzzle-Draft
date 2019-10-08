var numberOfTilesPerRow;
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
var noneColIndex;
var noneRowIndex;
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
  setPuzzle(5);
  
  // tile = new Tile(2, 30, 30, 100, 100);
}

function draw() {
  // put drawing code here
  background(0);
  //ellipse(30, 30, 30, 30);
  //tile.display();
  if (rowNumReset){
  	setPuzzle(numberOfTilesPerRow);
  	rowNumReset = false;
    imageMode = false;
  }
  
  
  stroke(20, 20, 400);
  ellipse(mouseX, mouseY, 2 * (mouseX - pmouseX), 2 * (mouseY - pmouseY));
  if (puzzleSolved()){
  	tileArray.forEach(function(element){
  		element.forEach(function(e){
  			e.color = color(random(0, 244), random(0, 244), random(0, 244));  			
  			});
  	});
  }
  if(imageMode){
    puzzleImage.resize(450, 450);
    //testImage = puzzleImage.get(0, 0, 30, 30);
    //image(puzzleImage, 0, 0);
    //image(testImage, 50, 100);
    for (var row = 0; row < numberOfTilesPerRow; row++){    
      for (var column = 0; column < numberOfTilesPerRow; column++){
        if (tileArray[row][column].getNumber() !== ""){
          tileArray[row][column].displayImage( 
            puzzleImage.get(tileArray[row][column].imagePosx, 
              tileArray[row][column].imagePosy, tileWidth, tileHeight));
        }
      }
    }

  }
  else{
      for (var row = 0; row < numberOfTilesPerRow; row++){
        for (var column = 0; column < numberOfTilesPerRow; column++){     
          tileArray[row][column].display();
        }
      }
    }
}




function highlight(){
	dropzone.style('background-color', '#ccc');
}

function unhighlight(){
	dropzone.style('background-color', '#fff');
}



function mouseMoved(){
	for (var row = 0; row < numberOfTilesPerRow; row++){
  		for (var column = 0; column < numberOfTilesPerRow; column++){
  			tileArray[row][column].mouseMovedOver(mouseX, mouseY);
  	}
  }

}

function swapNumber(tile1, tile2){
	var temp = tile1.getNumber();
	tile1.changeNumber(tile2.getNumber());
	tile2.changeNumber(temp);
}

function swapImagePos(tile1, tile2){
  var tempx = tile1.imagePosx;
  var tempy = tile1.imagePosy;

  tile1.changeImagePos(tile2.imagePosx, tile2.imagePosy);
  tile2.changeImagePos(tempx, tempy);
}

function puzzleSolved(){

	for (var row = 0; row < numberOfTilesPerRow; row++){
  		for (var column = 0; column < numberOfTilesPerRow; column++){
  			
  			if (row == numberOfTilesPerRow - 1 && column == numberOfTilesPerRow - 1){
  				if (tileArray[row][column].getNumber() != ""){
  					return false;
  				}
  			}
  			else{
  				if (tileArray[row][column].getNumber() != row * numberOfTilesPerRow + column){
  					return false;
  				}
  			}
  		}
  	}
  	return true;
}

