<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/scroll_type.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>영역별 > 스크롤영역 > <b>스크롤바종류설정</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>스크롤바의 디자인 처리를 위해서 IBSheet에서는 스크롤객체가 아닌 이미지 형태의  스크롤바 기능을 제공하고 있습니다.
							CustomScroll 속성으로 ibsheet.cfg 에서 설정할 있습니다.
							</blockquote>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload')">초기화</button>
									<button class="btn-strong" onclick="doAction('search')">조회</button>
								</div>
							</header>
							<div class="ib_function2 border_sheet">
								<table class="ib_column2">
									<tr>
										<th class="tit">스크롤바 종류 -  </th>
										<td><input type="radio" name="rdo" value="18px"  onClick="mergeChg('1')"  class="radio" />18px</td>
										<td><input type="radio" name="rdo" value="10px"  onClick="mergeChg('2')"  class="radio" checked/>10px</td>
										<td><input type="radio" name="rdo" value="9px"  onClick="mergeChg('3')"  class="radio" />9px</td>
									</tr>
								</table> 
							</div>
						</div><br/>
						<div class="area-panel" style="height: calc(100% - 235px);">
							<div class="panel-ch">
								<!-- class="sheetSec"  -->
								<div style="height:100%;">
									<div id="ibsheetArea"></div>
								</div>
							</div>
						</div><br/>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer_dataview.jsp" %>
			</div>
		</div>
	</body>
</html>