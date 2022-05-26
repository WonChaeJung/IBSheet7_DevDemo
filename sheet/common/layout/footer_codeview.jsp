<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<footer class="footer" >
	<div class="container-fluid">
		<nav class="pull-left">
			<ul>
				<!-- <li><a href="#" id="footerDesc"> Description </a></li> -->
				<li><a href="#" id="footerCodeView"> CodeView </a></li>
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
	$(document).ready(function(){
		$("#footerCodeView").click(function(){
			initModal("CodeView");
			initEdit("_CodeView");
		})
		
	})
</script>