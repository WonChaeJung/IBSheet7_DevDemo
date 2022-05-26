﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/col_unit.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>영역별 > 데이터영역 > <b>열 단위 컨트롤</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>열 단위로 컨트롤할 수 있는 다양한 api들에 대해서 알아보겠습니다.
							</blockquote>
							<h2>열 추가 및 삭제</h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalColInsert"><b>1. ColInsert</b></a><br/>
							특정 위치에 컬럼을 생성 합니다.
							</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalColDelete"><b>2. ColDelete</b></a><br/>
							특정 컬럼을 삭제 합니다.</p>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload', 'mySheet')">초기화</button>
									<button class="btn-strong" onclick="doAction('insert', 'mySheet')">열 추가</button>
									<button class="btn-strong" onclick="doAction('delete', 'mySheet')">열 삭제</button>
									<button class="btn-strong" onclick="doAction('deleteAll', 'mySheet')">신규로 추가한 열 삭제</button>  
								</div>
							</header>
							<div class="area-panel">
								<div class="panel-ch">
									<div style="height:300px;">
										<div id="ibsheetArea"></div>
									</div>
								</div>
							</div>
						</div>
						
						<div class="entry-content">
							<h2>열 숨김</h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalColHidden"><b>3. SetColHidden</b></a><br/>
							열의 숨기여부를 설정하거나 확인한다.
							</p>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload', 'mySheet2')">초기화</button>
									<button class="btn-strong" onclick="doAction('colHidden', 'mySheet2')">선택 열 숨김</button>
									<button class="btn-strong" onclick="doAction('hiddenCancel', 'mySheet2')">숨김 취소</button> 
								</div>
							</header>
							<div class="area-panel">
								<div class="panel-ch">
									<!-- class="sheetSec"  -->
									<div style="height:300px;">
										<div id="ibsheetArea2"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="entry-content">
							<h2>열 편집 여부</h2>	
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalSetColEditable"><b>4. SetColEditable</b></a><br/>
							동적으로 행 편집 가능여부를 변경 합니다.
							</p>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload', 'mySheet3')">초기화</button>
									<button class="btn-strong" onclick="doAction('editable1', 'mySheet3')">선택행 편집 불가</button>
									<button class="btn-strong" onclick="doAction('editable2', 'mySheet3')">선택행 편집 가능</button> 
								</div>
							</header>
							<div class="area-panel">
								<div class="panel-ch">
									<div style="height:300px;">
										<div id="ibsheetArea3"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="entry-content">
							<h2>열 스타일 관련</h2>	
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalColWidth"><b>5. ColWidth</b></a><br/>
							특정 열 너비를 설정 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalColFontColor"><b>6. ColFontColor</b></a><br/>
							특정 열의 폰트 색상을 설정 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalColFontBold"><b>7. ColFontBold</b></a><br/>
							특정 열의 폰트 굵기를 설정 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalColBackColor"><b>8. ColBackColor</b></a><br/>
							특정 열의 배경 색상을 설정 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalColFontUnderline"><b>9. ColFontUnderline</b></a><br/>
							특정 열의 폰트 취소선을 설정 합니다.
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload', 'mySheet4')">초기화</button>
									<button class="btn-strong" onclick="doAction('setColWidth', 'mySheet4')">열 너비 변경</button>
									<button class="btn-strong" onclick="doAction('setColFontColor', 'mySheet4')">선택열 폰트색상 변경</button>
									<button class="btn-strong" onclick="doAction('setColFontBold', 'mySheet4')">선택열 폰트 굵기 설정</button>
									<button class="btn-strong" onclick="doAction('setColBackColor', 'mySheet4')">선택열 배경색상 변경</button>
									<button class="btn-strong" onclick="doAction('setColFontUnderline', 'mySheet4')">선택열 폰트 밑줄 설정</button>
								</div>
							</header>
							<div class="area-panel">
								<div class="panel-ch">
									<!-- class="sheetSec"  -->
									<div style="height:300px;">
										<div id="ibsheetArea4"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="entry-content">
							<h2>열 이동</h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalMoveColumnPos"><b>10. MoveColumnPos</b></a><br/>
							특정 컬럼을 새로운 컬럼 위치로 이동 시킵니다.
							<blockquote id="ib-quote">
								<div class="ib-indent">
									<div class="ib-paragraph">
										- 7.0.13.117 이후 버전부터 다중 컬럼 이동 지원 기능을 제공 합니다.
									</div>
								</div>
							</blockquote>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalColLeft"><b>11. ColLeft</b></a><br/>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload', 'mySheet5')">초기화</button>
									<button class="btn-strong" onclick="doAction('dataMoveLeft', 'mySheet5')">컬럼 왼쪽 이동</button>
									<button class="btn-strong" onclick="doAction('dataMoveRight', 'mySheet5')">컬럼 오른쪽 이동</button>
								</div>
							</header>
							<div class="area-panel">
								<div class="panel-ch">
									<!-- class="sheetSec"  -->
									<div style="height:300px;">
										<div id="ibsheetArea5"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
		
	<!-- 1 modalColInsert -->
	<div class="modal fade" id="modalColInsert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">ColInsert</h4>
				</div>
				<div class="modal-body">
					<p>특정 위치에 컬럼을 생성 한다.
					생성위치(Pos)를 설정한 경우 해당 위치에 생성하고 설정하지 않은 경우 마지막 위치에 생성 한다.
					컬럼타입이 Seq, Status, DelCheck인 컬럼은 생성이 불가능 하며 컬럼생성시 CalcLogic 속성은 사용이 불가능 하다.
					생성할 컬럼의 설정 속성 집합 객체는 InitColumns Method의 내용을 참조 한다.<br/>
					컬럼의 설정 속성을 설정하지 않은 경우 "Text" 타입의 컬럼으로 생성 한다.
					<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.ColInsert([Info])
	▶ Return
		- None
	▶ Parameter
		- Info.Pos(Number /String) : 생성할 위치의 컬럼 Index 또는 SaveName (Default : 마지막 컬럼)
		- Info.Header.Text(String) : 헤더에 설정할 문자열 (헤더가 2줄이상인 경우 구분자 "|"로 연결한 문자열로 설정) (Default : "") 
		- Info.Header.Align(String) : 헤더 문자열의 정렬값(Default : "Center")
		- Info.Col(Object) : 생성할 컬럼의 설정 속성 집합 객체
