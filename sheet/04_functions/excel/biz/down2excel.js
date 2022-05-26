//시트 높이 계산용
var pageheightoffset = 250;


$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	LoadPage();
})

/*Sheet 기본 설정 */
function LoadPage() {
	//아이비시트 초기화
	var initdata = {};
	
	initdata.Cfg = {
		SearchMode:smLazyLoad,
		Page:50,
		// AutoFitColWidth : "search|resize",
		MergeSheet:msPrevColumnMerge+msHeaderOnly
	};
	
	initdata.Cols = [
		{Header:"신청인|신청인","Type":"Text","Width":80,"ColMerge":1},
		{Header:"신청일자|신청일자","Type":"Combo","Width":80,"ColMerge":0,"Align":"Center","ComboText":"야근|주말특근|휴일특근","ComboCode":"001|002|004"},
		{Header:"|","Type":"CheckBox","Width":80,"SaveName":"A","ColMerge":1,"TrueValue":"Y","FalseValue":"N"},
		//{Header:"신청금액|신청금액","Type":"Int","Width":85,"SaveName":"B","ColMerge":1, "Format" : "#,###.00"},
		//{Header:"신청금액|신청금액","Type":"Int","Width":85,"SaveName":"B","ColMerge":1},
		{Header:"신청금액|신청금액","Type":"AutoSum","Width":85,"SaveName":"B","ColMerge":1,"Format":"Integer"},
		//{Header:"근태기간|시작일","Type":"Date","Width":100,"SaveName":"C","Format":"Ymd","Align":"Center"},
		{Header:"근태기간|시작일","Type":"Int","Width":100,"SaveName":"C"},
		{Header:"근태기간|종료일","Type":"Date","Width":100,"SaveName":"D","Format":"Ymd","Align":"Center"},
		{Header:"시간|시작","Type":"Date","Width":100, "Format" : "Hm", "Align":"Center"},
		{Header:"시간|종료","Type":"Date","Width":100, "Format" : "Hm", "Align":"Center"}
	];
	
	IBS_InitSheet(mySheet,initdata);
	
	mySheet.FitColWidth();
	
	//마우스 우측 버튼 메뉴 설정
	mySheet.SetActionMenu("엑셀 다운로드|엑셀 업로드");
	
	doAction("search");
}


/*Sheet 각종 처리*/
function doAction(sAction) {
	switch(sAction) {
		case "search":      //조회
			mySheet.DoSearch("./data/excel_data.xml");
			break;
		case "reload":        //저장
			mySheet.RemoveAll();
			break;
		case "down2excel":
			//엑셀 다운로드
			var filename = document.getElementById("filename").value;
			var worksheetname = document.getElementById("worksheetname").value;
			var merge = document.getElementById("merge").checked?1:0;
			var design = document.getElementById("design").checked?1:0;
			var t = new Date();
			var DandT = t.getFullYear() + "-" +AddZero(t.getMonth()+1)+"-" + AddZero(t.getDate())+"   "+AddZero(t.getHours())+":"+AddZero(t.getMinutes());
			
			//상단 타이틀 부분
			var TITLE = "[잔업 수당 신청]\r\n\r\n|문서번호:  (0009)";
				TITLE += "\r\n | 신청기간: 2003-09 ~ 2004-09";
				TITLE += "\r\n[ "+mySheet.RowCount()+" ]건, 출력시간 : "+DandT+"||||||단위: 원";
			//상단 타이틀에 대한 머지 영역 지정 (시작 row,시작 col, 병합할 row개수, 병합할 열 개수)
			var userMG  = "0,0,2,8 2,1,1,5 3,1,1,5 4,0,1,5 4,6,1,2";
			var params = {
				FileName : filename,
				SheetName : worksheetname,
				Merge : merge,
				SheetDesign : design,
				TitleText : TITLE,
				// NumberFormatMode : 2,
				UserMerge : userMG,
				DownSum : 1,
				OnlyHeaderMerge : 1,
				ExcelFontSize  : 20,
				ComboValidation : 1
			};
			
			mySheet.Down2Excel(params);

			break;
		case "loadexcel": //엑셀 업로드 (import)
			//매치 유형 선택 (기본값: 헤더 타이틀 기준 매치)
			var mch = document.getElementById("match").value;
			var params = {
				Mode : mch,
				StartRow: "6"
			} ;
			mySheet.LoadExcel(params);
			break;
	}
}

function AddZero(str){
	
	if((str+"").length==1){
		return "0"+str;
	}	
	return str;
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
