//시트 높이 계산용
var pageheightoffset = 250;

$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	createIBSheet2("ibsheetArea2", "mySheet2", "100%", "100%");
	createIBSheet2("ibsheetArea3", "mySheet3", "100%", "100%");
	createIBSheet2("ibsheetArea4", "mySheet4", "100%", "100%");
	
	LoadPage("mySheet");
	LoadPage("mySheet2");
	LoadPage2("mySheet3");
	LoadPage2("mySheet4");
	
	doAction('search');
	doAction('search2');
})

/*Sheet 기본 설정 */
function LoadPage(strId) {
	
	var objSht = window[strId];
	
	var initSheet = {
		Cfg : {
			SearchMode:smGeneral,
			MergeSheet:msHeaderOnly+msPrevColumnMerge,
			FocusAfterProcess : 0,
			NoFocusMode : 1,
			ScrollOverSheet : 1
		},
		Cols : [
			{Header:"기능별분류|depth1", Type:"Text",Width:65, SaveName:"param1",Align:"Center" },
			{Header:"기능별분류|depth2", Type:"Text",Width:65, SaveName:"param2"},
			{Header:"사용가능여부|사용가능여부",	Type:"Text",Width:125, SaveName:"param3" },
			{Header:"비고|비고", Type:"Text",Width:55, SaveName:"param4" }
		]
	};
	switch(strId){
		case "mySheet2" : {
			initSheet.Cfg = {
				SearchMode:smGeneral,
				MergeSheet:msHeaderOnly+msPrevColumnMerge,
				FocusAfterProcess : 0,
				NoFocusMode : 1,
				ScrollOverSheet : 1
			};
			
			initSheet.Cols = [
				{Header:"컬럼타입별분류|depth1", Type:"Text",Width:65, SaveName:"param1",Align:"Center" },
				{Header:"컬럼타입별분류|depth2", Type:"Text",Width:65, SaveName:"param2"},
				{Header:"컬럼타입별분류|depth3", Type:"Text",Width:65, SaveName:"param3"},
				{Header:"사용가능여부|사용가능여부",	Type:"Text",Width:125, SaveName:"param4" },
				{Header:"비고|비고", Type:"Text",Width:55, SaveName:"param5" }
			]
			
			break;
		} 
	}
	IBS_InitSheet(objSht, initSheet);
	objSht.FitColWidth();
}


