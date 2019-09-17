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
function editJob(id) {
	$.ajax({
		url: "getJobForId.php",
		dataType: "json",
		type: "post",
		data: {
			"id": id
		},
		success: function(result){
			if (result != null) {
				$('#editJobModal').modal('show');
				result.forEach(function(job) {
					// under construction
				});
			}		
		}
	});
}

function removeJob(id) {
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
}

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
						row += job.type + "<span class='glyphicon glyphicon-info-sign'></span></td>"; // probably need more like a link or something
					} else {
						row += job.type + "</td>";
					}
					row += "<td><button type='button' class='btn btn-link'";
					row += " onclick='getClientInfo(" + job.client_id + ")'>" + job.firstName + "</button></td>";
					row += "<td><button type='button' class='btn btn-link' ";
					row += "onclick='getAddressInfo(" + job.address_id + ")'>" + job.address1 + "</button></td>";
					row += "<td><span class='glyphicon glyphicon-";
					row += (parseInt(job.complete) == 1) ? "check" : "unchecked";
					row += "'><input type='hidden' class='completeId' value='" + job.id + "'></span></td>";
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

$(document).ready(function() {
	
	
	setupDropDowns();
		
	// modal non-database buttons
	
	$('#cancelEditJobBtn').on("click", function() {
		$('#editJobModal').modal('hide');	
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
	
	$('#cancelJobBtn').on("click", function() {
		$('#addJobModal').modal('hide');
	});
	
	// database calls
	
	buildTable();
	
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