public class print {
	public static void print(int[][] puzzle) {

		for (int i = 0; i < puzzle.length; i++) {
			for (int j = 0; j < puzzle[0].length; j++) {
				System.out.printf("%5d", puzzle[i][j]);
			}
			System.out.println();
		}
	}

}
