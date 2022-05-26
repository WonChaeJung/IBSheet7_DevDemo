<%@page import="java.util.Scanner"%>
<%@page import="org.apache.jasper.tagplugins.jstl.core.ForEach"%>
<%@page import="java.util.Enumeration"%>
<%@page contentType="text/json;charset=utf-8"%>
<%
/*
	Enumeration<?> en = request.getParameterNames();
	String header = request.getHeader("IBUserAgent");
*/
	/*
	while(en.hasMoreElements()){
		String key = (String)en.nextElement();
		String[] params = request.getParameterValues(key);
		for(int i = 0; i < params.length; i+=1){
			System.out.println(i + " Key ----- " + key + "   Value : " + params[i]);
		}
		System.out.println("==========================================================================");
	}
	*/
	
	/*
	String[] sStatus = request.getParameterValues("sStatus");
	String[] sht1_id = request.getParameterValues("id");
	String[] sht1_relation = request.getParameterValues("relation");
	String[] sht1_name = request.getParameterValues("name");
	String[] sht1_birthday = request.getParameterValues("birthday");
	System.out.println("sStatus.length " + sStatus.length);
	
	if(sStatus != null){
		for(int i = 0; i < sStatus.length; i+=1){
			System.out.println("###############################    : " + i);
			System.out.println(" sStatus : " + sStatus[i]);
			System.out.println(" sht1_id : " + sht1_id[i]);
			System.out.println(" sht1_relation : " + sht1_relation[i]);
			System.out.println(" sht1_name : " + sht1_name[i]);
			System.out.println(" sht1_birthday : " + sht1_birthday[i]);
		}
	}
	
	String[] sStatus2 = request.getParameterValues("sStatus2");
	String[] sht2_param2 = request.getParameterValues("param2");
	String[] sht2_param3 = request.getParameterValues("param3");
	String[] sht2_param4 = request.getParameterValues("param4");
	String[] sht2_param5 = request.getParameterValues("param5");
	String[] sht2_param6 = request.getParameterValues("param6");
	String[] sht2_param7 = request.getParameterValues("param7");
	String[] sht2_param8 = request.getParameterValues("param8");
	
	if(sStatus2 != null){
		for(int i = 0; i < sStatus2.length; i+=1){
			System.out.println("###############################    : " + i);
			System.out.println(" sStatus2 : " + sStatus2[i]);
			System.out.println(" sht2_param3 : " + sht2_param3[i]);
			System.out.println(" sht2_param4 : " + sht2_param4[i]);
			System.out.println(" sht2_param5 : " + sht2_param5[i]);
			System.out.println(" sht2_param6 : " + sht2_param6[i]);
			System.out.println(" sht2_param7 : " + sht2_param7[i]);
			System.out.println(" sht2_param8 : " + sht2_param8[i]);
		}
	}
	*/
%>
{
/*
	"Data":[
	{
		"Text" : "장순연123",
		"Combo" : "01", "ComboEdit" : "서울대학교", "Popup" : "대한민국", "Popupedit" : "SK텔레콤",
		"AutoSum" : "21536", "AutoAvg" : "1583.25", "Int" : "190", "Float" : "15.25",
		"Date" : "20110526", "Pass" : "123456", "Chk" : "1", "Radio" : "1"
	},
	{
		"Text" : "김정호", "Combo" : "02", "ComboEdit" : "고려대학교", "Popup" : "일본",
		"Popupedit" : "삼성전자", "AutoSum" : "156", "AutoAvg" : "171.25", "Int" : "1120",
		"Float" : "115.25", "Date" : "20100922", "Pass" : "127564", "Chk" : "1", "Radio" : "1"}
	],
*/
	//Result : { Code:0, Message:'저장되었습니다.', Result : "OK|MISS|OK" }
	Result : { Code:1, Message:'저장되었습니다123.' }
	// "Total" : 2
}

