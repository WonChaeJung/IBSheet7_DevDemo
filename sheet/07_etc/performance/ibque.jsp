<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="/sheet/common/layout/common-doctype-taglib.jspf"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@ include file="/sheet/common/layout/common-script.jsp"%>
		<script type="text/javascript" src="./biz/ibque.js"></script>
		<title>IBSheet7-Product</title>
	</head>
	<body>
		<%@ include file="/sheet/common/layout/leftMenu.jsp" %>
		<div id="contents" class="workarea">
			<div class="container">
				<header class="wrap-mainheader">
					<h4>기타 > 성능개선 > <b>IBQueue</b></h4>
				</header>
				<div class="wrap-maincontents">
					<div class="content-annina">
						<div class="entry-content">
							<blockquote>IBQueue를 통해 시트를 생성함으로써 다수 시트의 생성 시간을 개선시킬 수 있습니다.</blockquote>
							<h2>다수의 시트를 생성할 때 의 생성 문제</h2>
							<p>
							하나의 시트 객체가 생성되는 데 걸리는 시간은 약 0.15초 입니다.<br/>
							그런데 시트 객체는 기본적으로 동기형태로 생성되기 때문에 여러개의 시트를 사용하는 화면에서는 그만큼 페이지 오픈시 많은 시간이 소요 됩니다.<br/> 
							가령 10개 시트를 사용하는 화면을 오픈한다면 적어도 1.5초에서 2초 가량을 시트 생성에만 사용하게 됩니다.<br/>
							따라서 이렇게 여러개의 시트를 사용하는 화면에서는 큐를 통해 비동기형태로 생성하는 방법을 제공합니다.<br/>
							방법은 아래와 같습니다.<br/>
							</p>
<pre>
<code class="language-javascript">// 1. 메뉴명만 설정할 경우
var initSheet2 = {};
initSheet2.Cfg =  { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:1, DataRowMerge:1 };

initSheet2.Cols = [
{Header:"NO","Type":"Seq","Hidden":0,"Width":30,"Align":"Center","ColMerge":1,"SaveName":"sSeq"},
{Header:"상태","Type":"Status","Hidden":1,"SaveName":"sStatus"},
{Header:"사원번호","Type":"Text","Hidden":1,"Width":80,"Align":"Left","SaveName":"사원번호S2","ColMerge":1,"EditLen":8},
{Header:"이수구분","Type":"Combo","Hidden":0,"Width":100,"Align":"Left","SaveName":"이수구분","ColMerge":1},

//시트 생성 함수를 Queue에 담는다.
IBQueue.AddItem({
    context : window,
method : IBS_InitSheet, 
// InitColumns에 대한 설정을 여기서 하면 됩니다. 
//IBS_InitSheet에서 InitColumns설정을 하므로 이 함수를 method에 설정 
//하면 됩니다.
    params : [mSheet2,initSheet2], // IBS_InitSheet에 parameter 값을 설정 합니다.
callback : function(obj) {
//시트 생성외의 다른 로직을 추가 합니다.
//예) mSheet2.SetPagingPosition(0);
// mSheet2.SetCountPosition(0);

    }
});

var initSheet3 = {};
initSheet3.Cfg = { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:1, DataRowMerge:1 };
initSheet3.Cols = [
{Header:"NO","Type":"Seq","Hidden":0,"Width":30,"Align":"Center","ColMerge":1,"SaveName":"sSeq"},
{Header:"상태","Type":"Status","Hidden":1,"SaveName":"sStatus"},
{Header:"사원번호","Type":"Text","Hidden":1,"Width":80,"Align":"Left","SaveName":"사원번호S3","ColMerge":1,"EditLen":8},
{Header:"일련번호","Type":"Text","Hidden":1,"Width":60,"Align":"Left","SaveName":"일련번호","ColMerge":1,"EditLen":100},
{Header:"가족관계","Type":"Combo","Hidden":0,"Width":70,"Align":"Left","SaveName":"가족관계","ColMerge":1},
  .......
]; 


//시트 생성 함수를 Queue에 담는다.
IBQueue.AddItem({
        context : window,
        method : IBS_InitSheet, 
        params : [mSheet3,initSheet3], 
        callback : function(obj) {
        }
});
    
    
//Queue에 담았던 시트를 실행한다. (모두 비동기 형태로 한꺼번에 실행된다.)
IBQueue.Start(function() {
//시트를 그리면서 조회를 하고자 할 경우 callback에서 처리
//예) doAction("search");
});

</code>
</pre>
						<!-- <h2>샘플</h2> -->
						</div><br/>
					</div>
				</div>
				<%@ include file="/sheet/common/layout/footer.jsp" %>
			</div>
		</div>
	</body>
</html>