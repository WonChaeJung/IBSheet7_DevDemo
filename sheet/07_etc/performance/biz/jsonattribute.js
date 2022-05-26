//시트 높이 계산용
var pageheightoffset = 250;

$(document).ready(function(){
	createIBSheet2("ibsheetArea1", "mySheet", "100%", "100%");
	createIBSheet2("ibsheetArea2", "mySheet2", "100%", "100%");
	LoadPage("mySheet");
	LoadPage("mySheet2");
})

function LoadPage(strSht){
	
	var objSht = window[strSht];
	var initSheet = {
		Cfg : {
			SearchMode:2,
			MergeSheet:msHeaderOnly,
			FocusAfterProcess : 0,
			NoFocusMode : 1,
			ScrollOverSheet : 1
		},
		Cols : [
			{ Header:"NO",  Type:"Seq", Align:"Center", MinWidth : 10},
			{ Header:"Key", Type:"Text", MinWidth : 80, SaveName:"key"},
			{ Header:"설명", Type:"Text", MinWidth : 240, SaveName:"desc", MultiLineText : 1 },
		]
	};
	IBS_InitSheet(objSht, initSheet);
	objSht.FitColWidth();
	doAction("search", strSht)
	
}

function doAction(sAction, shtNm) {
	
	_startTime = new Date();
	var objSht = window[shtNm];
	switch(sAction) {
		case "search":
			if(shtNm == "mySheet"){
				objSht.DoSearch("./data/jsonattribute_data.js");
			}else{
				objSht.DoSearch("./data/jsonattribute_data2.js");
			}
			break;
		case "hidden" : {
			var flg = objSht.GetColHidden(3);
			for(var i=3; i<(objSht.LastCol()-2); i+=1){
				objSht.SetColHidden(i, !flg);
			}
			_endTime = new Date();
			$("#shtbtn1").prev().text(((_endTime - _startTime)/1000) + "초")
			break;
		}
		case "hiddenEx" : {
			var flg = objSht.GetColHidden(3);
			objSht.RenderSheet(0);
			for(var i=3; i<(objSht.LastCol()-2); i+=1){
				objSht.SetColHidden(i, !flg);
			}
			objSht.RenderSheet(1);
			_endTime = new Date();
			$("#shtbtn2").prev().text(((_endTime - _startTime)/1000) + "초")
			break;
		}
		default : {
			
		}
	}
}

function mySheet_OnSearchEnd(){
	
	
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