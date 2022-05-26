﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/index.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>영역별 > 데이터영역 > <b>인덱스 추출</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>Loop에 대한 처리, 포커스 위치 등을 가져오거나 설정하고자 할 경우 유용하게 사용될 인덱스 추출과 관련된 기능을 알아봅시다.</blockquote>
							<h2> 데이터의 시작 및 마지막 인덱스 위치 관련 </h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalHeaderRows"><b>1. HeaderRows</b></a><br/>
							헤더영역의 행의 개수를 반환 하는 함수 입니다.<br/>
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										아이비시트에서의 index는 헤더영역과 데이터영역이 별도로 계산되어 지지 않습니다. 따라서 헤더영역의 행의 개수는 데이터영역의 시작행을 의미 합니다.<br/>
										일반적으로 데이터 첫번째 행의 위치를 가져올때 자주 사용되어지는 함수 입니다.
									</div>
								</div>
							</blockquote>
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetDataFirstRow"><b>2. GetDataFirstRow</b></a><br/>
							데이터 행의 시작 인덱스를 반환 합니다.<br/>
							만약 그리드 상단에 필터행, 합계행, 그룹행 등이 있을 경우 계산되지 않으며 데이터행이 존재하지 않는 경우 -1을 반환 합니다.
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.13.37 이후 버전에서 사용가능 합니다.
									</div>
								</div>
							</blockquote>
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalLastRow"><b>3. LastRow</b></a><br/>
							마지막 행 인덱스를 반환 합니다.
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetDataLastRow"><b>4. GetDataLastRow</b></a><br/>
							데이터 영역의 마지막 행 인덱스를 반환 합니다.<br/>
							만약 그리드 하단에 필터, 합계행 등이 있을 경우 인덱스에서 제외되며 데이터행의 존재하지 않는 경우 -1을환 합니다.
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.13.37 이후 버전에서 사용가능 합니다.
									</div>
								</div>
							</blockquote>
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalLastCol"><b>5. LastCol</b></a><br/>
							마지막 열의 인덱스를 반환 합니다.
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalRowCount"><b>6. RowCount</b></a><br/>
							전체 데이터의 행 개수를 반환 합니다.<br/>
							특정 상태(조회/입력/수정/삭제)값을 인자로 설정할 경우 해당 상태에 해당하는 행을 반환 합니다.
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetTotalRows"><b>7. GetTotalRows</b></a><br/>
							조회 조건에 따라 전체 조회해야 할 db의 레코드 건수를 확인 합니다.<br/>
							서버페이징 방식에서의 전체 데이터 건수를 확인하고자 할때 사용됩니다.
							</p>
						</div><br/>
						<header class="area-subtitle"> 
							<div class="fl">
								<h5 class="title-a">조회결과</h5>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" onclick="mySheetAction('reload')">초기화</button>
								<button class="btn-strong" onclick="mySheetAction('HeaderRows')">HeaderRows</button>
								<button class="btn-strong" onclick="mySheetAction('GetDataFirstRow')">GetDataFirstRow</button>
								<button class="btn-strong" onclick="mySheetAction('LastRow')">LastRow</button>
								<button class="btn-strong" onclick="mySheetAction('GetDataLastRow')">GetDataLastRow</button>
								<button class="btn-strong" onclick="mySheetAction('LastCol')">LastCol</button>
								<!-- <button class="btn-strong" onclick="mySheetAction('RowCount')">RowCount</button> -->
								<button class="btn-strong" onclick="mySheetAction('GetTotalRows')">GetTotalRows</button>
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
							<h2> 포커스 위치 관련 </h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetSelectRow"><b>1. GetSelectRow</b></a><br/>
							현재 선택된 셀의 행 Index를 확인하거나 설정합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetSelectCol"><b>2. GetSelectCol</b></a><br/>
							현재 선택된 셀의 컬럼 Index를 확인하거나 설정합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalMouseRow"><b>3. MouseRow</b></a><br/>
							마우스가 눌려졌을 때 선택된 행 번호를 반환하며, 데이터 영역이 아닌 경우는 –1을 반환합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalMouseCol"><b>4. MouseCol</b></a><br/>
							마우스가 눌려졌을 때 선택된 컬럼 번호를 반환하며 데이터 영역이 아닌 경우는 –1을 반환합니다.
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetSelectionRows"><b>5. GetSelectionRows</b></a><br/>
							사용자가 드레그를 통해 선택한 영역의 행을 구분자로 구분하여 반환합니다.
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetSelectionCols"><b>6. GetSelectionCols</b></a><br/>
							사용자가 드레그한 영역의 열을 구분자로 구분하여 반환합니다.
							</p>
						</div>
						<header class="area-subtitle"> 
 							<div class="fl">
								<h5 class="title-a">조회결과</h5>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" onclick="mySheet2Action('GetSelectRow')">GetSelectRow</button>
								<button class="btn-strong" onclick="mySheet2Action('GetSelectCol')">GetSelectCol</button>
								<button class="btn-strong" onclick="mySheet2Action('MouseRow')">MouseRow</button>
								<button class="btn-strong" onclick="mySheet2Action('MouseCol')">MouseCol</button>
								<button class="btn-strong" onclick="mySheet2Action('GetSelectionRows')">GetSelectionRows</button>
								<button class="btn-strong" onclick="mySheet2Action('GetSelectionCols')">GetSelectionCols</button> 
							</div>
						</header>
						<div class="area-panel">
							<div class="panel-ch">
								<div style="height:300px;">
									<div id="ibsheetArea2"></div>
								</div>
							</div>
						</div>
						<div class="entry-content">
							<h2> 기타 인덱스 추출 </h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetDataRows"><b>1. GetDataRows</b></a><br/>
							멀티라인 레코드(Or 다중라인레코드) 형태의 그리드인 경우 단위 데이터 행의 설정 개수 확인 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalSaveNameCol"><b>2. SaveNameCol</b></a><br/>
							SaveName에 해당하는 컬럼 인덱스를 반환 해주는 함수입니다. 만약 SaveName에 해당하는 컬럼이 존재하지 않는 경우 -1을 반환 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetTopRow"><b>3. GetTopRow</b></a><br/>
							가장 상단에 표시되어지고 있는 행의 인덱스를 반환 합니다.
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalGetLeftCol"><b>4. GetLeftCol</b></a><br/>
							가장 좌측에 표시되어지고 있는 열의 인덱스를 반환 합니다.
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalFilteredRowIndex"><b>5. FilteredRowIndex</b></a><br/>
							필터링되어있는 행의 인덱스를 반환 합니다.
							</p>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
		
	<!-- 1.1 myModalLabel -->
	<div class="modal fade" id="modalHeaderRows" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">HeaderRows</h4>
				</div>
				<div class="modal-body">
					<p>헤더행의 개수를 확인한다.<br/>
					이 속성은 InitHeaders() 함수를 통해서 설정된 헤더 행의 개수를 의미한다
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.HeaderRows()
	▶ Return
		- Long, 헤더행의 개수
	▶ Parameter
		- None
