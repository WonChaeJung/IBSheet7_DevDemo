	
		// var mySheet;

		$(document).ready(function(){
			try{
				createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
				LoadPage();
			} catch(e){
				alert(e.message);
			}
		});
		
		function LoadPage() {
	
			//시트 초기화.
			var initSheet = {};
			initSheet.Cfg = {
				Page : 20,
				// SizeMode : 0,
				// VScrollMode: true,
				FrozenCol : 3,
				SelectionMode : 2,
				// FrozenColRight : 2,
				// ColPage : 4,
				SumPosition : 0, // 0 상단 [default], 1 하단  
				MultiCheckValue : 1,
				EditArrowBehavior : 2,
				AutoFitColWidth : "",
				// MergeSheet : 1,
				ComboMaxHeight : 350,
				TouchScroll : 1
				// TouchScrolling : 1,
			};
			
			initSheet.HeaderMode = {
				Sort : 1,
				ColMove : 1,
				ColResize : 1,
				HeaderCheck : 1
			};
			
			initSheet.Cols = [
				{
					Header:"체크",
					Type:"CheckBox",
					SaveName:"CHECKBOX_DATA",
					MinWidth : 40,
					KeyField:0,
					Format:"",
					PointCount:0,
					UpdateEdit:1,
					InsertEdit:1,
					EditLen:2,
					TrueValue:"Y",
					FalseValue:'N'
				},
				{
					Header:"NO", 
					Type:"Seq",
					Align:"Right",
					MinWidth : 30,
					ToolTip : 1,
					ActionMenu : ["TEST1", "TEST2"],
					InsertEdit : 1,
					SaveName:"seq"
				},
				{
					Header:"상태",
					Type:"Status",
					Align:"Center",
					MinWidth : 50,
					ToolTip : 1,
					ActionMenu : ["TEST1", "TEST2"],
					SaveName:"sStatus"
				},
				{
					Header:"더미",
					MinWidth : 50,
					SaveName : "DUMMYCHECKBOX_DATA",
					DefaultValue : 0,
					ActionMenu : ["TEST1", "TEST2"],
					InsertEdit : 0,
					ToolTip : 1,
					Type:"DummyCheck"
				},
				{
					Header:"삭제",
					Type:"DelCheck",
					MinWidth : 50,
					SaveName : "DelCheck",
					ToolTip : 1
				},
				{
					Header:"문자열", 
					Type :"Text",
					SaveName :"TEXT_DATA",
					MinWidth : 70,
					MultiLineText : 1,
					PopupButton : 0,
					Wrap : 1,
					Edit : 1,
					ToolTip : 1,
					DefaultValue : "none",
					Cursor : "Pointer"
					//, TestProp : "TEST######" // 사용자 정의 속성 적용 가능
				},
				{
					Header :"콤보", 
					Type:"Combo",
					MinWidth :70,
					SaveName :"COMBO_DATA",
					ComboText :"대기|진행중|완료",
					ComboCode :"01|02|03",
					EditLen : 3,
					ToolTip : 1,
					PopupCheckEdit : 1,
					PopupText :"대기|진행중|완료",
					PopupCode : "01|02|03"
				},
				{ Header : "Html", Type : "Html", Align : "Center", SaveName : "HTML"},
				{
					Header:"콤보에디트",
					Type:"ComboEdit",
					MinWidth:80,
					SaveName:"COMBOEDIT_DATA",
					ComboText:"고려대학교|고려대학교2|국민대학교|서울대학교|숙명여자대학교|연세대학교|울산대학교|울산과학기술대학교|이화여자대학교|인천대학교|인천가톨릭대학교",
					ComboCode:"AA|BB|CC|DD|EE|FF|GG|HH|II|JJ|KK",
					PopupText:"고려대학교|고려대학교2|국민대학교|서울대학교|숙명여자대학교|연세대학교|울산대학교|울산과학기술대학교|이화여자대학교|인천대학교|인천가톨릭대학교",
					AcceptKeys : "N|[.-]",
					Format : "Integer",
					ActionMenu : [
						{Text : "TEST1", Code : "01"},
						{
							Text : "TEST2", Code : "02",
							Items : [
										{Text : "TEST2-1", Code : "11"},
										{Text : "TEST2-2", Code : "12"}
									]
						}
					],
					ToolTip : 1,
					InputCaseSensitive : 1,
					DefaultValue : "CC",
					Validation:0
				},
				{
					Header:"팝업",
					Type:"Popup",
					MinWidth:70,
					ToolTip : 1,
					MultilineText : 1,
					DefaultValue : "none",
					SaveName:"ISO"
				},
				{
					Header:"팝업에디트",
					Type:"PopupEdit",
					MinWidth:110,
					ToolTip : 1,
					InputCaseSensitive : 1,
					DefaultValue : "none",
					PopupCheckEdit : 1,
					SaveName:"CURRENCY"
				},
				{
					Header:"자동합계",
					Type:"AutoSum",
					Align:"Right",
					AllowNull : 1,
					RowMerge : 1,
					ToolTip : 1,
					DefaultValue : 9999,
					SaveName:"AUTOSUM_DATA",
					MinWidth:70,
					Format:"#,##0",
					MaximumValue:100000
				},
				{
					Header : "자동평균",
					Type : "AutoSum",
					Align : "Right",
					RowMerge : 1,
					SaveName : "AUTOAVG_DATA",
					MinWidth : 70,
					AllowNull : 0,
					Format : "#,###",
					SumType : "AVG"
				},
				{
					Header:"정수",
					Type:"Int",
					Align:"Right",
					ToolTip : 1,
					SaveName:"INT_DATA",
					MinWidth:70
				},
				{
					Header:"실수",
					Type:"Float", 
					Align:"Right",
					Hidden : 0,
					ToolTip : 1,
					SaveName:"FLOAT_DATA",
					AllowNull : 1,
					Format:"#,##0.0%",
					MinWidth:70
				},
				{
					Header:"실수",
					Type:"Float", 
					Align:"Right",
					CalcLogic : "|FLOAT_DATA| * 100",
					ToolTip : 1,
					SaveName:"FLOAT_DATA2",
					Format : "#,##0.000\\%",
					AllowNull : 1,
					MinWidth:70
				},
				{
					Header:"날짜",
					Type:"Date",
					Align:"Center",
					Format : "Ymd",
					ToolTip : 1,
					DefaultValue : "20180329",
					SaveName:"DATE_DATA", 
					MinWidth:100,
					PointCount:0,	UpdateEdit:1,	InsertEdit:1,	EditLen:8 
				},
				{
					Header:"주민/사업자번호",
					Type:"Text",
					Align:"Center", 
					SaveName:"IDNO",
					Format:["IdNo","SaupNo"],
					Edit : 1,
					ActionMenu : ["TEST1", "TEST2"],
					MinWidth:100
				},
				{
					Header:"우편번호",
					Type:"Text",
					Align:"Center",
					SaveName:"POSTNO",
					Format:"PostNo",
					MinWidth:70
				},
				{
					Header:"카드번호",
					Type:"Text", 
					Align:"Center",
					Save : 0,
					SaveName:"CARDNO",
					Format:"CardNo",
					ToolTip : 1,
					MinWidth:130
				},
				{
					Header:"전화번호",
					Type:"Text",
					Save : 0,
					Align:"Center", 
					SaveName:"PHONENO",
					Format:"PhoneNo",
					ToolTip : 1,
					MinWidth:90
				},
				{
					Header:"사용자 정의 포멧",
					Type:"Text",
					Save : 0,
					Align:"Center", 
					SaveName:"USERFORMAT",
					Format:"###-**-**###",
					ToolTip : 1,
					MinWidth:100
				},
				{
					Header:"이미지",
					Type:"Image",
					Align:"Center",
					FitColWidth : 0,
					ActionMenu : ["TEST1", "TEST2"],
					SaveName:"IMAGE_DATA",
					ImgHeight:15,
					MinWidth:70
				},
				{
					Header:"이미지2",
					Type:"Image",
					Align:"Center",
					FitColWidth : 0,
					ActionMenu : ["TEST1", "TEST2"],
					DefaultValue : 1,
					SaveName:"IMAGE_DATA2",
					ImgHeight:15,
					MinWidth:70
				},
				{
					Header:"패스워드",
					Type:"Pass",
					ToolTip : 1,
					StaticPassword : 0,
					MinWidth : 100,
					SaveName:"PASS_DATA"
				},
				{
					Header:"버튼",
					Type:"Button",
					SaveName:"BUTTON",
					DefaultValue:"상세정보",
					ColMerge : 0,
					ToolTip : 1,
					MinWidth : 100,
					Align:"Center"
				},
				{
					Header:"다중체크박스",
					Type:"CheckBox",
					SaveName:"MULTICHECKBOX_DATA",
					MinWidth:140,
					ActionMenu : ["TEST1", "TEST2"],
					ItemText:"상|중|하",
					ItemCode:"H|M|L",
					DefaultValue : "L",
					
					MaxCheck:1
				},
				{
					Header:"체크박스",
					Type:"CheckBox",
					MinWidth : 100,
					SaveName:"CHECKBOX_DATA",
					DefaultValue : 1
				},
				{
					Header:"라디오",
					Type:"Radio",
					ActionMenu : ["TEST1", "TEST2"],
					ToolTip : 1,
					DefaultValue : 1,
					MinWidth : 100,
					SaveName:"RADIO_DATA"
				},
				{
					Header:"차트",
					Type: "Sparkline",
					MinWidth : 100,
					RowMerge : 1,
					Chart : {
						Type : "Column",
						Data : "AUTOSUM_DATA|AUTOAVG_DATA|INT_DATA|FLOAT_DATA"
					}
				}
			];
			
			IBS_InitSheet( mySheet , initSheet);
			
			//붙여넣기 모드 (0:한셀에붙여넣기(default) , 1:구분자 기준으로 붙여넣기 , 2:모자란 부분을 추가하면서 붙여넣기)
			// mySheet.SetClipPasteMode(4);
			
			//시트에서 보여질 이미지 배열 구성
			mySheet.SetImageList(0,"");
			mySheet.SetImageList(1,"../../common/img/ca.jpg");
			mySheet.SetImageList(2,"../../common/img/ch.png");
			mySheet.SetImageList(3,"../../common/img/fe.jpg");
			mySheet.SetImageList(4,"../../common/img/ko.jpg");
			mySheet.SetImageList(4,"../../common/img/ru.jpg");
			
			// 달력 팝업 이미지를 표시하도록 함
			mySheet.SetShowButtonImage(2);
			
			
			doAction("search");
			
		}
		 
		/*Sheet 각종 처리*/
		function doAction(sAction) {
			switch(sAction) {
				case "search":      //조회
					try{
						mySheet.DoSearch("./data/column_type_data.js");
					}catch(e){
						alert("ERROR");
						console.log(e);
					}
				
					break;
				case "reload":  //조회 데이터 제거
					mySheet.RemoveAll();
					break;
				case "save":  //수정된 데이터 추출 확인
					alert(mySheet.GetSaveString());
					break;
				case "insert"://신규행 추가
					var row = mySheet.DataInsert();
					break;
					case "Down2Excel"://엑셀 다운로드
					var param = {SheetDesign:1,TitleText:"데이터 타입/포멧 예제\r\n\r\n",UserMerge:"0,0,2,12",ComboValidation:1}
					mySheet.Down2Excel(param);
					break;
			}
		}
		
		//Popup,PopupEdit 컬럼에 팝업 버튼 클릭시 호출 이벤트
		function mySheet_OnPopupClick(Row,Col){
			console.log(Row, Col);
			if(Col == mySheet.SaveNameCol("ISO")){
				var v = mySheet.GetCellText(Row,"ISO");
				document.getElementById("popupFrame").src="./popup.jsp?searchCondition="+encodeURIComponent(v);
				//DIV 형태의 팝업창을 띄운다.
				showAndHide(1);
			}else if(Col == mySheet.SaveNameCol("DATE_DATA")){
				mySheet.ShowCalendar();
			}
			
		}
		
		
		//DIV 형태의 팝업창 
		function showAndHide(flag){
			if(flag){
				//block이 있는지 확인
				if($("#block").length==0){
					//block 생성하기
					$("<div/>", {
					    id: "block",
					   css:{position:"absolute",top:0,left:0,width:"100%",height:"100%","background-color":"#777777", opacity: "0.4",    filter: "alpha(opacity=40)"}
					}).appendTo(document.body);
				}else{ $("#block").show();}
				
				
				//팝업이 나타날 위치 계산하기
				//시트 안에서 해당 열의 left 값
				var pleft =  ($(window).width()/2)-200;
				//시트 안에서 해당 행의 top 값
				var ptop =  ($(window).height()/2)-100;
				$("#popupDiv").css("top",ptop).css("left",pleft);
				$("#popupDiv").show();
			}else{
				//감춘다.
				$("#block").hide();
				$("#popupDiv").hide();
			}
		}
		
		//DIV팝업으로 부터 받은 내용을 시트에 반영한다.
		function setData(rowData){
			mySheet.SetRowData(  mySheet.GetSelectRow(),  rowData);
			
		}
		function mySheet_OnClick(Row, Col) {
			
			_ev = window.event;
			console.log(_ev.ctrlKey);
			// console.log(this.event);
			___this = this;
			// mySheet.ShowCalendar();
			//console.log('onclick');
			return;
		}
		
		function mySheet_OnBeforeCheckAll(Row, Col){
			return false;
		}
		
		
		function mySheet_OnDblClick(Row, Col) {
			// mySheet.ShowCalendar();
			console.log('ondblclick');
			return false;
		}
		
		function mySheet_OnSelectMenu(Text, Code, Col){
			console.log(Text,Code,Col);
		}


	function mySheet_OnKeyUp(Row, Col, KeyCode){
		return;
		if(KeyCode == "13" && Col == mySheet.SaveNameCol("TEXT_DATA")){
			$("#testDialog").css({
				"top" : mySheet.RowTop(Row) + 150, 
				"left" :mySheet.ColLeft(Col)
			})
			// 타입이 편집이 가능할 경우 아래 코드 실행
			mySheet.SetEndEdit(0);
			// 시트에서 포커스를 뺀다.
			mySheet.SetBlur();
			
			$("#testDialog").show();
			document.getElementById("testInput").select();
			document.getElementById("testInput").focus();
			
		}
	}
	
function hdtxt(){
	var rowData = mySheet.GetRowData(0);
	
	for(var i=0; i<mySheet.LastCol(); i+=1){
		console.log(mySheet.ColSaveName(i) + " : " + rowData[mySheet.ColSaveName(i)]);
	}
}
	
	$(document).ready(function(){
		$("#testInput").keydown(function(e){
			if(e.keyCode == "27"){
				$("#testDialog").hide();
				$("#testDialog").css({
					"top" : -9999, 
					"left" : -9999
				})				
				window[Grids[0].id].SetFocus();
			}
		})
	})
