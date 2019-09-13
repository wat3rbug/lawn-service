function setupDropDowns() {
	
	// setup address dropdowns
	
	$.ajax({
		url: "getAllAddresses.php",	
		dataType: "json",
		type: "get",
		success: function(result) {
			if (result != null) {
				$('#addressSelector').empty();
				result.forEach(function(address) {
					var message = address.address1;
					if (address.address2 != null) message += " " + address.address2;
					message += " " + address.city + ", " + address.state;
					message += " " + address.zipcode; 
					$('#addressSelector').append($('<option>').text(message).val(address.id));
				});
			}
			
		}
	});
	// setup type dropdown
	
	$.ajax({
		url: "getAllTypes.php",
		dataType: "json",
		type: "get",
		success: function(result) {
			if (result != null) {
				$('#addJobType').empty();
				result.forEach(function(type) {
					$('#addJobType').append($('<option>').text(type.type).val(type.id));
				});
			}		
		}	
	});
}

$(document).ready(function() {
	
	setupDropDowns();
		
	// modal non-database buttons
	
	$('#addJobBtn').on("click", function() {
 		$('#addJobModal').modal('show');
	});
	
	$('#cancelJobBtn').on("click", function() {
		$('#addJobModal').modal('hide');
	});
	$('#addJobDate').datetimepicker({ format: 'DD-MMM-YYYY'});
	
	// database calls
	
	$('#pushJobDB').on("click", function() {
		var currentDate = $('#addJobDate').val();
		var cost = $('#cost').val();
		var jobType = $('#addJobType').val();
		var address = $('#addressSelector').val();
			$.ajax({
				url: "addJob.php",	
				type: "post",
				dataType: "json",
				data: {
					"jobDate": currentDate,
					"cost": cost,
					"jobType": jobType,
					"address": address
				},
				success: function() {
					$('#addJobModal').modal('hide');
					$('successAddjob').modal('show');
				}	
			});
	});
});