
//시트 초기 높이 결정	
var pageheightoffset = 190;

/*Sheet 기본 설정 */
function LoadPage() {
	//시트 초기화.
	
	var initdata = {
		Cfg :  {
			SearchMode : smServerPaging2,
			Page : 100,
			// OnePageSort : 1,
			MergeSheet : msNone,
			CountFormat : "BOTTOMDATA / TOTALROWS",
			MaxSort:1
		},
		Cols : [
			{Header:"No",Type:"Text",Width:45,SaveName:"RN",Align:"center",ColMerge:0},
			{Header:"우편번호",Type:"Text",Width:85,Align:"Center",SaveName:"POSTNO",Format:"PostNo",ColMerge:0},
			{Header:"시도",Type:"Text",Width:70,SaveName:"SIDO"},
			{Header:"시군구",Type:"Text",Width:80,SaveName:"SIGUNGU"},
			{Header:"읍면동",Type:"Text",Width:80,SaveName:"UBMYNDONG"},
			{Header:"리",Type:"Text",Width:80,SaveName:"LEE"},
			{Header:"주소",Type:"Text",Width:300,SaveName:"ADDRESS"}
		]
	};
	
	IBS_InitSheet(mySheet,initdata);
	
	mySheet.FitColWidth();
	
	//편집 가능/불가 별 배경색 모드
	//mySheet.SetEditableColorDiff(2);
	
	//편집 가능여부
	//mySheet.SetEditable(0);
	
	//건수정보 표시
	mySheet.SetCountPosition(4);
	
	// smServerPaging2인경우
	mySheet.SetPagingPosition(2);

	
}

/*Sheet 각종 처리*/
function doAction(sAction) {
	switch(sAction) {
		case "search":      //조회
			var param = { "Param": "onepagerow=100" };
				//!!! SearchMode가 smServerPaging 인 경우에는 반드시 DoSearchPaging 함수를 통해 조회하여야 한다.
				mySheet.DoSearchPaging("./biz/serverpaging_data_hsql.jsp",param);
				//mySheet.DoSearch("serverpaging_data_hsql.jsp",param);
			break;
		case "reload":	//조회 데이터 제거
			mySheet.RemoveAll();
			break;

		case "directdown2excel":
			
			//별도 전달 파라미터 예시
			var eparam = makeExParam("serviceID", "8937221121");
			eparam += makeExParam("emp_id", "SA9082211"); 
			
			eparam = eparam.substring(1); //맨 앞에 &기호를 제거함.
			var param = {URL:"../13_search/biz/directdown2excel_data.jsp",FileName:"다이렉트 다운엑셀(대용량).xlsx",SheetName:"sheet-test",Merge:1,SheetDesign:1,ExtendParam:eparam}
			mySheet.DirectDown2Excel(param); //엑셀파일 다운로드
		
			break;
	}
}


function makeExParam(key,data){
	return "&"+encodeURIComponent(key)+"="+encodeURIComponent(data);
}


/* IB Sheet 7 Event */
function mySheet_OnSearchEnd(code,msg) { //조회 후 call back 이벤트
	if(code<0){
		alert("조회 중 오류가 발생하였습니다.\n\nDATABASE가 켜져있는지 확인해 주세요.\r\n./13_search/serverpaging_data*.jsp 파일 안에 DB 설정을 확인하여 주세요.");	
	}
	mySheet.FitColWidth();
}

function mySheet_OnPageRequest(page){
	console.log(page);
	mySheet.SetUserAgent(encodeURIComponent("시작페이지 : " +  mySheet.GetPageCount() * page));
}

function mySheet_OnBeforeMovePage(curPage, targetPage){
	console.log("#######################");
	mySheet.SetUserAgent(encodeURIComponent("시작인덱스 : " +  mySheet.GetPageCount() * targetPage));
}