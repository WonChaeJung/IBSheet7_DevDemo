		
			$(document).ready(function(){
				createIBSheet2("sheetArea", "mySheet", "100%", "100%");
				LoadPage();
				doAction('search');
			});
			
			function LoadPage() {
				var initSheet = {
					Cfg : {
						SearchMode:smClientPaging,
						Page:50,
						SelectionSummary : "EmptyCell|DelRow",
						MergeSheet:msHeaderOnly
					},
					HeaderMode : {
						Sort:1,
						ColMove:1,
						ColResize:1,
						FitSizeColMode : 0,
						HeaderCheck:1
					}
				};
				
				initSheet.Cols = [
					{Header:"순번", Type:"Seq", Width:20, Align:"Center"},
					{Header:"상태", Type:"Status", Width:35, Align:"Center"},
					{Header:"", Type:"CheckBox", SaveName : "CHK_DATA", Width:35, Align:"Center", Sort : 0},
					{Header:"개봉일",Type:"Date",MinWidth:85,SaveName:"OPEN_DATE",Format:"Ymd",Align:"Center"},
					{Header:"영화명",Type:"Text",MinWidth:180,SaveName:"MOVIE_NM"},
					{Header:"영문제목",Type:"Text",MinWidth:150,SaveName:"ENG_NM", KeyField : 1},
					{Header:"감독",Type:"Text",MinWidth:120,SaveName:"DIRECTOR"},
					{Header:"주연배우",Type:"Text",MinWidth:150,SaveName:"ACTOR"},
					{Header:"등급",Type:"Combo",MinWidth:50,SaveName:"FILM_RATE",Align:"Center",ComboText:"12세|15세|18세|전체|청불",ComboCode:"01|02|03|04|05",PopupText:"12세|15세|18세|전체|청불"}
				];
				
				IBS_InitSheet(mySheet,initSheet);
				
				mySheet.FitColWidth();
				mySheet.SetCountPosition(4);
				mySheet.SetPagingPosition(1);
				// mySheet.SetTotalRows(1000);
				// 건수 포멧
				// mySheet.SetCountFormat('조회 : SEARCHROWS건  / 입력: INSERTROWS건 / 수정: UPDATEROWS / 삭제: DELETEROWS /');
			}
			
		
			/*
			// 현재 보여지는 페이지 내용만 체크
			function mySheet_OnBeforeCheckAll(Row, Col) {
				var curPage = mySheet.GetCurrentPage(),
					pageCnt = mySheet.GetPageCount(),
					chkVal = mySheet.GetHeaderCheck(Row, Col),
					headerRows = mySheet.HeaderRows(),
					lastRow = mySheet.LastRow(),
					startIdx = (pageCnt * (curPage-1)) + headerRows,
					endIdx = (startIdx + pageCnt) - headerRows;
				
				endIdx = endIdx > lastRow ? lastRow : endIdx
				
				if(!chkVal || chkVal == ""){
					chkVal = 1;
					mySheet.SetHeaderCheck(Row, Col, chkVal);
				}else{
					chkVal = 0;
					mySheet.SetHeaderCheck(Row, Col, chkVal);
				}
				mySheet.SetRangeValue(chkVal+"", startIdx, Col, endIdx, Col);
				return false;
			}
			*/
			
			function doAction(sAction) {
				switch(sAction) {
					case "search":      //조회
						// mySheet.DoSearch("search_data.json");
						mySheet.DoSearch("./data/pagingsearch_data.js");
						break;
					case "reload":	//조회데이터 제거
						mySheet.RemoveAll();
						break;
					case "save":	//저장할 데이터 추출
						alert(mySheet.GetSaveString());
						break;
				}
			}
			
			//페이지 네비게이션 표시
			function navigation(chk){
				if(chk){
					//페이지 네비게이션 버튼 표시
					mySheet.SetPagingPosition(0);	
					document.getElementById("pageindex").style.display="inline";
				}else{
					//페이지 네비게이션 버튼 표시
					mySheet.SetPagingPosition(1);	
					document.getElementById("pageindex").style.display="none";
				}
			}
			
			/* IB Sheet 7 Event */
			function mySheet_OnSearchEnd() { //조회 후 call back 이벤트
				console.log("OnSearchEnd");
				makePageIndex(1,"mySheet");
			}
			
			function mySheet_OnSort(Col,SortArrow){ //헤더 클릭시 소팅후 call back 이벤트
				var nowPage = mySheet.GetCurrentPage();
				makePageIndex(nowPage,"mySheet");	
			}
			