*/

//헤더 행의 개수를 확인한다.
Alert("헤더 행의 개수는 " + mySheet.HeaderRows() + "개 입니다.");
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
	
	
	<!-- 1.2 modalGetDataFirstRow -->
	<div class="modal fade" id="modalGetDataFirstRow" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetDataFirstRow</h4>
				</div>
				<div class="modal-body">
					<p>데이터 행의 시작 인덱스를 확인한다.<br/>
					헤더, 필터, 합계행은 인덱스에서 제외되며, 데이터행이 존재하지 않는 경우 -1을 반환한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetDataFirstRow()
	▶ Return
		- Number, 데이터행의 시작 인덱스 (Default=-1)
	▶ Parameter
		- None
*/

// 데이터행의 시작 인덱스를 확인한다.
var startRow = mySheet.GetDataFirstRow();.

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
	
	
	
	<!-- 1.3 modalLastRow -->
	<div class="modal fade" id="modalLastRow" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">LastRow</h4>
				</div>
				<div class="modal-body">
					<p>마지막 행의 index를 반환한다.<br/>
Mode 인자를 설정하지 않거나 0으로 설정하는 경우 데이터만의 마지막 행의 인덱스도 아니고, 화면에 보여지는 마지막 행의 인덱스도 아닌 마지막 행의 인덱스를 반환한다.<br/>
마지막 행은 합계 행일 수도 있고, 데이터 행일 수도 있고, 헤더 행일 수도 있으므로 주의 하여 사용한다.<br/>
화면에 보여지는 마지막 행의 인덱스를 반환받기 원하는 경우 Mode 인자를 1로 설정한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.LastRow([Mode=0])
	▶ Return
		- Long, 마지막행의 Index
	▶ Parameter
		- Mode(Inteager) : 마지막행 반환 모드
						0 : 마지막 행인덱스 반환 (기본값, 기존동일)
						1 : 현재 화면상의 마지막 행 Index 반환
