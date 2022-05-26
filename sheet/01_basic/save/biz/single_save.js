$(document).ready(function(){
	LoadPage();
})
var pageheightoffset = 170;

function LoadPage() {
	var initdata = {};
	
	initdata.Cfg = {SearchMode:smLazyLoad};
	initdata.Cols = [
		{Header:"NO","Type":"Seq","Align":"Right"},
		{Header:"상태","Type":"Status","Align":"Center", "SaveName" : "sStatus"},
		{Header:"삭제","Type":"DelCheck", "SaveName" : "delChk"},
		{Header:"시군명","Type":"Text","SaveName":"Text","KeyField":1, "MinWidth":40,"SaveName" : "SIGUN_NM"},
		{Header:"행정동명","Type":"Text","MinWidth":40, "SaveName" : "ADMDONG_NM"},
		{Header:"어린이집명","Type":"Text","MinWidth":100, "SaveName" : "KIDGARTN_NM"},
		{Header:"도로명주소","Type":"Text","MinWidth":150, "SaveName" : "REFINE_ROADNM_ADDR"},
		{Header:"위도","Type":"Float","Align":"Right","MinWidth":50,"Format":"NullFloat", "SaveName" : "REFINE_WGS84_LAT",},
		{Header:"경도","Type":"Float","Align":"Right","MinWidth":50,"Format":"NullFloat", "SaveName" : "REFINE_WGS84_LOGT", "SumType" : "Avg"},
		{Header:"전화번호","Type":"Text", "SaveName":"KIDGARTN_TELNO", "Align":"Right","Format":"NullInteger","MinWidth":70},
		{Header:"인가일자","Type":"Date", "SaveName":"CONFMTN_DE", "Align":"Right","Format":"Ymd","MinWidth":70},
		{Header:"평가인증여부","Type":"Combo","Align":"Center","MinWidth":50, "SaveName" : "EVALTN_CERTFIY_YN", "ComboCode" : "Y|N", "ComboText" : "Y|N"},
		{Header:"시간연장유형여부","Type":"Combo","Align":"Center","MinWidth":50, "SaveName" : "TM_EXTS_TYPE_YN", "ComboCode" : "Y|N", "ComboText" : "Y|N"},
		{Header:"공공유형지정여부","Type":"Combo","Align":"Center","MinWidth":50, "SaveName" : "PUBL_TYPE_APPONT_YN", "ComboCode" : "Y|N", "ComboText" : "Y|N"},
		{Header:"0세아동지정여부","Type":"Combo","Align":"Center","MinWidth":50, "SaveName" : "AGE0_CHILD_APPONT_YN", "ComboCode" : "Y|N", "ComboText" : "Y|N"},
		{Header:"보육교직원수","Type":"Text", "SaveName" : "CHLDCARE_SCHLSTAF_CNT","MinWidth":50},
		{Header:"아동정원수","Type":"Text", "SaveName" : "CHILD_FNOP_CNT", Save : 0,"MinWidth":50},
		{Header:"정원충족률","Type":"Text", "SaveName" : "FNOP_STFY_RT", Save : 0,"MinWidth":50}
		// ,{Header:"처리결과","Type":"Result"}
	];
	
	IBS_InitSheet(mySheet,initdata);
	
	mySheet.FitColWidth();
	
	mySheet.SetRowBackColorU("#eeffef");
	
	doAction("search");
}

/*Sheet 각종 처리*/
function doAction(sAction) {
	switch(sAction) {
		case "search":      //조회
			mySheet.DoSearch("./data/single_save_data.js");
			break;
		case "reload":
			mySheet.RemoveAll();
			break;
		case "save":
			//mySheet.DoSave("save.jsp", {Quest : 0});
			mySheet.DoSave("./biz/save.jsp");
			break;
		case "save_err":
			mySheet.DoSave("./biz/saveErr.jsp");
			break;
		case "insert":
			mySheet.DataInsert();
			break;
	}
}

function mySheet_OnSaveEnd(code, msg){
	console.log(code, msg);
	if(msg!=""){
		// alert(msg);
	}
}