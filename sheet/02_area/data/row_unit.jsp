<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/row_unit.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>영역별 > 데이터영역 > <b>행 단위 컨트롤</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>행 단위로 컨트롤할 수 있는 다양한 api들에 대해서 알아보겠습니다..</blockquote>
							<h2>행 추가 및 삭제</h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalDataInsert"><b>1. DataInsert</b></a><br/>
							신규 행을 추가 합니다.</p>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalRowDelete"><b>2. RowDelete</b></a><br/>
							특정의 단일 또는 다중 데이터 행을 삭제 한다.</p>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload', 'mySheet')">초기화</button>
									<button class="btn-strong" onclick="doAction('insert', 'mySheet')">행 추가</button>
									<button class="btn-strong" onclick="doAction('delete', 'mySheet')">행 삭제</button> 
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
							<h2>행 숨김</h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalRowHidden"><b>3. RowHidden</b></a><br/>
							행의 숨기여부를 설정하거나 확인한다.
							</p>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload', 'mySheet2')">초기화</button>
									<button class="btn-strong" onclick="doAction('rowHidden', 'mySheet2')">선택 행 숨김</button> 
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
							<h2>행 편집 여부</h2>	
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalRowEditable"><b>4. RowEditable</b></a><br/>
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
							<h2>행 스타일 관련</h2>	
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalDataRowHeight"><b>6. DataRowHeight</b></a><br/>
							데이터 영역 전체 행의 높이를 변경 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalRowHeight"><b>7. RowHeight</b></a><br/>
							특정 행의 높이를 변경 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalRowFontColor"><b>8. RowFontColor</b></a><br/>
							특정 행의 폰트 색상을 설정 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalRowBackColor"><b>9. RowBackColor</b></a><br/>
							특정 행의 배경 색상을 설정 합니다.
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload', 'mySheet4')">초기화</button>
									<button class="btn-strong" onclick="doAction('dataRowHeight', 'mySheet4')">행 높이 변경</button>
									<button class="btn-strong" onclick="doAction('setRowHeight', 'mySheet4')">선택행 높이 변경</button>
									<button class="btn-strong" onclick="doAction('setRowFontColor', 'mySheet4')">선택행 폰트색상 변경</button>
									<button class="btn-strong" onclick="doAction('setRowBackColor', 'mySheet4')">선택행 배경색상 변경</button>
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
							<h2>행 데이터 관련</h2>
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalRowData"><b>10. RowData</b></a><br/>
							행 단위로 값을 설정 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalDataMove"><b>11. DataMove</b></a><br/>
							행의 데이터를 이동 합니다.
							<p><a class="ib-link-desc" data-toggle="modal" data-target="#modalDataCopy"><b>12. DataCopy</b></a><br/>
							행 데이터를 복사 합니다.
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('reload', 'mySheet5')">초기화</button>
									<button class="btn-strong" onclick="doAction('setRowData', 'mySheet5')">행 단위 값 변경</button>
									<button class="btn-strong" onclick="doAction('dataCopy', 'mySheet5')">복사</button>
									<button class="btn-strong" onclick="doAction('dataMoveUp', 'mySheet5')">위로 이동</button>
									<button class="btn-strong" onclick="doAction('dataMoveDown', 'mySheet5')">아래로 이동</button>
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
		
		
		
		
		
		
		
	<!-- myModalLabel -->
	<div class="modal fade" id="modalDataInsert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">DataInsert</h4>
				</div>
				<div class="modal-body">
					<p>데이터 행을 신규 생성하고, 생성된 행의 Row Index를 반환한다.<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.DataInsert([Row], [Level], [Opt])
	▶ Return
		- Long, 신규 생성된 행의 Row Index
	▶ Parameter
		- Row(Long) : 생성될 행 위치(Default : 마지막 선택된 행 바로 아래)
		- Level(Long) : 생성될 행의 트리 레벨 수준 
					  (Default : 마지막으로 선택된 행 레벨의 자식 레벨)
		- Opt.Focus(Boolean) : 생성된 행으로 포커스를 이동시킬지 여부 (Default : 1)
		- Opt.CellEvent(Boolean) : OnSelectCell 이벤트 발생 여부 (Default : 1)
*/

//첫 행에 생성하기
mySheet.DataInsert(0);

//마지막 행에 생성하기
mySheet.DataInsert(-1);

//현재 선택된 행의 바로 아래에 생성
mySheet.DataInsert();

