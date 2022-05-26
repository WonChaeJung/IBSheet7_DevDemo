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
		AutoFitColWidth : "resize",
		DataRowMerge : 1,
		SelectionMode : 2,
		FocusAfterProcess : 0,
		MergeSheet : 1,
		ComboMaxHeight : 350
	};
	
	initSheet.HeaderMode = { Sort : 0, ColMove : 0, ColResize : 0, HeaderCheck : 0 };
	
	initSheet.Cols = [
		{Header:"번호",Type:"Seq",  Eidt : 0, SaveName:"seq", Align : "Center", MinWidth : 20},
		{Header:"구분",Type:"Text", Eidt : 0, SaveName:"depth1",MinWidth : 80},
		{Header:"구분",Type:"Text", Eidt : 0, SaveName:"depth2",MinWidth : 80},
		{Header:"구분",Type:"Text", Eidt : 0, SaveName:"depth3",MinWidth : 80},
		{Header:"구분",Type:"Text", Eidt : 0, SaveName:"depth4",MinWidth : 80},
		{Header:"항목",Type:"Text", Eidt : 0, SaveName:"eventName",MinWidth : 140, ColMerge : 0},
		{Header:"비고",Type:"Text", Eidt : 0, SaveName:"remark",MinWidth : 140, ColMerge : 0}
	];
	
	for(var i=5; i<initSheet.Cols.length; i+=1){
		initSheet.Cols[i]["ColMerge"] = 0;
		initSheet.Cols[i]["Align"] = "Center";
		if(i == initSheet.Cols.length){
			break;
		}
	}
	
	IBS_InitSheet( mySheet , initSheet);
	
	mySheet.FitColWidth();
	
	doAction("search");
	
	// mySheet.SetEditable(0);
	
}
 
/*Sheet 각종 처리*/
function doAction(sAction) {
	switch(sAction) {
		case "search":      //조회
			try{
				mySheet.DoSearch("./data/event_type_data.js");
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

function mySheet_OnSearchEnd(){
	mySheet.FitColWidth();
}
