<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/jquery-1.11.1.min.js"></script>
		<link rel="stylesheet" href="./biz/jquery-ui.css">
		<script type="text/javascript" src="./biz/jquery-ui.js"></script>
		<script type="text/javascript" src="./biz/use_datepicker.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>컬럼타입별 > 날짜타입 > <b>데이트피커연동</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<h2> 달력이미지를 선택하면 아이비시트가 제공하는 달력이 아닌 데이트피커를 생성합니다.</h2>
						</div><br/>
						<div class="clear hidden"></div>
						<p class="subtit_sheet">조회리스트</p>
						<div class="ib_product">
							<div id="ibsheetArea"></div>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer_dataview.jsp" %>
			</div>
		</div>
	</body>
</html>