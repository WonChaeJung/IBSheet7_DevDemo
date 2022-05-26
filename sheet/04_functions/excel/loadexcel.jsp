<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/loadexcel.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<header class="wrap-mainheader">
					<h4>기능별 > 엑셀 > <b>엑셀 파일 로드</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<h2>LoadExcel</h2>
							<p><b>1. 동작 방식</b><br/>
							   - LoadExcel함수를 호출하면 파일 다이얼로그창을 호출<br/>
							   - 다이얼로그창에서 엑셀 파일을 선택하면 해당 파일을 서버의 임시경로에 업로드<br/>
							   - 해당 파일의 데이터를 읽어 들여 데이터 영역에 표시<br/>
							   - 임시폴더에 올린 엑셀 파일은 삭제<br/> 
							</p>
							<p><b>2. 사용방법 </b></p>
	<pre>
<code class="language-javascript">// 엑셀로 로딩하기
mySheet.LoadExcel();

// 헤더타이틀을 서로 비교하여 동일한 컬럼끼리 로딩을 하되 7행부터 9 행까지만 읽어들인다.
mySheet.LoadExcel({Mode:'HeaderMatch',StartRow:'7',EndRow:'9'});

// IBSheet의 첫번째 컬럼에 엑셀의 5번째 컬럼의 값을 로딩하고, IBSheet 의 5번째 컬럼에 엑셀의 1번째 컬럼의 값을 로딩함.
mySheet.LoadExcel({ColumnMapping:'5|4|3|2|1'});
</code>
	</pre>
							<p><b>3. 샘플</b></p>
							</p>
						</div>
						<!-- Area : 조회조건 (S) -->
						<div class="area-search">
							<div class="ib_function2 border_sheet">
								<table class="ib_column2">
									<tr>
										
										<th class="tit">매칭방식</th>
										<td class="r20" colspan="7">
											<select id="match" class="selectbox">
												<option value="HeaderMatch" selected>해더 타이틀 비교</option>
												<option value="NoHeader">좌측부터 순서대로</option>
												<option value="HeaderSkip">첫번째행 무시</option>
											</select>
										</td>
										<td class="r20"><a href="javascript:doAction('loadexcel');" class="f2_btn_white btn_sheet"  style="width:120px">엑셀업로드</a></td>
									</tr>
								</table>
							</div>
						</div>
						<header class="area-subtitle"> 
							<div class="fl">
								<h5 class="title-a">조회결과</h5>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" onclick="doAction('reload')">초기화</button>
								<button class="btn-strong" onclick="doAction('search')">조회</button>
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
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
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