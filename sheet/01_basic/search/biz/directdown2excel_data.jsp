<%@page contentType="text/xml;charset=utf-8" pageEncoding="UTF-8"%>
<%@page import="java.sql.*,java.util.*" %>
<%

Connection conn = null;
PreparedStatement pstmt = null;
ResultSet rs = null;
String url = "jdbc:hsqldb:hsql://localhost/sampledb";
String id = "sa";
String pwd = "";
String driver = "org.hsqldb.jdbcDriver";
  
String query = "";

query = "SELECT POSTNO,SIDO,SIGUNGU,UBMYNDONG,LEE,ADDRESS FROM POSTNO";
	

try{
	Class.forName(driver);
	conn = DriverManager.getConnection(url,id,pwd);
	pstmt = conn.prepareStatement(query);
	rs = pstmt.executeQuery();
	List li = convertResultSetToList(rs);
	request.setAttribute("SHEETDATA",li);
	String forwardPath = "../jsp/DirectDown2Excel.jsp"; 

	if(!"".equals(forwardPath)){
		RequestDispatcher rd = request.getRequestDispatcher(forwardPath);
		rd.forward(request,response);
	}


	
	
}catch(Exception ex){
	ex.printStackTrace();
	
	
}finally{
	rs.close();
	pstmt.close();
	conn.close();	
	
}
%>
<%! 
public String NVL(String str){
	if("null".equals(str)||str==null){
		return "";
	}
	return str;
}

public List<HashMap<String,String>> convertResultSetToList(ResultSet rs) throws SQLException {
    ResultSetMetaData md = rs.getMetaData();
    int columns = md.getColumnCount();
    List<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();

    while (rs.next()) {
        HashMap<String,String> row = new HashMap<String, String>(columns);
        for(int i=1; i<=columns; ++i) {
            row.put((md.getColumnName(i)).toUpperCase(),rs.getString(i));
        }
        list.add(row);
    }

    return list;
}
%>