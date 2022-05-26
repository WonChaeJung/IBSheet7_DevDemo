﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/context_menu.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>영역별 > 헤더영역 > <b>ActionMenu(OR ContextMenu)</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
				
			<div id="page" class="hfeed site">
				<div>
					<main id="main" class="site-main" role="main">
						<article id="post-3612" class="post-3612 post type-post status-publish format-standard hentry category-dev-log category-react-js category-tech-log tag-react tag-react-anyone">
						
				
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>ActionMenu설명 및 설정 방법에 대하여 알아보겠습니다.</blockquote>
							<h2>ActionMenu(ContextMenu)</h2>
							<p><b>1. ActionMenu가 무엇인가요?</b><br/>
							그리드 내부영역에서 마우스 우클릭시 메뉴를 생성하는 기능을 사용자정의메뉴(ContextMenu)라고 부르며 ibsheet에서는 ActionMenu라는 명칭으로 제공됩니다.</p><br/>
							<p><b>2. 설정 방법</b><br/>
							SetActionMenu함수를 통해서 메뉴를 생성해 볼 수 있습니다.<br/>세 가지 방식으로 메뉴를 생성할 수 있는데 자세한 내용은 아래 코드를 참고해주세요</p>
<pre>
<code class="language-javascript">// 1. 메뉴명만 설정할 경우
mySheet.SetActionMenu("입력|행복사|*-|행삭제|Clear|엑셀다운로드");

// 2. 메뉴명과 코드값 설정
var Text = "입력|행복사|*-|행삭제|Clear|엑셀다운로드";
var Code = "Ins|Copy||Del|Clear|Download";
mySheet.SetActionMenu(Text, Code);

// 3. JSON객체로 설정
var Menu = [
	{Text: "입력", Code: "Ins"},
	{Text: "행복사", Code: "Copy"},
	{Text: "*-"},
	{Text: "행삭제", Code: "Delete"},
	{Text: "Clear", Code: "Clear"},
	{Text: "엑셀다운로드", Code: "Download"}
];
mySheet.SetActionMenu(Menu);
</code>
</pre>
							<p>메뉴명 및 코드명 지정시 각각의 아이템들은 "|" 문자를 구분자로 사용하며 메뉴명이 "*-"인 경우에는 구분선을 의미 합니다.</p>
							<p>아래 샘플에서 마우스우클릭을 통해 메뉴를 확인 해볼 수 있습니다.</p>
						</div><br/>
						<p class="subtit_sheet">조회리스트</p>
						<div class="area-panel">
							<div class="panel-ch">
								<!-- class="sheetSec"  -->
								<div style="height:210px;">
									<div id="ibsheetArea"></div>
								</div>
							</div>
						</div><br/>
						<div class="entry-content">
							<p><b>3. 동작 방식</b><br/>
								SetActionMenu함수가 호출된 이후부터는 마우스 우클릭을 통해 팝업 메뉴를 생성할 수 있는데, 특정 메뉴명을 선택하면  
								 시트에서 OnSelectMenu이벤트를 발생시킵니다. 해당 이벤트에서 각메뉴별로 로직을 구성해서 사용해보실 수 있습니다.<br/>
								고정코드를 사용할 경우 별도의 로직을 구현하지 않아도 되며 제품에서 제공하는 고정코드는 다음과 같습니다.
							</p>
<pre>
<code class="language-javascript">
/**
대상 컬럼 오름 차순 정렬		_ibColSortAsc
대상 컬럼 오름 차순 정렬		_ibColSortAsc
대상 컬럼 내림 차순 정렬		_ibColSortDesc
대상 컬럼 숨김			_ibColHidden
헤더메뉴로 숨긴 컬럼 출s력	_ibCancelColHidden
현재 컬럼정보 저장		_ibSaveColPosition
저장된 컬럼정보 삭제		_ibResetColPosition
필터행 출력			_ibHideFilter  필터행 숨김
*/

//2. 메뉴명과 코드값 설정
var Text = "입력|행복사|*-|행삭제|Clear|엑셀다운로드|오름차순|내림차순";
var Code = "Ins|Copy||Del|Clear|Download|_ibColSortAsc|_ibColSortDesc";

