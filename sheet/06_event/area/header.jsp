<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/header.js"></script>
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
<code class="language-javascript">// 시트 생성시 별다른 설정이 없다면 사용자는 헤더영역을 통하여 컬럼의  사이즈조절, 이동, 정렬, 전체체크 등을 사용할 수 있으며 각 기능별 이벤트를 제공하고 있습니다.
/*
	사이즈 조절
	   - OnUserResize
	컬럼이동
	   - OnAfterColumnMove, OnBeforeColumnMove
	정렬
	   - OnBeforeSort, OnColumnSort, OnSort
	전체체크박스
	   - OnBeforeCheckAll, OnCheckAllEnd
*/
</code>
</pre>
						</div>
						<header class="area-subtitle"> 
							<div class="btn" style="float:left">
							<button class="btn-strong" id="lftBtn1" onclick="columnSort();">두번째컬럼 정렬</button>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" id="OnUserResize" onclick="btnCheck(this)">OnUserResize</button>
								<button class="btn-strong" id="OnBeforeColumnMove" onclick="btnCheck(this)">OnBeforeColumnMove</button>
								<button class="btn-strong" id="OnAfterColumnMove" onclick="btnCheck(this)">OnAfterColumnMove</button>
								<button class="btn-strong" id="OnBeforeSort" onclick="btnCheck(this)">OnBeforeSort</button>
								<button class="btn-strong" id="OnColumnSort" onclick="btnCheck(this)">OnColumnSort</button>
								<button class="btn-strong" id="OnSort" onclick="btnCheck(this)">OnSort</button>
								<button class="btn-strong" id="OnBeforeCheckAll" onclick="btnCheck(this)">OnBeforeCheckAll</button>
								<button class="btn-strong" id="OnCheckAllEnd" onclick="btnCheck(this)">OnCheckAllEnd</button>
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
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnUserResize"><b>1. OnUserResize</b></a><br/></p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnBeforeColumnMove"><b>2. OnBeforeColumnMove</b></a><br/></p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnAfterColumnMove"><b>3. OnAfterColumnMove</b></a><br/></p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnBeforeSort"><b>4. OnBeforeSort</b></a><br/></p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.13.75 이후 버전에서 사용가능 합니다.<br/>
									</div>
								</div>
							</blockquote>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnColumnSort"><b>5. OnColumnSort</b></a><br/></p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.13.106 이후 버전에서 사용가능 합니다.<br/>
									</div>
								</div>
							</blockquote>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnSort"><b>6. OnSort</b></a><br/></p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.0.0 에서 추가됨<br/>
										- 7.0.6.0 : 단위데이터행 구조에 대한 지원.<br/>
									</div>
								</div>
							</blockquote>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnBeforeCheckAll"><b>7. OnBeforeCheckAll</b></a><br/></p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.1.0 이후 버전에서 사용가능 합니다.<br/>
									</div>
								</div>
							</blockquote>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnCheckAllEnd"><b>8. OnCheckAllEnd</b></a><br/></p>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
		
	<!-- #1 #modalOnUserResize -->
	<div class="modal fade" id="modalOnUserResize" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnUserResize</h4>
				</div>
				<div class="modal-body">
					<p>마우스를 이용하여 상단 헤더의 컬럼 너비를 변경할때 이벤트가 발생한다.<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnUserResize(Col, Width) { }
	▶ Parameter
		- Col(Long) : 해당 셀의 Column Index
		- Width(Long) : 해당 컬럼 너비
*/

function mySheet_OnUserResize(Col, Width) {
	alert(Col + "컬럼의 너비가 " + Width + "로 변경되었습니다".)
}
</code>
</pre>
						</div>
					</p>
				</div>
				<div class="modal-footer">
					<!-- <button type="button" class="btn btn-simple">Nice Button</button> -->
					<button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
	
	
	<!-- #2 #modalOnBeforeColumnMove -->
	<div class="modal fade" id="modalOnBeforeColumnMove" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnBeforeColumnMove</h4>
				</div>
				<div class="modal-body">
					<p>사용자가 마우스를 이용하여 컬럼 이동을 시작하거나 MoveColumnPos 함수를 이용하여 컬럼 이동을 시작할 때 이벤트가 발생한다.<br/>MoveColumnFail(1) 함수를 이용하여 컬럼이동을 방지할 수 있다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnBeforeColumnMove(Col, NewPos) { }
	▶ Parameter
		- Col(Long) : 이동할 컬럼의 인덱스
		- NewPos(Long) : 이동될 위치의 컬럼 인덱스
*/
//0컬럼이 3컬럼 이후의 위치로 이동하고자 할때 컬럼 이동을 취소한다
function mySheet_OnBeforeColumnMove(Col, NewPos) {
	if(Col==0 && NewPos > 3) {
		mySheet.MoveColumnFail(1);
	}
}

