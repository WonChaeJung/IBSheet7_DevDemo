<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/column_width.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>영역별 > 헤더영역 > <b>너비 설정 가이드</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
				
			<div id="page" class="hfeed site">
				<div>
					<main id="main" class="site-main" role="main">
						<article id="post-3612" class="post-3612 post type-post status-publish format-standard hentry category-dev-log category-react-js category-tech-log tag-react tag-react-anyone">
						
						<div class="content-annina">
							<div class="entry-content">
								<blockquote>각 컬럼별 너비 설정시 도움이 될만한 내용에 대해서 정리하였습니다.</blockquote>
								<h2>일반적인 컬럼의 너비 설정</h2>
								<!-- <p><b>정렬 설정 </b></p> -->
								<p>컬럼 정보를 설정하는 부분 InitColumns함수 Width속성에서 각 컬럼의 너비를 설정할 수 있습니다.</p>
	<pre>
	<code class="language-javascript">/*Sheet 기본 설정 */
	function LoadPage() {
		var initSheet = {
			Cfg : {
				SearchMode:smLazyLoad
			},
			Cols : [
				// 각 컬럼 정보를 설정하는 영역 입니다. Width 속성에 픽셀 단위의 값을 설정해서 너비를 지정할 수 있습니다.
				{Header:"종목코드", Type:"Text", Width:65, SaveName:"param1"},
				{Header:"종목명", Type:"Text", Width:65, SaveName:"param2"},
				{Header:"구분", Type:"Text", Width:55, SaveName:"param3"},
				{Header:"구분2", Type:"Text", Width:55, SaveName:"param3"},
			]
		};
		IBS_InitSheet(mySheet, initSheet);
		doAction('search');
	}
	</code>
	</pre>
								<p>Width속성에 들어가는 값은 무조건 <font color="red">숫자(Number)타입의 고정 값(픽셀단위)</font>로만 설정이 가능 합니다.</p>
								<p>그리고 너비를 지정하는 속성으로 Width외에 MinWidth속성을 추가로 제공하고 있는데, 차이점은 설정된 너비 값이 해당 컬럼의 최소 너비 값으로도 동작 됩니다.<br/>
								<blockquote id="ib-quote">
									<div class="ib-indent">
										<div class="ib-paragraph">사용자가 컬럼 너비를 동적으로 변경하거나 시트의 너비를 동적으로 변경하게 될 경우를 고려했을때 <font color="red">Width보단 MinWidth속성을 사용하는것을 권장</font>하고 있습니다.</div>
									</div>
								</blockquote>
								</p><br/>
								<h2>비율(%)너비 지정 방법</h2>
								<p>그리드 각 컬럼에 너비를 지정하는 방법에 대해서 알았보았는데, 앞선 설명에서는 너비값은 고정된 픽셀단위의 값으로만 지정이 가능하다고 설명드렸습니다.<br/>
								그런데 그리드의 너비값의 총 합이 그리드의 너비값보다 적은 경우 그리드에 빈 공간이 보여지는 현상이 발생 할 수 있는데, 이 부분을 해소하기 위해서 두 가지의 가이드 방안을 제공하고 있습니다.</p><br/>
								<p><b>1. FitColWidth</b></p>
								<p>그리드의 전체 너비를 기준으로 각 시트의 컬럼 너비를 재조정 해주는 함수 입니다. 해당 함수에 인자값을 명시할 경우 퍼센트별로 너비를 지정할 수 있고 인자 값이 없을 경우 현재 설정된 컬럼 너비의 비율을 유지한 상태에서 그리드 전체 너비에 맞게 재조정 됩니다.</p>
								<p><b>2. ExtendLastCol</b></p>
								<p>그리드에 빈 공간이 있을 경우 마지막 컬럼의 너비를 부족한 공간만큼 확장 시켜주는 기능 입니다. 아래 샘플을 통해 FitColWidth 및 ExtendLastCol함수의 동작을 확인해보실 수 있습니다.</p>
							</div>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload')">초기화</button>
									<button class="btn-strong" onclick="doAction('search')">조회</button>
									<button class="btn-strong" onclick="doAction('fitcolwidth1')">각 너비를 전체 너비의 10% 노정</button>
									<button class="btn-strong" onclick="doAction('fitcolwidth2')">현재 비율을 유지한 상태로 너비 조정</button>
									<button class="btn-strong" onclick="doAction('extendlastcol')">마지막 컬럼 너비 확장</button>
								</div>
							</header>
							<div class="area-panel">
								<div class="panel-ch">
									<!-- class="sheetSec"  -->
									<div style="height:300px;">
										<div id="ibsheetArea"></div>
									</div>
								</div>
							</div>
							<div class="entry-content">
								<h2>그 외 너비설정과 관련된 정보</h2>
								<p><b>1. 시트의 크기가 동적으로 변경 될 경우</b></p>
								<p>AutoFitColWidth</p><br/>
								<p><b>2. 컬럼 너비 고정</b></p>
								<p>FitColWidth</p><br/>
								<p><b>3. 컬럼 내의 글자 길이에 맞춘 너비 조정</b></p>
								<p>FitSizeCol, FitSizeColMode</p><br/>
							</div>
						<div class="clear hidden"></div>
					</div>
					
					</article>
					</main>
					</div>
					</div>
					<br/><br/>
				</div>
				<%@ include file="/sheet/common/layout/footer_codeview.jsp" %>
			</div>
		</div>
	</body>
</html>