﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		
		<!-- <script type="text/javascript" src="../../js/common.js"></script> -->
		<script type="text/javascript" src="./biz/client_paging.js"></script>
		
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>기본기능 > 데이터조회 > <b>페이징조회</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="page">
						<div class="content-annina">
							<div class="entry-content">
							<h2>* 클라이언트 페이징 방식이란 ?</h2>
							<p>
							일반 웹 게시판을 개발할 경우 페이징 기능이 들어가게 됩니다. 일반적으로는 페이지 네비에기션 영역의 "다음" 버튼을 또는 숫자 인덱스를 클릭하면
							서버쪽에 해당 페이지의 데이터를 요청하는 형태로 동작 합니다.
							그에 반하여 그리드에서는 최초 조회시 전체 데이터를 배열 공간안에 담아두었다가 사용자가 다음버튼을 눌르거나 원하는 페이지를 호출했을때
							그에 해당 하는 데이터를 계산해와서 시트에 표시해주는 방식으로 동작 합니다.
							</p>
							<h2>* 클라이언트 페이징특징</h2>
							<p>위에서 설명드린바와 같이 전체 데이터를 담고 있기 때문에  페이징시마다 서버쪽에 요청을 보내지 않아 트래픽을 발생시키지 않습니다.
							또한 화면에 일부 데이터가 표시되어 있음에도 정렬, 필터링 등 기능 사용시 전체 데이터를 기준으로 동작하게 됩니다. </p>
							 
							</div>
							<div class="clear hidden"></div>  
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload')">초기화</button>
									<button class="btn-strong" onclick="doAction('search')">조회</button>
								</div>
							</header>
							<div class="clear hidden"></div>  
							<div class="area-panel" style="height: calc(100% - 335px);">
								<div class="panel-ch">
									<!-- class="sheetSec"  -->
									<div style="height:100%;">
										<div id="sheetArea"></div>
									</div>
								</div>
							</div>
							<div class="space" style="height:5px"></div>  
							<div id="pageindex" style="align:center;display:none;"></div>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer_codeview.jsp" %>
			</div>
		</div>
	</body>
</html>