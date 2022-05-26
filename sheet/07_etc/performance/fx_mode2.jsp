<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/fx_mode2.js"></script>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>기타 > 성능개선 > <b>Fx설정2</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<h2>Fx : 2</h2>
							<p><b>1. 설명</b><br/>
							앞서 설명한 Fx : 1 은 데이터의 규격에만 제약을 두어 속도를 향상시켰는데 Fx : 2는 그밖에  조회 성능이 저하될 수 있는 요소를 제거한 기능 입니다.<br/>
							Fx : 2를 설정하게 되면 기능에 제한이 더 생기는 만큼 조회 속도를 크게 향상 시킬 수 잇습니다. (IBSheet7.0.5.4 버전부터 사용 가능)
							</p><br/>
							<p><b>2. 설정 방법</b><br/>
							기존 Fx : 1 설정 방법과 동일하게 지원 합니다. 
<pre>
<code class="language-javascript">
// Fx인자는 1 또는 2로 설정
mySheet.DoSearch("list.jsp", "p1=aa&p2=bb", {Fx : 2}); // default : 0
</code>
</pre>
							<p><b>3. 제약 사항</b>
							<div style="width:100%;">
								<div style="width:49%; float:left;">
									<div class="area-panel">
										<div class="panel-ch">
											<div style="height:811px;">
												<div id="ibsheetArea"></div>
											</div>
										</div>
									</div><br/>
								</div>
								<div style=" width:49%; margin : 0 0 0 1px; float: right;">
									<div class="area-panel">
										<div class="panel-ch">
											<div style="height:811px;">
												<div id="ibsheetArea2"></div>
											</div>
										</div>
									</div><br/>
								</div>
							</div>
							</p>
						</div>

						<div class="entry-content">
							<div style="width:100%; border:solid 0px blue;">
								<div style="width:49%; float:left;">
									<header class="area-subtitle"> 
										<p style="float:left; margin : 0 0 0 10px; "></p>
										<button id="shtbtn2" class="btn-strong" style="float:right; margin:0 20px;" onclick="doAction('search3')">* 일반 조회</button>
									</header>
									<div class="area-panel">
										<div class="panel-ch">
											<div style="height:250px;">
												<div id="ibsheetArea3"></div>
											</div>
										</div>
									</div><br/>
								</div>
								<div style=" width:49%; margin : 0 0 0 1px; float: right;">
									<header class="area-subtitle"> 
										<p style="float:left; margin : 0 0 0 10px; "></p>
										<button id="shtbtn3" class="btn-strong" style="float:right; margin:0 20px;" onclick="doAction('search4')">* Fx : 2 적용</button>
									</header>
									<div class="area-panel">
										<div class="panel-ch">
											<!-- class="sheetSec"  -->
											<div style="height:250px;">
												<div id="ibsheetArea4"></div>
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