﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/rendersheet.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>기타 > 성능개선 > <b>RenderSheet</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<h2>RenderSheet란?</h2>
							<p><b>1. 설명</b><br/>
							행추가나 컬럼숨김등을 대량으로 처리하는 경우 속도저하가 발생될 수 있는데, 이런 경우 렌더링을 마지막에만 처리하도록 처리함으로써 처리 속도를 개선 시킬 수 있습니다.</p><br/>
							<p><b>2. 사용방법</b><br/>
<pre>
<code class="language-javascript">	// 1. 인자 값에 0으로 설정해서 렌더링 중단
	mySheet.RenderSheet(0);
	for (var i = 0; i < 50; i++) {
		mySheet.SetCellBackColor(3, 3, 'red');
		mySheet.SetCellBackColor(3, 3, 'blue');
	}
	// 2. 인자 값을 1로 설정할 경우 일괄적으로 렌더링 처리
	mySheet.RenderSheet(1);
</code>
</pre>
							<p><b>3. 지원함수</b><br/>
							RenderSheet를 통해 렌더링을 지연시킬 수 있는 함수는 아래와 같습니다.
<pre>
<code class="language-javascript">	SetColHidden<br/>
	DataInsert
	RowEditable
	SetCellBackColor
	SetCellFontColor
	SetCellFontUnderline
	SetCellFontBold
	SetCellClassName
	SetCellFontSize
	SetCellFontName
	SetCellFontItalic
	SetCellAlign
	SetToolTipText
	SetCellVAlign
	SetCellFontStrike
</code>
</pre>
							<p>메뉴명 및 코드명 지정시 각각의 아이템들은 "|" 문자를 구분자로 사용하며 메뉴명이 "*-"인 경우에는 구분선을 의미 합니다.</p>
							<p>아래 샘플에서 마우스우클릭을 통해 메뉴를 확인 해볼 수 있습니다.</p><br/>
							<p><b>4. 샘플</b><br/>
							<div style="width:100%; border:solid 0px blue;">
								<div style="width:49%; float:left;">
									<header class="area-subtitle"> 
										<p style="float:left; margin : 0 0 0 10px; "></p>
										<button id="shtbtn1" class="btn-strong" style="float:right; margin:0 20px;" onclick="doAction('hidden', 'mySheet')">ColHidden</button>
									</header>
									<div class="area-panel">
										<div class="panel-ch">
											<div style="height:250px;">
												<div id="ibsheetArea1"></div>
											</div>
										</div>
									</div><br/>
								</div>
								<div style=" width:49%; margin : 0 0 0 1px; float: right;">
									<header class="area-subtitle"> 
										<p style="float:left; margin : 0 0 0 10px; "></p>
										<button id="shtbtn2" class="btn-strong" style="float:right; margin:0 20px;" onclick="doAction('hiddenEx', 'mySheet2')">ColHidden(RenderSheet적용)</button>
									</header>
									<div class="area-panel">
										<div class="panel-ch">
											<!-- class="sheetSec"  -->
											<div style="height:250px;">
												<div id="ibsheetArea2"></div>
											</div>
										</div>
									</div><br/>
								</div>
							</div>
							</p>
						</div><br/>
						
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
	</body>
</html>