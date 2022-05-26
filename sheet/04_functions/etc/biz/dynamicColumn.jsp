<%@page import="java.util.Enumeration"%>
<%@page contentType="text/html;charset=utf-8"%>
<%@page import="java.util.Random"%>
<%@page import="java.util.Calendar"%>
<%
	//30이하 정수 임의 추출
	Random rn = new Random();
	int colcnt = rn.nextInt(30);
	
	while(true){
		if(colcnt == 0){
			colcnt = rn.nextInt(30);
		}else{
			break;	
		}
	}
	
	Calendar stDate = Calendar.getInstance();
	Calendar edDate = Calendar.getInstance();
	
	String pStDate = request.getParameter("stDate");
	String pEdDate = request.getParameter("edDate");
	
	stDate.set(
		Integer.parseInt(pStDate.substring(0, 4)),
		Integer.parseInt(pStDate.substring(4, 6)),
		Integer.parseInt(pStDate.substring(6, 8))
	);
	edDate.set(
		Integer.parseInt(pEdDate.substring(0, 4)),
		Integer.parseInt(pEdDate.substring(4, 6)),
		Integer.parseInt(pEdDate.substring(6, 8))
	);
	


	 
	long diffSec = (edDate.getTimeInMillis() - stDate.getTimeInMillis()) / 1000;
	long diffDay = diffSec / (60 * 60 * 24);
	
	System.out.println("RANDOM" + colcnt);
	System.out.println("diffDay   : " + diffDay );
	
	//해더 타이틀 생성 (201501|201502|201503.....)
	int col,
		row;
	
	String headerTitle = "",
			rowdata = "",
			data = "",
			month = "";
	
	
	Calendar cal = Calendar.getInstance();
	
	int mon;
	String day;

	for(row=0; row<10; row++){
		stDate.set(
			Integer.parseInt(pStDate.substring(0, 4)),
			Integer.parseInt(pStDate.substring(4, 6)),
			Integer.parseInt(pStDate.substring(6, 8))
		);
		for(col=0; col<diffDay; col++){
			stDate.add(Calendar.DATE, 1);
			mon =  stDate.get(Calendar.MONTH);
			day = stDate.get(Calendar.DATE) < 10 ? "0"+stDate.get(Calendar.DATE)  : stDate.get(Calendar.DATE)+"";
			month = (mon<10)?"0"+mon:mon+"";

			if(row==0){
				//헤더타이틀
				headerTitle += "|"+stDate.get(Calendar.YEAR)+month+day;
			}
			//행 데이터
			rowdata += ",\"D"+stDate.get(Calendar.YEAR)+month+day+"\":"+rn.nextInt(10000);
			
		}
		System.out.println(rowdata);
		data += ",{"+rowdata.substring(1)+"}\r\n";
		rowdata = "";
	}	
%>
{
	"HeaderInfo":"<%=headerTitle.substring(1)%>",
	"Data":[<%=data.substring(1)%>]	
}