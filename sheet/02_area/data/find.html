<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<!-- 
		1 데이터변경
		2 FindText 추가
		
	 -->
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/find.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>영역별 > 데이터영역 > <b>데이터 검색</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>그리드에 로드된 데이터중 특정 문자열 및 조건에 해당하는 셀의 위치를 확인합니다.</blockquote>
							<h2> 1. 파일 찾기 창</h2>
							<p>그리드에 데이터가 로드된 이후 <a class="ib-link-desc" data-toggle="modal" data-target="#modalShowFindDialog"><b>ShowFindDialog</b></a>함수를 호출하거나 ctrl+shift+f 단축키를 누르면 찾기창 다이얼로그를 사용해볼 수 있습니다.</p>
						</div>
						<div class="ib_function2 border_sheet">
							<table class="ib_column2">
								<tr>
									<td>
										<a href="javascript:doAction('findDialog')" class="f2_btn_white btn_sheet">데이터 검색</a>
									</td>
								 </tr>
							</table>
						</div>
						<div class="area-panel"  style="height: 300px;">
							<div class="panel-ch">
								<div style="height:100%;">
									<div id="ibsheetArea"></div>
								</div>
							</div>
						</div>
						<div class="entry-content">
							<h2> 2. 중복된 값 찾기 </h2>
							<p>서버쪽으로 데이터를 전달할때 중복데이터에 대한 유효성체크가 필요한 경우가 있습니다. <br/>보통은 이런 경우 별도의 스크립트로 구현하여 해결하였는데, 아이비시트에서는 이와 관련된 몇 가지 함수를 제공 하고 있습니다. 
							( <a class="ib-link-desc" data-toggle="modal" data-target="#modalColValueDup"><b>ColValueDup</b></a>,
							<a class="ib-link-desc" data-toggle="modal" data-target="#modalColValueDupRows"><b>ColValueDupRows</b></a> )<br/>
							간단하게 동작하는 샘플은 아래 그리드에서 확인해보 실 수 있습니다.
						</div>
						<header class="area-subtitle"> 
							<div class="fl">
								<h5 class="title-a">조회결과</h5>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" onclick="doAction('colValueDupRows')">중복데이터체크</button>
							</div>
						</header>
						<div class="area-panel"  style="height: calc(100% - 800px);">
							<div class="panel-ch">
								<div style="height:100%;">
									<div id="ibsheetArea2"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
		
	<!-- modalShowFindDialog -->
	<div class="modal fade" id="modalShowFindDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">ShowFindDialog</h4>
				</div>
				<div class="modal-body">
					<p>사용자가 시트에서 ctrl+shift+F 입력시 표시되는 찾기 창을 표시한다.<br/>
						<div class="form-group">
<!-- 							<label class="label-control">Datetime Picker</label>
							<input type="text" class="form-control datetimepicker" value="10/05/2016"> -->
							<!-- <span class="material-input"></span> -->
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.ShowFindDialoog()
	▶ Return
		- None
	▶ Parameter
		- None
*/

//찾기창을 표시한다.
mySheet.ShowFindDialog();
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
	
	
	<!-- #modalColValueDup -->
	<div class="modal fade" id="modalColValueDup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">ColValueDup</h4>
				</div>
				<div class="modal-body">
					<p>특정 컬럼 내에 중복된 값이 존재하는지 여부를 확인 한다.<br/>
						<div class="form-group">
<!-- 							<label class="label-control">Datetime Picker</label>
							<input type="text" class="form-control datetimepicker" value="10/05/2016"> -->
							<!-- <span class="material-input"></span> -->
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.ColValueDup(Cols, [Opt])
	▶ Return
		- Number, 중복 행의 Index
	▶ Parameter
		- *Cols(Number/String) : 컬럼의 Index 또는 SaveName
		- Opt.CaseSensitive(Boolean) : 대/소문자 구분 비교 여부(Default=1)
		- Opt.IncludeDelRow(Boolean) : 트랜잭션 상태가 삭제인 행을 포함 여부(Default=1)
		- Opt.IncludeSumRow(Boolean) : 합계/소계/누계행 포함 여부(Default=1)
		- Opt.IncludeEmpty(Boolean) : 빈값 포함 여부(Default=1)
*/

//1컬럼에 중복된 값이 존재하는 행의 Index 확인
var Row = mySheet.ColValueDup("1");

//2,3,7 컬럼에 중복된 값이 존재하는 행의 Index 확인
var Row = mySheet.ColValueDup("2|3|7");

//삭제된 행과 빈값을 제외하고 중복 체크하기
var Row = mySheet.ColValueDup("2|3|7",{
	"IncludeDelRow" : 0,
	"IncludeEmpty" : 0
});
 
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
	
	<!-- modalColValueDupRows -->
	<div class="modal fade" id="modalColValueDupRows" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						<i class="material-icons">clear</i>
					</button>
					<h4 class="modal-title">ColValueDupRows</h4>
				</div>
				<div class="modal-body">
					<p>중복된 모든 행을 ","로 조합하여 문자열로 반환 한다.
ColValueDup 메소드는 처음으로 중복된 행의 Index만 확인할수 있지만 이 속성은 중복이 시작된행과 모든 중복된 행번호를 확인할 수 있는 기능이다.<br/>
예를 들어 Sheet에 다음과 같이 "기간구분"과 "콘도종류" 2개의 컬럼으로 구성되어 있는 구조라고 할때, ColValueDup=4이다. 1행으로 검사 후
첫 발견된 데이터이므로 결과는 4행이다. 동일한 조건에서 이 속성의 결과는 "3,4,7,8" 이다.
<img src="./img/colvalueduprows.gif" alt="" />
						<div class="form-group">
<pre>
<code class="language-javascript">/**
	▶ Syntax
		- ObjId.ColValueDupRows(Cols, [Opt])
	▶ Return
		- String, 중복된 모든 행을 ","로 조합한 문자열
	▶ Parameter
		- *Cols(Number/String) : 컬럼의 Index 또는 SaveName
		- Opt.CaseSensitive(Boolean) : 대/소문자 구분 비교 여부(Default=1)
		- Opt.IncludeDelRow(Boolean) : 트랜잭션 상태가 삭제인 행을 포함 여부(Default=1)
		- Opt.IncludeSumRow(Boolean) : 합계/소계/누계행 포함 여부(Default=1)
		- Opt.IncludeEmpty(Boolean) : 빈값 포함 여부(Default=1)
		- Opt.IncludeFirstRow(Boolean) : 빈값 포함 여부(Default=1)
		- Opt.StartRow(Number) : 중복 검사를 수행할 시작 범위 인덱스(Default :첫 행)
		- Opt.EndRow(Number) : 중복 감사를 수행할 마지막 범위 인덱스(Default :마지막 행)
*/
//6컬럼,7컬럼의 글자가 중복된 행들(삭제행포함, 최초행미포함, 전체 데이터 영역 검사)
var duprows1 = mySheet.ColValueDupRows("6|7");
//4컬럼,5컬럼에 대해 첫번째 행부터 50번째 행까지의 중복검사(삭제행제외, 최초행포함, 1행~50행)
var duprows2 = mySheet.ColValueDupRows("4|5",
	{"IncludeDelRow" : 0, "IncludeFirstRow" : 1, "StartRow" : 1, "EndRow" : 50
});
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