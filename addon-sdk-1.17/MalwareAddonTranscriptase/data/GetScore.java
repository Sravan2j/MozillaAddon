import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class GetScore {

	/**
	 * @param args
	 */
	public static float getscores(String file1, String file2)
	{
		Map<String, Integer> map = new HashMap<String, Integer>();
		int ind=0;
		File f = new File(file1);
		
		if (f.exists())
		{
			try
			{
				BufferedReader br = new BufferedReader(new FileReader(f));
				String line;
				while ((line=br.readLine())!=null)
				{
					if(!map.containsKey(line))
					{
						map.put(line, ind);
						ind++;
					}
				}
				br.close();
			}
			catch (IOException e){
				
			}
		}
		
		File f2 = new File(file2);
		
		if (f2.exists())
		{
			try
			{
				BufferedReader br = new BufferedReader(new FileReader(f2));
				String line;
				while ((line=br.readLine())!=null)
				{
					if(!map.containsKey(line))
					{
						map.put(line, ind);
						ind++;
					}
				}
				br.close();
			}
			catch (IOException e){
				
			}
		}
		float[][] matrix = new float[ind][ind];
		for (int i=0;i<ind;i++)
		{
			for (int j=0;j<ind;j++)
			{
				matrix[i][j]=0;
			}
		}
		try
		{
			BufferedReader br = new BufferedReader(new FileReader(f));
			String line1,line2;
			if((line1=br.readLine())!=null)
			{
				while ((line2=br.readLine())!=null)
				{					
					matrix[map.get(line1)][map.get(line2)] = matrix[map.get(line1)][map.get(line2)] + 1;
					line1=line2;					
				}
			}
			br.close();
		}
		catch (IOException e){
			
		}
		
		float[][] probabilities = new float[ind][ind];
		for (int i=0;i<ind;i++)
		{
			float rowsum = 0;
			for (int j=0;j<ind;j++)
			{
				rowsum = rowsum + matrix[i][j];
			}
			if (rowsum==0)
			{
				for (int j=0;j<ind;j++)
				{
					probabilities[i][j]=0;
				}
			}
			else
			{
				for (int j=0;j<ind;j++)
				{
					probabilities[i][j] = matrix[i][j]/rowsum;
				}
				
			}
		}
		
		
		
		float[][] matrix2 = new float[ind][ind];
		for (int i=0;i<ind;i++)
		{
			for (int j=0;j<ind;j++)
			{
				matrix2[i][j]=0;
			}
		}
		try
		{
			BufferedReader br = new BufferedReader(new FileReader(f2));
			String line1,line2;
			if((line1=br.readLine())!=null)
			{
				while ((line2=br.readLine())!=null)
				{					
					matrix2[map.get(line1)][map.get(line2)] = matrix2[map.get(line1)][map.get(line2)] + 1;
					line1=line2;					
				}
			}
			br.close();
		}
		catch (IOException e){
			
		}
		
		float[][] probabilities2 = new float[ind][ind];
		for (int i=0;i<ind;i++)
		{
			float rowsum = 0;
			for (int j=0;j<ind;j++)
			{
				rowsum = rowsum + matrix2[i][j];
			}
			if (rowsum==0)
			{
				for (int j=0;j<ind;j++)
				{
					probabilities2[i][j]=0;
				}
			}
			else
			{
				for (int j=0;j<ind;j++)
				{
					probabilities2[i][j] = matrix2[i][j]/rowsum;
				}
				
			}
		}
		
		
		float sum=0;
		for (int i=0;i<ind;i++)
		{
			for (int j=0;j<ind;j++)
			{
				sum = sum + (probabilities[i][j] - probabilities2[i][j]);
			}
		}
		//sum=sum*10000; //fix
		float score = (sum*sum)/(ind*ind);
		return score;
	}
	

}
