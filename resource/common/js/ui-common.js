// Global Functions(전역 함수)

//popup position 조정
function popupPosi(popup){	
	$(popup).each(function(){
		$(this).css({
			marginLeft:-$(this).outerWidth()/2,
			marginTop:-$(this).outerHeight()/2
			//maxHeight: $('body').height()*0.8
		});
	});
}

// popup Call 함수 
function popupCall(popup){
   $('#'+popup)
      .css({
         marginLeft:-$('#'+popup).outerWidth()/2,
         marginTop:-$('#'+popup).outerHeight()/2
         //maxHeight: $('body').height()*0.8
      }).fadeIn(150);

	 // 팝업 위치 재조정
	 popupPosi('#'+popup);

   $('.popup-mask:eq(0)').show();
}

// popup Close 함수 
function popupClose(){
	$('.popup-wrap:visible').last().fadeOut(100);
	$('.popup-mask:eq(0)').hide();
}

function panelLayerResize(){
	var pMain = $(".area-panel");
	for(var i=0;i<pMain.length;i++){
		var pCh  = pMain.eq(i).find(".panel-ch"),
			pCnt = 100 / (pCh.length);
		pCh.css({"width":pCnt+"%"});
	}
	
	//시트 높이 설정
	sheetAutoHeight();
}

function sheetAutoHeight(){
	$("[class*=sheetSec]").each(function(){
		
		var leftMenuHeight = parent.$("#leftMenu").height();
		
		//iframe 안에 iframe 안에 더 있다면
		if(leftMenuHeight == null){
			leftMenuHeight = parent.parent.$("#leftMenu").height() - 80;
		}
		
		var sHeight = leftMenuHeight - $(".wrap-mainheader").height();

		if($(".area-search").length > 0){
			sHeight -= $(".area-search").height();
		}
		
		if($(".area-desc").length > 0){
			sHeight -= $(".area-desc").height();
		}
		
		if($(".area-form").length > 0){
			sHeight -= $(".area-form").height();
		}

		if($(".area-subtitle").length > 0){
			sHeight -= $(".area-subtitle").height();
		}
		
		sHeight -= 135;
		
	    $(this).css("height", sHeight+"px");
	    
	});
}

// Dom Content Loaded 이전 실행(가장 빠른 실행 시점)
var fncLeftMenuEventBind = function(){
	//popup mask 생성
	var screenSize = $(window).width();
	$('.workarea').css({width:screenSize-206+'px'});
	$('body').append('<span class="popup-mask"></span>');

	var fileTarget = $('.filebox .upload-hidden');
	
	fileTarget.on('change', function(){  // 값이 변경되면
	  if(window.FileReader){  // modern browser
	    var filename = $(this)[0].files[0].name;
	  } 
	  else {  // old IE
	    var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
	  }
	    
	  // 추출한 파일명 삽입
	  $(this).siblings('.upload-name').val(filename);
	});

		
	/************************ LNB 3dep ***********************/
	$('.menu li').has('ul').addClass('menu-3');
	$('.menu li li').has('ul').addClass('menu-4').removeClass('menu-3');

	// 최초로딩시 현재 업무화면에 해당하는 3dep open class adding
	$('.menu .now').closest('.menu-3').addClass('now open');
	var dep3H = 0;
	var $threeDep = $('.menu .now.open').children('ul');
	$threeDep.children('li').each(function(){
		dep3H += $(this).outerHeight();
	});
	// 15 = paddingBtm
	$threeDep.css('height',dep3H);


	$('.menu-3 > a').on('click',function(e){
		e.preventDefault();		
		$this = $(this);
		$twoDep = $(this).parent();
		$threeDep = $(this).next('ul');
		
		$('.menu-4').removeClass('now open');
		var _menu4 = $('.menu-4').find("ul");
		_menu4.css("height","0px");

		if ( $twoDep.hasClass('open') ) {
			$twoDep.removeClass('now open');
			$threeDep.css('height',0);
		} else {
			var dep3H = 0;
			$threeDep.children('li').each(function(){
				dep3H += $(this).outerHeight();
			});
			$twoDep.addClass('now open').siblings().removeClass('now open').children('ul').attr('style','height:0');
			// 15 = paddingBtm
			$threeDep.css('height',dep3H);
		}
	});
	
	// LNB 접기 버튼 클릭 시 처리
	$('#btnFold').on('click',function(){
		var screenSize = $(window).width();

		if(screenSize < 1020) {
			var fixSize = 1020;
			$('.workarea').css({width:fixSize-16+'px'});
			$('.ui-tabs-nav').css({width:fixSize-16+'px'});
			$('.wrap-mainheader').css({width:fixSize-16+'px'});
			$('.wrap-maincontents').css({width:fixSize-16+'px'});
		} else {
			$('.workarea').css({width:screenSize-16+'px'});
			$('.ui-tabs-nav').css({width:screenSize-16+'px'});
			$('.wrap-mainheader').css({width:screenSize-16+'px'});
			$('.wrap-maincontents').css({width:screenSize-16+'px'});
		}		
		$('.lnbWrap').addClass('fold');
		$('.workarea').addClass('fold', function() {
			$('#btnOpen').addClass('show');
		});
		$('.lnb').addClass('fold');
	});

	// LNB 열기 버튼 클릭 시 처리
	$('#btnOpen').on('click',function(){		
		var screenSize = $(window).width();

		if(screenSize < 1020) {
			var fixSize = 1020;
			$('.workarea').css({width:fixSize-16+'px'});
			$('.ui-tabs-nav').css({width:fixSize-16+'px'});
			$('.wrap-mainheader').css({width:fixSize-16+'px'});
			$('.wrap-maincontents').css({width:fixSize-16+'px'});
		} else {
			$('.workarea').css({width:screenSize-206+'px'});
			$('.ui-tabs-nav').css({width:screenSize-206+'px'});
			$('.wrap-mainheader').css({width:screenSize-206+'px'});
			$('.wrap-maincontents').css({width:screenSize-206+'px'});
		}
		$('#btnOpen').removeClass('show');
		$('.lnbWrap').removeClass('fold');
		$('.lnbWrap,.workarea').removeClass('fold');
		$('.lnb').removeClass('fold');
	});
}

//WINDOW RESIZE
$(window).on({
	load: function() {		
		// popup Close
		$('.pop-close').each(function(){
			$(this).on('click',function(){
				$(this).closest('.popup-wrap.layer').fadeOut(100);
				$('.popup-mask:eq(0)').hide();
				
			});
		});
	},	
	
	resize: function(){
		var screenSize = $(window).width(),
			foldChk = $('.lnbWrap').hasClass('fold');
			//console.log(screenSize);

		if (foldChk) {
			var fixedSize = screenSize;
			if (screenSize < 1020) {fixedSize = 1020;}			
			$('.workarea').css({width:fixedSize+'px'});
			$('.ui-tabs-nav').css({width:fixedSize+'px'});
			$('.wrap-mainheader').css({width:fixedSize+'px'});
			$('.wrap-maincontents').css({width:fixedSize+'px'});
		}

		if (screenSize < 1020) {			
			fixSize = 1020;
			$('.container').css({width:fixSize+'px'});
			$('.workarea').css({width:fixSize+'px'});
			$('.ui-tabs-nav').css({width:fixSize+'px'});
			$('.wrap-mainheader').css({width:fixSize+'px'});
			$('.wrap-maincontents').css({width:fixSize+'px'});
			panelLayerResize(); // 패널 리사이즈 호출
		} else {
			if (foldChk) { 
				$('.workarea').css({width:screenSize-16+'px'});
				$('.ui-tabs-nav').css({width:screenSize-16+'px'});
				$('.wrap-mainheader').css({width:screenSize-16+'px'});
				$('.wrap-maincontents').css({width:screenSize-16+'px'});
			} else {
				$('.workarea').css({width:screenSize-206+'px'});
				$('.ui-tabs-nav').css({width:screenSize-206+'px'});
				$('.wrap-mainheader').css({width:screenSize-206+'px'});
				$('.wrap-maincontents').css({width:screenSize-206+'px'});
			}			
			panelLayerResize(); // 패널 리사이즈 호출
		}
		popupPosi('.popup-wrap.layer:visible');
	}
});

