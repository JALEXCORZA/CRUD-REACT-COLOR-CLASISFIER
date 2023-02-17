package API;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class PreguntasTest extends HttpServlet {

    private PrintWriter outter;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        outter = response.getWriter();
                 response.setContentType("application/json");
      response.addHeader("Access-Control-Allow-Origin", "*");
 
        PrintWriter out = response.getWriter();
              
         boolean b = true;
        StringBuilder json1 = new StringBuilder();
                 
                   
         try
        {
        DB bd= new DB();
        bd.setConnection("com.mysql.jdbc.Driver", "jdbc:mysql://localhost/color");
        ResultSet rs=bd.executeQuery("SELECT * FROM color.colorclassifier;");
         json1.append("[");  
       while(rs.next())
        {
            b=false;
            String id,pregunta,respuesta,r1,g1,b1;
           
             json1.append("{");  
        
            id = jsonValue("id",rs.getString("ID"));
            json1.append(id);  
              json1.append(",");      
            pregunta = jsonValue("pregunta",rs.getString("pregunta"));
            json1.append(pregunta);  
              json1.append(",");    
              r1 = jsonValue("r",rs.getString("r"));
            json1.append(r1);  
              json1.append(",");    
              g1 = jsonValue("g",rs.getString("g"));
            json1.append(g1);  
              json1.append(",");    
              b1 = jsonValue("b",rs.getString("b"));
            json1.append(b1);  
              json1.append(",");    
            respuesta = jsonValue("respuesta",rs.getString("respuesta"));
            json1.append(respuesta);    
           
                   json1.append("}");  
                   
                  
                       
                   json1.append(","); 
           
         
              // rs.next();
      
           
      
        
     
        }
       
        json1.append("{"); 
        json1.append(jsonValue("ID","default"));  
        json1.append(",");    
        json1.append(jsonValue("pregunta","pregunta por defecto"));
        json1.append(",");    
        json1.append(jsonValue("respuesta","respuesta por defecto"));  
         json1.append("}"); 
     
       json1.append("]");
       outter.write(json1.toString());
        if(b)
        {
        out.write(devolverJSONError());
        }
        }
        catch(Exception e)
        {
        e.printStackTrace();
        }
        
       }

        private String devolverJSON (String cadena) {
        StringBuilder json = new StringBuilder();
        
        json.append("[");
        json.append("{");
        json.append(cadena);
        json.append("}");
        json.append("]");
        return json.toString();
    }
    
    private String devolverJSONError() {
        StringBuilder json = new StringBuilder();
        json.append("[");
        json.append("{");
        json.append(jsonValue("usuario", "error"));
        json.append("}");
        json.append("]");
        return json.toString();
    }

    private String jsonValue(String key, Object value) {
        return new StringBuilder()
                .append("\"")
                .append(key)
                .append("\" : \"")
                .append(value)
                .append("\"")
                .toString();
    }

}
