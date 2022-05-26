//시트 높이 계산용
var pageheightoffset = 250;


$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	createIBSheet2("ibsheetArea2", "mySheet2", "100%", "100%");
	createIBSheet2("ibsheetArea3", "mySheet3", "100%", "100%");
	createIBSheet2("ibsheetArea4", "mySheet4", "100%", "100%");
	createIBSheet2("ibsheetArea5", "mySheet5", "100%", "100%");
	
	LoadPage("mySheet");
	LoadPage("mySheet2");
	LoadPage("mySheet3");
	LoadPage("mySheet4");
	LoadPage("mySheet5");
})

/*Sheet 기본 설정 */
function LoadPage(sheetId) {
	
	var objSht = window[sheetId]; 
	
	var initSheet = {
		Cfg : {
			SearchMode:smLazyLoad,
			Page:50,
			SelectionSummary : "EmptyCell|DelRow",
			MergeSheet:msHeaderOnly
		},
		Cols : [
			{Header:"종목코드",Type:"Text",Width:65, SaveName:"param1",Align:"Center"   },
			{Header:"종목명",	Type:"Text",Width:65, SaveName:"param2",Align:"Center"  },
			{Header:"구분",	Type:"Combo",Width:55, SaveName:"param3" ,ComboText:"매도|매수",ComboCode:"00|01"},
			{Header:"체결일",Type:"Combo",Width:55, SaveName:"param4" ,ComboText:"당일|익일|특정일|특정일까지",ComboCode:"00|01|02|03"},
			{Header:"체결\n조건",Type:"Text",Width:55, SaveName:"param5" },
			{Header:"수량",Type:"Text",Width:80, SaveName:"param6" ,Format:"Integer"},
			{Header:"가격",Type:"Text",Width:55, SaveName:"param7" },
			{Header:"협상대상",Type:"Combo",Width:70, SaveName:"param8" ,ComboText:"수량|가격|가격,수량",ComboCode:"00|01|02"},
			{Header:"협상여부",Type:"Combo",Width:70, SaveName:"param9" ,ComboText:"미협상|협상중|협상완료",ComboCode:"00|01|02"},
			{Header:"최대\n참여",Type:"Text",Width:40, SaveName:"param10" },
			{Header:"현재참여",Type:"CheckBox",Width:80, SaveName:"param11",Align:"Center" },
			{Header:"협상\n참여",Type:"Text",Width:40, SaveName:"param12",Align:"Center"}
		]
	};
		
	IBS_InitSheet(objSht, initSheet);
	
	objSht.FitColWidth();
	
	doAction('search', sheetId);
	
}



function doAction(sAction, sheetId) {
	var objSht = window[sheetId],
		__row = objSht.GetSelectRow();
	switch(sAction) {
		case "reload" : {
			objSht.Reset();
			// objSht.SetTheme("WHM","ModernWhite");
			LoadPage(sheetId);
			break;
		}
		case "search" : {
			objSht.DoSearch("./data/row_unit_data.js");
			break;
		}case "insert" : {
			if(objSht.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				
				$().showNotification('top','right', objSht.DataInsert() + '행 위치에 추가');
			}
			break;
		}case "delete" : {
			if(objSht.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				objSht.RowDelete();
				$().showNotification('top','right',  __row + '행 삭제');
			}
			break;
		}case "rowHidden" : {
			if(objSht.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				objSht.SetRowHidden(__row, 1);
				$().showNotification('top','right',  __row + '행 숨김 처리.');
			}
			break;
		}case "editable1" : {
			if(objSht.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				objSht.SetRowEditable(__row, 0);
			}
			break;
		}case "editable2" : {
			if(objSht.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				objSht.SetRowEditable(__row, 1);
			}
			break;
		}case "dataRowHeight" : {
			objSht.SetDataRowHeight(50);
			$().showNotification('top','right',  "행 높이 45px으로 변경");
			break;
		}
		case "setRowHeight":
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				objSht.SetRowHeight(__row-1, 30);
				$().showNotification('top','right',  __row + '행의 높이 30px으로 변경');
			}
			break;
		case "setRowFontColor":
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				objSht.SetRowFontColor(__row, "#5F00FF");
				$().showNotification('top','right',  __row + "행의 글자색 #ffeede변경");
			}
			break;
		case "setRowBackColor":
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				objSht.SetRowBackColor(__row, "#EF90FF");
				$().showNotification('top','right',  __row + "행의 배경 #ffeede변경");
			}
			break;
		case "setRowData": {
			if(objSht.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				
				var tmpRowData = objSht.GetRowData(0);
				var nTmp = 0;
				for(var i in tmpRowData){
					tmpRowData[i] = __row+" , "+(++nTmp);
				}
				objSht.SetRowData(__row, tmpRowData);
				
				$().showNotification('top','right', (__row+1)+"행의 값이 변경되었습니다.");
			}
			break;
		}case "dataMoveUp": {
			if(objSht.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				objSht.DataMove(__row-1, __row);
			}
			break;
		}case "dataMoveDown": {
			if(objSht.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				objSht.DataMove(__row+2, __row);
			}
			break;
		}case "dataCopy": {
			if(objSht.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				// objSht.SetCellValue(objSht.DataCopy(), "Status", "R");
				$().showNotification('top','right', (objSht.DataCopy()+1)+"행의 데이터 복사되었습니다.");
			}
			break;
		}
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