*/
// 마지막 위치에 기본("Text" 컬럼타입) 컬럼을 생성 한다.
var info = {
	Header : {Text : "기본타입"}
};

mySheet.ColInsert(info);
	// Index 3의 위치에 "CheckBox" 타입의 컬럼을 생성 한다.
	var info = {
	Pos:3,
	Header:{Text: "체크박스",Align: "Left"},
	Col:[{
		Type: "CheckBox",
		Width:60,
		SaveName: "sCheckBox"
	}]
};

mySheet.ColInsert(info);
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
	
	
	<!-- 2 modalColInsert -->
	<div class="modal fade" id="modalColDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">ColDelete</h4>
				</div>
				<div class="modal-body">
					<p>특정 컬럼을 삭제 한다.
						Col 인자를 설정하지 않는 경우 마지막 컬럼을 삭제 한다.
						아래과 같은 조건에 해당하는 컬럼을 삭제가 불가능 하다.
						ü		컬럼 타입이 Seq, Status, DelCheck 인 경우
						ü		타 컬럼의 계산식(CalcLogic)에 사용되는 컬럼인 경우
						ü		트리 기준 컬럼(TreeCol 속성 설정이 있는 컬럼)인 경우
						ü		단위데이터행 구조의 FixedMerge에 포함된 컬럼인 경우
					<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.RowDelete([Row],[Confirm])
	▶ Return
		- None
	▶ Parameter
		- Row(Number/String) : 삭제할 Row Index 또는
		  Row Index를 "|"구분자로 연결한 문자열 (Default : "현재 선택 행")
		- Confirm(Boolean) : 삭제 전 메시지 표시 여부  (Default : 0)
