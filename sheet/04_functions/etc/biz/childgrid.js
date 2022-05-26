
	$(document).ready(function(){
		createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
		LoadPage();
	})
	
			
	//시트 초기 높이 결정
	var pageheightoffset = 250;

	/*Sheet 기본 설정 */
	function LoadPage() {
		//시트 초기화
		mySheet.Reset();
		
		var initData = {
				Cfg : {
					SearchMode : smLazyLoad,
					// ChildPage : 10,
					MergeSheet : msHeaderOnly,
					// DragMode : 1,
					// TreeNodeIcon : 1,
					"UseChildGrid" : 1,
					ChildGrid : {
						Cfg : {
							MergeSheet : msHeaderOnly,
							CountPosition  : "0",
							FocusAfterProcess : 0
						},
						HeaderMode : {
							Sort : 0, Move : 0
						},
						Height : 200
					},
					DeferredVScroll : 1
				},
				HeaderMode : {
					Sort : 0,
					Move : 0
				},
				Cols : [
					{Header:"행정구역별|행정구역별" ,Type:"Text", Width:100, TreeCol:1, CheckSaveName : "ChkSaveName", SaveName : "sigudong",  ColMerge : 0, LevelSaveName: "LevelSaveNameTEST"},
					{Header:"2018-08|총인구수", Type:"Text", Width:70,  Align:"Center", SaveName : "tot1808" },
					{Header:"2018-08|남자", Type:"Text", Width:100, Align:"Center", SaveName : "man1808", ColMerge : 0},
					{Header:"2018-08|여자", Type:"Text", Width:100, Align:"Center", SaveName : "woman1808", ColMerge : 0},
					{Header:"2018-07|총인구수", Type:"Text", Width:100, Align:"Center", SaveName : "tot1807" },
					{Header:"2018-07|남자", Type:"Text", Width:100, Align:"Center", SaveName : "man1807", ColMerge : 0},
					{Header:"2018-07|여자", Type:"Text", Width:100, Align:"Center", SaveName : "woman1807", ColMerge : 0},
					{Header:"2018-06|총인구수", Type:"Text", Width:100, Align:"Center", SaveName : "tot1806" },
					{Header:"2018-06|남자", Type:"Text", Width:100, Align:"Center", SaveName : "man1806", ColMerge : 0},
					{Header:"2018-06|여자", Type:"Text", Width:100, Align:"Center", SaveName : "woman1806", ColMerge : 0},
				]
			};
		
		initData["Cfg"]["ChildGrid"]["Cols"] = [
			{Header:"순\n번|순\n번",Type:"Seq", Align:"Center",  ColMerge : 0},
			{Header:"구역별\n(군/구)|구역별\n(군/구)" ,Type:"Text", Width:100,  SaveName : "sigudong" },
			{Header:"2018-08|총인구수", Type:"Text", Width:70,  Align:"Center", SaveName : "tot1808" },
			{Header:"2018-08|남자", Type:"Text", Width:100, Align:"Center", SaveName : "man1808"},
			{Header:"2018-08|여자", Type:"Text", Width:100, Align:"Center", SaveName : "woman1808"},
			{Header:"2018-07|총인구수", Type:"Text", Width:100, Align:"Center", SaveName : "tot1807" },
			{Header:"2018-07|남자", Type:"Text", Width:100, Align:"Center", SaveName : "man1807"},
			{Header:"2018-07|여자", Type:"Text", Width:100, Align:"Center", SaveName : "woman1807"},
			{Header:"2018-06|총인구수", Type:"Text", Width:100, Align:"Center", SaveName : "tot1806" },
			{Header:"2018-06|남자", Type:"Text", Width:100, Align:"Center", SaveName : "man1806"},
			{Header:"2018-06|여자", Type:"Text", Width:100, Align:"Center", SaveName : "woman1806"},
		]
		
		IBS_InitSheet(mySheet, initData);
		mySheet.SetFocusAfterRowTransaction(0)
/* 				
				mySheet.SetTreeCheckActionMode(1); 
				mySheet.SetVisible(true);
				mySheet.SetCountPosition(4);
				mySheet.SetTreeActionMode("1")
				mySheet.SetTreeCheckActionMode("1");
 */				
		mySheet.SetEditable("0");
		mySheet.FitColWidth();
		doAction('search');
		
	}
	
	function mySheet_OnTreeChildGrid(childSheet){
		childSheet.FitColWidth();
		// childSheet.DoSearch(childData);
		var row = mySheet.GetSelectRow(),
			key = mySheet.GetCellValue(row, "sigudong")
			objJson = resultSubData[key];
		/*
		childSheet.SetRowHidden(0, 0);
		childSheet.SetRowHidden(1, 0);
		*/
		childSheet.LoadSearchData(objJson);
		
		//testSheet_childGrid.FitColWidth();
		//testSheet_childGrid.SetTheme("LGY", "LightGray");
	}
	

	// 접고 펼칠때 로우 없애줘야 함
	function mySheet_OnBeforeExpand(Row, Expand){
		if(Expand){
			mySheet.SetRowHidden(Row+1, false);
		}else{
			mySheet.SetRowHidden(Row+1, true);
		}
	}
	
	var row = "";
	/*Sheet 각종 처리*/
	function doAction(sAction) {
		switch(sAction) {
			case "search":  //데이터 조회
				mySheet.DoSearch("./data/childgrid_data.js");
				//mySheet.DoSearch("tree_data.xml");
				mySheet.ShowTreeLevel(0);
				break;
			case "reload":  //조회데이터 제거
				mySheet.RemoveAll();
				break;
		}
	}


	function doEvent(obj, val){
		switch (obj){
			case "open":
				val = parseInt(val);
				var openlevel = parseInt(document.getElementById("levelCombo").value);
				var childopen = parseInt(document.getElementById("openCombo").value);
				//레벨별 트리 접기/펼침
				mySheet.ShowTreeLevel(openlevel,childopen);
				break;
			case "act":
				val = parseInt(val);
				//어미노드삭제 체크시 하위노드 체크 여부
				mySheet.SetTreeActionMode(val); 
				break;
		}
	}
	
	// 최초 로드시 모두 접기로 표시 함
	function mySheet_OnSearchEnd(code, message) {
		mySheet.ShowTreeLevel(0);
	}