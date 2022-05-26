﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/grouping.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>이벤트 > 기능별 > <b>그룹</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
<pre>
<code class="language-javascript">//그룹과 관련된 이벤트는 다음과 같습니다.
/*
	- 그룹핑 이전 발생
	   : OnAfterExpand
	- 그룹핑 완료후 발생
	   : OnGroupFinish
*/
</code>
</pre>
						</div>
						<header class="area-subtitle"> 
							<div class="btn" style="float:right;">
								<button class="btn-strong" id="OnGroupStart" onclick="btnCheck(this)">OnGroupStart</button>
								<button class="btn-strong" id="OnGroupFinish" onclick="btnCheck(this)">OnGroupFinish</button>
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
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnGroupStart"><b>1. OnGroupStart</b></a><br/></p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.13.83 이후 버전에서 사용가능 합니다.<br/>
									</div>
								</div>
							</blockquote>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnGroupFinish"><b>2. OnGroupFinish</b></a><br/></p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.12.1 이후 버전에서 사용가능 합니다.<br/>
									</div>
								</div>
							</blockquote>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
		<div class="modal fade" id="modalOnGroupStart" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							<i class="material-icons">clear</i>
						</button>
						<h4 class="modal-title">OnGroupStart</h4>
					</div>
					<div class="modal-body">
						<p>그룹핑 처리가 되기전 시점에 이 이벤트가 발생한다.<br/>
							<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_ OnGroupStart(Cols) { }
	▶ Parameter
		- Cols(String) : 그룹 컬럼 정보
*/

function mySheet_OnGroupStart(cols) {
	//현재 Group 중인 컬럼
	console.log("Group : "  + cols);
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
		<div class="modal fade" id="modalOnGroupFinish" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							<i class="material-icons">clear</i>
						</button>
						<h4 class="modal-title">OnGroupFinish</h4>
					</div>
					<div class="modal-body">
						<p>그룹핑 처리가 완료된 시점에 이 이벤트가 발생한다.
							<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_ OnGroupFinish(Group) { }
	▶ Parameter
		- Group(String) : 그룹 기준 컬럼의 SaveName을 구분자 "|"로 연결한 문자열
*/
function mySheet_OnGroupFinish(group) {
	console.log("그룹기준 컬럼 : ", group.split("|").join(", "));
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