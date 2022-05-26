<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>

	<script>
	
		function fn_movePage(product, page) {
			
			if((".sheetBox").length > 0){
				$("#contents").removeClass("sheetBox");	
			}
			
			if(page == ""){
				localStorage.removeItem("forwardSelGroup");
				//location.href="/sheet/SearchSave/dataType.do";
				location.href="/";
			}else{
				// var base_path = "<c:url value='/'/>";
				
				var base_path = "${pageContext.request.contextPath}/";
				var url = base_path + product + "/" + page+".jsp";
				
				localStorage["forwardSelGroup"] = $("#leftSelGroup").val();
				location.href=url;
			}
		}
		
		var leftMenu = leftMenu || {};
		
		(function(){
			(function(leftMenu){
		
				leftMenu.comm = (function() {
		
					var LMJsonData = LMJsonData || [];
					var htmlTag = "", forwardUrl = "";
		
					return {
						init: function() {
						//초기화
						return this;
					},
					add: function() {
						var level = 0;
						//레벨 확인
						if(arguments[1] < 0){ //0레벨
							level = 0;
						}else if(arguments[1] == 0){ //1레벨
							level = 1;
						}else{ //2레벨
							level = 2;
						}
						LMJsonData.push({"id":arguments[0], "parentId":arguments[1],"title":arguments[2],"fnc":arguments[3], "act":arguments[4], "level":level, "isUse":false,"isChild":false});
						//console.log("sort",sortResults(LMJsonData, "level"));
					},
					createLeftMenu: function(str) {
						//URL Check
						forwardUrl = location.pathname+location.search;
						var jsonData = LMJsonData;
						//htmlTag = "<h3 style='text-align:center;'>"+jsonData[0]["title"]+"</h3>";
						//Header Select Box 생성 (신규일때)
						if(str == "new"){
							// htmlTag = "<h3 style='text-align:center;padding-top:5px;'>"+jsonData[0]["title"]+"</h3>";
							htmlTag += "<div id='leftSelBox' style='height: 66px;vertical-align: middle;padding:10px 15px 15px 15px;'>";
							htmlTag += "<select id='leftSelGroup' onchange='javascript:leftMenu.comm.insertItem(this.value);'>";
							htmlTag += "<option value='01_basic'>기본기능</option>";
							htmlTag += "<option value='02_area'>영역별</option>";
							htmlTag += "<option value='03_colType'>컬럼타입별</option>";
							htmlTag += "<option value='04_functions'>기능별</option>";
							//htmlTag += "<option value='05_style'>스타일</option>";
							htmlTag += "<option value='06_event'>이벤트</option>";
							htmlTag += "<option value='07_etc'>기타</option>";
							htmlTag += "</select>";
							htmlTag += "</div>";
						}else{
							htmlTag = "";
						}
						htmlTag += "<ul id='navigation' class='menu'>";
						
						//Child Node 가 있는지 확인
						jsonData = leftMenu.comm.getChildNode(jsonData);
						
						//parentId 가 0이면 
						for(var i=0; i<jsonData.length; i++){
							jsonData = leftMenu.comm.getLeftMenuTag(jsonData);
						}
						htmlTag += "</ul>";
						//console.log(htmlTag);
						leftMenu.comm.HtmlTag = htmlTag;
						//document.write(htmlTag);
						$("#left_wrap").append(htmlTag);
						var menu_li = document.querySelectorAll('#navigation')[0].querySelectorAll('li');
						
						for( var i=0; i < menu_li.length; i++){
							//console.log(menu_li[i].classList.length, menu_li[i].classList[0],menu_li[i].classList[1]);
							//ch on 위치 찾아가기
							//console.log(menu_li[i].classList.length );
							if(menu_li[i].classList.length == 1){
								if(menu_li[i].classList[0] == "on"){
									
									menu_li[i].parentElement.style.display = "block";
									menu_li[i].parentElement.parentElement.setAttribute('class','on');
									
									setTimeout(function() {
										menu_li[i].parentNode.parentNode.querySelector('a').click();
									}, 100);
									break;
									
								}
							}
						}
					},
					getChildNode: function(jsonData) {
						for(var i=1; i<jsonData.length; i++){
							for(var j=1; j<jsonData.length; j++){
								//2레벨
								if(jsonData[j]["level"] > 0){
									if(jsonData[i]["id"] == jsonData[j]["parentId"]){
										//console.log(jsonData[i]["id"],jsonData[j]["parentId"]);
										jsonData[i]["isChild"] = true;
										//console.log(jsonData);
										break;
									}
								}
							}
						}
						return jsonData;
					},
					getLeftMenuTag: function(jsonData) {
						var beforeId = 0;
						var isProcess = false;
						
						for(var i=0; i<jsonData.length; i++){
							//1레벨 가져오기
							for(var j=0; j<jsonData.length; j++){
								//ID값이 부모노드ID값과 동일한 메뉴 확인
								if(!jsonData[j]["isUse"]){
									if(jsonData[j]["level"] == 1){
										if(jsonData[i]["id"] == jsonData[j]["parentId"]){
											//여기서 하위 노드가 있는지 판단
											//console.log("isChildNode:",jsonData[j]["isChild"]);
											if(jsonData[j]["isChild"]){
												htmlTag += "<li class='"+leftMenu.comm.URLComparison(jsonData[j]["act"])+"'><a href='javascript:void(0)'>"+jsonData[j]["title"]+"</a>";
												htmlTag += "<ul>";
												isChild = true;
											}else{
												htmlTag += "<li class='"+leftMenu.comm.URLComparison(jsonData[j]["act"])+"'><a href='"+jsonData[j]["fnc"]+"'>"+jsonData[j]["title"]+"</a></li>";
											}
											jsonData[j]["isUse"] = true;
											beforeId = jsonData[j]["id"];
											break;
										}
									}
								}
							}
							//2레벨 가져오기
							for(var j=0; j<jsonData.length; j++){
								if(!jsonData[j]["isUse"]){
									if(jsonData[j]["level"] == 2){
										if(jsonData[i]["id"] == jsonData[j]["parentId"]){
											//console.log(jsonData[i]["id"],jsonData[j]["parentId"],beforeId);
											if(jsonData[j]["parentId"] == beforeId){
												//2레벨 메뉴 추가
												htmlTag += "<li class='"+leftMenu.comm.URLComparison(jsonData[j]["act"])+"'><a href='javascript:void(0)' onclick='javascript:"+jsonData[j]["fnc"]+"'>"+jsonData[j]["title"]+"</a></li>";
												jsonData[j]["isUse"] = true;
												isProcess = true;
											}
										}
									}
								}
							}
						}
						if(isProcess){
							htmlTag += "</ul>";
							htmlTag += "</li>";
						}
						return jsonData;
					},
					URLComparison: function(url){
		                	
		                	var classTag = "";
		                	// console.log(forwardUrl.substr(0, forwardUrl.lastIndexOf(".jsp")+4), url);
		                	if(forwardUrl.substr(0, forwardUrl.lastIndexOf(".jsp")+4) == url && url != ""){
		                		classTag = "on";
		                	}else{
		              			classTag = "";
		                	}
		                	
		                	return classTag;
					},
					insertItem: function(group){
						var strSelBox = "";
						//메뉴 설정
						if($("#navigation").length > 0 ){
							$("#navigation").remove();
						}else{
							leftMenu.comm.add(0, -1,'SAMPLE','','');
							strSelBox = "new";
						}
						if(group == "01_basic"){
							leftMenu.comm.add(1,  0, '기초' ,'','');
							leftMenu.comm.add(2,  0, '데이터조회' ,'','');
							leftMenu.comm.add(3,  0, '데이터저장' ,'','');
							leftMenu.comm.add(4,  1, '시트생성',							'fn_movePage("sheet/01_basic/intro", "createsheet")','/sheet/01_basic/intro/createsheet.jsp');
							leftMenu.comm.add(5,  1, '라이선스설명',						'fn_movePage("sheet/01_basic/intro", "license_desc")','/sheet/01_basic/intro/license_desc.jsp');
							leftMenu.comm.add(6,  2, '페이징조회',							'fn_movePage("sheet/01_basic/search", "client_paging")','/sheet/01_basic/search/client_paging.jsp');
							leftMenu.comm.add(7,  2, '레이지로드(default)',					'fn_movePage("sheet/01_basic/search", "lazyload")','/sheet/01_basic/search/lazyload.jsp');
							leftMenu.comm.add(8,  2, '서버페이징방식',						'fn_movePage("sheet/01_basic/search", "server_paging")','/sheet/01_basic/search/server_paging.jsp');
							leftMenu.comm.add(9,  2, '서버페이징방식2',						'fn_movePage("sheet/01_basic/search", "server_paging2")','/sheet/01_basic/search/server_paging2.jsp');
							leftMenu.comm.add(10, 2, '기타(스크롤)',						'fn_movePage("sheet/01_basic/search", "etc")','/sheet/01_basic/search/etc.jsp');
							leftMenu.comm.add(11, 3, '트랜잭션관리',						'fn_movePage("sheet/01_basic/save", "transaction")','/sheet/01_basic/save/transaction.jsp');
							leftMenu.comm.add(12, 3, '단일저장',							'fn_movePage("sheet/01_basic/save", "single_save")','/sheet/01_basic/save/single_save.jsp');
							leftMenu.comm.add(13, 3, '동시저장',							'fn_movePage("sheet/01_basic/save", "multi_save")','/sheet/01_basic/save/multi_save.jsp');
						}else if(group == "02_area"){
							leftMenu.comm.add(1, 0,'헤더영역' ,'','');
							leftMenu.comm.add(2, 0,'데이터영역' ,'','');
							leftMenu.comm.add(3, 0,'스크롤영역' ,'','');
							leftMenu.comm.add(4 ,1,'헤더기본기능',							'fn_movePage("sheet/02_area/header","header")','/sheet/02_area/header/header.jsp');
							leftMenu.comm.add(5, 1,'정렬(다중정렬)',						'fn_movePage("sheet/02_area/header","sort")','/sheet/02_area/header/sort.jsp');
							leftMenu.comm.add(6, 1,'헤더컨텍스트메뉴',						'fn_movePage("sheet/02_area/header","context_menu")','/sheet/02_area/header/context_menu.jsp');
							leftMenu.comm.add(7, 1,'너비 설정 가이드',						'fn_movePage("sheet/02_area/header","column_width")','/sheet/02_area/header/column_width.jsp');
							leftMenu.comm.add(8, 2,'값 가져오기',							'fn_movePage("sheet/02_area/data","getdata")','/sheet/02_area/data/getdata.jsp');
							leftMenu.comm.add(9, 2,'값 설정하기',							'fn_movePage("sheet/02_area/data","setdata")','/sheet/02_area/data/setdata.jsp');
							leftMenu.comm.add(10,2,'데이터 검색',							'fn_movePage("sheet/02_area/data","find")','/sheet/02_area/data/find.jsp');
							leftMenu.comm.add(11,2,'인덱스 추출',							'fn_movePage("sheet/02_area/data","index")','/sheet/02_area/data/index.jsp');
							leftMenu.comm.add(12,2,'틀고정',								'fn_movePage("sheet/02_area/data","frozen")','/sheet/02_area/data/frozen.jsp');
							leftMenu.comm.add(13,2,'행단위컨트롤',							'fn_movePage("sheet/02_area/data","row_unit")','/sheet/02_area/data/row_unit.jsp');
							leftMenu.comm.add(14,2,'열단위컨트롤',							'fn_movePage("sheet/02_area/data","col_unit")','/sheet/02_area/data/col_unit.jsp');
							leftMenu.comm.add(15,3,'지연스크롤설정',							'fn_movePage("sheet/02_area/scroll","deferred_scroll")','/sheet/02_area/scroll/deferred_scroll.jsp');
							leftMenu.comm.add(16,3,'스크롤바종류설정',						'fn_movePage("sheet/02_area/scroll","scroll_type")','/sheet/02_area/scroll/scroll_type.jsp');
						}else if(group == "03_colType"){
							leftMenu.comm.add(1, 0,'기본' ,'','');
							leftMenu.comm.add(2, 0,'콤보타입' ,'','');
							leftMenu.comm.add(3, 0,'날짜타입' ,'','');
							leftMenu.comm.add(3 ,1,'제공되는 컬럼타입',					'fn_movePage("sheet/03_colType/basic","column_type")','/sheet/03_colType/basic/column_type.jsp');
							leftMenu.comm.add(4 ,1,'컬럼타입별 지원속성',					'fn_movePage("sheet/03_colType/basic","column_attr")','/sheet/03_colType/basic/column_attr.jsp');
							leftMenu.comm.add(5, 2,'관계형 콤보',						'fn_movePage("sheet/03_colType/combo","relational_combo")','/sheet/03_colType/combo/relational_combo.jsp');
							leftMenu.comm.add(6, 3,'데이트피커연동',						'fn_movePage("sheet/03_colType/date","use_datepicker")','/sheet/03_colType/date/use_datepicker.jsp');
						}else if(group == "04_functions"){
							leftMenu.comm.add(1, 0,'주요기능' ,'','');
							leftMenu.comm.add(2, 0,'엑셀' ,'','');
			 				leftMenu.comm.add(3, 0,'기타기능' ,'','');
							leftMenu.comm.add(3, 1,'합계 및 소계',						'fn_movePage("sheet/04_functions/main","subtotal")','/sheet/04_functions/main/subtotal.jsp');
							leftMenu.comm.add(4, 1,'피벗',							'fn_movePage("sheet/04_functions/main","pivot")','/sheet/04_functions/main/pivot.jsp');
							leftMenu.comm.add(5, 1,'병합',							'fn_movePage("sheet/04_functions/main","merge")','/sheet/04_functions/main/merge.jsp');
							leftMenu.comm.add(6, 1,'필터링(기본)',						'fn_movePage("sheet/04_functions/main","filtering")','/sheet/04_functions/main/filtering.jsp');
							leftMenu.comm.add(7, 1,'필터링(단일입력)',					'fn_movePage("sheet/04_functions/main","filteringEx1")','/sheet/04_functions/main/filteringEx1.jsp');
							leftMenu.comm.add(8, 1,'그룹핑',							'fn_movePage("sheet/04_functions/main","grouping")','/sheet/04_functions/main/grouping.jsp');
							leftMenu.comm.add(9, 2,'단일 출력',						'fn_movePage("sheet/04_functions/excel","down2excel")','/sheet/04_functions/excel/down2excel.jsp');
							leftMenu.comm.add(10, 2,'두개의 시트를 한 파일에 출력',			'fn_movePage("sheet/04_functions/excel","multiexport")','/sheet/04_functions/excel/multiexport.jsp');
							// leftMenu.comm.add(11, 2,'템플릿 파일을 활용한 출력',				'fn_movePage("sheet/04_functions/excel","tempfile")','/sheet/04_functions/excel/tempfile.jsp');
							leftMenu.comm.add(12, 2,'엑셀 파일 로드',					'fn_movePage("sheet/04_functions/excel","loadexcel")','/sheet/04_functions/excel/loadexcel.jsp');
							leftMenu.comm.add(13, 3,'동적 컬럼',						'fn_movePage("sheet/04_functions/etc","dynamic_col")','/sheet/04_functions/etc/dynamic_col.jsp');
							leftMenu.comm.add(14, 3,'멀티라인레코드',					'fn_movePage("sheet/04_functions/etc","multiline_record")','/sheet/04_functions/etc/multiline_record.jsp');
							leftMenu.comm.add(15, 3,'Drag & Drop',					'fn_movePage("sheet/04_functions/etc","dragdrop")','/sheet/04_functions/etc/dragdrop.jsp');
							leftMenu.comm.add(16, 3,'자식그리드',						'fn_movePage("sheet/04_functions/etc","childgrid")','/sheet/04_functions/etc/childgrid.jsp');
						}/* else if(group == "05_style"){
							leftMenu.comm.add(1, 0,'기본' ,'','');
							leftMenu.comm.add(2, 0,'종류' ,'','');
							leftMenu.comm.add(3 ,1,'설정 방법',						'fn_movePage("sheet/SearchSave","calendar")','/sheet/SearchSave/calendar.do');
							leftMenu.comm.add(4 ,1,'한화면에 동시테마설정',				'fn_movePage("sheet/SearchSave","calendar")','/sheet/SearchSave/calendar.do');
							leftMenu.comm.add(5, 2,'기본제공테마(색상별)',				'fn_movePage("sheet/SearchSave","loadExcelValid")','/sheet/SearchSave/loadExcelValid.do');
							leftMenu.comm.add(6, 2,'모던 테마',						'fn_movePage("sheet/SearchSave","loadExcelValid")','/sheet/SearchSave/loadExcelValid.do');
							leftMenu.comm.add(7, 2,'그외 스타일 참고용',					'fn_movePage("sheet/SearchSave","loadExcelValid")','/sheet/SearchSave/loadExcelValid.do');
						 }*/else if(group == "06_event"){
							leftMenu.comm.add(1, 0,'기본' ,'','');
							leftMenu.comm.add(2, 0,'동작별' ,'','');
							leftMenu.comm.add(3, 0,'영역별' ,'','');
							leftMenu.comm.add(4, 0,'기능별' ,'','');
							leftMenu.comm.add(5, 0,'시점별' ,'','');
							leftMenu.comm.add(6, 0,'기타' ,'','');
							leftMenu.comm.add(7, 1,'기본',							'fn_movePage("sheet/06_event/basic","intro")','/sheet/06_event/basic/intro.jsp');
							leftMenu.comm.add(8, 1,'종류',							'fn_movePage("sheet/06_event/basic","event_type")','/sheet/06_event/basic/event_type.jsp');
							leftMenu.comm.add(9, 2,'마우스',							'fn_movePage("sheet/06_event/userAction","mouse")','/sheet/06_event/userAction/mouse.jsp');
							leftMenu.comm.add(10, 2,'키보드',							'fn_movePage("sheet/06_event/userAction","keyboard")','/sheet/06_event/userAction/keyboard.jsp');
							leftMenu.comm.add(11, 3,'헤더영역',							'fn_movePage("sheet/06_event/area","header")','/sheet/06_event/area/header.jsp');
							leftMenu.comm.add(12, 3,'데이터영역',						'fn_movePage("sheet/06_event/area","data")','/sheet/06_event/area/data.jsp');
							leftMenu.comm.add(13, 3,'스크롤영역',						'fn_movePage("sheet/06_event/area","scroll")','/sheet/06_event/area/scroll.jsp');
							leftMenu.comm.add(14, 4,'페이징',							'fn_movePage("sheet/06_event/functions","paging")','/sheet/06_event/functions/paging.jsp');
							leftMenu.comm.add(15, 4,'정렬',							'fn_movePage("sheet/06_event/functions","sort")','/sheet/06_event/functions/sort.jsp');
							leftMenu.comm.add(16, 4,'트리',							'fn_movePage("sheet/06_event/functions","tree")','/sheet/06_event/functions/tree.jsp');
							leftMenu.comm.add(17, 4,'그룹',							'fn_movePage("sheet/06_event/functions","grouping")','/sheet/06_event/functions/grouping.jsp');
							leftMenu.comm.add(18, 4,'필터',							'fn_movePage("sheet/06_event/functions","filtering")','/sheet/06_event/functions/filtering.jsp');
							leftMenu.comm.add(19, 5,'조회 완료 시점',					'fn_movePage("sheet/06_event/callback","searchend")','/sheet/06_event/callback/searchend.jsp');
							//leftMenu.comm.add(20, 5,'데이터 로딩 시점',					'fn_movePage("sheet/06_event/callback","dataloaded")','/sheet/06_event/callback/dataloaded.jsp');
							//leftMenu.comm.add(21, 5,'엑셀 로드 완료 시점',					'fn_movePage("sheet/06_event/callback","excelloaded")','/sheet/06_event/callback/excelloaded.jsp');
							leftMenu.comm.add(22, 6,'이벤트오버라이드',					'fn_movePage("sheet/06_event/etc","override")','/sheet/06_event/etc/override.jsp');
						}else if(group == "07_etc"){
							leftMenu.comm.add(1, 0,'코드제네레이터' ,'','');
							leftMenu.comm.add(2, 0,'성능개선관련' ,'','');
							leftMenu.comm.add(3 ,1,'위자드',							'fn_movePage("sheet/07_etc/generator","wizard")','/sheet/07_etc/generator/wizard.jsp');
							/* leftMenu.comm.add(4, 2,'건수별조회성능체크',					'fn_movePage("sheet/SearchSave","loadExcelValid")','/sheet/07_etc/performance/wizard.jsp'); */
							leftMenu.comm.add(5, 2,'RenderSheet',					'fn_movePage("sheet/07_etc/performance","rendersheet")','/sheet/07_etc/performance/rendersheet.jsp');
							leftMenu.comm.add(6, 2,'Fx모드 : 1',						'fn_movePage("sheet/07_etc/performance","fx_mode")','/sheet/07_etc/performance/fx_mode.jsp');
							leftMenu.comm.add(7, 2,'Fx모드 : 2',						'fn_movePage("sheet/07_etc/performance","fx_mode2")','/sheet/07_etc/performance/fx_mode2.jsp');
							leftMenu.comm.add(8, 2,'IBQueue',						'fn_movePage("sheet/07_etc/performance","ibque")','/sheet/07_etc/performance/ibque.jsp');
							leftMenu.comm.add(9, 2,'예약어(UseJsonAttribute)',		'fn_movePage("sheet/07_etc/performance","jsonattribute")','/sheet/07_etc/performance/jsonattribute.jsp');
						}
						
						leftMenu.comm.createLeftMenu(strSelBox);
						fncLeftMenuEventBind();
						$("#leftSelGroup").val(group);
					}
				};
			})().init();
		})(leftMenu);
	})();

