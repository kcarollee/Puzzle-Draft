function puzzleSolved() {
	
	for (var row = 0; row < puzzle_N; row++){
  		for (var col = 0; col < puzzle_N; col++){
			var num = row*puzzle_N + col + 1;

			if(tileArray[row][col].getNumber() == "" ){
				if(num != puzzle_N * puzzle_N )
					return false;
			} 

			if(tileArray[row][col].getNumber() != num ){
			  return false;
			}
		}
  	}	
  	return true;
  	
}

function Solver(currentStateArr, goalStateArr) {
	this.currentStateArr = currentStateArr;
	this.goalStateArr = goalStateArr;
	this.fValue;
	this.gValue; // # of misplaced tiles
	this.hValue; // # of nodes traveled from currentState

	this.getChildNodes = function () {}
	this.getLeastFValue = function () {}
	this.getGvalue = function () {}

	// this.getHvalue = function(arr){
	// 	var h = 0;
	// 	for (var i = 0; i < tileWdith; i++){
	// 		for (var j = 0; j < tileHeight; j++){
	// 			if (arr[i][j].)
	// 		}
	// 	}
	// }
}