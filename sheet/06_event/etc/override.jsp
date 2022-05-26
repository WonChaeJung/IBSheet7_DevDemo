<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/override.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>이벤트 > 기타> <b>이벤트오버라이드</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<h2>공통 이벤트 사용하기</h2>
							<p><b>1. 설명</b><br/>
							모든 화면에 있는 IBSheet에서 동일하게 동작하는 이벤트가 필요한 경우가 있습니다.<br/>
							가령 OnSearchEnd()나 OnSaveEnd()와 같이 통신 후 callback으로 발생하는 이벤트에서, 서버의 응답 결과에 따라 특정 메세지를 표시해야 하는 경우,<br/>
							각 화면에 모든 IBSheet에 대해서 동일하게 이벤트를 작성하는 것은 매우 불편한 일입니다.<br/>
							이러한 경우 시트 초기화 함수의 끝부분에서 해당 이벤트를 전역으로 선언함으로써 모든 화면에 동일한 이벤트를 부여할 수 있습니다.</p><br/>
							<p><b>2. 사용방법</b><br/>ex) ibsheetinfo.js 파일 내에 초기화 함수 IBS_InitSheet()에서 이벤트를 선언합니다.<br/>
<pre>
<code class="language-javascript">	// 1. 인자 값에 0으로 설정해서 렌더링 중단
	function IBS_InitSheet(sheet, info) {
		//... 시트 초기화 공통 함수 ...
		//ibsheet 이벤트를 override 
		eventOverrideOnSearchEnd(sheet);
	}
	
	//공통 이벤트 정의
	function eventOverrideOnSearchEnd(sheet){
	
		//각 화면에서 정의한 이벤트를 별도로 담아 둔다.
		var oldEvt = window["sheet.id + "_OnSearchEnd];
		
		//새로 이벤트를 정의 한다.
		window[sheet.id+"_OnSearchEnd"] = function( code , msg , StCode, StMsg, Response){
	
			//------------- 모든 시트에 공통으로 적용 되어야 하는 내용 ---------------
			//서버응답에 Code값이 -200 인 경우 session 종료로 정의
			if(code == -200){
				alert("세션이 종료되었습니다.\n 로그인 페이지로 연결됩니다.");
				location.href = "/login.do";
			}
		
			//------------- 모든 시트에 공통으로 적용 되어야 하는 내용 끝 -----------​
			//각  화면에서 정의한 이벤트도 실행한다.
			if(typeof(oldEvt) == "function"){
				​oldEvt ​( code , msg , StCode, StMsg, Response)​;​
			}
		}
	}​//end func
</code>
</pre>
						</div><br/>
						
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
	</body>
</html>