*/

//마지막 행의 인덱스를 확인한다.
alert("마지막 행의 index는 " + mySheet.LastRow() + " 번 입니다.");

// 화면에 보여지는 마지막 행의 인덱스를 확인한다.
alert("화면상 마지막 행의 index는 " + mySheet.LastRow(1) + " 번 입니다.");

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
	
	
	
	<!-- 1.4 modalGetDataLastRow-->
	<div class="modal fade" id="modalGetDataLastRow" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetDataLastRow</h4>
				</div>
				<div class="modal-body">
					<p>데이터 행의 마지막 인덱스를 확인한다.<br/>
					헤더, 필터, 합계행은 인덱스에서 제외되며, 데이터행이 존재하지 않는 경우 -1을 반환한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetDataLastRow()
	▶ Return
		- Number, 데이터행의 마지막 인덱스 (Default=-1)
	▶ Parameter
		- None
*/

// 데이터행의 마지막 인덱스를 확인한다.
var lastRow = mySheet.GetDataLastRow();.

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


	<!-- 1.5 modalLastCol -->
	<div class="modal fade" id="modalLastCol" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">LastCol</h4>
				</div>
				<div class="modal-body">
					<p>마지막 컬럼의 index를 반환한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.LastCol()
	▶ Return
		- Long, 마지막 컬럼 인덱스
	▶ Parameter
		- None
*/

//마지막 컬럼의 index를 확인한다.
alert("마지막 컬럼의 index는 " + mySheet.LastCol() + " 번 입니다.");

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





	<!-- 1.6 modalRowCount -->
	<div class="modal fade" id="modalRowCount" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">RowCount</h4>
				</div>
				<div class="modal-body">
					<p>전체 데이터 행 개수를 확인한다.<br/>
Status 값을 설정하지 않은 경우 조회된 데이터 행 개수와 신규 입력된 행까지 포함한 전체 데이터 행 개수를 확인한다.<br/> 
Status 값에 따라 조회/입력/수정/삭제 각 상태의 행 개수를 확인 할 수 있다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.RowCount([Status])
	▶ Return
		- Long, 전체 또는 특정 트랜잭션 상태의 데이터행 개수
	▶ Parameter
		- Status(String) : 트랜잭션 코드. Default="전체건수"
*/

alert("전체 건수 는 " + mySheet.RowCount() + " 건입니다. ");
alert("조회 건수 는 " + mySheet.RowCount("R") + " 건입니다. ");
alert("입력 건수 는 " + mySheet.RowCount("I") + " 건입니다. ");
alert("수정 건수 는 " + mySheet.RowCount("U") + " 건입니다. ");
alert("삭제 건수 는 " + mySheet.RowCount("D") + " 건입니다. ");

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




	<!-- 1.7 modalGetTotalRows -->
	<div class="modal fade" id="modalGetTotalRows" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetTotalRows</h4>
				</div>
				<div class="modal-body">
					<p>조회 조건에 따라 전체 조회해야 할 DB의 레코드 건수를 확인한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetTotalRows()
	▶ Return
		- Long, 현재 설정된 값 (Get Method 인 경우)
	▶ Parameter
		- None
*/

