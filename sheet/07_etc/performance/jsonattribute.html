<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/jsonattribute.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>기타 > 성능개선 > <b>예약어(UseJsonAttribute) 기능</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<h2>OnSearchEnd,OnRowSearchEnd 이벤트 대신 OnLoadData 이벤트 사용</h2>
							<p><b>1. 설명</b><br/>
							조회 데이터가 많지데도 불구하고 생각보다 데이터를 로드하는데 시간이 많이 걸리는 경우가 있습니다. 이런 경우 확인해 보면 <br/>
							대체로 조회 이후 전체 데이터를 스켄하면서 SetRowBackColor()나 SetCellEditable()등의 함수를 통해 조회된 데이터를 수정하는 경우가 많은데<br/>
							위와 같은 함수가 한번 호출될때 마다 화면에 즉시 렌더링이 이루어지면서 브라우져의 자원을 사용하게 됩니다.<br/>
							따라서 위와 같은 업무는 데이터를 시트에 로딩하기 전에 미리 조회데이터에 삽입하여 로딩하는 것이 훨씬 성능이 좋습니다.<br/>
							</p><br/>
							<p><b>2. 사용방법</b><br/>
							ibsheet.cfg 파일에서 "UseJsonAttribute" 속성 값을 true로 설정하면 예약어 기능을 사용할 수 있으며 
							다음과 같이 응용하여 적용할 수 있습니다.
<pre>
<code class="language-javascript">
// ex) 성능이 느린 방법
function mySheet_OnSearchEnd(code,msg){
	var sr = mySheet.GetDataFirstRow(),lr = mySheet.GetDataLastRow();
	for(var i=sr;i<=lr;i++){
		//가령 CheckD 컬럼이 값이 3인 경우 배경색을 바꾸고, Flag 컬럼의 편집불가로 한다.
		if( mySheet.GetCellValue( i , "CheckD" ) == "3"){
			mySheet.SetRowBackColor(i, "#FFDDEE");
			mySheet.SetCellEditable(i, "Flag" , 0);
		}
	}
}

// 성능이 좋은 방법
function mySheet_OnLoadData(json){
	var jsonObj = $.parseJSON(json); // json문자를 object화 한다.
	var data = jsonObj["Data"];
	for(var i=0;i&lt;data.length;i++){
		if(data[i]["CheckD"] == "3"){
			data[i]["BackColor"] = "#FFDDEE";
			data[i]["Flag#Edit"] = 0;
		}
	}
	return jsonObj; 
}

</code>
</pre>
							<p><b>3. 지원속성</b><br/>
							<div style="width:100%; border:solid 0px blue;">
								<div style="width:49%; float:left;">
									<header class="area-subtitle"> 
										<p style="float:left; margin : 0 0 0 10px; ">행단위</p>
									</header>
									<div class="area-panel">
										<div class="panel-ch">
											<div style="height:480px;">
												<div id="ibsheetArea1"></div>
											</div>
										</div>
									</div><br/>
								</div>
								<div style=" width:49%; margin : 0 0 0 1px; float: right;">
									<header class="area-subtitle"> 
										<p style="float:left; margin : 0 0 0 10px; ">셀단위</p>
									</header>
									<div class="area-panel">
										<div class="panel-ch">
											<!-- class="sheetSec"  -->
											<div style="height:480px;">
												<div id="ibsheetArea2"></div>
											</div>
										</div>
									</div><br/>
								</div>
							</div>
							</p>
						</div><br/>
						
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
	</body>
</html>