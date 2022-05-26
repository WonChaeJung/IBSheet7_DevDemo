<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/multi_save.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body onLoad="LoadPage()">
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<!-- Wrap : 메인 헤더 (S) -->
				<header class="wrap-mainheader">
					<h4>기본기능 > 데이터저장 > <b>동시저장</b></h4>
				</header>
				<!-- Wrap : 메인 헤더 (E) -->
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<!-- <h2> 두개의 시트에 각각 변경된 내용을 하나의 Request에 묶어 서버로 전달하는 방법을 확인한다.</h2> -->
							<blockquote> 두개의 시트에 각각 변경된 내용을 하나의 Request에 묶어 서버로 전달하는 방법을 확인한다.</blockquote>
							<!-- <p></p> -->
							<div class="clear hidden"></div>
							<form name="searchForm">
								<!-- Area : 조회조건 (S) -->
								<div class="area-search">
									<div class="serTbl">
										<form name="frm">
											<table>
												<colgroup>
													<col style="width: 90px" />
													<col style="width: 23.3%" />
													<col style="width: 90px" />
													<col style="width: 23.3%" />
													<col style="width: 140px" />
													<col />
												</colgroup>
												<tr>
													<th scope="row">사번</th>
													<td><input type="text" id="SawonNo" size="10" maxlength="4" class="full" /></td>
													<th scope="row">이름</th>
													<td><input type="text" id="Name" size="10" maxlength="10"  class="full" /></td>
													<th scope="row">입사일</th>
													<td><input class="full" type="text" id="EnterDate"  size="8" maxlength="8"  /></td>
												</tr>
												<tr>
													<th scope="row">급여</th>
													<td><input type="text" id="Pay" size="10" maxlength="4" class="full" /></td>
													<th scope="row">수당</th>
													<td><input type="text" id="Pay2" class="full"></td>
													<th scope="row">호봉</th>
													<td>
														<select id="HoBong" class="selectbox full"><!--class="fieldcombo"-->
															<option value="1">1호봉</option>
															<option value="2">2호봉</option>
															<option value="3">3호봉</option>
															<option value="4">4호봉</option>
															<option value="5" selected>5호봉</option>
														</select>
													</td>
												</tr>
												
											</table>
										</form>
									</div>
								</div>
							</form>
							<header class="area-subtitle"> 
								<div class="fl">
									<h5 class="title-a">조회결과</h5>
								</div>
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('exceldown')">초기화</button>
									<button class="btn-strong" onclick="doAction('insert')">추가</button>
									<button class="btn-strong" onclick="doAction('search')">조회</button>
									<button class="btn-strong" onclick="doAction('save')">저장</button>
									<button class="btn-strong" onclick="doAction('exceldown')">엑셀다운</button>
								</div>
							</header>

						</div>
						<div class="area-panel"  style="height: 300px;">
							<div class="panel-ch">
								<!-- class="sheetSec"  -->
								<div style="height:100%; padding-bottom :15px;">
									<script type="text/javascript">createIBSheet("mySheet", "100%", "100%"); </script>
								</div>
							</div>
						</div><br/>
						<div class="area-panel"  style="height: calc(100% - 630px);">
							<div class="panel-ch">
								<!-- class="sheetSec"  -->
								<div style="height:100%;">
									<script type="text/javascript">createIBSheet("mySheet2", "100%", "100%"); </script>
								</div>
							</div>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
	</body>
</html>