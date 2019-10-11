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
	var tempImgPosx = tileArray[row][noneColIndex].imagePosx;
	var tempImgPosy = tileArray[row][noneColIndex].imagePosy;
	//var temp_2 = tileArray[row][clickedColIndex + 1].getNumber();
	for (var i = noneColIndex; i >= clickedColIndex; i--){
			if (i == clickedColIndex){
				tileArray[row][i].changeNumber(temp);
				tileArray[row][i].changeImagePos(tempImgPosx, tempImgPosy);
			}
			else{
				tileArray[row][i].changeNumber(tileArray[row][i - 1].getNumber());
				tileArray[row][i].changeImagePos(tileArray[row][i - 1].imagePosx,
					tileArray[row][i - 1].imagePosy);
			}
	}
}

function pushDown(clickedRowIndex, noneRowIndex, column){
	var temp = tileArray[noneRowIndex][column].getNumber();
	var tempImgPosx = tileArray[noneRowIndex][column].imagePosx;
	var tempImgPosy = tileArray[noneRowIndex][column].imagePosy;
	for (var i = noneRowIndex; i >= clickedRowIndex; i--){
			if (i == clickedRowIndex){
				tileArray[i][column].changeNumber(temp);
				tileArray[i][column].changeImagePos(tempImgPosx, tempImgPosy);
			}
			else{
				tileArray[i][column].changeNumber(tileArray[i - 1][column].getNumber());
				tileArray[i][column].changeImagePos(tileArray[i - 1][column].imagePosx,
					tileArray[i - 1][column].imagePosy);

			}
	}
}

function pushLeft(clickedColIndex, noneColIndex, row){
	var temp = tileArray[row][noneColIndex].getNumber();
	var tempImgPosx = tileArray[row][noneColIndex].imagePosx;
	var tempImgPosy = tileArray[row][noneColIndex].imagePosy;
	for (var i = noneColIndex; i <= clickedColIndex; i++){
			if (i == clickedColIndex){
				tileArray[row][i].changeNumber(temp);
				tileArray[row][i].changeImagePos(tempImgPosx, tempImgPosy);
			}
			else{
				tileArray[row][i].changeNumber(tileArray[row][i + 1].getNumber());
				tileArray[row][i].changeImagePos(tileArray[row][i + 1].imagePosx,
					tileArray[row][i + 1].imagePosy);
			}
	}
}

function pushUp(clickedRowIndex, noneRowIndex, column){
	var temp = tileArray[noneRowIndex][column].getNumber();
	var tempImgPosx = tileArray[noneRowIndex][column].imagePosx;
	var tempImgPosy = tileArray[noneRowIndex][column].imagePosy;
	for (var i = noneRowIndex; i <= clickedRowIndex; i++){
			if (i == clickedRowIndex){
				tileArray[i][column].changeNumber(temp);
				tileArray[i][column].changeImagePos(tempImgPosx, tempImgPosy);
			}
			else{
				tileArray[i][column].changeNumber(tileArray[i + 1][column].getNumber());
				tileArray[i][column].changeImagePos(tileArray[i + 1][column].imagePosx,
					tileArray[i + 1][column].imagePosy);

			}
	}
}