var seq = new Array();  //solving sequence   
var backup = new Array();
var b_col;
var b_row;
var route = new Array();
var routeIndex = 0;
var solut_flag = 1;
var endIndex;
var success = 0;
var auto_flag = false;
function pushi(c){
    for (var i=0;i<pushi.arguments.length;i++){
        var c=pushi.arguments[i];
        if(seq.length && seq[seq.length-1]+c==3)  seq.length--;
        else seq[seq.length]=c;
        domove_bac(c);
        route[routeIndex] = c;
        console.log(route[routeIndex]);
        routeIndex++;
    }
}

function domove_bac(m) {
    if(m==0) {move_bac(b_row,b_col,b_row,b_col-1); b_col--; } 
    else if(m==1) {move_bac(b_row,b_col,b_row-1,b_col); b_row--;}
    else if(m==2) {move_bac(b_row,b_col,b_row+1,b_col); b_row++;}
    else if(m==3) {move_bac(b_row,b_col,b_row,b_col+1); b_col++;}
}

function move_bac(n_row,n_col,row,col) {
    var tmp = backup[b_row][b_col];
    backup[b_row][b_col] = backup[row][col];
    backup[row][col] = tmp;
}



function domove(m){  //0=left, 1=up, 2=down, 3=right for blank puzzle
    if(m==0) {move(none_row,none_col-1); } 
    else if(m==1) {move(none_row-1,none_col); }
    else if(m==2) {move(none_row+1,none_col); }
    else if(m==3) {move(none_row,none_col+1); }

 }


function movepiece(p,y,x){
   console.log ("movepiece(%d,%d,%d)",p,y,x);
   var i ,j;
    loop://moves piece p to position y,x without disturbing previously placed pieces.
    for( i=0;i<puzzle_N;i++){
        for( j=0;j<puzzle_N;j++){
           var tmp = backup[i][j];
            if( tmp == p) {
               break loop;
              }
        }
    }
    //Move piece to same column         
    if(j<x && b_row==y) pushi(2);   
    while(j>x){
        //move piece to left
        //First move blank to left hand side of it
        if(b_row==i && b_col>j){    //if blank on wrong side of piece
            if(i==puzzle_N-1) pushi(1); else pushi(2); //then move it to other row
        }
        while(b_col>=j) pushi(0);    // move blank to column left of piece
        while(b_col<j-1) pushi(3);
        while(b_row<i) pushi(2);     // move blank to same row as piece
        while(b_row>i) pushi(1);
        pushi(3);                    // move piece to left.
        j--;
    }
    while(j<x){
        //move piece to right
        //First move blank to right hand side of it
        if(b_row==i && b_col<j){
            if(i==puzzle_N-1) pushi(1); else pushi(2);
        }
        while(b_col<=j) pushi(3);
        while(b_col>j+1) pushi(0);
        while(b_row<i) pushi(2);
        while(b_row>i) pushi(1);
        pushi(0);
        j++;
    }

    //Move piece up to same row  
    while(i>y){
        if(y<i-1){
            while(b_row<i-1) pushi(2);
            if(b_col==j) pushi( j==puzzle_N-1? 0:3);
            while(b_row>i-1) pushi(1);
            while(b_col<j) pushi(3);
            while(b_col>j) pushi(0);
            pushi(2);
        }else{
            if(j!=puzzle_N-1){
                if(b_row==i&&b_row != puzzle_N-1) pushi(2);
                while(b_col<j+1) pushi(3);
                while(b_col>j+1) pushi(0);
                while(b_row>i-1) pushi(1);
                while(b_row<i-1) pushi(2);
                pushi(0);pushi(2);
            }else{
                if(b_row<i && b_col==j){
                    while(b_row<i) pushi(2);
                }else{
                    while(b_row>i+1) pushi(1);
                    while(b_row<i+1) pushi(2);
                    while(b_col<j) pushi(3);
                    while(b_col>j) pushi(0);
                    pushi(1,1,0,2,3,2,0,1,1,3,2);
                }
            }
        }
        i--;
    }
    while(i<y){
        //move piece downwards
        //First move blank below tile
        if(b_col==j && b_row<i){
            if(j==puzzle_N-1) pushi(0); else pushi(3);
        }
        while(b_row>i+1) pushi(1);
        while(b_row<i+1) pushi(2);
        while(b_col<j) pushi(3);
        while(b_col>j) pushi(0);
        pushi(1);
        i++;
    }
}



