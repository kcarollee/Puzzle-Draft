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
    // TODO : Fill the solving algorithm.
    console.log( auto_flag ? "auto solve " : "solve");
}