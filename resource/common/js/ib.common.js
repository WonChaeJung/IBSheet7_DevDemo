/**
 * @namespace ib
 */

/**
 * ib 공통 API
 * @namespace   comm
 * @memberof    ib
 */

var ib = ib || {};
(function() {
    (function(ib) {
        ib.comm = (function() {
            var _progressCount = 0,
            	cc = {},
                cu = {};
            
            return {
                /**
                 * module initialize
                 * @memberOf   ib.comm#
                 * @method     init
                 * @private
                 * @returns    {object}         ib.comm object
                 */
                init: function() {
                    cc = this;
                    
                    // cond 객체 초기화 처리
                    if (typeof top.window._popupCond === "undefined") {
                        top.window._popupCond = {};
                    }
                    
                    // create module shotcut
                    if (typeof ib.util !== "undefined") {
                        cu = ib.util;
                    }

                    return this;
                },
                /**
                 * ibsheet 생성 함수
                 * @memberOf   ib.comm#
                 * @method     createIBSheet
                 * @public
                 * @param		{object}    obj						시트를 생성할 div 객체 (혹은 div 객체 id)
                 * @param		{string}    sheetid                 설정 옵션 객체
                 * @param		{string}    width                   시트 너비 
                 * @param		{string}    height                  시트 높이
                 */
                createIBSheet:function(obj,sheetid,width,height){
                	// locale 처리
                    Grids.Locale = "";
                    Grids.Config = _sheetCFG; //ibsheet_config.js 에 위치
                    Grids.Msg = _sheetMSG; //ibsheet_config.js 에 위치
                    
                    if(typeof obj === "string"){
                    	obj = document.getElementById(obj);
                    }

                    // width, height 적용
                    obj.style.width = width;
                    obj.style.height = height;

                    IBSheet('<ibsheet Sync=\"1\" Data_Sync=\"0\"> </ibsheet>', obj.id, sheetid);
                    //IE10이상 사용시 아래 적용 가능함 (모던테마)
                    window[sheetid].SetTheme("WHM","ModernWhite");
                },
                
                IBS_InitSheet:function(sheet,init){
                	var sheetid = sheet.id;
                	IBS_InitSheet(sheet,init);
                	
                	//이벤트 공통 처리..
                    cc._triggerSearchEndEvent(window[sheetid]);//조회 후 공통 처리
                    cc._triggerSaveEndEvent(window[sheetid]);//저장 후 공통처리
                    cc._triggerDownFinishEvent(window[sheetid]);//엑셀 다운 후 이벤트
                    cc._triggerLoadExcelEvent(window[sheetid]);//엑셀 업로드 후 이벤트
                    cc._triggerOnLoadFileSelectEvent(window[sheetid]);//파일 다이얼로그 선택 후 이벤트
                },
                IBS_InitSheet2:function(sheet,init,divobj){
					var sheetid = sheet.id;
					IBS_InitSheet(sheet,init);
                	
					//시트 하단에 page index가 보여질 div객체를 생성한다.
					var idx_div = document.createElement("div");
					idx_div.id = sheetid+"_index_div";
					idx_div.style.backGroundColor="#FF0000";
					idx_div.style.width = "100%";
					idx_div.style.height = "24px";
					idx_div.style.margin = "10px 0px 0px 0px";
					
					//현재 페이지를 저장하기 위한 input
					var input_current = document.createElement("input");
					input_current.type = "hidden";
					input_current.id = sheetid+"_current_page";
					input_current.name = sheetid+"_current_page";
					input_current.value = "1";
					idx_div.appendChild(input_current);
					
					//전체 건수를 저장하기 위한 input
					var input_total_row = document.createElement("input");
					input_total_row.type = "hidden";
					input_total_row.id = sheetid+"_total_rows";
					input_total_row.name = sheetid+"_total_rows";
					idx_div.appendChild(input_total_row);
	               	    
	               	//div객체 안에 테이블을 두고 테이블 안에 조회건수표시/페이지인덱스를 둔다.
	               	var idx_table = document.createElement("table");
	               	idx_table.style.width = "100%";
	               	var idx_tbody = document.createElement("tbody");
	               	idx_tbody.style.width = "100%";
	               	var idx_tr = document.createElement("tr");
	               	idx_tr.style.width="100%";
	               	
	               	
	               	//왼쪽에 건수정보를 표시?
	               	var left_td = document.createElement("td");
	               	left_td.id = sheetid+"_td_SearchCount";
	               	left_td.style.width = "170px";
	
	               	
	               	//가운데 pageIndex 표시
	               	var center_td = document.createElement("td");
	               	center_td.id = sheetid+"_td_PageIndex";
	               	center_td.style.width = "auto";
	               	//오른쪽에 한번에 표시할 record 수 설정
	               	var right_td = document.createElement("td");
	               	right_td.id = sheetid+"_td_OnePageCnt";
	               	right_td.style.width = "170px";
	               	right_td.style.textAlign  = "right";
	               	
	               	//오른쪽에 들어갈 select
	               	var onePageCnt = document.createElement("select");
	               	onePageCnt.id = sheetid+"_OnePageCnt";
	               	onePageCnt.name = sheetid+"_OnePageCnt";
	               	
	               	var tArr = [10,20,30,50,100];
	               	for(var i=0;i<tArr.length;i++){
	               	    var option = document.createElement("option");
	               	    option.text = tArr[i]+"건";
	               	    option.value = tArr[i];
	               	    onePageCnt.add(option, i);
	               	}
	               	
	               	ib.comm.addEventHandler(onePageCnt,"change",function(){
	               		window[sheetid].RemoveAll();
	               		document.getElementById(sheetid+"_current_page").value = "1";
	               		//기존 페이지 인덱스 영역을 clear 하자.
	               		ib.comm.clearPageIndex(sheetid);
	               	},"");
	               	
	               	right_td.appendChild(onePageCnt);
	               	
	               	idx_tr.appendChild(left_td);
	               	idx_tr.appendChild(center_td);
	               	idx_tr.appendChild(right_td);
	               	idx_tbody.appendChild(idx_tr);
	               	idx_table.appendChild(idx_tbody);
	               	idx_div.appendChild(idx_table);
	               	
	               	divobj.parentNode.appendChild(idx_div);
	               	
	               	window[sheetid].SetCountInfoElement(sheetid+"_td_SearchCount");
	               	
	               	var code = "td#"+sheetid+"_td_PageIndex"+"{height:20px; width:300px; float:left;margin-left:40%;}" 
	               	+"td#"+sheetid+"_td_PageIndex"+" ul{margin:0; padding:0; list-style:none; float:left; }"
	               	+"td#"+sheetid+"_td_PageIndex"+" li{margin:0 1px; background-color:#ffffff; padding: 4px; display: block; float: left; width: auto; border-top:1px solid #d42f48; border:1px solid #ddd;align:center;textalign:center}"
	               	+"td#"+sheetid+"_td_PageIndex"+" li:hover {background-color:#ddd;cursor:pointer}"
	               	
	               	+"td#"+sheetid+"_td_PageIndex"+" a {z-index: 10;	display: block;	float: left; text-decoration: none; white-space: nowrap; width: auto; text-align:center; color:#444444;}"
	               	
	               	+"td#"+sheetid+"_td_PageIndex"+" ul.pageindex li a:hover span {background-color:#e7ebf1; color:#000000;}"
	               	+"td#"+sheetid+"_td_PageIndex"+" li.current{background-color:#d42f48;}"
	               	+"td#"+sheetid+"_td_PageIndex"+" li.current a{color:#e7ebf1;}"
	               	+"#"+sheetid+'_OnePageCnt{border:1px solid #ddd;color:#666666;margin:0px;overflow:visible;text-align:start;text-indent:0px;line-height:18px;white-space:pre;font-size:11px;font-family:/*IBFN*/"Dotum", "Helvetica", "AppleGothic", sans-serif;}'
	               	+"#"+sheetid+'_index_div{font-size:/*IBFS*/11px; font-family:/*IBFN*/"Dotum", "Helvetica", "AppleGothic", sans-serif;}';
	               	ib.comm.insertCss(code);
	               	
	               	//상태 변화에 따른 배경색 지정
	               	sheet.SetRowBackColorU("#DDDDFF");//수정시
	               	sheet.SetRowBackColorI("#EEFFEE");//신규입력
	               	sheet.SetRowBackColorD("#FFDDDD");//삭제시
                	
                	//이벤트 공통 처리..
                    cc._triggerSearchEndEvent(window[sheetid]);//조회 후 공통 처리
                    cc._triggerSaveEndEvent(window[sheetid]);//저장 후 공통처리
                    cc._triggerDownFinishEvent(window[sheetid]);//엑셀 다운 후 이벤트
                    cc._triggerLoadExcelEvent(window[sheetid]);//엑셀 업로드 후 이벤트
                    cc._triggerOnLoadFileSelectEvent(window[sheetid]);//파일 다이얼로그 선택 후 이벤트
                },
                
                /**
                 * ibsheet 조회 함수
                 * @memberOf   ib.comm#
                 * @method     search
                 * @public
                 * @param		{object}    param                   설정 옵션 객체
                 * @param		{string}	param.sheet 			시트 이름(string or object) (여러개 인 경우 배열로 넣을 것) 
                 * @param 		{string}	param.url				조회 url
                 * @param		{string}	subparam				조회 조건 querystring형태 (ex: name=chris&sa_id=98132&age=45)
                 * @param 		{boolean}	param.append			기존 데이터에 신규데이터를 append할지 여부
                 * @param 		{boolean}	param.sync				조회시 동기 조회 사용여부 (이 기능 사용시 대기이미지는 표시되지 않음)
                 * @param 		{object}	param.mapping			조회 json 내에 데이터 명과 시트와 이름 관계 (ex  mapping:{mySheet:"DataName",mySheet2:"Data2"} )
                 */
                search:function(param){
                	
                	if(param.sheet!=null){
                		var opt = {}
                		,loadOpt = {}
                		,sheets = [];	
                		
                		
	        		if(!cu.isArray(param.sheet)){
	              	   sheets.push(param.sheet);
	                 }else{
	              	   sheets = param.sheet;
	                 }
	
					if(cu._isEmpty(param.url)){
						cc.messageBox("COE0006");
						return;
					}else{
						opt.url = param.url;
					}
					
					//해당 폼에서 조회조건 추출
					if(param.subparam){
						opt.data = param.subparam;	
					}
					
					//기존데이터에 append 여부 (default: false)
					if(param.append){
						loadOpt["Append"] = param.append;
					}
					
					//조회방식 동기/비동기 여부 (default : 비동기)
					if(param.sync){
						opt["async"] = !(param.sync);
						loadOpt["Sync"] = param.sync;
					}
					
					if(typeof(param.mapping)!=="undefined"){
						opt["mapping"] = param.mapping;
					}
					opt.callback = function(response){
						for(var i=0;i<sheets.length;i++){
							var grid;
							//시트객체
							if(typeof sheets[i] === "string"){
								grid = window[sheets[i]];
							}else{
								grid = sheets[i];
							}
							grid.SetWaitImageVisible(false);
							if(typeof opt.mapping === "undefined"){
								if(typeof response[grid.id] !== "undefined"){
									grid.LoadSearchData(response[grid.id],loadOpt);	
								}	
							}else{
								if(typeof response[  opt.mapping[grid.id] ] !== "undefined"){
									grid.LoadSearchData(response[opt.mapping[grid.id]],loadOpt);	
								}else if(typeof response[  grid.id ] !== "undefined"){
									grid.LoadSearchData(response[  grid.id ],loadOpt);
								}
							}
						}
					};
					
					cc.ajax(opt);
                			
                	}else if(param.chart!=null){
                		var opt = {};
                		opt.url = param.url;
                		opt.data = param.subparam;
                		opt.callback = function(response){
                			var chartid = param.chart;
                			window[chartid].loadSearchData(response,{append: true});	
                		}
                		cc.ajax(opt);
                	}else{
                		messageBox("COE0006");
                	}
                },

                
                /**
                 * ibsheet 조회 함수
                 * @memberOf   ib.comm#
                 * @method     searchPaging
                 * @public
                 * @param		{object}    param                   설정 옵션 객체
                 * @param		{string}	param.sheet 			시트 이름(string or object) (여러개 인 경우 배열로 넣을 것) 
                 * @param 		{string}	param.url				조회 url
                 * @param		{string}	subparam				조회 조건 querystring형태 (ex: name=chris&sa_id=98132&age=45)
                 * 
                 * @param 		{boolean}	param.sync				조회시 동기 조회 사용여부 (이 기능 사용시 대기이미지는 표시되지 않음)
                 */
                searchPaging:function(param){
                	var _sheet;
                	if(param.sheet==null){ 
                		cc.messageBox("COE0006");
                		return;
                	}else{
                		_sheet = param.sheet;
                	}
                	
                	var opt = {};
                		
	        		if(cu.isArray(param.sheet)){
	        			cc.messageBox("COW0022");
	        			return; 
	                }
	
					if(cu._isEmpty(param.url)){
						cc.messageBox("COE0006");
						return;
					}else{
						opt.url = param.url;
					}
					
					//해당 폼에서 조회조건 추출
					if(param.subparam){
						opt.Param = param.subparam;
						//blockUI 처리용
						opt.data = param.subparam;
					}
	
					_sheet.SetWaitImageVisible(false);
					
					ib.comm.showBlockUI(); //임시
					
					_sheet.DoSearchPaging(opt.url,opt);
					
					//cc.ajax(opt);
                },
                
                
                
                

                /**
                 * ibsheet 저장 함수
                 * @memberOf   ib.comm#
                 * @method     save
                 * @public
                 * @param		{object}    param                   		설정 옵션 객체
                 * @param		{object}	param.sheet						시트 이름 혹은 시트 객체  (여러개 인 경우 모두 넣을 것) 
                 * @param		{string}	param.url						저장 url
                 * @param		{string}	[param.subparam]				저장시 전달할 querystring
                 * @param		{boolean}	[param.sync]					동기화 여부 (defalut:false)
                 * @param		{boolean}	[param.quest]					저장하시겠습니까? 컨펌 여부. (default:true)
                 * @param		{int}		[param.col]						특정 컬럼 기준 저장(checkbox 컬럼을 지정하면 체크된 데이터만 전송)
                 */
                save:function(param){
                	
                	var opt = {},
                		sheets = [];
                	
                	if(!cu.isArray(param.sheet)){
                 	   sheets.push(param.sheet);
                    }else{
                 	   sheets = param.sheet;
                    }
                	
                	if(typeof param.url === "undefined" || typeof param.sheet === "undefined" ){
                		cc.messageBox("COE0006");
                		return;
                	}

                	opt.url = param.url;
                	
                	
                	//각시트의 수정된 내용과 각컬럼의 SaveName을 담는다.
                	var rtn = cc.getSaveString(param.sheet,"",param.col);


                	//수정한 내용이 없거나 keyfield error 인 경우 저장을 중단한다.
                	if(typeof rtn === "number"){
                		if(rtn == -2) messageBox("COI0000");
	                	return;
                	}

                	                	
                	if(typeof param.quest === "undefined" || param.quest){
                		if(typeof param.col === "undefined"){
                			if (!cc.messageBox("COI0005" , [rtn.insCnt, rtn.updCnt, rtn.delCnt] , "CONFIRM")) {
    	                		return;
    	                	}	
                		}else{
                			if (!cc.messageBox("COI0012" , rtn.chkCnt , "CONFIRM")) {
    	                		return;
    	                	}
                		}
                	}
                	
                	if(typeof(param.mapping)!=="undefined"){
						opt["mapping"] = param.mapping;
					}
                	
                	//시트에서 수정한 내용
                	opt.data = rtn.saveString;
                	
                	//subparam을 통해 전달 받은 내용
                	if(param.subparam){
						opt.data = opt.data + "&" + param.subparam;	
					}
                	opt.callback = function(response){
//                		console.log("save",response);
                		for(var i=0;i<sheets.length;i++){
                			var grid = (typeof sheets[i] === "string")?window[sheets[i]]:sheets[i];
                			
                			if(typeof opt.mapping === "undefined"){
								if(typeof response[grid.id] !== "undefined"){
									grid.LoadSaveData(response[grid.id]);	
								}	
							}else{
								if(typeof response[  opt.mapping[grid.id] ] !== "undefined"){
									grid.LoadSaveData(response[opt.mapping[grid.id]]);	
								}else if(typeof response[  grid.id ] !== "undefined"){
									grid.LoadSaveData(response[  grid.id ]);
								}
							}
                			
                			
                		}
                	}
                	cc.ajax(opt);
                },


                /**
                 * IBSheet의 내용을 xlsx 파일로 export 한다.
                 * @memberOf    ib.comm#
                 * @method      down2excel
                 * @public
                 * @param       {object}       opt                                          생성 옵션 객체
                 * @param       {array}        opt.id                                       엑셀로 다운로드 받을 IBSheet id, 여러개인 경우 배열로
                 * @param       {string}       opt.name	                                    다운받을 파일명
                 * @param       {string}       opt.sheetname	                            다운받을 worksheet 명, 여러개인 경우 배열로
                 * @param       {string}       opt.title		                            타이틀 , 여러개인 경우 배열로
                 * @param       {string}       opt.mode                                     0: 모든 컬럼 다운로드,1(default):상태컬럼,Seq,DelCheck 컬럼 제외하고 다운로드
                 * @param       {string}       opt.skipcols                                 다운 받지 않을 컬럼(다운 받고 싶지 않은 컬럼의 인덱스(혹은 SaveName)를 구분자 "|"로 연결한 스트링)
                 * @param       {string}       opt.rows                                     다운 받을 행(다운 받고자 하는 행의 인덱스를 구분자 "|"로 연결한 스트링,설정이 없으면 모든 행이 다운로드 된다.)
                 */
                downExcel : function(opt) {

					var opts = [];
					if (!cu.isArray(opt)) {
						opts.push(opt);
					} else {
						opts = opt;
					}

					if (typeof opt === "undefined"
							|| typeof opts[0]["id"] === "undefined") {
						cc.messageBox("COE0006");
						return;
					}

					
					
					IBQueue.Init();
                    
                    IBQueue.AddItem({
                        method: cc.showBlockUI,
                        context: window.ib.comm
                    });

                    IBQueue.AddItem({
                        method: cc._downExcel,
                        context: window.ib.comm,
                        params: [opts]
                    });
                    
                    IBQueue.Start();
                    

				},
				_downExcel:function(opts){
						var firstGrid;
						if(typeof(opts[0]["id"])==="string"){
							firstGrid = window[opts[0]["id"]];
						}else{
							firstGrid = opts[0]["id"];
						}
						//버퍼링 시작
						firstGrid.Down2ExcelBuffer(1);
						
						for (var i = 0; i < opts.length; i++) {
							
							var singleOpt = opts[i];
							
							var grid;
							if(typeof(singleOpt.id)==="string"){
								grid = window[singleOpt.id];
							}else{
								grid = singleOpt.id;
							}
							
							//엑셀 다운로드 관련 기본 옵션
							var params = {
								Merge : 1,
								SheetDesign : 1,
								AutoSizeColumn : 1
							};
							
							//엑셀 파일명 설정
							if (typeof singleOpt.name === "undefined") {
								params["FileName"] = "DOWNLOADED_"
										+ cu.getToday("ymd", "-") + ".xlsx";
							} else {
								params["FileName"] = singleOpt.name + ".xlsx";
							}
							
							//worksheet 이름
							if (typeof singleOpt.sheetname === "undefined") {
								var d = (new Date()).toLocaleString();
								params["SheetName"] = d.substring(0, d.indexOf("일"));
							} else {
								params["SheetName"] = singleOpt.sheetname;
							}

							//mode 값에 따른 DownCols 설정
							if (typeof singleOpt.mode !== "undefined"
									&& (singleOpt.mode == "0" || singleOpt.mode == 0)) {
								params.DownCols = "";
							} else {
								params.DownCols = cc._makeHiddenSkipCol(grid);
							}

							//DownCols에서 param.skipcols  의 컬럼을 제외시킴
							if (typeof singleOpt.skipcols === "undefined") {
								if (params.DownCols == "") {
									delete params["DownCols"];
								}
							} else {
								var skipcolsArr = singleOpt.skipcols.split("|");
								for (var x = 0; x < skipcolsArr.length; x++) {
									if (isNaN(skipcolsArr[x])) {
										var colIndex = grid.SaveNameCol(skipcolsArr[x]);
										skipcolsArr[x] = colIndex+"";
									}
								}
								var downcolsArr = params.DownCols.split("|");
								// 차집합
								params.DownCols = ($(downcolsArr).not(skipcolsArr).get()).join("|");
							}//skpcols end

							//특정 행만 내리는 경우 downrows
							if (typeof singleOpt.rows !== "undefined") {
								params.DownRows = singleOpt.rows;
							}
							
							//excel 내 타이틀 설정
							if (typeof singleOpt.title !== "undefined") {
								params.TitleText = singleOpt.title;
								var lr = 1;
								if (typeof params.DownCols === "undefined"
										|| params.DownCols == "") {
									lr = grid.LastCol();
								} else {
									lr = params.DownCols.split("|").length;
								}
								params.UserMerge = "0,0,1," + lr;
							}
							
							// header style 설정
							if (typeof singleOpt.header !== "undefined") {
								params.Header = singleOpt.header;
							}
							
							// footer style 설정
							if (typeof singleOpt.footer !== "undefined") {
								params.Footer = singleOpt.footer;
							}
							
							//대기 이미지를 없앤다.
							grid.SetWaitImageVisible(0);
//							grid.ExportMode = "2";
							grid.Down2Excel(params);	
						}//end for
						//버퍼링 종료, 다운로드 시작!
						window[opts[0]["id"]].Down2ExcelBuffer(0);
				},
				 /**
                 * 엑셀 파일을 읽어 시트에 로드한다.
                 * @memberOf    ib.comm#
                 * @method      loadexcel
                 * @public
                 * @param       {object}        opt                                             생성 옵션 객체
                 * @param       {string}        opt.id                                         	엑셀로 다운로드 받을 IBSheet id
                 * @param       {string}        opt.mode	                                    엑셀파일과 메핑 규칙
                 * @param       {string}        opt.startRow	                                엑셀 파일 안에 읽어들일 시작행
                 * @param       {string}        opt.endRow		                                엑셀 파일 안에 읽어들일 마지막행
                 */
                loadExcel: function(opt) {
                	if(typeof opt === "undefined"){
                		cc.messageBox("COE0006");
                		return;
                	}
                	
                	var opts = [];
					if (!cu.isArray(opt)) {
						opts.push(opt);
					} else {
						opts = opt;
					}
					
					
					var firstGrid;
					if(typeof opts[0]["id"] === "string"){
						firstGrid = window[opts[0]["id"]];
					}else{
						firstGrid = opts[0]["id"];
					}
					firstGrid.LoadExcelBuffer(true)
					
					for(var o=0;o<opts.length;o++){
						var grid;
						if(typeof opts[0]["id"] === "string"){
							grid = window[opts[o]["id"]];
						}else{
							grid = opts[o]["id"];
						}
						var params = $.extend({"Mode":"HeaderMatch"}, opts[o]);
	                	
	                	if(typeof opts[o].mode !== "undefined"){
	                		params["Mode"] = opts[o].mode;
	                	}

	                	if(typeof opts[o].sheetname !=="undefined"){
	                		params["WorkSheetName"] = opts[o].sheetname;
	                	}
	                	
	                	if(typeof opts[o].columnMapping !=="undefined"){
	                		params["ColumnMapping"] = opts[o].columnMapping;
	                	}
	                	
	                	if(typeof opts[o].startRow !== "undefined"){
	                		params["StartRow"] = opts[o].startRow; 
	                	}else{
	                		//첫행에 타이틀이 있다고 가정해서 두번째 행부터 읽어들이자.
	                		params["StartRow"] = 2;
	                	}
	                	if(typeof opts[o].endRow !== "undefined"){
	                		params["EndRow"] = opts[o].endRow; 
	                	}
	                	grid.SetWaitImageVisible(0);
//	                	console.log(params);
	                	grid.LoadExcel(params);
					}
                	firstGrid.LoadExcelBuffer(false);
                },

                /*
                 * ibsheet 의 저장할 데이터를 추출하는 함수
                 * @memberOf   ib.comm#
                 * @method     getSaveString
                 * @public
                 * @param		{array}		sheet				추출할 시트  이름 혹은 객체 (여러개 인 경우 배열로)
                 * @param		{string}	[deli]				전달할 문자열 구분자 (default: "‡")
                 * @param		{int}		[col]				저장대상 컬럼 index 혹은 SaveName 
                 * 
                 * @returns     {object}	rtn
                 * @returns     {string}	rtn.saveString		시트에서 추출한 저장 querystring
                 * @returns     {int}		rtn.insCnt			입력행수
                 * @returns     {int}		rtn.updCnt			수정행수
                 * @returns     {int}		rtn.delCnt			삭제행수
                 * @returns     {int}		rtn.chkCnt			선택행수
                 */
                getSaveString:function(sheet,deli,col){
                   
                   var opt = {} //default 값
                   		,saveString = ""
                   		,saveNames = ""
                   		,sheets = []
                   		,rtn = {}
                   		,ins = 0
                   		,upd = 0
                   		,del = 0
                   		,chk = 0;
                   if(!cu.isArray(sheet)){
                	   sheets.push(sheet);
                   }else{
                	   sheets = sheet;
                   }
                   
                   if(typeof deli !== "string"||deli == ""){
                	   deli = "‡";
                   }
                   
                   //각시트의 수정된 내용과 각컬럼의 SaveName을 담는다.
                   for(var i=0;i<sheets.length;i++){
                	   
                	   var grid = (typeof sheets[i] === "string")?window[sheets[i]]:sheets[i];
                	   
                	   var tempStr = "";
                	   opt = {"Prefix":grid.id+"_","Mode":2,"Delim":deli};
                	   
                	   if(typeof col !== "undefined"){
                		   opt.Col = col;
                		   chk += grid.CheckedRows(col);
                	   }else{
                		   //입력,수정,삭제 건수 확인
                    	   ins += grid.RowCount("I");
                    	   upd += grid.RowCount("U");
                    	   del += grid.RowCount("D");
                	   }
                	   
                	   tempStr =  grid.GetSaveString(opt);
	
                	   //KeyField에러 인 경우..
                	   if(tempStr=="KeyFieldError") return -1;
                	   
                	   
                	   if(saveString!=""){
                		   saveString += "&"+tempStr;
                	   }else{
                		   saveString = tempStr;
                	   }
                	   //IBSheet 각 컬럼에 대한 SAVENAME 전달
                	   saveNames +=  "&"+grid.id+"_SAVENAME="+IBS_ConcatSaveName(grid);
                   }
                   
                   //저장할 데이터가 전혀 없는 경우
                   if(saveString == "") return -2;
                   
                   rtn.saveString = saveString+saveNames;
                   rtn.insCnt = ins;
                   rtn.updCnt = upd;
                   rtn.delCnt = del;
                   rtn.chkCnt = chk;
                   
                   return rtn;
                },
                
                /**
                 * ajax 기본 모듈
                 * @memberOf   ib.comm#
                 * @method     ajax
                 * @private
                 * @param      {object}     opt                     설정 옵션
                 * @param      {string}     [opt.url = '/xxx/xxx.do']     서버 요청 방법
                 * @param      {string}     [opt.type = 'POST']     서버 요청 방법
                 *
                 * | Enum | Description       |
                 * |------|-------------------|
                 * | GET  | GET 방식          |
                 * | POST | POST 방식         |
                 *
                 * @param      {boolean}    [opt.blockUI = true]    blockUI 사용여부
                 * @param      {boolean}    [opt.async = true]      비동기 요청 여부
                 * @param      {object}     [opt.data]              전달할 param 객체
                 * @param      {function}   [opt.callback]          callback function
                 */
                ajax: function(opt) {
                    var blockUI = true,
                        paramData = null; 
                        headers = {  // 공통으로 가야하는 값에 대한 설정
                            // "Content-Type":"application/json; charset=UTF-8",
                            // "Accept":"application/json, text/javascript, */*; q=0.01"
                            "X-Requested-With": "XMLHttpRequest"
                        };

                    // TODO : valid arguments
                    if (typeof opt === "undefined") {
                        opt = {};
                    }

                    paramData = opt.data;
                    
                    // blockUI 사용 여부
                    blockUI = (typeof opt.blockUI === "undefined") ? true : !!opt.blockUI;

                    $.ajax({
                        type: opt.type || 'POST',
                        async: (opt.async === false ? false : true),
                        processData: false,
                        dataType: 'json',
//                        contentType: "application/json",
                        data: paramData,
                        url: opt.url,
                        beforeSend: function() {
                            // blockUI : open
                            if (blockUI) {
                                cc.showBlockUI();
                            }
                        },
                        headers: headers,
                        success: function(response) {  // 서버에서 내려오는 데이타 형식에 맞춰서 수정
                        	
//                        	console.log("success",response);
                        	
                            try {
                                if (typeof opt.callback === "function") {
                                    opt.callback(response);
                                }
                            } catch (e) {
                                console.error(e);
                                cc.messageBox("COE0005");
                            }
                        },
                        error: function(data, status, err) {
//                        	console.log("error",data);
                        	  try {
                                  cc.alert(status + " : " + err);
                                  if (typeof opt.callback === "function") {
                                      opt.callback(status);
                                  }
                              } catch (e) {
                                  console.error(e);
                                  cc.messageBox("COE0005");
                              }
                        },
                        complete: function() {
                            cc.hideBlockUI();
                        }
                    });
                },
                
                /**
                 * popup dialog 의 컨테이너 객체를 생성 한다.
                 * @memberOf   ib.comm#
                 * @method     _createPopupContainer
                 * @private
                 * @param      {string}     type        팝업 종류
                 */
                _createPopupContainer: function(type) {
                    var context = $(top.document),
                        container,
                        btnArea,
                        btnHtml = [],
                        frame;

                    type = type || "default";

                    if (typeof btnDisplay === "undefined") {
                        btnDisplay = false;
                    }

                    if (context.find("#" + type + "-popup-").length <= 0) {
                        container = document.createElement("div");
                        container.id = type + "-popup-dialog";
                        container.style.cssText = "display:none;overflow:hidden;";

                        frame = document.createElement("iframe");
                        frame.id = type + "-popup-frame";
                        frame.style.cssText = "border:none;";

                        btnArea = document.createElement("div");
                        $(btnArea).css("display", "none");

                        btnHtml.push("<button type='button' class='txt_btn' id=\"" + type + "-popup-ok\"></button>");
                        btnHtml.push("<button type='button' class='txt_btn' id=\"" + type + "-popup-cancel\"></button>");
                        $(btnArea).html(btnHtml.join(""));

                        container.appendChild(btnArea);
                        container.appendChild(frame);
                        context.find("body").append(container);
                    }
                },


                /**
                 * popup 활성시 부모창에 대한 layer 관리 한다.
                 * @memberOf   ib.comm#
                 * @method     _progressPopup
                 * @private
                 * @param      {boolean}     부모창 layer 출력 여부
                 */
                _progressPopup: function(flag) {
                    // 프로그래스 이미지가 담긴 HTML구조 생성
                    var prgImg = '<div class="ib-progressPopup"></div>';

                    if (flag == true) {
                        // 상위 Document 에 append
                        if ($(top.document.body).find(".ib-progressPopup").length == 0) {
                            $(top.document.body).append(prgImg);
                        }
                    } else {
                        // 로딩끝나면 지움
                        $(top.document.body).children('.ib-progressPopup').remove();
                    }
                },
                
                /**
                 * progress layer 관리 한다.
                 * @memberOf   ib.comm#
                 * @method     _progress
                 * @private
                 * @param      {boolean}     progress 출력 여부
                 */
                _progress: function(flag) {
                    // 프로그래스 이미지가 담긴 HTML구조 생성
                    var prgImg = '<div class="ib-progress"><span></span></div>';

                    if (flag == true) {
                        // 상위 Document 에 append
                        if ($(top.document.body).find(".ib-progress").length == 0) {
                            $(top.document.body).append(prgImg);
                        }
                    } else {
                        // 로딩끝나면 지움
                        $(top.document.body).children('.ib-progress').remove();
                    }
                },
                
                /**
                 * progress layer 활성화 한다 .
                 * @memberOf   ib.comm#
                 * @method     showBlockUI
                 * @private
                 */
                showBlockUI: function() {
                    _progressCount++;
                    this._progress(true);
                },

                /**
                 * progress layer 비활성화 한다 .
                 * @memberOf   ib.comm#
                 * @method     hideBlockUI
                 * @private
                 */
                hideBlockUI: function() {
                    _progressCount--;

                    if (_progressCount <= 0) {
                        setTimeout(function() {
                            ib.comm._progress(false);
                            _progressCount = 0;
                        }, 100);

                    }
                },
                /**
                 * 메시지를 출력 한다. ( alert , confirm , 사용자 지정)
                 * @memberOf   ib.comm#
                 * @method     messageBox
                 * @public
                 * @param      {string}      code     메시지 코드
                 * @param      {array}      msg       코드에서 가져온 메시지에 치환할 메시지
                 * @param      {string}     [type = ALERT]   ALERT , CONFIRM , 사용자 지정
                 * @example
                 * ```
                 *  $("#alertBox").click(function() {
                 *      ib.comm.messageBox("" , "테스트 ");
                 *      ib.comm.messageBox("COW1001" , "테스트 ");
                 *  });
                 *
                 *  $("#confirmBox").click(function() {
                 *      if ( ib.comm.messageBox( "" , "테스트 " , "CONFIRM") ){
                 *          ib.comm.messageBox("COW1001 " , "테스트" , "CONFIRM");
                 *      }
                 *  });
                 * ```
                 */
                messageBox: function(code, msg, type) {
                    var retMsg;

                    if (msgCode[code] === undefined) {
                        retMsg = msg;
                    } else {
                        retMsg = msgCode[code];

                        if (cu.isArray(msg)) {
                            for (i = 0, len = msg.length; i < len; i++) {
                                retMsg = retMsg.split('{' + i + '}').join(msg[i]);
                            }
                        } else {
                            retMsg = retMsg.split('{0}').join(msg);
                        }
                    }

                    if (type === undefined) type = "ALERT";

                    if (type === "MSGBOX") {

                    } else if (type === "CONFIRM") {
                        return this.confirm(retMsg);
                    } else {
                        this.alert(retMsg);
                    }
                },
                /**
                 * alert 메시지를 출력 한다. (system alert 을 그대로 사용 한다.)
                 * @memberOf   ib.comm#
                 * @method     alert
                 * @public
                 * @param      {string}     msg     출력할 메시지 문자열
                 */
                alert: function(msg) {
                    alert(msg);
                },

                /**
                 * alert 메시지를 출력 한다. (system confirm 을 그대로 사용 한다.)
                 * @memberOf   ib.comm#
                 * @method     confirm
                 * @public
                 * @param      {string}     msg     출력할 메시지 문자열
                 * @returns    {boolean}            confirm 반환 값
                 */
                confirm: function(msg) {
                    var res = false;
                    res = confirm(msg);

                    return res;
                },

                
                /**
                 * popup dialog 를 출력 한다.
                 * @memberOf   ib.comm#
                 * @method     showPopup
                 * @public
                 * @param      {object}     opt                         설정 옵션 객체
                 * @param      {string}     opt.url                     팝업 URL
                 * @param      {string}     [opt.width = "m"]           팝업 다이얼로그 너비 종류
                 *
                 * | Enum | Description         |
                 * |------|---------------------|
                 * | s    | small size (500px)  |
                 * | m    | medium size (800px) |
                 * | l    | large size (1000px) |
                 *
                 * @param      {number}     [opt.height = 500]          팝업 다이얼로그 높이
                 * @param      {number}     [opt.title = ""]            헤더 타이틀
                 * @param      {number}     [opt.type = "default"]      팝업 다이얼로그 타입 (팝업 ID)
                 * @param      {object}     [opt.cond]                  팝업에 전달한 내용의 json 객체
                 * @param      {string}     [opt.resFuncName]           팝업에서 데이터를 받아서 처리할 함수명
                 */
                showPopup: function(opt) {
                    var context = $(top.document),
                        type = opt.type || "default",
                        topWindow = $(top.window).get(0),
                        $ok = null,
                        $cancel = null,
                        $dialog = null,
                        popFrame = null,
                        widthType = "m",
                        width = 800,
                        widthList = {
                            "S": 500,
                            "M": 900,
                            "L": 1000
                        };

                    topWindow._openPopupList = topWindow._openPopupList || {};

                    // 너비 사이즈 처리
                    widthType = ((opt.width || "m") + "").toUpperCase();
                    width = widthList[widthType] || widthList["M"];

                    // type 중복 체크
                    while (topWindow._openPopupList[type]) {
                        type = type + "-dup";
                    }

                    // check container
                    cc._createPopupContainer(type);

                    $ok = context.find("#" + type + "-popup-ok");
                    $cancel = context.find("#" + type + "-popup-cancel");
                    $dialog = context.find("#" + type + "-popup-dialog");

                    $ok.unbind("click");
                    $cancel.unbind("click");

                    $ok.on("click", function() {
                        $dialog.dialog("close");
                    });

                    $cancel.on("click", function() {
                        $dialog.dialog("close");
                    });

                    $dialog.dialog({
                        autoOpen: false,
                        resizable: ((typeof opt.resizable === "undefined") ? true : !!opt.resizable),
                        modal: (opt.modal === false ? false : true),
                        width: width,
                        height: (opt.height || 500),
                        hideCloseButton: false,
                        title: opt.title || "",
                        // position: {my: "center", at: "center", of: $(top.window)},
                        open: function(event, ui) {
                            var popContainer = context.find("#" + type + "-popup-dialog"),
                                height = popContainer.dialog("option", "height"),
                                width = popContainer.dialog("option", "width"),
                                $btnClose = context.find(".ui-dialog-titlebar-close");

                            
                            // 헤더의 닫기버튼 사용안하기
                            // context.find(".ui-dialog-titlebar-close").css("visibility", "hidden");

                            // 헤더의 닫기버튼 css 설정
//                            $btnClose.removeClass("ui-button ui-corner-all ui-widget").addClass("popup-dialog-icon-close");
//                            $btnClose.children().remove();
                            $btnClose.blur();

                            popFrame = context.find("#" + type + "-popup-frame");

                            popFrame.attr("src", opt.url);
                            popFrame.css("height", height);
                            popFrame.css("width", width);

                            // cond 설정 처리
                            opt.cond = opt.cond || {};
                            $.extend(true, opt.cond, {
                                "popupType" : type,
                                "multiSelect": opt.multiSelect || false,
                                "resFuncName": opt.resFuncName || "",
                                "opener": window
                            });

                            top.window._popupCond[type] = opt.cond;
                            
                        },
                        close: function(event, ui) {
                            delete topWindow._openPopupList[type];
                            popFrame.unbind("load");
                            $dialog.remove();

                            cu.setElemFocus($("#" + opt.focusNext));
                        }
                    });

                    topWindow._openPopupList[type] = 1;

                    $dialog.dialog("option", "position", {
                        my : 'cetner',
                        at : 'center',
                        of: $(top.window)
                    });

                    $dialog.dialog("open");
//                    $dialog.css("z-index", "100");
                    //console.log($dialog.dialog("option","draggable"));
                    
                    //$dialog.dialog("option","draggable", true);

                    return false;
                },

                /**
                 * 팝업을 닫는다
                 * @memberOf   ib.comm#
                 * @method     closePopup
                 * @public
                 * @param      {string}     type        팝업 타입명 (팝업 ID)
                 */
                closePopup: function(type) {
                    $(parent.document).find("#" + type + "-popup-ok").click();
                },

                /**
                 * 팝업에 전달된 param 를 확인 한다.
                 * @memberOf   ib.comm#
                 * @method     getPopupParam
                 * @public
                 * @param      {string}     type        팝업 타입명 (팝업 ID)
                 * @returns    {object}     result
                 * @returns    {object}     result.{cond}           사용자가 전달한 param 정보
                 * @returns    {string}     result.popupType        팝업 타입명 (팝업 ID)
                 * @returns    {boolean}    result.multiSelect      멀티선택 여부
                 * @returns    {object}     result.resFuncName      결과를 처리할 function 명
                 * @returns    {object}     result.opener           opener 의 window 객체
                 */
                getPopupParam: function(type) {
                    var res = {},
                        popupCond = top.window._popupCond;

                    if (typeof popupCond !== "undefined") {
                        res = popupCond[type];
                    }

                    return res;
                },
                
                
                
               

                /**
                 * Json 객체의 데이터를 form 에 로드 한다.
                 * @memberOf   ib.comm#
                 * @method     loadForm
                 * @public
                 * @param      {string}     target    form id 또는 form object
                 * @param      {object}     data      대상 json 객체
                 * @param      {string}     formPreFix      form 안에 element 이름 앞에 붙는 글자.
                 */
                loadForm: function(form, data,formPreFix) {
                    cc._loadForm(form, data,formPreFix);
                },
                
                
                
                
                /**
                 * 조회 결과를 form에 로드한다.
                 * @memberOf   ib.comm#
                 * @method     _loadForm
                 * @private
                 * @param      {string}     target    		form id 또는 form object
                 * @param      {object}     data      		form 에 로드할 json data
                 * @param      {string}     formPreFix      form 안에 element 이름 앞에 붙는 글자.
                 */
                _loadForm: function(form, data,formPreFix) {
                	
                    var formName = "",
                        prop = "",
                        elem = null,
                        elemType = "";

                    if (typeof form === "string") {
                        form = $("#" + form);
                    }
                    if(typeof formPreFix === "undefined"){
                    	formPreFix = "";
                    }

                    formName = form.attr("name");

                    // 단일 데이터가 아닌 경우에는 첫번째 객체로 로드 한다.
                    if (data.length > 0) {
                        data = data[0];
                    }

                    for (prop in data) {
                        elem = null;
                        
                        try {
                            elem = document[formName][formPreFix+prop];
                            if (elem == null || typeof elem === "undefined") {
                                elem = document.getElementById(formPreFix+prop);
                            }

                            if (elem == null || typeof elem == "undefined") {
                                continue;
                            }
                            if (elem == null ||typeof(elem["type"]) == "undefined"){
                            	continue;
                            }
                        } catch (e) {
                            //alert(e.message);
                        }
                        
                        elemType = (elem.type);

                        if (typeof elemType == "undefined" && elem.length > 0) {
                            elemType = elem[0].type;
                        }

                        switch (elemType) {
                            //case undefined:
                            case "button":
                            case "reset":
                            case "submit":
                                break;
                            case "select-one":
                                elem.value = data[prop];
                                break;
                            case "radio":
                            case "checkbox":
                                if (data[prop] == "Y" || data[prop] === true) {
                                    elem.checked = true;
                                } else {
                                    elem.checked = false;
                                }
                                elem.value = data[prop];

                                break;
                            default:
                                if (elem.length === 2) {
                                    $("#" + elem[0].getAttribute('id')).val(data[prop]);
                                } else {
                                    if(elem.getAttribute('data-mask-type') === 'rangePoint'){
                                        $(elem).val(data[prop]).blur();
                                    } else {
                                        
                                        if( elem.getAttribute("class") === "ckeditor"){
                                            CKEDITOR.instances[elem.getAttribute("id")].setData(data[prop]);
                                        } else {
                                            $(elem).val(data[prop]);
                                        }
                                    }

                                }
                                break;
                        }
                    }
                },
                
                /**
                 * form 의 id 또는 name 추출
                 * @memberOf   ib.comm#
                 * @method     _getFormProperty
                 * @private
                 * @param      {object}     target    form id 또는 form object
                 * @returns    {string}               target에 id 
                 */
                
                _getFormProperty: function(form) {
                    var prop = "";

                    if (typeof form === "string") {
                        form = $("#" + form);
                    }

                    //prop = form.attr("data-ref");

                    if (typeof prop === "undefined" || prop === "") {
                        prop = form.attr("id") || form.getAttribute("id") ;
                    }

                    return prop;
                },


                /**
                 * form 데이터를 json 형태로 만들어 준다.
                 * @memberOf   ib.comm#
                 * @method     _formToJson
                 * @private
                 * @param      {object}     form     form id 또는 name
                 */
                _formToJson: function(form) {
                    var res = {},
                        resVal = {},
                        allElem,
                        mcId = "",
                        strDataRef,
                        elemType = "",
                        elemId = "",
                        elemNm = "",
                        elemVal = "",
                        reqFlag = true,
                        reqTitle = "",
                        maskType = "",
                        cssClass = "";

                    if (typeof form === "string") {
                        form = $("#" + form);
                    }

                    formName = form.attr("name");
                    allElem = document[formName];
                    $.each(allElem, function() {

                        elemType = $(this).attr("type");
                        elemId = $(this).attr("id");
                        elemNm = $(this).attr("name");
                        reqTitle = $(this).attr("data-req-title");
                        maskType = $(this).attr("data-mask-type");
                        cssClass = $(this).attr("class");
                        
                        
                        if ($(this).attr("data-mask-type")) {
                            elemVal = $(this).IBMaskEdit('value');
                        } else if ((this.name).indexOf("_code") > 0) {
                            mcId = this.name.replace("_code", "");

                            if ($("#" + mcId).attr("data-multicombo")) {
                                elemId = mcId;
                                elemVal = $("#" + mcId).IBMultiCombo("selectedCode");
                            }
                        } else if (cssClass === "ckeditor") {
                            elemVal = CKEDITOR.instances[elemId].getData();
                        } else {
                            elemVal = $("#" + elemId).val();
                        }

                        if( ! reqTitle ) reqTitle = elemNm;
                        switch (elemType) {
                            //case undefined:
                            case "button":
                            case "reset":
                            case "submit":
                                break;
                            case "select-one":
                                if( $("#" + elemId).prop('required')){
                                    if(elemVal == ""){
                                        cc.messageBox("COW1001" , reqTitle);
                                        this.focus();
                                        reqFlag = false;
                                        return false;
                                    } else {
                                        resVal[elemId] = elemVal;
                                    }
                                } else {
                                    resVal[elemId] = elemVal;
                                }

                                break;

                            case "radio":
                                if ($("input[id=" + elemId + "]").is(":checked") === true) {
                                    if (typeof resVal[elemNm] === "undefined") {
                                        resVal[elemNm] = [].concat([this.value]).join("|");
                                    } else {
                                        if( resVal[elemNm] === ""){
                                            resVal[elemNm]  = [].concat([this.value]).join("|");
                                        } else {
                                            resVal[elemNm] = resVal[elemNm].split("|").concat([this.value]).join("|");
                                        }
                                    }
                                } else {
                                    if (typeof resVal[elemNm] === "undefined") {
                                        resVal[elemNm] = "";
                                    }
                                }
                                break;

                            case "checkbox":
                                if ($("input[id="+elemId+"]").is(":checked") === true) {
                                    resVal[elemId] = "Y";
                                } else {
                                    resVal[elemId] = "N";
                                }

                                break;
                            default:
                                if( $("#" + elemId).prop('required')){
                                    if( $("#" + elemId).val() == ""){
                                        cc.messageBox("COW1001" , reqTitle);
                                        this.focus();
                                        reqFlag = false;
                                        return false;
                                    } else {
                                        resVal[elemId] = elemVal;
                                    }
                                } else {
                                    if (typeof elemId !== "undefined") {
                                        resVal[elemId] = elemVal;
                                    }
                                }
                                break;
                        }
                    });

                    if(! reqFlag) return false;
                    strDataRef = cc._getFormProperty(form);
                    res[strDataRef] = resVal;

                    return res;
                },

                /**
                 * form 데이터를 json 객체로 구성하여 반환한다.
                 * @memberOf   ib.comm#
                 * @method     formToJson
                 * @public
                 * @param      {object}     form     form id 또는 name
                 */
                formToJson: function(form) {
                    var res = cc._formToJson(form);

                    return res;
                },

                /**
                 * 페이징 인덱스 용 함수들.
                 * @memberOf   ib.comm#
                 * @method     formToJson
                 * @public
                 * @param      {object}
                 */
                makePageIndex: function(sheetid) {
        			var current_page = document.getElementById(sheetid+"_current_page").value;
        			if(isNaN(current_page)){
        				current_page = 0;
        			}else{
        				current_page = ~~(current_page);
        			}
        			
        			try{
        				//기존 페이지 인덱스 영역을 clear 하자.
        				ib.comm.clearPageIndex(sheetid);
        				
        				var sr = window[sheetid].GetTotalRows(); //전체 조회 건수
        				var page = document.getElementById(sheetid+"_OnePageCnt").value; //페이지당 레코드 수
        				
        				var pagecnt = 10; //!!!!!!!!!!!!!중요 한번에 표시할 페이지 개수
        				var lastpage = Math.ceil(sr/page); //마지막 페이지 인덱스
        				
        				var li = null;
        				var tt = null;
        				var a = null;
        				var ul = document.createElement("ul");
        				
        				var k=1;
        				if(current_page!= 1){
        					  li = document.createElement("li");
        					  a = document.createElement("a");
        						tt =  document.createTextNode("<<");
        						ib.comm.addEventHandler(li,"click",ib.comm.pagemove,{methodName:"GoToFirstPage",page:1,sheet:sheetid});
        						a.appendChild(tt);
        						li.appendChild(a);
        						ul.appendChild(li);	
        						li = document.createElement("li");
        						a = document.createElement("a");
        						ib.comm.addEventHandler(li,"click",ib.comm.pagemove,{methodName:"GoToPrevPage",page:current_page-1,sheet:sheetid});
        						tt =  document.createTextNode("<");
        						a.appendChild(tt);
        						li.appendChild(a);
        						ul.appendChild(li);	
        				}
        				
        				
        				var sr = (Math.ceil(current_page/pagecnt)*pagecnt)-(pagecnt-1);
        				
        				for(var i=sr;i<(sr+pagecnt);i++){
        					if(i<=lastpage){
        						li = document.createElement("li");
        						a = document.createElement("a");
        						tt =  document.createTextNode(i);
        						ib.comm.addEventHandler(li,"click",ib.comm.pagemove,{methodName:"GoToPageNum",page:i,sheet:sheetid});
        						if(i==current_page)		li.className = "current";
        						a.appendChild(tt);
        						li.appendChild(a);
        						ul.appendChild(li);	
        					}	
        				}		
        				
        				if(current_page < lastpage){
        						a = document.createElement("a");
        					  li = document.createElement("li");
        						tt =  document.createTextNode(">");
        						ib.comm.addEventHandler(li,"click",ib.comm.pagemove,{methodName:"GoToNextPage",page:current_page+1,sheet:sheetid});
        						a.appendChild(tt);
        						li.appendChild(a);
        						ul.appendChild(li);	
        						li = document.createElement("li");
        						tt =  document.createTextNode(">>");
        						a = document.createElement("a");
        						ib.comm.addEventHandler(li,"click",ib.comm.pagemove,{methodName:"GoToLastPage",page:lastpage,sheet:sheetid});
        						a.appendChild(tt);
        						li.appendChild(a);
        						ul.appendChild(li);	
        				}
        				
        				ul.className = "pageindex";
        				document.getElementById(sheetid+"_td_PageIndex").appendChild(ul);
        			}catch(ex){
        				console.log("error\n:"+ex.message);
        			}
                },
                clearPageIndex: function(sheetid) {
        			if (document.getElementById(sheetid+"_td_PageIndex").firstChild) {
        				document.getElementById(sheetid+"_td_PageIndex").removeChild(document.getElementById(sheetid+"_td_PageIndex").firstChild);
        			}
                },
                pagemove: function(param) {
        			var mn = param.methodName;
        			var page = eval(param.page);
        			var sheet = param.sheet;
        			

        			//현재 선택한 페이지 저장
        			document.getElementById(sheet+"_current_page").value = page;
        			//조회 함수 호출  
        			eval(sheet+"_search("+page+")");
        			//페이지 인덱스 부분 다시 그리기
        			ib.comm.makePageIndex(sheet);
                },
                addEventHandler: function(obj,evtName,func,param) {
					if (obj.addEventListener) {   // all browsers except IE before version 9
						obj.addEventListener (evtName, function(){func(param)} , false );
					}
					else {
						if (obj.attachEvent) {    // IE before version 9
							obj.attachEvent ("on"+evtName, function(){func(param)});
						}
					}
                },
                insertCss: function(code) {
        		    var style = document.createElement('style');
        		    style.type = 'text/css';

        		    if (style.styleSheet) {
        		        // IE
        		        style.styleSheet.cssText = code;
        		    } else {
        		        // Other browsers
        		        style.innerHTML = code;
        		    }

        		    document.getElementsByTagName("head")[0].appendChild( style );
                },
                
                /**
                 * 내부함수 시트 내에서 HIDDEN컬럼과,상태컬럼,SEQ컬럼,DelCheck 컬럼을 제외한 나머지 컬럼의 SaveName을 리턴한다.
                 * @memberOf    ib.comm#
                 * @method      _makeHiddenSkipCol
                 * @public
                 * @param       {object}        sopt                      	ibsheet 객체
                 */
                _makeHiddenSkipCol:function(sobj){
                	var lc = sobj.LastCol();
                	var colsArr = new Array();
                	for(var i=0;i<=lc;i++){
                		var coltype = sobj.GetCellProperty(0,i,"Type");
                		//Hidden이 아니면 넣는다.
                		if(0==sobj.GetColHidden(i) && coltype!="Seq"&&coltype!="Status"&&coltype!="DelCheck"){
                			colsArr.push(i);
                		}
                	}
                	return colsArr.join("|");
                },
                /*
                 * 조회 종료 후 이벤트 오버라이드
                 */
                _triggerSearchEndEvent: function(grid) {
                    var id = grid.id,
                    userEvent = window[id + "_OnSearchEnd"];

                    window[id + "_OnSearchEnd"] = function(code,msg,StCode, StMsg, Response) {
                     	try{
                     		if(!cu.isEmpty(msg) && code < 0){
                     			cc.messageBox("",msg);
                     		}
                     		cc.hideBlockUI();
                     		grid.SetWaitImageVisible(1);
                     	}catch(e){}
                        if (typeof userEvent === "function") {
                            userEvent(code,msg,StCode, StMsg, Response);
                        }                        
                    }
                },
                /*
                 * 저장 종료후 이벤트 오버라이드
                 */
                _triggerSaveEndEvent: function(grid) {
                    var id = grid.id,
                    userEvent = window[id + "_OnSaveEnd"];

                    window[id + "_OnSaveEnd"] = function(code,msg,StCode, StMsg, Response) {
                     	try{
                     		if(!cu.isEmpty(msg)&&code<0){
                     			cc.messageBox("",msg);
                     		}
                     		cc.hideBlockUI();
                     		grid.SetWaitImageVisible(1);
                     	}catch(e){}
                        if (typeof userEvent === "function") {
                            userEvent(code,msg,StCode, StMsg, Response);
                        }                        
                    }
                },
                /*
                 * excel export 종료 이벤트
                 */
                _triggerDownFinishEvent: function(grid) {
                    var id = grid.id,
                    message = "",
                    userEvent = window[id + "_OnDownFinish"];

                    window[id + "_OnDownFinish"] = function(downloadType, result) {
                     	try{
                     		cc.hideBlockUI();
                     		grid.SetWaitImageVisible(1);
                     	}catch(e){}
                        if (typeof userEvent === "function") {
                            userEvent(downloadType, result);
                        }                        
                    }
                },
                
                /*
                 * excel import 종료 이벤트
                 */
                _triggerLoadExcelEvent: function(grid) {
                    var id = grid.id,
                    message = "",
                    userEvent = window[id + "_OnLoadExcel"];

                    window[id + "_OnLoadExcel"] = function(result, code, msg) {
                     	try{
                     		cc.hideBlockUI();
                     		grid.SetWaitImageVisible(1);
                     	}catch(e){}
                        if (typeof userEvent === "function") {
                            userEvent(result, code, msg);
                        }                        
                    }
                },
                _triggerOnLoadFileSelectEvent: function(grid) {
                    var id = grid.id,
                        message = "",
                        userEvent = window[id + "_OnLoadFileSelect"];

                    window[id + "_OnLoadFileSelect"] = function(frm, filename) {
                        cc.showBlockUI();

                        if (typeof userEvent === "function") {
                            userEvent(frm, filename);
                        }                        
                    }
                }
            };
        })().init();

        $(document).ready(function() {
           
        });
    })(ib);
})();