// 		window.onload = function(){
// 			leftMenu.comm.insertItem($("#leftSelGroup").val());
// 		}
		
		$(document).ready(function() {
			var group = localStorage["forwardSelGroup"];
			if(location.pathname == "/"){
				localStorage.removeItem("forwardSelGroup");
			}
			if(group == undefined || group == "" || group == null){
				group = "01_basic";
			}
			leftMenu.comm.insertItem(group);
		});
		
	</script>

	<!-- 바디 : 좌측메뉴+업무 영역 (S) -->
	<div class="container">    
		<!-- 좌측메뉴 (S) -->
		<button type="button" class="btn-lnb-open ir" id="btnOpen">메뉴펼침/열기</button>
		<div id="leftMenu" class="lnbWrap">
			<button type="button" class="btn-lnb-fold ir" id="btnFold">메뉴펼침/열기</button>
			<div id="left_wrap" class="lnb">
				<div class="sheetLogo" onclick="fn_movePage('','')">
					<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="115.5px" height="22.583px" viewBox="0 0 115.5 22.583" enable-background="new 0 0 115.5 22.583" xml:space="preserve">
						<path fill="#fff" d="M3.803,20.128c0,1.036-0.549,1.556-1.735,1.556c-1.184,0-1.735-0.52-1.735-1.556V2.107
							c0-1.032,0.551-1.548,1.735-1.548c1.186,0,1.735,0.516,1.735,1.548V20.128z"></path>
						<path fill="#fff" d="M17.477,0.639c2.693,0,4.04,3.344,4.04,5.332c0,1.857-0.359,3.934-2.031,5.057
							c2.001,1.279,2.831,3.494,2.622,5.669c-0.285,2.989-1.556,4.987-5.168,4.987H9.319c-2.131,0-2.809-0.544-2.809-1.857V2.491
							c0-1.034,0.678-1.852,1.775-1.852H17.477z M9.996,8.107c1.853,0.069,4.686,0.707,6.356,1.305c0.123,0.045,0.635-0.316,0.745-0.394
							c0.231-0.171,0.441-0.37,0.618-0.604c0.346-0.45,0.542-1.06,0.586-1.645c0.061-0.861-0.25-2.003-0.842-2.603
							c-0.376-0.378-1.03-0.586-1.538-0.586L9.996,3.585V8.107z M9.956,18.547c0,0,3.538,0.027,3.795,0.027
							c0.423,0.003,1.513,0,1.937,0.006c0.94,0.012,1.641,0.003,2.469-0.546c0.258-0.17,0.492-0.432,0.609-0.739
							c0.131-0.344,0.172-0.72,0.172-1.092c0-1.548-1.162-2.679-2.315-3.359c-0.33-0.194-0.676-0.355-1.029-0.507
							c-1.269-0.549-3.236-0.889-4.59-1.073c-0.081-0.011-1.048-0.106-1.048-0.106V18.547z"></path>
						<path fill="#fff" d="M38.583,18.102c0,2.384-1.826,3.582-5.479,3.582h-7.207c-0.682,0-1.022-0.343-1.022-1.032
							c0-0.858,0.346-1.281,1.026-1.281h7.223c1.722,0,2.593-0.428,2.593-1.269v-0.476c0.005-0.756-0.782-1.14-2.354-1.14H31.01
							c-4.128,0-6.188-1.156-6.183-3.456v-0.682c0-1.521,1.041-2.504,3.116-2.928c0.419-0.095,1.035-0.166,1.843-0.214
							c0.802-0.053,5.936-0.016,7.157-0.016c0.69,0,1.036,0.436,1.036,1.307c0,0.678-0.354,1.019-1.036,1.019l-6.109-0.054
							c-1.036,0-1.659,0.008-1.871,0.036c-0.913,0.125-1.377,0.407-1.377,0.85v0.663c0,0.744,1.147,1.119,3.447,1.119h2.44
							c3.41,0,5.114,1.133,5.114,3.388L38.583,18.102z"></path>
						<path fill="#fff" d="M53.948,20.651c0,0.495-0.179,0.809-0.552,0.938c-0.105,0.069-0.507,0.095-1.194,0.095
							c-0.673,0-1.013-0.343-1.013-1.032l0.017-7.396c0-0.777-0.465-1.295-1.39-1.533c-0.607-0.118-1.385-0.182-2.316-0.182h-5.201
							l-0.022,9.111c0,0.689-0.34,1.032-1.02,1.032c-0.682,0-1.078-0.025-1.189-0.095c-0.372-0.129-0.547-0.442-0.547-0.938L39.469,5.328
							c0-0.502,0.192-0.818,0.557-0.943c0.136-0.048,0.537-0.08,1.184-0.08c0.685,0,1.025,0.34,1.025,1.023l0.066,3.906h4.553
							c2.2,0,3.749,0.18,4.642,0.523c1.646,0.6,2.473,1.749,2.466,3.461L53.948,20.651z"></path>
						<path fill="#fff" d="M70.302,15.623c-0.036,0.671-0.284,1.136-1.006,1.136c-1.069,0-2.138,0-3.207,0c-0.943,0-1.885,0-2.828,0
							c-1.288,0-1.895,0-3.181,0c-0.717,0-1.435,0-2.149,0c-0.004,0-0.027,0-0.027,0c0.015,0.601-0.07,1.222,0.252,1.755
							c0.49,0.809,1.784,0.761,2.591,0.796c1.819,0.075,2.958,0.057,4.778,0.059c0.527,0.002,1.054,0.002,1.582,0.002
							c0.674,0,1.35,0,2.026,0c0.679,0,0.992,0.356,0.992,1.213c0,0.691-0.648,1.101-1.331,1.101c-0.38,0-0.762,0-1.143-0.003
							c-0.656,0-1.313,0-1.968,0c-0.748,0-1.492-0.004-2.24-0.004c-0.652,0-0.623,0.001-1.271-0.005c-0.705-0.01-1.401-0.013-2.104-0.071
							c-1.055-0.087-2.158-0.241-3.114-0.725c-0.202-0.103-0.395-0.22-0.571-0.359c-1.021-0.8-1.324-2.014-1.324-3.087c0,0,0-4.33,0-4.333
							c0-0.667,0.222-1.419,0.618-1.95c0.48-0.638,1.205-1.056,1.938-1.344c1.056-0.415,2.172-0.613,3.304-0.67
							c1.018-0.048,1.354-0.059,2.373-0.053c1.638,0.016,3.388-0.002,4.914,0.692c1.017,0.461,1.854,1.208,2.02,2.354
							c0.126,0.876,0.073,1.741,0.073,2.621C70.301,15.028,70.319,15.33,70.302,15.623z M67.584,14.367v-1.542
							c0-0.945-1.384-1.41-5.133-1.41c-2.204,0-1.928,0.054-2.742,0.209c-1.165,0.218-1.899,0.929-1.899,1.564l0.005,1.179H67.584z"></path>
						<path fill="#fff" d="M94.317,11.522c0.688,0,1.034-0.341,1.034-1.019c0.004-0.858-0.345-1.284-1.034-1.284H92.16l0.012-2.474
							c0-0.489-0.192-0.794-0.565-0.93c-0.118-0.059-0.507-0.09-1.183-0.09c-0.682,0-1.021,0.336-1.021,1.02L89.398,9.22
							c-0.363,0-0.666,0.011-0.896,0.021c-0.23,0.013-0.394,0.028-0.488,0.045c-0.437,0.151-0.653,0.51-0.665,1.088
							c0.007,0.57,0.229,0.939,0.661,1.083c0.099,0.015,0.257,0.034,0.488,0.042c0.233,0.019,0.529,0.022,0.896,0.022l-0.027,6.095
							c0,0.098,0.013,0.178,0.027,0.263c0.07,0.412,0.094,0.792,0.274,1.18c0.158,0.344,0.386,0.657,0.638,0.946
							c0.972,1.11,2.433,1.53,3.855,1.647c0.457,0.033,0.93,0.042,1.387,0.008c1.325-0.104,1.23-2.306-0.085-2.306
							c-0.729,0-1.539,0.035-2.213-0.287c-0.795-0.378-1.112-1.226-1.112-2.046c-0.003-0.786,0.004-1.57,0.011-2.354
							c0.007-0.843-0.001-1.685,0.007-2.528c0-0.034,0.004-0.618,0.004-0.618H94.317z"></path>
						<path fill="#fff" d="M86.606,15.623c-0.038,0.671-0.288,1.136-1.008,1.136c-1.068,0-2.138,0-3.207,0c-0.942,0-1.886,0-2.827,0
							c-1.286,0-1.896,0-3.181,0c-0.718,0-1.433,0-2.149,0c-0.002,0-0.025,0-0.025,0c0.012,0.601-0.073,1.222,0.248,1.755
							c0.49,0.809,1.786,0.761,2.593,0.796c1.817,0.075,2.961,0.057,4.779,0.059c0.525,0.002,1.051,0.002,1.579,0.002
							c0.675,0,1.351,0,2.027,0s0.994,0.356,0.994,1.213c0,0.691-0.646,1.101-1.332,1.101c-0.381,0-0.763,0-1.144-0.003
							c-0.655,0-1.311,0-1.968,0c-0.744,0-1.492-0.004-2.24-0.004c-0.649,0-0.62,0.001-1.272-0.005c-0.701-0.01-1.4-0.013-2.102-0.071
							c-1.057-0.087-2.16-0.241-3.111-0.725c-0.205-0.103-0.397-0.22-0.574-0.359c-1.021-0.8-1.322-2.014-1.322-3.087c0,0,0-4.33,0-4.333
							c0-0.667,0.218-1.419,0.618-1.95c0.479-0.638,1.199-1.056,1.933-1.344c1.061-0.415,2.173-0.613,3.306-0.67
							c1.017-0.048,1.355-0.059,2.373-0.053c1.638,0.016,3.391-0.002,4.913,0.692c1.019,0.461,1.858,1.208,2.021,2.354
							c0.126,0.876,0.073,1.741,0.074,2.621C86.602,15.028,86.62,15.33,86.606,15.623z M83.885,14.367v-1.542
							c0-0.945-1.383-1.41-5.13-1.41c-2.205,0-1.929,0.054-2.744,0.209c-1.165,0.218-1.898,0.929-1.898,1.564l0.005,1.179H83.885z"></path>
						<polygon fill="#fff" points="99.075,0.552 115.007,0.552 104.587,21.695 99.445,21.695 108.121,4.918 100.85,4.918 "></polygon>
					</svg>
				</div>
			</div>
		</div>