*/

//확인 메시지 없이 1행 삭제하기
mySheet.RowDelete(1, 0);

// 3, 7, 10번 행 삭제하기
mySheet.RowDelete("3|7|10");

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
	
	
	
	<!-- 3. modalColHidden -->
	<div class="modal fade" id="modalColHidden" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">SetColHidden</h4>
				</div>
				<div class="modal-body">
					<p>컬럼의 숨김여부를 설정 한다.<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.SetColHidden(info)
	▶ Return
		- None
	▶ Parameter
		- *info.Col(Long, String) : 특정 컬럼의 Index 또는 SaveName
		- *info.Hidden(Boolean) : 숨김 여부
		
*/

// 컬럼이 숨겨진 여부를 확인하여 숨겨진 경우 표시되도록 설정한다.
if (mySheet.GetColHidden(1) == 1) {
	mySheet.SetColHidden(1, 0);
}

// index 가 3, 6, 7 컬럼에 대한 숨김 처리
mySheet.SetColHidden([
	{Col: 3, Hidden:1},
	{Col: 6, Hidden:1},
	{Col: 7, Hidden:1}
]);

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
	
	<!-- 4. #modalSetColEditable-->
	<div class="modal fade" id="modalSetColEditable" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">SetColEditable</h4>
				</div>
				<div class="modal-body">
					<p>특정 컬럼의 Edit 가능 여부를 설정한다<br/>
					특정 컬럼의 Edit 가능 여부는 전체 Edit 가능 여부가 가능일 때 변경 가능하다.<br/>
					단, ColEditable 설정값이 불가인 경우는 RowEditable 설정이 무시된다.<br/>
					특정 컬럼의 Edit 가능 여부는 다음과 같이 결정된다.<br/>
					
					
						<div class="form-group">
<pre>
<code class="language-javascript">/**
/**
	▶ Syntax
		- ObjId.SetColEditable(Col, Editable)
	▶ Return
		- None
	▶ Parameter
		- *Col(Long /String) : 특정 컬럼의 Index 혹은 SaveName
		- Editable(Boolean) : 특정컬럼의 Edit 가능 여부(Set일때만 사용)
*/

//5컬럼의 Edit 가능 여부를 불가로 설정한다.
mySheet.SetColEditable(5,0);

//5컬럼의 Edit 가능 여부를 가능으로 설정한다.
mySheet. SetColEditable (5,1);

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
	
	
	
	<!-- 5. modalColWidth -->
	<div class="modal fade" id="modalColWidth" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">SetColWidth</h4>
				</div>
				<div class="modal-body">
					<p>특정 컬럼의 너비를 설정한다.<br/>
						픽셀 단위의 너비를 설정할 수 있고, 값을 0으로 설정하면 해당 컬럼 내의 Text 중<br/>
						가장 긴 값에 맞게 너비를 자동 조정한다.
						컬럼이 존재하지 않는 경우 에러메시지는 표시하지 않지만 처리는 취소된다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
/**
	▶ Syntax
		- ObjId.SetColWidth(Col, Width)
	▶ Return
		- None
	▶ Parameter
		- *Col(Long/String) : 특정 컬럼의 Index 또는 SaveName
		- *Width(Integer) : 데이터열의 너비 픽셀 값
*/

//50 픽셀로 너비 수정
mySheet.SetColWidth(1, 50);

//컬럼 내의 최대 글자 너비로 자동 변경
mySheet.SetColWidth(2, 0);

//3컬럼의 너비를 2컬럼의 너비와 동일하게 변경
mySheet.SetColWidth(3, mySheet.GetColWidth(2));

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



	<!-- 6. modalColFontColor -->
	<div class="modal fade" id="modalColFontColor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">ColFontColor</h4>
				</div>
				<div class="modal-body">
					<p>대상 컬럼 전체의 글자색을 설정하거나 확인한다. 헤더 행을 제외한 데이터 행의 글자색만 처리한다.
					컬럼이 존재하지 않는 경우 에러메시지 없이 글자색 설정은 취소된다. 색상 설정은 WebColor로 설정한다.
					2개행 이상의 단위데이터행 구조에서 Col 인자에 Index를 설정할 경우 모든행에 대해서 처리를 하고 
					SaveName으로 설정할 경우 해당 SaveName이 포함된 행에 대해서만 처리 한다.