//전체 데이터 건수를 확인한다.
alert("전체 데이터 건수는 " + mySheet.GetTotalRows() + "입니다. ");

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
	

	<!-- 2.1 modalGetSelectRow -->
	<div class="modal fade" id="modalGetSelectRow" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetSelectRow</h4>
				</div>
				<div class="modal-body">
					<p>현재 선택된 셀의 행 Index를 확인한다.
					SelectCol 속성과 함께 사용하며, 두 속성을 모두 사용한 SelectCell 함수를 이용할 수 있다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetSelectRow()
	▶ Return
		- Long, 현재 선택된 행 Index (Get Method 인 경우)
	▶ Parameter
		- None
*/

//선택된 행을 확인한다.
alert(mySheet.GetSelectRow());

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
	
	
	
	<!-- 2.2 #modalGetSelectCol -->
	<div class="modal fade" id="modalGetSelectCol" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetSelectCol</h4>
				</div>
				<div class="modal-body">
					<p>현재 선택된 셀의 컬럼 Index를 확인하거나 설정한다.
SelectRow 속성과 함께 사용하며, 두 속성을 모두 사용한 SelectCell 함수를 이용할 수 있다.
2개행 이상의 단위데이터행 구조에서 Col 인자에 Index를 설정할 경우 모든행에 대해서 처리를 하고 SaveName으로 설정할 경우 해당 SaveName이 포함된 행에 대해서만 처리 한다.

						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetSelectCol()
	▶ Return
		- Number, 현재 선택된 컬럼 Index (Get Method 인 경우)
	▶ Parameter
		- None
*/

//선택된 컬럼을 확인한다.
alert(mySheet.GetSelectCol());

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
	
	
	<!-- 2.3 modalMouseRow-->
	<div class="modal fade" id="modalMouseRow" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">MouseRow</h4>
				</div>
				<div class="modal-body">
					<p>마우스가 눌려졌을 때 선택된 행 번호를 반환한다. 데이터 영역이 아닌 경우는 –1을 반환한다.<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.MouseRow()
	▶ Return
		- Long, 마우스포인터가 있는 셀의 행 Index
	▶ Parameter
		- None
*/

