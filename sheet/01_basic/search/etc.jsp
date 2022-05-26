<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/etc.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>기본기능 > 데이터조회 > <b>기타(스크롤조회)</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="content-annina">
							<div class="entry-content">
								<h2>버퍼링기법을 사용하게 된 배경</h2>
								<p>ibsheet는 순수 자바스크립트로 구현된 웹ui컴포넌트로써 보여지는 그리드 영역은 모두 html태그들로 구성되어 있으며
								</p>
							</div><br/>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">스크롤이 마지막으로 내려가면 데이터를 Append 함</h5>
								</div>
							</header>
							<div class="area-panel"  style="height: 430px">
								<div class="panel-ch">
									<div style="height:100%;">
										<script type="text/javascript">createIBSheet("mySheet", "100%", "100%"); </script>
									</div>
								</div>
							</div>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">스크롤이 마지막으로 내려가면 "더보기" 버튼을 보여줌</h5>
								</div>
							</header>
							<div class="area-panel"  style="height: 400px">
								<div class="panel-ch">
									<div style="height:100%;">
										<script type="text/javascript">createIBSheet("mySheet2", "100%", "100%"); </script>
									</div>
								</div>
							</div>
							<div class="ib_function float_right">
								<input type="button" id="tmpBtn" style="display:none;" onclick="this.disabled = true; doAction('search', 'mySheet2');" class="f1_btn_gray lightgray" value="더보기"/>
							</div>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer_dataview.jsp" %>
			</div>
		</div>
	</body>
</html>