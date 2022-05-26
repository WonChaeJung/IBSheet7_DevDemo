		
			//시트 높이 계산용
			var pageheightoffset = 170;
		
			$(document).ready(function(){
				createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
				LoadPage();
			})
			
			function LoadPage() {
				//아이비시트 초기화
				var initSheet = {
					Cfg : {
						SearchMode:smLazyLoad,
						Page:30
					},
					Cols : [
						{Header:"NO",Type:"Seq",Width:40 ,	SaveName:"SEQ",Align:"Center"},
						{Header:"차량명",Type:"Text",Width:165,	SaveName:"NAME" , Filter : 0},
						{Header:"특징",Type:"Text",Width:105,SaveName:"SUBJECT"},
						{Header:"연식",Type:"Int",Width:60,SaveName:"YEAR",Format:"####년",Align:"Center"},
						{Header:"가격",Type:"Int",Width:70,SaveName:"PRICE",Format:"#,###만원",Align:"Center"},
						{Header:"사용거리",Type:"Int",Width:70,	SaveName:"DISTANCE",Format:"#,##0Km",Align:"Center"},
						{Header:"사고유무",Type:"Combo",Width:50,	SaveName:"ACCIDENT",ComboText:"무사고|사고",ComboCode:"0|1",Align:"Center"},
						{Header:"판매자",Type:"Text",Width:55,	SaveName:"DEALER"	,Align:"Center"},
						{Header:"등록일자",Type:"Date",Width:100,SaveName:"CDATE" ,Format:"Ymd",Align:"Center"},
						{Header:"조회수",Type:"Int",Width:50,SaveName:"COUNT"}
					]
				};
				
				IBS_InitSheet(mySheet, initSheet);
				
				mySheet.FitColWidth();
				
				//Filter 헤더 추가
				mySheet.ShowFilterRow();
				
				//건수 표시줄 제거
				mySheet.SetCountPosition(0);
				
				doAction("search");
				
			}
		
			function setFilterDefaultValue(strTitle){
				var nCols = mySheet.LastCol()+1,
					nRow = mySheet.HeaderRows();
				for(var i=1; i<=nCols; i+=1){
					var objTd = $(".HideCol0C"+i)[nRow];
					if(objTd != undefined) objTd.innerText = strTitle;
				}
			}
			
			/*Sheet 각종 처리*/
			function doAction(sAction) {
				switch(sAction) {
				case "search": //조회
					mySheet.DoSearch("./data/filtering_data.js");
					// setTimeout(function(){setFilterDefaultValue("값을 입력해주세요");}, 10);
					break;
				case "reload": //조회 데이터 삭제
					mySheet.RemoveAll();
					break;
				}
			}
			
			/* FilteredRow 가 없을때 */
			function getFilteredData(){
				var objSht = window["mySheet"],
					sRow = objSht.HeaderRows(),
					eRow = objSht.GetDataLastRow(),
					rtnData = [];
					
				
				for(var i = sRow; i <= eRow; i+=1 ){
					
					if(!objSht.GetRowHidden(i)){
						if(i == objSht.FindFilterRow()){
							continue;
						}
						rtnData.push(objSht.GetRowData(i));
					}
				}
				
				return rtnData;
			}
		