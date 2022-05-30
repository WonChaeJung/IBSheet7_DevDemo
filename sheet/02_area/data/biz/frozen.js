//시트 높이 계산용
var pageheightoffset = 250;


$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	_sheetCFG["Cfg"]["AutoFitColWidth"] = "";
	LoadPage();
})

/*Sheet 기본 설정 */
function LoadPage() {
	//시트 초기화
	mySheet.Reset();
	
	var initSheet = {
		Cfg : {
			SearchMode:smLazyLoad,
			Page:50,
			SelectionSummary : "EmptyCell|DelRow",
			MergeSheet:msHeaderOnly
		},
		Cols : [
			{Header:"종목코드",Type:"Text",Width:175, SaveName:"param1",Align:"Center"   },
			{Header:"종목명",	Type:"Text",Width:175, SaveName:"param2",Align:"Center"  },
			{Header:"구분",	Type:"Combo",Width:115, SaveName:"param3" ,ComboText:"매도|매수",ComboCode:"00|01"},
			{Header:"체결일",Type:"Combo",Width:115, SaveName:"param4" ,ComboText:"당일|익일|특정일|특정일까지",ComboCode:"00|01|02|03"},
			{Header:"체결\n조건",Type:"Text",Width:115, SaveName:"param5" },
			{Header:"수량",Type:"AutoSum",Width:140, SaveName:"param6" ,Format:"Integer"},
			{Header:"가격",Type:"Text",Width:155, SaveName:"param7" },
			{Header:"협상대상",Type:"Combo",Width:180, SaveName:"param8" ,ComboText:"수량|가격|가격,수량",ComboCode:"00|01|02"},
			{Header:"협상여부",Type:"Combo",Width:180, SaveName:"param9" ,ComboText:"미협상|협상중|협상완료",ComboCode:"00|01|02"},
			{Header:"최대\n참여",Type:"Text",Width:170, SaveName:"param10" },
			{Header:"현재참여",Type:"CheckBox",Width:170, SaveName:"param11",Align:"Center" },
			{Header:"협상\n참여",Type:"Text",Width:70, SaveName:"param12",Align:"Center"}
		]
	};
		
	IBS_InitSheet(mySheet, initSheet);
	
	// mySheet.FitColWidth();
	
	doAction('search');
}

function doAction(sAction) {
	switch(sAction) {
		case "reload" : {
			LoadPage();
		}
		case "search" : {
			mySheet.DoSearch("./data/getdata_data.js");
			break;
		}case "frozenRow" : {
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				mySheet.SetFrozenRows(3);
			}
			break;
		}case "frozenCol":
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				// $().showNotification('top','right', '선택된 셀의 값은 ' + mySheet.GetCellValue(mySheet.GetSelectRow(), mySheet.GetSelectCol()) + ' 입니다.');
				mySheet.SetFrozenCol(3);
			}
			break;
	}
}

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
