<?php
		$arr = array();
		$n=5; //5X5 퍼즐 
		$i=0;
		for($row=0;$row<$n;$row++) {
			for($column = 0; $column < $n;$column++) {
				$arr[$row][$column] = $i;
				$i++;
			}
		}
		$arr[2][4] = " "; // set blank

		print_puzzle();
		for ($i=0;$i<$n;$i++)
			for ($j=0;$j<$n;$j++)
					if ($arr[$i][$j] == " ") {   				$blank_row = $i;
							$blank_col = $j;
						}
		print "blank = ".$blank_row.",".$blank_col."<br>";
		$click_row = 2;
		$click_col = 2;
// arr 선언 , Blank Click 정의 

		if($click_row == $blank_row) {
			if($click_col > ($blank_col))
					move_left();
			else if($click_col < ($blank_col))
					move_right();
		}
		else if ($click_col == $blank_col) {
			if($click_row > ($blank_row))
				move_up();
			else if($click_row < ($blank_row))
				move_down();
		}
		else print ("움직이지 않습니다.<br>");

		print_puzzle();

		function move_left() {

			print "왼쪽으로 움직입니다.<br>";
			global $blank_row,$blank_col,$click_row,$click_col;
			global $arr;
			for ( $i=$blank_col;$i<$click_col;$i++) {
				$arr[$blank_row][$i] = $arr[$blank_row][$i+1];
			}
			$arr[$click_row][$click_col]= " ";
		}
		function move_right() {
			global $blank_row,$blank_col,$click_row,$click_col;
			global $arr;
			print "오른쪽으로 움직입니다.<br>";
			for ($i=$blank_col;$i>$click_col;$i--) {
				$arr[$blank_row][$i] = $arr[$blank_row][$i-1];
			}
			$arr[$click_row][$click_col]= " ";

		}function move_up() {
			global $blank_row,$blank_col,$click_row,$click_col;
			global $arr;
			print "위쪽으로 움직입니다.<br>";
			for ($i=$blank_row;$i<$click_row;$i++) {
				$arr[$i][$blank_col] = $arr[$i+1][$blank_col];
			}
			$arr[$click_row][$click_col]= " ";
		}function move_down() {
			global $blank_row,$blank_col,$click_row,$click_col;
			global $arr;
			print "아래쪽으로 움직입니다.<br>";
			for ($i=$blank_row;$i>$click_row;$i--) {
				$arr[$i][$blank_col] = $arr[$i-1][$blank_col];
			}
			$arr[$click_row][$click_col]= " ";

		}function print_puzzle() {
			global $n;
			global $arr;
			for ($i=0;$i<$n;$i++) {
			print"|";
				for($j=0;$j<$n;$j++) {
					print $arr[$i][$j].",";
				}
				print "|<br>";
			}
		}

?>