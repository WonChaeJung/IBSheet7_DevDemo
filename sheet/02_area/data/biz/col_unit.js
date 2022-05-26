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


IBSheet["_tmpIdx"] = 0;
function doAction(sAction, sheetId) {
	var objSht = window[sheetId],
		__row = objSht.GetSelectRow(),
		__col = objSht.GetSelectCol();
	
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
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{

				var info = {
					Pos:objSht.GetSelectCol(),
					Header:{Text: "신규"+(IBSheet["_tmpIdx"]++),Align: "Center"},
					Col:[{
						Type: "Text",
						Width:60,
						SaveName: "sCheckBox"+IBSheet["_tmpIdx"]
					}]
				};
				
				objSht.ColInsert(info);
				
				// $().showNotification('top','right', objSht.ColInsert() + '행 위치에 추가');
			}
			break;
		}case "delete" : {
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				
				$().showNotification('top','right', (objSht.GetSelectCol()+1) + '열 삭제');
				objSht.ColDelete(objSht.GetSelectCol());
			}
			break;
		}case "deleteAll" : {
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				objSht.RenderSheet(0);
				for(var i=0; i<=IBSheet["_tmpIdx"]; i+=1){
					objSht.ColDelete(("sCheckBox"+i));
				}
				IBSheet["_tmpIdx"]=0;
				objSht.RenderSheet(1);
			}
			break;
		}case "colHidden" : {
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				objSht.SetColHidden(__col, 1);
				$().showNotification('top','right',  __col + '열 숨김 처리.');
			}
			break;
		}case "hiddenCancel" : {
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				objSht.RenderSheet(0);
				for(var i=0; i<objSht.LastCol(); i+=1){
					objSht.SetColHidden(i, 0);
				}
				objSht.RenderSheet(1);
				$().showNotification('top','right',  '열 숨김 취소.');
			}
			break;
		}case "editable1" : {
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				objSht.SetColEditable(__col, 0);
				$().showNotification('top','right',  __col + '열 편집 불가');
			}
			break;
		}case "editable2" : {
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				objSht.SetColEditable(__col, 1);
				$().showNotification('top','right',  __col + '열 편집 가능');
			}
			break;
		}case "dataMoveLeft" : {
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				if(__col > 0){
					objSht.MoveColumnPos(__col, __col-1);
				}
			}
			break;
		}
		case "dataMoveRight":
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				if(__col < objSht.LastCol()){
					objSht.MoveColumnPos(__col, __col+1);
				}
			}
			break;
		case "setColWidth" :
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				objSht.SetColWidth(__col, 100);
				$().showNotification('top', 'right', __col + '열의 너비를 100px 으로 변경');
			}
			break;
		case "setColFontColor":
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				var color = "red";
				objSht.SetColFontColor(__col, color);
				$().showNotification('top', 'right', __col + '열의 색상을 '+ color +' 으로 변경');
			}
			break;
		case "setColFontBold": {
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				objSht.SetColFontBold(__col, 1);
				$().showNotification('top', 'right', __col + '열의 폰트 굵기를 두껍게 설정');
			}
			break;
		}case "setColBackColor": {
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				var color = "#eeddf3";
				objSht.SetColBackColor(__col, color);
				$().showNotification('top', 'right', __col + '열의 배경색을 '+ color +' 으로 변경');
			}
			break;
		}case "setColFontUnderline": {
			if(objSht.GetSelectCol() < 0){
				alert("선택된 열이 없습니다.");
			}else{
				objSht.SetColFontUnderline(__col, 1);
				$().showNotification('top', 'right', __col + '열 밑줄  변경');
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
