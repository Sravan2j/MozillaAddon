import java.io.File;
public class getScoresForAllFiles {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		float lower=Float.MAX_VALUE;
		float higher=Float.MIN_VALUE;
                File folder = new File("your/path");
                File[] listOfFiles = folder.listFiles();
                for (int i = 0; i < listOfFiles.length; i++) {
                    if (listOfFiles[i].isFile()) {
                        System.out.println("File " + listOfFiles[i].getName());
		        float score=GetScore.getscores(listOfFiles[i].getName(),args[1]);
		        if (score>higher) higher=score;
		        if (score<lower) lower=score;
                    } else if (listOfFiles[i].isDirectory()) {
                        System.out.println("Directory " + listOfFiles[i].getName());
                    }
                }
		System.out.println(lower);
		System.out.println(higher);

	}

}
