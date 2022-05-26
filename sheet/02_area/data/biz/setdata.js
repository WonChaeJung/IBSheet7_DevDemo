
$(document).ready(function(){
	createIBSheet3("ibsheetArea", "mySheet", "100%", "100%");
	createIBSheet3("ibsheetArea2", "mySheet2", "100%", "100%");
	
	LoadPage("mySheet");
	LoadPage("mySheet2");
})

/*Sheet 기본 설정 */
function LoadPage(strSht){
	
	var objSht = window[strSht];
	
	//시트 초기화
	var initSheet = {
		Cfg : {
			SearchMode:smLazyLoad,
			MergeSheet:msHeaderOnly
		},
		HeaderMode : {Sort : 0, ColMove : 0, ColResize : 0, HeaderCheck : 0},
		Cols : [
			{Header:"종목코드",Type:"Text",Width:65, SaveName:"param1",Align:"Center"},
			{Header:"종목명",	Type:"Text",Width:65, SaveName:"param2",Align:"Center"},
			{Header:"체결\n조건",Type:"Text",Width:55, SaveName:"param5" },
			{Header:"수량",Type:"Text",Width:80, SaveName:"param6" ,Format:"Integer"},
			{Header:"가격",Type:"Text",Width:55, SaveName:"param7" },
			{Header:"최대\n참여",Type:"Text",Width:40, SaveName:"param10" },
			{Header:"협상\n참여",Type:"Text",Width:40, SaveName:"param12",Align:"Center"}
		]
	};
		
	IBS_InitSheet(objSht, initSheet);
	
	objSht.FitColWidth();
	
	objSht.DoSearch("./data/setdata_data.js");
}


function doAction(sAction, strSheet) {
	
	var nRow = mySheet.GetSelectRow(),
		nCol = mySheet.GetSelectCol();
	
	switch(sAction) {
		case "reload" : {
			mySheet.Reset();
			LoadPage("mySheet");
			break;
		}case "setCellValue" : {
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				mySheet.SetCellValue(nRow, nCol, nRow+" , "+nCol);
				$().showNotification('top','right', (nRow+1)+'행'+(nCol+1)+'열 값이 변경 되었습니다.');
			}
			break;
		}case "setRowData": {
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				
				var tmpRowData = mySheet.GetRowData(0);
				var nTmp = 0;
				for(var i in tmpRowData){
					tmpRowData[i] = nRow+" , "+(++nTmp);
				}
				mySheet.SetRowData(nRow, tmpRowData);
				
				$().showNotification('top','right', (nRow+1)+"행의 값이 변경되었습니다.");
			}
			break;
		}case "loadSearchData1": {
			var objJson = mySheet2.GetSearchData("./data/setdata_data.js");
			mySheet2.LoadSearchData(objJson);
			break;
		}case "loadSearchData2": {
			var objJson = mySheet2.GetSearchData("./data/setdata_data2.js");
			mySheet2.LoadSearchData(objJson);
			break;
		}case "loadSearchData3": {
			var objJson = mySheet2.GetSearchData("./data/setdata_data3.js");
			mySheet2.LoadSearchData(objJson);
			break;
		}default : {
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
