function draw() {
    if (reset) {
        setPuzzle(puzzle_N);
        reset = false;
        imgMode = false;
    }
    background(0);
  
    if (puzzleSolved()) {
        tileArray.forEach(function (element) {
            element.forEach(function (e) {
                e.color = color(Math.abs(200 * Math.sin(frameCount / 20 - e.posx)),  Math.abs(80 * Math.cos(frameCount / 20 - e.posy)),  50 * Math.sin(frameCount / 15 - e.posx * e.posy));
            });
        });
    }

    for(var row = 0 ; row < puzzle_N ;row++ ){
        for(var col = 0; col < puzzle_N ; col++){

            const Tile = tileArray[row][col];

            if(imgMode){
                // puzzleImg.resize(450, 450);

                var num = Tile.getNumber();
                if ( num !== "") {
                    num++;
                    Tile.displayImg( Tile.img );
                }

            }else{
                Tile.display();
            }
          }
    }
}




function highlight() {
  dropzone.style('background-color', '#ccc');
}

function unhighlight() {
  dropzone.style('background-color', '#fff');
}