$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	LoadPage();
})

/*Sheet 기본 설정 */
function LoadPage() {
	/* mySheet.ShowGroupRow(""  ,  "{%s} <font color='red'>(<b>{%c}</b>건)</font>"); */
	//아이비시트 초기화
	var initSheet = {};
	initSheet.Cfg = {
		SearchMode:smLazyLoad,
		Page:50,
		AutoFitColWidth:"",
		GroupRow : 1,
		UseHeaderActionMenu : 1,
		UseGroupActionMenu : 1
	};
	
	initSheet.Cols = [
		{Header:"NO","Type":"Seq","Width":50,"Align":"Center"},
		// {Header:"기준년도","Type":"Text","SaveName":"YY","Width":120,"Align":"Center"},
		// {Header:"기준월","Type":"Text","SaveName":"MT","Width":120,"Align":"Center"},
		// {Header:"기준일","Type":"Text","SaveName":"DE","Width":120,"Align":"Center"},
		{Header:"시군명","Type":"Text","SaveName":"SIGUN_NM","Width":60,"Align":"Center"},
		{Header:"동명","Type":"Text","SaveName":"LEGALDONG_NM","Width":60,"Align":"Center"},
		{Header:"번지","Type":"Text","SaveName":"HSNUM","Width":60,"Align":"Center"},
		{Header:"건축년도","Type":"Text","SaveName":"BUILD_YY","Width":60,"Align":"Center"},
		{Header:"아파트명","Type":"Text","SaveName":"APT_NM","Width":60,"Align":"Center"},
		{Header:"층수","Type":"Int","SaveName":"FLOOR_CNT","Width":60,"Align":"Center"},
		{Header:"보증금(만원)","Type":"Text","SaveName":"ASSURNC_AMT","Width":60,"Align":"Center"},
		{Header:"월세금(만원)","Type":"Text","SaveName":"MTRENT_AMT","Width":60,"Align":"Center"},
		{Header:"전용면적(㎡)","Type":"Text","SaveName":"PRVTUSE_AR","Width":60,"Align":"Center"}
		
	];
	IBS_InitSheet(mySheet, initSheet);

	mySheet.FitColWidth();
	//건수 표시줄 (우측하단)
	mySheet.SetCountPosition(4);

	
	//그룹 기능 사용 
	mySheet.SetCountFormat("[BOTTOMDATA/SEARCHROWS]");
	mySheet.SetGroupActionMenu("그룹 저장|그룹 저장 취소", "_ibSaveGroupCols|_ibResetGroupCols");
	
	doAction("search");
}

function mySheet_OnGroupFinish(group) {

	mySheet.CollapseAll();

}


function comma(num){
    var len, point, str; 
    num = num + ""; 
    point = num.length % 3 ;
    len = num.length; 
    str = num.substring(0, point); 
    while (point < len) { 
        if (str != "") str += ","; 
        str += num.substring(point, point + 3); 
        point += 3; 
    } 
    return str;
}


/*Sheet 각종 처리*/
function doAction(sAction) {
	switch(sAction) {
		case "search": //조회
			mySheet.DoSearch("./data/grouping_data.js");
			break;
		case "reload": //조회데이터 제거
			mySheet.RemoveAll();
			break;
		case "save": //저장
			alert(mySheet.GetSaveString());
			break;
			case "down2excel":
			mySheet.Down2Excel({Merge:1});
			break;
	}
}