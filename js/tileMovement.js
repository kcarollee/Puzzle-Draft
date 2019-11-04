// var puzzle_N;  // numberOfTilesPerRow
// var none_col; // noneColIndex;
// var none_row; // noneRowIndex;
// var clicked_col; // clickedColIndex
// var clicked_row; // clickedRowIndex


function mousePressed() {
	for (var row = 0; row < puzzle_N; row++) {
		for (var col = 0; col < puzzle_N; col++) {
			if (tileArray[row][col].clicked(mouseX, mouseY)) {
				if(row==none_row)
					RightLeft(none_col, col, row);
				if(col==none_col)
					UpDown(none_row, row, col);
				none_row = row;
				none_col = col;
			}
		}
	}
}

function RightLeft(none_col, clicked_col, row) {
	var temp = tileArray[row][none_col].getNumber();
	var tempImgPosx = tileArray[row][none_col].imagePosx;
	var tempImgPosy = tileArray[row][none_col].imagePosy;
	
	var dir = (none_col<clicked_col) ? 1 : -1;
	for (var i = none_col; i != clicked_col; i+=dir) {
		tileArray[row][i].changeNumber(tileArray[row][i + dir].getNumber());
		tileArray[row][i].changeImagePos(tileArray[row][i + dir].imagePosx, tileArray[row][i + dir].imagePosy);
	}
	
	tileArray[row][i].changeNumber(temp);
	tileArray[row][i].changeImagePos(tempImgPosx, tempImgPosy);

}

function RightLeft(none_col, clicked_col, row) {
	var temp = tileArray[row][none_col].getNumber();
	var tempImgPosx = tileArray[row][none_col].imagePosx;
	var tempImgPosy = tileArray[row][none_col].imagePosy;
	
	var dir = (none_col<clicked_col) ? 1 : -1;
	for (var i = none_col; i != clicked_col; i+=dir) {
		tileArray[row][i].changeNumber(tileArray[row][i + dir].getNumber());
		tileArray[row][i].changeImagePos(tileArray[row][i + dir].imagePosx, tileArray[row][i + dir].imagePosy);
	}
	
	tileArray[row][i].changeNumber(temp);
	tileArray[row][i].changeImagePos(tempImgPosx, tempImgPosy);
}


function UpDown(none_row, clicked_row, col) {
	var temp = tileArray[none_row][col].getNumber();
	var tempImgPosx = tileArray[none_row][col].imagePosx;
	var tempImgPosy = tileArray[none_row][col].imagePosy;
	var dir = (none_row<clicked_row) ? 1 : -1;

	for (var i = none_row; i != clicked_row; i+=dir) {
		tileArray[i][col].changeNumber(tileArray[i + dir][col].getNumber());
		tileArray[i][col].changeImagePos(tileArray[i + dir][col].imagePosx, tileArray[i + dir][col].imagePosy);
	}
	tileArray[i][col].changeNumber(temp);
	tileArray[i][col].changeImagePos(tempImgPosx, tempImgPosy);
}
