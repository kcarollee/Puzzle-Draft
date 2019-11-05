function Tile(number, posx, posy, width, height) {
	this.number = number;
	this.posx = posx;
	this.posy = posy;
	this.width = width;
	this.height = height;
	this.color = color(255, 100);
	this.img;
	this.imgPosx;
	this.imgPosy;
	this.getNumber = function () {
		return this.number;
	}

	this.setImg = function (img) {
		this.img = img;
	}

	this.changeNumber = function (newNum) {
		this.number = newNum;
	}

	this.changeImgPos = function (newPosx, newPosy) {
		this.imgPosx = newPosx;
		this.imgPosy = newPosy;
	}

	this.display = function () {
		stroke(this.color);
		fill(this.color);
		rect(this.posx, this.posy, this.width, this.height);
		textSize(20);
		text(String(this.number), this.posx + this.width * 0.45, this.posy + this.height * 0.6);

	}

	this.displayImg = function (img) {
		img(img, this.posx, this.posy);
	}

	this.mouseMovedOver = function (x, y) {
		this.color = color(255, 100);
		if( ( this.posx < x ) && ( x < this.posx + this.width ) &&
			( this.posy < y ) && ( y < this.posy + this.height ))
				this.color = color(255, 200);
	}

	this.clicked = function (x, y) {
		return ( ( this.posx < x ) && ( x < this.posx + this.width ) &&
				 ( this.posy < y ) && ( y < this.posy + this.height ));
	}

}