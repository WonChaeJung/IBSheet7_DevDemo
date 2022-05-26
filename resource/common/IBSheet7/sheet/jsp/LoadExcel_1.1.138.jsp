<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.io.*" %>
<%@ page import="com.ibleaders.ibsheet7.ibsheet.excel.LoadExcel" %>
<%@ page import="com.ibleaders.ibsheet7.util.LoadExcelCallbackInterface" %>
<%
	LoadExcel ibExcel = new LoadExcel();
	ibExcel.setService(request, response);

	//System.out.println(com.ibleaders.ibsheet7.util.Version.getVersion());

    //====================================================================================================
    // [ 사용자 환경 설정 #1 ]
    //====================================================================================================
    // Html 페이지의 엔코딩이 utf-8 로 구성되어 있으면 "ibExcel.setPageEncoding("utf-8")" 로 설정하십시오.
    // 한글 헤더가 있는 그리드에서 엑셀 로딩이 동작하지 않으면 이 값을 바꿔 보십시오.
    // Down2Excel.jsp 에서의 설정값과 동일하게 바꿔주십시오.
    //====================================================================================================
	ibExcel.setPageEncoding("utf-8");

    //====================================================================================================
    // [ 사용자 환경 설정 #2 ]
	//====================================================================================================
	// LoadExcel 용도의 엑셀파일을 업로드하여 임시보관할 임시폴더경로를 지정해 주십시오.
	// 예 : "C:/tmp/"   "/usr/tmp/"
	//====================================================================================================
	ibExcel.setTempFolder("d:/");

    //====================================================================================================
    // [ 사용자 환경 설정 #3 ]
	//====================================================================================================
	// LoadExcel 처리를 허용할 최대 행수를 설정한다.
	// 엑셀 데이터가 지정한 행 수보다 많은 경우 메시지를 출력하고 처리가 종료된다.
	//====================================================================================================
	ibExcel.setMaxRows(100);

    //====================================================================================================
    // [ 사용자 환경 설정 #4 ]
	//====================================================================================================
	// HeaderMatch 사용 시 시트에 있는 헤더가 엑셀에 하나라도 존재하지 않는 경우 오류메시지를 출력하고 데이터를 로딩하지 않을지 여부.
	//====================================================================================================
	// ibExcel.setStrictHeaderMatch(true);


	try {
		String frm = ibExcel.getLoadFrm();

		if ("".equals(frm)) {
			// 서버에 저장된 파일명
			String uploadFileName = ibExcel.getUploadFileName();

			// System.out.println("uploadFileName : " + uploadFileName);

			// TODO
			// 업로드된 엑셀 파일을 가공함 (예, 엑셀문서를 DRM 처리함)

			// 사용자가 업로드한 파일명
			String uploadFileNameOrg = ibExcel.getUploadFileNameOrg();

			out.print(ibExcel.LoadExcelFile());
		} else {
			out.print(frm);
		}
	} catch(Exception e) {
		out.println("<script>var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError(); </script>");

		e.printStackTrace();
	} catch (Error e) {
		out.println("<script>try{var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError(); }catch(e){}</script>");

		e.printStackTrace();
	}
%>
