function gotFile(file) {
	imgMode = true;
	console.log(file.name);
	puzzleImg = loadImage(file.name);

	for(var row =0 ; row <puzzle_N; row++){
		for(var col = 0; col <puzzle_N ; col++){

			const Tile = tileArray[row][col];
			var num = Tile.getNumber()-1;
			if(num=="") num = puzzle_N*puzzle_N;
			Tile.setImg(  puzzleImg.get( num/puzzle_N , num%puzzle_N , TILE_SIZE , TILE_SIZE )  )
		}
	}
}