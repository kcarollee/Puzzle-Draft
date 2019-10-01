function Tile(number, posx, posy, width, height){
	this.number = number;
	this.posx = posx;
	this.posy = posy;
	this.width = width;
	this.height = height;
	this.color = color(255, 100);
	this.image;
	this.getNumber = function(){
		return this.number;
	}

	this.setImage = function(img){
		this.image = img;
	}

	this.changeNumber = function(newNum){
		this.number = newNum;
		console.log("New Number:" + this.number);
	}

	this.changePos = function(newPosx, newPosy){
		this.posx = newPosx;
		this.posy = newPosy;		
	}

	this.display = function(){	
		if(!imageMode || this.number === ""){
			stroke(this.color);
			fill(this.color);
			rect(this.posx, this.posy, this.width, this.height);
			textSize(20);
			text(String(this.number), this.posx + this.width * 0.45, this.posy + this.height * 0.6);
		}	
		else{
			
			image(this.image, this.posx, this.posy);
		}
	}

	this.mouseMovedOver = function(x, y){
		
		if (x > this.posx && (x < this.posx + this.width) &&
			y > this.posy && (y < this.posy + this.height)){
			this.color = color(255, 200);
			
		}
		else{ 
			this.color = color(255, 100);
		}
	}

	this.clicked = function(x, y){
		if (x > this.posx && (x < this.posx + this.width) &&
			y > this.posy && (y < this.posy + this.height)){
			return true;
			
		}
		else{ 
			return false;
		}
	}

}

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
  }
  
  for (var row = 0; row < numberOfTilesPerRow; row++){
  	for (var column = 0; column < numberOfTilesPerRow; column++){ 		
  		tileArray[row][column].display();
  	}
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
}

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
  	await sleep(20);
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


function highlight(){
	dropzone.style('background-color', '#ccc');
}

function unhighlight(){
	dropzone.style('background-color', '#fff');
}

function gotFile(file){
	//createP(file.name);
	//createP(file.type);
	//createP(file.size);
	imageMode = true;
	var puzzleImage =  createImg(file.data);
	console.log(file.data);
	puzzleImage.size(450, 450);
	//puzzleImage.get(0, 0, 30, 30);
	puzzleImage.hide();
	for (var row = 0; row < numberOfTilesPerRow; row++){
  		
  		for (var column = 0; column < numberOfTilesPerRow; column++){
  			if (tileArray[row][column].getNumber() != ""){
  				tileArray[row][column].setImage(createImg(file.data).get(tileArray[row][column].posx, tileArray[row][column].posy, tileWidth, tileHeight));
  			}
  	}
  }

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

function mousePressed(){
for (var row = 0; row < numberOfTilesPerRow; row++){
  		for (var column = 0; column < numberOfTilesPerRow; column++){
  			if (tileArray[row][column].clicked(mouseX, mouseY)){
  				// none is to the left
  				if (row == noneRowIndex && noneColIndex < column){
  					//swapNumber(tileArray[row][column], tileArray[noneRowIndex][noneColIndex]);
  					pushLeft(column, noneColIndex, row);
  					noneRowIndex = row;
  					noneColIndex = column;
  				}
  				// none is to the right
  				else if (row == noneRowIndex && noneColIndex > column){
  					//swapNumber(tileArray[row][column], tileArray[noneRowIndex][noneColIndex]);
  					pushRight(column, noneColIndex, row);
  					noneRowIndex = row;
  					noneColIndex = column;
  				}
  				// none is to the top
  				else if (column == noneColIndex && noneRowIndex < row){
  					//swapNumber(tileArray[row][column], tileArray[noneRowIndex][noneColIndex]);
  					pushUp(row, noneRowIndex, column);
  					noneRowIndex = row;
  					noneColIndex = column;
  				}
  				// none is to the bottom
  				else if (column == noneColIndex && noneRowIndex > row){
  					//swapNumber(tileArray[row][column], tileArray[noneRowIndex][noneColIndex]);
  					pushDown(row, noneRowIndex, column);
  					noneRowIndex = row;
  					noneColIndex = column;
  				}
  			}
  		}
  	}
}

function pushRight(clickedColIndex, noneColIndex, row){
	var temp = tileArray[row][noneColIndex].getNumber();
	//var temp_2 = tileArray[row][clickedColIndex + 1].getNumber();
	for (var i = noneColIndex; i >= clickedColIndex; i--){
			if (i == clickedColIndex){
				tileArray[row][i].changeNumber(temp);
			}
			else{
				tileArray[row][i].changeNumber(tileArray[row][i - 1].getNumber());

			}
	}
}

function pushDown(clickedRowIndex, noneRowIndex, column){
	var temp = tileArray[noneRowIndex][column].getNumber();
	//var temp_2 = tileArray[row][clickedColIndex + 1].getNumber();
	for (var i = noneRowIndex; i >= clickedRowIndex; i--){
			if (i == clickedRowIndex){
				tileArray[i][column].changeNumber(temp);
			}
			else{
				tileArray[i][column].changeNumber(tileArray[i - 1][column].getNumber());

			}
	}
}

function pushLeft(clickedColIndex, noneColIndex, row){
	var temp = tileArray[row][noneColIndex].getNumber();
	//var temp_2 = tileArray[row][clickedColIndex + 1].getNumber();
	for (var i = noneColIndex; i <= clickedColIndex; i++){
			if (i == clickedColIndex){
				tileArray[row][i].changeNumber(temp);
			}
			else{
				tileArray[row][i].changeNumber(tileArray[row][i + 1].getNumber());

			}
	}
}

function pushUp(clickedRowIndex, noneRowIndex, column){
	var temp = tileArray[noneRowIndex][column].getNumber();
	//var temp_2 = tileArray[row][clickedColIndex + 1].getNumber();
	for (var i = noneRowIndex; i <= clickedRowIndex; i++){
			if (i == clickedRowIndex){
				tileArray[i][column].changeNumber(temp);
			}
			else{
				tileArray[i][column].changeNumber(tileArray[i + 1][column].getNumber());

			}
	}
}