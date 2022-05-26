﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/dragdrop.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>기능별 > 기타기능 > <b>Drag & Drop</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>Drag&Drop예제1</blockquote>
							<p>IBSheet7는 기본적으로 드래그시 행단위 및  셀단위로 영역을 선택할 수 있도록 기능을 제공하고 있습니다.<br/>
							하지만 DragMode라는 속성 값을 1로 주게 되면 위의 두 가지 드래그 동작에 대해서 제한을 줄 수 있습니다.<br/>
							</p>
<pre>
<code class="language-javascript">var initSheet = {
	Cfg : {
		DragMode : 1,
	}
}
</code>
</pre>
							<p>
							자세한 동작은 아래 그리드에서 확인 해볼 수 있습니다.
							</p>

							<div style="width:100%; border:solid 0px blue;">
								<div style="width:49%; border:solid 0px red; float:left;">
									<header class="area-subtitle"> 
										<h2>* 일반적인 드래그 동작</h2>
									</header>
									<div class="area-panel">
										<div class="panel-ch">
											<!-- class="sheetSec"  -->
											<div style="height:250px;">
												<div id="ibsheetArea"></div>
											</div>
										</div>
									</div><br/>
								</div>
								<div style=" width:50%; margin : 0 0 0 1px; border:solid 0px red; float: left;">
									<header class="area-subtitle"> 
										<h2>* DragMode가 적용된 드래그 동작(셀 단위)</h2>
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
						</div>
						<div class="entry-content">
							<!-- <p><b>2. 기본 동작 방식</b></p> -->
							<p>우측에 생성된 그리드에서 드래그를 하면  툴팁(tooltip)으로  셀 단위로 데이터가 이동하는걸 확인할 수 있습니다.<br/>
							드래그가 끝나는 시점에서는 OnCellDropEnd 또는 OnDropEnd 이벤트를 발생시킬수 있는데 해당 이벤트에서 드래그가 시작된 시점의 데이터를 가져올 수 있으며<br/>
							CellValue(또는 RowData)등의 함수를 통해 데이터간의 이동을 구현해볼 수 있습니다.</p><br/>
							<p>
							그리고 드래그시 이동되는 영역의 단위를 셀 또는 행 단위로 지정할 수 있는데, DragCell이라는 속성값이 1로 지정된 경우에는 셀 단위가 적용되고,<br/>
							0으로 설정되었거나 별도로 지정된 값이 없으면 행 단위로 동작 합니다.<br/>
							아래는 행 단위 드래그를 응용한 샘플 입니다.
							</p>
							
							<div style="width:100%; border:solid 0px blue;">
								<header class="area-subtitle"> 
										<h2>* DragMode가 적용된 드래그 동작(행 단위)</h2>
								</header>
								<div style="width:49%; border:solid 0px red; float:left;">
									<div class="area-panel">
										<div class="panel-ch">
											<!-- class="sheetSec"  -->
											<div style="height:250px;">
												<div id="ibsheetArea3"></div>
											</div>
										</div>
									</div><br/>
								</div>
								<div style=" width:50%; margin : 0 0 0 1px; border:solid 0px red; float: left;">
									<div class="area-panel">
										<div class="panel-ch">
											<!-- class="sheetSec"  -->
											<div style="height:250px;">
												<div id="ibsheetArea4"></div>
											</div>
										</div>
									</div><br/>
								</div>
							</div>
							
<!-- 						
							<p>DragCell 속성 설명
							 </p>
							<p class="subtit_sheet">조회리스트</p>
							<div class="area-panel">
								<div class="panel-ch">
									<div style="height:210px;">
										<div id="ibsheetArea"></div>
									</div>
								</div>
							</div>
							 -->
							
							
						</div>
						
						
					</div>
					<br/>
					
<!-- 					
					<div class="content-annina">
						<div class="entry-content">
							<h2>* DragMode가 적용된 드래그 동작(셀 단위)</h2>
							<p><b>1. 다중 정렬시 컬럼 개수를 지정하고 싶은 경우</b></p>
							<p>시트 객체 생성시 ibsheet.cfg 또는 SetConfig에 MaxSort 속성 값을 지정해서 멀티 소팅 가능한 최대 컬럼 개수를 설정할 수 있습니다.</p><br/>
							<p><b>2. 컬럼 타입이 Text(문자열)이면서 데이터 값이 숫자인 경우 정수값을 기준으로 정렬을 하고 싶을때</b></p>
							<p>컬럼 타입이 Text나 Popup이라면 값(데이터)이 숫자일 경우라도 문자형 정렬 방식으로 동작 합니다. 만약 정수값을 기준으로 정렬을 하고자 하는 경우에는 정보 설정 구간에서 아래와 같이 NumberSort 속성 값을 1로 지정 해주시기 바랍니다.</p><br/>
<pre>
<code class="language-javascript">var initSheet = {
/*Sheet 기본 설정 */
function LoadPage() {
	var initSheet = {
		Cfg : {
			SearchMode:smLazyLoad,
			MergeSheet:msHeaderOnly
		},
		Cols : [
			{Header:"종목",  Type:"Text", Width:65, SaveName:"param1", NumberSort : 1},
			{Header:"종목명",	Type:"Text", Width:65, SaveName:"param2" },
			{Header:"참여",Type:"Text", Width:40, SaveName:"param3",Align:"Center"}
		]
	};
	IBS_InitSheet(mySheet, initSheet);
	doAction('search');
}
</code>
</pre>
</pre>
						</div>
						<div class="clear hidden"></div>
					</div>
					 -->
					
					
				</div>
				
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
	</body>
</html>