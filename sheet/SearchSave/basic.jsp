<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ include file="/sheet/common/layout/common-script.jsp"%>
	    
	<script>
		var mySheet = new ibsheetObject();
		
		
		$(document).ready(function(){
			//ibsheet 객체 생성  ( 시트가 위치할 element  , 시트 이름 ,    너비     ,   높이           )
			ib.comm.createIBSheet( document.getElementById("ibsheet_div"), "mySheet" , "100%" , "100%");

			//시트 초기화 변수
			var initSheet = {};
			initSheet.Cfg = {FrozenCol:3,SearchMode:smLazyLoad};
			initSheet.HeaderMode = {Sort:1,ColMove:1,ColResize:1};
			initSheet.Cols = [
	            {Header:"상태",Type:"Status",Width:60,SaveName:"sStatus",Align:"Center"},
	            {Header:"삭제",Type:"DelCheck",Width:60,SaveName:"sDelete",Align:"Center"},
	            {Header:"직책",Type:"Text",Width:100,SaveName:"job",Align:"Center"},
	            {Header:"부서코드",Type:"Combo",Width:100,SaveName:"deptno",Align:"Center",ComboText:"${DNAME}",ComboCode:"${DEPTNO}",PopupText:"${DNAME}"},
				
	            {Header:"ID",Type:"Text",Width:60,SaveName:"empno",Align:"Center",KeyField:1,DefaultValue:'!',UpdateEdit:0},
	            {Header:"이름",Type:"Text",Width:150,SaveName:"ename",Align:"",MultiLineText:1},
	            {Header:"입사일",Type:"Date",Width:120,SaveName:"hiredate",Format:"Ymd",Align:"Center",EditLen:8},
	            {Header:"책임자",Type:"Text",Width:120,SaveName:"mgr",Align:"Center"},
	            {Header:"급여",Type:"Int",Width:120,SaveName:"sal",Align:"Right",Format:"NullInteger"},
	            {Header:"COMM",Type:"Int",Width:60,SaveName:"comm",Align:"Right",Format:"Integer"}
			];
			//시트 초기화
			ib.comm.IBS_InitSheet(mySheet,initSheet);
			
			doAction('search');
			
		});
		
		function doAction(str){
			switch(str){
				case "search":
					
					//데이터 조회
					//공통 조회 함수
					var param = {url:"<c:url value='/sheet/SearchSave/empSearch.do'/>"
						,subparam:FormQueryStringEnc(document.frm)   //폼객체 안에 내용을 QueryString으로 바꾼다.
						,sheet:mySheet
						,mapping:{mySheet:"SHEETDATA1"}};
					ib.comm.search( param );
					break;
				case "save":
 					var param = {url:"<c:url value='/sheet/SearchSave/empSave.do'/>"
 						,subparam:FormQueryStringEnc(document.frm)+"aaa=1234&aaa=34567"
 						//,callback:function(){var a = 1 + 3 ;alert(a);}
						,sheet:"mySheet"};
 					ib.comm.save( param );

					break;
				case "insert":
					mySheet.DataInsert();					
					break;
				case "exceldown":
					//mySheet.Down2Excel({SheetDesign:1,FileName:"myWork.xlsx",KeyFieldMark:0,Multipart:0});
					var param = {
							id:"mySheet"
							,name:"BASIC 화면"
							,title:"BASIC SHEET DOWNLOADED"
					};
					ib.comm.downExcel(param);
					
					break;
				case "excelupload":
					var param = {
							id:"mySheet"
					};
					ib.comm.loadExcel(param);
					break;

				case "pdfdown":
					mySheet.Down2Pdf({FileName : "basicSample.pdf",Paper:"landscape","DPI":2400});
					break;
			}
		}

		function mySheet_OnDownFinish(downloadType, result) {
			alert(downloadType + "다운이 완료되었습니다. 다운로드 결과 :" + result);
		}
	</script>

</head>
<body>
	<%@ include file="/sheet/common/layout/leftMenu.jsp" %>

	<div id="contents" class="workarea">
	    
		<div class="container">
			<!-- Wrap : 메인 헤더 (S) -->
			<header class="wrap-mainheader">
				<h4>기본 조회 / 저장 예제</h4>
				<div class="btn">
					<button class="btn-strong" onclick="doAction('exceldown')">엑셀다운</button>
					<button class="btn-strong" onclick="doAction('excelupload')">엑셀업로드</button>
					<button class="btn-strong" onclick="doAction('search')">조회</button>
					<button class="btn-strong" onclick="doAction('insert')">추가</button>
					<button class="btn-strong" onclick="doAction('save')">저장</button>
				</div>
			</header>
			<!-- Wrap : 메인 헤더 (E) -->
			
			<!-- Wrap : 메인 컨텐츠 (S) -->
			<div class="wrap-maincontents">
				<div class="area-desc">
					<div class="serTbl">
						<ul>
							<li>조회 버튼을 클릭하면 LoadSearchData를 통해 규격에 맞는 xml 또는 Json 형식의 데이터를 시트에 로드 한다.</li>
						</ul>
						<ul>
							<li>저장 버튼을 클릭하면 LoadSaveData를 통해 저장 결과 데이터를 시트에 적용 한다.</li>
						</ul>
					</div>
				</div>
				<!-- Area : 조회조건 (S) -->
				<div class="area-search">
					<div class="serTbl">
						<form name="frm">
							<table>
								<colgroup>
						            <col style="width:90px" />
						            <col style="width:23.3%" />
						            <col style="width:90px" />
						            <col style="width:23.3%" />
						            <col style="width:140px" />
						            <col />
						        </colgroup>
								<tr>
									<th scope="row">구분</th>
									<td>
										<select class="full" id="frm_NameOrId">
											<option value="">--</option>
											<option value="name">이름</option>
											<option value="id">ID</option>
										</select>
									</td>
									<th scope="row">이름/ID</th>
									<td>
				                    	<input class="full" type="text" name="frm_SearchText">
									</td>
									<th scope="row"></th>
									<td>
									</td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<!-- Area : 조회조건 (E) -->
	
				<!-- Area : 조회결과 (S) -->
				<div class="area-result">
			
					<!-- Area : 서브타이틀, 시트버튼 (S) -->
					<header class="area-subtitle"> 
	                    <div class="fl">
	                        <h5 class="title-a">조회결과</h5>
	                    </div>
	                </header>			
					<!-- Area : 서브타이틀, 시트버튼 (E) -->
					
					<!-- Area : 시트패널 (S) -->
			        <div class="area-panel">
			        	<div class="panel-ch">
				        	<div class="sheetSec" style="height:380px;">
				        		<div id="ibsheet_div"></div>
				        	</div>
			        	</div>
			        </div>
					<!-- Area : 시트패널 (S) -->
					
				</div>
				<!-- Area : 조회결과 (E) -->
			       
			</div>
			<!-- Wrap : 메인 컨텐츠 (S) -->
			
		
		</div>
		<!-- Area : 조회결과 (E) -->

<%@ include file="/sheet/common/layout/footer.jsp" %>