function editJob(id) {
	getAllTypes($('#editJobType'));
	getAllClients($('#editClientSelector'));
	getAllAddresses($('#editAddressSelector'));
	$.ajax({
		url: "repos/getJobForId.php",
		dataType: "json",
		type: "post",
		data: {
			"id": id
		},
		success: function(result) {
			if (result != null) {
				$('#editJobModal').modal('show');	
				var job = result[0];
				$('#hdnEditJob').val(job.id);
				$('#editJobDate').val(job.job_date);
				$('#editCost').val(parseFloat(job.cost).toFixed(2));
				$('#editJobType').val(job.type_id);
				$('#editClientSelector').val(job.client_id);
				$('#editAddressSelector').val(job.address_id);
				$('#editBillingBtn').prop('disabled', job.uses_material == "1" ? true : false);
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
		buildJobTable();
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
				buildJobTable();
			}	
		});
	});
});
