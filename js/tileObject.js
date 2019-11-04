function Tile(number, posx, posy, width, height) {
	this.number = number;
	this.posx = posx;
	this.posy = posy;
	this.width = width;
	this.height = height;
	this.color = color(255, 100);
	this.image;
	this.imagePosx;
	this.imagePosy;
	this.getNumber = function () {
		return this.number;
	}

	this.setImage = function (img) {
		this.image = img;
	}

	this.changeNumber = function (newNum) {
		this.number = newNum;
	}

	this.changeImagePos = function (newPosx, newPosy) {
		this.imagePosx = newPosx;
		this.imagePosy = newPosy;
	}

	this.display = function () {
		stroke(this.color);
		fill(this.color);
		rect(this.posx, this.posy, this.width, this.height);
		textSize(20);
		text(String(this.number), this.posx + this.width * 0.45, this.posy + this.height * 0.6);

	}

	this.displayImage = function (img) {
		image(img, this.posx, this.posy);
	}

	this.mouseMovedOver = function (x, y) {
		if (x > this.posx && (x < this.posx + this.width) &&
			y > this.posy && (y < this.posy + this.height)) {
			this.color = color(255, 200);
		} else {
			this.color = color(255, 100);
		}
	}

	this.clicked = function (x, y) {
		return ( ( this.posx < x ) && ( x < this.posx + this.width ) &&
				 ( this.posy < y ) && ( y < this.posy + this.height ));
	}
}