//시트 높이 계산용
var pageheightoffset = 250;
var cnt = 0;

$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	LoadPage();
	
	$('#test123').click(function() {
		events = 0;
		$("#eventLog").val('');
	});

})

/*Sheet 기본 설정 */
function LoadPage() {
	//시트 초기화
	mySheet.Reset();
	
	var initSheet = {
			Cfg : {
				SearchMode:smLazyLoad,
				Page:30
			},
			Cols : [
				{Header:"NO",Type:"Seq",Width:40 ,	SaveName:"SEQ",Align:"Center"},
				{Header:"차량명",Type:"Text",Width:165,	SaveName:"NAME" , Filter : 0},
				{Header:"특징",Type:"Text",Width:105,SaveName:"SUBJECT"},
				{Header:"연식",Type:"Int",Width:60,SaveName:"YEAR",Format:"####년",Align:"Center"},
				{Header:"가격",Type:"Int",Width:70,SaveName:"PRICE",Format:"#,###만원",Align:"Center"},
				{Header:"사용거리",Type:"Int",Width:70,	SaveName:"DISTANCE",Format:"#,##0Km",Align:"Center"},
				{Header:"사고유무",Type:"Combo",Width:50,	SaveName:"ACCIDENT",ComboText:"무사고|사고",ComboCode:"0|1",Align:"Center"},
				{Header:"판매자",Type:"Text",Width:55,	SaveName:"DEALER"	,Align:"Center"},
				{Header:"등록일자",Type:"Date",Width:100,SaveName:"CDATE" ,Format:"Ymd",Align:"Center"},
				{Header:"조회수",Type:"Int",Width:50,SaveName:"COUNT"}
			]
		};
		
		IBS_InitSheet(mySheet, initSheet);
		
		mySheet.FitColWidth();
		
		//Filter 헤더 추가
		mySheet.ShowFilterRow();
		
		//건수 표시줄 제거
		mySheet.SetCountPosition(0);
		
	doAction('search');
}

function columnSort(){
	if(_ibsUtil["sortOrder"] == undefined || _ibsUtil["sortOrder"] == false){
		_ibsUtil["sortOrder"] = 1;
		mySheet.ColumnSort(1, "DESC");
	}else{
		_ibsUtil["sortOrder"] = 0;
		mySheet.ColumnSort(1, "ASC");
	}
}

function btnCheck(obj){
	if(_ibsUtil[obj.id] == undefined || _ibsUtil[obj.id] == false){
		_ibsUtil[obj.id] = 1;
		$("#"+obj.id).css("background-color", "#A6A6A6");
	}else{
		_ibsUtil[obj.id] = 0;
		$("#"+obj.id).css("background-color", "");
	}
}


function mySheet_OnChangeFilter() {
	var fnName = arguments.callee.name.split("_")
	
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          이벤트 발생");
	}
}

function mySheet_OnFilterEnd(RowCnt, FirstRow) {
	var fnName = arguments.callee.name.split("_")
	
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : RowCnt: " + RowCnt+", FirstRow : "+FirstRow);
	}
}

function doAction(sAction) {
	switch(sAction) {
		case "search" : {
			mySheet.DoSearch("./data/filtering_data.js");
			break;
		}
	}
}

function addLog(log) {
	var prevLog = $("#eventLog").val();
	$("#eventLog").val(prevLog + "[" + (cnt+=1) + "] " + log + "\n");
	$("#eventLog").scrollTop($("#eventLog")[0].scrollHeight);
};  

(function($, window) {
	var init_fn_flag = false;
	var init_fn = (function() {
		if (init_fn_flag)
			return;
		init_fn_flag = true;
		 hljs.configure({"tabReplace":"    "});
		$('pre code').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	});
	$(document).ready(init_fn);
	$(window).on("load", init_fn);
})(jQuery, window);

