//시트 높이 계산용
var pageheightoffset = 250;


$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
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
			{Header:"승인순번",Type:"Text",Width:65, SaveName:"CONFM_SN",Align:"Center"   },
			{Header:"선정기관명",	Type:"Text",Width:65, SaveName:"SLCTN_INSTT_NM",Align:"Center"  },
			{Header:"승인번호",Type:"Text",Width:55, SaveName:"CONFM_NO" },
			{Header:"승인일자",Type:"Text",Width:55, SaveName:"CONFM_DE" },
			{Header:"업종구분코드",Type:"Text",Width:40, SaveName:"INDUTY_SE_CODE" },
			{Header:"업종구분명",Type:"Text",Width:40, SaveName:"INDUTY_SE_NM",Align:"Center"},
			{Header:"선정업체명",Type:"Text",Width:40, SaveName:"SLCTN_CO_NAME",Align:"Center"},
			{Header:"대표자명",Type:"Text",Width:40, SaveName:"RPRSNTV_NM",Align:"Center"},
			{Header:"시도 시군구명",Type:"Text",Width:40, SaveName:"CTY_GUN_NM",Align:"Center"},
			{Header:"주소",Type:"Text",Width:40, SaveName:"ADDR",Align:"Center"},
			{Header:"선정기관코드",Type:"Text",Width:40, SaveName:"SLCTN_INSTT_CODE",Align:"Center"}
		]
	};
		
	IBS_InitSheet(mySheet, initSheet);
	
	mySheet.FitColWidth();
	
	doAction('search');
}



function doAction(sAction) {
	switch(sAction) {
		case "search" : {
			mySheet.DoSearch("./data/getdata_data.js");
			break;
		}case "getCellValue" : {
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '선택된 셀의 값은 ' + mySheet.GetCellValue(mySheet.GetSelectRow(), mySheet.GetSelectCol()) + ' 입니다.');
			}
			break;
		}case "getRangeValue":
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				var nCols = mySheet.LastCol(),
					nRows = mySheet.LastRow(),
					r1 = Math.floor((Math.random()*(nRows-1)+1)),
					c1 = Math.floor((Math.random()*(nCols-1)+1)),
					r2 = Math.floor((Math.random()*(nRows-1)+1)),
					c2 = Math.floor((Math.random()*(nCols-1)+1));
				
				
				// 랜덤선택
				mySheet.SetSelectRange(r1, c1, r2, c2);
				
				var rows = mySheet.GetSelectionRows().split("|"),
					cols = mySheet.GetSelectionCols().split("|");
				
				r1 = rows[0],
				c1 = cols[0],
				r2 = rows[(rows.length-1)],
				c2 = cols[(cols.length-1)];
			
				$().showNotification('top','right', '선택영역 셀의 값은 ' + mySheet.GetRangeValue(r1, c1, r2, c2) + ' 입니다.');
			}
			break;
		case "getRowData":
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '선택된 행의 값은 ' + JSON.stringify(mySheet.GetRowData(mySheet.GetSelectRow()), null, 4) + ' 입니다.');
			}
			break;
		case "exportData_json":
			$().showNotification('top','right', JSON.stringify(mySheet.ExportData({Type : "json"})));
			break;
		case "exportData_csv":
			$().showNotification('top','right', mySheet.ExportData({Type : "csv"}));
			break;
		case "exportData_xml":
			console.log(mySheet.ExportData({Type : "xml"}).toString());
			$().showNotification('top','right', mySheet.ExportData({Type : "xml"}).toString());
			break;
		case "getSaveJson":
			$().showNotification('top','right', JSON.stringify(mySheet.GetSaveJson("all")));
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
