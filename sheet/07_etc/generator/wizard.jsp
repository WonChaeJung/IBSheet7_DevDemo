﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/wizard.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>기타 > 코드제네레이터 > <b>시트 생성</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<h2>SetConfig</h2>
							<div class="area-search">
								<div class="serTbl">
									<form id="setconfig" name="setconfig">
										<table>
											<colgroup>
												<col style="width:150px" />
												<col style="width:21.3%" />
												<col style="width:180px" />
												<col style="width:21.3%" />
												<col style="width:110px" />
												<col />
											</colgroup>
											<tr>
												<th scope="row">구분</th>
												<td>
													<select class="full" id="frm_NameOrId">
														<option value="">--</option>
														<option value="name">이름</option>
														<option value="id">ID</option>
													</select>
												</td>
												<th scope="row">이름/ID</th>
												<td>
													<input class="full" type="text" name="frm_SearchText">
												</td>
												<th scope="row"></th>
												<td>
												</td>
											</tr>
											<tr>
												<th scope="row" title="조회 건수 정보 포멧 설정(CountFormat 메서드 참고)" >건수 정보 포멧 : </th>
												<td>
													<input type="textarea" id="CountFormat" name="CountFormat" value="" size="30" class="inputbox" placeHolder="[ BOTTOMDATA/TOTALROWS]"/>
												</td>
												<th scope="row" title="조회 방식 설정" >조회 방식 설정</th>
												<td>
													<select id="SearchMode">
														<option value="‡smGeneral‡">전체 데이터 로드(절대 비추)</option>
														<option value="‡smClientPaging‡">클라이언트 페이징</option>
														<option value="smLazyLoad" selected>Lazyload</option>
														<option value="‡smServerPaging‡">서버 페이징</option>
														<option value="‡smServerPaging2‡">서버 페이징2</option>
													</select>
												</td>
												<th scope="row"></th>
												<td>
												</td>
											</tr>
											<tr>
												<th scope="row" title="조회 건수 정보 표시 위치(CountPosition 메서드 참고)" >건수정보 표시 위치: </th>
												<td>
													<select id="CountPosition">
														<option value="0">사용 안함</option>
														<option value="1">좌측 상단</option>
														<option value="2">우측 상단</option>
														<option value="3">좌측 하단</option>
														<option value="4">우측 하단</option>
													</select>
												</td>
												<th scope="row" title="가로/세로 스크롤바 사용 여부" >SizeMode  </th>
												<td>
													<select id="SizeMode" style="width:200px">
														<option value="sizeAuto" selected>자동 스크롤 사용(원래 설정 높이 사용)</option>
														<option value="‡sizeNoVScroll‡">세로스크롤 사용 않함</option>
														<option value="‡sizeNoHScroll‡">가로스크롤 사용 안함</option>
														<option value="‡sizeNoBothScroll‡">가로/세로 스크롤 사용 안함</option>
														<option value="‡sizeAdvancedAuto‡">설정한 높이보다 적은 데이터가 조회되었을 경우 자동 조절</option>
													</select>
												</td>
												<th scope="row"></th>
												<td></td>
											</tr>
											
											<tr>
												<th scope="row" title="페이지 네비게이션 표시 및 위치 설정(건수 표시 행에 같이 표현됨[CountPosition=0인 경우 사용 불가])" >페이지 네비게이션 위치</th>
												<td>
													<select id="PagingPosition">
														<option value="0">사용 안함</option>
														<option value="1">좌측</option>
														<option value="2">우측</option>
													</select>
												</td>
												<th scope="row" title="다중 컬럼 소팅시 몇개까지 컬럼까지 소팅할 지 여부 설정(default:3개)">최대 소팅 가능 컬럼 수 </th>
												<td>
													<input type="text" id="MaxSort" value="" size="10" class="inputbox" placeHolder="숫자입력"/>
												</td>
												<th scope="row"></th>
												<td></td>
											</tr>
											<tr>
												<th scope="row" title="머지 유형 설정" >머지 유형</th>
												<td>
													<select id="MergeSheet">
														<option value="msNone">머지 없음</option>
														<option value="‡msAll‡">전체 머지</option>
														<option value="‡msPrevColumnMerge‡">앞컬럼머지</option>
														<option value="‡msHeaderOnly‡">헤더만 머지</option>
														<option value="‡msFixedMerge‡">단위데이터행 고정 머지</option>
														<option value="‡msBaseColumnMerge‡">최좌측 컬럼 기준 머지</option>
													</select>
												</td>
												<th scope="row" title="마우스 커서 오버시 표시 여부">Hover Mode </th>
												<td>
													<select id="MouseHoverMode">
														<option value="0">사용 안함</option>
														<option value="1">셀 단위(hover)</option>
														<option value="2">행 단위(hover)</option>
													</select>
												</td>
												<th scope="row"></th>
												<td></td>
											</tr>
												
												
											<tr>
												<th scope="row" id="selectionsummary_title" >선택 영역 요약 정보</th>
												<td>
													<input class="checkbox" type="checkbox"  id="SelectionSummary" />
												</td>
												<th scope="row" title="합계 데이터를 상단/하단에 보여줄지 설정(uncheck 시 상단에 위치)">합계행 위치 하단</th>
												<td>
													<input class="checkbox" type="checkbox" checked  id="SumPosition" />
												</td>
												<th scope="row"></th>
												<td></td>
											</tr>
											
											
											<tr>
												<th scope="row" id="selectionsummary_title" title="같은 데이터가 좌우로 있을 때 병합 할지 여부">가로 머지 허용 :</th>
												<td>
													<input class="checkbox" type="checkbox" id="DataRowMerge" />
												</td>
												<th scope="row" title="마우스 커서가 셀 위에 있을때 풍선도움말 표시 여부">풍선도움말</th>
												<td>
													<input class="checkbox" type="checkbox" checked  id="ToolTip" />
												</td>
												<th scope="row"></th>
												<td></td>
											</tr>
											<tr>
												<th scope="row" id="selectionsummary_title" title="사용자가 시트 내에 가로스크롤 바를 드레그 할 때, 즉시 반응 할지 여부">가로 스크롤 지연 처리</th>
												<td>
													<input class="checkbox" type="checkbox" checked id="DeferrdHScroll" />
												</td>
												<th scope="row" title="사용자가 헤더에서 마우스 우클릭시 헤더 컨텍스트 메뉴 기능 사용 여부">헤더 메뉴 사용</th>
												<td>
													<input class="checkbox" type="checkbox" checked  id="UseHeaderActionMenu" />
												</td>
												<th scope="row"></th>
												<td></td>
											</tr>
											<tr>
												<th scope="row" id="selectionsummary_title" title="사용자가 시트 내에 세로스크롤 바를 드레그 할 때, 즉시 반응 할지 여부">세로 스크롤 지연 처리</th>
												<td>
													<input class="checkbox" type="checkbox" checked id="DeferrdVScroll" />
												</td>
												<th scope="row" title="좌측 열에 고정할 컬럼 수">좌측 열 틀고정</th>
												<td>
													<input type="text" id="FrozenCol" value="" size="10" class="inputbox" placeHolder="숫자입력"/>
												</td>
												<th scope="row"></th>
												<td></td>
											</tr>
											<tr>
												<th scope="row" id="selectionsummary_title" title="상태(Status)컬럼에 '입력','수정','삭제' 대신 이미지로 표시 여부">상태열 이미지 사용</th>
												<td>
													<input class="checkbox" type="checkbox"  id="ImageStatus" />
												</td>
												<th scope="row" title="우측 열에 고정할 컬럼 수">우측 열 틀고정</th>
												<td>
													<input type="text" id="FrozenColRight" value="" size="10" class="inputbox" placeHolder="숫자입력"/>
												</td>
												<th scope="row"></th>
												<td></td>
											</tr>
											<tr>
												<th scope="row" id="selectionsummary_title"title="필터 행 사용 여부">필터 사용</th>
												<td>
													<input class="checkbox" type="checkbox"  id="FilterRow" />
												</td>
												<th scope="row" title="그룹 행 사용 여부">그룹 사용</th>
												<td>
													<input class="checkbox" type="checkbox"  id="GroupRow" />
												</td>
												<th scope="row"></th>
												<td></td>
											</tr>
										</table>
									</form>
								</div>
							</div>
							<div style="width:100%;height:5px"></div>
							<!-- InitHeaders 영역 -->
							<h2>InitHeaders</h2>
							<div class="area-search">
								<div class="serTbl">
									<form id="initheaders" name="initheaders">
										<table>
											<colgroup>
												<col style="width:150px" />
												<col style="width:21.3%" />
												<col style="width:180px" />
												<col style="width:21.3%" />
												<col style="width:110px" />
												<col />
											</colgroup>
											<tr>
												<th scope="row">헤더소트</th>
												<td>
													<input class="checkbox" type="checkbox"  checked id="Sort" />
												</td>
												<th scope="row">컬럼이동</th>
												<td>
													<input class="checkbox" type="checkbox" checked id="ColMove" />
												</td>
												<th scope="row"></th>
												<td>
												</td>
											</tr>
											<tr>
												<th scope="row">컬럼Resize</th>
												<td>
													<input class="checkbox" type="checkbox" checked id="ColResize" />
												</td>
												<th scope="row">헤더전체체크</th>
												<td>
													<input class="checkbox" type="checkbox" checked id="HeaderCheck" />
												</td>
												<th scope="row"></th>
												<td>
												</td>
											</tr>
											<tr>
												<th scope="row">컬럼 갯수</th>
												<td>
													<input type="text" id="collength" value="5" size="5" class="inputbox"/>
												</td>
												<th scope="row">
												</th>
												<td>
												</td>
												<th scope="row"></th>
												<td>
												</td>
											</tr>
										</table>
									</form>
								</div>
							</div>
						
						
						<header class="area-subtitle"> 
							<div class="fl">
								<h5 class="title-a">조회결과</h5>
							</div>
							<div class="btn" style="float:right;">
								<button class="btn-strong" onclick="javascript:doAction('insert');">컬럼 생성</button>
								<button class="btn-strong" onclick="javascript:doAction('make')">소스생성</button>
								<button class="btn-strong" onclick="doAction('reload')">초기화</button>
								<button class="btn-strong" onclick="doAction('search')">조회</button>
							</div>
						</header>
						
						
						
						
						
						
						<div class="area-panel">
							<div class="panel-ch">
								<!-- class="sheetSec"  -->
								<div style="height:450px;">
									<div id="ibsheetArea"></div>
								</div>
							</div>
						</div><br/>
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
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer_dataview.jsp" %>
			</div>
		</div>
	</body>
</html>