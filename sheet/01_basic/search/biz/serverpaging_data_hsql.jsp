<%@page contentType="text/xml;charset=utf-8" pageEncoding="UTF-8" import="java.sql.*,java.util.*,org.json.simple.JSONArray,org.json.simple.JSONObject" %>
<%

String rowidx = request.getParameter("ibpage");  //현재가 몇번째 페이지
String onepagerow = request.getParameter("onepagerow"); //한번에 몇건씩 가져올 것인지
String iborderby = request.getParameter("iborderby");

if(rowidx==null){
	rowidx="1";
	onepagerow = "0";
}

/***********************  이 부분이 제일 중요 ***************************************/
int startrow,
	endrow;

	startrow = (Integer.parseInt(rowidx)-1) * Integer.parseInt(onepagerow)+1;
	endrow = startrow + (Integer.parseInt(onepagerow)-1);
/***********************  이 부분이 제일 중요 ***************************************/


Connection conn = null;
PreparedStatement pstmt = null;
ResultSet rs = null;
String url = "jdbc:hsqldb:hsql://localhost/sampledb";
String id = "sa";
String pwd = "";
String driver = "org.hsqldb.jdbcDriver";
  
String countquery = "select count(1) AS CNT from POSTNO";
String query = "";
StringBuffer rtnStr = new StringBuffer();
if(iborderby==null||"".equals(iborderby)){
	query = "SELECT * FROM (SELECT ROWNUM RN,POSTNO,SIDO,SIGUNGU,UBMYNDONG,LEE,ADDRESS FROM POSTNO) WHERE RN BETWEEN ? and ?";
}else{
	String orderbyStr = "";
	String[] colArr = null;
	String[] sortArr = null;
	System.out.println(iborderby);
	String[] ColandSort = iborderby.split("\\^");
	if(ColandSort[0].indexOf("|")>-1){
		colArr = ColandSort[0].split("\\|");
		sortArr = ColandSort[1].split("\\|");
		for(int i=0;i<colArr.length;i++){
			orderbyStr += ","+colArr[i]+ " " +sortArr[i];
		}
	}else{
		System.out.println(ColandSort[0]);
		System.out.println(ColandSort[1]);
		orderbyStr = " "+ColandSort[0]+ " " +ColandSort[1];
	}

	
	orderbyStr = orderbyStr.substring(1);
	//oracle 서버에서 여러개 컬럼 동시 소팅 할 경우..
	//query = "SELECT * FROM (SELEC POSTNO,SIDO,SIGUNGU,UBMYNDONG,LEE,ADDRESS,ROW_NUMBER() over (order by "+orderbyStr+") RN FROM POSTNO) WHERE RN BETWEEN ? and ? ";
	
	query = "SELECT * FROM ("
			 +" SELECT ROWNUM RN,POSTNO,SIDO,SIGUNGU,UBMYNDONG,LEE,ADDRESS  FROM"
			  +"(SELECT POSTNO,SIDO,SIGUNGU,UBMYNDONG,LEE,ADDRESS FROM POSTNO ORDER BY "+orderbyStr+")"
			  +") WHERE RN BETWEEN ? and ?";
	System.out.println(query);
}
try{
	Class.forName(driver);
	conn = DriverManager.getConnection(url,id,pwd);
	
	
	//최초 조회시 전체 건수가 몇건인지 얻는다.(첫 조회에만 필요함.)
	int total=0;
	if(startrow==1){	
		
		pstmt = conn.prepareStatement(countquery);
		rs = pstmt.executeQuery();
		//전체 건수
		if(rs.next()){
			total = rs.getInt("CNT");	
		}
		System.out.println("전체 데이터 건수:"+total);
		pstmt.clearParameters();
	}
	
	
	
	//실제 데이터 json
	pstmt = conn.prepareStatement(query);
	pstmt.setInt(1, startrow);
	pstmt.setInt(2, endrow);
	rs = pstmt.executeQuery();
	
	
	
	JSONArray j = ResultSet2Json(rs);
	JSONObject retJson = new JSONObject();
	if(total>0){
		retJson.put("Total",total);
		// retJson.put("Total",0); // 넥스프론 테스트
	}
	// retJson.put("Data",j);
	retJson.put("Data",j);
	rtnStr.append( retJson.toJSONString());


	

	
	
}catch(Exception ex){
	ex.printStackTrace();
	String msg = ex.getMessage();
	//오류 발생
	rtnStr.append("{");
	rtnStr.append("Result : {Code:-1, Message:'오류가 발생하였습니다.\n"+msg+"'}");
	rtnStr.append("}");
	
}finally{
	rs.close();
	pstmt.close();
	conn.close();	
	out.println(rtnStr+"");
}
%>
<%! 
public String NVL(String str){
	if("null".equals(str)||str==null){
		return "";
	}
	return str;
}



public JSONArray ResultSet2Json(ResultSet rs){
	JSONArray json = new JSONArray();
	try{
		ResultSetMetaData rsmd = rs.getMetaData();

		 while(rs.next()) {
		  int numColumns = rsmd.getColumnCount();
		  JSONObject obj = new JSONObject();

		  for( int i=1; i<numColumns+1; i++) {
		    String column_name = rsmd.getColumnName(i);

		    switch( rsmd.getColumnType( i ) ) {
		      case java.sql.Types.ARRAY:
		        obj.put(column_name, rs.getArray(column_name));     break;
		      case java.sql.Types.BIGINT:
		        obj.put(column_name, rs.getInt(column_name));       break;
		      case java.sql.Types.BOOLEAN:
		        obj.put(column_name, rs.getBoolean(column_name));   break;
		      case java.sql.Types.BLOB:
		        obj.put(column_name, rs.getBlob(column_name));      break;
		      case java.sql.Types.DOUBLE:
		        obj.put(column_name, rs.getDouble(column_name));    break;
		      case java.sql.Types.FLOAT:
		        obj.put(column_name, rs.getFloat(column_name));     break;
		      case java.sql.Types.INTEGER:
		        obj.put(column_name, rs.getInt(column_name));       break;
		      case java.sql.Types.NVARCHAR:
		        obj.put(column_name, rs.getNString(column_name));   break;
		      case java.sql.Types.VARCHAR:
		        obj.put(column_name, rs.getString(column_name));    break;
		      case java.sql.Types.TINYINT:
		        obj.put(column_name, rs.getInt(column_name));       break;
		      case java.sql.Types.SMALLINT:
		        obj.put(column_name, rs.getInt(column_name));       break;
		      case java.sql.Types.DATE:
		        obj.put(column_name, rs.getDate(column_name));      break;
		      case java.sql.Types.TIMESTAMP:
		        obj.put(column_name, rs.getTimestamp(column_name)); break;
		      default:
		        obj.put(column_name, rs.getObject(column_name));    break;
		    }
		  }
		  json.add(obj);
		}
	}catch(Exception EX){
		EX.printStackTrace();
	}
	return json;
}

%>