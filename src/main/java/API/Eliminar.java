
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


public class Eliminar extends HttpServlet {

    private PrintWriter outter;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        outter = response.getWriter();
                 response.setContentType("application/json");
      response.addHeader("Access-Control-Allow-Origin", "*");
        String pregunta = request.getParameter("question");
        String respuesta = request.getParameter("respuesta");
        PrintWriter out = response.getWriter();
              

   Connection conn = null;
         try
        {
             
          Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost/color", "root", "1234");
      //  PreparedStatement pstmt = conn.prepareStatement("INSERT INTO preguntas VALUES(default,'"+pregunta+"','"+respuesta+"');");
        PreparedStatement pstmt = conn.prepareStatement("SET SQL_SAFE_UPDATES = 0;");
       // PreparedStatement pstmt1 = conn.prepareStatement("DELETE FROM preguntas WHERE pregunta='n5';");
       PreparedStatement pstmt1 = conn.prepareStatement("DELETE FROM colorclassifier WHERE pregunta='"+pregunta+"';");
            
            pstmt.executeUpdate();
            pstmt1.executeUpdate();
        outter.write("asies"+respuesta+pregunta);
        }
        catch(Exception e)
        {
        e.printStackTrace();
        }
        
       }

       

}
