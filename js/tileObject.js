function Tile(number, posx, posy) {
	this.img;
	this.number = number;
	this.posx = posx;
	this.posy = posy;

	this.size = TILE_SIZE;



	this.color = color(50, 150, 200, 255);
	this.initWidth = 2;
	this.initHeight = 2;

	this.getNumber = function () {
		return this.number;
	}

	this.setImg = function (img) {
		this.img = img;
	}

	this.getImg = function (){
		return this.img;
	}

	this.changeImg = function (img) {
		this.img = img;
	}

	this.changeNumber = function (newNum) {
		this.number = newNum;
	}

	this.changePos = function(newPosx, newPosy){
		this.posx = newPosx;
		this.posy = newPosy;
	}

	this.display = function () {
		stroke(this.color);
		fill(0);
		rect(this.posx, this.posy, this.size, this.size);
		fill(this.color);
		if (this.initWidth <= this.size - 16 && this.initHeight <= this.size - 16){
			rect(this.posx + 8, this.posy + 8, this.initWidth, this.initHeight, 10, 10, 10, 10);
			this.initHeight += 12;
			this.initWidth += 12;
		}
		else {
			rect(this.posx + 8, this.posy + 8, this.size - 16, this.size - 16, 10, 10, 10, 10);
			fill(255);
			textSize(20);
			text(String(this.number), this.posx + this.size * 0.45, this.posy + this.size * 0.6);
		}

	}

	this.displayImg = function (img) {
		image(this.img, this.posx, this.posy);
	}

	this.mouseMovedOver = function (x, y) {
		//this.color = color(255, 100);
		if( ( this.posx < x ) && ( x < this.posx + this.size ) &&
			( this.posy < y ) && ( y < this.posy + this.size ))
				this.color = color(50, 150, 200, 150);
		else this.color = color(50, 150, 200, 255);
	}

	this.clicked = function (x, y) {
		return ( ( this.posx < x ) && ( x < this.posx + this.size ) &&
				 ( this.posy < y ) && ( y < this.posy + this.size ));
	}

}