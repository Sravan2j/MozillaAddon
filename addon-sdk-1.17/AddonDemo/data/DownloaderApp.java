

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;

public class DownloaderApp {

	public static void main(String[] args) {
		// Images URLs
			
		BufferedReader br;
		Writer writer = null;
		
		try {
			writer = new BufferedWriter(new OutputStreamWriter(
			          new FileOutputStream("test2.js"), "utf-8"));

			
			br = new BufferedReader(new FileReader(args[0]));
			
			String line;
			Lock lock = new Lock();	// A lock object to synchronize threads on it.
			
			int count = 0;
			if ((line = br.readLine()) != null)
				count=Integer.parseInt(line);
			lock.setRunningThreadsNumber(count);
			while ((line = br.readLine()) != null) {
			   
			   if (count>0)
			   {
				   count--;
				   //System.out.print(line);
				   DownloadThread dt = new DownloadThread(line, lock);
					dt.start();	// Start download in another thread
				   
			   }
			   else
			   {
				   writer.write(line);
			   }
			}
			
			//System.out.println(lock.getRunningThreadsNumber());
			
			// Wait here for all the threads to end
			while (lock.getRunningThreadsNumber() > 0)
			{
				synchronized (lock) {
					
					lock.wait();
					
				}
			}
			//System.out.println("output:"+lock.stb.length());
			writer.write(lock.stb.toString());
			
			writer.close();
			br.close();
			
		} 
		catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
