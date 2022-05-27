//	var AutoResizeOff = true;
	var pageheightoffset = 305;
	function LoadPage() {
		var initdata = {};
		initdata.Cfg = {FrozenCol:3};
		initdata.Cols = [
			{Header:"상태","Type":"Status","MinWidth":30,"Align":"Center","SaveName":"sStatus"},
			{Header:"삭제","Type":"DelCheck","MinWidth":30},
			{Header:"아이디","Type":"Text","MinWidth":60,"Align":"Center","SaveName":"PUBL_SERVC_ID","Format":"IdNo"},
			{Header:"공공서비스제목","Type":"Text","MinWidth":150,"SaveName":"PUBL_SERVC_TITLE"},
			{Header:"소관기관명","Type":"Text","MinWidth":130,"Align":"Center","SaveName":"PUBL_SERVC_JURSDCTN_INST_NM"},
			{Header:"최종수정일자","Type":"Date","MinWidth":50,"Align":"Center","SaveName":"LAST_UPD_DE","Format":"Ymd"},
			{Header:"상세내용","Type":"Text","MinWidth":150,"SaveName":"PUBL_SERVC_PURPS_DTCONT"},
			{Header:"지원형태","Type":"Text","MinWidth":70,"SaveName":"SPORT_FORM_DTLS"},
			{Header:"상세URL","Type":"Text","MinWidth":100,"SaveName":"PUBL_SERVC_DETAIL_URL"}
		];
		IBS_InitSheet(mySheet,initdata);
		
		////////////////////////////////////////
		initdata = {};
		
		initdata.Cfg = {};
		initdata.Cols = [
			{Header:"순번","Type":"Seq","Width":65,"Align":"Center"},
			{Header:"기준일자","Type":"Text","Width":65,"SaveName":"AGRGT_DE","Align":"Center"},
			{Header:"시군명","Type":"Text","Width":65,"SaveName":"SIGUN_NM","Align":"Center"},
			{Header:"기관명","Type":"Text","Width":55,"SaveName":"MEDINST_NM"},
			{Header:"구분","Type":"Text","Width":55,"SaveName":"DISTRCT_DIV_DTLS"},
			{Header:"전화번호","Type":"Text","Width":55,"SaveName":"EMGC_CENTER_TELNO"},
			{Header:"주소","Type":"Text","Width":80,"SaveName":"REFINE_ROADNM_ADDR"},
			{Header:"위도","Type":"Text","Width":55,"SaveName":"REFINE_WGS84_LAT"},
			{Header:"경도","Type":"Text","Width":70,"SaveName":"REFINE_WGS84_LOGT"}
		];
		IBS_InitSheet(mySheet2,initdata);
		
		doAction("search");
		
	}

	/*Sheet 각종 처리*/
	function doAction(sAction) {
		switch(sAction) {
			case "search":      //조회
				mySheet.DoSearch("./data/multisave_data.js");
				mySheet2.DoSearch("./data/multisave_data2.js");
				break;
			case "reload":
				mySheet.RemoveAll();
				mySheet2.RemoveAll();
				break;
			case "save":
				//상단시트 저장 내용 추출
				var param1 = mySheet.GetSaveString();
				//하단시트 저장 내용 추출
				var param2 = mySheet2.GetSaveString();
				
				if(param1==""&&param2==""){
					alert("저장할 데이터가 없습니다");	
					return;
				}
				alert("[Save Query String]\nparam1:\n"+param1+"\nparam2:\n"+param2);
				// var rtnData = mySheet.GetSaveData("./biz/save.jsp",param1+param2);
				var rtnData = mySheet.GetSaveData("./biz/saveSuccess.txt",param1+param2);
								
				//각시트에 저장 결과 반영
				mySheet.LoadSaveData(rtnData);
				mySheet2.LoadSaveData(rtnData);
				break; 
			case "save_err":
				mySheet.DoSave("saveErr.jsp");
				break;
			case "insert":
				mySheet.DataInsert();
				break;
			case "exceldown":      //조회
			
				var TITLE1 = "[가족정보]\r\n\r\n문서번호:  (11018)\r\n";
				var TITLE2 = "[거래량 통계]\r\n\r\n문서번호:  (29105)\r\n";
				var userMG1  = "0,0,2,8 2,0,1,3";
				var userMG2  = "0,0,2,12 2,0,1,3";
			
				mySheet.Down2ExcelBuffer(true);
				mySheet.Down2Excel({"SheetName":"가족 정보",SheetDesign:1,TitleText:TITLE1,UserMerge:userMG1});
				mySheet2.Down2Excel({"SheetName":"거래량 통계",SheetDesign:1,TitleText:TITLE2,UserMerge:userMG2});
				mySheet.Down2ExcelBuffer(false); 
				break;	
		}
	}
	var exceldata = "";
//	function mySheet_OnReadyExcelDown(frm){
//		exceldata = frm.Data.value;
//		//frm.submit();
//	}
//	function mySheet2_OnReadyExcelDown(frm2){
//		
//		try{
//			frm2.Data.value  = 	exceldata.substring(0,exceldata.length-1) + "" + frm2.Data.value;
//			frm2.submit();
//		}catch(e){alert(e);}
//	}

	function mySheet_OnSearchEnd() {
//		document.getElementById("SawonNo").value = mySheet.GetEtcData("SawonNo");
//		document.getElementById("Name").value = mySheet.GetEtcData("Name");
//		document.getElementById("EnterDate").value = mySheet.GetEtcData("EnterDate");
//		document.getElementById("Pay").value = mySheet.GetEtcData("Pay");
//		document.getElementById("Pay2").value = mySheet.GetEtcData("Pay2");
//		document.getElementById("HoBong").value = eval(mySheet.GetEtcData("HoBong"))

		var etcJson = mySheet.EtcData;
		IBS_CopyJson2Form({"searchForm":etcJson} , document.searchForm);
	}

	function mySheet_OnSaveEnd(code, msg){
		console.log(code, msg);
		if(msg!=""){
			alert(msg);	
		}	
	}
