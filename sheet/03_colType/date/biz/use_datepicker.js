//시트 높이 계산용
var pageheightoffset = 250;

$(document).ready(function(){
	

	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy/mm/dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '',
		showOn: 'both',
		buttonText: "달력",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		yearRange: 'c-99:c+99'
	};

	$.datepicker.setDefaults($.datepicker.regional['ko']);
	
	
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	LoadPage();
})

/*Sheet 기본 설정 */
function LoadPage() {
	
	var init_data = {};
	init_data.Cfg = {FrozenCol:3,SearchMode:2,Page:100,MergeSheet:msHeaderOnly};
	init_data.HeaderMode = {Sort:1,ColMove:1,ColResize:1};
	
	init_data.Cols = [
		{Header:"AA|No",Type:"Seq",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Date",MinWidth:85,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Date",MinWidth:85,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Date",MinWidth:85,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|No",Type:"Text",Width:35,SaveName:"seq",Align:"Center"},
		{Header:"AA|상태",Type:"Status",Width:35,SaveName:"sStatus",Align:"Center"},
		{Header:"AA|삭제",Type:"DelCheck",Width:40,SaveName:"sDelete",Align:"Center"},	
		{Header:"AA|사원명",Type:"Text",Width:80,SaveName:"Text",Align:"Left"},
		{Header:"DD|달력",Type:"Date",Width:120,SaveName:"Popup",Align:"Center",Format:"Ymd"},
		{Header:"DD|편집가능달력",Type:"Date",Width:120,SaveName:"PopupEdit",Align:"Center",Format:"Ymd"},
		{Header:"DD|Pass",Type:"Pass",Width:80,SaveName:"Pass",Align:"Center"}
	];
	
	// #### Step1 : 이벤트 오버라이드
	eventOverRide("mySheet");
	
	
	// #### Step2 : Date컬럼 타입인 경우 PopupEdit 형태로 변경
	var cols = init_data.Cols;
	if(cols && typeof cols.length !== "undefined"){
		for(var i=0; i<cols.length; i+=1){
			if(cols[i]["Type"] == "Date"){
				cols[i]["Type"] = "PopupEdit";
				if(!cols[i]["Format"]){
					cols[i]["Format"] = "Ymd";
				}
			}
		}
	}
	
	if(cols["Type"]=="Date"){
		cols["Type"]= "PopupEdit";
		if(!cols["Format"]){
			cols["Format"]= "Ymd";
		}
	}
	
	IBS_InitSheet(mySheet, init_data);

	doAction('search');
}

//시트의 이벤트 오버라이드 부분
function eventOverRide(id){
	try{
		//OnPopupClick 이벤트가 사용중인지 확인
		var dummy2 = null;

		if(typeof(window[id+"_OnPopupClick"])!="undefined"){
			if(typeof window[id+"_OnPopupClick"] == "function"){
				dummy2 = window[id+"_OnPopupClick"];
			} 
		}
		window[id+"_OnPopupClick"] = function(row,col){
			//만일 해당 셀의 Format이 Ymd거나 Ym 이라면 datepicker를 실행한다.
			if( window[id].GetCellProperty(row, col, "Format")=="Ymd" || window[id].GetCellProperty(row, col, "Format")=="Ym"){
				
				//달력선택시 반영
				var onSelect = function(dateStr,ins){
					window[id].SetCellText(window[id].GetSelectRow(),window[id].GetSelectCol(),dateStr);
				}
				//현재 셀의 값
				var currDate = window[id].GetCellText(window[id].GetSelectRow(),window[id].GetSelectCol());
				var setting = {};

				console.log(currDate, setting);
				$( "<div style='z-index: 100;'></div>" ).datepicker("dialog", currDate, onSelect, setting,[event.pageX, event.pageY] );
			}
			if(dummy2){
				dummy2(row, col);  //화면에 정의한 OnPopupClick 이벤트가 있으면 이것도 수행함.
			}
		}  
	}catch(e){
		
	}
}

function doAction(sAction) {
	switch(sAction) {
		case "search":
			mySheet.DoSearch("./data/use_datepicker_data.js");
			break;
		case "reload":
			mySheet.RemoveAll();
			break;
	}
}