	
	$(document).ready(function(){
		
		createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
		
		makeSheet("");
		/*
		var stday = new Date();
		var edday = new Date().setDate(stday.getDate()+30);
		*/
		
		$( "#stDate" ).datepicker({
			showOn: "button",
			dateFormat : "yymmdd",
			buttonImage: "./data/image/calendar.gif",
			buttonImageOnly: true,
			buttonText: "Select date"
		});
		
		$( "#edDate" ).datepicker({
			showOn: "button",
			dateFormat : "yymmdd",
			buttonImage: "./data/image/calendar.gif",
			buttonImageOnly: true,
			buttonText: "Select date"
		});
		
	})
	
	function doAction(str){
		switch(str){
			case 'search':
			$.ajax(
				{
					type: 'POST',
					dataType: "json",
					async: true ,
					url: './biz/dynamicColumn.jsp',
					data: $("#searchForm").serialize(),
					success: function(jsonData) {
						//시트 생성
						makeSheet(jsonData.HeaderInfo);
						
						alert("전체 컬럼 개수:"+(mySheet.LastCol()+1) + "\n" + JSON.stringify(jsonData));
						
						//생성된 시트에 조회 데이터 Loading
						mySheet.LoadSearchData(jsonData);
				},
				error: function(data, status, err) {
					console.log("error forward : "+data);
					alert('서버와의 통신이 실패했습니다.');
				}
			});	
			break;
			case 'insert':
				mySheet.DataInsert();
			break;	
	
		}
		
	}
	
	//시트 생성 함수
	function makeSheet(headerTitle){
	
		var appendCol = [];
		
		//가변 컬럼 부분 생성
		if(headerTitle != ""){
			var headerArr = headerTitle.split("|");
			for(var i=0; i<headerArr.length; i++){
				appendCol.push({Header:headerArr[i],Width:100,Type:"Int",SaveName:"D"+headerArr[i],Format:"Integer"});
			}
		}
		
		
		
		//시트 초기화
		mySheet.Reset();
		var sheetdata = {};
		sheetdata.Cfg = {FrozenCol:2};
						
		//고정 컬럼
		sheetdata.Cols = [
			{Header:"No",Type:"Seq",Width:45,SaveName:"seq",Align:"Center"},
			{Header:"상태",Type:"Status",Width:60,SaveName:"sStatus",Align:"Center"},
			{Header:"삭제",Type:"DelCheck",Width:80,SaveName:"sDelete",Align:"Center"}	
		];
					
		//가변 컬럼
		if(appendCol.length>0){
			//두개 컬럼을 합친다.
			sheetdata.Cols = sheetdata.Cols.concat(appendCol);
		}
		
		console.log(sheetdata);
		//시트 생성
		IBS_InitSheet(mySheet, sheetdata); 
	}
