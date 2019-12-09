// var puzzle_N;  // numberOfTilesPerRow
// var none_col; // noneColIndex;
// var none_row; // noneRowIndex;
// var col; // clickedcIndex
// var row; // clickedrIndex


function mousePressed() {

	if (tileArray[mouseR][mouseC].clicked(mouseX, mouseY)) {
		if (mouseR == none_row || mouseC == none_col) {
			console.log("move " + "(" + none_row + "," + none_col + ")" + " to (" + mouseR + "," + mouseC + ")");
			moveAfterSolve();
			move( mouseR, mouseC );
		}
	}
}

function move( row, col) {
	var dr = 0;
	var dc = 0 ;
	if( none_col == col ) dr = none_row < row ? 1 : -1 ;
	if( none_row == row ) dc = none_col < col ? 1 : -1 ;

	var noneTile = tileArray[none_row][none_col];
	numberOfMoves++;
	console.log("number of moves" + numberOfMoves)
	while(none_row != row || none_col != col){
		
		var nxtTile = tileArray[none_row+dr][none_col+dc];
		noneTile.changeNumber( nxtTile.getNumber());
		noneTile.changeImgPos( nxtTile.imgPosx, nxtTile.imgPosy);
		
		none_row += dr;
		none_col += dc;
	}

	tileArray[none_row][none_col].changeNumber("");
	tileArray[none_row][none_col].changeImgPos(noneTile.imgPosx, noneTile.imgPosy);
}