//7행에 생성
mySheet.DataInsert(7);
 

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
	
	<div class="modal fade" id="modalRowDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">RowDelete</h4>
				</div>
				<div class="modal-body">
					<p>특정의 단일 또는 다중 데이터 행을 삭제 한다.<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.RowDelete([Row],[Confirm])
	▶ Return
		- None
	▶ Parameter
		- Row(Number/String) : 삭제할 행의 Row Index 또는 Row Index를 "|"구분자로 연결한 문자열
							   (Default : "현재 선택 행") 
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
	
	<!-- myModalLabel -->
	<div class="modal fade" id="modalRowHidden" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">RowHidden</h4>
				</div>
				<div class="modal-body">
					<p>행의 숨기여부를 설정하거나 확인한다.<br/>
					"|" 구분자로 Row Index를 연결하여 조합하면 다수행의 숨김여부를 설정할 수 있다.<br/>
					(단, 다수행에 대해 Read 기능은 지원되지 않는다. )
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetRowHidden(Row)
	▶ Return
		- Boolean, 설정 값 (Get : 1 이면 숨기 상태, 0이면 보이는 상태)
	▶ Parameter
		- *Row(Long) : 특정 행의 Row Index
*/

//1행이 숨겨진 여부를 확인하여 숨겨진 경우 표시되도록 설정한다.
if(mySheet.GetRowHidden(1)){
	mySheet.SetRowHidden(1,0);
}


/**
	▶ Syntax
		- ObjId.SetRowHidden(Row, Hidden)
	▶ Return
		- None
	▶ Parameter
		- *Row(Long /String) : 특정 행의 Row Index 혹은
							   구분자 "|"로 연결된 문자열
		- Hidden(Boolean) : 숨김여부
*/

//1행이 숨겨진 여부를 확인하여 숨겨진 경우 표시되도록 설정한다.
if(mySheet.GetRowHidden(1)){
	mySheet.SetRowHidden(1,0);
}

//다수의 행을 동시에 숨기는 경우
mySheet.SetRowHidden("2|5|7|10", 1);


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
	<div class="modal fade" id="modalRowEditable" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">RowEditable</h4>
				</div>
				<div class="modal-body">
					<p>특정 행의 Edit 가능 여부를 확인하거나 설정한다.<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetRowEditable(Row)
	▶ Return
		- Boolean, Edit 가능 여부 (Get Method 인 경우)
	▶ Parameter
		- *Row(Long) : 특정 행의 Row Index
*/

//1행의 Edit 가능 여부를 확인한다.
mySheet.GetRowEditable(1);


/**
	▶ Syntax
		- ObjId.SetRowEditable(Row, Editable)
	▶ Return
		- None
	▶ Parameter
		- *Row(Long /String) : 특정 행의 Row Index 혹은
		- *Editable(Boolean) : 행의 Edit 가능 여부
*/

//1행의 Edit 가능 여부를 0으로 설정한다.
mySheet.SetRowEditable(1,0);


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
	<div class="modal fade" id="modalDataRowHeight" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">DataRowHeight</h4>
				</div>
				<div class="modal-body">
					<p>모든 데이터 행의 행높이를 설정하거나 확인한다.<br/>
					이 속성은 픽셀 단위로 설정하는 값이며, 기본 설정값은 21픽셀이다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetDataRowHeight()
	▶ Return
		- Integer, 설정된 높이 값(Get Method 인 경우) 
*/

//모든 데이터 행의 높이를 확인한다.
mySheet.GetDataRowHeight();


/**
	▶ Syntax
		- ObjId.SetDataRowHeight(Height)
	▶ Return
		- None
	▶ Parameter
		- *Height(Integer) : 데이터행의 높이 값
*/

//모든 데이터 행의 높이를 22 픽셀로 설정한다.
mySheet.SetDataRowHeight(22);
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
	<div class="modal fade" id="modalRowHeight" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">RowHeight</h4>
				</div>
				<div class="modal-body">
					<p>특정 행의 높이를 설정하거나 확인한다.<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetRowHeight(Row)
	▶ Return
		- Integer, 현재 행 높이 (Get Method 인 경우)
	▶ Parameter
		- *Row(Long) : 특정 행의 Row Index
*/

//1행의 높이를 확인한다.
mySheet.GetRowHeight(1);
 

/**
	▶ Syntax
		- ObjId.SetRowHeight(Row, Height)
	▶ Return
		- None
	▶ Parameter
		- *Row(Integer) : 특정 행의 Row Index 혹은
		- *Height(Integer) : 설정할 행 높이
*/

//50 픽셀로 높이 수정
mySheet.SetRowHeight(1, 50);

 

