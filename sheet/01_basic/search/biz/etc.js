			//시트 초기 높이 결정	
			var pageheightoffset = 170;
			
			$(document).ready(function(){
				LoadPage();
				
				doAction("search", "mySheet");
				doAction("search", "mySheet2");
			});
			
			function LoadPage() {
				
				var initSheet = {
					Cfg : {
						SearchMode : smLazyLoad,
						MergeSheet : msHeaderOnly
					}
				};
				
				initSheet.Cols = [
					{Header:"No",Type:"Text",Width:45,SaveName:"RN",Align:"center",ColMerge:0},
					{Header:"우편번호",Type:"Text",Width:85,Align:"Center",SaveName:"POSTNO",Format:"PostNo",ColMerge:0},
					{Header:"시도",Type:"Text",Width:70,SaveName:"SIDO"},
					{Header:"시군구",Type:"Text",Width:80,SaveName:"SIGUNGU"},
					{Header:"읍면동",Type:"Text",Width:80,SaveName:"UBMYNDONG"},
					{Header:"리",Type:"Text",Width:80,SaveName:"LEE"},
					{Header:"주소",Type:"Text",Width:300,SaveName:"ADDRESS"}
				];
				
				
				IBS_InitSheet(mySheet, initSheet);
				mySheet.FitColWidth();
				mySheet.SetCountPosition(4);
				
				
				IBS_InitSheet(mySheet2, initSheet);
				mySheet2.FitColWidth();
				mySheet2.SetCountPosition(4);
			}
			
			
			
			/*Sheet 각종 처리*/
			function doAction(sAction, id) {
				var perPageCnt = 100,
					objSht = window[id],
					ibpage = parseInt(objSht.GetTotalRows() / perPageCnt) + 1;
				
				switch(sAction) {
					case "search":
						var url = "./biz/etc_data_hsql.jsp";
						$.ajax({
							type: "POST",
							url: url,
							data: {"ibpage" : ibpage, onepagerow : perPageCnt},
							success: function(data, status){
								_tmpData = objSht.GetSaveJson({AllSave : 1});
								data["Data"] = _tmpData["data"].concat(data["Data"]) 
								objSht.LoadSearchData(data);
							},
							dataType: "json",
							complete : function(e){
								setTimeout(function(){objSht.SetTopRow((ibpage-1)*perPageCnt);},100);
								if(id == "mySheet2"){
									$("#tmpBtn").fadeOut();
								}
							}
						});
						break;
					case "reload":
						mySheet.RemoveAll();
						break;
				}
			}
			
			function mySheet_OnVScroll(vpos, oldvpos, isTop, isBottom) {
				if (isBottom == true){
					doAction("search", "mySheet");
				}
			}
			
			function mySheet2_OnVScroll(vpos, oldvpos, isTop, isBottom) {
				if (isBottom == true){
					console.log(isBottom);
					$("#tmpBtn").fadeIn();
					$("#tmpBtn").prop("disabled", false);
				}
			}