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
			
			function LoadPage() {
				//아이비시트 초기화
				var initData = {
					Cfg : {SearchMode:smLazyLoad, Page:50,MergeSheet:msHeaderOnly,AutoFitColWidth:""},
					Cols : [
						{Header:"행/열 필드|부서명",Type:"Text", SaveName:"sDept", Width:80, Align:"Center",Edit:0},
						{Header:"행/열 필드|팀명",Type:"Text", SaveName:"sTeam", Width:80, Align:"Center",Edit:0},
						{Header:"행/열 필드|직급",Type:"Text", SaveName:"sPos", Width:80, Align:"Center",Edit:0},
						{Header:"행/열 필드|성명",Type:"Text", SaveName:"sName", Width:80, Align:"Center"},
						{Header:"행/열 필드|성별",Type:"Combo", SaveName:"sSex", Width:80, Align:"Center",ComboText:"男|女",ComboCode:"남|여"},
						{Header:"행/열 필드|연령대",Type:"Text", SaveName:"sAge2", Width:80, Align:"Center"},
						{Header:"행/열 필드|거주지1",Type:"Text", SaveName:"sAddr1", Width:80, Align:"Center"},
						{Header:"값 필드|나이",Type:"Int", SaveName:"sAge", Width:80, Align:"Right"},
						{Header:"값 필드|근속기간",Type:"Int", SaveName:"sYearOfService", Width:80, Align:"Right"},
						{Header:"값 필드|급여",Type:"Int", SaveName:"sSalary", Width:80, Align:"Right",Format:"#,###  원"},
						{Header:"값 필드|상여",Type:"Int", SaveName:"sBonus", Width:80, Align:"Right",Format:"#,### 원"},
						{Header:"값 필드|급여 + 상여", Type:"Int", SaveName:"sSalBon", Width:80, Align:"Right",Format:"#,### 원", CalcLogic : "|sSalary| + |sBonus|"}
					]
				};
			
				IBS_InitSheet(mySheet, initData);
				
				mySheet.FitColWidth();
				
				//헤더 배경글자색 변경
				mySheet.SetCellBackColor(0,0,"#3F73A5");
				mySheet.SetCellFontColor(0,0,"#FFFFFF");
				mySheet.SetCellBackColor(0,7,"#1F5385");
				mySheet.SetCellFontColor(0,7,"#FFFFFF");
				
				// IBS_InitSheet(mySheet_pivotTest, initData);
				
				doAction("search");
				
			}
		
			/*Sheet 각종 처리*/
			function doAction(sAction) {
				switch(sAction) {
					case "search": //조회
						mySheet.DoSearch("./data/pivot_data.js");
					break;
					case "pivot_ExcelDown": //엑셀다운
						//피봇된 아이비시트 엑셀 다운.
						if(typeof mySheet_Pivot  != "undefined"){
						mySheet_Pivot.Down2Excel({"FileName":"pivotSheet.xlsx","SheetDesign":1,"Merge":1});
						}else{
						alert("피봇된 시트가 존재하지 않습니다.");	
						}
					break;
					case "excelDown":
						mySheet.Down2Excel({"SheetDesign":1});
					break;
					
					case "removeall":        //조회데이터 제거
						mySheet.RemoveAll();
					break;
					
					case "pivotPop": //사용자 피봇 다이얼로그 띄우기 (ctrl+shift+t)
						mySheet.ShowPivotDialog();
					break;
				}
			}
			
			//피벗시 단일 소계 컬럼을 감춘다.
			function mySheet_Pivot_OnSearchEnd(code,msg){
				//피봇 그리드 mySheet_Pivot
				var _sheet = mySheet_Pivot;
				
				var hiddenCol = [];
				//헤더행이 적어도 2개 이상 있는 경우에만 하자.
				var hr = _sheet.HeaderRows();
				if(hr<2) return;
				var lc = _sheet.LastCol();
				var x = 2;
				for(var row= hr-1;row>0;row--){
					var tempStr = [];
					for(var col=1;col<=lc;col++){
						tempStr.push(_sheet.GetCellText(row-1,col));
						var cell = _sheet.GetCellText(row,col);
						if(cell.substring(cell.length-2)=="소계"){
							
							if(tempStr.length== x){
								hiddenCol.push(col);
							}	
							tempStr = [];
						}
					}
					x++;
				}
				
				_sheet.RenderSheet(0); //렌더링 일시 중지
				for(var i=0;i<hiddenCol.length;i++){
					//테스트 시 사용하기 (감춰질 컬럼에 배경색을 칠해 본다.)
		//			_sheet.SetColBackColor(hiddenCol[i],"#FF0000");	
					//컬럼을 감춘다.
					_sheet.SetColHidden(hiddenCol[i] , 1);
				}
				_sheet.RenderSheet(1); //렌더링 활성화
			}
		
			function test123(){
				mySheet_pivotTest.CreatePivotTable({ Rows : "1", Cols : "5", Value : "9", SortRow : 1}, mySheet);
			}
		
			function mySheet_pivotTest_OnSearchEnd(Code, Msg){
				if(Code == 0){
					mySheet_pivotTest.SetHighlightAfterSort(2);
					mySheet_pivotTest.ColumnSort("0", "DESC");
				}
			}
			
			function mySheet_pivotTest_OnColumnSort(Col, Order) {
				if(mySheet_pivotTest.GetHighlightAfterSort() == 2){
					mySheet_pivotTest.SetHighlightAfterSort(1);
				}
			}