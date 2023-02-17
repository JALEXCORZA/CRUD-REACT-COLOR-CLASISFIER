package API;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class Editar extends HttpServlet {

    private PrintWriter outter;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        outter = response.getWriter();
                 response.setContentType("application/json");
      response.addHeader("Access-Control-Allow-Origin", "*");
     
      
      
        String id=request.getParameter("id");
        String pregunta = request.getParameter("question");
        String respuesta = request.getParameter("respuesta");
         String r1 = request.getParameter("r");
        String g1 = request.getParameter("g");
        String b1 = request.getParameter("b");
      
    
    /*
    String id="3";
      String pregunta = "rgb(0,0,0)";
        String respuesta = "negro";
        String r1 = "0";
        String g1 ="0";
        String b1 ="0";
       */ 
        
        PrintWriter out = response.getWriter();
              

   Connection conn = null;
         try
        {
              outter.write("asies"+respuesta+pregunta);
          Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost/color", "root", "1234");
     
       PreparedStatement pstmt = conn.prepareStatement("UPDATE colorclassifier SET pregunta='"+pregunta+"',r='"+r1+"',g='"+g1+"',b='"+b1+"', respuesta ='"+respuesta+"' WHERE id='"+id+"';");
     
            
            pstmt.executeUpdate();

       
        }
        catch(Exception e)
        {
        e.printStackTrace();
        }
        
       }

       

}
