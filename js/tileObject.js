function Tile(num, posx, posy, width, height) {
	this.num = num;
	this.row = row;
	this.col = col;
	zzz
	this.posx = posx;
	this.posy = posy;
	this.width = width;
	this.height = height;
	this.initWidth = 2;
	this.initHeight = 2;
	this.color = color(50, 150, 200, 255);
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

	this.changeTilePos = function(newPosx, newPosy){
		if (newPosx != this.posx){
			if (newPosx > this.posx){
				while (newPosx != this.posx) this.posx++;
			}
			else{
				while (newPosx != this.posx) this.posx--;
			}
		}
		else if (newPosy != this.posy){
			if (newPosy > this.posy){
				while (newPosy != this.posy) this.posy++;
			}
			else{
				while (newPosy != this.posy) this.posy--;
			}
		}
	}

	this.display = function () {
		stroke(this.color);
		fill(0);
		rect(this.posx, this.posy, this.width, this.height);
		fill(this.color);
		if (this.initWidth <= this.width - 16 && this.initHeight <= this.height - 16){
			rect(this.posx + 8, this.posy + 8, this.initWidth, this.initHeight, 10, 10, 10, 10);
			this.initHeight += 12;
			this.initWidth += 12;
		}
		else {
			rect(this.posx + 8, this.posy + 8, this.width - 16, this.height - 16, 10, 10, 10, 10);
			fill(255);
			textSize(20);
			text(String(this.number), this.posx + this.width * 0.45, this.posy + this.height * 0.6);
		}

	}

	this.displayImg = function (img) {
		image(img, this.posx, this.posy);
	}

	this.mouseMovedOver = function (x, y) {
		//this.color = color(255, 100);
		if( ( this.posx < x ) && ( x < this.posx + this.width ) &&
			( this.posy < y ) && ( y < this.posy + this.height ))
				this.color = color(50, 150, 200, 150);
		else this.color = color(50, 150, 200, 255);
	}

	this.clicked = function (x, y) {
		return ( ( this.posx < x ) && ( x < this.posx + this.width ) &&
				 ( this.posy < y ) && ( y < this.posy + this.height ));
	}

}