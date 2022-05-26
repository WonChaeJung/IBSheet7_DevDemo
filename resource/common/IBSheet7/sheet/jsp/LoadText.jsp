<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%@page import="com.ibleaders.ibsheetLoader.IBSheetLoad"
%><%@page import="java.util.ArrayList"
%><%@page import="java.util.List"
%><%@page import="java.io.*" 
%><%

    out.clear();
    out = pageContext.pushBody();

    IBSheetLoad load = null;

    try {

        load = new IBSheetLoad();

        //====================================================================================================
        // [ 사용자 환경 설정 #0 ]
        //====================================================================================================
        // Html 페이지의 엔코딩이 UTF-8 로 구성되어 있으면 "load.setEncoding("UTF-8")" 로 설정하십시오.
        // 한글 헤더가 있는 그리드에서 엑셀 로딩이 동작하지 않으면 이 값을 바꿔 보십시오.
        // LoadText.jsp 에서의 설정값과 동일하게 바꿔주십시오.
        // setService 전에 설정해야 합니다.
        //====================================================================================================
        load.setEncoding("UTF-8");
        
        //====================================================================================================
        // [ 사용자 환경 설정 #1 ]
        //====================================================================================================
        // HttpServletRequest, HttpServletResponse를 IBSheet 서버모듈에 등록합니다.
        //====================================================================================================
        load.setService(request, response);
        
    	//====================================================================================================
        // [ 사용자 환경 설정 #2 ]
        //====================================================================================================
        // 엑셀 전문의 MarkupTag Delimiter 사용자 정의 시 설정하세요.
        // 설정 값은 IBSheet7 환경설정(ibsheet.cfg)의 MarkupTagDelimiter 설정 값과 동일해야 합니다.
        //====================================================================================================      
        //load.setMarkupTagDelimiter("[s1]","[s2]","[s3]","[s4]");


        //브라우저에 데이터를 전달하여 시트에 로드
        load.writeToBrowser();

    } catch (Exception e) {
        out.println("<script>var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError(); </script>");

        //e.printStackTrace();

        /* out.print()/out.println() 방식으로 메시지가 정상적으로 출력되지 않는다면 다음과 같은 방식을 사용한다.
        OutputStream out2 = response.getOutputStream();
        out2.write(("오류 메시지").getBytes());
        out2.flush();
        */

    } catch (Error e) {
        out.println("<script>var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError(); </script>");
        //e.printStackTrace();
    } finally {
        if (load != null) {
            load.close();
        }
        load = null;
    }
%>