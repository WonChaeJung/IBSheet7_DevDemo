<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/server_paging.js"></script>
	</head>
	<body onLoad="LoadPage()">
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>기본기능 > 데이터조회 > <b>서버페이징방식</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<h2>서버페이징 방식</h2>
							<p>스크롤위치에 해당하는 인덱스를 서버로 보내 실시간으로 데이터를 조회해서 가져오는 방식 입니다.</p>
						</div>
  						<header class="area-subtitle"> 
						<div class="fl">
							<h5 class="title-a">조회결과</h5>
						</div>
						<div class="btn" style="float:right;">
							<button class="btn-strong" onclick="doAction('reload')">초기화</button>
							<button class="btn-strong" onclick="doAction('search')">조회</button>
							<button class="btn-strong" onclick="doAction('directdown2excel')">Direct 엑셀다운</button>
						</div>
						</header> 
						<div class="clear hidden"></div>
						<div class="area-panel"  style="height: calc(100% - 285px);">
							<div class="panel-ch" style="height:100%;">
								<div style="height:100%;">
									<script type="text/javascript"> createIBSheet("mySheet", "100%", "100%"); </script>
								</div>
							</div>
						</div>
						<p class="t_orange">
							이 예제는 데이터베이스와 연동됨으로 사용전에 관련 테이블이 생성되어야 합니다.<br/> 
							/Sample_IBSheet/01/우편번호.sql 파일을 열어 테이블과 내용을 입력하시고, serverpaging_data.jsp 파일에서
							DB접속 정보를 수정하신 후, 사용하시기 바랍니다.
						</p>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer_codeview.jsp" %>
			</div>
		</div> <!--main_content-->
	</body>
</html>