//마우스가 눌러졌을 때 행 번호를 가져온다.
function mySheet_OnMouseDown(Button, Shift, X, Y){

//눌린 행 확인
	alert(mySheet.MouseRow() + "행이 눌림");
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
	
	
	<!-- 2.4 #modalMouseCol-->
	<div class="modal fade" id="modalMouseCol" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">MouseCol</h4>
				</div>
				<div class="modal-body">
					<p>마우스가 눌려졌을 때 선택된 컬럼 번호를 반환한다. 데이터 영역이 아닌 경우는 –1을 반환한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.MouseCol()
	▶ Return
		- Long, 마우스위치가 있는 컬럼 인덱스
	▶ Parameter
		- None
*/

// 마우스가 눌러졌을 때 컬럼 번호를 가져온다.
function mySheet_OnMouseDown(Button, Shift, X, Y) {
	// 눌린 컬럼 확인
	alert(mySheet.MouseRow() + "행 " + mySheet.MouseCol() + "컬럼이 눌림");
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
	
	<!-- 2.5 GetSelectionRows -->
	<div class="modal fade" id="modalGetSelectionRows" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetSelectionRows</h4>
				</div>
				<div class="modal-body">
					<p>사용자가 드레그를 통해 선택한 영역의 행을 구분자로 구분하여 반환한다.<br/>
					구분자를 설정하지 않으면 기본적으로 "|"로 묶어서 반환한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetSelectionRows([DeliChar])
	▶ Return
		- String, 선택되어있는 행번 조합 문자열
	▶ Parameter
		- DeliChar(String) : 조합구분자, Default="|"
*/

//"/" 구분자로 연결하여 선택된 행번 가져오기
var sRowStr = mySheet.GetSelectionRows("/");

//자바 스크립트 배열로 만들기
var arr = sRowStr.split("/");
for (i=0; i &lt; arr.length(); i++) {
	alert(arr[i] + " 행이 선택되었음");
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
	
	<!-- 2.6 #modalGetSelectionCols-->
	<div class="modal fade" id="modalGetSelectionCols" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetSelectionCols</h4>
				</div>
				<div class="modal-body">
					<p>사용자가 드레그한 영역의 열을 구분자로 구분하여 반환한다.<br/>
					구분자를 설정하지 않으면 기본적으로 "|"로 묶어서 반환한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetSelectionCols([DeliChar])
	▶ Return
		- String, 선택되어있는 행번 조합 문자열
	▶ Parameter
		- DeliChar(String) : 선택되어있는 행번 조합 문자열
*/

// 구분자로 연결하여 선택된 열번 가져오기
var sColStr = mySheet.GetSelectionCols("/");

//자바 스크립트 배열로 만들기
var arr = sColStr.split("/");
for (i=0; i&lt;arr.length(); i+=1) {
	alert(arr[i] + " 컬럼이 선택되었음");
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
	
	
	
	<!-- 3.1 #modalGetDataRows -->
	<div class="modal fade" id="modalGetDataRows" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetDataRows</h4>
				</div>
				<div class="modal-body">
					<p>단위 데이터 행의 설정 개수를 확인 한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetDataRows()
	▶ Return
		- Integer, 설정 되어 있는 단위 데이터 행의 개수
	▶ Parameter
		- None
*/

// 단위데이터행의 개수를 확인한다.
var dataRows = mySheet.GetDataRows();.

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
	
	<!-- 3.2 modalSaveNameCol -->
	<div class="modal fade" id="modalSaveNameCol" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">SaveNameCol</h4>
				</div>
				<div class="modal-body">
					<p>InitColumns에서 설정된 SaveName을 이용하여 해당하는 컬럼 번호를 확인한다. SaveName에 해당하는 컬럼이 존재하지 않는 경우 –1을 반환한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.SaveNameCol(SaveName)
	▶ Return
		- Long, 컬럼의 Index
	▶ Parameter
		- *SaveName(String) : SaveName명
*/

// stockNm이라고 설정된 SaveName의 컬럼 인덱스를 반환 함
var Col = mySheet.SaveNameCol("stockNm");
 
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
	
	
	
	<!-- 3.3 #modalGetTopRow-->
	<div class="modal fade" id="modalSetRangeValue" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetTopRow</h4>
				</div>
				<div class="modal-body">
					<p>최상단의 행 번호를 확인한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetTopRow()
	▶ Return
		- Long, 최상단의 행 번호 (Get Method 인 경우)
	▶ Parameter
		- None
*/

//최상단 행 번호를 확인한다.
mySheet.GetTopRow();

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
	
	<!-- 3.4 modalGetLeftCol -->
	<div class="modal fade" id="modalGetLeftCol" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">GetLeftCol</h4>
				</div>
				<div class="modal-body">
					<p>가장 좌측에 표시되는 컬럼을 확인한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetLeftCol()
	▶ Return
		- Long, 가장좌측 끝 컬럼 인덱스 (Get Method 인 경우) 
	▶ Parameter
		- None
*/

//컬럼으로 설정됨을 확인
mySheet.GetLeftCol();

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
	
	<!-- 3.5 modalFilteredRowIndex -->
	<div class="modal fade" id="modalFilteredRowIndex" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">FilteredRowIndex</h4>
				</div>
				<div class="modal-body">
					<p>필터행이 있는 경우 필터가 적용되어 있으면 필터링 된 행의 인덱스를, 필터가 적용되어 있지 않으면 전체 행의 인덱스를 배열로 반환한다.
						<div class="form-group">
<!-- 							<label class="label-control">Datetime Picker</label>
							<input type="text" class="form-control datetimepicker" value="10/05/2016"> -->
							<!-- <span class="material-input"></span> -->
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.FilteredRowIndex()
	▶ Return
		- Array. 필터링 된 행의 인덱스 배열
	▶ Parameter
		- None
*/

//필터링 된 행 인덱스 배열을 가져온다.
alert(mySheet.FilteredRowIndex ());
 

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