package org.iit.crudApp;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class CrudBasic
{
	public static void main(String[] args) 
	{
		Connection conn = null;
		Statement stmt = null;
		//String qry = "update college.student set Name='Rohit' where id=5";
		String qry = "insert into college.student values (10,'Meena','MBA')";
		//String qry ="delete from college.student where id=8";
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			System.out.println("Class Loaded and Registered!");
			
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306?user=root&password=admin");
			System.out.println("Connection Established Between Java App and DataBase Server!!");
			
			stmt = conn.createStatement();
			System.out.println("Platform Created to Execute SQL Statements!!");
			
			stmt.executeUpdate(qry);
			System.out.println("DataBase Updated Successful!!");
			
			
			
		}catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		finally {
			try {
				if(stmt!=null) {
					stmt.close();
				}
			}catch(SQLException e) {
				e.printStackTrace();
			}
			
			try {
				if(conn!=null)
				{
					conn.close();
				}
			}catch(SQLException e) {
				e.printStackTrace();
			}
		}
		System.out.println("All costly Resource Closed!!");
		
	}
}
