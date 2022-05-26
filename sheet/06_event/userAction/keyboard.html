<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/keyboard.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>이벤트 > 사용자 동작별 > <b>키보드 관련 이벤트</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<!-- <blockquote>마우스 조작과 관련된 이벤트애 대하여 알아보겠습니다.</blockquote> -->
							<h2> 키보드 조작과 관련된 이벤트 입니다. </h2>
						</div>
						<header class="area-subtitle"> 
							<!-- <div class="btn" style="float:left"></div> -->
							<div class="btn" style="float:right;">
								<button class="btn-strong" id="OnKeyDown" onclick="btnCheck(this)">OnKeyDown</button>
								<button class="btn-strong" id="OnKeyUp" onclick="btnCheck(this)">OnKeyUp</button>
								<button class="btn-strong" id="OnBeforeTab" onclick="btnCheck(this)">OnBeforeTab</button>
								<button class="btn-strong" id="OnTab" onclick="btnCheck(this)">OnTab</button>
								<button class="btn-strong" id="OnBeforePaste" onclick="btnCheck(this)">OnBeforePaste</button>
								<button class="btn-strong" id="OnAfterPaste" onclick="btnCheck(this)">OnAfterPaste</button>
								<button id="test123" class="btn-strong">로그지우기</button>
							</div>
						</header>
						<div class="area-panel">
							<div class="panel-ch">
								<!-- class="sheetSec"  -->
								<div style="height:600px;">
									<div id="ibsheetArea"></div>
								</div>
							</div>
							<textarea id="eventLog" style="width:100%; height:600px; border: 2px solid #5d8cc9"></textarea>
						</div>
						
						<div class="entry-content">
							<h2> 세부설명 </h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnKeyDown"><b>1. OnKeyDown</b></a><br/></p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnKeyUp"><b>2. OnKeyUp</b></a><br/></p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnBeforeTab"><b>3. OnBeforeTab</b></a><br/></p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.13.84 이후 버전에서 사용가능 합니다.<br/>
									</div>
								</div>
							</blockquote>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnTab"><b>4. OnTab</b></a><br/></p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnBeforePaste"><b>5. OnBeforePast</b></a><br/></p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnAfterPaste"><b>6. OnAfterPaste</b></a><br/></p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.13.21 이후 버전에서 사용가능 합니다.<br/>
									</div>
								</div>
							</blockquote>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
		
	<!-- #1 modalOnKeyDown -->
	<div class="modal fade" id="modalOnKeyDown" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnKeyDown</h4>
				</div>
				<div class="modal-body">
					<p>셀의 값을 수정 중이거나 선택된 셀에 키보드를 누른 경우 이벤트가 발생한다.<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnKeyDown(Row, Col, KeyCode, Shift) { }
	▶ Parameter
		- Row(Long) : 해당 셀의 Row Index
		- Col(Long) : 해당 셀의 Column Index
		- KeyCode(Integer) : 키보드의 아스키 값
		- Shift(Integer) : 1 : Shift키가 눌린 경우 
						2 : Ctrl키가 눌린 경우
						0 : 그외
*/

