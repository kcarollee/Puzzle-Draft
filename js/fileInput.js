function gotFile(file) {
	imgMode = true;
	numberOfMoves = 0;
	console.log(file.name);
	puzzleImg = loadImage(file.name);
	puzzleImg.get(0, 0, 30, 30);
}