function gotFile(file) {
	imgMode = true;
	console.log(file.name);
	puzzleImg = loadImg(file.name);
	console.log(puzzleImg.width);
	puzzleImg.get(0, 0, 30, 30);
 }