
	$(document).ready(function(){
		createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
		LoadPage();
	})
	
	
	//시트 높이 계산용
	/* body OnLoad */
	function LoadPage() {
		//시트 초기화
		var initData = {};
		
		// 다중라인레코드 사용시 Merge 유형 주의
		initData.Cfg = {  SearchMode:smLazyLoad,Page:10,MergeSheet: msFixedMerge + msHeaderOnly};
		initData.Cols = [ 
			//첫번째 단위데이터행(DataRow)
			[
				{ Header:"No", Type:"Seq", SaveName:"Seq", Align: "Center",Width:50,MinWidth:50},	
				{ Header:"사진", Type:"Image", SaveName:"IMG", Align: "Center",Width:52,ImgWidth:50,ImgHeight:66,RowSpan:3,DefaultValue:0},
				{ Header:"이름", Type:"Text", SaveName:"SA_NAME", Edit: 1,Width:100,  Align: "Center"},
				{ Header:"성별", Type:"Combo", SaveName:"SA_GENDER", Edit: 1, Width:80, Align:"Center", ComboText:"MALE|FEMALE", ComboCode:"1|2"},
				{ Header:"부서", Type:"Text", SaveName:"SA_DEPT", Edit: 1,Width:60, Align: "Left",ColSpan:2, Ellipsis:1},
				{ Header:"부서", Width:100},
				{ Header:"직급", Type:"Combo", SaveName:"SA_POSITION", Edit: 1,Width:100, Align: "Center",ComboText:"Clerk|Assist Manager|Manager|General Manager|Director", ComboCode:"1|2|3|4|5"},
				{ Header:"결혼유무", Type:"Combo",SaveName:"SA_MARRIED", Width:80, Align: "Center" ,ComboText:"Single|Merried|Devorced", ComboCode:"Single|Merried|Devorced"},
				{ Header:"국적", Type:"Text", SaveName:"SA_COUNTRY", Edit: 1, Width:60, Align: "Left", ColSpan:2, Ellipsis:1},
				{ Header:"국적", Width:80}
			],
		
			//두번째 단위데이터행(DataRow)
			[
				{ Header: "상태",Type:"Status", SaveName:"sStatus", Align:"Center"},
				{ Header: "사진"},
				{ Header: "전화번호", Type: "Text",SaveName:"SA_PHONE", Align: "Center"},
				{ Header: "학력", Type: "Combo",SaveName:"SA_EDU",  Align: "Center", ComboText:" |Bachelor|M.S|Ph.D|etc", ComboCode:"1|2|3|4|5"},
				{ Header: "경력", Type: "Int",SaveName:"SA_CARRIER",  Align: "Right"},
				{ Header: "입사일", Type: "Date",SaveName:"SA_ENTERDATE",  Align: "Center"},
				{ Header: "퇴사일", Type: "Date",SaveName:"SA_RETIREDATE",  Align: "Center"},
				{ Header: "전직장", Type: "Text",SaveName:"SA_COMPANY",  Align: "Left", Ellipsis:1},
				{ Header: "연봉", Type: "Int",SaveName:"SA_SALARY",  Align: "Right", Format:"$ #,##0"},
				{ Header: "보너스", Type: "Int",SaveName:"SA_BONUS",  Align: "Right", Format:"$ #,##0"}
			],
					 	
			//세번째 단위데이터행(DataRow)
			[
				{ Header: "삭제", Type:"DelCheck", SaveName:"Del", Align:"Center"},
				{ Header: "사진"},
				{ Header: "주소", Type: "Text",SaveName:"SA_ADDRESS", Align: "Left", Ellipsis:1, ColSpan:4},
				{ Header: "주소"},
				{ Header: "주소"},
				{ Header: "주소"},
				{ Header: "우편번호", Type: "Text",SaveName:"SA_ZIP", Align: "Center"},
				{ Header: "E-Mail", Type: "Text",SaveName:"SA_EMAIL", Align: "Left" , Ellipsis:1, ColSpan:3},
				{ Header: "E-Mail"},
				{ Header: "E-Mail"}
			]	
		];
		 IBS_InitSheet(mySheet, initData);
		 
		 mySheet.FitColWidth();
		 
		 //시트에 보여질 이미지 배열
		 mySheet.ShowFooterRow(
			[
				{
					"Seq":"Seq", 
					"IMG":"IMG",
					"SA_NAME" : "SA_NAME",
					"SA_GENDER":"SA_GENDER",
					"SA_DEPT":"SA_DEPT",
					"SA_POSITION":"SA_POSITION",
					"SA_MARRIED" : "SA_MARRIED",
					"SA_COUNTRY" : "SA_COUNTRY"
				},
				{
					"SA_PHONE":"SA_PHONE",
					"SA_EDU":"SA_EDU",
					"SA_CARRIER":"SA_CARRIER",
					"SA_ENTERDATE":"SA_ENTERDATE",
					"SA_RETIREDATE":"SA_RETIREDATE"
				}
			]
		);
		 //건수정보 표시줄 위치
		 // mySheet.SetCountPosition(4);
		
		 // mySheet.SetColProperty(1,3, {ComboText:"A|B|C", ComboCode:"A|B|C"})
		 
		//조회
		doAction('search');
	}
	

	

	/*Sheet 각종 처리*/
	function doAction(sAction) {
		switch(sAction) {
			case "search":      //조회
				mySheet.DoSearch("./data/multiline_record_data.js");
				break;
			case "reload":	//조회 데이터 삭제
				mySheet.RemoveAll();
				break;
			case "insert":		//신규행 추가
				mySheet.DataInsert()
				break;
			case "down2excel": //엑셀 다운로드
				mySheet.Down2Excel({"FileName":"text.xlsx",Merge:1,SheetDesign:1});
				break;
			case "save":	//저장할 데이터를 json 형식으로 추출
				var a = mySheet.GetSaveJson();
				alert(JSON.stringify(a));
				break;
				
		}
	}