function LoadPage2(strSht){
	
	var objSht = window[strSht];
	var initSheet = {
		Cfg : {
			SearchMode:2,
			MergeSheet:msHeaderOnly+msPrevColumnMerge,
			SumPosition : 0,
			CountPosition : 4,
			FocusAfterProcess : 0
		},
		Cols : [
			{
				Header:"체크",
				Type:"CheckBox",
				SaveName:"CHECKBOX_DATA",
				MinWidth : 50,
				ColMerge : 0,
				TrueValue:"Y",
				FalseValue:'N'
			},
			{
				Header:"NO", 
				Type:"Seq",
				Align:"Center",
				MinWidth : 50,
				SaveName:"seq"
			},
			{
				Header:"상태",
				Type:"Status",
				Align:"Center",
				MinWidth : 50,
				ToolTip : 1,
				ActionMenu : ["TEST1", "TEST2"],
				SaveName:"sStatus"
			},
			{
				Header:"더미",
				MinWidth : 50,
				SaveName : "DUMMYCHECKBOX_DATA",
				ActionMenu : ["TEST1", "TEST2"],
				ToolTip : 1,
				Type:"DummyCheck"
			},
			{
				Header:"삭제",
				Type:"DelCheck",
				MinWidth : 50,
				SaveName : "DelCheck",
				ToolTip : 1
			},
			{
				Header:"문자열", 
				Type :"Text",
				SaveName :"TEXT_DATA",
				MinWidth : 70,
				MultiLineText : 1,
				PopupButton : 0,
				Wrap : 1,
				ToolTip : 1,
				DefaultValue : "none",
				Cursor : "Pointer"
			},
			{
				Header :"콤보123", 
				Type:"Combo",
				MinWidth :70,
				SaveName :"COMBO_DATA",
				ComboText :"대기|진행중|완료",
				ComboCode :"01|02|03",
				PopupCheckEdit : 1,
				PopupText :"대기|진행중|완료",
				PopupCode : "01|02|03"
			},
			{ Header : "Html", Type : "Html", Align : "Center", MinWidth :70, SaveName : "HTML"},
			{
				Header:"콤보에디트",
				Type:"ComboEdit",
				MinWidth:80,
				SaveName:"COMBOEDIT_DATA",
				ComboText:"고려대학교|고려대학교2|국민대학교|서울대학교|숙명여자대학교|연세대학교|울산대학교|울산과학기술대학교|이화여자대학교|인천대학교|인천가톨릭대학교",
				ComboCode:"AA|BB|CC|DD|EE|FF|GG|HH|II|JJ|KK",
				PopupText:"고려대학교|고려대학교2|국민대학교|서울대학교|숙명여자대학교|연세대학교|울산대학교|울산과학기술대학교|이화여자대학교|인천대학교|인천가톨릭대학교",
				Format : "Integer",
				InputCaseSensitive : 1,
				Validation:0
			},
			{
				Header:"팝업",
				Type:"Popup",
				MinWidth:70,
				ToolTip : 1,
				MultilineText : 1,
				DefaultValue : "none",
				SaveName:"ISO"
			},
			{
				Header:"팝업에디트",
				Type:"PopupEdit",
				MinWidth:110,
				ToolTip : 1,
				InputCaseSensitive : 1,
				DefaultValue : "none",
				PopupCheckEdit : 1,
				SaveName:"CURRENCY"
			},
			{
				Header:"자동합계",
				Type:"AutoSum",
				Align:"Right",
				AllowNull : 1,
				RowMerge : 1,
				ToolTip : 1,
				DefaultValue : 9999,
				SaveName:"AUTOSUM_DATA",
				MinWidth:70,
				Format:"#,##0",
				MaximumValue:100000
			},
			{
				Header : "자동평균",
				Type : "AutoSum",
				// Type : "Text",
				Align : "Right",
				RowMerge : 1,
				SaveName : "AUTOAVG_DATA",
				MinWidth : 70,
				AllowNull : 0,
				Format : "#,###",
				SumType : "AVG"
			},
			{
				Header:"정수",
				Type:"Int",
				Align:"Right",
				SaveName:"INT_DATA",
				MinWidth:70
			},
			{
				Header:"실수",
				Type:"Float", 
				Align:"Right",
				SaveName:"FLOAT_DATA",
				MinWidth:70
			},
			{
				Header:"실수",
				Type:"Float", 
				Align:"Right",
				CalcLogic : "|FLOAT_DATA| * 100",
				ToolTip : 1,
				SaveName:"FLOAT_DATA2",
				Format : "#,##0.000\\%",
				AllowNull : 1,
				MinWidth:70
			},
			{
				Header:"날짜",
				Type:"Date",
				Align:"Center",
				Format : "Ymd",
				ToolTip : 1,
				DefaultValue : "20180329",
				SaveName:"DATE_DATA", 
				MinWidth:100,
				PointCount:0,	UpdateEdit:1,	InsertEdit:1,	EditLen:8 
			},
			{
				Header:"주민/사업자번호",
				Type:"Text",
				Align:"Center", 
				SaveName:"IDNO",
				Format:["IdNo","SaupNo"],
				Edit : 1,
				ActionMenu : ["TEST1", "TEST2"],
				MinWidth:100
			},
			{
				Header:"우편번호",
				Type:"Text",
				Align:"Center",
				SaveName:"POSTNO",
				Format:"PostNo",
				MinWidth:70
			},
			{
				Header:"카드번호",
				Type:"Text", 
				Align:"Center",
				Save : 0,
				SaveName:"CARDNO",
				Format:"CardNo",
				ToolTip : 1,
				MinWidth:130
			},
			{
				Header:"전화번호",
				Type:"Text",
				Save : 0,
				Align:"Center", 
				SaveName:"PHONENO",
				Format:"PhoneNo",
				ToolTip : 1,
				MinWidth:90
			},
			{
				Header:"사용자 정의 포멧",
				Type:"Text",
				Save : 0,
				Align:"Center", 
				SaveName:"USERFORMAT",
				Format:"###-**-**###",
				ToolTip : 1,
				MinWidth:100
			},
			{
				Header:"이미지",
				Type:"Image",
				Align:"Center",
				FitColWidth : 0,
				ActionMenu : ["TEST1", "TEST2"],
				SaveName:"IMAGE_DATA",
				ImgHeight:15,
				MinWidth:70
			},
			{
				Header:"이미지2",
				Type:"Image",
				Align:"Center",
				ActionMenu : ["TEST1", "TEST2"],
				DefaultValue : 1,
				SaveName:"IMAGE_DATA2",
				ImgHeight:15,
				MinWidth:70
			},
			{
				Header:"패스워드",
				Type:"Pass",
				ToolTip : 1,
				StaticPassword : 0,
				MinWidth : 100,
				SaveName:"PASS_DATA"
			},
			{
				Header:"버튼",
				Type:"Button",
				SaveName:"BUTTON",
				DefaultValue:"상세정보",
				ColMerge : 0,
				ToolTip : 1,
				MinWidth : 100,
				Align:"Center"
			},
			{
				Header:"다중체크박스",
				Type:"CheckBox",
				SaveName:"MULTICHECKBOX_DATA",
				MinWidth:140,
				ItemText:"상|중|하",
				ItemCode:"H|M|L",
				DefaultValue : "L",
				
				MaxCheck:1
			},
			{
				Header:"체크박스",
				Type:"CheckBox",
				MinWidth : 100,
				SaveName:"CHECKBOX_DATA",
				DefaultValue : 1
			},
			{
				Header:"라디오",
				Type:"Radio",
				ActionMenu : ["TEST1", "TEST2"],
				ToolTip : 1,
				DefaultValue : 1,
				MinWidth : 100,
				SaveName:"RADIO_DATA"
			},
			{
				Header:"차트",
				Type: "Sparkline",
				MinWidth : 100,
				RowMerge : 1,
				Chart : {
					Type : "Column",
					Data : "AUTOSUM_DATA|AUTOAVG_DATA|INT_DATA|FLOAT_DATA"
				}
			}
		]
	};
	IBS_InitSheet(objSht, initSheet);
	objSht.FitColWidth();
	
}

