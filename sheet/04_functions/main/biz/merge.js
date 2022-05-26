		
		$(document).ready(function(){
			createIBSheet2("ibsheetArea", "mySheet", "100%", "100%");
			LoadPage();
		})
		
		/*
			Todo :
			1. Merge 형태에 맞는 데이터로 변경
		*/
			//시트 높이 계산용		
			var pageheightoffset = 270;
			
			/*Sheet 기본 설정 */
			function LoadPage() {
				
				//아이비시트 초기화
				var initdata = {};
				initdata.Cfg = {
					SearchMode : smLazyLoad,
					// Page:50,
					// DeferredVScroll : 1,
					UpdateMergeCells : 1,
					PrevColumnMergeMode : 1,
					MergeSheet:msHeaderOnly
				};
				
		        	
				initdata.Cols = [
					{Header:"No|No","Type":"Seq","MinWidth":30,"ColMerge": 0},
					{Header:"도매시장|도매시장","Type":"Text","MinWidth":80, SaveName : "WHSALMRKT", "Align" : "Center", "ColMerge":1},
					{Header:"년도|년도","Type":"Text","MinWidth":80, SaveName : "YEAR", "Align" : "Center", "ColMerge":1},
					{Header:"부류|일반","Type":"Text","MinWidth":80, SaveName : "CATGORY_DETAIL", "Align" : "Center", "ColMerge":1},
					{Header:"부류|상세","Type":"Text","MinWidth":80, SaveName : "CATGORY", "Align" : "Center", "ColMerge":1},
					{Header:"부류|공판장","Type":"Text","MinWidth":80, SaveName : "JMRKT", "Align" : "Center", "ColMerge":1},
					{Header:"검토항목|물량","Type":"Text","MinWidth":80, SaveName : "VOLM", "Align" : "Center", "ColMerge":1},
					{Header:"검토항목|금액","Type":"Text","MinWidth":80, SaveName : "AMOUNT", "Align" : "Center", "ColMerge":1},
					{Header:"단위|단위","Type":"Text","MinWidth":80, SaveName : "UNIT", "Align" : "Center", "ColMerge":1}
				];
				
				IBS_InitSheet(mySheet,initdata);
				mySheet.FitColWidth();
				   mySheet.SetScrollInfoPosition("scroll");
				   mySheet.SetScrollInfoFormat(getFormat());
				   
				doAction('search');
			}
		
		
			/*Sheet 각종 처리*/
			function doAction(sAction) {
				switch(sAction) {
					case "search": //데이터 조회
						mySheet.DoSearch("./data/merge_data.js");
						break;
					case "reload": //조회 데이터 제거
						mySheet.RemoveAll();
						break;
				}
			}
			
			
			//머지 영역 교체 (머지는 조회 중에 이루어짐으로 재 조회 한다.)
			function mergeChg(str){
				mySheet.SetMergeSheet(eval(str));
				doAction('search');
			}
			function mySheet_OnSearchEnd(code,msg){
		// 		mySheet.SetRowMerge(4, 1);
		//		mySheet.FitSize(false,true);	
			}
			
			function getFormat(){
				var objSht = '',
					strFormat = '',
					strKbn = ",";
				
				if(typeof objId !== 'object'){
					objSht = window["mySheet"];
				}else{
					return -1;
				}
				var headerIdx = objSht.HeaderRows()-1,
					headerLen = objSht.LastCol();
				
				var strFormat = '<div style="height: 70px; width: 90%; display: block; border : solid 1px red; ">'; 
				strFormat += '<table class="GMSection"><tbody><tr>';
				strFormat += '<td scope="col" style="width:0px;"></td>';
				strFormat += '<th scope="col" style="height:0px;width:77px;font-size:0px!important;line-height:0px!important;visibility:hidden!important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">No No</span></th><th scope="col" style="height:0px;width:20px;"></th><th scope="col" style="height:0px;width:240px;font-size:0px!important;line-height:0px!important;visibility:hidden!important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">신청인 신청인</span></th><th scope="col" style="height:0px;width:20px;"></th><th scope="col" style="height:0px;width:305px;font-size:0px!important;line-height:0px!important;visibility:hidden!important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">신청일자 신청일자</span></th><th scope="col" style="height:0px;width:20px;"></th><th scope="col" style="height:0px;width:240px;font-size:0px!important;line-height:0px!important;visibility:hidden!important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">결재여부 결재여부</span></th><th scope="col" style="height:0px;width:20px;"></th><th scope="col" style="height:0px;width:256px;font-size:0px!important;line-height:0px!important;visibility:hidden!important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">신청금액 신청금액</span></th><th scope="col" style="height:0px;width:20px;"></th><th scope="col" style="height:0px;width:305px;font-size:0px!important;line-height:0px!important;visibility:hidden!important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">근태기간 시작일</span></th><th scope="col" style="height:0px;width:20px;"></th><th scope="col" style="height:0px;width:305px;font-size:0px!important;line-height:0px!important;visibility:hidden!important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">근태기간 종료일</span></th><th scope="col" style="height:0px;width:20px;"></th><th scope="col" style="height:0px;width:305px;font-size:0px!important;line-height:0px!important;visibility:hidden!important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">시간 시작</span></th><th scope="col" style="height:0px;width:20px;"></th><th scope="col" style="height:0px;width:306px;font-size:0px!important;line-height:0px!important;visibility:hidden!important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">시간 종료</span></th><th scope="col" style="height:0px;width:20px;"></th></tr><tr onmousemove="Grids[0].ARow=Grids[0].Rows[&quot;1&quot;];Grids[0].ASec=0;" onmousedown="Grids[0].ARow=Grids[0].Rows[&quot;1&quot;];Grids[0].ASec=0;" class="GMHeaderRow " style="height: 26px;"><td style="width:0px;height:26px"></td><td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C1" rowspan="2" colspan="2">No</td><td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C2" rowspan="2" colspan="2">신청인</td><td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C3" rowspan="2" colspan="2">신청일자</td><td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C4" rowspan="2" colspan="2"><span class="GMCheckHeader0">&nbsp;</span><span class="GMHeaderText IBSheetFont0" style="vertical-align: middle;">결재여부</span></td><td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C5" rowspan="2" colspan="2">신청금액</td><td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C6" colspan="4">근태기간</td><td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C8" colspan="4">시간</td></tr><tr onmousemove="Grids[0].ARow=Grids[0].Rows[&quot;Header&quot;];Grids[0].ASec=0;" onmousedown="Grids[0].ARow=Grids[0].Rows[&quot;Header&quot;];Grids[0].ASec=0;" class="GMHeaderRow " style="height: 26px;"><td style="width:0px;height:26px"></td><td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C6" colspan="2">시작일</td><td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C7" colspan="2">종료일</td><td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C8" colspan="2">시작</td>';
				strFormat += '<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont0 GMCellHeader IBSheetFont0 HideCol0C9" colspan="2">종료</td>';
				strFormat += '</tr></tbody></table>';
				
				for(var i=0; i<=headerLen; i+=1){
					if(i == 0){
						//strFormat += strKbn;
						strFormat +=  '<td style="width:0px;height:27px"></td>';
						strFormat += '<td align="Center" colspan="2" class=" GMWrap0 GMAlignCenter GMDate GMCell IBSheetFont0 GMNoRight HideCol0C'+(i+1)+'">|'+objSht.ColSaveName(i)+'|</td>';
					}else{
						strFormat += '<td align="Center" colspan="2" class=" GMWrap0 GMAlignCenter GMDate GMCell IBSheetFont0 GMNoRight HideCol0C'+(i+1)+'">|'+objSht.ColSaveName(i)+'|</td>';
					}
				}
				
				return strFormat;
		}
			
			function mySheet_OnBeforePaste(text) {
				console.log("########################");
				console.log("|"+text+"|");
				console.log("########################");
			}
				 

			