

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

/**
 * Download image files.
 * 
 * @author itcuties
 *
 */
public class ImageDownloader {

	// Image path
	private String imageUrl;
	
	public ImageDownloader(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
	/**
	 * Download image to local drive
	 * @throws Exception 
	 */
	public StringBuilder download() throws Exception {
		// Open connection to the image
		URL url = new URL(imageUrl);
		InputStream is = url.openStream();
		StringBuilder sb = new StringBuilder();
		// Read bytes from URL to the local file
		byte[] buffer = new byte[4096];
		int bytesRead = 0;
		String line;
		BufferedReader br = null;
		try {
		br = new BufferedReader(new InputStreamReader(is));
		
		while ((line = br.readLine()) != null) {
			sb.append(line);
		}

	} catch (IOException e) {
		e.printStackTrace();
	} finally {
		if (br != null) {
			try {
				br.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
		
		//while ((bytesRead = is.read(buffer)) != -1)
		//{	//System.out.println(new String(buffer, 0, bytesRead));
			//sb.append(new String(buffer, 0, bytesRead));
		//}
		//}
		// Close URL stream
		is.close();
		//System.out.println(sb);
		return sb;
	}
}
