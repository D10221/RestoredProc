#r "System.dll"

using System.Collections.Generic;
using System.Threading.Tasks;

public class Startup {	
	public async Task<object> Invoke(object input){
		return await Task<object>.Factory.StartNew(
			()=>{
				var parameters = input as IDictionary<string,object>;
				return parameters["what"] as string ;
			}
		);
	}
}
