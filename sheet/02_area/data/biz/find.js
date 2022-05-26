//시트 높이 계산용
var pageheightoffset = 250;


$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	createIBSheet2("ibsheetArea2", "mySheet2", "100%", "100%");
	
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
	
	objSht.DoSearch("./data/find_data.js");
}




function doAction(sAction) {
	switch(sAction) {
		case "search" : {
			mySheet.DoSearch("./data/find_data.js");
			break;
		}case "colValueDupRows" : {
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				var nCols = mySheet2.GetSelectCol();
				
				var dupRows = mySheet2.ColValueDupRows(nCols).split(",");
				for(var i=0; i<dupRows.length; i+=1){
					mySheet2.SetCellBackColor(dupRows[i], nCols, "#FFA7A7");
				}
				$().showNotification('top','right', ((nCols+1)+'열 중복데이터 체크.'));
			}
			break;
		}case "findDialog" :{
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				mySheet.ShowFindDialog();
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
