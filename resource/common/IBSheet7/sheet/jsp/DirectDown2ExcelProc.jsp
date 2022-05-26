<%@page contentType="text/xml;charset=utf-8" pageEncoding="UTF-8"%>
<%@page import="java.sql.*,java.util.*" %>
<%

	out.clear();
	out = pageContext.pushBody();

	List<Map<String, Object>> li = new ArrayList<Map<String, Object>>();
	List<Map<String, Object>> li1 = new ArrayList<Map<String, Object>>();
	
	Map<String, Object> map = new HashMap<String, Object>();
	Map<String, Object> map1 = new HashMap<String, Object>();

	
	for(int i = 0; i < 1000000; i+=1){
		
		for(int j = 0; j < 100000; j+=1){
			 
			for(int k = 0; j < 1000; j +=1){
				
			}
		}
	}
	
	map.put("data_A", "강인철33");
    map.put("data_B", "003");
    map.put("data_C", "0");
    map.put("data_D", "100000");
    map.put("data_E", "20030908");
    map.put("data_F", "20030908");
    map.put("data_G", "1300");
    map.put("data_H", "1800");
    
	map1.put("data_A", "김수용");
    map1.put("data_B", "001");
    map1.put("data_C", "1");
    map1.put("data_D", "500000");
    map1.put("data_E", "20030906");
    map1.put("data_F", "20030906");
    map1.put("data_G", "0900");
    map1.put("data_H", "1800");
    
    li.add(map);
    li1.add(map1);
    
	request.setAttribute("SHEETDATA",li);
	request.setAttribute("SHEETDATA1",li1);
	
	String forwardPath = "../jsp/DirectDown2Excel.jsp"; 

	if(!"".equals(forwardPath)){
		RequestDispatcher rd = request.getRequestDispatcher(forwardPath);
		rd.forward(request, response);
	}
	

	// 쿠키 값 강제로 설정
	String downloadTokenValue = request.getParameter("downloadTokenValue");
	Cookie cookie = new Cookie("fileDownloadToken", downloadTokenValue);
	cookie.setPath("/");
	cookie.setMaxAge(1*60*60);
	response.addCookie(cookie);
%>
