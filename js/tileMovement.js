// var puzzle_N;  // numberOfTilesPerRow
// var none_col; // noneColIndex;
// var none_row; // noneRowIndex;
// var col; // clickedcIndex
// var row; // clickedrIndex


function mousePressed() {
	if (tileArray[mouseR][mouseC].clicked(mouseX, mouseY)) {
		if(mouseR==none_row || mouseC==none_col){
			console.log("move "+"("+none_row+","+none_col+")"+" to ("+mouseR+","+mouseC+")");
			move(none_row, none_col, mouseR, mouseC);
			none_row = mouseR;
			none_col = mouseC;
		}
	}
}

function move(none_row, none_col, row, col) {
	var dr = 0;
	var dc = 0 ;
	if( none_col == col ) dr = none_row < row ? 1 : -1 ;
	if( none_row == row ) dc = none_col < col ? 1 : -1 ;

	var temp = tileArray[none_row][none_col].getNumber();
	var tempImagePosx = tileArray[none_row][none_col].imagePosx;
	var tempImagePosy = tileArray[none_row][none_col].imagePosy;
	
	for (var C = none_col, R= none_row; C != col || R != row ; C+=dc, R +=dr) {
		tileArray[R][C].changeNumber(tileArray[R+dr][C + dc].getNumber());
		tileArray[R][C].changeImagePos(tileArray[R+dr][C + dc].imagePosx, tileArray[R+dr][C + dc].imagePosy);
	}
	
	tileArray[row][col].changeNumber(temp);
	tileArray[row][col].changeImagePos(tempImagePosx, tempImagePosy);
}
