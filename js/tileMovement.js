// var puzzle_N;  // numberOfTilesPerRow
// var none_col; // noneColIndex;
// var none_row; // noneRowIndex;
// var col; // clickedcIndex
// var row; // clickedrIndex


function mousePressed() {
	for (var row = 0; row < puzzle_N; row++) {
		for (var col = 0; col < puzzle_N; col++) {
			if (tileArray[row][col].clicked(mouseX, mouseY)) {
				if(row==none_row || col==none_col){
					console.log("move "+"("+none_row+","+none_col+")"+" to ("+row+","+col+")");
					move(none_row, none_col, row, col);
					none_row = row;
					none_col = col;
				}
			}
		}
	}
}

function move(none_row, none_col, row, col) {
	var dr = 0;
	var dc = 0 ;
	if( none_col == col ) dr = none_row < row ? 1 : -1 ;
	if( none_row == row ) dc = none_col < col ? 1 : -1 ;


	var temp = tileArray[none_row][none_col].getNumber();
	var tempImgPosx = tileArray[none_row][none_col].imgPosx;
	var tempImgPosy = tileArray[none_row][none_col].imgPosy;
	
	for (var C = none_col, R= none_row; C != col || R != row ; C+=dc, R +=dr) {
		tileArray[R][C].changeNumber(tileArray[R+dr][C + dc].getNumber());
		tileArray[R][C].changeImgPos(tileArray[R+dr][C + dc].imgPosx, tileArray[R+dr][C + dc].imgPosy);
	}
	
	tileArray[row][col].changeNumber(temp);
	tileArray[row][col].changeImgPos(tempImgPosx, tempImgPosy);
}
