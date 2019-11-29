function puzzleSolved() {
	
	/*
	// tested this code with 2x2 puzzle -> 
	// "Uncaught TypeError: Cannot read property '1' of undefined" upon the puzzle being solved
	var N = puzzle_N;
	if (tileArray[N - 1][N - 1].getNumber() != "")
		return false;
	for (var num = 0; num < N * N - 1; num++) {
		if (tileArray[num / N][num % N].getNumber() != num + 1)
			return false;
	}

	return true;
	*/
	// replaced it with the previous code for now
	
	for (var row = 0; row < puzzle_N; row++){
  		for (var column = 0; column < puzzle_N; column++){
  			
  			if (row == puzzle_N - 1 && column == puzzle_N - 1){
  				if (tileArray[row][column].getNumber() != ""){
  					return false;
  				}
  			}
  			else{
  				if (tileArray[row][column].getNumber() != row * puzzle_N + column + 1){
  					return false;
  				}
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