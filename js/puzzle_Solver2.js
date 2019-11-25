var sR = 0; 
var sC = 0;
var auto_flag = false;
var auto_id = null;
var answer = null;
var un_row;
var un_col;

async function autoSolveInputEvent() {
    auto_flag = !auto_flag;

    if(auto_flag){
        console.log("auto...");
        timer = setInterval(solve, 1000);
    }else{
        clearInterval(timer);
    }    
}
async function solveInputEvent() {
    solve();
}

function puzzle_dist(){
    un_row = new Array(puzzle_N);
    un_col = new Array(puzzle_N);

    for(var i =0; i<puzzle_N ;i++){
        un_row [ i ] = 0;
        un_col [ i ] = 0;
    }
    for(var row=0;row<puzzle_N;row++){
        for(var col=0;col<puzzle_N;col++){
            var num = tileArray[row][col].getNumber();
            if(num=="") {
                num = puzzle_N*puzzle_N;
            }
            num--;
            var org_row = Math.floor(num/puzzle_N);
            var org_col = Math.floor(num%puzzle_N);
            var distance = Math.abs(row - org_row) + Math.abs(col - org_col);

            un_row[ org_row ] += distance;
            un_col[ org_col ] += distance;
        }
    }

    console.log('row  '+un_row);
    console.log('col  '+un_col);
}

function solve() {
    console.log( auto_flag ? "auto solve " : "solve");

    // if(answer==null){
     
    // }

    var dr = 1;
    var dc = 1;
    var num = tileArray[none_row][none_col].getNumber();

    if(""!=tileArray[sR][sC].getNumber()){
        sR = none_row;
        sC = none_col;
    }
    var nR = sR + dr;
    var nC = sC + dc;
    var imgPos = new Array(tileArray[sR][sC].imgPosx, tileArray[sR][sC].imgPosy);
    tileArray[sR][sC].changeNumber(tileArray[nR][nC].getNumber());
    tileArray[sR][sC].changeImgPos(tileArray[nR][nC].imgPosx, tileArray[nR][nC].imgPosy);
    tileArray[nR][nC].changeNumber(num);
    tileArray[nR][nC].changeImgPos(imgPos);


    puzzle_dist();
    none_row = nR;
    none_col = nC;
}

function solve_example() {
    if (mode == 0 || mode == 1) {
        mode = 3;
        blocksolve = 1;
        seq.length = 0;

        //no solution set up yet. Construct it!
        //save pieces;
        var back = new Array();
        for (var i = 0; i <= siz; i++) back[i] = posit[i];
        back[siz + 1] = blnkx;
        back[siz + 2] = blnky;

        //restore top rows
        var rr = 0;
        for (var r = 0; r < hgh - 2; r++) {
            for (var c = 0; c < wid; c++) movepiece(rr + c, r, c);
            rr += wid;
        }

        //restore left columns
        for (c = 0; c < wid - 2; c++) {
            //restore top tile of column.
            movepiece(rr, hgh - 2, c);
            //restore bottom tile of column
            if (blnkx == c) push(3); //fill destination spot
            if (posit[rr + wid] != rr + wid) {
                movepiece(rr + wid, hgh - 1, c + 1);
                if (blnky != hgh - 1) { //0=right, 1=down, 2=up, 3=left
                    //A.X or AX.
                    //XBX    XBX
                    if (blnkx == c + 1) push(3);
                    push(2);
                }
                //AXX
                //XB.
                while (blnkx > c + 2) push(0);
                push(0, 0, 1, 3, 2, 3, 1, 0, 0, 2, 3);
            }
            rr++;
        }
        //last 2x2 square
        if (blnkx < wid - 1) push(3);
        if (blnky < hgh - 1) push(2);
        rr = siz - wid - 1;
        if (posit[rr] == rr + 1) push(1, 0, 2, 3);
        if (posit[rr] == rr + wid) push(0, 1, 3, 2);
        //restore pieces;
        for (var i = 0; i <= siz; i++) posit[i] = back[i];
        blnkx = back[siz + 1];
        blnky = back[siz + 2];
        blocksolve = 0;
    }

    if (mode >= 3 && blocksolve == 0) {
        blocksolve = 1;
        //do next move of prerecorded sequence
        if (seq.length) {
            // var c=seq.shift();
            var c = seq[0];
            for (var i = 1; i < seq.length; i++) seq[i - 1] = seq[i];
            seq.length--;
            domove(c);
            if (c == 0) show(blnky, blnkx + 1);
            else if (c == 1) show(blnky + 1, blnkx);
            else if (c == 2) show(blnky - 1, blnkx);
            else if (c == 3) show(blnky, blnkx - 1);
            show(blnky, blnkx);
        }
        if (seq.length == 0) {
            mode = 0;
            displaybut();
        }
        blocksolve = 0;
    }
}

function movepiece(p, y, x) {
    //moves piece p to position y,x without disturbing previously placed pieces.
    var c = -1;
    for (var i = 0; i < hgh; i++) {
        for (var j = 0; j < wid; j++) {
            c++;
            if (posit[c] == p) break;
        }
        if (posit[c] == p) break;
    }
    //Move piece to same column         //0=right, 1=down, 2=up, 3=left
    if (j < x && blnky == y) push(2); // move blank down if it might disturb solved pieces.
    while (j > x) {
        //move piece to left
        //First move blank to left hand side of it
        if (blnky == i && blnkx > j) { //if blank on wrong side of piece
            if (i == hgh - 1) push(1);
            else push(2); //then move it to other row
        }
        while (blnkx >= j) push(0); // move blank to column left of piece
        while (blnkx < j - 1) push(3);
        while (blnky < i) push(2); // move blank to same row as piece
        while (blnky > i) push(1);
        push(3); // move piece to left.
        j--;
    }
    while (j < x) {
        //move piece to right
        //First move blank to right hand side of it
        if (blnky == i && blnkx < j) {
            if (i == hgh - 1) push(1);
            else push(2);
        }
        while (blnkx <= j) push(3);
        while (blnkx > j + 1) push(0);
        while (blnky < i) push(2);
        while (blnky > i) push(1);
        push(0);
        j++;
    }

    //Move piece up to same row         //0=right, 1=down, 2=up, 3=left
    while (i > y) {
        if (y < i - 1) {
            while (blnky < i - 1) push(2);
            if (blnkx == j) push(j == wid - 1 ? 0 : 3);
            while (blnky > i - 1) push(1);
            while (blnkx < j) push(3);
            while (blnkx > j) push(0);
            push(2);
        } else {
            if (j != wid - 1) {
                if (blnky == i) push(2);
                while (blnkx < j + 1) push(3);
                while (blnkx > j + 1) push(0);
                while (blnky > i - 1) push(1);
                while (blnky < i - 1) push(2);
                push(0, 2);
            } else {
                if (blnky < i && blnkx == j) {
                    while (blnky < i) push(2);
                } else {
                    while (blnky > i + 1) push(1);
                    while (blnky < i + 1) push(2);
                    while (blnkx < j) push(3);
                    while (blnkx > j) push(0);
                    push(1, 1, 0, 2, 3, 2, 0, 1, 1, 3, 2);
                }
            }
        }
        i--;
    }
    while (i < y) {
        //move piece downwards
        //First move blank below tile
        if (blnkx == j && blnky < i) {
            if (j == wid - 1) push(0);
            else push(3);
        }
        while (blnky > i + 1) push(1);
        while (blnky < i + 1) push(2);
        while (blnkx < j) push(3);
        while (blnkx > j) push(0);
        push(1);
        i++;
    }
}