
const basePath = '/IBSheet7_DevDemo';

document.write(`<link rel="stylesheet" type="text/css" href="${basePath}/resource/common/css/ui.common.css"/>`);
document.write(`<link rel="stylesheet" type="text/css" href="${basePath}/resource/common/css/sub.css"/>`);
document.write(`<link rel="stylesheet" type="text/css" href="${basePath}/resource/common/plugin/bootstrap/bootstrap.min.css" />`);
document.write(`<link rel="stylesheet" type="text/css" href="${basePath}/resource/common/jquery/jquery-ui/jquery-ui.min.css" />`);
document.write(`<link rel="stylesheet" type="text/css" href="${basePath}/resource/common/IBSheet7/tab/css/font-awesome.min.css" />`);
document.write(`<link rel="stylesheet" type="text/css" href="${basePath}/resource/common/IBSheet7/tab/css/ibtab-style.css" />`);
document.write(`<link rel="stylesheet" type="text/css" href="${basePath}/resource/common/css/font-awesome/font-awesome.min.css" />`);
document.write(`<link rel="shortcut icon" href="${basePath}/favicon.ico" />`);
document.write(`<script src="${basePath}/resource/common/jquery/js/jquery.1.12.4.js"></script>`);
document.write(`<script src="${basePath}/resource/common/jquery/jquery-ui/jquery-ui.min.js"></script>`);
document.write(`<script src="${basePath}/resource/common/jquery/js/jquery.blockUI.js"></script>`);
document.write(`<script src="${basePath}/resource/common/js/ui-common.js"></script>`);
document.write(`<script src="${basePath}/resource/common/js/json2.js"></script>`);
document.write(`<script src="${basePath}/resource/common/js/message.js"></script>`);
document.write(`<script src="${basePath}/resource/common/js/ib.util.js"></script>`);
document.write(`<script src="${basePath}/resource/common/js/ib.common.js"></script>`);
document.write(`<script src="${basePath}/resource/common/js/code_highlight.js"></script>`);
document.write(`<script src="${basePath}/resource/common/IBSheet7/sheet/js/ibsheet_config.js"></script>`);
document.write(`<script src="${basePath}/resource/common/IBSheet7/sheet/js/ibsheet.js"></script>`);
document.write(`<script src="${basePath}/resource/common/IBSheet7/sheet/js/ibsheetinfo.js"></script>`);
document.write(`<script src="${basePath}/resource/common/IBSheet7/sheet/js/ibexcel.js"></script>`);
document.write(`<script src="${basePath}/resource/common/plugin/ace-editor/src-noconflict/ace.js"></script>`);
document.write(`<script src="${basePath}/resource/common/plugin/bootstrap/bootstrap-notify.js"></script>`);
document.write(`<script src="${basePath}/resource/common/plugin/bootstrap/bootstrap.min.js"></script>`);
document.write(`<script type="text/javascript" charset="utf-8" src="${basePath}/resource/common/IBSheet7/sheet/js/ibleaders.js"></script>`);

	
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
        // var base_path = "${pageContext.request.contextPath}/";

        var base_path = "";
        // var url = base_path + product + "/" + page+".html";
        var url =  product + "/" + page + ".html";
        
        localStorage["forwardSelGroup"] = $("#leftSelGroup").val();
        location.href=url;
    }
}

var leftMenu = leftMenu || {};
var LMJsonData = LMJsonData || [];
var htmlTag = "", forwardUrl = "";

