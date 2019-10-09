public class mix {
	static int N;
	static int size;

	public static int posCount(int[][] puzzle) {
		int posCnt = 0;

		int[][] basePuzzle = new int[N][N];
		int x = 1;
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				basePuzzle[i][j] = x++;
			}
		}

		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				if (puzzle[i][j] == basePuzzle[i][j]) {
					posCnt++;
				}
			}
		}

		System.out.println(posCnt + "개 same");
		return posCnt;
	}

	// public static int[][] mix2(int[][] puzzle) {

	// 	puzzle = init(puzzle);

	// 	for (int i = 0; i < N * N * N; i++) {

	// 		int r1 = (int) Math.floor(Math.random() * (N));
	// 		int r2 = (int) Math.floor(Math.random() * (N));

	// 		for (int j = 0; j < N; j++) {
	// 			int tmp = puzzle[r1][j];
	// 			puzzle[r1][j] = puzzle[r2][j];
	// 			puzzle[r2][j] = puzzle[j][r1];
	// 			puzzle[j][r1] = puzzle[j][r2];
	// 			puzzle[j][r2] = tmp;
	// 		}

	// 	}

	// 	puzzle = check(puzzle);

	// 	print.print(puzzle);

	// 	posCount(puzzle);

	// 	return puzzle;
	// }

	// public static int[][] init(int[][] puzzle) {
	// 	N = puzzle.length;
	// 	size = N * N;

	// 	puzzle[N - 1][N - 2] = -1;
	// 	puzzle[N - 1][N - 1] = -1;
	// 	for (int i = 0; i < N * N - 2; i++) {
	// 		puzzle[i / N][i % N] = i;
	// 	}

	// 	return puzzle;
	// }

	// public static int[][] mix(int[][] puzzle) {
	// 	init(puzzle);

	// 	for (int i = 0; i < N * N; i++) {
	// 		int src = (int) Math.floor(Math.random() * (size));
	// 		int tgt = (int) Math.floor(Math.random() * (size));

	// 		int tmp = puzzle[src / N][src % N];
	// 		puzzle[src / N][src % N] = puzzle[tgt / N][tgt % N];
	// 		puzzle[tgt / N][tgt % N] = tmp;
	// 	}

	// 	puzzle = check(puzzle);

	// 	print.print(puzzle);

	// 	posCount(puzzle);

	// 	return puzzle;
	// }

	// public static int[][] check(int[][] puzzle) {
	// 	int size = N * N;

	// 	int pos1 = -1;
	// 	int pos2 = -1;
	// 	int check = 0;

	// 	for (int i = 0; i < N; i++) {
	// 		for (int j = 0; j < N; j++) {
	// 			if (puzzle[i][j] < 0) {
	// 				if (pos1 < 0) {
	// 					pos1 = i * N + j;
	// 					puzzle[i][j] = N * N - 2;
	// 				} else {
	// 					pos2 = i * N + j;
	// 					puzzle[i][j] = N * N - 1;
	// 				}
	// 			} else if (puzzle[i][j] == 0) {
	// 				check -= i + j;
	// 			}
	// 		}
	// 	}

	// 	for (int i = 0; i < N * N; i++) {
	// 		for (int j = 0; j < i; j++) {
	// 			if (puzzle[j / N][j % N] > puzzle[i / N][i % N])
	// 				check++;
	// 		}
	// 	}

	// 	if (check % 2 == 0) {
	// 		puzzle[pos1 / N][pos1 % N] = N * N - 1;
	// 		puzzle[pos2 / N][pos2 % N] = N * N - 2;
	// 	}

	// 	return puzzle;
	// }
}
