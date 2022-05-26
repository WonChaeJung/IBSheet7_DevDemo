<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%@page import="java.io.*"
%><%@page import="java.util.List"
%><%@page import="java.util.ArrayList"
%><%@page import="com.ibleaders.ibsheet.IBSheetDown"
%><%

    response.setContentType("application/octet-stream");
    response.setCharacterEncoding("UTF-8");
    response.setHeader("Content-Disposition", "");

    IBSheetDown down = null;

    try {

        out.clear();
        out = pageContext.pushBody();
        
        down = new IBSheetDown();

        //====================================================================================================
        // [ 사용자 환경 설정 #0 ]
        //====================================================================================================
        // Html 페이지의 인코딩이 UTF-8 로 구성되어 있으면 "down.setEncoding("UTF-8");" 로 설정하십시오.
        // LoadText.jsp 도 동일한 값으로 바꿔 주십시오.
        // setService 전에 설정해야 합니다.
        //====================================================================================================
        down.setEncoding("UTF-8");
        
	    //====================================================================================================
        // [ 사용자 환경 설정 #1 ]
        //====================================================================================================
        // HttpServletRequest, HttpServletResponse를 IBSheet 서버모듈에 등록합니다.
        //====================================================================================================
        down.setService(request, response);

        //====================================================================================================
        // [ 사용자 환경 설정 #2 ]
        //====================================================================================================
        // 다운로드 받을 문서의 타입을 설정하십시오.
        // txt : txt 형식으로 다운로드
        //====================================================================================================        
        down.setFileType("txt");
		//====================================================================================================
        // [ 사용자 환경 설정 #3 ]
        //====================================================================================================
        // 엑셀 전문의 MarkupTag Delimiter 사용자 정의 시 설정하세요.
        // 설정 값은 IBSheet7 환경설정(ibsheet.cfg)의 MarkupTagDelimiter 설정 값과 동일해야 합니다.
        //====================================================================================================      
        //down.setMarkupTagDelimiter("[s1]","[s2]","[s3]","[s4]");

        //====================================================================================================
        // [ 사용자 환경 설정 #4 ]
        //====================================================================================================
        // 텍스트 파일의 행 구분자를 설정하십시오. (시트의 RowDelim 설정이 우선 적용)
        //====================================================================================================      
        //down.setTextLine("\n");

        //====================================================================================================
        // [ 사용자 환경 설정 #5 ]
        //====================================================================================================
        // 텍스트 파일의 열 구분자를 설정하십시오. (시트의 ColDelim 설정이 우선 적용)
        //====================================================================================================      
        //down.setTextSpliter("\t");

        // 생성된 문서를 브라우저를 통해 다운로드
        down.downToBrowser();

    } catch (Exception e) {
        response.setContentType("text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-Disposition", "");

        out.println("<script>alert('엑셀 다운로드중 에러가 발생하였습니다.');</script>");

        //e.printStackTrace();

        /* out.print()/out.println() 방식으로 메시지가 정상적으로 출력되지 않는다면 다음과 같은 방식을 사용한다.
        OutputStream out2 = response.getOutputStream();
        out2.write(("오류 메시지").getBytes());
        out2.flush();
        */

    } catch (Error e) {
        response.setContentType("text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-Disposition", "");

        out.println("<script>alert('엑셀 다운로드중 에러가 발생하였습니다.');</script>");
        //e.printStackTrace();
    } finally {
        if (down != null) {
            try {
                down.close();
            } catch (Exception ex) {}
        }
        down = null;
    }

    // 파일 정상 다운로드시 아래 구문을 실행하지 않으면 서버 Servlet에서  java.lang.IllegalStateException 이 발생한다.
    // 파일 최 하단에서 호출하도록 하면 다운로드 에러로 인한 Exception 메시지가 출력되지 않으므로 정상 다운시에만 처리하도록 한다.
    // out.flush();
    // out = pageContext.pushBody();
%>