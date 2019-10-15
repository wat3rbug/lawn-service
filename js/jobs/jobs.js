function buildJobTable() {
	$.ajax({
		url: "repos/getAllJobs.php",
		dataType: "json",
		type: "get",
		success: function(result) {
			if (result != null) {
				$('#clients').find('tbody tr').remove();
				result.forEach(function(job) {
					var row = "<tr><td>" + spaceDate(job.job_date) + "</td><td>$";
					var currentCost = parseFloat(job.cost).toFixed(2);
					row += currentCost + "</td><td>";
					if (job.uses_material != "1") {
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
} //used 


function removeJob(id) {

	$.ajax({
		url: "repos/removeJob.php",
		type: "post",
		data: {
			"id": id
		},
		success: function(result) {
			buildJobTable();
		}	
	});
} // used

function complete(id) {
	$.ajax({
		url: "repos/toggleJobComplete.php",
		type: "post",
		data: {
			"id": id
		}
	});
} // used

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
} // used

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
} // used

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
} // used

$(document).ready(function() {
	
	buildJobTable();
	buildJobTypeTable();
	
	$('#editJobDate').datepicker({
		format: 'd-m-yyyy', 
		autoclose: true,
		orientation: "top auto",
		todayHighlight: true
	});
	
	$('#addJobDate').datepicker({
		format: 'd-m-yyyy', 
		autoclose: true,
		orientation: "top auto",
		todayHighlight: true
	});
	// info section

	$('#closeClientInfoBtn').on("click", function() {
		$('#showClientInfoModal').modal('hide');	
	});
	
	$('#closeAddressInfoBtn').on("click", function() {
		$('#showAddressInfoModal').modal('hide');	
	});	
	
	// job type section
	
	$('#showAddJobTypeModalBtn').on("click", function() {
		$('#addJobTypeModal').modal('show');
	});
	
	$('#addJobTypeCancelBtn').on("click", function() {
		$('#addJobTypeModal').modal('hide');
	});
	
	$('#addJobTypeBtn').on("click", function() {
		addJobType();
		clearAddJobTypeModal();
		$('#addJobTypeModal').modal('hide');	
	}); 
	
	// add job section
	
	$('#cancelJobBtn').on("click", function() {
		clearAddModal();
		$('#addJobModal').modal('hide');
	});
});

// Job Type functions

function clearAddJobTypeModal() {
	$('#addJobType').val();
	$('#addUseMaterials').prop('checked', false);
} 

function addJobType() {
	var type = $('#addJobTypeName').val();
	var useMaterial = $('#addUseMaterials').is(':checked') ? 0 : 1;
	$.ajax({
		url: "repos/addJobType.php",
		type: "post",
		data: {
			"name": type,
			"use": useMaterial
		},
		success: function() {
			buildJobTypeTable();
		}
	});
} 

function removeJobType(id) {
	$.ajax({
		url: "repos/removeJobType.php",
		type: "post",
		data: {
			"id": id
		},
		success: function() {
			buildJobTypeTable();
		}
	});
} 

function buildJobTypeTable() {
	$.ajax({
		url: "repos/getAllTypes.php",
		dataType: "json",
		success: function(result) {
			$('#jobTypeList').find('tbody tr').remove();
			if (result != null) {
				result.forEach(function(type) {
					var row = "<tr><td>" + type.type + "</td><td class='text-right'><input type='checkbox' ";
					row += "class='form-check-input'";
					if (type.uses_material == "0") row +=" checked";
					row += "/></td><td><button type='button' class='btn btn-outline-danger' onclick='removeJobType(";
					row += type.id + ")'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";
					$('#jobTypeList').append(row);
				});
			}
		}	
	});
} 
// view Client information

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

// view Address information

function getAddressInfo(id) {
	$.ajax({
		url: "repos/getAddressForId.php",
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