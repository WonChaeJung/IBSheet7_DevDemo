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
	
		var initData = {
		Cfg : {
			SearchMode : smLazyLoad,
			ChildPage : 10,
			MergeSheet : msAll,
			TreeNodeIcon : 1,
			// DragMode : 1,
			DeferredVScroll : 1
		},
		Cols : [
			/*
			{Header:"상태",Type:"Status", Align:"Center",  ColMerge : 0},
			{Header:"삭제",Type:"DelCheck", Align:"Center", ColMerge : 0},
			{Header:"구/동",Type:"Text", Width:250, TreeCheck:chk, TreeCol:1, CheckSaveName : "ChkSaveName", SaveName : "sigudong",  ColMerge : 0, LevelSaveName: "LevelSaveNameTEST"},
			{Header:"우편번호",Type:"Text", Width:65, Align:"Center",  Format:"PostNo", SaveName : "zipCode", ColMerge : 0},
			{Header:"주소",Type:"Text", Width:370, Align:"Left",MultiLineText:1, SaveName : "addr", ColMerge : 0},
			{Header:"트리\n레벨",Type:"Int", Width:40, Align:"Center", SaveName : "lev"}
			*/
			{Header:"상태|상태",Type:"Status", Align:"Center",  ColMerge : 0},
			{Header:"삭제|삭제",Type:"DelCheck", Align:"Center", ColMerge : 0},
			{Header:"구/동|구/동",Type:"Text", Width:250, TreeCheck:1, TreeCol:1, CheckSaveName : "ChkSaveName", SaveName : "sigudong",  ColMerge : 0, LevelSaveName: "LevelSaveNameTEST", ActionMenu : ["A", "B", "C"]},
			{Header:"팀원\n평가자조직|팀원\n평가자조직",
				Type:"CheckBox",
				Hidden:0,
				Width:70,
				Align:"Center",
				ColMerge:0,
				SaveName:"memberYn",
				KeyField:0,
				Format:"",
				PointCount:0,
				UpdateEdit:1,
				InsertEdit:1,
				EditLen:2,
				TrueValue:"Y",
				FalseValue:'N'
			},
			{Header:"우편번호|번호",Type:"Text", Width:65, Align:"Center",  Format:"PostNo", SaveName : "zipCode", ColMerge : 0},
			{Header:"주소|주소",Type:"Text", Width:370, Align:"Left",MultiLineText:1, SaveName : "addr", ColMerge : 0, ActionMenu : [{"Text" : "MenuA", "Code" : "A"}, {"Text" : "MenuB", "Code" : "B"}]},
			{Header:"트리\n레벨|레벨",Type:"Int", Width:40, Align:"Center", SaveName : "lev"}
		]
	};
	
	IBS_InitSheet(mySheet, initData);
	
	//트리컬럼 체크박스 사용시 어미/자식 간의 연관 체크기능 사용
	mySheet.SetTreeCheckActionMode(1); 
	
	mySheet.SetEditable("1");
	mySheet.SetVisible(true);
	mySheet.SetCountPosition(4);
	
	mySheet.SetTreeActionMode("1")
	mySheet.SetTreeCheckActionMode("1");
	
	mySheet.FitColWidth();
	
	doAction('search');
}

function mySheet_OnAfterExpand(Row, Expand) {
	var fnName = arguments.callee.name.split("_");
	
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : Row : " + Row+" Expand : "+ Expand);
	}
}

function mySheet_OnBeforeExpand(Row, Expand) {
	var fnName = arguments.callee.name.split("_");
	
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : Row : " + Row+" Expand : "+ Expand);
	}
}

function mySheet_OnTreeCheckChange(Row, Col, Value, Level, HasChild) {
	var fnName = arguments.callee.name.split("_");
	
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : Row : " + Row+" Col : "+ Col+" Value : "+ Value+" Level : "+ Level+" HasChild : "+ HasChild);
	}
}

function mySheet_OnTreeChild(Row){
	var fnName = arguments.callee.name.split("_");
	
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : Row : " + Row);
	}
}

function doAction(sAction) {
	switch(sAction) {
		case "search" : {
			mySheet.DoSearch("./data/tree_data.js");
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

