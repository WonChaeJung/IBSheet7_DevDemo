<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/pivot.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>기능별 > 주요기능 > <b>Pivot</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>피벗이나 크로스테이블 함수를 이용하여 데이터 변환 과정을 확인한다. [Ctrl+Alt+T 단축키]</blockquote>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('removeall')">초기화</button>
									<button class="btn-strong" onclick="doAction('search')">조회</button>
									<button class="btn-strong" onclick="doAction('excelDown')">엑셀다운</button>
									<button class="btn-strong" onclick="doAction('pivot_ExcelDown')">피봇시트 엑셀다운</button>
								</div>
							</header>
							<div class="ib_function2 border_sheet">
								<table class="ib_column2">
									<tr>
										<td>
											<a href="javascript:doAction('pivotPop')" class="f2_btn_white btn_sheet">피벗/크로스테이블</a>
										</td>
									 </tr>
								</table>
							</div>
						</div><br/>
						<div class="area-panel" style="height: calc(100% - 215px);">
							<div class="panel-ch">
								<div style="height:100%;">
									<div id="ibsheetArea"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer_dataview.jsp" %>
			</div>
		</div>
	</body>
</html>