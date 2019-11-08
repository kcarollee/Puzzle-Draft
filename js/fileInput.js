function gotFile(file) {
	imageMode = true;
	console.log(file.name);
	puzzleImage = loadImage(file.name);
	console.log(puzzleImage.width);
	puzzleImage.get(0, 0, 30, 30);
 }