/*17-08-09 ADD JS*/
$(document).ready(function(){	
	var rv = -1, startX, startY, startWidth, startHeight;

	var screenSize = $(window).width();

	if(screenSize < 1020) {
		var fixSize = 1020;
		$('.workarea').css({width:fixSize-16+'px'});
		$('.ui-tabs-nav').css({width:fixSize-16+'px'});
		$('.wrap-mainheader').css({width:fixSize-16+'px'});
		$('.wrap-maincontents').css({width:fixSize-16+'px'});
	}

	//IE 9 버전 및 이하버전 체크
	if (navigator.appName == 'Microsoft Internet Explorer') {        
		var ua = navigator.userAgent;        
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
		if (re.exec(ua) != null){     
			rv = parseFloat(RegExp.$1);    
		}
	}    
	if(rv !== -1 && rv <= 9){
		$(".wrap-maincontents .serTbl .upper .upBtn").css("cursor","pointer");
		var p = document.querySelectorAll('.upBtn');
		$('.area-panel').css({'display':'inline-block'});
		$('.panel-ch').css({'float':'left'});

		$(p).on("click",function(){
			var _ele = $(this).parent().parent();
			_ele.hasClass("off") ? _ele.removeClass("off"):_ele.addClass("off");
		});
	}else{
		var p = document.querySelectorAll('.upBtn');
		
		if(p.length >0){
			var events = $._data($(p)[0], "events");
			$(p).mousedown(function(e){
				initDrag(e, this);
			});
			$(p).click(function(e) {
				var toggleArea = $(this).parent().parent(),
					searchCondition = $(this).parent().parent().find('table');
					if(toggleArea.css("height") == "15px") {
						toggleArea.css({"height":searchCondition.outerHeight(true)+"px"});
					} else {
						toggleArea.css({"height":"15px"});
					}
					
					//시트 높이 설정
					sheetAutoHeight();
					
			});
		}

	}


	//menu 3Depth 설정
	$('.menu-4 > a').on('click',function(e){
		e.preventDefault();	
		$this = $(this);
		$twDep = $(this).parent().parent();
		$thDep = $(this).parent();
		$fDep = $(this).next('ul');

		if ( $thDep.hasClass('open') ) {
			$thDep.removeClass('now open');
			$fDep.css('height',0);
			$twDep.css("height", $twDep.data("height"));
		} else {
			var _h = $(".menu-4.now.open").children("ul").outerHeight() == null ? 0:$(".menu-4.now.open").children("ul").outerHeight();
			$thDep.addClass('now open').siblings().removeClass('now open').children('ul').attr('style','height:0');
			var dep4H = 0;
			$fDep.children('li').each(function(){
				dep4H += $(this).outerHeight();
			});
			if(!$twDep.data("height")){
				$twDep.attr("data-height",$twDep.outerHeight());
			}
			$fDep.css('height',dep4H);
			$twDep.css("height",$twDep.outerHeight() + dep4H - _h);
		}

	});

	var searchBtn, elemHeight,
	// 조회조건 Drag 호출부
	initDrag = function(e, th) {
		var searchCondition = $(th).parent().parent().find('table');
			searchBtn = th;			
			elemHeight = searchCondition.outerHeight(true);

		document.documentElement.addEventListener('mousemove', doDrag, false);
		document.documentElement.addEventListener('mouseup', stopDrag, false);		
	},
	// 조회조건 Drag 실행부
	doDrag = function(e, th) {
		var rEle  = $(searchBtn).parent().parent(),
			rEleD = rEle.height(),
			rHei  = e.clientY - rEle.offset().top;
		if(rHei <=15) {rHei = 15;}
		if(rHei >= elemHeight){
			rHei = elemHeight;
		}
		rEle.css({"height": rHei});
	},
	// 조회조건 Drag stop 발생함수
	stopDrag = function(e) {
	    document.documentElement.removeEventListener('mousemove', doDrag, false);
	    document.documentElement.removeEventListener('mouseup', stopDrag, false);
	};	

	//panel-main 화면 분할
	panelLayerResize();
});











