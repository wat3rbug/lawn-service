$(document).ready(function() {

	$.ajax({
		url: "getSidebar.php",
		type: "get",
		success: function(data) {
			$('#sidebar').append(data);
		}
	});
});