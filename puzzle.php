<?PHP 

    $puzzle = init();
    print($puzzle);






    function init($N=3){
        $puzzle = array(
            array(),
            array(),
            array()
        );
		$size = $N * $N;

		for ($i = 0; $i < $size - 2; $i++)
			$puzzle[$i / $N][$i % $N] = $i;
		$puzzle[$N - 1][$N - 2] = -1;
		$puzzle[$N - 1][$N - 1] = -1;

		return $puzzle;
    }

    function print($puzzle){

        for($i=0;$i<$N;$i++){
            for($i=0;$i<$N;$i++)
                printf("%3d", $puzzle[$i][$j]);
            printf("<br>");
        }
    }
?>