(
	function(z){
		
		z.fn._positionElement = function(e) {
			var t = {
				relativeTo: document.body,
				position: null,
				positionNAN: [],
				offset: { y: 0, x: 0 },
				axisContainment: !0,
				windowContainment: !0,
				animate: 600
			};
			
			if ("string" == typeof e && "?" == e){
				return t;
			}
			
		e = z.extend(t, e), z(this).attr("id");
		
		if (0 == z(document.body).children(this) && z(this).appendTo(document.body), null != e.relativeTo && null == e.position) {
			var o = 1,
				l = Math.ceil(z(window).width() / 3),
				n = Math.ceil(z(window).height() / 3),
				r = (z(e.relativeTo).outerWidth(!0), z(e.relativeTo).outerWidth(!0), z(e.relativeTo).offset().top),
				s = z(e.relativeTo).offset().left,
				a = 0 * n + n,
				i = 1 * l + l,
				d = 0 * n + n,
				c = 2 * l + l,
				g = 1 * n + n,
				h = 0 * l + l,
				u = 1 * n + n,
				f = 1 * l + l,
				w = 1 * n + n,
				p = 2 * l + l,
				m = 2 * n + n,
				v = 0 * l + l,
				C = 2 * n + n,
				R = 1 * l + l,
				_ = 2 * n + n,
				y = 2 * l + l;
			r <= 0 * n + n && s <= 0 * l + l ? (e.position = ["right", "top"], o = 1) : r <= a && s <= i ? (e.position = ["left", "top"], o = 2) : r <= d && s <= c ? (e.position = ["left", "top"], o = 3) : r <= g && s <= h ? (e.position = ["right", "center"], o = 4) : r <= u && s <= f ? (e.position = ["left", "center"], o = 5) : r <= w && s <= p ? (e.position = ["left", "center"], o = 6) : r <= m && s <= v ? (e.position = ["right", "bottom"], o = 7) : r <= C && s <= R ? (e.position = ["left", "bottom"], o = 8) : r <= _ && s <= y && (e.position = ["left", "bottom"], o = 9)
		}
		
		if (e.positionNAN)
		    for (var D = 0; D < e.positionNAN.length; D++) e.positionNAN[D] == e.position[0] && "left" == e.position[0] ? e.position[0] = 7 <= o ? "top" : "bottom" : e.positionNAN[D] == e.position[0] && "right" == e.position[0] ? e.position[0] = 7 <= o ? "top" : "bottom" : e.positionNAN[D] == e.position[0] && "top" == e.position[0] ? e.position[0] = 2 == o || 3 == o || 5 == o || 6 == o || 8 == o || 9 == o ? "left" : "right" : e.positionNAN[D] == e.position[0] && "bottom" == e.position[0] ? e.position[0] = 2 == o || 3 == o || 5 == o || 6 == o || 8 == o || 9 == o || -1 != e.positionNAN.indexOf("right") ? "left" : "right" : e.positionNAN[D] == e.position[1] && "center" == e.position[1] && (e.position[1] = 2 == o || 3 == o || 5 == o || 6 == o || 8 == o || 9 == o || -1 != e.positionNAN.indexOf("right") ? "left" : "right"), "bottom" != e.position[0] && "top" != e.position[0] || "bottom" != e.position[1] && "top" != e.position[1] ? "left" != e.position[0] && "left" != e.position[0] || "left" != e.position[1] && "right" != e.position[1] || (e.position[1] = "bottom") : e.position[1] = 1 == o || 2 == o || 4 == o || 5 == o || 7 == o || 8 == o ? "left" : "right";
		var b = e.relativeTo == screen || e.relativeTo == window ? z(document).scrollTop() : z(e.relativeTo).offset().top,
		    x = e.relativeTo == screen || e.relativeTo == window ? z(document).scrollLeft() : z(e.relativeTo).offset().left,
		    T = e.relativeTo == screen || e.relativeTo == window ? window.innerWidth : z(e.relativeTo).outerWidth(),
		    S = e.relativeTo == screen || e.relativeTo == window ? window.innerHeight : z(e.relativeTo).outerHeight(),
		    I = 0,
		    M = 0,
		    $ = {
		        x: !1,
		        y: !1
		    },
		    E = {
		        callout: "",
		        position: null
		    };
		e.size = {
		    width: z(this).outerWidth(!0),
		    height: z(this).outerHeight(!0)
		};
		for (D = 0; D < e.position.length; D++) e.position[D] = e.position[D].toLowerCase().trim(), e.axisContainment && ($.x || "left" != e.position[D] && "right" != e.position[D] || ($.y = !0), $.y || "top" != e.position[D] && "bottom" != e.position[D] || ($.x = !0));
		return -1 != e.position.indexOf("inside") && (I = b, M = x), -1 != e.position.indexOf("top") && (I = b - (-1 == e.position.indexOf("inside") ? e.size.height : 0), -1 == e.position.indexOf("left") && -1 == e.position.indexOf("right") && (M = x)), -1 != e.position.indexOf("bottom") && (I = b + (-1 == e.position.indexOf("inside") ? S : Math.max(0, S - e.size.height)), -1 == e.position.indexOf("left") && -1 == e.position.indexOf("right") && (M = x)), -1 != e.position.indexOf("left") && (-1 == e.position.indexOf("top") && -1 == e.position.indexOf("bottom") && (I = S), M = x - (-1 == e.position.indexOf("inside") ? e.size.width : 0)), -1 != e.position.indexOf("right") && (-1 == e.position.indexOf("top") && -1 == e.position.indexOf("bottom") && (I = S), M = x + (-1 == e.position.indexOf("inside") ? T : Math.max(0, T - e.size.width))), -1 != e.position.indexOf("center") && (-1 == e.position.indexOf("top") && -1 == e.position.indexOf("bottom") && (I = b, I += Math.max(0, (S - e.size.height) / 2)), -1 == e.position.indexOf("right") && -1 == e.position.indexOf("left") && (M = x, M += Math.max(0, (T - e.size.width) / 2))), $.y && (-1 == e.position.indexOf("bottom") && I < b && (I = b), -1 == e.position.indexOf("center") && -1 == e.position.indexOf("top") && I + e.size.height > b + S && (I = b + (S - e.size.height)), -1 != e.position.indexOf("center") && -1 == e.position.indexOf("top") && I + e.size.height > b + S && (I = b + (S - e.size.height) / 2)), $.x && (-1 == e.position.indexOf("right") && M < x && (M = x), -1 == e.position.indexOf("center") && -1 == e.position.indexOf("left") && M + e.size.width > x + T && (M = x + (T - e.size.width)), -1 != e.position.indexOf("center") && M + e.size.width > x + T && (M = x + (T - e.size.width) / 2)), "top" == e.position[0] ? I -= e.offset.y : "bottom" == e.position[0] ? I += e.offset.y : "inside" == e.position[0] && (I += e.offset.y), "left" == e.position[0] ? M -= e.offset.x : "right" == e.position[0] ? M += e.offset.x : "inside" == e.position[0] && (M += e.offset.x), M > z(window).width() && (M = z(window).width() - z(this).outerWidth(!0)), I > z(window).height() && (I = z(window).height() - z(this).outerHeight(!0)), z(this).animate({
		    top: I,
		    left: M
		}, e.animate, "easeInOutQuint"), $.y && -1 != e.position.indexOf("left") && -1 != e.position.indexOf("top") ? E.callout = "rightTop" : $.y && -1 != e.position.indexOf("left") && -1 != e.position.indexOf("bottom") ? E.callout = "rightBottom" : $.y && -1 != e.position.indexOf("right") && -1 != e.position.indexOf("top") ? E.callout = "leftTop" : $.y && -1 != e.position.indexOf("right") && -1 != e.position.indexOf("bottom") ? E.callout = "leftBottom" : $.y && -1 != e.position.indexOf("right") && -1 != e.position.indexOf("top") ? E.callout = "leftTop" : $.x && -1 != e.position.indexOf("top") && -1 != e.position.indexOf("left") ? E.callout = "bottomLeft" : $.x && -1 != e.position.indexOf("top") && -1 != e.position.indexOf("right") ? E.callout = "bottomRight" : $.x && -1 != e.position.indexOf("bottom") && -1 != e.position.indexOf("left") ? E.callout = "topLeft" : $.x && -1 != e.position.indexOf("bottom") && -1 != e.position.indexOf("right") ? E.callout = "topRight" : -1 != e.position.indexOf("top") ? E.callout = "bottom" : -1 != e.position.indexOf("left") ? E.callout = "right" : -1 != e.position.indexOf("right") ? E.callout = "left" : -1 != e.position.indexOf("bottom") && (E.callout = "top"), E.position = e.position, E
		}
		
		
		z.fn.ibModal = function(e){
			var t = {
				modalSessionID: null,
				modalType: null,
				modalID: null,
				buttons: null,
				title: "",
				message: "",
				html: null,
				relativeTo: screen,
				cssClass: "stModal",
				position: ["inside", "center"],
				positionNAN: [],
				offset: {
					x: 0,
					y: 0
				},
				size: null,
				closeTimeout: null,
				axisContainment: !0,
				windowContainment: !0,
				animate: 0,
				fade: 0,
				zIndex: 9999,
				speech: !0,
				show: !0,
				disabled: !0,
				focus: "input:text"
			};
			
			if ("string" == typeof e && "?" == e){
				return t;
			}
			
			e = $.extend(t, e);
			
			var o = $(this).attr("id"),
				l = {
					ok: {
					    text: "OK",
					    style: "background: #4d9c3b; background: -moz-linear-gradient(top,  #4d9c3b 0%, #1b6d00 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#4d9c3b), color-stop(100%,#1b6d00)); background: -webkit-linear-gradient(top,  #4d9c3b 0%,#1b6d00 100%); background: -o-linear-gradient(top,  #4d9c3b 0%,#1b6d00 100%); background: -ms-linear-gradient(top,  #4d9c3b 0%,#1b6d00 100%); background: linear-gradient(to bottom,  #4d9c3b 0%,#1b6d00 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4d9c3b', endColorstr='#1b6d00',GradientType=0 ); ",
					    onClick: null
					},
					cancel: {
					    text: "CANCEL",
					    style: "background: #9c3b3b;background: -moz-linear-gradient(top,  #9c3b3b 0%, #752c2c 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#9c3b3b), color-stop(100%,#752c2c)); background: -webkit-linear-gradient(top,  #9c3b3b 0%,#752c2c 100%); background: -o-linear-gradient(top,  #9c3b3b 0%,#752c2c 100%); background: -ms-linear-gradient(top,  #9c3b3b 0%,#752c2c 100%); background: linear-gradient(to bottom,  #9c3b3b 0%,#752c2c 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9c3b3b', endColorstr='#752c2c',GradientType=0 );",
					    onClick: function() {
					        /*test123123({show: !1})*/
					    }
					}
				},
			    n = $("#" + e.modalID),
			    r = $(this),
			    s = 0 < n.length && n[0].modalSessionID == e.modalSessionID && null != n[0].modalSessionID;
		        if (!e.show){ 
		        	return 0 == e.fade ? ($(n).removeClass("show"), $(n).addClass("hide"), $(n).css("display", "none")) : $(n).fadeOut(), r._disabled({
		        			disabled: !1
		        		}), void(0 < n.length && (n[0].modalSessionID = e.modalSessionID));
				}
		        for (var a in s || (0 == n.length ? (null == e.html ? $(document.body).append('<div id="' + e.modalID + '" class="' + e.cssClass + " " + (0 < e.anitmate ? "hide" : "") + '"><div  class="stModalTitle"></div><div  class="stModalBody"></div><div  class="stModalButtons"></div>') : $(document.body).append('<div id="' + e.modalID + '" class="' + e.cssClass + " " + (0 < e.anitmate ? "hide" : "") + '">' + e.html + "</div>"), n = $("#" + e.modalID)) : null != e.html && $(n).html(e.html)), n.modalSessionID = e.modalSessionID, $(n).css("z-index", e.zIndex), null == e.html && ($(n).find(".stModalTitle").html(e.title), $(n).find(".stModalBody").html(e.message), $(n).find(".stModalButtons").html("")), e.buttons) l[a] ? (null == e.buttons[a].text && null != e.buttons[a].onClick || (l[a].text = e.buttons[a].text), null == e.buttons[a].style && null != e.buttons[a].onClick || (l[a].style = e.buttons[a].style), null == e.buttons[a].onClick && null != e.buttons[a].onClick || (l[a].onClick = e.buttons[a].onClick)) : l[a] = e.buttons[a];
		        for (var a in l) "function" == typeof l[a].onClick && $(n).find(".stModalButtons").append('<input type="button" key="' + a + '" style="' + l[a].style + '" tabindex="1" class="button stModalButton" value="' + l[a].text + '" />');
		        if ($(n).find(".stModalButton").unbind("click"), $(n).find(".stModalButton").on("click", function(e) {
		                $(this).focus();
		                var t = $(this).attr("key");
		                l[t] && "function" == typeof l[t].onClick && l[t].onClick()
		            }), null != e.size && ($(this).outerWidth(e.size.width), $(this).outerHeight(e.size.height)), s) null != e.html && $(n).html(e.html), 0 == e.fade ? ($(n).show(), $(n).removeClass("hide"), $(n).addClass("show")) : $(n).fadeIn();
		        else {
		            var i = {
		                callout: ""
		            };
		            if (null != e.relativeTo && (i = $(n)._positionElement(e)), "" == i.callout && (i.callout = "bottomRight"), $("#stModalSpeech").attr("class", ""), e.speech && "" != i.callout && (0 == $("#stModalSpeech").length && $(n).append('<b id="stModalSpeech"></b>'), $("#stModalSpeech").addClass("stSpeech " + i.callout)), 0 == e.fade ? ($(n).show(), $(n).removeClass("hide"), $(n).addClass("show")) : $(n).fadeIn(), "context" == e.modalType) {
		                if (!gsheet[o]) return;
		                gsheet[o].contextInteraction = !1;

		                function d() {
		                    1 != gsheet[o].contextInteraction && (0 == e.fade ? ($(n).removeClass("show"), $(n).addClass("hide"), $(n).hide()) : $(n).fadeOut(), r._disabled({
		                        disabled: !1
		                    }))
		                }
		                n.on("mouseover", function() {
		                    gsheet[o].contextInteraction = !0
		                }), n.on("mouseleave", function() {
		                    gsheet[o].contextInteraction = !1
		                }), document.addEventListener("click", d, !0), document.addEventListener("touchstart", d, {
		                    passive: !0
		                })
		            } else "dialog" != e.modalType && $(n).gdrag({
		                cancel: ".no-drag",
		                start: function() {
		                    $("#stModalSpeech").attr("class", "")
		                }
		            })
		        }
		        return e.disabled && r._disabled(), null != e.closeTimeout && setTimeout(function() {
		            0 == e.fade ? ($(n).removeClass("show"), $(n).addClass("hide"), $(n).hide()) : $(n).fadeOut(), r._disabled({
		                disabled: !1
		            })
		        }, e.closeTimeout), $(n).find(e.focus).focus(), $(this)
		    }
		
		
		z.fn._disabled = function(n) {
	        var e = {
	                titleClass: "DisabledTitle",
	                title: "",
	                disabled: !0,
	                color: "#222",
	                fade: !0,
	                style: "",
	                onclick: null,
	                opacity: .5,
	                zIndex: 100
	            };
	            if ("string" == typeof n && "?" == n) return e;
	            n = z.extend(e, n);
	            return z(this).each(function() {
	                z(this).attr("id");
	                var e = z(this).children(".stDisabled");
	                0 == e.length && (e = z('<div class="stDisabled" style="display:none;position:absolute;top:0px;left:0px;background-color:' + n.color + ";opacity:" + n.opacity + ";filter: alpha(opacity=" + 100 * n.opacity + ");z-index:" + n.zIndex + ';width:100%;height:100%;"></div>')),
	                //console.log(this);
	            	z(e).appendTo(this),
	            	e = z(this).children(".stDisabled");
	                
	                var t = z(this).children("#ec_DisabledTitle");
	                
	                if (0 == t.length && (z('<div id="ec_DisabledTitle" class="DisabledTitle" style="position: absolute;"></div>').appendTo(this), t = z(this).children("#ec_DisabledTitle")), n.disabled) {
	                    if ("" != n.title) {
	                        var o = (z(e).outerHeight() - z(t).outerHeight()) / 2,
	                            l = n.style ? n.style.trim() : "";
	                        ";" !== l.charAt(l.length - 1) && (l += ";"), this == document.body ? (o = (z(window).outerHeight() - z(t).outerHeight()) / 2, z(t).attr("style", "position: fixed;" + l)) : z(t).attr("style", "position: absolute;" + l), z(t).removeClass(), z(t).addClass(n.titleClass), z(t).show(), z(t).html(n.title), z(t).css("top", o + "px"), z(t).css("left", (z(e).outerWidth() - z(t).outerWidth()) / 2 + "px"), z(t).css("z-index", parseInt(z(e).css("z-index")) + 1)
	                    } else z(t).hide();
	                    n.fade ? z(e).fadeIn() : z(e).show()
	                } else z(t).hide(), n.fade ? z(e).fadeOut() : z(e).hide();
	                z(e).unbind("click"), "function" == typeof n.onclick && z(e).click(function() {
	                    n.onclick()
	                })
	            }), z(this)
	    }
		
		
		z.fn.showNotification = function(from, align, msg){
			var msg = msg == undefined ? "" : msg;
			
			type = ['','info','success','warning','danger','rose','primary'];
			color = Math.floor((Math.random() * 6) + 1);
			$.notify({
				icon: "notifications",
				message: msg
			},{
				type: type[color],
				timer : 500,
				delay : 1500, 
				placement: {
					from: from,
					align: align
				}
			});
		}
		
	})($)

























	!function(a, i) {
		// console.log("a : " + a);
		// console.log("i : " + i);
	    var e, t, o = 0,
	        l = /^ui-id-\d+$/;

	    function n(e, t) {
	        var o, l, n, r = e.nodeName.toLowerCase();
	        return "area" === r ? (l = (o = e.parentNode).name, !(!e.href || !l || "map" !== o.nodeName.toLowerCase()) && (!!(n = a("img[usemap=#" + l + "]")[0]) && s(n))) : (/input|select|textarea|button|object/.test(r) ? !e.disabled : "a" === r && e.href || t) && s(e)
	    }

	    function s(e) {
	        return a.expr.filters.visible(e) && !a(e).parents().addBack().filter(function() {
	            return "hidden" === a.css(this, "visibility")
	        }).length
	    }
		
		
	    a.gui = a.gui || {}, a.extend(a.gui, {
	        version: "1.0.1",
	        keyCode: {
	            BACKSPACE: 8,
	            COMMA: 188,
	            DELETE: 46,
	            DOWN: 40,
	            END: 35,
	            ENTER: 13,
	            ESCAPE: 27,
	            HOME: 36,
	            LEFT: 37,
	            NUMPAD_ADD: 107,
	            NUMPAD_DECIMAL: 110,
	            NUMPAD_DIVIDE: 111,
	            NUMPAD_ENTER: 108,
	            NUMPAD_MULTIPLY: 106,
	            NUMPAD_SUBTRACT: 109,
	            PAGE_DOWN: 34,
	            PAGE_UP: 33,
	            PERIOD: 190,
	            RIGHT: 39,
	            SPACE: 32,
	            TAB: 9,
	            UP: 38
	        }
	    }), a.fn.extend({
	        focus: (e = a.fn.focus, function(t, o) {
	            return "number" == typeof t ? this.each(function() {
	                var e = this;
	                setTimeout(function() {
	                    a(e).focus(), o && o.call(e)
	                }, t)
	            }) : e.apply(this, arguments)
	        }),
	        scrollParent: function() {
	            var e;
	            return e = a.gui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
	                return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
	            }).eq(0) : this.parents().filter(function() {
	                return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
	            }).eq(0), /fixed/.test(this.css("position")) || !e.length ? a(document) : e
	        },
	        zIndex: function(e) {
	            if (e !== i) return this.css("zIndex", e);
	            if (this.length)
	                for (var t, o, l = a(this[0]); l.length && l[0] !== document;) {
	                    if (("absolute" === (t = l.css("position")) || "relative" === t || "fixed" === t) && (o = parseInt(l.css("zIndex"), 10), !isNaN(o) && 0 !== o)) return o;
	                    l = l.parent()
	                }
	            return 0
	        },
	        uniqueId: function() {
	            return this.each(function() {
	                this.id || (this.id = "gui-id-" + ++o)
	            })
	        },
	        removeUniqueId: function() {
	            return this.each(function() {
	                l.test(this.id) && a(this).removeAttr("id")
	            })
	        }
	    }), a.extend(a.expr[":"], {
	        data: a.expr.createPseudo ? a.expr.createPseudo(function(t) {
	            return function(e) {
	                return !!a.data(e, t)
	            }
	        }) : function(e, t, o) {
	            return !!a.data(e, o[3])
	        },
	        focusable: function(e) {
	            return n(e, !isNaN(a.attr(e, "tabindex")))
	        },
	        tabbable: function(e) {
	            var t = a.attr(e, "tabindex"),
	                o = isNaN(t);
	            return (o || 0 <= t) && n(e, !o)
	        }
	    }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(e, o) {
	        var n = "Width" === o ? ["Left", "Right"] : ["Top", "Bottom"],
	            l = o.toLowerCase(),
	            r = {
	                innerWidth: a.fn.innerWidth,
	                innerHeight: a.fn.innerHeight,
	                outerWidth: a.fn.outerWidth,
	                outerHeight: a.fn.outerHeight
	            };

	        function s(e, t, o, l) {
	            return a.each(n, function() {
	                t -= parseFloat(a.css(e, "padding" + this)) || 0, o && (t -= parseFloat(a.css(e, "border" + this + "Width")) || 0), l && (t -= parseFloat(a.css(e, "margin" + this)) || 0)
	            }), t
	        }
	        a.fn["inner" + o] = function(e) {
	            return e === i ? r["inner" + o].call(this) : this.each(function() {
	                a(this).css(l, s(this, e) + "px")
	            })
	        }, a.fn["outer" + o] = function(e, t) {
	            return "number" != typeof e ? r["outer" + o].call(this, e) : this.each(function() {
	                a(this).css(l, s(this, e, !0, t) + "px")
	            })
	        }
	    }), a.fn.addBack || (a.fn.addBack = function(e) {
	        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
	    }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = (t = a.fn.removeData, function(e) {
	        return arguments.length ? t.call(this, a.camelCase(e)) : t.call(this)
	    })), a.gui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.support.selectstart = "onselectstart" in document.createElement("div"), a.fn.extend({
	        disableSelection: function() {
	            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
	                e.preventDefault()
	            })
	        },
	        enableSelection: function() {
	            return this.unbind(".ui-disableSelection")
	        }
	    }), a.extend(a.gui, {
	        plugin: {
	            add: function(e, t, o) {
	                var l, n = a.gui[e].prototype;
	                for (l in o) n.plugins[l] = n.plugins[l] || [], n.plugins[l].push([t, o[l]])
	            },
	            call: function(e, t, o) {
	                var l, n = e.plugins[t];
	                if (n && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
	                    for (l = 0; l < n.length; l++) e.options[n[l][0]] && n[l][1].apply(e.element, o)
	            }
	        },
	        hasScroll: function(e, t) {
	            if ("hidden" === a(e).css("overflow")) return !1;
	            var o, l = t && "left" === t ? "scrollLeft" : "scrollTop";
	            return 0 < e[l] || (e[l] = 1, o = 0 < e[l], e[l] = 0, o)
	        }
	    })
	}(jQuery),
	function(c, a) {
	    var o = 0,
	        i = Array.prototype.slice,
	        l = c.cleanData;
	    c.cleanData = function(e) {
	        for (var t, o = 0; null != (t = e[o]); o++) try {
	            c(t).triggerHandler("remove")
	        } catch (e) {}
	        l(e)
		},
		c.widget = function(e, o, t) {
	        var l, n, r, s, a = {},
	            i = e.split(".")[0];
	        e = e.split(".")[1], l = i + "-" + e, t || (t = o, o = c.Widget), c.expr[":"][l.toLowerCase()] = function(e) {
	            return !!c.data(e, l)
	        }, c[i] = c[i] || {}, n = c[i][e], r = c[i][e] = function(e, t) {
	            if (!this._createWidget) return new r(e, t);
	            arguments.length && this._createWidget(e, t)
	        }, c.extend(r, n, {
	            version: t.version,
	            _proto: c.extend({}, t),
	            _childConstructors: []
	        }), (s = new o).options = c.widget.extend({}, s.options), c.each(t, function(t, l) {
	            function n() {
	                return o.prototype[t].apply(this, arguments)
	            }

	            function r(e) {
	                return o.prototype[t].apply(this, e)
	            }
	            c.isFunction(l) ? a[t] = function() {
	                var e, t = this._super,
	                    o = this._superApply;
	                return this._super = n, this._superApply = r, e = l.apply(this, arguments), this._super = t, this._superApply = o, e
	            } : a[t] = l
	        }), r.prototype = c.widget.extend(s, {
	            widgetEventPrefix: n && s.widgetEventPrefix || e
	        }, a, {
	            constructor: r,
	            namespace: i,
	            widgetName: e,
	            widgetFullName: l
	        }), n ? (c.each(n._childConstructors, function(e, t) {
	            var o = t.prototype;
	            c.widget(o.namespace + "." + o.widgetName, r, t._proto)
	        }), delete n._childConstructors) : o._childConstructors.push(r), c.widget.bridge(e, r)
	    }, c.widget.extend = function(e) {
	        for (var t, o, l = i.call(arguments, 1), n = 0, r = l.length; n < r; n++)
	            for (t in l[n]) o = l[n][t], l[n].hasOwnProperty(t) && o !== a && (c.isPlainObject(o) ? e[t] = c.isPlainObject(e[t]) ? c.widget.extend({}, e[t], o) : c.widget.extend({}, o) : e[t] = o);
	        return e
	    }, c.widget.bridge = function(r, t) {
	        var s = t.prototype.widgetFullName || r;
	        c.fn[r] = function(o) {
	            var e = "string" == typeof o,
	                l = i.call(arguments, 1),
	                n = this;
	            return o = !e && l.length ? c.widget.extend.apply(null, [o].concat(l)) : o, e ? this.each(function() {
	                var e, t = c.data(this, s);
	                return t ? c.isFunction(t[o]) && "_" !== o.charAt(0) ? (e = t[o].apply(t, l)) !== t && e !== a ? (n = e && e.jquery ? n.pushStack(e.get()) : e, !1) : void 0 : c.error("no such method '" + o + "' for " + r + " widget instance") : c.error("cannot call methods on " + r + " prior to initialization; attempted to call method '" + o + "'")
	            }) : this.each(function() {
	                var e = c.data(this, s);
	                e ? e.option(o || {})._init() : c.data(this, s, new t(o, this))
	            }), n
	        }
	    }, c.Widget = function() {}, c.Widget._childConstructors = [], c.Widget.prototype = {
	        widgetName: "widget",
	        widgetEventPrefix: "",
	        defaultElement: "<div>",
	        options: {
	            disabled: !1,
	            create: null
	        },
	        _createWidget: function(e, t) {
	            t = c(t || this.defaultElement || this)[0], this.element = c(t), this.uuid = o++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = c.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = c(), this.hoverable = c(), this.focusable = c(), t !== this && (c.data(t, this.widgetFullName, this), this._on(!0, this.element, {
	                remove: function(e) {
	                    e.target === t && this.destroy()
	                }
	            }), this.document = c(t.style ? t.ownerDocument : t.document || t), this.window = c(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
	        },
	        _getCreateOptions: c.noop,
	        _getCreateEventData: c.noop,
	        _create: c.noop,
	        _init: c.noop,
	        destroy: function() {
	            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(c.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled gui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("gui-state-hover"), this.focusable.removeClass("gui-state-focus")
	        },
	        _destroy: c.noop,
	        widget: function() {
	            return this.element
	        },
	        option: function(e, t) {
	            var o, l, n, r = e;
	            if (0 === arguments.length) return c.widget.extend({}, this.options);
	            if ("string" == typeof e)
	                if (r = {}, e = (o = e.split(".")).shift(), o.length) {
	                    for (l = r[e] = c.widget.extend({}, this.options[e]), n = 0; n < o.length - 1; n++) l[o[n]] = l[o[n]] || {}, l = l[o[n]];
	                    if (e = o.pop(), 1 === arguments.length) return l[e] === a ? null : l[e];
	                    l[e] = t
	                } else {
	                    if (1 === arguments.length) return this.options[e] === a ? null : this.options[e];
	                    r[e] = t
	                } return this._setOptions(r), this
	        },
	        _setOptions: function(e) {
	            var t;
	            for (t in e) this._setOption(t, e[t]);
	            return this
	        },
	        _setOption: function(e, t) {
	            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("gui-state-hover"), this.focusable.removeClass("gui-state-focus")), this
	        },
	        enable: function() {
	            return this._setOption("disabled", !1)
	        },
	        disable: function() {
	            return this._setOption("disabled", !0)
	        },
	        _on: function(s, a, e) {
	            var i, d = this;
	            "boolean" != typeof s && (e = a, a = s, s = !1), e ? (a = i = c(a), this.bindings = this.bindings.add(a)) : (e = a, a = this.element, i = this.widget()), c.each(e, function(e, t) {
	                function o() {
	                    if (s || !0 !== d.options.disabled && !c(this).hasClass("gui-state-disabled")) return ("string" == typeof t ? d[t] : t).apply(d, arguments)
	                }
	                "string" != typeof t && (o.guid = t.guid = t.guid || o.guid || c.guid++);
	                var l = e.match(/^(\w+)\s*(.*)$/),
	                    n = l[1] + d.eventNamespace,
	                    r = l[2];
	                r ? i.delegate(r, n, o) : a.bind(n, o)
	            })
	        },
	        _off: function(e, t) {
	            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
	        },
	        _delay: function(e, t) {
	            var o = this;
	            return setTimeout(function() {
	                return ("string" == typeof e ? o[e] : e).apply(o, arguments)
	            }, t || 0)
	        },
	        _hoverable: function(e) {
	            this.hoverable = this.hoverable.add(e), this._on(e, {
	                mouseenter: function(e) {
	                    c(e.currentTarget).addClass("gui-state-hover")
	                },
	                mouseleave: function(e) {
	                    c(e.currentTarget).removeClass("gui-state-hover")
	                }
	            })
	        },
	        _focusable: function(e) {
	            this.focusable = this.focusable.add(e), this._on(e, {
	                focusin: function(e) {
	                    c(e.currentTarget).addClass("gui-state-focus")
	                },
	                focusout: function(e) {
	                    c(e.currentTarget).removeClass("gui-state-focus")
	                }
	            })
	        },
	        _trigger: function(e, t, o) {
	            var l, n, r = this.options[e];
	            if (o = o || {}, (t = c.Event(t)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), t.target = this.element[0], n = t.originalEvent)
	                for (l in n) l in t || (t[l] = n[l]);
	            return this.element.trigger(t, o), !(c.isFunction(r) && !1 === r.apply(this.element[0], [t].concat(o)) || t.isDefaultPrevented())
	        }
	    }
	}(jQuery),
	function(n) {
	    var r = !1;
	    n(document).mouseup(function() {
	        r = !1
	    }), n.widget("gui.gmouse", {
	        version: "1.10.4",
	        options: {
	            cancel: "input,textarea,button,select,option",
	            distance: 1,
	            delay: 0
	        },
	        _mouseInit: function() {
	            var t = this;
	            this.element.bind("mousedown." + this.widgetName, function(e) {
	                return t._mouseDown(e)
	            }).bind("click." + this.widgetName, function(e) {
	                if (!0 === n.data(e.target, t.widgetName + ".preventClickEvent")) return n.removeData(e.target, t.widgetName + ".preventClickEvent"), e.stopImmediatePropagation(), !1
	            }), this.started = !1
	        },
	        _mouseDestroy: function() {
	            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
	        },
	        _mouseDown: function(e) {
	            if (!r) {
	                this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
	                var t = this,
	                    o = 1 === e.which,
	                    l = !("string" != typeof this.options.cancel || !e.target.nodeName) && n(e.target).closest(this.options.cancel).length;
	                return !(o && !l && this._mouseCapture(e)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
	                    t.mouseDelayMet = !0
	                }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(e), !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === n.data(e.target, this.widgetName + ".preventClickEvent") && n.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
	                    return t._mouseMove(e)
	                }, this._mouseUpDelegate = function(e) {
	                    return t._mouseUp(e)
	                }, n(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), r = !0))
	            }
	        },
	        _mouseMove: function(e) {
	            return n.gui.ie && (!document.documentMode || document.documentMode < 9) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
	        },
	        _mouseUp: function(e) {
	            return n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && n.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
	        },
	        _mouseDistanceMet: function(e) {
	            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
	        },
	        _mouseDelayMet: function() {
	            return this.mouseDelayMet
	        }
	    })
	}(jQuery),

	/**######################################*/
	function(C) {
		C.widget(
			"gui.gdrag",
			C.gui.gmouse,
			{
				version: "1.10.4",
				widgetEventPrefix: "drag",
				options: {
					addClasses: !0,
					appendTo: "parent",
					axis: !1,
					connectToSortable: !1,
					containment: !1,
					cursor: "auto",
					cursorAt: !1,
					grid: !1,
					handle: !1,
					helper: "original",
					iframeFix: !1,
					opacity: !1,
					refreshPositions: !1,
					revert: !1,
					revertDuration: 500,
					scope: "default",
					scroll: !0,
					scrollSensitivity: 20,
					scrollSpeed: 20,
					snap: !1,
					snapMode: "both",
					snapTolerance: 20,
					stack: !1,
					zIndex: !1,
					drag: null,
					start: null,
					stop: null
				},
				_create: function() {
					"original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
				},
				_destroy: function() {
				    this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
				},
				_mouseCapture: function(e) {
				    var t = this.options;
				    return !(this.helper || t.disabled || 0 < C(e.target).closest(".ui-resizable-handle").length) && (this.handle = this._getHandle(e), !!this.handle && (C(!0 === t.iframeFix ? "iframe" : t.iframeFix).each(function() {
				        C("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
				            width: this.offsetWidth + "px",
				            height: this.offsetHeight + "px",
				            position: "absolute",
				            opacity: "0.001",
				            zIndex: 1e3
				        }).css(C(this).offset()).appendTo("body")
				    }), !0))
				},
				_mouseStart: function(e) {
				    var t = this.options;
				    return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), C.gui.ddmanager && (C.gui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
				        top: this.offset.top - this.margins.top,
				        left: this.offset.left - this.margins.left
				    }, this.offset.scroll = !1, C.extend(this.offset, {
				        click: {
				            left: e.pageX - this.offset.left,
				            top: e.pageY - this.offset.top
				        },
				        parent: this._getParentOffset(),
				        relative: this._getRelativeOffset()
				    }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, t.cursorAt && this._adjustOffsetFromHelper(t.cursorAt), this._setContainment(), !1 === this._trigger("start", e) ? (this._clear(), !1) : (this._cacheHelperProportions(), C.gui.ddmanager && !t.dropBehaviour && C.gui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), C.gui.ddmanager && C.gui.ddmanager.dragStart(this, e), !0)
				},
				_mouseDrag: function(e, t) {
				    if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !t) {
				        var o = this._uiHash();
				        if (!1 === this._trigger("drag", e, o)) return this._mouseUp({}), !1;
				        this.position = o.position
				    }
				    return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), C.gui.ddmanager && C.gui.ddmanager.drag(this, e), !1
				},
				_mouseStop: function(e) {
				    var t = this,
				        o = !1;
				    return C.gui.ddmanager && !this.options.dropBehaviour && (o = C.gui.ddmanager.drop(this, e)), this.dropped && (o = this.dropped, this.dropped = !1), ("original" !== this.options.helper || C.contains(this.element[0].ownerDocument, this.element[0])) && ("invalid" === this.options.revert && !o || "valid" === this.options.revert && o || !0 === this.options.revert || C.isFunction(this.options.revert) && this.options.revert.call(this.element, o) ? C(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				        !1 !== t._trigger("stop", e) && t._clear()
				    }) : !1 !== this._trigger("stop", e) && this._clear()), !1
				},
				_mouseUp: function(e) {
				    return C("div.ui-draggable-iframeFix").each(function() {
				        this.parentNode.removeChild(this)
				    }), C.gui.ddmanager && C.gui.ddmanager.dragStop(this, e), C.gui.gmouse.prototype._mouseUp.call(this, e)
				},
				cancel: function() {
				    return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
				},
				_getHandle: function(e) {
				    return !this.options.handle || !!C(e.target).closest(this.element.find(this.options.handle)).length
				},
				_createHelper: function(e) {
				    var t = this.options,
				        o = C.isFunction(t.helper) ? C(t.helper.apply(this.element[0], [e])) : "clone" === t.helper ? this.element.clone().removeAttr("id") : this.element;
				    return o.parents("body").length || o.appendTo("parent" === t.appendTo ? this.element[0].parentNode : t.appendTo), o[0] === this.element[0] || /(fixed|absolute)/.test(o.css("position")) || o.css("position", "absolute"), o
				},
				_adjustOffsetFromHelper: function(e) {
				    "string" == typeof e && (e = e.split(" ")), C.isArray(e) && (e = {
				        left: +e[0],
				        top: +e[1] || 0
				    }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
				},
				_getParentOffset: function() {
				    var e = this.offsetParent.offset();
				    return "absolute" === this.cssPosition && this.scrollParent[0] !== document && C.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && C.gui.ie) && (e = {
				        top: 0,
				        left: 0
				    }), {
				        top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				        left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
				    }
				},
				_getRelativeOffset: function() {
				    if ("relative" !== this.cssPosition) return {
				        top: 0,
				        left: 0
				    };
				    var e = this.element.position();
				    return {
				        top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
				        left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				    }
				},
				_cacheMargins: function() {
				    this.margins = {
				        left: parseInt(this.element.css("marginLeft"), 10) || 0,
				        top: parseInt(this.element.css("marginTop"), 10) || 0,
				        right: parseInt(this.element.css("marginRight"), 10) || 0,
				        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
				    }
				},
				_cacheHelperProportions: function() {
				    this.helperProportions = {
				        width: this.helper.outerWidth(),
				        height: this.helper.outerHeight()
				    }
				},
				_setContainment: function() {
				    var e, t, o, l = this.options;
				    l.containment ? "window" !== l.containment ? "document" !== l.containment ? l.containment.constructor !== Array ? ("parent" === l.containment && (l.containment = this.helper[0].parentNode), (o = (t = C(l.containment))[0]) && (e = "hidden" !== t.css("overflow"), this.containment = [(parseInt(t.css("borderLeftWidth"), 10) || 0) + (parseInt(t.css("paddingLeft"), 10) || 0), (parseInt(t.css("borderTopWidth"), 10) || 0) + (parseInt(t.css("paddingTop"), 10) || 0), (e ? Math.max(o.scrollWidth, o.offsetWidth) : o.offsetWidth) - (parseInt(t.css("borderRightWidth"), 10) || 0) - (parseInt(t.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(o.scrollHeight, o.offsetHeight) : o.offsetHeight) - (parseInt(t.css("borderBottomWidth"), 10) || 0) - (parseInt(t.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = t)) : this.containment = l.containment : this.containment = [0, 0, C(document).width() - this.helperProportions.width - this.margins.left, (C(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top] : this.containment = [C(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, C(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, C(window).scrollLeft() + C(window).width() - this.helperProportions.width - this.margins.left, C(window).scrollTop() + (C(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top] : this.containment = null
				},
				_convertPositionTo: function(e, t) {
				    t || (t = this.position);
				    var o = "absolute" === e ? 1 : -1,
				        l = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && C.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
				    return this.offset.scroll || (this.offset.scroll = {
				        top: l.scrollTop(),
				        left: l.scrollLeft()
				    }), {
				        top: t.top + this.offset.relative.top * o + this.offset.parent.top * o - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * o,
				        left: t.left + this.offset.relative.left * o + this.offset.parent.left * o - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * o
				    }
				},
				_generatePosition: function(e) {
				    var t, o, l, n, r = this.options,
				        s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && C.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				        a = e.pageX,
				        i = e.pageY;
				    return this.offset.scroll || (this.offset.scroll = {
				        top: s.scrollTop(),
				        left: s.scrollLeft()
				    }), this.originalPosition && (this.containment && (t = this.relative_container ? (o = this.relative_container.offset(), [this.containment[0] + o.left, this.containment[1] + o.top, this.containment[2] + o.left, this.containment[3] + o.top]) : this.containment, e.pageX - this.offset.click.left < t[0] && (a = t[0] + this.offset.click.left), e.pageY - this.offset.click.top < t[1] && (i = t[1] + this.offset.click.top), e.pageX - this.offset.click.left > t[2] && (a = t[2] + this.offset.click.left), e.pageY - this.offset.click.top > t[3] && (i = t[3] + this.offset.click.top)), r.grid && (l = r.grid[1] ? this.originalPageY + Math.round((i - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, i = t ? l - this.offset.click.top >= t[1] || l - this.offset.click.top > t[3] ? l : l - this.offset.click.top >= t[1] ? l - r.grid[1] : l + r.grid[1] : l, n = r.grid[0] ? this.originalPageX + Math.round((a - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, a = t ? n - this.offset.click.left >= t[0] || n - this.offset.click.left > t[2] ? n : n - this.offset.click.left >= t[0] ? n - r.grid[0] : n + r.grid[0] : n)), {
				        top: i - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
				        left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
				    }
				},
				_clear: function() {
				    this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
				},
				_trigger: function(e, t, o) {
				    return o = o || this._uiHash(), C.gui.plugin.call(this, e, [t, o]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), C.Widget.prototype._trigger.call(this, e, t, o)
				},
				plugins: {},
				_uiHash: function() {
				    return {
				        helper: this.helper,
				        position: this.position,
				        originalPosition: this.originalPosition,
				        offset: this.positionAbs
				    }
				}
			}),
			C.gui.plugin.add("gdrag", "connectToSortable", {
				start: function(t, e) {
				    var o = C(this).data("gui-gdrag"),
				        l = o.options,
				        n = C.extend({}, e, {
				            item: o.element
				        });
				    o.sortables = [], C(l.connectToSortable).each(function() {
				        var e = C.data(this, "gui-sortable");
				        e && !e.options.disabled && (o.sortables.push({
				            instance: e,
				            shouldRevert: e.options.revert
				        }), e.refreshPositions(), e._trigger("activate", t, n))
				    })
				},
				stop: function(e, t) {
				    var o = C(this).data("gui-gdrag"),
				        l = C.extend({}, t, {
				            item: o.element
				        });
				    C.each(o.sortables, function() {
				        this.instance.isOver ? (this.instance.isOver = 0, o.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === o.options.helper && this.instance.currentItem.css({
				            top: "auto",
				            left: "auto"
				        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, l))
				    })
				},
				drag: function(o, l) {
				    var n = C(this).data("gui-gdrag"),
				        r = this;
				    C.each(n.sortables, function() {
				        var e = !1,
				            t = this;
				        this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (e = !0, C.each(n.sortables, function() {
				            return this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this !== t && this.instance._intersectsWith(this.instance.containerCache) && C.contains(t.instance.element[0], this.instance.element[0]) && (e = !1), e
				        })), e ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = C(r).clone().removeAttr("id").appendTo(this.instance.element).data("gui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
				            return l.helper[0]
				        }, o.target = this.instance.currentItem[0], this.instance._mouseCapture(o, !0), this.instance._mouseStart(o, !0, !0), this.instance.offset.click.top = n.offset.click.top, this.instance.offset.click.left = n.offset.click.left, this.instance.offset.parent.left -= n.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= n.offset.parent.top - this.instance.offset.parent.top, n._trigger("toSortable", o), n.dropped = this.instance.element, n.currentItem = n.element, this.instance.fromOutside = n), this.instance.currentItem && this.instance._mouseDrag(o)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", o, this.instance._uiHash(this.instance)), this.instance._mouseStop(o, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), n._trigger("fromSortable", o), n.dropped = !1)
				    })
				}
			}),
			C.gui.plugin.add("gdrag", "cursor", {
				start: function() {
				    var e = C("body"),
				        t = C(this).data("gui-gdrag").options;
				    e.css("cursor") && (t._cursor = e.css("cursor")), e.css("cursor", t.cursor)
				},
				stop: function() {
				    var e = C(this).data("gui-gdrag").options;
				    e._cursor && C("body").css("cursor", e._cursor)
				}
			}),
			C.gui.plugin.add("gdrag", "opacity", {
				start: function(e, t) {
				    var o = C(t.helper),
				        l = C(this).data("gui-gdrag").options;
				    o.css("opacity") && (l._opacity = o.css("opacity")), o.css("opacity", l.opacity)
				},
				stop: function(e, t) {
				    var o = C(this).data("gui-gdrag").options;
				    o._opacity && C(t.helper).css("opacity", o._opacity)
				}
			}),
			C.gui.plugin.add("gdrag", "snap", {
				start: function() {
				    var o = C(this).data("gui-gdrag"),
				        e = o.options;
				    o.snapElements = [], C(e.snap.constructor !== String ? e.snap.items || ":data(ui-draggable)" : e.snap).each(function() {
				        var e = C(this),
				            t = e.offset();
				        this !== o.element[0] && o.snapElements.push({
				            item: this,
				            width: e.outerWidth(),
				            height: e.outerHeight(),
				            top: t.top,
				            left: t.left
				        })
				    })
				},
				drag: function(e, t) {
				    var o, l, n, r, s, a, i, d, c, g, h = C(this).data("gui-gdrag"),
				        u = h.options,
				        f = u.snapTolerance,
				        w = t.offset.left,
				        p = w + h.helperProportions.width,
				        m = t.offset.top,
				        v = m + h.helperProportions.height;
				    for (c = h.snapElements.length - 1; 0 <= c; c--) a = (s = h.snapElements[c].left) + h.snapElements[c].width, d = (i = h.snapElements[c].top) + h.snapElements[c].height, p < s - f || a + f < w || v < i - f || d + f < m || !C.contains(h.snapElements[c].item.ownerDocument, h.snapElements[c].item) ? (h.snapElements[c].snapping && h.options.snap.release && h.options.snap.release.call(h.element, e, C.extend(h._uiHash(), {
				        snapItem: h.snapElements[c].item
				    })), h.snapElements[c].snapping = !1) : ("inner" !== u.snapMode && (o = Math.abs(i - v) <= f, l = Math.abs(d - m) <= f, n = Math.abs(s - p) <= f, r = Math.abs(a - w) <= f, o && (t.position.top = h._convertPositionTo("relative", {
				        top: i - h.helperProportions.height,
				        left: 0
				    }).top - h.margins.top), l && (t.position.top = h._convertPositionTo("relative", {
				        top: d,
				        left: 0
				    }).top - h.margins.top), n && (t.position.left = h._convertPositionTo("relative", {
				        top: 0,
				        left: s - h.helperProportions.width
				    }).left - h.margins.left), r && (t.position.left = h._convertPositionTo("relative", {
				        top: 0,
				        left: a
				    }).left - h.margins.left)), g = o || l || n || r, "outer" !== u.snapMode && (o = Math.abs(i - m) <= f, l = Math.abs(d - v) <= f, n = Math.abs(s - w) <= f, r = Math.abs(a - p) <= f, o && (t.position.top = h._convertPositionTo("relative", {
				        top: i,
				        left: 0
				    }).top - h.margins.top), l && (t.position.top = h._convertPositionTo("relative", {
				        top: d - h.helperProportions.height,
				        left: 0
				    }).top - h.margins.top), n && (t.position.left = h._convertPositionTo("relative", {
				        top: 0,
				        left: s
				    }).left - h.margins.left), r && (t.position.left = h._convertPositionTo("relative", {
				        top: 0,
				        left: a - h.helperProportions.width
				    }).left - h.margins.left)), !h.snapElements[c].snapping && (o || l || n || r || g) && h.options.snap.snap && h.options.snap.snap.call(h.element, e, C.extend(h._uiHash(), {
				        snapItem: h.snapElements[c].item
				    })), h.snapElements[c].snapping = o || l || n || r || g)
				}
			}), C.gui.plugin.add("gdrag", "stack", {
	        start: function() {
	            var t, e = this.data("gui-gdrag").options,
	                o = C.makeArray(C(e.stack)).sort(function(e, t) {
	                    return (parseInt(C(e).css("zIndex"), 10) || 0) - (parseInt(C(t).css("zIndex"), 10) || 0)
	                });
	            o.length && (t = parseInt(C(o[0]).css("zIndex"), 10) || 0, C(o).each(function(e) {
	                C(this).css("zIndex", t + e)
	            }), this.css("zIndex", t + o.length))
	        }
	    }), C.gui.plugin.add("gdrag", "zIndex", {
	        start: function(e, t) {
	            var o = C(t.helper),
	                l = C(this).data("gui-gdrag").options;
	            o.css("zIndex") && (l._zIndex = o.css("zIndex")), o.css("zIndex", l.zIndex)
	        },
	        stop: function(e, t) {
	            var o = C(this).data("gui-gdrag").options;
	            o._zIndex && C(t.helper).css("zIndex", o._zIndex)
	        }
	    })
	    
	    

	}(jQuery);
	

/*

	var breakCards = true;
	var searchVisible = 0;
	var transparent = true;
	var transparentDemo = true;
	var fixedTop = false;
	var mobile_menu_visible = 0,
		mobile_menu_initialized = false,
		toggle_initialized = false,
		bootstrap_nav_initialized = false;

	var seq = 0, delays = 80, durations = 500;
	var seq2 = 0, delays2 = 80, durations2 = 500;

*/


	md = {
	    misc:{
	        navbar_menu_visible: 0,
	        active_collapse: true,
	        disabled_collapse_init: 0,
	    },

	    checkSidebarImage: function(){
	        $sidebar = $('.sidebar');
	        image_src = $sidebar.data('image');

	        if(image_src !== undefined){
	            sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>';
	            $sidebar.append(sidebar_container);
	        }
	    },


	    initMinimizeSidebar:function(){

	        $('#minimizeSidebar').click(function(){
	            var $btn = $(this);

	            if(md.misc.sidebar_mini_active == true){
	                $('body').removeClass('sidebar-mini');
	                md.misc.sidebar_mini_active = false;
	            }else{
	                $('body').addClass('sidebar-mini');
	                md.misc.sidebar_mini_active = true;
	            }
	/*
	            // we simulate the window Resize so the charts will get updated in realtime.
	            var simulateWindowResize = setInterval(function(){
	                window.dispatchEvent(new Event('resize'));
	            },180);

	            // we stop the simulation of Window Resize after the animations are completed
	            setTimeout(function(){
	                clearInterval(simulateWindowResize);
	            },1000);
	            */
	        });
	    },

	    startAnimationForLineChart: function(chart){

	        chart.on('draw', function(data) {
	          if(data.type === 'line' || data.type === 'area') {
	            data.element.animate({
	              d: {
	                begin: 600,
	                dur: 700,
	                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
	                to: data.path.clone().stringify(),
	                easing: Chartist.Svg.Easing.easeOutQuint
	              }
	            });
	          } else if(data.type === 'point') {
	                seq++;
	                data.element.animate({
	                  opacity: {
	                    begin: seq * delays,
	                    dur: durations,
	                    from: 0,
	                    to: 1,
	                    easing: 'ease'
	                  }
	                });
	            }
	        });

	        seq = 0;
	    },
	    startAnimationForBarChart: function(chart){

	        chart.on('draw', function(data) {
	          if(data.type === 'bar'){
	              seq2++;
	              data.element.animate({
	                opacity: {
	                  begin: seq2 * delays2,
	                  dur: durations2,
	                  from: 0,
	                  to: 1,
	                  easing: 'ease'
	                }
	              });
	          }
	        });
	        seq2 = 0;
	    }
	}


	// 소스뷰 영역
	function initModal(strId){
		var modalCfg = {
				modalSessionID : strId,
				modalID : strId,
				disabled: false,
				axisContainment:true,
				cssClass: 'codeView',
				animate: 0,
				relativeTo: 'body',
				message: "<div class='codeView-title'>"+strId+"</div>"+
						"<div class='no-drag' id='_"+strId+"' style='width:"+($(".wrap-maincontents").outerWidth(true)*0.6)+"px;height:"+(window.innerHeight*0.7)+"px;'>"+
						"</div>",
				position: ['center', 'inside'],
				positionNAN: null,
				fade:100,
			},
			btnObj = {};
		
		switch(strId){
			case "CodeView" : {
				btnObj["confirm"] = {
					text: '소스변경',
					"class" : "btn-strong",
					//style: "background-color:#e91e63 !important; border-radius: 3px; border : 0px;  margin-top: 10px; margin-right:10px; padding: 8px 30px; font-size: 14px; font-weight: 600;",
					style: "border-radius: 3px; margin-top: 10px; margin-right:10px; padding: 8px 30px; font-size: 14px; font-weight: 600;",
					onClick: function () {
						$().ibModal({ modalID:strId, show: false });
						// console.log(window["_"+strId+"Editor"].getValue());
						eval("window['LoadPage'] = window['_'+strId+'Editor'].getValue()");

						if(Grids[0] != undefined){
							Grids[0].Reset();
							// sourceview 에서 sheet Reset하면 SearchMethod가 날아감
							if(Grids[0].SearchMethod == '' || Grids[0].SearchMethod == undefined){
								Grids[0].SearchMethod = 'GET';
							}
						}
						
						eval(LoadPage);
						eval(LoadPage());
						
					}
				}
				break;
			}
			case "DataView" : {
				btnObj["dataConfirm"] = {
					text: '데이터변경',
					"class" : "btn-strong",
					//style: "background-color:#e91e63 !important; border-radius: 3px; border : 0px;  margin-top: 10px; margin-right:10px; padding: 8px 30px; font-size: 14px; font-weight: 600;",
					style: "border-radius: 3px; margin-top: 10px; margin-right:10px; padding: 8px 30px; font-size: 14px; font-weight: 600;",
					onClick: function () {
						$().ibModal({ modalID:strId, show: false });
						eval("window['jsonData'] = " + window["_"+strId+"Editor"].getValue());
						if(Grids[0] != undefined){
							Grids[0].LoadSearchData(window["jsonData"]);
						}

					}
				}
				break;
			}
			case "wizard" :{
				
			}
			default : {
				
			}
		}
		
		modalCfg["buttons"] = $.extend(btnObj, {
			hide: {
				text: '닫기',
				"class" : "btn-strong",
				//style: "background-color:#319bff !important; border-radius: 3px; border : 0px;  margin-top: 10px; margin-right:10px; padding: 8px 30px; font-size: 14px; font-weight: 600;",
				style: "border-radius: 3px; margin-top: 10px; margin-right:10px; padding: 8px 30px; font-size: 14px; font-weight: 600;",
				onClick: function () {
					$().ibModal({ modalID:strId, show: false })
				}
			},
			ok : {},
			cancel : {}
		})
		
		$().ibModal(modalCfg)
	}

	function initEdit(strId){
		var editor = ace.edit(strId);
		window[strId+"Editor"] = editor;
		
		/*
			editor.setTheme("ace/theme/clouds_midnight");
			editor.setTheme("ace/theme/chaos");
			editor.setTheme("ace/theme/cobait");
			editor.setTheme("ace/theme/crimson_editor");
			editor.setTheme("ace/theme/dawn");
			editor.setTheme("ace/theme/dracula");
			editor.setTheme("ace/theme/dreamweaver");
			editor.setTheme("ace/theme/eclipse");
			editor.setTheme("ace/theme/github");
			editor.setTheme("ace/theme/gob");
			editor.setTheme("ace/theme/gruvbox");
			editor.setTheme("ace/theme/idle_fingers");
			editor.setTheme("ace/theme/iplastic");
			editor.setTheme("ace/theme/katzenmilch");
			editor.setTheme("ace/theme/kr_theme");
			editor.setTheme("ace/theme/kuroir");
			editor.setTheme("ace/theme/merbivore_soft");
			editor.setTheme("ace/theme/merbivore");
			editor.setTheme("ace/theme/mono_industrial");
			editor.setTheme("ace/theme/monokai");
			editor.setTheme("ace/theme/pastel_on_dark");
			editor.setTheme("ace/theme/solarized_dark");
			editor.setTheme("ace/theme/solarized_light");
			editor.setTheme("ace/theme/sqlserver");
			editor.setTheme("ace/theme/terminal");
			editor.setTheme("ace/theme/textmate");
			editor.setTheme("ace/theme/tomorrow_night_blue");
			editor.setTheme("ace/theme/tomorrow_night_bright");
			editor.setTheme("ace/theme/tomorrow_night_eighties");
			editor.setTheme("ace/theme/tomorrow_night");
			editor.setTheme("ace/theme/tomorrow");
			editor.setTheme("ace/theme/twilight");
			editor.setTheme("ace/theme/vibrant_ink");
			editor.setTheme("ace/theme/xcode");
			editor.setTheme("ace/theme/worker-coffee");
			editor.setTheme("ace/theme/worker-css");
			editor.setTheme("ace/theme/worker-html");
			editor.setTheme("ace/theme/worker-javascript");
			editor.setTheme("ace/theme/worker-json");
			editor.setTheme("ace/theme/worker-lua");
			editor.setTheme("ace/theme/worker-php");
			editor.setTheme("ace/theme/worker-xml");
		 */
		
		editor.setTheme("ace/theme/javascript");
		
		// editor.setTheme("ace/theme/worker-javascript");
		// editor.setTheme("ace/theme/textmate");
		// editor.setTheme("ace/theme/chrome"); //*
		
		editor.session.setMode("ace/mode/javascript");
		
		if(strId == "_CodeView"){
			editor.setValue(window["LoadPage"].toString(), 1);
		}else if(strId == "_DataView"){
			if(window["jsonData"] == undefined && window["jsonData"] == null){
				window["jsonData"] = Grids[0].GetSaveJson("all");
				editor.setValue(JSON.stringify(jsonData, null, '\t' ), 1);
			}else{
				editor.setValue(JSON.stringify(jsonData, null, '\t' ), 1);
			}
		}else{
			
		}
		
		
	}


	
	
	