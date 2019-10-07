function buildTable() {
	var start = new Date();
	beginning= dashDateFromLong(start);
	var end = dashDateFromLong(start.addDays(7));
	$.ajax({
		url: "getAllJobsBetweenDates.php",
		dataType: "json",
		type: "get",
		data: {
			"beginning": beginning,
			"end": end
		},
		success: function(result) {
			if (result != null) {
				$('#clients').find('tbody tr').remove();
				result.forEach(function(job) {
					var row = "<tr><td>" + spaceDate(job.job_date) + "</td><td>$";
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
					row += "onclick='complete(" + job.id + ")'";
					if (job.complete == "1") row += " checked";
					row += "></div></td>";
					row += "<td><button type='button' class='btn btn-outline-warning' onclick='editJob(";
					row += job.id + ")'><span class='glyphicon glyphicon-pencil'></span></button>&nbsp;";
					row += "<button type='button' class='btn btn-outline-danger' onclick='removeJob(";
					row += job.id + ")'><span class='glyphicon glyphicon-remove'></span></td></tr>";
					$('#clients').append(row);
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
					var jobDate = spaceDate(job.job_date);
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
Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

function dashDateFromLong(currentDate) {
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth() + 1;
	var day = currentDate.getDate();
	return year + "-" + month + "-" + day;
}

function reverseDate(currentDate) {
	var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	var dateSection = currentDate.split('-');
	var day = dateSection[2];
	var month = months.indexOf(dateSection[1].toLowerCase()) + 1;
	var year = dateSection[0];
	return day + "-" + month + "-" + year;
}

function spaceDate(currentDate) {
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var dateSection = currentDate.split('-');
	var day = dateSection[2];
	var month = months[parseInt(dateSection[1]) - 1];
	var year = dateSection[0];
	return day + " " + month + " " + year;
}

function colonDate(input) {
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

function getAllTypes(selector) {
	
	$.ajax({
		url: "getAllTypes.php",
		dataType: "json",
		success: function (data) {
			if (data != null) {
				selector.empty();
				data.forEach(function (type) {
					selector.append($('<option>').text(type.type).val(type.id));
				});
			}
		}	
	});
	
}

function getAllClients(selector) {
	$.ajax({
		url: "getAllClients.php",
		dataType: "json",
		success: function (data) {
			if (data != null) {
				selector.empty();
				data.forEach(function (client) {
					var cname = client.firstName + " " + client.lastName;
					selector.append($('<option>').text(cname).val(client.id));
				});
			}
		}	
	});	
}

function getAllAddresses(selector) {
	$.ajax({
		url: "getAllAddresses.php",
		dataType: "json",
		success: function (data) {
			if (data != null) {
				selector.empty();
				data.forEach(function (address) {
					selector.append($('<option>').text(address.address1).val(address.id));
				});
			}
		}	
	});
}

$(document).ready(function() {
	
	buildTable();
	
	// Remove Job section
	
	$('#rmSuccessCancelBtn').on("click", function() {
		$('#rmJobMsg').text();
		$('#rmJobId').val();
		$('#successRemoveJob').modal('hide');
	});

	// modal non-database buttons

	$('#closeClientInfoBtn').on("click", function() {
		$('#showClientInfoModal').modal('hide');	
	});
	
	$('#closeAddressInfoBtn').on("click", function() {
		$('#showAddressInfoModal').modal('hide');	
	});
	
	
	
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
});