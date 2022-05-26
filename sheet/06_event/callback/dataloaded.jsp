<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/dataloaded.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>이벤트 > 시점별 > <b>조회완료시점</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>시트에서 제공하는 조회 관련 함수(DoSearch, LoadSearchData)가 호출되어지면 시트에 데이터 바인딩 작업이 완료된 시점에<br/>
							아래 이벤트를 발생 시킵니다.<br/><br/>
							<b>조회 완료 시점</b> : OnSearchEnd<br/>
							<b>주회 완료 시점(행 단위)</b> : OnRowSearchEnd <font color="red">(※ 주의 : 성능저하에 직접적인 원인이 되므로 가급적 사용을 권장하지 않음)</font><br/><br/>
							
							</blockquote>
						</div>
						<header class="area-subtitle"> 
							<div class="btn" style="float:left">
								<button class="btn-strong" id="lftBtn1" onclick="doAction('search');">조회</button>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" id="OnSearchEnd" onclick="btnCheck(this)">OnSearchEnd</button>
								<button class="btn-strong" id="OnRowSearchEnd" onclick="btnCheck(this)">OnRowSearchEnd</button>
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
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnSearchEnd"><b>1. OnSearchEnd</b></a><br/></p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.13.30 Response 인자 추가 됨<br/>
									</div>
								</div>
							</blockquote>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalOnRowSearchEnd"><b>2. OnRowSearchEnd</b></a><br/></p>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
		<div class="modal fade" id="modalOnSearchEnd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							<i class="material-icons">clear</i>
						</button>
						<h4 class="modal-title">OnSearchEnd</h4>
					</div>
					<div class="modal-body">
						<p>조회 함수를 이용하여 조회 처리를 완료하고, 내부적은 데이터 표시 처리를 마친 후 이벤트가 발생한다.<br/>
							조회중 오류 메시지가 발생한 경우 이벤트 인자인 code로 설정되므로, code가 0보다 작은 경우 오류 처리로직을 작성하도록 한다.<br/>
							Response 인자는 서버에서 정상적으로 처리 되지 않은 경우에만 전달된다.<br/>
							(HTTP 응답코드가 100 보다 작거나 400보다 큰 경우에만 전달)<br/>
							<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnSearchEnd(Code, Msg, StCode, StMsg, [Response]) { }
	▶ Parameter
		- Code(Long)
		: 처리결과 코드(0이면 정상, 그외는 오류)
		: Sheet ErrCode
			- 3 : 요청 Url이 잘못된 경우나 네트워크 오류 등으로 결과를 받지 못한 경우
			- 4 : 정상적인 응답은 받았으나 데이터 파싱처리중 오류가 발생한 경우(대부분 데이터 이상)
			- 5 : 응답 결과가 빈값인 경우
			- 6 : 서버에 연결하여 응답을 대기하는 시간이 초과된 경우(WaitTimeOut 초과)
			- 그외 : 사용자 정의 코드
		- Msg(String) : 처리 결과 메시지
		- StCode(Int) : HTTP응답 코드
		- StMsg(String) : HTTP응답 메시지
		- Response(String) : 서버 응답 결과
*/

function mySheet_OnSearchEnd(code, message) {
	if(code == 0) {
		alert(message);
		//조회 후 작업 수행
	} else {
		alert("조회 중에 오류가 발생하였습니다..");
	
	}
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
		<div class="modal fade" id="modalOnRowSearchEnd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							<i class="material-icons">clear</i>
						</button>
						<h4 class="modal-title">OnRowSearchEnd</h4>
					</div>
					<div class="modal-body">
						<p>DoSearch나 LoadSearchData 메서드를 통해 데이터가 조회되는
과정에서 행단위로 발생한다.<br/>
특정 행의 데이터를 기준으로 판단하여 Cell에 색상이나 배경색등을<br/>
표현하고자 하는 경우 유용하게 쓰일수 있다.
※이 이벤트는 조회 중에 행단위로 한번씩 발생함으로 조회속도가 저하될 수 있다.
							<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- function 오브젝트ID_OnRowSearchEnd (Row) { }
	▶ Parameter
		- Row(Int) : 행 인덱스
*/
function mySheet_OnRowSearchEnd(row) {
	//3번컬럼이 check되어있고, 4번 컬럼의 값이 100보다 클때, 6번 컬럼의 글자 색상을 붉은색으로 변경한다.
	if( mySheet.GetCellValue(row,3) == 1 && mySheet.GetCellValue(row,4) > 100){
		mySheet.SetCellFontColor(row ,6 ,"#FF0000");
	}
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