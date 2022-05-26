$(document).ready(function(){
	createIBSheet3("ibsheetArea", "mySheet", "100%", "100%");
	createIBSheet3("ibsheetArea2", "mySheet2", "100%", "100%");
	createIBSheet3("ibsheetArea3", "mySheet3", "100%", "100%");
	createIBSheet3("ibsheetArea4", "mySheet4", "100%", "100%");
	LoadPage();
})

/*Sheet 기본 설정 */
function LoadPage() {
	var initSheet = {
		Cfg : {
			SearchMode:smLazyLoad,
			MergeSheet:msHeaderOnly
		},
		HeaderMode : { Sort : 1, ColMove : 1, ColResize : 1, HeaderCheck : 1 },
		Cols : [
			{Header:"종목코드3",Type:"Text",Width:65, SaveName:"param1",Align:"Center"   },
			{Header:"종목명",	Type:"Text",Width:65, SaveName:"param2",Align:"Center"  },
			{Header:"체결\n조건",Type:"Text",Width:55, SaveName:"param5" },
			{Header:"수량",Type:"Text",Width:80, SaveName:"param6" },
			{Header:"가격",Type:"Text",Width:55, SaveName:"param7" },
			{Header:"최대\n참여",Type:"Text",Width:40, SaveName:"param10" },
			{Header:"협상\n참여",Type:"Text",Width:40, SaveName:"param12",Align:"Center"}
		]
	};
		
	IBS_InitSheet(mySheet, initSheet);
	
	initSheet["Cfg"]["DragMode"] = 1;
	initSheet["Cfg"]["DragCell"] = 1;
	IBS_InitSheet(mySheet2, initSheet);
	
	mySheet.FitColWidth();
	
	doAction('search', "mySheet");
	doAction('search', "mySheet2");
	
	
	initSheet.Cfg = {
		SearchMode : smLazyLoad,
		Page : 50,
		MergeSheet : msHeaderOnly,
		ChildPage : 10,
		//TreeDragIconMode : 0,
		DragMode : 1
	};
	
	initSheet.Cols = [
		{Header:"",Type:"DummyCheck", SaveName:"chk", Width:35, Align:"Center",Edit:1,HeaderCheck:1},
		{Header:"직급",Type:"Text", SaveName:"sPos", Width:60, Align:"Center"},
		{Header:"성명",Type:"Text", SaveName:"sName", Width:50, Align:"Center",Edit:0},
		{Header:"성별",Type:"Combo", SaveName:"sSex", Width:40, Align:"Center",ComboText:"男|女",ComboCode:"남|여"},
		{Header:"연령대",Type:"Text", SaveName:"sAge2", Width:50, Align:"Center"},
		{Header:"거주지1",Type:"Text", SaveName:"sAddr1", Width:50, Align:"Center"},
		{Header:"나이",Type:"Int", SaveName:"sAge", Width:50, Align:"Right"},
	];
	
	IBS_InitSheet(mySheet3, initSheet);
	
	mySheet3.SetDataAutoTrim(0);
	//mySheet.SetRowHeightMin(46);
	
	//mySheet4.SetTheme("GMT","MainTree");
	
	initSheet.Cols = [
		{Header:"부서/성명",Type:"Text", SaveName:"sName", Width:150, Align:"Left",TreeCol:1},
		{Header:"직급",Type:"Text", SaveName:"sPos", Width:60, Align:"Center",Edit:0},
		{Header:"직급",Type:"Text", SaveName:"sSex", Width:50, Align:"Center"},
		{Header:"직급",Type:"Text", SaveName:"sAge2", Width:50, Align:"Center"},
		{Header:"거주지1",Type:"Text", SaveName:"sAddr1", Width:80, Align:"Center"},
		{Header:"나이",Type:"Int", SaveName:"sAge", Width:50, Align:"Right"},
		{Header:"상태",Type:"Status", SaveName:"sStatus",Hidden:1}
	];
	
	IBS_InitSheet(mySheet4,initSheet);
	mySheet4.SetRowBackColorI("#EDEDED");
	
	mySheet3.DoSearch("./data/tree_move_data.js");
	mySheet4.DoSearch("./data/tree_move_data2.js");
	
	mySheet3.FitColWidth();
	mySheet4.FitColWidth();
	
}

function doAction(sAction, sShtNm) {
	
	var mySheet = window[sShtNm];
	
	switch(sAction) {
		case "search":
			mySheet.DoSearch("./data/header.xml");
			break;
		case "reload":
			mySheet.RemoveAll();
			break;
	}
}

function mySheet2_OnCellDropEnd(Obj, Row, Col, ToObj, ToRow, ToCol) {
	var bValue = ToObj.GetCellValue(ToRow, ToCol);
	var aValue = Obj.GetCellValue(Row, Col);

	if (ToRow < 0) {
		return;
		ToRow = ToObj.DataInsert(ToRow);
		ToCol = ToObj.MouseCol();
	}

	if (ToObj && ToRow > 0 && ToCol >= 0) {
		ToObj.SetCellValue(ToRow, ToCol, aValue);

		if (bValue) {
			Obj.SetCellValue(Row, Col, bValue);
		} else {
			Obj.SetCellValue(Row, Col, "");
		}
	}
}




function mySheet3_OnDropEnd(FromSheet, FromRow, ToSheet, ToRow, X, Y, Type) {
	//같은 시트에서는 데이터이동 안됨.
	if(FromSheet == ToSheet) return;
	
	var rowjson = FromSheet.GetRowData(FromRow);
	
	//행 데이터 복사
	ToSheet.SetRowData(ToRow+1 , rowjson ,{Add:1} );
	
	//원본 데이터 삭제
	FromSheet.RowDelete(FromRow);
	
}



//드레그 드롭 데이터 이동
function mySheet4_OnDropEnd(FromSheet, FromRow, ToSheet, ToRow, X, Y, Type) {
	//드레그 한 행의 데이터를 json형태로 얻음
	var rowjson = FromSheet.GetRowData(FromRow);
	
	var posRow = FromRow;
	if(FromSheet==ToSheet&&ToRow<FromRow){
		//같은 시트내에서 이동은 신경을 써야 함.	
		posRow++;
	}
	
	//드롭 지점의 레벨을 확인
	var lvl = ToSheet.GetRowLevel(ToRow);
	
	//레벨이 부서 이상이면 리턴
	if(lvl<2) return;
	
	//행 데이터 복사(트리임으로 레벨을 고려할 것)
	ToSheet.SetRowData(ToRow+1 , rowjson ,{Add:1,Level:3} );

	//원본 데이터 삭제
	FromSheet.RowDelete(posRow);
	
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