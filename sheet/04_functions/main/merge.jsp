<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/merge.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>기능별 > 주요기능 > <b>병합(Merge)</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>머지영역에 따른 자동머지 기능을 확인한다.</blockquote>
						<header class="area-subtitle"> 
							<div class="fl">
								<h5 class="title-a">조회결과</h5>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" onclick="doAction('reload')">초기화</button>
								<button class="btn-strong" onclick="doAction('search')">조회</button>
							</div>
						</header>
						<div class="ib_function2 border_sheet">
							<table class="ib_column2">
								<tr>
									<th class="tit">머지종류 -  </th>
									<td><input type="radio" name="rdo" value="전체머지없음"  onClick="mergeChg('msNone')"  class="radio" />전체머지없음</td>
									<td><input type="radio" name="rdo" value="헤더만머지"  onClick="mergeChg('msHeaderOnly')"  class="radio" checked/>헤더만머지</td>
									<td><input type="radio" name="rdo" value="전체머지가능"  onClick="mergeChg('msAll')"  class="radio" />전체머지가능</td>
									<td><input type="radio" name="rdo" value="앞컬럼기준머지"  onClick="mergeChg('msHeaderOnly + msPrevColumnMerge')"  class="radio" />앞컬럼기준머지</td>
								</tr>
							</table> 
						</div>

<!-- 						
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
</pre> -->
						</div><br/>
						<div class="area-panel" style="height: calc(100% - 215px);">
							<div class="panel-ch">
								<div style="height:100%;">
									<div id="ibsheetArea"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer_dataview.jsp" %>
			</div>
		</div>
	</body>
</html>