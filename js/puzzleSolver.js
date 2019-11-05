function puzzleSolved() {
	var N = puzzle_N;
	if (tileArray[N - 1][N - 1].getNumber() != "")
		return false;
	for (var num = 0; num < N * N - 1; num++) {
		if (tileArray[num / N][num % N].getNumber() != num + 1)
			return false;
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