function doAction(sAction) {
	_startTime = new Date();
	switch(sAction) {
		case "search":
			mySheet.DoSearch("./data/fx_mode_data2.js");
			break;
		case "search2":
			mySheet2.DoSearch("./data/fx_mode_data2_1.js");
			break;
		case "search3":
			$("#shtbtn2").prev().text("")
			mySheet3.DoSearch("./data/fx_mode_data1_1.js");
			break;
		case "search4":
			$("#shtbtn3").prev().text("")
			//mySheet3.DoSearch("./data/fx_mode_data1_1.js", "", { Fx : "2" });
			var rltData = mySheet4.GetSearchData("./data/fx_mode_data2_2.js");
			mySheet4.LoadSearchData(rltData, {Fx : 2});
			break;
		case "reload":
			mySheet.RemoveAll();
			break;
	}
}

function mySheet3_OnSearchEnd(){
	_endTime = new Date();
	$("#shtbtn2").prev().text(((_endTime - _startTime)/1000) + "초")
}

function mySheet4_OnSearchEnd(){
	_endTime = new Date();
	$("#shtbtn3").prev().text(((_endTime - _startTime)/1000) + "초");
}

function mySheet_OnLoadData(data){
	var fnCvt = new Function("return " + data.replace(/^[^\<\{]*\{/, '{').replace(/\}[^\}]*$/, '}'));
	var tmpData = fnCvt();
	
	for(var i=0; i<tmpData["DATA"].length; i+=1){
		if(tmpData["DATA"][i]["param3"] == "X"){
			tmpData["DATA"][i]["param3#BackColor"] = "#FFD8D8";
			console.log(i)
		}
	}
	
	console.log(tmpData);
	return tmpData;
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
