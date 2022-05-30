//시트 높이 계산용
var mySheet;

$(document).ready(function(){
	createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
	LoadPage();
});

	/*Sheet 기본 설정 */
	function LoadPage() {
		
		//시트 초기 높이 결정	
		var pageheightoffset = 170;
		/*Sheet 기본 설정 */
	
		//시트 초기화.
		var initSheet = {};
		var strHtml = '<svg preserveAspectRatio="none" viewBox="0 0 15 15" width="100%" height="21">'+
			'<line x1="0" y1="15" x2="15" y2="0" color="#000" stroke="#333" stroke-width="0.5" />'+
			'<line x1="15" y1="15" x2="0" y2="0" color="#000" stroke="#333" stroke-width="0.5" />'+
		'</svg>';
		
		
		initSheet.Cfg = {FrozenCol:0,SearchMode:2,Page:100};
		initSheet.HeaderMode = {
			Sort : 1,
			ColMove : 1,
			ColResize : 1,
			HeaderCheck : 1
		};
		initSheet.Cols = [
			{
				Header : "",
				"Type" : "Seq",
				"Width":50,
				"SaveName":"seq",
				"HeaderHtml": strHtml,
				"Align":"Center"
			},
			{Header:"상태","Type":"Status","Width":50,"SaveName":"sStatus","Align":"Center"},
			{Header:"삭제","Type":"DelCheck","Width":80,"SaveName":"sDelete","Align":"Center"},
			{Header:"DESC","Type":"Text","Width":150,"SaveName":"sTEXT","Align":"Center"},
			/**************  대분류 콤보에만 ComboText,ComboCode를 적용한다 **********************/
			{Header:"대분류 콤보","Type":"Combo","Width":100,"SaveName":"combo_1st","Align":"Left","ComboText":"동물|식물|과일","ComboCode":"AA|BB|CC","KeyField":1},
			{Header:"중분류 콤보","Type":"Combo","Width":100,"SaveName":"combo_2nd","Align":"Left"}
		];
		IBS_InitSheet( mySheet , initSheet);
	
		/*********** 콤보에 없는 아이템이 들어와도 보여준다 *************************/
		mySheet.InitComboNoMatchText(1,"",1);  
	
		//최초 조회시 포커스를 감춘다.
		mySheet.SetFocusAfterProcess(0)
		
		doAction("search");
	
	}
	
	function getComboData(key){
		switch (key) {
			case '':
				json = "{\"ComboText\":\"\",\"ComboCode\":\"\"}";
				break;
			case 'AA':
				json = "{\"ComboText\":\"사자|코끼리|하마|염소\",\"ComboCode\":\"01|02|03|04\"}";
				break;
			case 'BB':
				json = "{\"ComboText\":\"나무|풀|꽃|버섯\",\"ComboCode\":\"01|02|03|04\"}";
				break;
			case 'BB':
				json = "{\"ComboText\":\"나무|풀|꽃|버섯\",\"ComboCode\":\"01|02|03|04\"}";
				break;
			default:
				json = "{\"ComboText\":\"사과|수박|배|앵두\",\"ComboCode\":\"01|02|03|04\"}";
				break;
		}
		return json;
	}

	//행을 선택시 잽싸게 중분류에 들어갈 값을 가져다 세팅한다.
	function mySheet_OnSelectCell(or,oc,nr,nc){

		try{
			if(or!=nr){
				//중분류 컬럼에 ComboCode와 ComboText 값이 동일하면 아직 서버에서 값을 가져오지 않았다고 판단하자.
				if(mySheet.GetCellProperty(nr,"combo_2nd","ComboText")==mySheet.GetCellProperty(nr,"combo_2nd","ComboCode")){

					//중분류의 code 값을 확인
					var status = mySheet.GetCellValue(nr,"sStatus");
					var v = mySheet.GetCellText(nr,"combo_2nd");
					// var info = mySheet.GetSearchData("./biz/ComboFilter_data.jsp", "combo_1st="+mySheet.GetCellValue(nr,"combo_1st"));
					var info = getComboData(mySheet.GetCellValue(nr, "combo_1st"));
					var j = JSON.parse(info);
					mySheet.CellComboItem(nr,"combo_2nd",j);
					
					//원래의 값을 세팅해 준다.
					mySheet.SetCellText(nr,"combo_2nd",v);
					if(status=="R"){
						mySheet.SetCellValue(nr,"sStatus","R");
					}
				}
			}	
		}catch(e){
			alert(e.message);
		}
	}
	
	function mySheet_OnChange(row,col,value){
		//대분류 컬럼 변경시 중분류 컬럼의 값을 변경한다.
		if(mySheet.ColSaveName(col)=="combo_1st"){
			// var info = mySheet.GetSearchData("./biz/ComboFilter_data.jsp", "combo_1st="+mySheet.GetCellValue(row,"combo_1st"));
			var info = getComboData(mySheet.GetCellValue(row,"combo_1st"));
			//IE9이상에서 정상 동작하고 구 브라우져인 경우에는 json.org 에서 배포하는 json2.js 파일을 링크걸어야 합니다.
			var j = JSON.parse(info);
			mySheet.CellComboItem(row,"combo_2nd",j);
		}
	}
	
	/*Sheet 각종 처리*/
	function doAction(sAction) {
		switch(sAction) {
			case "search":      //조회
				mySheet.DoSearch("ComboFilter.json");
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

function doAction(sAction) {
	switch(sAction) {
		case "search":
			mySheet.DoSearch("./data/relational_combo.js");
			break;
		case "reload":
			mySheet.RemoveAll();
			break;
	}
}