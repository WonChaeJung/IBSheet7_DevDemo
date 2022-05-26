		var mySheet = new ibsheetObject();
		
		$(document).ready(function(){
			// filterCreate('mySheet');
			createIBSheet2("ibsheet_div", "mySheet", "100%", "100%");
			LoadPage();
		});
		
		function LoadPage(){
			
			$("#mySheet_Filter").click(function() {
				toggleFilter('mySheet');
			});
			
			//시트 초기화 변수
			var initSheet = {};
			initSheet.Cfg = {FrozenCol:3,SearchMode:smLazyLoad,UseHiddenFilter:1,FilterOperator:"OR"};
			initSheet.Cols = [
				{Header:"상태",Type:"Status",Width:60,SaveName:"sStatus",Align:"Center"},
				{Header:"삭제",Type:"DelCheck",Width:60,SaveName:"sDelete",Align:"Center"},
				{Header:"직책",Type:"Text",Width:100,SaveName:"job",Align:"Center"},
				{Header:"부서코드",Type:"Combo",Width:100,SaveName:"deptno",Align:"Center",ComboText:"ACCOUNTING|RESEARCH|SALES|OPERATIONS|HUMAN RESOURCE|TECH SUPPORT|MARKETING|DESIGN|FACTORY1|FACTORY2",ComboCode:"10|20|30|40|50|60|70|80|90|91",PopupText:"ACCOUNTING|RESEARCH|SALES|OPERATIONS|HUMAN RESOURCE|TECH SUPPORT|MARKETING|DESIGN|FACTORY1|FACTORY2"},
				{Header:"ID",Type:"Text",Width:60,SaveName:"empno",Align:"Center",KeyField:1,DefaultValue:'!', UpdateEdit:0},
				{Header:"이름",Type:"Text",Width:150,SaveName:"ename",Align:"",MultiLineText:1},
				{Header:"입사일",Type:"Date",Width:120,SaveName:"hiredate",Format:"Ymd",Align:"Center",EditLen:8},
				{Header:"책임자",Type:"Text",Width:120,SaveName:"mgr",Align:"Center"},
				{Header:"급여",Type:"Int",Width:120,SaveName:"sal",Align:"Right",Format:"NullInteger"},
				{Header:"COMM",Type:"Int",Width:60,SaveName:"comm",Align:"Right",Format:"Integer"}
			];
			
			//시트 초기화
			IBS_InitSheet( mySheet , initSheet);
			
			doAction('search');
		}
		
		function doAction(str){
			switch(str){
				case "search":
					mySheet.DoSearch("./data/filtering_dataEx.js");
					break;
			}
		}
		
		function toggleFilter(sheetid) {
			if($("#"+sheetid+"_filter").length == 0){
				filterCreate(sheetid);		
			}
			if(typeof(window[sheetid])!="undefined"){
				var filterRow = window[sheetid].FindFilterRow();
				var filterText = $("#"+sheetid+"_Filter").text();
				if(filterText == '필터취소') {
					filterClear(sheetid);
					$("#"+sheetid+"_filter").dialog("close");
					$("#"+sheetid+"_Filter").text('필터');
				} else {
					//필터적용된 상태이면..
					if(window[sheetid].FilteredRowCount() != window[sheetid].RowCount() && window[sheetid].FilteredRowCount() >= 0){
						//필터 적용 취소
						filterClear(sheetid);
						$("#"+sheetid+"_Filter").text("필터");
						$("#input_"+sheetid+"_filter").focus();
						
					} else{
						/* if(filterRow == 1) {
							alert("필터행이 있을 경우 열 수 없습니다.");
							$("#"+sheetid+"_filter").dialog("close");
						} else {
							$("#"+sheetid+"_filter").dialog("open");
						} */
						$("#"+sheetid+"_filter").dialog("open");
					}
				}
			}
		}
		
		function filterValue(sheetid) {
			var grid = window[sheetid];
			var keyword = document.getElementById("input_"+sheetid+"_filter").value;
			console.log(keyword);
			//값이 없으면
			if(!keyword) {
				filterClear(sheetid);
				//$("#"+sheetid+"_Filter").text("필터");
				return;
			} else {
				$("#"+sheetid+"_Filter").text("필터취소");
			}
			
			var colCnt = grid.LastCol();
			var lstColidx = lastColFind(sheetid);
			
			for(var i=0; i<=colCnt; i++){
				
				var isHide = grid.GetColHidden(i);
				var findFilter = grid.FindFilterRow();
				
				if(isHide == 0 && findFilter == -1) {
					if(grid.GetCellProperty(0,i,'Type')=='Int' || grid.GetCellProperty(0,i,'Type')=='Float') {
						grid.SetFilterValue(i, keyword, 1);
					} else {
						grid.SetFilterValue(i, keyword, 11);
					}
				}
				
				//그리드의 컬럼이 숨김처리가 되지 않은 마지막 컬럼이라면..
				if(i == lstColidx) {
					setTimeout(function(){
						//조회 결과 없음 경고창 발생
						if(grid.FilteredRowCount() == 0){
							return;
						}else{
							//다이얼로그창 닫음
							if($("#"+sheetid+"_filter").dialog("isOpen")){
								$("#"+sheetid+"_filter").dialog("close");
							}
						}
					},310);
				}
				
			}
		}
		
		function lastColFind(sheetid) {
			var grid = window[sheetid];
			var lastCol = -1;
			for(var i=0; i<grid.LastCol(); i++){
				if(!grid.GetColHidden(i)){
					lastCol = i;
				}
			}
			return lastCol;
		}
			
		function filterClear(sheetid) {
			window[sheetid].ClearFilterRow();
		}
		
		/*
			// 다이얼로그 생성 후 필터링 관련 로직
			
			function filterCreate(sheetid) {
				var str = "<div id='"+sheetid+"_filter' class='filterPop'>";
				str += "<p class='i_desc'>입력하신 내용만 추출하여 화면에서 확인 할 수 있습니다.</p>";
				str += "<div class='wrap_form'>";
				str += "<label for='input_"+sheetid+"_filter'>필터 내용</label>&nbsp;";
				str += "<input type='text' id='input_"+sheetid+"_filter' class='ui_input' onkeydown='if(event.keyCode == 13){filterValue("+'"'+sheetid+'"'+")}' />";
				str += "<button type='button' id='"+sheetid+"_button' class='act' onclick='filterValue("+'"'+sheetid+'"'+")'>찾기</button>";
				str += "</div>";
				str += "</div>";
			    
			    dialogCreate(sheetid, "필터", str, 400, 90);
			}
			
			function dialogCreate(sheetid, p_title, p_html, p_width, p_height) {
				var dialogId = "";
				var openBtn = "";
				var openFunc;
				if(p_title == "필터"){		
					dialogId = sheetid+"_filter";
					openBtn = sheetid+"_Filter";
				}
				
				$("body").append(p_html);
				var targetObj = $("#"+dialogId);
				targetObj.dialog({
					title:p_title,
					dialogClass:"sheetPop",
					autoOpen:false,
				    width:p_width,
				    //height:p_height,
				    height:"auto",
				    //maxHeight:p_height,
				    modal:false,
				    zIndex:10015,
				    resizable:false,
				    //bgiframe:true,
				    closeOnEscape:true,
				    open: function(event, ui) {
				    	//오픈 시점에 열려있는 다이얼로그 창이 있으면 모두 닫음
				    	dialogClose(dialogId, "close");
				    	
				        $(".ui-dialog-titlebar").show();
				        $(".ui-dialog").css("padding","0px");
				        //$(".ui-dialog .ui-dialog-content").css("padding","0px");
				        $(".ui-dialog .ui-dialog-content").css("overflow","hidden");
				        
				        //시트 버튼(컬럼선택) 클릭시 다이얼로그 내에 체크박스 값 재설정
				        if(openBtn==sheetid+"_ColHide"){
				        	openFunc(sheetid);
				        }
				    	//생성위치 변경
				    	$("#"+dialogId).dialog({position:{my:"left bottom", at:"right bottom", of:"#"+openBtn}});
				    	$(".sheetPop").css("z-index","10015");
				    },
				    close:function(event,ui){	    	
			    		if(dialogClose(dialogId, "count") == 0){
							
			    			$("#"+openBtn).focus();
			    			
			    			$(".sheetPop").css("z-index","10015");
			    		}
				    }
				});
			}
			
			function dialogClose(dialogid, str) {
				var dName = ["_filter","_find","_colHide"];
				var isOpen = false;
				var dialogCnt = 0;
				for(var i=0; i<Grids.length; i++){
					for(var j=0; j<dName.length; j++){
						if(Grids[i] && dialogid != Grids[i].id+dName[j]){
							isOpen = $("#"+Grids[i].id+dName[j]).dialog("isOpen");
							//dialog가 open되어 있는 창만 닫음
							if(isOpen && (typeof isOpen == "boolean")){
								if(str == "count"){
									dialogCnt++;
								}else{						
									$("#"+Grids[i].id+dName[j]).dialog("close");
								}
							}
						}
					}
				}
				//카운트가 있으면 리턴한다.
				if(str == "count") return dialogCnt;
			}
		 
		 */