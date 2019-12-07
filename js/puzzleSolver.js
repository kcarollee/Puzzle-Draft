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
