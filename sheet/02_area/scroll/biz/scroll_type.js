		
		$(document).ready(function(){
			createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
			LoadPage();
		})
		
		/*Sheet 기본 설정 */
		function LoadPage() {
			var initdata = {};
			//아이비시트 초기화
			initdata.Cfg = {
				SearchMode : smLazyLoad,
				UpdateMergeCells : 1,
				PrevColumnMergeMode : 1,
				MergeSheet:msHeaderOnly
			};
			
			
			initdata.Cols = [
				{Header:"No|No","Type":"Seq","MinWidth":30,"ColMerge": 0},
				{Header:"신청인|신청인","Type":"Text","MinWidth":80, "Align" : "Center", "ColMerge":1},
				{Header:"신청일자|신청일자","Type":"Date","Width":100,"Format":"Ymd","ColMerge":1,"Align":"Center"},
				{
					Header : "결재여부|결재여부",
					"Type" : "CheckBox",
					"Width":80,
					"SaveName" : "A",
					"ColMerge":0
				},
				{Header:"신청금액|신청금액","Type":"AutoSum","Width":85,"SaveName":"B","Format":"Integer","ColMerge":0},
				{Header:"근태기간1|시작일","Type":"Date","Width":100,"SaveName":"C","Format":"Ymd","Align":"Center","ColMerge":0},
				{Header:"근태기간2|시작일","Type":"Date","Width":100,"SaveName":"D","Format":"Ymd","Align":"Center","ColMerge":0},
				{Header:"시간|시작","Type":"Date","Width":100,"Format":"Hm","Align":"Center","ColMerge":1},
				{Header:"시간|종료","Type":"Date","Width":100,"Format":"Hm","Align":"Center","ColMerge":1}
			];
			
			IBS_InitSheet(mySheet,initdata);
			mySheet.FitColWidth();
			doAction('search');
		}
	
	
		/*Sheet 각종 처리*/
		function doAction(sAction) {
			switch(sAction) {
				case "search": //데이터 조회
					mySheet.DoSearch("./data/scroll_type_data.js");
					break;
				case "reload": //조회 데이터 제거
					mySheet.RemoveAll();
					break;
			}
		}
		
		
		//머지 영역 교체 (머지는 조회 중에 이루어짐으로 재 조회 한다.)
		function mergeChg(str){
			_sheetCFG.Cfg["CustomScroll"] = str;
			mySheet.Reset();
			LoadPage(str);
		}
			
