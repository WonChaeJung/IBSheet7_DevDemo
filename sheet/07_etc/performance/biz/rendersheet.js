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
			MergeSheet:msHeaderOnly
		},
		Cols : [
			{ Header:"체크", Type:"CheckBox", SaveName:"CHECKBOX_DATA", MinWidth : 50, TrueValue:"Y", FalseValue:'N' },
			{ Header:"NO",  Type:"Seq", Align:"Center", MinWidth : 50, SaveName:"seq" },
			{ Header:"상태", Type:"Status", Align:"Center", MinWidth : 50, SaveName:"sStatus" },
			{ Header:"더미", MinWidth : 50, SaveName : "DUMMYCHECKBOX_DATA", Type:"DummyCheck" },
			{ Header:"삭제", Type:"DelCheck", MinWidth : 50, SaveName : "DelCheck" },
			{ Header:"문자열",  Type :"Text", SaveName :"TEXT_DATA", MinWidth : 70 },
			{ Header :"콤보123",  Type:"Combo", MinWidth :70, SaveName :"COMBO_DATA", ComboText :"대기|진행중|완료", ComboCode :"01|02|03"},
			{ Header : "Html", Type : "Html", Align : "Center", MinWidth :70, SaveName : "HTML"},
			{ Header:"콤보에디트", Type:"Text", MinWidth:80, SaveName:"COMBOEDIT_DATA"},
			{ Header:"팝업", Type:"Popup", MinWidth:70, SaveName:"ISO"},
			{ Header:"팝업에디트", Type:"PopupEdit", MinWidth:110, SaveName:"CURRENCY"},
			{ Header:"자동합계", Type:"AutoSum", SaveName:"AUTOSUM_DATA", MinWidth:70, Format:"#,##0"},
			{ Header : "자동평균", Type : "AutoSum", Align : "Right", SaveName : "AUTOAVG_DATA", MinWidth : 70, Format : "#,###"},
			{ Header:"정수", Type:"Int", Align:"Right", SaveName:"INT_DATA", MinWidth:70 },
			{ Header:"실수", Type:"Float",  Align:"Right", SaveName:"FLOAT_DATA", MinWidth:70},
			{ Header:"실수", Type:"Float",  Align:"Right", CalcLogic : "|FLOAT_DATA| * 100", SaveName:"FLOAT_DATA2", Format : "#,##0.000\\%", MinWidth:70 },
			{ Header:"날짜", Type:"Date", Align:"Center", Format : "Ymd", DefaultValue : "20180329", SaveName:"DATE_DATA",  MinWidth:100},
			{ Header:"주민/사업자번호", Type:"Text", Align:"Center",  SaveName:"IDNO", MinWidth:100 },
			{ Header:"우편번호", Type:"Text", Align:"Center", SaveName:"POSTNO", Format:"PostNo", MinWidth:70 },
			{ Header:"카드번호", Type:"Text",  Align:"Center", SaveName:"CARDNO", Format:"CardNo", MinWidth:130 },
			{ Header:"전화번호", Type:"Text", SaveName:"PHONENO", Format:"PhoneNo", MinWidth:90 },
			{ Header:"사용자 정의 포멧", Type:"Text", Align:"Center", SaveName:"USERFORMAT", Format:"###-**-**###", MinWidth:100 },
			{ Header:"이미지", Type:"Image", Align:"Center", FitColWidth : 0, SaveName:"IMAGE_DATA", ImgHeight:15, MinWidth:70 },
			{ Header:"이미지2", Type:"Image", Align:"Center", SaveName:"IMAGE_DATA2", ImgHeight:15, MinWidth:70 },
			{ Header:"패스워드", Type:"Pass", MinWidth : 100, SaveName:"PASS_DATA" },
			{ Header:"버튼", Type:"Button", SaveName:"BUTTON", DefaultValue:"상세정보", MinWidth : 100, Align:"Center" },
			{ Header:"다중체크박스", Type:"CheckBox", SaveName:"MULTICHECKBOX_DATA", MinWidth:140, ItemText:"상|중|하", ItemCode:"H|M|L", DefaultValue : "L" },
			{ Header:"체크박스", Type:"CheckBox", MinWidth : 100, SaveName:"CHECKBOX_DATA" },
			{ Header:"라디오", Type:"Radio", ActionMenu : ["TEST1", "TEST2"], DefaultValue : 1, MinWidth : 100, SaveName:"RADIO_DATA"},
			{ Header:"문자열",  Type :"Text", SaveName :"TEXT_DATA", MinWidth : 70 },
			{ Header :"콤보123",  Type:"Combo", MinWidth :70, SaveName :"COMBO_DATA", ComboText :"대기|진행중|완료", ComboCode :"01|02|03"},
			{ Header : "Html", Type : "Html", Align : "Center", MinWidth :70, SaveName : "HTML"},
			{ Header:"콤보에디트", Type:"Text", MinWidth:80, SaveName:"COMBOEDIT_DATA"},
			{ Header:"팝업", Type:"Popup", MinWidth:70, SaveName:"ISO"},
			{ Header:"팝업에디트", Type:"PopupEdit", MinWidth:110, SaveName:"CURRENCY"},
			{ Header:"자동합계", Type:"AutoSum", SaveName:"AUTOSUM_DATA", MinWidth:70, Format:"#,##0"},
			{ Header : "자동평균", Type : "AutoSum", Align : "Right", SaveName : "AUTOAVG_DATA", MinWidth : 70, Format : "#,###"},
			{ Header:"정수", Type:"Int", Align:"Right", SaveName:"INT_DATA", MinWidth:70 },
			{ Header:"실수", Type:"Float",  Align:"Right", SaveName:"FLOAT_DATA", MinWidth:70},
			{ Header:"실수", Type:"Float",  Align:"Right", CalcLogic : "|FLOAT_DATA| * 100", SaveName:"FLOAT_DATA2", Format : "#,##0.000\\%", MinWidth:70 },
			{ Header:"날짜", Type:"Date", Align:"Center", Format : "Ymd", DefaultValue : "20180329", SaveName:"DATE_DATA",  MinWidth:100},
			{ Header:"주민/사업자번호", Type:"Text", Align:"Center",  SaveName:"IDNO", MinWidth:100 },
			{ Header:"우편번호", Type:"Text", Align:"Center", SaveName:"POSTNO", Format:"PostNo", MinWidth:70 },
			{ Header:"카드번호", Type:"Text",  Align:"Center", SaveName:"CARDNO", Format:"CardNo", MinWidth:130 },
			{ Header:"전화번호", Type:"Text", SaveName:"PHONENO", Format:"PhoneNo", MinWidth:90 },
			{ Header:"사용자 정의 포멧", Type:"Text", Align:"Center", SaveName:"USERFORMAT", Format:"###-**-**###", MinWidth:100 },
			{ Header:"이미지", Type:"Image", Align:"Center", FitColWidth : 0, SaveName:"IMAGE_DATA", ImgHeight:15, MinWidth:70 },
			{ Header:"이미지2", Type:"Image", Align:"Center", SaveName:"IMAGE_DATA2", ImgHeight:15, MinWidth:70 },
			{ Header:"패스워드", Type:"Pass", MinWidth : 100, SaveName:"PASS_DATA" },
			{ Header:"버튼", Type:"Button", SaveName:"BUTTON", DefaultValue:"상세정보", MinWidth : 100, Align:"Center" },
			{ Header:"다중체크박스", Type:"CheckBox", SaveName:"MULTICHECKBOX_DATA", MinWidth:140, ItemText:"상|중|하", ItemCode:"H|M|L", DefaultValue : "L" },
			{ Header:"체크박스", Type:"CheckBox", MinWidth : 100, SaveName:"CHECKBOX_DATA" },
			{ Header:"라디오", Type:"Radio", ActionMenu : ["TEST1", "TEST2"], DefaultValue : 1, MinWidth : 100, SaveName:"RADIO_DATA"}
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
			objSht.DoSearch("./data/rendersheet_data.js");
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