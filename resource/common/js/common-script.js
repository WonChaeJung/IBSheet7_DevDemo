
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
                                    //?????????
                                    return this;
                                },
                                add: function() {
                                    var level = 0;
                                    if(arguments[1] < 0){ //0??????
                                        level = 0;
                                    }else if(arguments[1] == 0){ //1??????
                                        level = 1;
                                    }else{ //2??????
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
                                    //Header Select Box ?????? (????????????)
                                    if(str == "new"){
                                        // htmlTag = "<h3 style='text-align:center;padding-top:5px;'>"+jsonData[0]["title"]+"</h3>";
                                        htmlTag += "<div id='leftSelBox' style='height: 66px;vertical-align: middle;padding:10px 15px 15px 15px;'>";
                                        htmlTag += "<select id='leftSelGroup' onchange='javascript:leftMenu.comm.insertItem(this.value);'>";
                                        htmlTag += "<option value='01_basic'>????????????</option>";
                                        htmlTag += "<option value='02_area'>?????????</option>";
                                        htmlTag += "<option value='03_colType'>???????????????</option>";
                                        htmlTag += "<option value='04_functions'>?????????</option>";
                                        //htmlTag += "<option value='05_style'>?????????</option>";
                                        htmlTag += "<option value='06_event'>?????????</option>";
                                        htmlTag += "<option value='07_etc'>??????</option>";
                                        htmlTag += "</select>";
                                        htmlTag += "</div>";
                                    }else{
                                        htmlTag = "";
                                    }
                                    htmlTag += "<ul id='navigation' class='menu'>";
                                    
                                    //Child Node ??? ????????? ??????
                                    jsonData = leftMenu.comm.getChildNode(jsonData);
                                    
                                    // debugger;
                                    //parentId ??? 0?????? 
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
                                        // console.log(menu_li[i].classList.length, menu_li[i].classList[0], menu_li[i].classList[1]);
                                        //ch on ?????? ????????????
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
                                            //2??????
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
                                        //1?????? ????????????
                                        for(var j=0; j<jsonData.length; j++){
                                            //ID?????? ????????????ID?????? ????????? ?????? ??????
                                            if(!jsonData[j]["isUse"]){
                                                if(jsonData[j]["level"] == 1){
                                                    if(jsonData[i]["id"] == jsonData[j]["parentId"]){
                                                        //????????? ?????? ????????? ????????? ??????
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
                                        //2?????? ????????????
                                        for(var j=0; j<jsonData.length; j++){
                                            if(!jsonData[j]["isUse"]){
                                                if(jsonData[j]["level"] == 2){
                                                    if(jsonData[i]["id"] == jsonData[j]["parentId"]){
                                                        //console.log(jsonData[i]["id"],jsonData[j]["parentId"],beforeId);
                                                        if(jsonData[j]["parentId"] == beforeId){
                                                            //2?????? ?????? ??????
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
                                        
                                        // console.log(forwardUrl.substr(0, forwardUrl.lastIndexOf(".html")+5), url);

                                        if(forwardUrl.substr(0, forwardUrl.lastIndexOf(".html")+5) == url && url != ""){
                                            classTag = "on";
                                        }else{
                                            classTag = "";
                                        }
                                        
                                        return classTag;
                                },
                                insertItem: function(group){
                                    var strSelBox = "";
                                    //?????? ??????
                                    if($("#navigation").length > 0 ){
                                        $("#navigation").remove();
                                    }else{
                                        leftMenu.comm.add(0, -1,'SAMPLE','','');
                                        strSelBox = "new";
                                    }
                                    if(group == "01_basic"){
                                        leftMenu.comm.add(1,  0, '??????' ,'','');
                                        leftMenu.comm.add(2,  0, '???????????????' ,'','');
                                        leftMenu.comm.add(3,  0, '???????????????' ,'','');
                                        leftMenu.comm.add(4,  1, '????????????',							`fn_movePage("${basePath}/sheet/01_basic/intro", "createsheet")`, `${basePath}/sheet/01_basic/intro/createsheet.html`);
                                        leftMenu.comm.add(5,  1, '??????????????????',						`fn_movePage("${basePath}/sheet/01_basic/intro", "license_desc")`, `${basePath}/sheet/01_basic/intro/license_desc.html`);
                                        leftMenu.comm.add(6,  2, '???????????????',							`fn_movePage("${basePath}/sheet/01_basic/search", "client_paging")` ,`${basePath}/sheet/01_basic/search/client_paging.html`);
                                        leftMenu.comm.add(7,  2, '???????????????(default)',					`fn_movePage("${basePath}/sheet/01_basic/search", "lazyload")` ,`${basePath}/sheet/01_basic/search/lazyload.html`);
                                        // leftMenu.comm.add(8,  2, '?????????????????????',					`fn_movePage("${basePath}/sheet/01_basic/search", "server_paging")` ,`${basePath}/sheet/01_basic/search/server_paging.html`);
                                        // leftMenu.comm.add(9,  2, '?????????????????????2',					`fn_movePage("${basePath}/sheet/01_basic/search", "server_paging2")` ,`${basePath}/sheet/01_basic/search/server_paging2.html`);
                                        // leftMenu.comm.add(10, 2, '??????(?????????)',						`fn_movePage("${basePath}/sheet/01_basic/search", "etc")` ,`${basePath}/sheet/01_basic/search/etc.html`);
                                        leftMenu.comm.add(11, 3, '??????????????????',						`fn_movePage("${basePath}/sheet/01_basic/save", "transaction")` ,`${basePath}/sheet/01_basic/save/transaction.html`);
                                        leftMenu.comm.add(12, 3, '????????????',							`fn_movePage("${basePath}/sheet/01_basic/save", "single_save")` ,`${basePath}/sheet/01_basic/save/single_save.html`);
                                        leftMenu.comm.add(13, 3, '????????????',							`fn_movePage("${basePath}/sheet/01_basic/save", "multi_save")` ,`${basePath}/sheet/01_basic/save/multi_save.html`);
                                    }else if(group == "02_area"){
                                        leftMenu.comm.add(1, 0,'????????????' ,'','');
                                        leftMenu.comm.add(2, 0,'???????????????' ,'','');
                                        leftMenu.comm.add(3, 0,'???????????????' ,'','');
                                        leftMenu.comm.add(4 ,1,'??????????????????',							`fn_movePage("${basePath}/sheet/02_area/header","header")`,`${basePath}/sheet/02_area/header/header.html`);
                                        leftMenu.comm.add(5, 1,'??????(????????????)',						`fn_movePage("${basePath}/sheet/02_area/header","sort")`,`${basePath}/sheet/02_area/header/sort.html`);
                                        leftMenu.comm.add(6, 1,'????????????????????????',						`fn_movePage("${basePath}/sheet/02_area/header","context_menu")`,`${basePath}/sheet/02_area/header/context_menu.html`);
                                        leftMenu.comm.add(7, 1,'?????? ?????? ?????????',						`fn_movePage("${basePath}/sheet/02_area/header","column_width")`,`${basePath}/sheet/02_area/header/column_width.html`);
                                        leftMenu.comm.add(8, 2,'??? ????????????',							`fn_movePage("${basePath}/sheet/02_area/data","getdata")`,`${basePath}/sheet/02_area/data/getdata.html`);
                                        leftMenu.comm.add(9, 2,'??? ????????????',							`fn_movePage("${basePath}/sheet/02_area/data","setdata")`,`${basePath}/sheet/02_area/data/setdata.html`);
                                        leftMenu.comm.add(10,2,'????????? ??????',							`fn_movePage("${basePath}/sheet/02_area/data","find")`,`${basePath}/sheet/02_area/data/find.html`);
                                        leftMenu.comm.add(11,2,'????????? ??????',							`fn_movePage("${basePath}/sheet/02_area/data","index")`,`${basePath}/sheet/02_area/data/index.html`);
                                        leftMenu.comm.add(12,2,'?????????',								`fn_movePage("${basePath}/sheet/02_area/data","frozen")`,`${basePath}/sheet/02_area/data/frozen.html`);
                                        leftMenu.comm.add(13,2,'??????????????????',							`fn_movePage("${basePath}/sheet/02_area/data","row_unit")`,`${basePath}/sheet/02_area/data/row_unit.html`);
                                        leftMenu.comm.add(14,2,'??????????????????',							`fn_movePage("${basePath}/sheet/02_area/data","col_unit")`,`${basePath}/sheet/02_area/data/col_unit.html`);
                                        leftMenu.comm.add(15,3,'?????????????????????',						`fn_movePage("${basePath}/sheet/02_area/scroll","deferred_scroll")`,`${basePath}/sheet/02_area/scroll/deferred_scroll.html`);
                                        leftMenu.comm.add(16,3,'????????????????????????',						`fn_movePage("${basePath}/sheet/02_area/scroll","scroll_type")`,`${basePath}/sheet/02_area/scroll/scroll_type.html`);
                                    }else if(group == "03_colType"){
                                        leftMenu.comm.add(1, 0,'??????' ,'','');
                                        leftMenu.comm.add(2, 0,'????????????' ,'','');
                                        leftMenu.comm.add(3, 0,'????????????' ,'','');
                                        leftMenu.comm.add(3 ,1,'???????????? ????????????',					`fn_movePage("${basePath}/sheet/03_colType/basic","column_type")`,`${basePath}/sheet/03_colType/basic/column_type.html`);
                                        leftMenu.comm.add(4 ,1,'??????????????? ????????????',				`fn_movePage("${basePath}/sheet/03_colType/basic","column_attr")`,`${basePath}/sheet/03_colType/basic/column_attr.html`);
                                        leftMenu.comm.add(5, 2,'????????? ??????',						`fn_movePage("${basePath}/sheet/03_colType/combo","relational_combo")`,`${basePath}/sheet/03_colType/combo/relational_combo.html`);
                                        leftMenu.comm.add(6, 3,'?????????????????????',					`fn_movePage("${basePath}/sheet/03_colType/date","use_datepicker")`,`${basePath}/sheet/03_colType/date/use_datepicker.html`);
                                    }else if(group == "04_functions"){
                                        leftMenu.comm.add(1, 0,'????????????' ,'','');
                                        leftMenu.comm.add(2, 0,'??????' ,'','');
                                        leftMenu.comm.add(3, 0,'????????????' ,'','');
                                        leftMenu.comm.add(3, 1,'?????? ??? ??????',						`fn_movePage("${basePath}/sheet/04_functions/main","subtotal")`,`${basePath}/sheet/04_functions/main/subtotal.html`);
                                        leftMenu.comm.add(4, 1,'??????',							    `fn_movePage("${basePath}/sheet/04_functions/main","pivot")`,`${basePath}/sheet/04_functions/main/pivot.html`);
                                        leftMenu.comm.add(5, 1,'??????',							    `fn_movePage("${basePath}/sheet/04_functions/main","merge")`,`${basePath}/sheet/04_functions/main/merge.html`);
                                        leftMenu.comm.add(6, 1,'?????????(??????)',						`fn_movePage("${basePath}/sheet/04_functions/main","filtering")`,`${basePath}/sheet/04_functions/main/filtering.html`);
                                        leftMenu.comm.add(7, 1,'?????????(????????????)',					`fn_movePage("${basePath}/sheet/04_functions/main","filteringEx1")`,`${basePath}/sheet/04_functions/main/filteringEx1.html`);
                                        leftMenu.comm.add(8, 1,'?????????',							`fn_movePage("${basePath}/sheet/04_functions/main","grouping")`,`${basePath}/sheet/04_functions/main/grouping.html`);
                                        leftMenu.comm.add(9, 2,'?????? ??????',						    `fn_movePage("${basePath}/sheet/04_functions/excel","down2excel")`,`${basePath}/sheet/04_functions/excel/down2excel.html`);
                                        leftMenu.comm.add(10, 2,'????????? ????????? ??? ????????? ??????',		`fn_movePage("${basePath}/sheet/04_functions/excel","multiexport")`,`${basePath}/sheet/04_functions/excel/multiexport.html`);
                                        // leftMenu.comm.add(11, 2,'????????? ????????? ????????? ??????',		`fn_movePage("${basePath}/sheet/04_functions/excel","tempfile")`,`${basePath}/sheet/04_functions/excel/tempfile.html`);
                                        leftMenu.comm.add(12, 2,'?????? ?????? ??????',					`fn_movePage("${basePath}/sheet/04_functions/excel","loadexcel")`,`${basePath}/sheet/04_functions/excel/loadexcel.html`);
                                        leftMenu.comm.add(13, 3,'?????? ??????',						`fn_movePage("${basePath}/sheet/04_functions/etc","dynamic_col")`,`${basePath}/sheet/04_functions/etc/dynamic_col.html`);
                                        leftMenu.comm.add(14, 3,'?????????????????????',					`fn_movePage("${basePath}/sheet/04_functions/etc","multiline_record")`,`${basePath}/sheet/04_functions/etc/multiline_record.html`);
                                        leftMenu.comm.add(15, 3,'Drag & Drop',					    `fn_movePage("${basePath}/sheet/04_functions/etc","dragdrop")`,`${basePath}/sheet/04_functions/etc/dragdrop.html`);
                                        leftMenu.comm.add(16, 3,'???????????????',						`fn_movePage("${basePath}/sheet/04_functions/etc","childgrid")`,`${basePath}/sheet/04_functions/etc/childgrid.html`);
                                    }/* else if(group == "05_style"){
                                        leftMenu.comm.add(1, 0,'??????' ,'','');
                                        leftMenu.comm.add(2, 0,'??????' ,'','');
                                        leftMenu.comm.add(3 ,1,'?????? ??????',						      'fn_movePage("sheet/SearchSave","calendar")','/sheet/SearchSave/calendar.do');
                                        leftMenu.comm.add(4 ,1,'???????????? ??????????????????',				    'fn_movePage("sheet/SearchSave","calendar")','/sheet/SearchSave/calendar.do');
                                        leftMenu.comm.add(5, 2,'??????????????????(?????????)',			    	'fn_movePage("sheet/SearchSave","loadExcelValid")','/sheet/SearchSave/loadExcelValid.do');
                                        leftMenu.comm.add(6, 2,'?????? ??????',						        'fn_movePage("sheet/SearchSave","loadExcelValid")','/sheet/SearchSave/loadExcelValid.do');
                                        leftMenu.comm.add(7, 2,'?????? ????????? ?????????',					'fn_movePage("sheet/SearchSave","loadExcelValid")','/sheet/SearchSave/loadExcelValid.do');
                                    }*/else if(group == "06_event"){
                                        leftMenu.comm.add(1, 0,'??????' ,'','');
                                        leftMenu.comm.add(2, 0,'?????????' ,'','');
                                        leftMenu.comm.add(3, 0,'?????????' ,'','');
                                        leftMenu.comm.add(4, 0,'?????????' ,'','');
                                        leftMenu.comm.add(5, 0,'?????????' ,'','');
                                        leftMenu.comm.add(6, 0,'??????' ,'','');
                                        leftMenu.comm.add(7, 1,'??????',							`fn_movePage("${basePath}/sheet/06_event/basic","intro")`,`${basePath}/sheet/06_event/basic/intro.html`);
                                        leftMenu.comm.add(8, 1,'??????',							`fn_movePage("${basePath}/sheet/06_event/basic","event_type")`,`${basePath}/sheet/06_event/basic/event_type.html`);
                                        leftMenu.comm.add(9, 2,'?????????',						`fn_movePage("${basePath}/sheet/06_event/userAction","mouse")`,`${basePath}/sheet/06_event/userAction/mouse.html`);
                                        leftMenu.comm.add(10, 2,'?????????',						`fn_movePage("${basePath}/sheet/06_event/userAction","keyboard")`,`${basePath}/sheet/06_event/userAction/keyboard.html`);
                                        leftMenu.comm.add(11, 3,'????????????',						`fn_movePage("${basePath}/sheet/06_event/area","header")`,`${basePath}/sheet/06_event/area/header.html`);
                                        leftMenu.comm.add(12, 3,'???????????????',					`fn_movePage("${basePath}/sheet/06_event/area","data")`,`${basePath}/sheet/06_event/area/data.html`);
                                        leftMenu.comm.add(13, 3,'???????????????',					`fn_movePage("${basePath}/sheet/06_event/area","scroll")`,`${basePath}/sheet/06_event/area/scroll.html`);
                                        leftMenu.comm.add(14, 4,'?????????',						`fn_movePage("${basePath}/sheet/06_event/functions","paging")`,`${basePath}/sheet/06_event/functions/paging.html`);
                                        leftMenu.comm.add(15, 4,'??????',							`fn_movePage("${basePath}/sheet/06_event/functions","sort")`,`${basePath}/sheet/06_event/functions/sort.html`);
                                        leftMenu.comm.add(16, 4,'??????',							`fn_movePage("${basePath}/sheet/06_event/functions","tree")`,`${basePath}/sheet/06_event/functions/tree.html`);
                                        leftMenu.comm.add(17, 4,'??????',							`fn_movePage("${basePath}/sheet/06_event/functions","grouping")`,`${basePath}/sheet/06_event/functions/grouping.html`);
                                        leftMenu.comm.add(18, 4,'??????',							`fn_movePage("${basePath}/sheet/06_event/functions","filtering")`,`${basePath}/sheet/06_event/functions/filtering.html`);
                                        leftMenu.comm.add(19, 5,'?????? ?????? ??????',				`fn_movePage("${basePath}/sheet/06_event/callback","searchend")`,`${basePath}/sheet/06_event/callback/searchend.html`);
                                        //leftMenu.comm.add(20, 5,'????????? ?????? ??????',			`fn_movePage("${basePath}/sheet/06_event/callback","dataloaded")`,`${basePath}/sheet/06_event/callback/dataloaded.html`);
                                        //leftMenu.comm.add(21, 5,'?????? ?????? ?????? ??????',		`fn_movePage("${basePath}/sheet/06_event/callback","excelloaded")`,`${basePath}/sheet/06_event/callback/excelloaded.html`);
                                        leftMenu.comm.add(22, 6,'????????????????????????',				`fn_movePage("${basePath}/sheet/06_event/etc","override")`,`${basePath}/sheet/06_event/etc/override.html`);
                                    }else if(group == "07_etc"){
                                        leftMenu.comm.add(1, 0,'?????????????????????' ,'','');
                                        leftMenu.comm.add(2, 0,'??????????????????' ,'','');
                                        leftMenu.comm.add(3 ,1,'?????????',						`fn_movePage("${basePath}/sheet/07_etc/generator","wizard")`,`${basePath}/sheet/07_etc/generator/wizard.html`);
                                        /* leftMenu.comm.add(4, 2,'???????????????????????????',			`fn_movePage("${basePath}/sheet/SearchSave","loadExcelValid")`,`${basePath}/sheet/07_etc/performance/wizard.html`); */
                                        leftMenu.comm.add(5, 2,'RenderSheet',					`fn_movePage("${basePath}/sheet/07_etc/performance","rendersheet")`,`${basePath}/sheet/07_etc/performance/rendersheet.html`);
                                        leftMenu.comm.add(6, 2,'Fx?????? : 1',					`fn_movePage("${basePath}/sheet/07_etc/performance","fx_mode")`,`${basePath}/sheet/07_etc/performance/fx_mode.html`);
                                        leftMenu.comm.add(7, 2,'Fx?????? : 2',					`fn_movePage("${basePath}/sheet/07_etc/performance","fx_mode2")`,`${basePath}/sheet/07_etc/performance/fx_mode2.html`);
                                        leftMenu.comm.add(8, 2,'IBQueue',						`fn_movePage("${basePath}/sheet/07_etc/performance","ibque")`,`${basePath}/sheet/07_etc/performance/ibque.html`);
                                        leftMenu.comm.add(9, 2,'?????????(UseJsonAttribute)',		`fn_movePage("${basePath}/sheet/07_etc/performance","jsonattribute")`,`${basePath}/sheet/07_etc/performance/jsonattribute.html`);
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


                    // sidebar scroll
                    (function(){
                        isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
                        //if (isWindows && !$('body').hasClass('sidebar-mini')){
                            // $('.sidebar .sidebar-wrapper').perfectScrollbar();
                            // $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar({wheelPropagation: 1});
                            // $('html').addClass('perfect-scrollbar-on');
                        //} else {
                            // $('html').addClass('perfect-scrollbar-off');
                        //}
                    })();

                    // source view
                    $("#footerCodeView").click(function(){
                        initModal("CodeView");
                        initEdit("_CodeView");
                    })
                    
                    $("#footerDataView").click(function(){
                        initModal("DataView");
                        initEdit("_DataView");
                    })

                    $("p.copyright").prepend(new Date().getFullYear());
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




