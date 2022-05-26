﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/getdata.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>영역별 > 데이터영역 > <b>데이터 조작 </b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote> 그리드에서 값을 추출하는 여러가지 방법에 대하여 알아보겠습니다.</blockquote>
							<h2> 그리드 값 추출하기 </h2>
							<p>그리드에서 제공하고 있는 다양한 함수를 통하여 데이터를 추출할 수 있습니다. 관련된 함수는 아래와 같습니다.</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetCellValue"><b>1. GetCellValue</b></a><br/>
							셀 단위로 값을 추출합니다.</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetRangeValue"><b>2. GetRangeValue</b></a><br/>
							특정 범위의 셀 값을 추출 합니다.</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetRowData"><b>3. GetRowData</b></a><br/>
							행 단위로 값을 추출 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalExportData"><b>4-1. ExportData</b></a><br/>
							시트내의 데이터를 json, xml, csv 형식으로 추출 합니다. 옵션을 통해 지정한 컬럼만 추출할 수 있습니다.
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.13.21 이후 버전에서 사용가능 합니다.<br/>
										- 7.0.13.44 (FormattedText , StyleProperty 추가) 
									</div>
								</div>
							</blockquote>
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetSaveJson"><b>4-2. GetSaveJson("all")</b></a><br/>
							서버쪽에 저장할 데이터를 추출하는 함수로 사용되지만 인자값이 "all"인 경우 전체 데이터 행을 json객체로 반환 합니다.
							</p>
						</div>
						<header class="area-subtitle"> 
							<div class="fl">
								<h5 class="title-a">조회결과</h5>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" onclick="doAction('getCellValue')">GetCellValue</button>
								<button class="btn-strong" onclick="doAction('getRangeValue')">GetRangeValue</button>
								<button class="btn-strong" onclick="doAction('getRowData')">GetRowData</button>
								<button class="btn-strong" onclick="doAction('exportData_json')">ExportData(json)</button>
								<button class="btn-strong" onclick="doAction('exportData_csv')">ExportData(csv)</button>
								<button class="btn-strong" onclick="doAction('getSaveJson')">GetSaveJson("all")</button>
							</div>
						</header>
						<div class="area-panel"  style="height: calc(100% - 580px);">
							<div class="panel-ch">
								<!-- class="sheetSec"  -->
								<div style="height:100%;">
									<div id="ibsheetArea"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
		
	<!-- myModalLabel -->
	<div class="modal fade" id="modalGetCellValue" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetCellValue</h4>
				</div>
				<div class="modal-body">
					<p>셀에 값을 설정하거나 확인한다.<br/>
					이때 셀의 값은 Format이 적용안된 실제로 서버에 저장되는 값을 의미 한다. 
						<div class="form-group">
<!-- 							<label class="label-control">Datetime Picker</label>
							<input type="text" class="form-control datetimepicker" value="10/05/2016"> -->
							<!-- <span class="material-input"></span> -->
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetCellValue(Row, Col)
	▶ Return
		- String, 셀에 설정된 값 (Get Method 인 경우)
	▶ Parameter
		- *Row(Long) : 해당 셀의 Row Index
		- *Col(Long /String) : 해당 셀의 Column Index 또는 SaveName
*/

//첫번째행, 네번째열 셀의 값 확인
mySheet.GetCellValue(1, 4); 
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
	<div class="modal fade" id="modalGetRangeValue" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetRangeValue</h4>
				</div>
				<div class="modal-body">
					<p>특정 영역의 셀값을 Format이 적용되지 않은 실제로 저장 시 사용하는 값으로 확인하고, 설정한다.
					그 영역이 데이터 영역이든 헤더 영역이든 셀의 값을 설정하거나 확인할 수 있으며, 영역이 헤더와 데이터 영역을 벗어나는 경우
					에러메시지 없이 문자열 설정은 취소되고, 확인 시 0을 반환된다.<br/>
						<div class="form-group">
<!-- 							<label class="label-control">Datetime Picker</label>
							<input type="text" class="form-control datetimepicker" value="10/05/2016"> -->
							<!-- <span class="material-input"></span> -->
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetRangeValue(Row1, Col1, Row2, Col2, [ColSeparator], [RowSeparator])
	▶ Return
		- String, 현재 문자열값(Get Method 인 경우)
	▶ Parameter
		- *Row1(Long) : 범위 시작 셀의 Row Index
		- *Col1(Long) : 범위 시작 셀의 Column Index
		- *Row2(Long) : 범위 종료 셀의 Row Index
		- *Col2(Long) : 범위 종료 셀의 Column Index
		- ColSeparator(String) : 컬럼과 컬럼 사이를 구분하는 구분자. Default=|
		- RowSeparator(String) : 행과 행 사이를 구분하는 구분자. Default=^
	▶ Example
		- // 특정 영역의 셀값을 Format이 적용되지 않은 실제로 저장 시 사용하는 값으로 확인한다.
		  mySheet.GetRangeValue("A|B^C|D", 1, 1, 2, 2, "|", "^");
*/

//첫번째행, 네번째열 셀의 값 확인
mySheet.GetCellValue(1, 4); 
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
	<div class="modal fade" id="modalGetRowData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetRowData</h4>
				</div>
				<div class="modal-body">
					<p>행의 데이터를 각 컬럼의 SaveName을 이용하여 Json 객체로 생성하여 반환하거나 설정한다. 
						2개행 이상의 단위데이터행 구조인 경우 단위데이터행 전체를 반환하거나 설정한다.
						<div class="form-group">
<!-- 							<label class="label-control">Datetime Picker</label>
							<input type="text" class="form-control datetimepicker" value="10/05/2016"> -->
							<!-- <span class="material-input"></span> -->
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetRowData(Row)
	▶ Return
		- Object, 해당 행의 데이터 객체
	▶ Parameter
		- *Row(Number) : 대상 행의 Index
*/

// 1행의 Json 객체를 가져온다.
var rowJosn = mySheet.GetRowData(1);
 

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
	<div class="modal fade" id="modalExportData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">ExportData</h4>
				</div>
				<div class="modal-body">
					<p>시트내의 데이터를 json,xml,csv 형식으로 추출한다.
					옵션을 통해 지정한 컬럼만 추출도 가능하다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetCellValue(Row, Col)
	▶ Return
		- String, 셀에 설정된 값 (Get Method 인 경우)
	▶ Parameter
		- *Row(Long) : 해당 셀의 Row Index
		- *Col(Long /String) : 해당 셀의 Column Index 또는 SaveName
*/

//첫번째행, 네번째열 셀의 값 확인
mySheet.GetCellValue(1, 4); 
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
	<div class="modal fade" id="modalGetSaveJson" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetCellValue</h4>
				</div>
				<div class="modal-body">
					<p>셀에 값을 설정하거나 확인한다.<br/>
					이때 셀의 값은 Format이 적용안된 실제로 서버에 저장되는 값을 의미 한다. 
						<div class="form-group">
<!-- 							<label class="label-control">Datetime Picker</label>
							<input type="text" class="form-control datetimepicker" value="10/05/2016"> -->
							<!-- <span class="material-input"></span> -->
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetCellValue(Row, Col)
	▶ Return
		- String, 셀에 설정된 값 (Get Method 인 경우)
	▶ Parameter
		- *Row(Long) : 해당 셀의 Row Index
		- *Col(Long /String) : 해당 셀의 Column Index 또는 SaveName
*/

//첫번째행, 네번째열 셀의 값 확인
mySheet.GetCellValue(1, 4); 
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