
// var mySheet;

$(document).ready(function(){
	try{
		createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
		LoadPage();
	} catch(e){
		alert(e.message);
	}
});

function LoadPage() {

	//시트 초기화.
	var initSheet = {};
	initSheet.Cfg = {
		SearchMode : 0,
		FrozenCol : 3,
		SelectionMode : 2,
		SumPosition : 0, // 0 상단 [default], 1 하단  
		MultiCheckValue : 1,
		EditArrowBehavior : 2,
		AutoFitColWidth : "resize",
		MergeSheet : 1,
		ComboMaxHeight : 350,
		TouchScroll : 1
	};
	
	initSheet.HeaderMode = { Sort : 1, ColMove : 0, ColResize : 1, HeaderCheck : 0 };
	
	initSheet.Cols = [
		{Header:"",Type:"Text",SaveName:"depth1",MinWidth : 70},
		{Header:"",Type:"Text",SaveName:"depth2",MinWidth : 80},
		{Header:"",Type:"Text",SaveName:"depth3",MinWidth : 150},
		{Header:"지원 타입|문자열|문자열|Text",Type:"Text",SaveName:"text",MinWidth : 40, ColMerge : 0},
		{Header:"지원 타입|숫자형|정수|Int",Type:"Text",SaveName:"int",MinWidth : 40, ColMerge : 0},
		{Header:"지원 타입|숫자형|실수|Float",Type:"Text",SaveName:"float",MinWidth : 40},
		{Header:"지원 타입|숫자형|합계|AutoSum",Type:"Text",SaveName:"autosum",MinWidth : 40},
		{Header:"지원 타입|체크형식|체크형식|DelCheck",Type:"Text",SaveName:"delcheck",MinWidth : 40},
		{Header:"지원 타입|체크형식|체크형식|CheckBox",Type:"Text",SaveName:"checkbox",MinWidth : 40},
		{Header:"지원 타입|체크형식|체크형식|DummyCheck",Type:"Text",SaveName:"dummycheck",MinWidth : 40},
		{Header:"지원 타입|체크형식|체크형식|Radio",Type:"Text",SaveName:"radio",MinWidth : 40, ColMerge : 0},
		{Header:"지원 타입|콤보박스|콤보박스|Combo",Type:"Text",SaveName:"combo",MinWidth : 40},
		{Header:"지원 타입|콤보박스|콤보박스|ComboEdit",Type:"Text",SaveName:"comboedit",MinWidth : 40},
		{Header:"지원 타입|이미지|이미지|Image",Type:"Text",SaveName:"image",MinWidth : 40},
		{Header:"지원 타입|날짜|날짜|Date",Type:"Text",SaveName:"date",MinWidth : 40},
		{Header:"지원 타입|팝업|팝업|Popup",Type:"Text",SaveName:"popup",MinWidth : 40},
		{Header:"지원 타입|팝업|팝업|PupupEdit",Type:"Text",SaveName:"popupedit",MinWidth : 40},
		{Header:"지원 타입|상태값|상태값|Status",Type:"Text",SaveName:"status",MinWidth : 40},
		{Header:"지원 타입|비밀번호|비밀번호|Pass",Type:"Text",SaveName:"pass",MinWidth : 40},
		{Header:"지원 타입|순번|순번|Seq",Type:"Text",SaveName:"seq",MinWidth : 40},
		{Header:"지원 타입|저장결과|저장결과|Result",Type:"Text",SaveName:"result",MinWidth : 40},
		{Header:"지원 타입|차트|차트|SparkLine",Type:"Text",SaveName:"sparkline",MinWidth : 40},
		{Header:"지원 타입|태그삽입|태그삽입|Html",Type:"Text",SaveName:"html",MinWidth : 40},
		{Header:"지원 타입|버튼|버튼|Button",Type:"Text",SaveName:"button",MinWidth : 40}
	];
	
	for(var i=3; i<initSheet.Cols.length; i+=1){
		initSheet.Cols[i]["ColMerge"] = 0;
		initSheet.Cols[i]["Align"] = "Center";
	}
	
	IBS_InitSheet( mySheet , initSheet);
	
	doAction("search");
	
}
 
/*Sheet 각종 처리*/
function doAction(sAction) {
	switch(sAction) {
		case "search":      //조회
			try{
				mySheet.DoSearch("./data/column_attr_data.js");
				// mySheet.DoSearch("datatype.jsp");
			}catch(e){
				alert("ERROR");
				console.log(e);
			}
		
			break;
		case "reload":  //조회 데이터 제거
			mySheet.RemoveAll();
			break;
		case "save":  //수정된 데이터 추출 확인
			alert(mySheet.GetSaveString());
			break;
		case "insert"://신규행 추가
			var row = mySheet.DataInsert();
			break;
			case "Down2Excel"://엑셀 다운로드
			var param = {SheetDesign:1,TitleText:"데이터 타입/포멧 예제\r\n\r\n",UserMerge:"0,0,2,12",ComboValidation:1}
			mySheet.Down2Excel(param);
			break;
	}
}


function mySheet_OnLoadData(data){
	try{
		var objData = JSON.parse(data.substring(data.indexOf("=")+1).trim());
		console.log(objData);
		for(var i=0; i<objData["data"].length; i+=1){
			for(var key in objData["data"][i]){
				if(objData["data"][i][key] == "X"){
					objData["data"][i][key+"#BackColor"] = "#FFA7A7";
				}
			}
		}
	}catch(e){
		console.log(e);
	}
	return objData;
}
