<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.io.*" %>
<%@ page import="com.ibleaders.ibsheet.converter.Print2Pdf"%>
<%

    Print2Pdf ibPdf = new Print2Pdf(request, response);
    
    //====================================================================================================
    // [ 사용자 환경 설정 #1 ]
    //====================================================================================================
    // Html 페이지의 엔코딩이 UTF-8 로 구성되어 있으면 "ibPdf.setPageEncoding("UTF-8");" 로 설정하십시오.
    //====================================================================================================
    ibPdf.setPageEncoding("UTF-8");

    //====================================================================================================
    // [ 사용자 환경 설정 #2 ]
    //====================================================================================================
    // ttf 파일이 위치한 폴더를 설정하십시오.
    //====================================================================================================
    ibPdf.setFontFolder("C:/workspace_photon/ibsheet7_basic/ibsheet7_basic/WebContent/sheet/jsp");

    //====================================================================================================
    // [ 사용자 환경 설정 #3 ]
    //====================================================================================================
    // PDF 문서의 해상도를 설정하십시오. 
    // 기본 값은 2000 이며 50 ~ 32800 사이에 값을 설정하십시오.
    //====================================================================================================
    //ibPdf.setDPI(2000);

    try {

        response.reset(); 

        // 생성된 문서를 브라우저를 통해 다운로드
        ibPdf.print();
        
    	// 생성된 문서를 서버 특정 폴더에 저장합니다.
    	//ibPdf.saveTo("d:/down");
		//ibPdf.setDownFinish();
		
        out.clear();
        out = pageContext.pushBody();

    } catch (Exception e) {
        out.println("<script>try{var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[targetWnd.gTargetExcelSheetID].finishDownload(); targetWnd.Grids[targetWnd.gTargetExcelSheetID].ShowAlert('PDF 다운로드중 에러가 발생하였습니다.', 'U');}catch(e){}</script>");
        
        //e.printStackTrace();

        /* out.print()/out.println() 방식으로 메시지가 정상적으로 출력되지 않는다면 다음과 같은 방식을 사용한다.
        OutputStream out2 = response.getOutputStream();
        out2.write(("오류 메시지").getBytes());
        out2.flush();
        */

    } catch (Error e) {
        out.println("<script>try{var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[targetWnd.gTargetExcelSheetID].finishDownload(); targetWnd.Grids[targetWnd.gTargetExcelSheetID].ShowAlert('PDF 다운로드중 에러가 발생하였습니다.', 'U');}catch(e){}</script>");

        //e.printStackTrace();
    }

    // 파일 정상 다운로드시 아래 구문을 실행하지 않으면 서버 Servlet에서  java.lang.IllegalStateException 이 발생한다.
    // 파일 최 하단에서 호출하도록 하면 다운로드 에러로 인한 Exception 메시지가 출력되지 않으므로 정상 다운시에만 처리하도록 한다.
    // out.flush();
    // out = pageContext.pushBody();
%>