<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetColFontColor(Col)

	▶ Return
		- String, 설정된 색상값 (Get Method 인 경우) 

	▶ Parameter
		- *Col(Long/String) : 특정 컬럼의 Column Index 또는 SaveName
*/

//2컬럼 글자색을 확인한다..
alert(mySheet.GetColFontColor(2));

/**
	▶ Syntax
		- ObjId.SetColFontColor(Col, Color)
	▶ Return
		- None
	▶ Parameter
		- *Col(Long/String) : 특정 컬럼의 Column Index 또는 SaveName
		- *Color(String) : 색상 값
*/

//컬럼 글자색을 회색으로 설정한다.
mySheet.SetColFontColor(1, "#FF0000");

//2컬럼 글자색을 1컬럼 글자색으로 설정한다.
mySheet. SetColFontColor(2, mySheet.GetColFontColor(1)); 


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
	
	
	<!-- 7. modalColFontBold -->
	<div class="modal fade" id="modalColFontBold" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">ColFontBold</h4>
				</div>
				<div class="modal-body">
					<p>대상 컬럼 전체의 Bold(굵은 글자체)를 설정하거나 확인한다. 헤더 행을 제외한 데이터 행만 처리한다.
						컬럼이 존재하지 않는 경우 에러메시지 없이 설정은 취소된다.
						2개행 이상의 단위데이터행 구조에서 Col 인자에 Index를 설정할 경우 모든행에 대해서 처리를 하고
						SaveName으로 설정할 경우 해당 SaveName이 포함된 행에 대해서만 처리 한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetColFontBold(Col)
	▶ Return
		- Boolean, Bold 설정 값 (Get Method 인 경우)
	▶ Parameter
		- *Col(Number/String) : 특정 컬럼의 Index 또는 SaveName
*/

//인덱스가 1인 컬럼에 Bold 설정여부를 확인한다.
alert(mySheet.GetColFontBold(1));

/**
	▶ Syntax
		- ObjId.SetColFontBold(Col, Bold)
	▶ Return
		- None
	▶ Parameter
		- *Col(Number/String) : 특정 컬럼의 Index 또는 SaveName
		- *Bold(Boolean) : Bold여부
*/

