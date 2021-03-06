
	//시트 높이 계산용
	var pageheightoffset = 250;

	$(document).ready(function(){
		try{
			createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
			LoadPage();
		}
		catch(e){
			alert(e.message);
		}
	});
	
	/*Sheet 기본 설정 */
	function LoadPage() {
		
		//아이비시트 초기화
		var initSheet = {};
		
		initSheet.Cfg = {
			SelectionSummary:"EmptyCell|DelRow",
			SearchMode:smLazyLoad,
			MergeSheet:msPrevColumnMerge,
			CountPosition : 2,
			// CountFormat : "TOTALROWS2 / TOTALROWS / FILTEREDCOUNT / FILTEREDCOUNT2",
			CountFormat : "데이터 건수 : TOTALROWS2  /  행 개수 : TOTALROWS",
			PrevColumnMergeMode:0
		};
		
		initSheet.Cols = [
			/*
			{"Header" : "모델번호", "Type" : "Text", "MinWidth" : 100 },
			{"Header" : "평형","Type":"Int","Width":100,"ZeroToReplaceChar":"미처리", ColMerge:0},
			{"Header" : "단가(A)","Type":"Int","Width":80,"SaveName":"A","Align":"Right",ColMerge:0, "SumType" : "Count"},
			{"Header" : "판매가(B)\nA * 1.03 / 100","Type":"AutoSum","Width":85,"SaveName":"B","PointCount" : 2, "Align":"Right",ColMerge:0},
			{"Header" : "현금구입가(C)\n A * 0.9 / 100","Type":"AutoSum","Width":85,"SaveName":"C","Format":"#,##0.00","Align":"Right",ColMerge:0},
			{"Header" : "할부구입가(D)\nA * 0.93 / 100","Type":"AutoSum","Width":85,"SaveName":"D","Format":"#,##0.00","Align":"Right",ColMerge:0},
			{"Header" : "현금부담액(E)\nB-C","Type":"Int","Width":85,"Format":"#,##0.00","ColMerge":1,"Align":"Right",ColMerge:0},
			{"Header" : "할부부담액(F)\nB-D","Type":"Int","Width":85,"Format":"#,##0.00","Align":"Right",ColMerge:0}
			*/
			{Header:"모델번호","Type":"Text","Width":130},
			{Header:"평형","Type":"Text","Width":100,"ZeroToReplaceChar":"미처리"},
			{Header:"단가(A)","Type":"Text","Width":80,"SaveName":"A","Align":"Right",ColMerge:0, "Format" : "#,##0.00",  "NumberSort" : 1},
			//{Header:"판매가(B)\nA * 1.03 / 100","Type":"AutoSum","Width":85,"SaveName":"B","Format":"#,##0.00","CalcLogic":"|A|*1.03/100","Align":"Right",ColMerge:0},
			{Header:"판매가(B)\nA * 1.03 / 100","Type":"AutoSum","Width":85,"SaveName":"B","CalcLogic":"|A|*1.03/100","Align":"Right",ColMerge:0},
			{Header:"현금구입가(C)\n A * 0.9 / 100","Type":"AutoSum","Width":85,"SaveName":"C","Format":"#,##0.00","CalcLogic":"|A|*0.9/100","Align":"Right",ColMerge:0},
			{Header:"할부구입가(D)\nA * 0.93 / 100","Type":"AutoSum","Width":85,"SaveName":"D","Format":"#,##0.00","CalcLogic":"|A|*0.93/100","Align":"Right",ColMerge:0},
			{Header:"현금부담액(E)\nB-C","Type":"AutoAvg","Width":85,"Format":"#,##0.00","CalcLogic":"(|B|-|C|)/10","ColMerge":1,"Align":"Right",ColMerge:0},
			{Header:"할부부담액(F)\nB-D","Type":"Float","Width":85,"Format":"#,##0.00","CalcLogic":"|B|-|D|","Align":"Right",ColMerge:0}
		];
		
		IBS_InitSheet(mySheet, initSheet);

		mySheet.FitColWidth();
		
		//붙여넣기 방식 결정
		mySheet.SetClipPasteMode(3);

		doAction("search");
	}
	
	
	var multiSubSum = false;
	
	/*Sheet 각종 처리*/
	function doAction(sAction) {
		switch(sAction) {
			case "search": //데이터 조회
				//mySheet.DoSearch("./data/subtotal_data.js");
				mySheet.DoSearch("./data/sum_data.xml");
				break;
			case "reload": //조회데이터 제거
				mySheet.RemoveAll();
				break;
			case "subsum": //단일컬럼 소계 (설정 후에 조회를 해야 반영됨)
				// var showcum = document.all.chk.checked?1:0;
				var info = [
					{
						StdCol : 0,       // 기준 컬럼
						SumCols : "3|4|5",  // 합계 대상 컬럼
						//AvgCols :"2",     // 평균 대상 컬럼
						// ShowCumulate : showcum,
						CaptionCol:0,
						//OtherColText : "2=%c;",
						// Sort : "desc",
						//Position : "bottomAll"
						CaptionText:"%s:%col",
						Position : "bottom"
						
					}
				];
				mySheet.ShowSubSum(info);
				doAction('search');
			break;
			case "subsum2"://여러개 컬럼 소계(설정 후에 조회를 해야 반영됨)
				// var showcum = document.all.chk.checked?1:0;
				var info = [
					{
						StdCol : 0,
						SumCols : "3|4|5|6|7",
						// ShowCumulate : showcum,
						Sort:0
					},
					{
						StdCol : 1,
						SumCols : "3|4|5",
						// ShowCumulate : showcum,
						Sort : 0,
						CaptionCol : 1
						//OtherColText : "0=%s;2=222건"
					}
				];
				mySheet.ShowSubSum(info); 
				doAction('search');
			break;
			case "hidesubsum"://소계 설정 제거
			    mySheet.HideSubSum();
			    mySheet.RemoveAll();
		    break;
		}
	}
	
function mySheet_OnSearchEnd(cd,msg){
	try{
	//합계 행에 특정 문자 입력
	mySheet.SetSumValue(0,"합 계/평 균");
	mySheet.SetCellAlign(mySheet.LastRow(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell (mySheet.LastRow(), 0, 1,2);
}catch(e){alert(e);}
		
}