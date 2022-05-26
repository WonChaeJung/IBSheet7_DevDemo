<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/scroll.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>이벤트 > 영역별 > <b>헤더영역</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
<pre>
<code class="language-javascript">// 스크롤 이동시 발생시킬 수 있는 이벤트 입니다.
/*
	가로 스크롤
	   - OnHScroll
	세로 스크롤
	   - OnVScroll
*/
</code>
</pre>
						</div>
						<header class="area-subtitle"> 
							<div class="btn" style="float:right;">
								<button class="btn-strong" id="OnHScroll" onclick="btnCheck(this)">OnHScroll</button>
								<button class="btn-strong" id="OnVScroll" onclick="btnCheck(this)">OnVScroll</button>
								<button id="test123" class="btn-strong">로그지우기</button>
							</div>
						</header>
						<div class="area-panel">
							<div class="panel-ch">
								<div style="height:430px;">
									<div id="ibsheetArea"></div>
								</div>
							</div>
							<textarea id="eventLog" style="width:100%; height:430px; border: 2px solid #5d8cc9"></textarea>
						</div>
						
						<div class="entry-content">
							<h2> 세부설명 </h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnHScroll"><b>1. OnHScroll</b></a><br/></p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnVScroll"><b>2. OnVScroll</b></a><br/></p>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
		
	<!-- #1 modalOnHScroll -->
	<div class="modal fade" id="modalOnHScroll" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnHScroll</h4>
				</div>
				<div class="modal-body">
					<p>가로스크롤 시 이벤트가 발생한다.<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnHScroll(hpos, oldhpos, isLeft, isRight, section) { }
	▶ Parameter
		- hpos(Long) : 가로 스크롤 값
		- oldhpos(Long) : 이전 가로 스크롤 값
		- isLeft(Boolean) : 가로 스크롤이 좌측 끝에 위치했는지 여부
		- isRight(Boolean) : 가로 스크롤이 우측 끝에 위치했는지 여부
		- section(Int) : 스크롤 섹션 값(항상 1이 반환됨)
*/

function mySheet_OnHScroll(hpos, oldhpos, isLeft, isRight, section) {

}
</code>
</pre>
						</div>
					</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
	
	
	<!-- #2 #modalOnVScroll -->
	<div class="modal fade" id="modalOnVScroll" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnVScroll</h4>
				</div>
				<div class="modal-body">
					<p>세로스크롤 시 이벤트가 발생한다
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnVScroll(vpos, oldvpos, isTop, isBottom) { }
	▶ Parameter
		- vpos(Long) : 세로 스크롤 값
		- oldvpos(Long) : 이전 세로 스크롤 값
		- isTop(Boolean) : 세로 스크롤이 최상단에 위치했는지 여부
		- isBottom(Boolean) : 세로 스크롤이 최하단에 위치했는지 여부
*/
function mySheet_OnVScroll(vpos, oldvpos, isTop, isBottom) {

}
</code>
</pre>
						</div>
					</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
	</body>
</html>