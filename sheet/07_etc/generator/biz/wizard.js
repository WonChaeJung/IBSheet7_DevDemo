	AutoResizeOff = true;
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/gi, "");
	}
	
	$(document).ready(function(){
		createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
		
		$(".fieldSetTitle").click(function() {
			$(this).parent().children(".ulTable").toggle();
		});
		
		//풍선 도움말
//		$("#selectionsummary_title").tooltip({content:"드레그를 통해 선택된 셀의 개수,합계,평균을 건수표시줄에 보여줄 지 여부(건수표시 행에 표시 됨[CountPosition=0인 경우 사용 불가])"});
		
		//ibsheet 초기화
		initIBSHEET();
	})
	
	/*Sheet 기본 설정 */
	function initIBSHEET() {
		var initdata = {};
		initdata.Cfg = {SearchMode:smLazyLoad};
		initdata.HeaderMode = {HeaderCheck:0,Sort:0};


		initdata.Cols = [
			{Header:"타이틀","Type":"Text","MinWidth":100,"SaveName":"Header"},
			{Header:"컬럼ID","Type":"Text","MinWidth":100,"SaveName":"SaveName"},
			{Header:"유형","Type":"Combo","SaveName":"Type","ComboText":"텍스트(default)|상태|삭제|체크박스|라디오|콤보|콤보에디트|합계|평균|이미지|정수|실수|날짜|팝업|팝업에디트|패스워드|순번|Html|결과","ComboCode":"Text|Status|DelCheck|CheckBox|Radio|Combo|ComboEdit|AutoSum|AutoAvg|Image|Int|Float|Date|Popup|PopupEdit|Pass|Seq|Html|Result","PopupText":"Text|Status|DelCheck|CheckBox|Radio|Combo|ComboEdit|AutoSum|AutoAvg|Image|Int|Float|Date|Popup|PopupEdit|Pass|Seq|Html|Result","MinWidth":110},
			{Header:"편집\n여부","Type":"CheckBox","MinWidth":50,"SaveName":"Edit","DefaultValue":true},
			{Header:"포멧","Type":"ComboEdit","SaveName":"Format","ComboText":"포멧없음(default)|년월일|년월|월일|시분초|시분|년월일시분초|년월일시분|정수|널 정수|실수|널 실수|주민번호|사업자번호|우편번호|카드번호|전화번호|숫자형","ComboCode":"|Ymd|Ym|Md|Hms|Hm|YmdHms|YmdHm|Integer|NullInteger|Float|NullFloat|IdNo|SaupNo|PostNo|CardNo|PhoneNo|Number","PopupText":"|Ymd|Ym|Md|Hms|Hm|YmdHms|YmdHm|Integer|NullInteger|Float|NullFloat|IdNo|SaupNo|PostNo|CardNo|PhoneNo|Number","MinWidth":"110"},
			{Header:"좌우\n정렬","Type":"Combo","SaveName":"Align","ComboText":"|Left|Center|Right","ComboCode":"|Left|Center|Right","PopupText":"|Left|Center|Right","MinWidth":50,"Align":"Center"},
			{Header:"최소너비","Type":"Int","SaveName":"MinWidth","MinWidth":60},
			{Header:"감추기","Type":"CheckBox","SaveName":"Hidden","MinWidth":70},
			{Header:"키필드","Type":"CheckBox","MinWidth":70,"SaveName":"KeyField"},
			{Header:"열머지\n허용","Type":"CheckBox","MinWidth":70,"SaveName":"ColMerge","DefaultValue":true},
			{Header:"줄넘김\n허용","Type":"CheckBox","MinWidth":70,"SaveName":"MultiLineText"},
			{Header:"트리","Type":"Radio","MinWidth":50,"SaveName":"TreeCol"},
			{Header:"글자색","Type":"PopupEdit","MinWidth":70,"SaveName":"FontColor"},
			{Header:"배경색","Type":"PopupEdit","MinWidth":70,"SaveName":"BackColor"},
			{Header:"기본값","Type":"Text","MinWidth":100,"SaveName":"DefaultValue"},
			{Header:"콤보 텍스트\n(ex:사장Ⅰ이사Ⅰ부장Ⅰ과장Ⅰ대리)","Type":"Text","MinWidth":200,"SaveName":"ComboText",Edit:0},
			{Header:"콤보 코드\n(ex:01Ⅰ02Ⅰ0AⅠ0DⅠ2A)","Type":"Text","MinWidth":200,"SaveName":"ComboCode",Edit:0},
			{Header:"상태","Type":"Status",Hidden:1}
			
		];


		IBS_InitSheet(mySheet, initdata);

		// mySheet.SetHeaderBackColor("#C9E1F5");
		mySheet.SetEditEnterBehavior("down");

	}




 function mySheet_OnChange(row,col,value){
	var savename = mySheet.ColSaveName(0,col);
	if(savename=="Header"){
		if(value.substring(0,2)=="상태" ||value.substring(0,3)=="상 태"){
				mySheet.SetCellValue(row,"DataType","Status");
				mySheet.SetCellValue(row,"DataSaveName","sStatus");
				mySheet.SetCellValue(row,"DataAlign","Center");
				mySheet.SetCellValue(row,"DataWidth","60");
				
		}else if(value.substring(0,2)=="No" ||value.substring(0,3)=="No."){
				mySheet.SetCellValue(row,"DataType","Seq");
				mySheet.SetCellValue(row,"DataSaveName","seq");
				mySheet.SetCellValue(row,"DataAlign","Center");
				mySheet.SetCellValue(row,"DataWidth","60");
		}else if(value.substring(value.length-1)=="일"){
				mySheet.SetCellValue(row,"DataType","Date");
				mySheet.SetCellValue(row,"DataFormat","Ymd");
				mySheet.SetCellValue(row,"DataAlign","Center");
				mySheet.SetCellValue(row,"DataWidth","100");
		}
	}else if(savename=="Type"){
		if(value=="Combo"||value=="ComboText"){
			mySheet.SetCellEditable(row,"ComboText",1);	
			mySheet.SetCellEditable(row,"ComboCode",1);
		}else{
			mySheet.SetCellEditable(row,"ComboText",0);	
			mySheet.SetCellEditable(row,"ComboCode",0);	
		}
	}
}

	/*Sheet 각종 처리*/
	function doAction(sAction) {
		switch(sAction) {			
			case "insert":      //조회
//				removeInputArea();
				mySheet.RemoveAll();
				var col = $("#collength").val()*1;
				inputMake(col);
				break;				
			case "make":     
				var text = codegenerate();				
				$("#sourceText").css('display','');				
				var obj = $('#sourceText');
				var iHeight = (document.body.clientHeight / 2) - obj.height() / 2 + document.body.scrollTop;
				var iWidth = (document.body.clientWidth / 2) - obj.width() / 2 + document.body.scrollLeft;

				$("#sourceText").css("top",iHeight);
				$("#sourceText").css("left",iWidth);
				
				initModal("wizard");
				
				initEdit("_wizard", text);
				
				break;
		}
	}
	
	function initEdit(strId, text){
		var editor = ace.edit(strId);
		window[strId+"Editor"] = editor;
		editor.setTheme("ace/theme/javascript");
		editor.session.setMode("ace/mode/javascript");
		editor.setValue(text, 1);
	}
	
	function codegenerate(){
		//cfg
		var jsonSetConfig = Form2Object(document.getElementById("setconfig"));

		//default 값인 것을은 제거하자. (괜히 소스만 복잡해 짐.)
		for(var item in jsonSetConfig){
			switch(item){
				case "CountFormat":
					if(jsonSetConfig[item]==""){
						delete jsonSetConfig[item];
					}
				break;	
				case "CountPosition":
					if(jsonSetConfig[item]=="0"){
						delete jsonSetConfig[item];
					}
				break;
				case "PagingPosition":
					if(jsonSetConfig[item]=="0"){
						delete jsonSetConfig[item];
					}
				break;
				case "SelectionSummary":
					if(!jsonSetConfig[item]){
						delete jsonSetConfig[item];
					}
				break;
				case "MergeSheet":
					if(jsonSetConfig[item]=="msNone"){
						delete jsonSetConfig[item];
					}
				break;
				case "DataRowMerge":
					if(!jsonSetConfig[item]){
						delete jsonSetConfig[item];
					}
				break;
				
				case "DeferrdHScroll":
					if(!jsonSetConfig[item]){
						delete jsonSetConfig[item];
					}
				break;
				
				case "DeferrdVScroll":
					if(!jsonSetConfig[item]){
						delete jsonSetConfig[item];
					}
				break;
				
				case "ImageStatus":
					if(!jsonSetConfig[item]){
						delete jsonSetConfig[item];
					}
				break;
				
				case "SearchMode":
					if(jsonSetConfig[item]=="smLazyLoad"){
						delete jsonSetConfig[item];
					}
				break;
				
				case "Page":
					if(jsonSetConfig[item]==""){
						delete jsonSetConfig[item];
					}
				break;
				
				case "SizeMode":
					if(jsonSetConfig[item]=="sizeAuto"){
						delete jsonSetConfig[item];
					}
				break;
				
				case "MaxSort":
					if(jsonSetConfig[item]==""){
						delete jsonSetConfig[item];
					}
				break;
				
				case "MouseHoverMode":
					if(jsonSetConfig[item]=="0"){
						delete jsonSetConfig[item];
					}else{
						jsonSetConfig[item] = Number(jsonSetConfig[item]);
					}
				break;
				
				case "SumPosition":
					if(jsonSetConfig[item]){
						delete jsonSetConfig[item];
					}
				break;
				
				case "ToolTip":
					if(!jsonSetConfig[item]){
						delete jsonSetConfig[item];
					}
				break;
				
				case "UseHeaderActionMenu":
					if(!jsonSetConfig[item]){
						delete jsonSetConfig[item];
					}
				break;
				
				case "FrozenCol":
					if(jsonSetConfig[item]==""){
						delete jsonSetConfig[item];
					}
				break;
				
				case "FrozenColRight":
					if(jsonSetConfig[item]==""){
						delete jsonSetConfig[item];
					}
				break;
				
				case "FilterRow":
					if(!jsonSetConfig[item]){
						delete jsonSetConfig[item];
					}
				break;
				
				case "GroupRow":
					if(!jsonSetConfig[item]){
						delete jsonSetConfig[item];
					}
				break;
			}
		}
		
		var text = "var ibsheet = {};\n\n";
		
		text +=  "ibsheet.Cfg=";
		
		var jsonStr = JSON.stringify(jsonSetConfig,null,4);
		jsonStr = jsonStr.split("\"‡").join("");
		jsonStr = jsonStr.split("‡\"").join("");
		
		text +=  jsonStr;
		text += ";\n\n";

		
		//header  
		var jsonHeaderMode = Form2Object(document.getElementById("initheaders"));
		//default 값 제거
		for(var item in jsonHeaderMode){
			switch(item){
				case "Sort":
					if(jsonHeaderMode[item]){
						delete jsonHeaderMode[item];
					}
				break;
				case "ColMove":
					if(jsonHeaderMode[item]){
						delete jsonHeaderMode[item];
					}
				break;
				case "ColResize":
					if(jsonHeaderMode[item]){
						delete jsonHeaderMode[item];
					}
				break;
				case "HeaderCheck":
					if(jsonHeaderMode[item]){
						delete jsonHeaderMode[item];
					}
				break;	
			}	
		}		
		try{
			//ie9 이상에서만 사용 가능...
			if(Object.keys(jsonHeaderMode).length>0){
				text = text + "ibsheet.HeaderMode  = ";
				text +=  JSON.stringify(jsonHeaderMode,null,4);
				text += ";\n\n";
			}
		}catch(e){
			text = text + "ibsheet.HeaderMode  = ";
			text +=  JSON.stringify(jsonHeaderMode,null,4);
			text += ";\n\n";
		}
		
		var o = mySheet.GetSaveJson();
		var rows = o["data"];
		defaultColumnInfoSkip(rows);
		
		text = text + "ibsheet.Cols = ";
		text = text + JSON.stringify(rows,null,4);
		text = text + ";\n\n";
		
		text = text + "IBS_InitSheet(mySheet, ibsheet);";
		
		return text;
	}
	
	function defaultColumnInfoSkip(rows){
		for(var i=0;i<rows.length;i++){
			var row = rows[i];
			if(row["Edit"]) delete row["Edit"];
			if(row["Align"]=="") delete row["Align"];
			if(row["SaveName"]=="") delete row["SaveName"];
			if(row["Format"]=="") delete row["Format"];
			if(row["MinWidth"]=="") delete row["MinWidth"];
			if(!row["Hidden"]) delete row["Hidden"];
			if(!row["KeyField"]) delete row["KeyField"];
			if(row["ColMerge"]) delete row["ColMerge"];
			if(!row["MultiLineText"]) delete row["MultiLineText"];
			if(!row["TreeCol"]) delete row["TreeCol"];
			if(row["FontColor"]=="") delete row["FontColor"];
			if(row["BackColor"]=="") delete row["BackColor"];
			if(row["DefaultValue"]=="") delete row["DefaultValue"];
			if(row["Type"]!="Combo"&&row["Type"]!="ComboEdit"){
				 delete row["ComboText"];
				 delete row["ComboCode"];
			}
		}	
	}
	
	function hideDiv(){
		$("#sourceText").hide();
	}

	
	
	function inputMake(col){
		mySheet.RenderSheet(0);
		for(var k=1; k <= col; k++){
			mySheet.DataInsert();
		}
		mySheet.RenderSheet(1);
	}
	
	function chgColumn(j, i){
		var text = '';
		var k=1, cnt = 1;
		if(browser == 'I'){
			text = document.getElementById("col_"+i+"_"+j).value;
		}else{
			text = document.getElementById("col_1"+"_"+j).value;
			k=i;
			cnt=-1;
		}
		mySheet.SetCellValue(j, 0, text);
		
		if(text=="상태" ||text=="상 태"){
				mySheet.SetCellValue(j,"DataType","Status");
				mySheet.SetCellValue(j,"DataSaveName","sStatus");
				mySheet.SetCellValue(j,"DataAlign","Center");
				mySheet.SetCellValue(j,"DataWidth","60");
				
		}else if(text=="No" ||text=="No."){
				mySheet.SetCellValue(j,"DataType","Seq");
				mySheet.SetCellValue(j,"DataSaveName","seq");
				mySheet.SetCellValue(j,"DataAlign","Center");
				mySheet.SetCellValue(j,"DataWidth","60");
		}else if(text.substring(text.length-1)=="일"){
				mySheet.SetCellValue(j,"DataType","Date");
				mySheet.SetCellValue(j,"DataFormat","Ymd");
				mySheet.SetCellValue(j,"DataAlign","Center");
				mySheet.SetCellValue(j,"DataWidth","100");
		}
		
		var hiddentext = "";
		
		while(1){
			hiddentext = hiddentext + document.getElementById("col_"+k+"_"+j).value + "|";
			k = k+ cnt;
			if(browser == 'I' && k > i)	break;	
			else if(browser == 'C' && k == 0)	break;
		}
		hiddentext = hiddentext.substring(0, hiddentext.length-1);
		mySheet.SetCellValue(j,17,hiddentext);
	}
	
	var poprow=0;
	var popcol=0;
	function mySheet_OnPopupClick(Row, Col){
		poprow = Row;
		popcol = Col;
		window.open("color.html","_blank","width=260, height=220");
	}
	
	function setColor(txt){
		mySheet.SetCellValue(poprow, popcol, txt);
	}
	
	//form 안에 내용을을json object 화 한다.
	/*
	* param1 : form 객체
	*/
	function Form2Object(frm){
		var opt = {};
		var items = frm.elements;
		for(var i=0;i<items.length;i++){
	        switch (items[i].type) {
	            case undefined:
	            case "button":
	            case "reset":
	            case "submit":
	                break;
	            case "radio":
	            case "checkbox":
	                if (items[i].checked == true) {
	                    opt[IBS_getName(items[i])] = 1;
	                }else{
	                	opt[IBS_getName(items[i])] = 0;
	                }
	                break;
	            case "select-one":
	                	opt[IBS_getName(items[i])] = items[i].options[items[i].selectedIndex].value;
	                break;
	            default:
	                	opt[IBS_getName(items[i])] = items[i].value;
			}
		}

		return opt;
	}	
	