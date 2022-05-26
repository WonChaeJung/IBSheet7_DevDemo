<%@page import="java.util.Enumeration"%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.io.*"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%><%


	out.clear();
	out = pageContext.pushBody();

	System.out.println("####  PreProcDown2Excel.jsp");

	String[] values = request.getParameterValues("paramValue1");
	System.out.println(values);
    Enumeration<?> paramNms =  request.getParameterNames();
    
    while(paramNms.hasMoreElements()){
    	String param = (String)paramNms.nextElement();
    	System.out.println("param : " + param + " value : " + request.getParameter(param));
    }
    RequestDispatcher rd= request.getRequestDispatcher("../jsp/Down2Excel.jsp");
    rd.forward(request, response);
%>