$(document).ready(function(){
	LoadPage();
})

function LoadPage() {
	if(!Grids[0].HeaderText){
		$("<span class='title'>("+mySheet.Version()+")</span>").appendTo(".page_title");
	}
	//아이비시트 초기화
	var initSheet = {};
	
	initSheet.Cfg = {
		TouchScroll : 1,
		Alternate : 0,
		UseHiddenFilter : 1,
		Page:50
	};
	
	initSheet.Cols = [
		{Header:"순번",Type:"Seq",MinWidth:30,SaveName:"SEQ",Align:"Center"},
		{Header:"상태",Type:"Status",MinWidth:30,SaveName:"STATUS",Align:"Center"},
		{Header:"삭제",Type:"DelCheck",MinWidth:30,SaveName:"DEL_CHK"},
		{Header:"시군명",Type:"Text",MinWidth:85,SaveName:"SIGUN_NM",Align:"Center"},
		{Header:"공동주택명",Type:"Text",MinWidth:155,SaveName:"COPERTN_HOUSNG_NM_INFO", KeyField:1, MultiLineText : 1, ToolTip : 1},
		{Header:"읍면동",Type:"Text",MinWidth:155,SaveName:"EMD_ADDR", Format : "email"},
		{Header:"지번",Type:"Text",MinWidth:155,SaveName:"LOTNO_ADDR"},
		{Header:"사용검사일자",Type:"Text",MinWidth:125,SaveName:"USE_INSPECT_DE"},
		{Header:"동수",Type:"Text",MinWidth:100,SaveName:"DONG_CNT"},
		{Header:"세대수",Type:"Text",MinWidth:100,SaveName:"HSHLD_CNT"},
		{Header:"의무관리대상",Type:"Combo",MinWidth:100,SaveName:"OBLGTN_MANAGE_TARGET_YN", ComboCode : "Y|N", ComboText : "Y|N"}
		// {Header:"등급",Type:"Text",Width:30,SaveName:"FILM_RATE",Align:"Center",ComboText:"12세|15세|18세|전체|청불",ComboCode:"01|02|03|04|05",PopupText:"12세|15세|18세|전체|청불"}
	];
	
	IBS_InitSheet( mySheet , initSheet);
	
	doAction('search');
	mySheet.FitColWidth();
}

/*Sheet 각종 처리*/
function doAction(sAction) {
	switch(sAction) {
		case "search":      //조회
			mySheet.DoSearch("./data/transaction_data.js",'',{Sync : 0});
			mySheet.SetShowButtonImage(0);
			break;
		case "reload":
			//조회 데이터 삭제
			mySheet.RemoveAll();
			break;
		case "save":
			//저장 문자열 추출
			alert("저장될 문자열:"+ mySheet.GetSaveString());
			break;
		case "save2":
			//저장 문자열 추출
			alert("저장될 문자열:"+ JSON.stringify(mySheet.GetSaveJson()));
			break;				
		case "insert":
			//신규행 추가
			mySheet.DataInsert();
			break;
	}
}