//컬럼 전체 글자에 Bold를 설정한다.
mySheet.SetColFontBold(1, 1);
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
	
	
	<!-- 8. modalColBackColor -->
	<div class="modal fade" id="modalColBackColor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">`
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">ColBackColor</h4>
				</div>
				<div class="modal-body">
					<p>대상 컬럼 전체의 배경색을 설정하거나 확인한다. 헤더 행을 제외한 데이터 행의 배경색만 처리한다.
						컬럼이 존재하지 않는 경우 에러메시지 없이 글자색 설정은 취소된다.
						색상 설정은 WebColor 또는 Basic 16 Color 문자열로 설정한다.
						2개행 이상의 단위데이터행 구조에서 Col 인자에 Index를 설정할 경우 모든행에 대해서 처리를 하고
						SaveName으로 설정할 경우 해당 SaveName이 포함된 행에 대해서만 처리 한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetColBackColor(Col)
	▶ Return
		- String, 설정된 색상값 (Get Method 인 경우) 
	▶ Parameter
		- *Col(Long/String) : 특정 컬럼의 Index 또는 SaveName
*/

// 2컬럼 배경색을 확인한다.
mySheet.GetColBackColor(2);

//SaveName이 sa_Name 인 컬럼의 배경색을 확인한다.
mySheet.GetColBackColor("sa_Name");


/**
	▶ Syntax
		- ObjId.SetColBackColor(Col, Color)
	▶ Return
		- None
	▶ Parameter
		- *Col(Long/String) : 특정 컬럼의 Index 및 SaveName
		- *Color(String) : WebColor색상 값
*/

//컬럼 배경색을 회색으로 설정한다.
mySheet.SetColBackColor(1, "#ADADAD");

//SaveName이 "sa_DistQty"인컬럼 배경색을 설정한다.
mySheet.SetColBackColor("sa_DistQty","#FFDDDD");

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
	
	<!-- 9. modalColFontUnderline -->
	<div class="modal fade" id="modalColFontUnderline" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">ColFontUnderline</h4>
				</div>
				<div class="modal-body">
					<p>대상 컬럼 전체의 글자 언더라인을 설정하거나 확인한다. 헤더 행을 제외한 데이터 행만 처리한다.
					컬럼이 존재하지 않는 경우 에러메시지 없이 언더라인 설정은 취소된다.
					2개행 이상의 단위데이터행 구조에서 Col 인자에 Index를 설정할 경우 모든행에 대해서 처리를 하고
					SaveName으로 설정할 경우 해당 SaveName이 포함된 행에 대해서만 처리 한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetColFontUnderline(Col)
	▶ Return
		- Boolean, 밑줄 설정 값 (Get Method 인 경우)
	▶ Parameter
		- *Col(Number/String) : 특정 컬럼의 Index 또는 SaveName
*/
//컬럼 전체 글자에 언더라인 설정여부를 확인한다.
alert(mySheet.GetColFontUnderline(1));

 
/**
	▶ Syntax
		- ObjId.SetColFontUnderline(Col, Underline)
	▶ Return
		- Boolean, 밑줄 설정 값 (Get Method 인 경우)
	▶ Parameter
		- *Col(Number/String) : 특정 컬럼의 Index 또는 SaveName
		- *Underline(Boolean) : 밑줄 여부
*/

//컬럼 전체 글자에 언더라인을 설정한다.
mySheet.SetColFontUnderline(1, 1);
 


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
	
	
	<!-- 10. modalMoveColumnPos -->
	<div class="modal fade" id="modalMoveColumnPos" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">MoveColumnPos</h4>
				</div>
				<div class="modal-body">
					<p>특정 컬럼을 새로운 컬럼 위치로 이동한다.
Event 인자를 1로 설정한 경우 OnBeforeColumnMove Event와 OnAfterColumnMove Event를 발생하므로
OnBeforeColumnMove Event 에서 처리할수 있는 컬럼 이동 취소 기능을 할수 있다.
0으로 설정할 경우 이벤트 없이 컬럼을 이동한다. 다중 컬럼의 경우 | 문자를 구분자로 이어서 인자를 생성한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.MoveColumnPos(Col, NewPos, [Event])
	▶ Return
		- Boolean, 이동 성공 여부
	▶ Parameter
		- *Col(Long/String) : 이동할 컬럼의 Index 또는 SaveName
		- *NewPos(Long/String) : 이동될 컬럼의 Index 또는 SaveName
		- Event(Boolean) : OnBeforeColumnMove, OnAfterColumn이벤트발생여부 설정<br/>
							(Default : 1)
*/

//1컬럼을 9컬럼으로 이동한다.
mySheet.MoveColumnPos(1, 9);

// Index가 1,2인 컬럼들을 Index가 7,8인 컬럼의 위치로 이동한다
mySheet.MoveColumnPos("1|2", "7|8");

//각 컬럼의 SaveName으로 설정한 경우
mySheet.MoveColumnPos("stockNm", "payAmt");

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
	
	
	<!-- 11. modalColLeft -->
	<div class="modal fade" id="modalColLeft" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">DataCopy</h4>
				</div>
				<div class="modal-body">
					<p>컬럼의 왼쪽 위치를 확인한다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.ColLeft(Col)
	▶ Return
		- Long, 특정컬럼 왼쪽 위치 값
	▶ Parameter
		- IncludeChild(Boolean) : 자식 레벨의 행까지 복사하는지 여부(Default : 0)
*/

//컬럼의 왼쪽 위치를 파악한다.
var iLeft = mySheet.ColLeft(1);

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