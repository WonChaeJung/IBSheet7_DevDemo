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
	
	var dragmode = 1,
		dragcell = 1;
	
	
	console.log(dragcell);
	var initSheet = {};
	initSheet.Cfg = {
		SearchMode:smLazyLoad,
		Page:50,
		AutoFitColWidth:"",
		GroupRow : 1,
		UseHeaderActionMenu : 1,
		UseGroupActionMenu : 1
	};
	
	initSheet.Cols = [
		{Header:"NO","Type":"Text","SaveName":"pono","Width":50,"Align":"Center"},
		{Header:"출발일자","Type":"Text","SaveName":"esd","Width":120,"Align":"Center"},
		{Header:"도착일자","Type":"Text","SaveName":"lsd","Width":120,"Align":"Center"},
		{Header:"용량","Type":"Text","SaveName":"qty","Width":80, GroupSumType:"Sum", NumberSort : 1},
		{Header:"출발지점","Type":"Text","SaveName":"origin","Width":60,"Align":"Center"},
		{Header:"도착지점","Type":"Text","SaveName":"destination","Width":60,"Align":"Center"},
		{Header:"화물내용","Type":"Text","SaveName":"itemdesc","Width":160,"Ellipsis":1},
		{Header:"화물상세번호","Type":"Text","SaveName":"containerno","Width":90},
		{Header:"전체용량","Type":"Text","SaveName":"pkgqty","Width":80, GroupSumType:"Sum"}
	];
	IBS_InitSheet(mySheet, initSheet);

	mySheet.FitColWidth();
	//건수 표시줄 (우측하단)
	mySheet.SetCountPosition(4);

	
	//그룹 기능 사용 
	mySheet.SetCountFormat("[BOTTOMDATA/SEARCHROWS]");
	mySheet.SetGroupActionMenu("그룹 저장|그룹 저장 취소", "_ibSaveGroupCols|_ibResetGroupCols");
	
	doAction('search');
}

function comma(num){
    var len, point, str; 
    num = num + ""; 
    point = num.length % 3 ;
    len = num.length; 
    str = num.substring(0, point); 
    while (point < len) { 
        if (str != "") str += ","; 
        str += num.substring(point, point + 3); 
        point += 3; 
    } 
    return str;
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


function mySheet_OnGroupStart(Cols) {
	var fnName = arguments.callee.name.split("_");
	
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : Col : "+Cols);
	}
}

function mySheet_OnGroupFinish(Group) {
	var fnName = arguments.callee.name.split("_")
	
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : Col: " + Group.split("|").join(","));
	}
}

function doAction(sAction) {
	switch(sAction) {
		case "search" : {
			mySheet.DoSearch("./data/grouping_data.js");
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

