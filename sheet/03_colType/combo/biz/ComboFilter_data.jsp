<%@page contentType="text/xml;charset=utf-8"%><%
	String json = "";
	String c1st = request.getParameter("combo_1st");
	if("".equals(c1st)){
		json = "{\"ComboText\":\"\",\"ComboCode\":\"\"}";
	}else if("AA".equals(c1st)){
		json = "{\"ComboText\":\"사자|코끼리|하마|염소\",\"ComboCode\":\"01|02|03|04\"}";
	}else if("BB".equals(c1st)){
		json = "{\"ComboText\":\"나무|풀|꽃|버섯\",\"ComboCode\":\"01|02|03|04\"}";
	}else{
		json = "{\"ComboText\":\"사과|수박|배|앵두\",\"ComboCode\":\"01|02|03|04\"}";
	}
%><%= json%>