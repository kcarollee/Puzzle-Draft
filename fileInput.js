function gotFile(file){
	//createP(file.name);
	//createP(file.type);
	//createP(file.size);
	imageMode = true;
	console.log(file.name);
	puzzleImage = loadImage(file.name);
	console.log(puzzleImage.width);
	puzzleImage.get(0, 0, 30, 30);
	//puzzleImage.hide();
	/*
	for (var row = 0; row < numberOfTilesPerRow; row++){ 		
  		for (var column = 0; column < numberOfTilesPerRow; column++){
  			if (tileArray[row][column].getNumber() != ""){
  				tileArray[row][column].image = 
  					puzzleImage.get(tileArray[row][column].posx, 
  						tileArray[row][column].posy, tileWidth, tileHeight);
  			}
  		}
  	}
  	*/
  	
}