<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<footer class="footer" >
	<div class="container-fluid">
		<nav class="pull-left">
			<ul>
				<!-- <li><a href="#" id="footerDesc"> Description </a></li> -->
				<li><a href="#" id="footerCodeView"> CodeView </a></li>
				<li><a href="#" id="footerDataView"> Data </a></li>
			</ul>
		</nav>
		<p class="copyright pull-right">
			&copy;
			<script>document.write(new Date().getFullYear())</script>
			IB Leaders Co., Ltd.,  All rights reserved. Tel:02-2621-2088~9 Fax : 02-2621-2088
		</p>
	</div>
</footer>
<script type="text/javascript">
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
	$(document).ready(function(){
		$("#footerCodeView").click(function(){
			initModal("CodeView");
			initEdit("_CodeView");
		})
		
		$("#footerDataView").click(function(){
			initModal("DataView");
			initEdit("_DataView");
		})
	})
</script>