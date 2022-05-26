﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/setdata.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<header class="wrap-mainheader">
					<h4>영역별 > 데이터영역 > <b>값 설정하기</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>그리드에서 값을 추출했던것과 마찬가지로 값을 설정하는것 또한 다양한 함수 및 방법을 제공하고 있습니다.</blockquote>
							<h2> 영역 별로 그리드 값 설정하기 </h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalSetCellValue"><b>1. SetCellValue</b></a><br/>
							셀 단위로 값을 설정 합니다.</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalSetRangeValue"><b>2. SetRangeValue</b></a><br/>
							특정 영역 단위로 값을 설정 합니다.</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalSetRowData"><b>3. SetRowData</b></a><br/>
							행 단위로 값을 설정 합니다.
							</p>
						</div><br/>
						<header class="area-subtitle"> 
							<div class="fl">
								<h5 class="title-a">조회결과</h5>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" onclick="doAction('reload')">초기화</button>
								<button class="btn-strong" onclick="doAction('setCellValue')">선택한 셀 단위 값 변경</button>
								<button class="btn-strong" onclick="doAction('setRowData')">선택한 행 단위 값 변경</button> 
								<!-- <button class="btn-strong" onclick="doAction('getRangeValue')">SetRangeValue</button> -->
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
							<h2> 전체 데이터 로드 </h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalLoadSearchData"><b>4. LoadSearchData</b></a><br/>
							Json 또는 Xml 데이터 구조를 인자로 전달하여 시트에 데이터를 로드 합니다
						</div>
						<header class="area-subtitle"> 
							<div class="fl">
								<h5 class="title-a">조회결과</h5>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" onclick="doAction('loadSearchData1')">데이터로드1</button>
								<button class="btn-strong" onclick="doAction('loadSearchData2')">데이터로드2</button>
								<button class="btn-strong" onclick="doAction('loadSearchData3')">데이터로드3</button> 
								<!-- <button class="btn-strong" onclick="doAction('getRangeValue')">SetRangeValue</button> -->
							</div>
						</header>
						<div class="area-panel">
							<div class="panel-ch">
								<div style="height:300px;">
									<div id="ibsheetArea2"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
		
	<!-- myModalLabel -->
	<div class="modal fade" id="modalSetCellValue" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">SetCellValue</h4>
				</div>
				<div class="modal-body">
					<p>셀에 값을 설정한다.<br/>
						<div class="form-group">
<!-- 							<label class="label-control">Datetime Picker</label>
							<input type="text" class="form-control datetimepicker" value="10/05/2016"> -->
							<!-- <span class="material-input"></span> -->
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.SetCellValue(Row, Col, Value, [Opt])
	▶ Return
		- None
	▶ Parameter
		- *Row(Long) : 해당 셀의 Row Index
		- *Col(Long /String) : 해당 셀의 Column Index 또는 SaveName
		- *Value(String) : 셀에 설정할 값
		- Opt.event(Boolean) : OnChange 이벤트 발생 여부(default : 1)
		- Opt.endEdit(Boolean) : 편집 종료 여부(default : 1)
		- Opt.nocalc(Boolean) : 소계/누계/합계 재계산 여부(default : 0)
*/

//상태 셀을 "삭제" 상태로 설정
mySheet.SetCellValue(1, 0, "D");

//CheckBox에 체크되도록 설정
mySheet.SetCellValue(1, 1, 1); 

//숫자 셀에 값 설정, 표시되는 값은 12,345임
mySheet.SetCellValue(1, 2, 12345);

//콤보 셀에 값 설정, 표시되는 값은 콤보 텍스트 임
mySheet.SetCellValue(1, 3, "01"); 

//날짜 셀에 값 설정, 표시되는 값은 "2011/07/15" 임
mySheet.SetCellValue(1, 4, "2011/07/15");

//소수점 숫자 셀에 값 설정, 소수점 3자리이면 표시되는 값은 123.450 임
// OnChange 이벤트 발생
mySheet.SetCellValue(1,5, 123.450);

// OnChange 이벤트 발생하지 않음 
mySheet.SetCellValue(1,5, 123.450, 0); 
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
	
	
	<!-- modalGetRangeValue -->
	<div class="modal fade" id="modalSetRangeValue" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">SetRangeValue</h4>
				</div>
				<div class="modal-body">
					<p>특정 영역의 셀 값을 설정 한다.<br/>
						<div class="form-group">
