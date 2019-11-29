var mouseR;// = Math.floor(mouseY/tileHeight);
var mouseC; //= Math.floor(mouseX/tileWidth);
var lastR = 0;
var lastC = 0;

function mouseMoved() {
    mouseR = Math.floor(mouseY/tileHeight);
    mouseC = Math.floor(mouseX/tileWidth);

    if(0 <= mouseR && mouseR < puzzle_N  && 0 <= mouseC && mouseC < puzzle_N ) {
       //console.log(`last(`+lastR +` ` + lastC+`) to now(`+mouseR +` ` + mouseC+`)`);
        tileArray[mouseR][mouseC].mouseMovedOver(mouseX, mouseY);
        tileArray[lastR][lastC].mouseMovedOver(mouseX, mouseY);
        lastR = mouseR;
        lastC = mouseC;  
    }
}