mySheet.SetActionMenu(Text, Code);
function mySheet_OnSelectMenu(Text, Code){
	// text 또는 code값으로 Action수행
	switch(Code) {
		case "Ins" : 
			mySheet.DataInsert(0);
			break; 
		Default :
			break;
	}
}
</code>
</pre>

							<h2>기타</h2>
							<p><b>1. HeaderActionMenu</b><br/>
							<p>데이터 영역에 설정한 ActionMenu와는 별개로 헤더영역에서도 팝업메뉴를 설정 할 수 있습니다.<br/>
							헤더컨텍스트메뉴는 <font color="red">ibsheet.cfg 또는 SetConfig인자 값으로 UseHeaderActionMenu속성 값을 1로 설정</font>한 경우만 사용할 수 있으며 메뉴에대해서 별다른 정의를 하지 않았을 경우 기본 값으로 아래와 같은 메뉴가 생성 됩니다.<br/>
							</p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph"><img src="/resource/images/page/sheet/area/headerActionMenu.gif"/></div>
								</div>
							</blockquote>
							<p>
							위 메뉴명은 특정 항목을 제거할수도 있고 새로운 것을 추가할 수도 있는데, 추가 하는 방법은 위에서 설명한 [1-2] 설정방법과 동일 합니다.
							</p><br/>
							<p><b>2. GroupActionMenu</b><br/>
							<p>아이비시트는 HeaderActionMenu와 마찬가지로 그룹행에서 또한 별도의 컨텍스트 메뉴를 지원 합니다.</br/>
							시트 초기화시 <font color="red">SetConfig 등 인자 값으로 UseGroupActionMenu 속성 값을 1로 설정</font>할 경우 아래와 같은 이미지의 팝업창을 생성 합니다.<br/>
							</p>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph"><img src="/resource/images/page/sheet/area/groupActionMenu.gif"/></div>
								</div>
							</blockquote><br/>
							<p><b>3. ColumnActionMenu</b><br/>
							<p>
							컬럼 단위로 액션 메뉴를 설정하고자 하는 경우에는 ActionMenu함수가 아닌 InitColumns(컬럼초기화함수)의 ActionMenu속성으로 사용을 해보실 수 있습니다. 이 또한 ActionMenu와 마찬가지로 세 가지의 설정 방식을 제공하는데 아래 코드를 참고해주세요.
							</p><br/>
<pre>
<code class="language-javascript">
var initSheet = {
	Cfg : {
		SearchMode:smLazyLoad,
		UseHeaderActionMenu : 1,
		UseGroupActionMenu : 1,
		MergeSheet:msHeaderOnly
	},
	HeaderMode : { Sort : 1, ColMove : 1, ColResize : 1, HeaderCheck : 1 },
	Cols : [
		{Header:"종목코드3",Type:"Text",Width:65, SaveName:"param1",Align:"Center"   },
		{Header:"종목명",	Type:"Text",Width:65, SaveName:"param2",Align:"Center"  },
		{Header:"구분",	Type:"Combo",Width:55, SaveName:"param3" ,ComboText:"매도|매수",ComboCode:"00|01"},
		{Header:"체결일",Type:"Combo",Width:55, SaveName:"param4" ,ComboText:"당일|익일|특정일|특정일까지",ComboCode:"00|01|02|03"},
		{Header:"체결\n조건",Type:"Text",Width:55, SaveName:"param5" },
		{Header:"수량",Type:"Int",Width:80, SaveName:"param6" ,Format:"Integer", ActionMenu : actionMenu},
		{Header:"가격",Type:"Text",Width:55, SaveName:"param7" },
		{Header:"협상대상",Type:"Combo",Width:70, SaveName:"param8" ,ComboText:"수량|가격|가격,수량",ComboCode:"00|01|02"},
		{Header:"협상여부",Type:"Combo",Width:70, SaveName:"param9" ,ComboText:"미협상|협상중|협상완료",ComboCode:"00|01|02"},
		{Header:"최대\n참여",Type:"Text",Width:40, SaveName:"param10" },
		{Header:"현재참여",Type:"CheckBox",Width:80, SaveName:"param11",Align:"Center" },
		{Header:"협상\n참여",Type:"Text",Width:40, SaveName:"param12",Align:"Center"}
	]
};

// 일반 설정
var actionMenu = [
	{"Text" : "메뉴01", "Code" : "01"}, 
	{"Text" : "메뉴02", "Code" : "02"},
	{"Text" : "메뉴02", "Code" : "03"}
];

// 일반 설정 : Code 생략
var actionMenu = [
	{"Text" : "메뉴01"}, 
	{"Text" : "메뉴02"},
	{"Text" : "메뉴02"}
];
 
// 약식 설정
var actionMenu = ["메뉴01", "메뉴02", "메뉴03"];
</code>
</pre>
							<p>
							ActionMenu와 ColumnActionMenu가 중복될 경우 ColumnActionMenu로 설정된 팝업이 나타납니다.
							</p><br/>
							<p><b>4. ActionMenu 계층 메뉴 구성</b><br/>
							<p>
							ActionMenu구성시 메뉴의 구성을 계층으로 표시할 경우는 다음과 같은 JSON구조로 만들어주시기 바랍니다.
<pre>
<code class="language-javascript">
var Menu = [
	{
		Text: "입력", Code: "Ins", 
		Items : [
			{ Text: "첫행입력", Code: "Fins"},
			{ Text: "마지막행입력", Code: "Lins"}
		]
	},
	{Text: "행복사", Code: "Copy"},
	{Text: "*-"},
	{Text: "행삭제", Code: "Delete"},
	{Text: "Clear", Code: "Clear"},
	{Text: "엑셀다운로드", Code: "Download"}
];
</code>
</pre>
							</p>
						</div>
						<p class="subtit_sheet">※ 마우스 우클릭시 "입력" 메뉴명에 마우스오버시 계층으로 메뉴가 표시 됩니다.</p>
						<div class="area-panel">
							<div class="panel-ch">
								<!-- class="sheetSec"  -->
								<div style="height:210px;">
									<div id="ibsheetArea2"></div>
								</div>
							</div>
						</div><br/>
					</div>
					
					
					</article>
				</main>
				</div>
				</div>
				
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
	</body>
</html>