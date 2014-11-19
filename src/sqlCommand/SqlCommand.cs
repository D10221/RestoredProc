#r "System.dll"
#r "System.Data.dll"

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

public class Startup
{
    public async Task<object> Invoke(object input)
    {    
        return await Task<object>.Factory.StartNew( ()=>{
                    var parameters = (IDictionary<string,object>) input ;
                    var connectionString = parameters["connectionString"]as string;                
                    var sqlCmdText = parameters["sqlCmdText"] as string;                
                    return ExecuteReader(connectionString,sqlCmdText);                                
                }
            );
    }

static IEnumerable<IDictionary<string, object>> ExecuteReader(string connectionString,string sql){
    
    IEnumerable<IDictionary<string, object>> results;

    using (var cnx = new SqlConnection(connectionString)){
        using (var cmd = new SqlCommand(sql, cnx))
        {
            cnx.Open();
            
            using (var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection))
            {
                results = ToDictionaries(reader).ToArray();
            }

            cnx.Close();
        }
    }

    return results; 
}

public static IEnumerable<IDictionary<string, object>> ToDictionaries(IDataReader reader)
{
    var results = new List<IDictionary<string, object>>();

    while (reader.Read())
    {
        var result = new Dictionary<string, object>();

        for (var i = 0; i < reader.FieldCount; i++)
        {                   
            result.Add(reader.GetName(i), reader.GetValue(i));
        }

        results.Add(result);
    }
    return results;
}

}