function mySheet_OnKeyDown(Row, Col, KeyCode, Shift) {
	//마지막 컬럼에서 엔터키가 눌린 경우 다음행의 처음에 포커스 두기
	if(KeyCode == 13 && Col == mySheet.LastCol()) {
		mySheet.SelectCell(Row + 1, 2);
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
	
	
	<!-- #2 #modalOnKeyUp -->
	<div class="modal fade" id="modalOnKeyUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnKeyUp</h4>
				</div>
				<div class="modal-body">
					<p>셀의 값을 수정 중이거나 선택된 셀에 눌린 키보드가 올라오는 경우 이벤트가 발생한다.<br/>이 이벤트는 OnKeyDown 이벤트 발생 후에 바로 발생한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnKeyDown(Row, Col, KeyCode, Shift) { }
	▶ Parameter
		- Row(Long) : 해당 셀의 Row Index
		- Col(Long) : 해당 셀의 Column Index
		- KeyCode(Integer) : 키보드의 아스키 값
		- Shift(Integer) : 1 : Shift키가 눌린 경우 
						2 : Ctrl키가 눌린 경우
						0 : 그외
*/
function mySheet_OnKeyUp(Row,Col,KeyCode,Shift) {
	//마지막 컬럼에서 엔터키가 눌린 경우 다음 행의 처음에 포커스 두기
	if(KeyCode ==13 && Col == mySheet.LastCol() && Row < mySheet.RowCount()) {
		mySheet.SelectCell(Row + 1, 2);
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
	
	<!-- #3 #modalOnBeforeTab -->
	<div class="modal fade" id="modalOnBeforeTab" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnBeforeTab</h4>
				</div>
				<div class="modal-body">
					<p>시트에서 탭 키를 누르는 경우 탭 이벤트가 발생전에 발생한다.<br/>리턴값이 false 또는 0인 경우 해당 셀에서 포커스를 이동하지 않는다.<br/>편집중인 셀의 경우 편집만 완료한다
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnBeforeTab(row, col, oldRow, oldCol) { }
	▶ Parameter
		- row(number) : 행의 Index
		- col(number) : 열의 Index
		- oldRow(number) : 이전 행의 Index
		- oldCol(number) : 이전 열의 Index

*/
function mySheet_OnBeforeTab (row, col, oldRow, oldCol) {
	console.log(“[OnBeforeTab] new : “ + row + “, ”  + col + “, old : “ + oldRow + “, “ + oldCol);
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
	
	<!-- #4 modalOnTab -->
	<div class="modal fade" id="modalOnTab" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnTab</h4>
				</div>
				<div class="modal-body">
					<p>시트에서 탭 키를 누르는 경우 OnTab 이벤트가 발생한다.<br/>
isLast 인자의 경우 탭으로 이동할 수 있는 마지막 셀인경우 반환되는 값으로<br/>
Shift + Tab을 누르는 경우 첫셀, Tab을 누르는 경우 마지막 셀에서 1값을 반환한다.<br/> 
TabBehavior, EditTabBehavior를 설정한 경우 설정값에 따라서 이동할 수 있는<br/>
마지막 셀에서 1값이 반환된다. (이전행/컬럼과 현재행/컬럼이 동일한 경우에 1로 반환됨)<br/>

						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnTab(Row, Col, Old_Row, Old_Col, isShift, isLast) { }
	▶ Parameter
		- Row(number) : 행의 Index
		- Col(number) : 열의 Index
		- Old_Row(number) : 이전 행의 Index
		- Old_Col(number) : 이전 열의 Index
		- isShift(boolean) : Shift 키 입력 여부
		- isLast(boolean) : 마지막 셀 여부
*/

function mySheet_OnTab(Row, Col, Orow, Ocol, isShift, isLast) {
	alert("[OnTab] New : " + Row + "," + Col + " Old : " + Orow + "," + Ocol + " Shift : " + isShift + " isLast : " + isLast);
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
	
	<!-- #5 modalOnBeforePaste -->
	<div class="modal fade" id="modalOnBeforePaste" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnBeforePaste</h4>
				</div>
				<div class="modal-body">
					<p>시트에 데이터를 붙여넣기 직전에 발생한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnBeforePaste(text) { }
	▶ Parameter
		- text(String) : 시트에 붙여넣을 텍스트
	▶ Remarks
		- 데이터를 붙여넣기 전에 발생하며 필요에 따라 붙여넣기를 취소하거나
		붙여넣을 값을 수정 할 수 있다. False 리턴시 붙여넣기는 취소되며,
		문자열 리턴시 붙여넣을 텍스트가 대체된다
*/
function mySheet_OnBeforePaste(text) {
	if(text == "not allow text") {
		alert("붙여넣기가 최소됩니다."); 
		return false;
	}
}

function mySheet_OnBeforePaste(text) {
	if(text == "not allow text") {
		return "allow text";
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
	
	
	<!-- #6 #modalOnAfterPaste -->
	<div class="modal fade" id="modalOnAfterPaste" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">OnAfterPaste</h4>
				</div>
				<div class="modal-body">
					<p>클립보드 붙여넣기 완료 시점에 이벤트가 발생한다. 
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnAfterPaste() { }
	▶ Parameter
		- 없음
*/
function mySheet_OnAfterPaste() {
	console.log("클립보드 붙여넣기 완료");
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