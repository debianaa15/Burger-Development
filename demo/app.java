package demo;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
public class app {
public static void main(String[] args) {

String url = "jdbc:mysql://127.0.0.1:3307/sakila"; // Connect to the local forwarded port
String user = "brent"; // Use 'brent' as confirmed
String password = "Dlsu1234!"; // Use the confirmed password

try {
Connection conn = DriverManager.getConnection(url, user, password);
System.out.println("Successfully connected MySQL");
conn.close();
} catch (SQLException e) {
System.out.println("Connection failed.");
e.printStackTrace();
}
}
}