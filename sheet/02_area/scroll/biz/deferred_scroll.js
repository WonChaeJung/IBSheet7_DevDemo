
	//시트 높이 계산용
	var pageheightoffset = 250;

	$(document).ready(function(){
		try{
			createIBSheet3("ibsheetArea", "mySheet", "100%", "100%");
			createIBSheet3("ibsheetArea2", "mySheet2", "100%", "100%");
			createIBSheet3("ibsheetArea3", "mySheet3", "100%", "100%");
			
			LoadPage();
		}
		catch(e){
			alert(e.message);
		}
	});
	
	/*Sheet 기본 설정 */
	function LoadPage() {
		
		//아이비시트 초기화
		var initSheet = {};
		
		initSheet.Cfg = {
			SelectionSummary:"EmptyCell|DelRow",
			SearchMode:smLazyLoad,
			MergeSheet:msPrevColumnMerge,
			PrevColumnMergeMode:0
		};
		
		initSheet.Cols = [
			{"Header" : "모델번호", "Type" : "Text", "MinWidth" : 100 },
			{"Header" : "평형","Type":"Int","Width":100,"ZeroToReplaceChar":"미처리", ColMerge:0},
			{"Header" : "단가(A)","Type":"Int","Width":80,"SaveName":"A","Align":"Right",ColMerge:0, "SumType" : "Count"},
			{"Header" : "판매가(B)\nA * 1.03 / 100","Type":"Int","Width":85,"SaveName":"B","PointCount" : 2, "Align":"Right",ColMerge:0},
			{"Header" : "현금구입가(C)\n A * 0.9 / 100","Type":"Int","Width":85,"SaveName":"C","Format":"#,##0.00","Align":"Right",ColMerge:0},
			{"Header" : "할부구입가(D)\nA * 0.93 / 100","Type":"Int","Width":85,"SaveName":"D","Format":"#,##0.00","Align":"Right",ColMerge:0},
			{"Header" : "현금부담액(E)\nB-C","Type":"Int","Width":85,"Format":"#,##0.00","ColMerge":1,"Align":"Right",ColMerge:0},
			{"Header" : "할부부담액(F)\nB-D","Type":"Int","Width":85,"Format":"#,##0.00","Align":"Right",ColMerge:0}
		];
		
		IBS_InitSheet(mySheet, initSheet);
		initSheet["Cfg"]["DeferredVScroll"] = 1;
		
		IBS_InitSheet(mySheet2, initSheet);
		IBS_InitSheet(mySheet3, initSheet);
		
		mySheet.FitColWidth();
		mySheet2.FitColWidth();
		mySheet3.FitColWidth();
		
		mySheet.DoSearch("./data/deferred_scroll_data.js");
		mySheet2.DoSearch("./data/deferred_scroll_data.js");
		mySheet3.DoSearch("./data/deferred_scroll_data.js");
		
		var format = setColumnInfo("mySheet3")
		mySheet3.SetScrollInfoPosition("scroll");
		mySheet3.SetScrollInfoFormat(format);
		
	}
	
	function setColumnInfo(strId){
		
		var objSht = '',
			strFormat = '',
			strKbn = ",";
		
		if(typeof objId !== 'object'){
			objSht = window[strId];
		}else{
			return -1;
		}
		
		
		function getHeaderText(i){
			var rtnText = objSht.HeaderText[i];
			if(rtnText.indexOf("\n") > -1){
				rtnText = rtnText.replace(/\n/gi, "<br/>");
			}
			return rtnText;
		}
		
		// ["모델번호", "평형", "단가(A)", "판매가(B)↵A * 1.03 / 100", "현금구입가(C)↵ A * 0.9 / 100", "할부구입가(D)↵A * 0.93 / 100", "현금부담액(E)↵B-C", "할부부담액(F)↵B-D"]
		
		
		var headerIdx = objSht.HeaderRows()-1,
			headerLen = objSht.LastCol();
		var strFormat = ''
			+'	<tr onmousemove="Grids[2].ARow=Grids[2].Rows[&quot;Header&quot;];Grids[2].ASec=0;" onmousedown="Grids[2].ARow=Grids[2].Rows[&quot;Header&quot;];Grids[2].ASec=0;" class="GMHeaderRow " style="height: 26px;" title="">'
			+'	<td style="width:0px;height:26px"></td>'
			/*+'	<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont2 GMCellHeader IBSheetFont2 HideCol2C1" colspan="2">모델번호</td>'
			+'	<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont2 GMCellHeader IBSheetFont2 HideCol2C2" colspan="2">평형</td>'
			+'	<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont2 GMCellHeader IBSheetFont2 HideCol2C3" colspan="2">단가(A)</td>'
			+'	<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont2 GMCellHeader IBSheetFont2 HideCol2C4" colspan="2">판매가(B)<br>A * 1.03 / 100</td>'
			+'	<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont2 GMCellHeader IBSheetFont2 HideCol2C5" colspan="2">현금구입가(C)<br> A * 0.9 / 100</td>'
			+'	<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont2 GMCellHeader IBSheetFont2 HideCol2C6" colspan="2">할부구입가(D)<br>A * 0.93 / 100</td>'
			+'	<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont2 GMCellHeader IBSheetFont2 HideCol2C7" colspan="2">현금부담액(E)<br>B-C</td>'
			+'	<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont2 GMCellHeader IBSheetFont2 HideCol2C8" colspan="2">할부부담액(F)<br>B-D</td>';*/
			+	window[strId].GetCellValue()
			+'	</tr>';
				
		for(var i=0; i<=headerLen; i+=1){
			if(i == 0){
				//strFormat += strKbn;
				strFormat +=  '<td style="width:0px;height:27px"></td>';
				strFormat += '<td align="Center" colspan="2" class=" GMWrap0 GMAlignCenter GMDate GMCell IBSheetFont0 GMNoRight HideCol0C'+(i+1)+'">|'+objSht.ColSaveName(i)+'|</td>';
			}else{
				strFormat += '<td align="Center" colspan="2" class=" GMWrap0 GMAlignCenter GMDate GMCell IBSheetFont0 GMNoRight HideCol0C'+(i+1)+'">|'+objSht.ColSaveName(i)+'|</td>';
			}
		}
		
		var strFormat2 = ''
			+ '<div style="width: 100%; height: 200px; display: block;">'
			+ '<div style="position: static;" class="GridMain">'
			+ '	<div class="GridMain1"><div class="GridMain2">'
			+ '			<table cellspacing="0" cellpadding="0" class="GMMainTable GMFocusedSheet">'
			+ '				<tbody>'
			+ '					<tr>'
			+ '						<td style="overflow:hidden;">'
			+ '							<div class="GMHeadMid" style="overflow: hidden; width: 100%;">'
			+ '								<table cellspacing="0" cellpadding="0" class="GMSection">'
			+ '								<tbody>'
			+ '								<tr>';
			
			for(var i=0; i<=headerLen; i+=1){
				if(i == 0){
					strFormat2 += '<td scope="col" style="width:0px;"></td>';
					strFormat2 += '<th scope="col" style="height: 0px; width: '+(objSht.GetColWidth(i)-22)+'px; font-size: 0px !important; line-height: 0px !important; visibility: hidden !important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">'+getHeaderText(i)+'</span></th>';
					strFormat2 += '<th scope="col" style="height:0px;width:20px;"></th>';
				}else{
					strFormat2 += '<th scope="col" style="height: 0px; width: '+(objSht.GetColWidth(i)-22)+'px; font-size: 0px !important; line-height: 0px !important; visibility: hidden !important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">'+getHeaderText(i)+'</span></th>';
					strFormat2 += '<th scope="col" style="height:0px;width:20px;"></th>';
				}
			}
			
			strFormat2 += '					</tr>'
			+ '								<tr style="height: 26px;">';
			
			for(var i=0; i<=headerLen; i+=1){
				if(i == 0){
					strFormat2 += '<td style="width:0px;height:26px"></td>';
					strFormat2 += '<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont2 GMCellHeader IBSheetFont2 HideCol2C1" colspan="2">'+getHeaderText(i)+'</td>'
				}else{
					strFormat2 += '<td align="Center" class=" GMWrap0 GMAlignCenter GMHeaderText IBSheetFont2 GMCellHeader IBSheetFont2 HideCol2C2" colspan="2">'+getHeaderText(i)+'</td>'
				}
			}
			
			strFormat2 += '						</tr>'
			+ '								</tbody>'
			+ '								</table>'
			+ '							</div>'
			+ '						</td>'
			+ '					</tr>'
			+ '					<tr>'
			+ '						<td style="overflow:hidden;">'
			+ '						<div class="GMBodyMid" style="overflow: hidden;">'
			+ '							<div class="GMPageFirst">'
			+ '								<table cellspacing="0" cellpadding="0" class="GMSection" border=1>'
			+ '								<tbody>'
			+ '								<tr>';
			
			for(var i=0; i<=headerLen; i+=1){
				if(i == 0){
					strFormat2 += '<td scope="col" style="width:0px;"></td>';
					strFormat2 += '<th scope="col" style="height: 0px; width: '+(objSht.GetColWidth(i)-22)+'px; font-size: 0px !important; line-height: 0px !important; visibility: hidden !important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">'+getHeaderText(i)+'</span></th>';
					strFormat2 += '<th scope="col" style="height:0px;width:20px;"></th>';
				}else{
					strFormat2 += '<th scope="col" style="height: 0px; width: '+(objSht.GetColWidth(i)-22)+'px; font-size: 0px !important; line-height: 0px !important; visibility: hidden !important;"><span style="font-size:0px!important;line-height:0px!important;visibility:hidden!important;">'+getHeaderText(i)+'</span></th>';
					strFormat2 += '<th scope="col" style="height:0px;width:20px;"></th>';
				}
			}
			
			strFormat2 += '					</tr>'
			+ '								<tr class="GMDataRow GMClassFocused" style="height: 27px;">';
			for(var i=0; i<=headerLen; i+=1){
				if(i == 0){
					strFormat2 += '<td style="width:0px;height:27px"></td>';
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">|'+objSht.ColSaveName(i)+'|</td>';
				}else{
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">|'+objSht.ColSaveName(i)+'|</td>';
				}
			}
			strFormat2 += '					</tr>'
			+ '								<tr class="GMDataRow " style="height:27px;">';
			for(var i=0; i<=headerLen; i+=1){
				var saveName = objSht.ColSaveName(i),
					nTopRow = 'TOPROW';
				
				console.log(nTopRow);
				if(i == 0){
					console.log(objSht.GetCellValue(nTopRow, 'C2'));
					strFormat2 += '<td style="width:0px;height:27px"></td>';
					//strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">'+setTimeout(function(){objSht.GetCellValue(6, 'C2'), 100})+'</td>';
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">'+objSht.LastCol()+'</td>';
				}else{
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">|'+objSht.ColSaveName(i)+'|</td>';
					// strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">|'+objSht.ColSaveName(i)+'|</td>';
				}
			}			
			strFormat2 += '					</tr>'
				
			strFormat2 += '					</tr>'
			+ '								<tr class="GMDataRow " style="height:27px;">';
			for(var i=0; i<=headerLen; i+=1){
				var saveName = objSht.ColSaveName(i),
					nTopRow = 'TOPROW';
				if(i == 0){
					strFormat2 += '<td style="width:0px;height:27px"></td>';
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">'+objSht.LastCol()+'</td>';
				}else{
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">|'+objSht.ColSaveName(i)+'|</td>';
				}
			}			
			strFormat2 += '					</tr>'
				+ '								<tr class="GMDataRow " style="height:27px;">';
			for(var i=0; i<=headerLen; i+=1){
				var saveName = objSht.ColSaveName(i),
					nTopRow = 'TOPROW';
				if(i == 0){
					strFormat2 += '<td style="width:0px;height:27px"></td>';
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">'+objSht.LastCol()+'</td>';
				}else{
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">|'+objSht.ColSaveName(i)+'|</td>';
				}
			}			
			strFormat2 += '					</tr>'
				+ '								<tr class="GMDataRow " style="height:27px;">';
			for(var i=0; i<=headerLen; i+=1){
				var saveName = objSht.ColSaveName(i),
					nTopRow = 'TOPROW';
				if(i == 0){
					strFormat2 += '<td style="width:0px;height:27px"></td>';
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">'+objSht.LastCol()+'</td>';
				}else{
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">|'+objSht.ColSaveName(i)+'|</td>';
				}
			}			
			strFormat2 += '					</tr>'
			strFormat2 += '					</tr>'
				+ '								<tr class="GMDataRow " style="height:27px;">';
			for(var i=0; i<=headerLen; i+=1){
				var saveName = objSht.ColSaveName(i),
					nTopRow = 'TOPROW';
				if(i == 0){
					strFormat2 += '<td style="width:0px;height:27px"></td>';
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">'+objSht.LastCol()+'</td>';
				}else{
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">|'+objSht.ColSaveName(i)+'|</td>';
				}
			}			
			strFormat2 += '					</tr>'
			strFormat2 += '					</tr>'
				+ '								<tr class="GMDataRow " style="height:27px;">';
			for(var i=0; i<=headerLen; i+=1){
				var saveName = objSht.ColSaveName(i),
					nTopRow = 'TOPROW';
				if(i == 0){
					strFormat2 += '<td style="width:0px;height:27px"></td>';
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">'+objSht.LastCol()+'</td>';
				}else{
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">|'+objSht.ColSaveName(i)+'|</td>';
				}
			}			
			strFormat2 += '					</tr>'
			strFormat2 += '					</tr>'
				+ '								<tr class="GMDataRow " style="height:27px;">';
			for(var i=0; i<=headerLen; i+=1){
				var saveName = objSht.ColSaveName(i),
					nTopRow = 'TOPROW';
				if(i == 0){
					strFormat2 += '<td style="width:0px;height:27px"></td>';
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">'+objSht.LastCol()+'</td>';
				}else{
					strFormat2 += '<td align="Right" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C'+(i+1)+'" colspan="2">|'+objSht.ColSaveName(i)+'|</td>';
				}
			}			
			strFormat2 += '					</tr>'
/*			+ '								<tr class="GMDataRow " style="height:27px;">'
			+ '									<td style="width:0px;height:27px"></td>'
			+ '									<td style="" class=" GMWrap0 GMInt GMCell IBSheetFont2 GMEmpty HideCol2C2" colspan="2">&nbsp;</td>'
			+ '									<td align="Right" style="" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C3" colspan="2">3,225,000</td>'
			+ '									<td align="Right" style="" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C4" colspan="2">33,217</td>'
			+ '									<td align="Right" style="" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C5" colspan="2">29,025.00</td>'
			+ '									<td align="Right" style="" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C6" colspan="2">29,992.00</td>'
			+ '									<td align="Right" style="" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C7" colspan="2">0.00</td>'
			+ '									<td align="Right" style="" class=" GMWrap0 GMAlignRight GMInt GMCell IBSheetFont2 HideCol2C8" colspan="2">0.00</td>'
			+ '								</tr>'*/
			+ '								</tbody>'
			+ '								</table>'
			+ '							</div>'
			+ '						</div>'
			+ '						</td>'
			+ '					</tr>'
			+ '				</tbody>'
			+ '			</table>'
			+ '		</div>'
			+ '	</div>'
			+ '</div>'
			+ '</div>';
			
		return strFormat2;
	}
	
	/*Sheet 각종 처리*/
	function doAction(sAction) {
		switch(sAction) {
			case "search": //데이터 조회
				//mySheet.DoSearch("./data/subtotal_data.js");
				mySheet.DoSearch("./data/deferred_scroll_data.js");
				break;
		}
	}
	


(function($, window) {
	var init_fn_flag = false;
	var init_fn = (function() {
		if (init_fn_flag)
			return;
		init_fn_flag = true;
		 hljs.configure({"tabReplace":"    "});
		$('pre code').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	});
	$(document).ready(init_fn);
	$(window).on("load", init_fn);
})(jQuery, window);
