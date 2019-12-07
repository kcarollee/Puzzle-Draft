var seq = new Array();  //solving sequence          //next piece to place in edit mode
var auto_flag = false;


async function autoSolveInputEvent() {
    auto_flag = !auto_flag;

    if(auto_flag){
        console.log("auto...");
        timer = setInterval(solve, 500);
    }else{
        clearInterval(timer);
    }    
}
async function solveInputEvent() {
    solve();
}

function solve(){
   var rr=1;
    puzzle_N = parseInt(puzzle_N);
        for(var r=0; r<puzzle_N-2;r++){
            for(var c=0;c<puzzle_N;c++)  {
               movepiece(rr+c,r,c);
            } 
            rr = rr + puzzle_N;

        }
       // restore left columns
         for(c=0;c<puzzle_N-2;c++){
           // restore top tile of column.
           movepiece(rr,puzzle_N-2,c);
           // restore bottom tile of column
            if(none_col==c) pushi(3); //fill destination spot
            if(tileArray[r+1][c].getNumber()!=rr+puzzle_N){
                movepiece(rr+puzzle_N,puzzle_N-1,c+1);
                if(none_row!=puzzle_N-1) { 
                    if( none_col==c+1 ) pushi(3);
                    pushi(2);
                }
                //AXX
                //XB.
                while( none_col>c+2 ){ pushi(0);}
                console.log("Many push");
              pushi(0,0,1,3,2,3,1,0,0,2,3);
            }
            rr++;
        }
        console.log("for loop done");
       // last 2x2 square
        if(none_col<puzzle_N-1) pushi(3);
        if(none_row<puzzle_N-1) pushi(2);
        rr=(puzzle_N)*(puzzle_N)-puzzle_N-1;
       

        if(tileArray[puzzle_N-2][puzzle_N-2].getNumber()==rr+1) { pushi(1,0,2,3);}
        if(tileArray[puzzle_N-2][puzzle_N-2].getNumber()==rr+puzzle_N) {pushi(0,1,3,2);}
   // TODO : Fill the solving algorithm.
   console.log( auto_flag ? "auto solve " : "solve");
}

function pushi(){
    for (var i=0;i<pushi.arguments.length;i++){
        var c=pushi.arguments[i];
        if(seq.length && seq[seq.length-1]+c==3)  seq.length--;
        else seq[seq.length]=c;
        domove(c);
    }
}

function domove(m){  //0=left, 1=up, 2=down, 3=right for blank puzzle
    if(m==0) {move(none_row,none_col,none_row,none_col-1); none_col--; } 
    else if(m==1) {move(none_row,none_col,none_row-1,none_col); none_row--;}
    else if(m==2) {move(none_row,none_col,none_row+1,none_col); none_row++;}
    else if(m==3) {move(none_row,none_col,none_row,none_col+1); none_col++;}

 }


function movepiece(p,y,x){
   console.log ("movepiece(%d,%d,%d)",p,y,x);
   var i ,j;
    loop://moves piece p to position y,x without disturbing previously placed pieces.
    for( i=0;i<puzzle_N;i++){
        for( j=0;j<puzzle_N;j++){
           var tmp = tileArray[i][j].getNumber();
            if( tmp == p) {
               break loop;
              }
        }
    }
    //Move piece to same column         
    if(j<x && none_row==y) pushi(2);   
    while(j>x){
        //move piece to left
        //First move blank to left hand side of it
        if(none_row==i && none_col>j){    //if blank on wrong side of piece
            if(i==puzzle_N-1) pushi(1); else pushi(2); //then move it to other row
        }
        while(none_col>=j) pushi(0);    // move blank to column left of piece
        while(none_col<j-1) pushi(3);
        while(none_row<i) pushi(2);     // move blank to same row as piece
        while(none_row>i) pushi(1);
        pushi(3);                    // move piece to left.
        j--;
    }
    while(j<x){
        //move piece to right
        //First move blank to right hand side of it
        if(none_row==i && none_col<j){
            if(i==puzzle_N-1) pushi(1); else pushi(2);
        }
        while(none_col<=j) pushi(3);
        while(none_col>j+1) pushi(0);
        while(none_row<i) pushi(2);
        while(none_row>i) pushi(1);
        pushi(0);
        j++;
    }

    //Move piece up to same row  
    while(i>y){
        if(y<i-1){
            while(none_row<i-1) pushi(2);
            if(none_col==j) pushi( j==puzzle_N-1? 0:3);
            while(none_row>i-1) pushi(1);
            while(none_col<j) pushi(3);
            while(none_col>j) pushi(0);
            pushi(2);
        }else{
            if(j!=puzzle_N-1){
                if(none_row==i&&none_row != puzzle_N-1) pushi(2);
                while(none_col<j+1) pushi(3);
                while(none_col>j+1) pushi(0);
                while(none_row>i-1) pushi(1);
                while(none_row<i-1) pushi(2);
                pushi(0);pushi(2);
            }else{
                if(none_row<i && none_col==j){
                    while(none_row<i) pushi(2);
                }else{
                    while(none_row>i+1) pushi(1);
                    while(none_row<i+1) pushi(2);
                    while(none_col<j) pushi(3);
                    while(none_col>j) pushi(0);
                    pushi(1,1,0,2,3,2,0,1,1,3,2);
                }
            }
        }
        i--;
    }
    while(i<y){
        //move piece downwards
        //First move blank below tile
        if(none_col==j && none_row<i){
            if(j==puzzle_N-1) pushi(0); else pushi(3);
        }
        while(none_row>i+1) pushi(1);
        while(none_row<i+1) pushi(2);
        while(none_col<j) pushi(3);
        while(none_col>j) pushi(0);
        pushi(1);
        i++;
    }
}




