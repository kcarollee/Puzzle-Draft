public class Main {
	public static void main(String[] args) {
		int N = 20;
		int[][] puzzle = new int[N][N];

		long time_s = System.currentTimeMillis();
		long time_e = System.currentTimeMillis();

		time_s = System.currentTimeMillis();
		System.out.println("MIX 1");
		System.out.println();
		System.out.println();
		puzzle = mix.mix(puzzle);
		time_e = System.currentTimeMillis();
		System.out.println("MIX 1 Time :: " + (time_e - time_s) + "ms");

		time_s = System.currentTimeMillis();
		System.out.println("MIX 2");
		System.out.println();
		System.out.println();
		puzzle = mix.mix2(puzzle);
		time_e = System.currentTimeMillis();
		System.out.println("MIX 2 Time :: " + (time_e - time_s) + "ms");

	}

}
