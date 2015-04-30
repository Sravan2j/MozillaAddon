

public class DownloadThread extends Thread {
	private String imageUrl;
	private Lock lock;
	
	public DownloadThread(String imageUrl, Lock lock) {
		this.imageUrl = imageUrl;
		this.lock = lock;
	}
	
	@Override
	public void run() {
		try {
			//lock.addRunningThread();
			
			StringBuilder sb = new ImageDownloader(imageUrl).download();
			//System.out.println(sb);
			lock.removeRunningThread();
			
			synchronized (lock) {
				//System.out.println(sb.length());
				lock.stb.append(sb.toString()+"\n");
				//System.out.println(lock.stb);
				lock.notify();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}