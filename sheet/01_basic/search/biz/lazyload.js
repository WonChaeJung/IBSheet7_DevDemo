//시트 초기 높이 결정	
var pageheightoffset = 170;

$(document).ready(function(){
	LoadPage();
	
	doAction("search");
});

function LoadPage() {
	
	var initSheet = {
		Cfg : {
			SearchMode : smLazyLoad,
			MergeSheet : msHeaderOnly
		},
		HeaderMode : {
			Sort:1,
			ColMove:1,
			ColResize:1,
			HeaderCheck:1
		}
	};
	
	initSheet.Cols = [
		{Header:"개봉일",Type:"Date",Width:85,SaveName:"OPEN_DATE",Format:"Ymd",Align:"Center"},
		{Header:"영화명",Type:"Text",Width:180,SaveName:"MOVIE_NM"},
		{Header:"영문제목",Type:"Text",Width:150,SaveName:"ENG_NM"},
		{Header:"감독",Type:"Text",Width:120,SaveName:"DIRECTOR"},
		{Header:"주연배우",Type:"Text",Width:150,SaveName:"ACTOR"},
		{Header:"등급",Type:"Combo",Width:50,SaveName:"FILM_RATE",Align:"Center",ComboText:"12세|15세|18세|전체|청불",ComboCode:"01|02|03|04|05",PopupText:"12세|15세|18세|전체|청불"}
	];
	
	
	// 컬럼 생성
	IBS_InitSheet(mySheet, initSheet);
	
	// 컬럼 너비 자동 조절
	mySheet.FitColWidth();
	
	// 건수 정보 표시
	mySheet.SetCountPosition(4);
	
}

/*Sheet 각종 처리*/
function doAction(sAction) {
	switch(sAction) {
		case "search":
			mySheet.DoSearch("./data/lazyload_data.js");
			break;
		case "reload":
			mySheet.RemoveAll();
			break;
		case "save":	//저장할 데이터 추출
			alert(mySheet.GetSaveString());
			break;
	}
}