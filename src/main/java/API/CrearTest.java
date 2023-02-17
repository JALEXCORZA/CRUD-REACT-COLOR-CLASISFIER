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


public class CrearTest extends HttpServlet {

    private PrintWriter outter;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        outter = response.getWriter();
                 response.setContentType("application/json");
      response.addHeader("Access-Control-Allow-Origin", "*");
      
        String pregunta = request.getParameter("color");
        String respuesta = request.getParameter("predictions");
        String r1 = request.getParameter("r1");
        String g1 = request.getParameter("g1");
        String b1 = request.getParameter("b1");

        
         // String pregunta = "rgb(0,250,0)";
       // String respuesta = "verde";
        //String r1 = "0";
        //String g1 ="250";
       // String b1 ="0";
        
        
        PrintWriter out = response.getWriter();
              

   Connection conn = null;
         try
        {
             
          Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost/color", "root", "1234");
        PreparedStatement pstmt = conn.prepareStatement("INSERT INTO colorclassifier VALUES(default,'"+pregunta+"','"+r1+"','"+g1+"','"+b1+"','"+respuesta+"');");
       // PreparedStatement pstmt = conn.prepareStatement("INSERT INTO preguntas VALUES(default,'p1c','r1c');");
            
            pstmt.executeUpdate();
        outter.write("asies"+respuesta+pregunta);
        }
        catch(Exception e)
        {
        e.printStackTrace();
        }
        
       }

       

}
