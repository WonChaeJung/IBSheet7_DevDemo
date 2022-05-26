$(document).ready(function(){
	createIBSheet3("ibsheetArea", "mySheet", "100%", "100%");
	createIBSheet3("ibsheetArea2", "mySheet2", "100%", "100%");
	LoadPage();
})

var actionMenu = [
	{"Text" : "메뉴01", "Code" : "01"}, 
	{"Text" : "메뉴02", "Code" : "02"},
	{"Text" : "메뉴02", "Code" : "03"}
];


/*Sheet 기본 설정 */
function LoadPage() {
	var initSheet = {
		Cfg : {
			SearchMode:smLazyLoad,
			UseHeaderActionMenu : 1,
			UseGroupActionMenu : 1,
			MergeSheet:msHeaderOnly
		},
		HeaderMode : { Sort : 1, ColMove : 1, ColResize : 1, HeaderCheck : 1 },
		Cols : [
			{Header:"종목코드3",Type:"Text",Width:65, SaveName:"param1",Align:"Center"   },
			{Header:"종목명",	Type:"Text",Width:65, SaveName:"param2",Align:"Center"  },
			{Header:"구분",	Type:"Combo",Width:55, SaveName:"param3" ,ComboText:"매도|매수",ComboCode:"00|01"},
			{Header:"체결일",Type:"Combo",Width:55, SaveName:"param4" ,ComboText:"당일|익일|특정일|특정일까지",ComboCode:"00|01|02|03"},
			{Header:"체결\n조건",Type:"Text",Width:55, SaveName:"param5" },
			{Header:"수량",Type:"Int",Width:80, SaveName:"param6" ,Format:"Integer", ActionMenu : actionMenu},
			{Header:"가격",Type:"Text",Width:55, SaveName:"param7" },
			{Header:"협상대상",Type:"Combo",Width:70, SaveName:"param8" ,ComboText:"수량|가격|가격,수량",ComboCode:"00|01|02"},
			{Header:"협상여부",Type:"Combo",Width:70, SaveName:"param9" ,ComboText:"미협상|협상중|협상완료",ComboCode:"00|01|02"},
			{Header:"최대\n참여",Type:"Text",Width:40, SaveName:"param10" },
			{Header:"현재참여",Type:"CheckBox",Width:80, SaveName:"param11",Align:"Center" },
			{Header:"협상\n참여",Type:"Text",Width:40, SaveName:"param12",Align:"Center"}
		]
	};
		
	IBS_InitSheet(mySheet, initSheet);
	IBS_InitSheet(mySheet2, initSheet);
	
	mySheet.FitColWidth();
	mySheet.ShowGroupRow();
	
	doAction('search', "mySheet");
	doAction('actionMenu', "mySheet");
	
	doAction('search', "mySheet2");
	doAction('actionMenu2', "mySheet2");
	
	
}


// 일반 설정
function doAction(sAction, strId) {
	var sheetObj = window[strId];
	
	switch(sAction) {
		case "search":
			sheetObj.DoSearch("./data/context_menu_data.js");
			break;
		case "reload":
			sheetObj.RemoveAll();
			break;
		case "actionMenu" : {
			var Text = "입력|행복사|*-|행삭제|Clear|엑셀다운로드|오름차순|내림차순";
			var Code = "Ins|Copy||Del|Clear|Download|_ibColSortAsc|_ibColSortDesc";
			sheetObj.SetActionMenu(Text, Code);
		}
		case "actionMenu2" : {
		// JSON 객체 계층구조설정
		var Menu = [
			{
				Text: "입력", Code: "Ins", 
				Items : [
					{ Text: "첫행입력", Code: "Fins"},
					{ Text: "마지막행입력", Code: "Lins"}
				]
			},
			{Text: "행복사", Code: "Copy"},
			{Text: "*-"},
			{Text: "행삭제", Code: "Delete"},
			{Text: "Clear", Code: "Clear"},
			{Text: "엑셀다운로드", Code: "Download"}
		];
			sheetObj.SetActionMenu(Menu);
		}
	}
}

function mySheet_OnSelectMenu(Text, Code){
	console.log(Text, Code);
	// text 또는 code값으로 Action수행
	switch(Code) {
		case "Ins" : 
			mySheet.DataInsert(0);
			break; 
		Default :
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