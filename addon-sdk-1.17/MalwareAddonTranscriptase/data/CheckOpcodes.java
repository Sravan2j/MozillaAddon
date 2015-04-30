public class CheckOpcodes {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		float lower=Float.MAX_VALUE;
		float higher=Float.MIN_VALUE;
		float score=GetScore.getscores(args[0],args[1]);
		System.out.println(score);
		if (score>higher) higher=score;
		if (score<lower) lower=score;


	}

}
