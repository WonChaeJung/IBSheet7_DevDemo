<%@page import="java.util.Iterator"%>
<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%@page import="com.ibleaders.ibsheetLoader.IBSheetLoad"
%><%@page import="java.util.ArrayList"
%><%@page import="java.util.List"
%><%@page import="java.io.*" 
%>
<%
	String PRINT_STR = "";
	ArrayList keys = new ArrayList();
	List li = (List)request.getAttribute("SHEETDATA");
	
	for(int i=0; i<li.size(); i++){
		Map mp = (Map) li.get(i);
		if (i == 0) {
			Iterator it = mp.keySet().iterator();
			while (it.hasNext()) {
				String key = (String) it.next();
				PRINT_STR += key + "\t";
				keys.add(key);
			}
			PRINT_STR += "\\n";
		}
		// 데이터를 뿌리자
		for (int c = 0; c < keys.size(); c++) {
			PRINT_STR += mp.get(keys.get(c)) + "\t";
		}
		PRINT_STR += "\\n";
	}
	System.out.println(PRINT_STR);
%>