</code>
</pre>
						</div>
					</p>
				</div>
				<div class="modal-footer">
					<!-- <button type="button" class="btn btn-simple">Nice Button</button> -->
					<button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- #3 modalOnAfterColumnMove -->
	<div class="modal fade" id="modalOnAfterColumnMove" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnAfterColumnMove</h4>
				</div>
				<div class="modal-body">
					<p>사용자가 마우스드레그를 이용하여 컬럼을 이동하거나 MoveColumnPos함수를 이용하여<br/>컬럼을 이동하고 이동이 성공적으로 완료되었을 때 이벤트가 발생한다
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnBeforeColumnMove(Col, NewPos) { }
	▶ Parameter
		- Col(Long) : 이동할 컬럼의 인덱스
		- NewPos(Long) : 이동될 위치의 컬럼 인덱스

*/
//컬럼이 이동된 후 이벤트가 발생한다.
function mySheet_OnAfterColumnMove(Col, NewPos) {
	alert(Col + " 위치가 " + NewPos + " 위치로 이동되었습니다..");
}
</code>
</pre>
						</div>
					</p>
				</div>
				<div class="modal-footer">
					<!-- <button type="button" class="btn btn-simple">Nice Button</button> -->
					<button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- #4 modalOnBeforeSort -->
	<div class="modal fade" id="modalOnBeforeSort" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnBeforeSort</h4>
				</div>
				<div class="modal-body">
					<p>Sort 이벤트가 발생되기 전에 발생하는 이벤트
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnBeforeSort(col) { }
	▶ Parameter
		- Col(number) : 선택한 컬럼 인덱스
	▶ Remark
		- 헤더 클릭시 정렬 이벤트가 발생하기 전에 호출 된다.<br/>
		- 정렬 수행전 대기이미지 호출등에 활용된다.
*/
function mySheet_OnBeforeSort(col) {
	console.log(“SortColumn : “ + col);
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
	
	<!-- #5 modalOnColumnSort -->
	<div class="modal fade" id="modalOnColumnSort" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnColumnSort</h4>
				</div>
				<div class="modal-body">
					<p>ColumnSort 함수를 실행했을 때 콜백 함수로서 호출된다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnColumnSort(Col, Order) { }
	▶ Parameter
		- Col(Number/String) : 정렬 처리된 컬럼 인덱스
		- Order(String) : 정렬 방향 문자열(ASC, DESC)
*/
function mySheet_OnColumnSort(Col, Order) {
	//ColumnSort 함수를 실행되었을 때 콜백 함수로 호출되어 실행.
	if(order =="ASC")
		alert(col + "번째 컬럼이 오름차순으로 정렬되었습니다.");
	else
		alert(col + "번째 컬럼이 내림차순으로 정렬되었습니다.");
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
	
	
	<!-- #6 modalOnSort -->
	<div class="modal fade" id="modalOnSort" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnSort</h4>
				</div>
				<div class="modal-body">
					<p>헤더를 마우스로 눌러 데이터가 소트 완료 되었을 때 이벤트가 발생한다.<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnSort(Col, SortOrder) { }
	▶ Parameter
		- Col(Number/String) : 정렬 처리된 컬럼 인덱스
		- Order(String) : 정렬 방향 문자열(ASC, DESC)
*/
function mySheet_OnSort(col, order) {
	if(order =="ASC")
		alert(col + "번째 컬럼이 오름차순으로 정렬되었습니다.");
	else
		alert(col + "번째 컬럼이 내림차순으로 정렬되었습니다.");
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
	
	<!-- #7 modalOnBeforeCheckAll -->
	<div class="modal fade" id="modalOnBeforeCheckAll" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnBeforeCheckAll</h4>
				</div>
				<div class="modal-body">
					<p>사용자의 마우스 클릭을 통한 의한 헤더의 전체체크박스의 값 변경시 전체체크 처리 이전에 이벤트가 발생한다.<br/>
					이벤트의 리턴값을 false로 설정하는 경우 전체체크 처리는 취소 된다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnBeforeCheckAll(Row, Col) { }
	▶ Parameter
		- Row(Number) : 해당 셀의 행 인덱스
		- Col(Number) : 해당 셀의 열 인덱스
*/
// confirm 을 통한 전체체크 제어
function mySheet_OnBeforeCheckAll(Row, Col) {
	if (!confirm("전체체크를 진행하시겠습니까?") {
		// 진행 취소 처리
		return false;
	}
}

</code>
</pre>
						</div>
					</p>
				</div>
				<div class="modal-footer">
					<!-- <button type="button" class="btn btn-simple">Nice Button</button> -->
					<button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- #8 modalOnCheckAllEnd -->
	<div class="modal fade" id="modalOnCheckAllEnd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnCheckAllEnd</h4>
				</div>
				<div class="modal-body">
					<p>체크박스 타입 컬럼이 전체체크가 수행된 후 완료시점에 이벤트가 발생한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnCheckAllEnd(Col, Value) { }
	▶ Parameter
		- Col(Number) : 해당 컬럼의 인덱스
		- Value(Boolean) : 체크 여부
*/
function mySheet_OnCheckAllEnd(Col, Value) {
	alert(Col + "번째 컬럼의 전체체크 수행이 완료되었습니다.");
}

</code>
</pre>
						</div>
					</p>
				</div>
				<div class="modal-footer">
					<!-- <button type="button" class="btn btn-simple">Nice Button</button> -->
					<button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">닫기</button>
				</div>
			</div>
		</div>
	</div>
	
	</body>
</html>