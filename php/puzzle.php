<?PHP 
<<<<<<< HEAD
      echo $_GET['rowNumber'];
      if (isset($_GET['rowNumber'])){

       $N = $_GET['rowNumber'];
       print "rowNUMBER: ".$N."<br>";
     }
    else $N = 5;
=======
    $N =2;
    $number_array = array();
>>>>>>> 41c02653c7b6d0cd9bb4459a4ab90c522aae518b
    $puzzle = puzzle_init($N);
    $number_array = array(); // array that gets passed over to jsprint
    /*
    puzzle_print($puzzle, $N);
    print("<br>");
    print("<br>");
    print("MIX 1 <br>");
    */
    $puzzle = puzzle_mix($puzzle, $N);
    /*
    puzzle_print($puzzle, $N);
    print("<br>");
    print("<br>");
    print("MIX 2 <br>");
    */
    $puzzle = puzzle_mix2($puzzle, $N);
<<<<<<< HEAD
    //puzzle_print($puzzle, $N);
    
    // push $puzzle elements to $number_array
    for($i=0;$i<$N;$i++){
        for($j=0;$j<$N;$j++){
          if ($puzzle[$i][$j] == pow($N, 2) - 1) continue;
          array_push($number_array, $puzzle[$i][$j] + 1);
        }
    }

    foreach ($number_array as $elem) {
      print $elem."<br>";
=======
    puzzle_print($puzzle, $N);
    for($i=0;$i<$N;$i++){
            for($j=0;$j<$N;$j++){
              //if ($puzzle[$i][$j] == pow($N, 2) - 1) continue;
              array_push($number_array, $puzzle[$i][$j]);
            }
    }

    foreach($number_array as $n){
      print $n." ";

>>>>>>> 41c02653c7b6d0cd9bb4459a4ab90c522aae518b
    }

    function puzzle_init($N=3){
        $puzzle = array();
    $size = $N * $N;

<<<<<<< HEAD
    for ($i = 0; $i < $size - 1; $i++)
    // for ($i = 0; $i < $size - 2; $i++)
            $puzzle[$i / $N][$i % $N] = $i;
    // $puzzle[$N - 1][$N - 2] = -1;
    // $puzzle[$N - 1][$N - 1] = -1;
    $puzzle[$N - 1][$N - 1] = 0;
=======
    for ($i = 0; $i < $size - 2; $i++)
            $puzzle[$i / $N][$i % $N] = $i;
    $puzzle[$N - 1][$N - 2] = -1;
    $puzzle[$N - 1][$N - 1] = -1;
>>>>>>> 41c02653c7b6d0cd9bb4459a4ab90c522aae518b

    return $puzzle;
    }

    function puzzle_print($puzzle, $N){
        for($i=0;$i<$N;$i++){
            for($j=0;$j<$N;$j++)
                printf("%3d",$puzzle[$i][$j]);
            printf("<br>");
        }
    }

    function puzzle_mix($puzzle = array(), $N){
        $puzzle = puzzle_init($N);
        $size = $N * $N;

    for ($i = 0; $i < $N*$N; $i++) {
      $src = floor(rand(0, $size-1));
      $tgt = floor(rand(0, $size-1));

      $tmp = $puzzle[$src/$N][$src%$N];
      $puzzle[$src/$N][$src%$N] = $puzzle[$tgt/$N][$tgt%$N];
      $puzzle[$tgt/$N][$tgt%$N] = $tmp;
    }

    $puzzle = parity_check($puzzle, $N);
        posCount($puzzle, $N);
    return $puzzle;
    }

    function puzzle_mix2($puzzle = array(), $N){
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
        posCount($puzzle, $N);
    return $puzzle;
    }

    function parity_check($puzzle, $N) {
    $size = $N * $N;

    $pos1 = -1;
    $pos2 = -1;
    $check = 0;

    for ($i = 0; $i < $N; $i++) {
      for ($j = 0; $j < $N; $j++) {
        if ($puzzle[$i][$j] < 0) {
          if ($pos1 < 0) {
            $pos1 = $i * $N + $j;
            $puzzle[$i][$j] = $size - 2;
          } else {
            $pos2 = $i * $N + $j;
            $puzzle[$i][$j] = $size - 1;
          }
        } else if ($puzzle[$i][$j] == 0) {
          $check -= $i + $j;
        }
      }
    }

    for ($i = 0; $i < $size ; $i++) {
      for ($j = 0; $j < $i; $j++) {
        if ($puzzle[$j/$N][$j%$N] > $puzzle[$i/$N][$i%$N])
          $check++;
      }
    }

    if ($check % 2 == 0) {
      $puzzle[$pos1 / $N][$pos1 % $N] = $size - 1;
      $puzzle[$pos2 / $N][$pos2 % $N] = $size - 2;
    }

    return $puzzle;
  }


    function posCount($puzzle, $N) {
    $posCnt = 0;

    $basePuzzle = puzzle_init($N);

    for ($i = 0; $i < $N; $i++) {
      for ($j = 0; $j < $N; $j++) {
        if ($puzzle[$i][$j] == $basePuzzle[$i][$j]) {
          $posCnt++;
        }
      }
    }

<<<<<<< HEAD
        //printf($posCnt."개 unmixed <br>");
=======
        printf($posCnt."개 unmixed <br>");
>>>>>>> 41c02653c7b6d0cd9bb4459a4ab90c522aae518b
  }

?>