<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="Author" content="Team IPv6 / University of Seoul /">
    <meta name="description" content="Studying for web pages" />
  
    <title >Number Puzzle ver 3 </title>
  
    <!-- // Module // -->
    <script type="text/javascript" src="module/p5.js"></script>
    <script type="text/javascript" src="module/p5.dom.js"></script>
  
    <!-- // JavaScript // -->
    <script type="text/javascript" src="js/puzzleSetup.js"></script>
    <script type="text/javascript" src="js/puzzle.js"></script>
    <script type="text/javascript" src="js/tileObject.js"></script>
    <script type="text/javascript" src="js/tileMovement.js"></script>
    <script type="text/javascript" src="js/fileInput.js"></script>
    <script type="text/javascript" src="js/puzzleSolver.js"></script>
    <script type="text/javascript" src="js/puzzle_Solver3.js"></script>
    <script type="text/php" src="php/puzzle.php"></script>
    <script type="text/javascript" src="js/mouse.js"></script>
  
    <!-- // css // -->
    <link rel="stylesheet" type="text/css" href="css/number_puzzle.css">
</head>

<body style="background-color: rgb(0, 0, 0, 0.5)"> 
    <div id="viewContainer">
        <div id="title">NUMBER PUZZLE ver 3</div>
        <form id="rowNumInput" method="get">Number of rows (from 2 to 10):
            <input type="number" name="rowNumber" id="rowNum" min=2 max=10>
            <input type="submit" onclick="myInputEvent()" value="Submit">
            <input type="button" onclick="hintEvent()" value="Hint">
            <input type="button" onclick="solveInputEvent();" value="Solve">
            <input type="button" onclick="autoSolveInputEvent();" value="AutoSolve">
  
            <?PHP 
              if (isset($_GET['rowNumber']) AND 1 < $_GET['rowNumber'] AND $_GET['rowNumber']<11){
                $N = $_GET['rowNumber'];
              }else $N = 5;
    
              $number_array = array(); // array that gets passed over to jsprint
              $puzzle = puzzle_mix(puzzle_init($N), $N);
    
              for($row=0;$row<$N;$row++){
                  for($col=0;$col<$N;$col++){
                    array_push($number_array, $puzzle[$row][$col]);
                  }
              }
    
              function puzzle_init($N=3){
                  $puzzle = array();
                  $size = $N * $N;
      
                  for ($num = 0; $num < $size - 2; $num++)
                      $puzzle[$num / $N][$num % $N] = $num;
                  $puzzle[$N - 1][$N - 2] = -1;
                  $puzzle[$N - 1][$N - 1] = -1;
      
                  return $puzzle;
              }
    
              function puzzle_mix($puzzle = array(), $N){
                  $puzzle = puzzle_init($N);
                  $size = $N * $N;
      
                  for ($i = 0; $i < $N * $size ; $i++) {
                      $r1 = floor(rand(0, $N-1));
                      $r2 = floor(rand(0, $N-1));
        
                      for ($j = 0; $j < $N; $j++) {
                        $tmp = $puzzle[$r1][$j];
                        $puzzle[$r1][$j] = $puzzle[$r2][$j];
                        $puzzle[$r2][$j] = $puzzle[$j][$r1];
                        $puzzle[$j][$r1] = $puzzle[$j][$r2];
                        $puzzle[$j][$r2] = $tmp;
                      }
                  }
      
                  $puzzle = parity_check($puzzle, $N);
                  return $puzzle;
              }
    
              function parity_check($puzzle, $N) {
                  $size = $N * $N;
    
                  $pos1 = -1;
                  $pos2 = -1;
                  $check = 0;
    
                  for ($row = 0; $row < $N; $i++) {
                    for ($col = 0; $col < $N; $col++) {
                      if ($puzzle[$row][$col] < 0) {
                        if ($pos1 < 0) {
                          $pos1 = $row * $N + $col;
                          $puzzle[$row][$col] = $size - 2;
                        } else {
                          $pos2 = $row * $N + $col;
                          $puzzle[$row][$col] = $size - 1;
                        }
                      } else if ($puzzle[$row][$col] == 0) {
                        $check -= $row + $col;
                      }
                    }
                  }
     
                  for ($prev = 0; $prev < $size ; $prev++) {
                      for ($next = $prev+1 ; $next < $size; $next++) {
                          if ($puzzle[$prev/$N][$prev%$N] < $puzzle[$next/$N][$next%$N])
                              $check++;
                      }
                  }
                
                  if ( $check % 2 == 0 ) {
                      $puzzle[$pos1 / $N][$pos1 % $N] = $size - 1;
                      $puzzle[$pos2 / $N][$pos2 % $N] = $size - 2;
                  }
    
                  return $puzzle;
              }
            ?>
        </div>

        <script>
            var numberArray = <?php echo json_encode($number_array);?>;
            var puzzle_N = <?php echo json_encode($N);?>;
            for (var i = 0; i < numberArray.length; i++) console.log(numberArray[i]);
        </script>
    </form>
    <div id="puzzle"></div>
        <p id="dropzone">Drag and drop image file here</p>
    </div>
</body>
</html>