async function autoSolveInputEvent() {
    auto_flag = !auto_flag;

    if(auto_flag){
        console.log("auto...");
        if(puzzle_N == 10 ) {
            timer = setInterval(solve, 1);
        }else{
            timer = setInterval(solve, 50);
        }
    }else{
        clearInterval(timer);
    }    

}
async function solveInputEvent() {
    solve();
}

function solve() {
    if( solut_flag == 1 ) {
        solution();
        solut_flag = 0;
    }

    if( !puzzleSolved() ){
        domove(route[routeIndex++]);
    }
}


function solution(){
    console.log("none_row : %d, none_col : %d",none_row,none_col);
    b_col= none_col;
    b_row= none_row;
    console.log ("b_row : %d , b_col : %d",b_row,b_col);
    for (var q=0;q<puzzle_N;q++) {
        backup[q] = new Array();
        for (var w=0;w<puzzle_N;w++) {
            if(q==b_row&&w==b_col) {
                backup[q][w] = 0;
            }   
            else
            backup[q][w] = tileArray[q][w].getNumber();
        
        }
    }
    var rr=1;
    puzzle_N = parseInt(puzzle_N);
        for(var r=0; r<puzzle_N-2;r++){
            for(var c=0;c<puzzle_N;c++)  {
               movepiece(rr+c,r,c);
            } 
            rr = rr + puzzle_N;

        }
        for(q=0;q<puzzle_N;q++) {
    for(w=0;w<puzzle_N;w++) {
        console.log("backup[%d][%d] : %d",q,w,backup[q][w]);
    }
}
       // restore left columns
         for(c=0;c<puzzle_N-2;c++){
           // restore top tile of column.
           movepiece(rr,puzzle_N-2,c);
           // restore bottom tile of column
            if(b_col==c) pushi(3); //fill destination spot
            if(backup[r+1][c]!=rr+puzzle_N){
                movepiece(rr+puzzle_N,puzzle_N-1,c+1);
                if(b_row!=puzzle_N-1) { 
                    if( b_col==c+1 ) pushi(3);
                    pushi(2);
                }
                //AXX
                //XB.
                while( b_col>c+2 ){ pushi(0);}
                console.log("Many push");
              pushi(0,0,1,3,2,3,1,0,0,2,3);
            }
            rr++;
        }
        console.log("for loop done");
       // last 2x2 square
        if(b_col<puzzle_N-1) pushi(3);
        if(b_row<puzzle_N-1) pushi(2);
        rr=(puzzle_N)*(puzzle_N)-puzzle_N-1;
       

        if(backup[puzzle_N-2][puzzle_N-2]==rr+1) { pushi(1,0,2,3);}
        if(backup[puzzle_N-2][puzzle_N-2]==rr+puzzle_N) {pushi(0,1,3,2);}
   // TODO : Fill the solving algorithm.
   for(q=0;q<puzzle_N;q++) {
    for(w=0;w<puzzle_N;w++) {
        console.log("backup[%d][%d] : %d",q,w,backup[q][w]);
    }
   }
   endIndex = routeIndex;
   console.log( auto_flag ? "auto solve " : "solve");
   console.log("none_row : %d, none_col : %d",none_row,none_col);
   routeIndex = 0;

}

function moveAfterSolve(){
    route = new Array();
    solut_flag = 1;
}

function puzzleSolved() {

	for (var row = 0; row < puzzle_N; row++) {
		for (var col = 0; col < puzzle_N; col++) {
			var num = row * puzzle_N + col + 1;

			if(num == puzzle_N*puzzle_N){
				if(tileArray[row][col].getNumber() != ""){
					return false;
				}
			}else{
				if (tileArray[row][col].getNumber() != num) {
					return false;
				}
			}
		}
	}
	return true;
}