window.addEventListener('load', function() {

    var allElements = document.getElementsByTagName('*');

    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // el.outerHTML = this.responseText;
                    el.innerHTML = this.responseText;

                    // LeftMenu
                    if(includePath.indexOf('leftMenu') != -1){
                        leftMenu.comm = (function() {
                            return {
                                init: function() {
                                    //초기화
                                    return this;
                                },
                                add: function() {
                                    var level = 0;
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
                                    
                                    // debugger;
                                    //parentId 가 0이면 
                                    for(var i=0; i<jsonData.length; i++){
                                        jsonData = leftMenu.comm.getLeftMenuTag(jsonData);
                                    }
                                    htmlTag += "</ul>";
                                    // console.log(htmlTag);
                                    leftMenu.comm.HtmlTag = htmlTag;
                                    //document.write(htmlTag);
                                    $("#left_wrap").append(htmlTag);
    
                                    var menu_li = document.querySelectorAll('#navigation')[0].querySelectorAll('li');
                                    
                                    for( var i=0; i < menu_li.length; i++){
                                        console.log(menu_li[i].classList.length, menu_li[i].classList[0], menu_li[i].classList[1]);
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
                                        
                                        console.log(forwardUrl.substr(0, forwardUrl.lastIndexOf(".html")+5), url);

                                        if(forwardUrl.substr(0, forwardUrl.lastIndexOf(".html")+5) == url && url != ""){
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
                                        leftMenu.comm.add(4,  1, '시트생성',							`fn_movePage("${basePath}/sheet/01_basic/intro", "createsheet")`, `${basePath}/sheet/01_basic/intro/createsheet.html`);
                                        leftMenu.comm.add(5,  1, '라이선스설명',						`fn_movePage("${basePath}/sheet/01_basic/intro", "license_desc")`, `${basePath}/sheet/01_basic/intro/license_desc.html`);
                                        leftMenu.comm.add(6,  2, '페이징조회',							`fn_movePage("${basePath}/sheet/01_basic/search", "client_paging")` ,`${basePath}/sheet/01_basic/search/client_paging.html`);
                                        leftMenu.comm.add(7,  2, '레이지로드(default)',					`fn_movePage("${basePath}/sheet/01_basic/search", "lazyload")` ,`${basePath}/sheet/01_basic/search/lazyload.html`);
                                        // leftMenu.comm.add(8,  2, '서버페이징방식',						`fn_movePage("${basePath}/sheet/01_basic/search", "server_paging")` ,`${basePath}/sheet/01_basic/search/server_paging.html`);
                                        // leftMenu.comm.add(9,  2, '서버페이징방식2',						`fn_movePage("${basePath}/sheet/01_basic/search", "server_paging2")` ,`${basePath}/sheet/01_basic/search/server_paging2.html`);
                                        // leftMenu.comm.add(10, 2, '기타(스크롤)',						`fn_movePage("${basePath}/sheet/01_basic/search", "etc")` ,`${basePath}/sheet/01_basic/search/etc.html`);
                                        leftMenu.comm.add(11, 3, '트랜잭션관리',						`fn_movePage("${basePath}/sheet/01_basic/save", "transaction")` ,`${basePath}/sheet/01_basic/save/transaction.html`);
                                        leftMenu.comm.add(12, 3, '단일저장',							`fn_movePage("${basePath}/sheet/01_basic/save", "single_save")` ,`${basePath}/sheet/01_basic/save/single_save.html`);
                                        leftMenu.comm.add(13, 3, '동시저장',							`fn_movePage("${basePath}/sheet/01_basic/save", "multi_save")` ,`${basePath}/sheet/01_basic/save/multi_save.html`);
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
    
                        var group = localStorage["forwardSelGroup"];
                        if(location.pathname == "/"){
                            localStorage.removeItem("forwardSelGroup");
                        }
                        if(group == undefined || group == "" || group == null){
                            group = "01_basic";
                        }
                        leftMenu.comm.insertItem(group);
                    }
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });



    
});

try{
	top.D_$_ = null
}catch(e){
	console.log(e);
};


function detectmob() {
	var userAgent = navigator.userAgent; 
	if(userAgent.match(/Android/i) || userAgent.match(/webOS/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPad/i) ||
		userAgent.match(/iPod/i) || userAgent.match(/BlackBerry/i) || userAgent.match(/Windows Phone/i)){
		return true;
	}else {
		return false;
	}
}

function fetchChrome76(sheetNodeId){
    for(var node = document.getElementById(sheetNodeId); node && node.tagName!="BODY" ; node = node.parentNode){
           if(node.style.clear){
               node.style.clear = "none";
               node.className = node.className + " clsBoth";
               var cssTemplateString = '.clsBoth:after{clear: both}';
               var styleTag = document.createElement("style");
               styleTag.innerHTML = cssTemplateString;
               document.head.insertAdjacentElement('beforeend', styleTag);
               break;
          }else{
          var clsName = node.className;
                if(clsName != ""){
                   clsArr = clsName.split(" ");
                   for(var i=0;i<clsArr.length;i++){
                       var cs = getComputedStyle(node,clsArr[i]);
                       if(cs.getPropertyValue("clear") == "both"){
                           node.style.clear = "none";
                           var cssTemplateString = '.'+clsArr[i]+':after{clear: both}';
                           var styleTag = document.createElement("style");
                           styleTag.innerHTML = cssTemplateString;
                           document.head.insertAdjacentElement('beforeend', styleTag);
                            
                            var emptydiv = document.createElement("div");
                            emptydiv.style.clear = "both";
                            node.before(emptydiv);
                           break;
                       }
                   }
                   if(styleTag) break;
                }
          }
    }
}