<!-- 							<label class="label-control">Datetime Picker</label>
							<input type="text" class="form-control datetimepicker" value="10/05/2016"> -->
							<!-- <span class="material-input"></span> -->
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.SetRangeValue(sData, Row1, Col1, Row2, Col2, [ColSeparator],[RowSeparator])
	▶ Return
		- None
	▶ Parameter
		- *sData(String) : 문자열
		- *Row1(Long) : 범위 시작 셀의 Row Index
		- *Col1(Long) : 범위 시작 셀의 Column Index
		- *Row2(Long) : 범위 종료 셀의 Row Index
		- *Col2(Long) : 범위 종료 셀의 Column Index
		- ColSeparator(String) : 컬럼과 컬럼 사이를 구분하는 구분자. Default=|
		- RowSeparator(String) : 행과 행 사이를 구분하는 구분자. Default=^
*/

//1,1 셀에 A 를 2,2셀에 D를 설정한다.
mySheet.SetRangeValue("A|B^C|D", 1, 1, 2, 2, "|", "^");

//1,7 셀부터 5,10 셀까지 ** 로 설정한다.
mySheet.SetRangeValue("**", 1, 7, 5, 10);
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
	
	<!-- myModalLabel -->
	<div class="modal fade" id="modalSetRowData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">SetRowData</h4>
				</div>
				<div class="modal-body">
					<p>행단위로 데이터 값을 설정한다. 
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.SetRowData(Row, Data, Opt)
	▶ Return
		- Object, 해당 행의 데이터 객체
	▶ Parameter
		- *Row(Number) : 대상 행의 Index
		- *Data(Object/String) : Json형태의 행 데이터 및 문자열
		- Opt.Add(Boolean) : 행 추가 여부(Default : 0)
		- Opt.Level(Number) : 트리 레벨 값
		- Opt.Event(Boolean) : 값 변경시 OnChange이벤트 발생 여부(Default : 1)
		- Opt.StatusMode(Number)
			: 상태값 처리 모드 (Default : 1)
			0 : 대상 행의 상태값을 변경하지 않음
			1 : 인자의 상태값을 무시하고 대상 행의 데이터 변경에 따른 상태값 처리
			2 : 인자의 상태값을 그대로 적용
*/

// 1행을 해당 Json 객체로 설정한다.
var data = {sName:"홍길동", sAge:20};
mySheet.SetRowData(1, data);

// 1행의 데이터를 2행에 적용
mySheet.SetRowData(2, mySheet.GetRowData(1));
 

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
	
	<!-- myModalLabel -->
	<div class="modal fade" id="modalLoadSearchData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">asd</h4>
				</div>
				<div class="modal-body">
					<p>조회 데이터(xml or json)를 함수의 인자로 전달 받아 아이비시트에 로딩한다.
조회 데이터는 GetSearchData 함수나 혹은 별도의 ajax 모듈을 통해 서버로부터 가져올 수 있고, 가져온 데이터 문자열을 이 함수의 인자로 설정하면 조회 데이터를 아이비시트에 로딩하고, OnSearchEnd 이벤트를 발생한다.
기본적으로 이 함수가 호출되면 기존 데이터는 지워지고 Content데이터가 로딩된다.
하지만 Append 인자를 사용하는 경우, 기존데이터를 맨 아래 행에 Content데이터를 붙여넣는다.
Fx 인자는 컬럼의 타입에 따라 사용할 수 있는 포멧 유형을 제한하고 대신 조회속도를 향상 시킨다. Fx에서 사용할 수 있는 포멧 형식에 관한 자세한 내용은 이 메뉴얼 마지막 장 Appendix 부분에 설명되어 있다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.LoadSearchData(Content, [Opt])
	▶ Return
		- None
	▶ Parameter
		- *Content(String) : 조회XML 또는 조회JSON 문자열
		- Opt.Append(Boolean) : Append조회 여부(Default : 0)
		- Opt.AppendRow(Number) : Append조회 시 데이터를 붙여 넣을 위치 지정
		- Opt.CallBack(Function) : CallBack함수
		- Opt.Event(Boolean) : 완료 이벤트 발생 여부(Default : 1)
		- Opt.Fx(Boolean) : 포멧팅된 데이터 조회 처리 여부(Default : 0)
		- Opt.Sync(Boolean) : 동기 조회 여부(Default : 0)
		- Opt.Wait(Boolean) : 대기 이미지 표시 여부. 동기조회인 경우 옵션과 상관없이 표시x(Default : 1)
*/

//1. 조회된 데이터가 없음을 로딩
var data = {Data:[]};
mySheet.LoadSearchData(data);

//2. 서버로부터 데이터를 가져와 로딩
//조회 데이터 읽어오기
var sXml = mySheet.GetSearchData(" list.jsp","sa_nm=chris&sa_no=2007128");

//조회 결과 내용을 표현하기
mySheet.LoadSearchData(sXml);

// 조회 결과 내용을 기존데이터에 Append 하여 표현하기
var opt = { Append : 1 };
mySheet.LoadSearchData(sXml, opt);
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