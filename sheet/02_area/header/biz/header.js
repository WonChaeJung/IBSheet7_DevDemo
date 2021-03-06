//시트 높이 계산용
var pageheightoffset = 250;

$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	LoadPage();
})

/*Sheet 기본 설정 */
function LoadPage() {
	
	var sort = document.all.sort.checked?1:0,
		size = document.all.size.checked?1:0,
		move = document.all.move.checked?1:0,
		check = document.all.check.checked?1:0;
	
	//시트 초기화
	mySheet.Reset();
	
	var initSheet = {
		Cfg : {
			SearchMode:smLazyLoad,
			Page:50,
			SelectionSummary : "EmptyCell|DelRow",
			MergeSheet:msHeaderOnly
		},
		HeaderMode : {
			Sort:sort,
			ColMove:move,
			ColResize:size,
			FitSizeColMode : 0,
			HeaderCheck:check
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

function doAction(sAction) {
	switch(sAction) {
		case "search":
			mySheet.DoSearch("./data/header.xml");
			break;
		case "reload":
			mySheet.RemoveAll();
			break;
	}
}