

public class Lock {

	private int runningThreadsNumber;
	public StringBuilder stb = new StringBuilder();
	public Lock() {
		runningThreadsNumber = 0;
	}

	public int getRunningThreadsNumber() {
		return runningThreadsNumber;
	}
	public void setRunningThreadsNumber(int count) {
		runningThreadsNumber=count;
	}

	public void addRunningThread() {
		runningThreadsNumber++;
	}
	
	public void removeRunningThread() {
		runningThreadsNumber--;
	}
}
