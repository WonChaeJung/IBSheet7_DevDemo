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
	
	if(_ibsUtil["BtnDragMode"]){
		dragmode = !_ibsUtil["BtnDragMode"];
	}

	if(_ibsUtil["BtnDragCell"]){
		dragcell = !_ibsUtil["BtnDragCell"];
	}
	
	console.log(dragcell);
	var initSheet = {
		Cfg : {
			SearchMode:smLazyLoad,
			Page:50,
			DragMode : dragmode,
			DragCell : dragcell,
			SelectionSummary : "EmptyCell|DelRow",
			MergeSheet:msHeaderOnly
		},
		Cols : [
			{Header:"종목코드",Type:"Text",Width:65, SaveName:"param1",Align:"Center"   },
			{Header:"종목명",	Type:"Text",Width:65, SaveName:"param2",Align:"Center"  },
			{Header:"구분",	Type:"Combo",Width:55, SaveName:"param3" ,ComboText:"매도|매수",ComboCode:"00|01"},
			{Header:"체결일",Type:"Combo",Width:55, SaveName:"param4" ,ComboText:"당일|익일|특정일|특정일까지",ComboCode:"00|01|02|03"},
			{Header:"체결\n조건",Type:"Text",Width:55, SaveName:"param5" },
			{Header:"수량",Type:"AutoSum",Width:80, SaveName:"param6" ,Format:"Integer"},
			{Header:"가격",Type:"Text",Width:55, SaveName:"param7" },
			{Header:"협상대상",Type:"Combo",Width:70, SaveName:"param8" ,ComboText:"수량|가격|가격,수량",ComboCode:"00|01|02"},
			{Header:"협상여부",Type:"Combo",Width:70, SaveName:"param9" ,ComboText:"미협상|협상중|협상완료",ComboCode:"00|01|02"},
			{Header:"최대\n참여",Type:"Text",Width:40, SaveName:"param10" },
			{Header:"현재참여",Type:"CheckBox",Width:80, SaveName:"param11",Align:"Center" },
			{Header:"협상\n참여",Type:"Text",Width:40, SaveName:"param12",Align:"Center"}
		]
	};
		
	IBS_InitSheet(mySheet, initSheet);
	
	mySheet.FitColWidth();
	
	doAction('search');
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


function mySheet_OnDragStart(Row, Col){
	var fnName = arguments.callee.name.split("_");
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : " + Row+"행, "+Col+"열");
	}
}

function mySheet_OnDropEnd(FromSheet, FromRow, ToSheet, ToRow, X, Y, Type){
	var fnName = arguments.callee.name.split("_");
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : " +" 시트 위치 >> "+FromSheet.id+"("+FromRow+"행), "+ "종료 위치 >> " + ToSheet.id +"("+ ToRow + "행), x좌표 : " + X + ", y좌표 : " + Y );
	}
}

//드래그 셀의 Value를 드랍위치 셀에 설정한다
function mySheet_OnCellDropEnd(FromSheet, FromRow, FromCol, ToSheet, ToRow, ToCol) {
	var fnName = arguments.callee.name.split("_");
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : 시작 위치 >> " + FromSheet.id+"("+FromRow+"행, "+FromCol+"열) 종료위치 >>"+ ToSheet.id + ToRow + "(행, " + ToCol + "열)");
	}
}

function mySheet_OnClick(Row, Col, Value){
	var fnName = arguments.callee.name.split("_");
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : " + Row+"행, "+Col+"열");
	}
}

function mySheet_OnSelectEnd(Rows, Cols) {
	var fnName = arguments.callee.name.split("_");
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : 선택된 행 >> " + Rows+" 선택된 열 >> "+Cols);
	}
}
 
function mySheet_OnButtonClick(Row, Col) {
	var fnName = arguments.callee.name.split("_");
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : ("+Row+","+Col+")셀  버튼 클릭");
	}
}
	 
function mySheet_OnDblClick(Row, Col, Value, CellX, CellY, CellW, CellH) {    
	var fnName = arguments.callee.name.split("_");
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : " + Row+"행, "+Col+"열");
	}
}

function mySheet_OnMouseDown(Button, Shift, X, Y) {
	var fnName = arguments.callee.name.split("_");
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : " + mySheet.MouseRow()+"행, "+mySheet.MouseCol()+"열");
	}
}
 
function mySheet_OnMouseUp(Button, Shift, X, Y) {
	var fnName = arguments.callee.name.split("_");
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : " + mySheet.MouseRow()+"행, "+mySheet.MouseCol()+"열");
	}
}

function mySheet_OnMouseMove(Button, Shift, X, Y){
	var fnName = arguments.callee.name.split("_"),
		btnType = Button == 0 ? "왼쪽" : "오른쪽",
		shiftType = Shift == 1 ? "Shift키" : Shift == 2 ? "Ctrl키" : "그외";
	
	// console.log(arguments);
	if(fnName.length > 1){
		fnName = fnName[1];
	}
	if(!_ibsUtil[fnName]){
		addLog("이벤트명 : " + fnName + "          인자 값 : " + btnType+"키, "+shiftType+"키"+ X + Y);
	}
}



function doAction(sAction) {
	switch(sAction) {
		case "search" : {
			mySheet.DoSearch("./data/getdata_data.js");
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

