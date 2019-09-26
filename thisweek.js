function buildTable() {
	$.ajax({
		url: "getAllJobs.php",
		dataType: "json",
		type: "get",
		success: function(result) {
			if (result != null) {
				result.forEach(function(job) {
					var row = "<tr><td>" + convertDashDateToSpace(job.job_date) + "</td><td>$";
					var currentCost = parseFloat(job.cost).toFixed(2);
					row += currentCost + "</td><td>";
					if (job.type != "mow") {
						row += "<button type='button' class='btn btn-outline-primary'"; 
						row += " onclick='getBilling(" + job.id + ")'>" + job.type + "</button></td>";
					} else {
						row += job.type + "</td>";
					}
					row += "<td><button type='button' class='btn btn-outline-primary'";
					row += " onclick='getClientInfo(" + job.client_id + ")'>" + job.firstName + "</button></td>";
					row += "<td><button type='button' class='btn btn-outline-primary' ";
					row += "onclick='getAddressInfo(" + job.address_id + ")'>" + job.address1 + "</button></td>";
					row += "<td><div class='form-check'><input type='checkbox' class='form-check-input' ";
					row += "onclick='complete(" + job.id + ")' value='" + job.complete + "'></div></td>";
					row += "<td><button type='button' class='btn btn-outline-warning' onclick='editJob(";
					row += job.id + ")'><span class='glyphicon glyphicon-pencil'></span></button>&nbsp;";
					row += "<button type='button' class='btn btn-outline-danger' onclick='removeJob(";
					row += job.id + ")'><span class='glyphicon glyphicon-remove'></span></td></tr>";
					$('#clients tr:last').after(row);
				});
			}
		}
	});
}

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
				result.forEach(function(job) {
					$('#editJob').val(job.id);
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

function removeJob(id) {

	$.ajax({
		url: "getJobDetailsForId.php",
		dataType: "json",
		type: "post",
		data: {
			"id": id
		},
		success: function(result) {
			if (result != null) {
				result.forEach(function (job) {
					var jobDate = convertDashDateToSpace(job.job_date);
					var message = "Remove the job for " + job.firstName + " at ";
					message += job.address1 + " on " + jobDate + ".";
					$('#rmJobMsg').text(message);
					$('#successRemoveJob').modal('show');
					$('#rmJobId').val(id);
				});
			}
		}	
	});
}

function complete(id) {
	$.ajax({
		url: "toggleJobComplete.php",
		type: "post",
		data: {
			"id": id
		}
	})
}

function convertDashDateToSpace(currentDate) {
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var dateSection = currentDate.split('-');
	var day = dateSection[2];
	var month = months[parseInt(dateSection[1]) - 1];
	var year = dateSection[0];
	return day + " " + month + " " + year;
}

function parseDate(input) {
	var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	var dateSection = input.split('-');
	var day = dateSection[0];
	var month = months.indexOf(dateSection[1].toLowerCase()) + 1;
	var year = dateSection[2];
	return year + ":" + month + ":" + day;
}

function getAddressInfo(id) {
	$.ajax({
		url: "getAddressForId.php",
		dataType: "json",
		type: "post",
		data: {
			"id": id
		},
		success: function(result) {
			if (result != null) {
				result.forEach(function (address) {
					$('#showAddressInfoModal').modal('show');
					$('#addressHeading').text(address.address1);
					$('#addressInfoAddresses').text(address.address1 + "\n" + address.address2);
					$('#addressInfoCity').text(address.city);
					$('#addressInfoState').text(address.state);
					$('#addressInfoZip').text(address.zipcode);
				});
				
			}
		}	
	});
}

function getClientInfo(id) {
	$.ajax({
		url: "getClientNameForId.php",
		dataType: "json",
		type: "post",
		data: {
			"id": id
		},
		success: function(result) {
			if (result != null) {
				result.forEach(function (client) {
					$('#showClientInfoModal').modal('show');
					$('#clientNameHeading').text(client.firstName);
					$('#clientInfoName').text(client.firstName + " " + client.lastName);
					$('#clientInfoPhone').text(client.phone);
					$('#clientInfoEmail').text(client.email);
				});
				
			}
		}	
	});
}

function setupDropDowns() {
	
	$.ajax({
		url: "getAllTypes.php",
		dataType: "json",
		success: function (data) {
			if (data != null) {
				$('#editJobType').empty();
				$('#addJobType').empty();
				data.forEach(function (type) {
					$('#editJobType').append($('<option>').text(type.type).val(type.id));
					$('#addJobType').append($('<option>').text(type.type).val(type.id));
				});
			}
			getAllClients();
		}	
	});
	
}

function getAllClients() {
	$.ajax({
		url: "getAllClients.php",
		dataType: "json",
		success: function (data) {
			if (data != null) {
				$('#editClient').empty();
				$('#addClient').empty();
				data.forEach(function (client) {
					var cname = client.firstName + " " + client.lastName;
					$('#editClient').append($('<option>').text(cname).val(client.id));
					$('#addClient').append($('<option>').text(cname).val(client.id));
				});
			}
			getAllAddresses();
		}	
	});	
}

function getAllAddresses() {
	$.ajax({
		url: "getAllAddresses.php",
		dataType: "json",
		success: function (data) {
			if (data != null) {
				$('#editAddressSelector').empty();
				$('#addAddressSelector').empty();
				data.forEach(function (address) {
					var address = address.address1;

					$('#editAddressSelector').append($('<option>').text(address).val(address.id));
					$('#addAddressSelector').append($('<option>').text(address).val(address.id));
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

function clearAddModal() {
	$('#addShowDate').val();
	$('#cost').val();
	$('#addJobType').val();
	$('#addClient').val();
	$('#addAddressSelector').val();
}

$(document).ready(function() {
	
	setupDropDowns();
	buildTable();
	
	// Remove Job section
	
	$('#rmSuccessCancelBtn').on("click", function() {
		$('#rmJobMsg').text();
		$('#rmJobId').val();
		$('#successRemoveJob').modal('hide');
	});
	
	// Edit Job section
	
	$('#cancelEditJobBtn').on("click", function() {
		$('#editJobModal').modal('hide');	
	});
	
	$('#pushEditJobDB').on("click", function() {
		var editDate = $('#editJobDate').val();
		var editCost = $('#editCost').val();
		var editJobType = $('#editJobType').val();
		var editClient = $('#editClient').val();
		var editAddress = $('#editAddressSelector').val();
		var editJobId = $('#editJob').val();
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
	
	// Add Job section
	
	$('#pushJobDB').on("click", function() {
		var currentDate = $('#addShowDate').val();
		var cost = $('#cost').val();
		var jobType = $('#addJobType').val();
		var clientId = $('#addClient').val();
		var addressId = $('#addAddressSelector').val();
		$.ajax({
			url: "addJob.php",
			type: "post",
			data: {
				"date": currentDate,
				"cost": cost,
				"jobType": jobType,
				"client": clientId,
				"address": addressId
			},
			succcess: function(id) {
				$('#addJobModal').modal('hide');
				if (jobType != "1" && id != 0) {
					$('#addBillingModal').modal('show');
					$('#addBillingJobId').val(id);
				}
			}	
		});
	});
	
	// modal non-database buttons
	
	$('#rmSuccessBtn').on('click', function() {
		$('#successRemoveJob').modal('hide');
		window.parent.window.location.reload();
	});

	$('#closeClientInfoBtn').on("click", function() {
		$('#showClientInfoModal').modal('hide');	
	});
	
	$('#closeAddressInfoBtn').on("click", function() {
		$('#showAddressInfoModal').modal('hide');	
	});
	
	$('#addJobBtn').on("click", function() {
 		$('#addJobModal').modal('show');
	});
	

	
	// database calls
		
	
	
	$('#rmSuccessBtn').on("click", function() {
		var id = $('#rmJobId').val();
		$.ajax({
			url: "removeJob.php",
			type: "post",
			data: {
				"id": id
			}, 
			success: function() {
				window.parent.window.location.reload();
			}
		});
	});
	
	$('#pushJobDB').on("click", function() {
		var origDate = $('#addJobDate').val();
		var currentDate = parseDate(origDate);		
		var cost = $('#cost').val();
		var jobType = $('#addJobType').val();
		var address = $('#addressSelector').val();
		$.ajax({
			url: "addJob.php",	
			type: "post",
			data: {
				"jobDate": currentDate,
				"cost": cost,
				"jobType": jobType,
				"address": address
			},
			success: function() {
				$('#addJobModal').modal('hide');
				$('successAddJob').modal('show');
			}	
		});
	});
});