<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/transaction.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>기본기능 > 데이터조회 > <b>트랜젝션관리</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<!-- <h2>각 행의 데이터를 수정하거나 입력,삭제시 상태컬럼의 변화를 확인하고,저장 버튼 클릭시 서버로 전송되는 데이터를 확인한다.</h2> -->
							<blockquote>각 행의 데이터를 수정하거나 입력,삭제시 상태컬럼의 변화를 확인하고,저장 버튼 클릭시 서버로 전송되는 데이터를 확인한다.</blockquote>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload')">초기화</button>
									<button class="btn-strong" onclick="doAction('insert')">추가</button>
									<button class="btn-strong" onclick="doAction('search')">조회</button>
									<button class="btn-strong" onclick="doAction('save')">저장</button>
									<button class="btn-strong" onclick="doAction('save2')">저장 JSON</button>
								</div>
							</header>
						</div>
						<div class="area-panel"  style="height: calc(100% - 145px);">
							<div class="panel-ch">
								<script type="text/javascript">createIBSheet("mySheet", "100%", "100%"); </script>
							</div>
						</div>
						
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer_dataview.jsp" %>
			</div>
		</div>
	</body>
</html>