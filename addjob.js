function clearAddModal() {
	$('#addShowDate').val();
	$('#cost').val();
	$('#addJobType').val();
	$('#addClient').val();
	$('#addAddressSelector').val();
}

$(document).ready(function () {
	
	$('#addJobBtn').on("click", function() {
		clearAddModal();
		$('#addJobModal').modal('show');
		getAllTypes($('#addJobType'));
		getAllClients($('#addClient'));
		getAllAddresses($('#addAddressSelector'));
	});	
	
	$('#pushJobDB').on("click", function() {
		var rawDate = $('#addJobDate').val();
		var currentDate = reverseDate(rawDate);
		var cost = $('#cost').val();
		var jobType = $('#addJobType').val();
		var clientId = $('#addClient').val();
		var addressId = $('#addAddressSelector').val();
		$.ajax({
			url: "addJob.php",
			type: "post",
			data: {
				"jobDate": currentDate,
				"cost": cost,
				"jobType": jobType,
				"client": clientId,
				"address": addressId
			},
			success: function(id) {
				$('#addJobModal').modal('hide');
				buildTable();
				if (jobType != "1" && id != 0) {
					$('#addBillingModal').modal('show');
					$('#addBillingJobId').val(id);
				}
			}	
		});
	});
});
