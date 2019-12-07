function Tile(number, posx, posy) {
	this.number = number;

	this.img;
	this.imgPosx;
	this.imgPosy;
	this.color = color(50, 150, 200, 255);

	this.posx = posx;
	this.posy = posy;

	this.size = TILE_SIZE;

	this.initWidth = 2;
	this.initHeight = 2;
	this.initImageWidth = 2;
	this.initImageHeight = 2;


	this.getNumber = function () {
		return this.number;
	}

	this.setImg = function (img) {
		this.img = img;
	}

	this.changeNumber = function (newNum) {
		this.number = newNum;
	}

	this.changePos = function(newPosx, newPosy){
		this.posx = newPosx;
		this.posy = newPosy;
	}
	this.changeImgPos = function (newPosx, newPosy) {
		this.imgPosx = newPosx;
		this.imgPosy = newPosy;
	}

	this.display = function () {
		stroke(this.color);
		fill(0);
		rect(this.posx, this.posy, this.size, this.size);
		fill(this.color);
		if (this.initWidth <= this.size * 0.9 && this.initHeight <= this.size * 0.9){
			rect(this.posx + this.size * 0.05, this.posy + this.size * 0.05, 
				this.initWidth, this.initHeight, 10, 10, 10, 10);
			this.initHeight += 12;
			this.initWidth += 12;
		}
		else {
			rect(this.posx + this.size * 0.05, this.posy + this.size * 0.05, 
				this.size * 0.9, this.size * 0.9, 10, 10, 10, 10);
			fill(255);
			textSize(this.size / 4);
			text(String(this.number), this.posx + this.size * 0.45, this.posy + this.size * 0.6);
		}

	}

	this.displayImg = function (img) {
		if (imgMode){			
			if (this.initImageWidth <= this.size  && this.initImageHeight <= this.size){				
				img.resize(this.initImageWidth, this.initImageHeight);
				image(img, this.posx, this.posy);
				this.initImageHeight += 12;
				this.initImageWidth += 12;
			}
			else {
				if (imgHintMode){
					this.display();
					if (frameCount / 30 < Math.PI / 2){
						img.resize(this.size - this.size * Math.abs( Math.sin(frameCount / 30)) + 1,
							this.size);
						image(img,this.posx +  this.size * Math.abs( Math.sin(frameCount / 30)) / 2 , this.posy);
					}	
					else if (frameCount / 30 > 1.5 * Math.PI && frameCount / 30 < 2 * Math.PI){
						img.resize(this.size - this.size * Math.abs( Math.sin(frameCount / 30)) + 1,
							this.size);
						image(img,this.posx +  this.size * Math.abs( Math.sin(frameCount / 30)) / 2 , this.posy);
					}
					else if (frameCount / 30 >= 2 * Math.PI) imgHintMode = false;
					
				}
				else image(img, this.posx, this.posy);

			}
			//if (imgHintMode)
		}
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