//3행의 높이를 2행의 높이와 동일하게 변경
mySheet.SetRowHeight(3, mySheet.GetRowHeight(2));


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
	<div class="modal fade" id="modalRowFontColor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">RowFontColor</h4>
				</div>
				<div class="modal-body">
					<p>행 전체의 글자색을 설정하거나 확인한다. <br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetRowFontColor(Row)
	▶ Return
		- String, 설정 색상
	▶ Parameter
		- *Row(integer) : 특정 행의 Row Index
*/

//1행의 글자색을 확인한다.
mySheet.GetRowFontColor(1);


/**
	▶ Syntax
		- ObjId.SetRowFontColor(Row,Color)
	▶ Return
		- None
	▶ Parameter
		- *Row(Integer) : 특정 행의 Row Index 혹은
		- *Color(String) : WebColor색상 값
*/

//1행의 글자색을 회색으로 설정한다.
mySheet.SetRowFontColor(1, "192,192,192");


//2행 글자색을 1행 글자색으로 설정한다.
mySheet.SetRowFontColor(2,mySheet.GetRowFontColor(1));

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
	<div class="modal fade" id="modalRowBackColor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">RowBackColor</h4>
				</div>
				<div class="modal-body">
					<p>행 전체의 배경색을 설정하거나 확인한다. 데이터 영역의 배경색만 처리한다<br/>
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.GetRowBackColor(Row)
	▶ Return
		- String, 배경 색상
	▶ Parameter
		- *Row(Integer) : 특정 행의 Row Index
*/

//1행의 배경색을 확인한다.
mySheet.GetRowBackColor(1);



/**
	▶ Syntax
		- ObjId.SetRowBackColor(Row, BackColor)
	▶ Return
		- None
	▶ Parameter
		- *Row(Integer) : 특정 행의 Row Index 혹은
		- *BackColor(String) : WebColor색상 값
*/

//1행의 배경색을 회색으로 설정한다.
mySheet.SetRowBackColor(1,"#C0C0C0");

//3행의 배경색을 빨강색으로 설정한다.
mySheet.SetRowBackColor(1,"#FF0000");

//2행 배경색을 1행 배경색으로 설정한다.
mySheet.SetRowBackColor(2, mySheet.GetRowBackColor(1));

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
	<div class="modal fade" id="modalRowData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
	<div class="modal fade" id="modalDataMove" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">DataMove</h4>
				</div>
				<div class="modal-body">
					<p>데이터 행을 원하는 다른 위치로 이동한다. 트리 형태로 설정 될 경우 <br/>
					ChildLevel이 존재하는 경우 선택된 행의 ChildLevel 행도 모두 이동처리한다.<br/>
					이 함수는 DataInsert 함수나 DataCopy 함수처럼 신규 행이 생성되는 것이 아니라<br/>
					기존의 행이 다른 위치로 이동할 뿐이다. 하지만 내부적으로는 복사와 삭제의 작업을<br/>하게된다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.DataMove(ToRow, [FromRow], [RowLevel])
	▶ Return
		- Long, 이동된 행의 Top Row Index
	▶ Parameter
		- *ToRow(Long) : 이동할 위치의 Row Index
		- FromRow : 선택된 데이터의 Row Index
		- RowLevel : 이동 후 선택된 데이터의 트리 레벨 <br/>
					(Default : "원래 레벨 수준")
*/

//12행을 10행으로 이동한다.
mySheet.DataMove(10, 12);


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
	<div class="modal fade" id="modalDataCopy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">DataCopy</h4>
				</div>
				<div class="modal-body">
					<p>마지막으로 선택된 데이터 행의 내용을 복사하여 신규 입력 행으로 생성하고,<br/>
					생성된 행의 Row Index를 반환한다. 트리 형태로 구성된 경우 복사할 대상 행에<br/>
					자식레벨이 존재할 경우 IncludeChild 인자가 1이면 자식 레벨의 행까지 모두 복사한다.<br/>
					신규 생성된 행의 트랜잭션 상태는 "입력"으로 표시된다.
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.DataCopy([IncludeChild])
	▶ Return
		- Long, 복사하여 생성된 행의 Row Index
	▶ Parameter
		- IncludeChild(Boolean) : 자식 레벨의 행까지 복사하는지 여부(Default : 0)
*/

//행을 복사하고, 복사된 행의 트랜잭션 상태를 "조회"로 변경한다.
//'Status' 는 상태 컬럼의 SaveName
var Row = mySheet.DataCopy();
mySheet.SetCellValue(Row, "Status", "R");

//자식 레벨까지 모두 복사하기
mySheet.DataCopy(1);

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