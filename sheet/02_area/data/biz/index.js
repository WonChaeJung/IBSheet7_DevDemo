//시트 높이 계산용
var pageheightoffset = 250;


$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	createIBSheet2("ibsheetArea2", "mySheet2", "100%", "100%");
	
	LoadPage("mySheet");
	LoadPage("mySheet2");
	
	mySheetAction('search');
	mySheet2Action('search');
})

/*Sheet 기본 설정 */
function LoadPage(strId) {
	
	var objSht = window[strId];
	
	//시트 초기화
	//objSht.Reset();
	
	var initSheet = {
		Cfg : {
			SearchMode:smClientPaging,
			Page:20,
			SelectionSummary : "EmptyCell|DelRow",
			MergeSheet:msHeaderOnly
		},
		Cols : [
			{Header:"종목|종목코드",Type:"Text",Width:65, SaveName:"param1",Align:"Center"   },
			{Header:"종목|종목명",	Type:"Text",Width:65, SaveName:"param2",Align:"Center"  },
			{Header:"구분|구분",	Type:"Combo",Width:55, SaveName:"param3" ,ComboText:"매도|매수",ComboCode:"00|01"},
			{Header:"구분|체결일",Type:"Combo",Width:55, SaveName:"param4" ,ComboText:"당일|익일|특정일|특정일까지",ComboCode:"00|01|02|03"},
			{Header:"구분|체결조건",Type:"Text",Width:55, SaveName:"param5" },
			{Header:"구분|수량",Type:"AutoSum",Width:80, SaveName:"param6" ,Format:"Integer"},
			{Header:"구분|가격",Type:"Text",Width:55, SaveName:"param7" },
			{Header:"협상여부|협상대상",Type:"Combo",Width:70, SaveName:"param8" ,ComboText:"수량|가격|가격,수량",ComboCode:"00|01|02"},
			{Header:"협상여부|협상여부",Type:"Combo",Width:70, SaveName:"param9" ,ComboText:"미협상|협상중|협상완료",ComboCode:"00|01|02"},
			{Header:"참여여부|최대참여",Type:"Text",Width:40, SaveName:"param10" },
			{Header:"참여여부|현재참여",Type:"CheckBox",Width:80, SaveName:"param11",Align:"Center" },
			{Header:"참여여부|협상참여",Type:"Text",Width:40, SaveName:"param12",Align:"Center"}
		]
	};
	
	
	IBS_InitSheet(window[strId], initSheet);
	
	if(strId == "mySheet"){
		objSht.SetCountPosition(4);
		objSht.SetPagingPosition(1);
		objSht.FitColWidth();
		objSht.ShowGroupRow();
		objSht.ShowFilterRow();
	}
	
}

function mySheetAction(sAction) {
	switch(sAction) {
		case "reload" : {
			LoadPage("mySheet1");
			break;
		}
		case "search" : {
			mySheet.DoSearch("./data/index_data.js");
			break;
		}case "HeaderRows" : {
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '헤더 행의 개수는 ' + mySheet.HeaderRows() + ' 개 입니다.');
			}
			break;
		}
		case "GetDataFirstRow":
			if(mySheet.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '데이터 영역의 시작행의 인덱스는 ' + mySheet.GetDataFirstRow() + '행 입니다.');
			}
			break;
		case "LastRow":
			if(mySheet.LastRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '그리드의 마지막 행의 인덱스는 ' + mySheet.LastRow() + '행 입니다.');
			}
			break;
		case "GetDataLastRow":
			if(mySheet.LastRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '데이터 영역의 마지막 행의 인덱스는 ' + mySheet.GetDataLastRow() + '행 입니다.');
			}
			break;
		case "LastCol":
			if(mySheet.LastRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '데이터 영역의 마지막 열의 인덱스는 ' + mySheet.LastRow() + '행 입니다.');
			}
			break;
		case "RowCount":
			if(mySheet.LastRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '현재 페이지영역 행의 개수는 ' + mySheet.RowCount() + '행 입니다.');
			}
			break;
		case "GetTotalRows":
			if(mySheet.LastRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '전체 데이터 행의 개수는 ' + mySheet.GetTotalRows() + '개 입니다.');
			}
			break;
	}
}

function mySheet2Action(sAction) {
	switch(sAction) {
		case "reload" : {
			LoadPage("mySheet2");
			break;
		}
		case "search" : {
			mySheet2.DoSearch("./data/index_data.js");
			break;
		}case "GetSelectRow" : {
			if(mySheet2.GetSelectRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', "선택된 행 인덱스 : "+mySheet2.GetSelectRow());
			}
			break;
		}
		case "GetSelectCol":
			if(mySheet2.LastRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', "선택된 열 인덱스 : "+mySheet2.GetSelectCol());
			}
			break;
		case "MouseRow" : {
			if(mySheet2.LastRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '마우스가 위치한 행 인덱스' + mySheet2.MouseRow());
			}
			break;
		}
		case "MouseCol" : {
			if(mySheet2.LastRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				$().showNotification('top','right', '전체 데이터 행의 개수는 ' + '마우스가 위치한 열 인덱스' + mySheet2.MouseCol());
			}
			break;
		}
		case "GetSelectionRows" : {
			if(mySheet2.LastRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				var nCols = mySheet2.LastCol(),
					nRows = mySheet2.LastRow(),
					r1 = Math.floor((Math.random()*(nRows-1)+1)),
					c1 = Math.floor((Math.random()*(nCols-1)+1)),
					r2 = Math.floor((Math.random()*(nRows-1)+1)),
					c2 = Math.floor((Math.random()*(nCols-1)+1));
					
				// 랜덤선택
				mySheet2.SetSelectRange(r1, c1, r2, c2);
				
				var rows = mySheet2.GetSelectionRows().split("|"),
					tmp = "";
				
				for(var i=0; i<rows.length; i+=1){
					if(i<0){
						tmp+=",";
					}
					tmp += i+"행";
				}
				
				mySheet2.SetTopRow(r1);
				
				$().showNotification('top','right', '선택된 범위의 행은' + tmp + ' 입니다.');
				
			}
			break;
		}
		case "GetSelectionCols" : {
			if(mySheet.LastRow() < 0){
				alert("선택된 행이 없습니다.");
			}else{
				var nCols = mySheet2.LastCol(),
					nRows = mySheet2.LastRow(),
					r1 = Math.floor((Math.random()*(nRows-1)+1)),
					c1 = Math.floor((Math.random()*(nCols-1)+1)),
					r2 = Math.floor((Math.random()*(nRows-1)+1)),
					c2 = Math.floor((Math.random()*(nCols-1)+1));
				
				// 랜덤선택
				mySheet2.SetSelectRange(r1, c1, r2, c2);
				
				var cols = mySheet2.GetSelectionCols().split("|"),
					tmp = "";
				
				for(var i=0; i<cols.length; i+=1){
					if(i<0){
						tmp+=",";
					}
					tmp += i+"행";
				}
				
				
				mySheet2.SetTopRow(r1);
				
				$().showNotification('top','right', '선택된 범위의 열은' + tmp + ' 입니다.');
				
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
