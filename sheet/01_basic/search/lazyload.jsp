<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/lazyload.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>기본기능 > 데이터조회 > <b>레이지로드(Default)</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="page">
						<div class="content-annina">
							<div class="entry-content">
								<h2>버퍼링기법을 사용하게 된 배경</h2>
								<p>ibsheet는 순수 자바스크립트로 구현된 웹ui컴포넌트로써 보여지는 그리드 영역은 모두 html태그들로 구성되어 있으며
								각 셀의 데이터를 표시하기 위해서는 복합적인 &lt;div&gt;구조안에 table &gt; tr &gt; td엘리먼트 형태로 구성됩니다.
								데이터의 양이 적은 경우에는 별다른 렌더링 기법 없이 데이터양에 해당하는 모든 엘리먼트가 생성되어도 무방하겠으나,
								조금이라도 양이 많아질 경우 브라우저가 허용할 수 있는 Dom의 개수가 초과하여 브라우저에 큰 부하를 가져다줍니다. 
								</p>
								<p>이런 브라우저의 부담을 해소하기 위해서 일반적인 웹 개발에서의 게시판같은 경우 페이징 기법을 통해 데이터를 표시했다면 아이비시트에서는 레이지로드형태의 조회 방식을 제공하고 있습니다.</p><br/>
								<h2>그렇다면 레이지로드란 무엇인가?</h2>
								<p>레이지로딩(Lazyloading)이란 화면이 호출되는 시점에 보여지는 일부 데이터 영역만 로드하고 그 외 나머지 영역은 추후에 로드하는 방식입니다.<br/>
								아래 생성된 그리드에서 마우스 휠을 통해 스크롤을 내리게 되면 마치 전체 데이터가 로드된것처럼 사용자에게 보여주지만 
								최초 데이터 조회시 전체 데이터는 배열안에 담아두고 일정 범위 이상 스크롤이 이동할 경우 해당 스크롤 위치에 해당하는 데이터를 로드 하는 방식으로 동작 합니다. 
								</p>
							</div>
							<div class="clear hidden"></div>
							<!-- Area : 서브타이틀, 시트버튼 (S) -->
							<header class="area-subtitle"> 
								<div class="fl">
										<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('exceldown')">초기화</button>
									<button class="btn-strong" onclick="doAction('search')">조회</button>
								</div>
							</header>
							<div class="area-panel"">
								<div class="panel-ch">
									<div style="height:350px;">
										<script type="text/javascript">createIBSheet("mySheet", "100%", "100%"); </script>
									</div>
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