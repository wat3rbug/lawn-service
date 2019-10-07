function editJob(id) {
	$.ajax({
		url: "getJobForId.php",
		dataType: "json",
		type: "post",
		data: {
			"id": id
		},
		success: function(result) {
			if (result != null) {
				$('#editJobModal').modal('show');
				getAllAddresses($('#editAddressSelector'));
				getAllTypes($('#editJobType'));
				getAllClients($('#editClient'));	
				result.forEach(function(job) {
					$('#hdnEditJob').val(job.id);
					$('#editJobDate').val(job.job_date);
					$('#editCost').val(parseFloat(job.cost).toFixed(2));
					$('#editJobType').val(job.type_id);
					$('#editClient').val(job.client_id);
					$('#editAddress').val(job.address_id);
				});
			}		
		}
	});
}

function clearEditModal() {
	$('#editShowDate').val();
	$('#editCost').val();
	$('#editJobType').val();
	$('#editClient').val();
	$('#editAddressSelector').val();
}

$(document).ready(function () {
	$('#cancelEditJobBtn').on("click", function() {
		$('#editJobModal').modal('hide');
	});

	$('#pushEditJobDB').on("click", function() {
		var editDate = $('#editJobDate').val();
		var editCost = $('#editCost').val();
		var editJobType = $('#editJobType').val();
		var editClient = $('#editClient').val();
		var editAddress = $('#editAddressSelector').val();
		var editJobId = $('#hdnEditJob').val();
		$.ajax({
			url: "editJob.php",
			type: "post",
			data: {
				"id": editJobId,
				"address": editAddress,
				"client": editClient,
				"jobType": editJobType,
				"cost": editCost,
				"editDate": editDate
			},
			success: function() {
				$('#editJobModal').modal('hide');
				clearEditModal();
				window.parent.window.location.reload();
			}	
		});
	});
});
