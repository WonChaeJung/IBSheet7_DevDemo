﻿<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/multiexport.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<dizzzv class="container">
				<header class="wrap-mainheader">
					<h4>기능별 > 엑셀 > <b>여러개의 시트를 한 파일에 출력</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<h2>Down2ExcelBuffer</h2>
							<p><b>1. 설명</b><br/>
							<p>Down2ExcelBuffer 함수를 통해 여러개의 시트를 하나의 엑셀파일로 다운로드 받을 수 있습니다.<br/> 
							해당 함수의 첫 번째 인자 값(buffer)을 true 로 설정하면 이후로 실행되는 Down2Excel은 실제로 동작하지 않으며 모두 내부 메모리에 저장되는데, 이후에 다시 인자 값을 false 로 설정하게 되면 <br/> 
							메모리에 저장되어 있던 모든 시트들을 하나의 엑셀 파일안에 시트별로 각각의 워크시트에 저장되어 다운로드 할 수 있습니다<br/> 
							</p>
							<p><b>2. 참조코드</b><br/>
	<pre>
<code class="language-javascript">//이후로는 버퍼링한다. 아무 동작 안함.
firstSheet.Down2ExcelBuffer(true);  

// 첫번째 워크시트에 담아두기를 예약함.
firstSheet.Down2Excel({FileName:'excel2',SheetName:'sheet1'}); 

// 두번째 워크시트에 담아두기를 예약함.
secondSheet.Down2Excel({FileName:'excel2',SheetName:' sheet2'}); 

// 버퍼링된 모든 엑셀 자료를 1개의 엑셀문서에 모두 모아서 즉시 다운로드 한다.
firstSheet.Down2ExcelBuffer(false); 
</code>
	</pre>
	
							<p><b>3. 샘플</b>
							<header class="area-subtitle"> 
								<div class="btn" style="float:right;">
									<button class="btn-strong" onclick="doAction('multiexport')">엑셀 다운로드</button>
								</div>
							</header>
							<div style="width:100%; border: solid 1px red;">
								<div style="width:49%; float:left;">
									<div class="area-panel">
										<div class="panel-ch">
											<div style="height:311px;">
												<div id="ibsheetArea"></div>
											</div>
										</div>
									</div><br/>
								</div>
								<div style=" width:50%; margin : 0 0 0 5px; float: right;">
									<div class="area-panel">
										<div class="panel-ch">
											<div style="height:311px;">
												<div id="ibsheetArea2"></div>
											</div>
										</div>
									</div><br/>
								</div>
							</div>
							</p>
						</div>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
	</body>
</html>