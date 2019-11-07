$(document).ready(function () {

	listAllMachines();
	listAllChecks();
	
	$('#addMachineBtn').on("click", function() {
		var name = $('#machineName').val();
		addMachine(name);
	});
	// Edit Maintenance Check Section

	$('#editCheckCompleteBtn').on("click", function() {
		pushEditCheckToDB();
	});
	
	$('#editCheckCancelBtn').on("click", function() {
		$('#editCheckModal').modal('hide');	
	});
	
	// Add Maintenance Check Section
	
	$('#addCheckBtn').on("click",function() {
		$('#addCheckModal').modal('show');	
		listMachinesInSelector($('#addMachineSelector'));
	});
	
	$('#addCheckCancelBtn').on("click", function() {
		$('#addCheckModal').modal('hide');	
	});
	
	$('#addCheckCompleteBtn').on("click", function() {
		addCheckToList();
	});
});

function listAllChecks() {
	$.ajax({
		url: "repos/getAllChecks.php",
		dataType: "json",
		success: function(result) {
			$('#checkList').find('tbody tr').remove();
			if (result != null) {
				result.forEach(function(check) {
					var rawdate = new Date(check.last_checked);
					var adjustedDate = rawdate.addDays(parseInt(check.duration_days));
					var dueDate = getWebDateFromDBDate(adjustedDate);
					var row = "<tr><td>" + dueDate + "</td><td>" + check.name + "</td>";
					row += "<td>" + check.description + "</td><td>";
					row += "<div class='form-check'><input type='checkbox' class='form-check-input' onclick='completeCheck(";
					row += check.id + ")'></div></td>";
					row += "<td><button type='button' class='btn btn-outline-warning' onclick='editCheck(";
					row += check.id + ")'><span class='glyphicon glyphicon-pencil'></span></button>";
					row += "&nbsp;<button type='button' class='btn btn-outline-danger' onclick='removeCheck(";
					row += check.id	 + ")'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";
					$('#checkList').append(row);
				});
			}
		}	
	}); 
}

function removeCheck(id) {
	$.ajax({
		url: "repos/removeCheck.php",
		type: "post",
		data: {
			"id": id
		},
		success: function() {
			listAllChecks();
		}	
	});
}

function addCheckToList() {
	var machine = $('#addMachineSelector').val();
	var duration = $('#addDuration').val();
	var description = $('#addDescription').val();
	var today = getTodayForDB();
	$.ajax({
		url: "repos/addCheck.php",
		type: "post",
		data: {
			"machine": machine,
			"duration": duration,
			"description": description,
			"last_checked": today
		},
		success: function() {
			$('#addCheckModal').modal('hide');
			listAllChecks();
		}
	});
}

function listMachinesInSelector(selector) {
	$.ajax({
		url: "repos/getAllMachines.php",
		dataType: "json",
		success: function(result) {
			if (result != null) {
				selector.empty();
				result.forEach(function(machine) {
					selector.append($('<option>').text(machine.name).val(machine.id));	
				});
			}
		}
	});
}

function removeMachine(id) {
	$.ajax({
		url: "repos/removeMachine.php",
		type: "post",
		data: {
			"id": id
		},
		success: function() {
			listAllMachines();
		}	
	});
}

function listAllMachines() {
	$.ajax({
		url: "repos/getAllMachines.php",
		dataType: "json",
		success: function(result) {
			if (result != null) {
				$('#machines').find('tbody tr').remove();
				result.forEach(function(machine){
					var row = "<tr><td>" + machine.name + "</td>";
					row += "<td><button type='button' class='btn btn-outline-danger' onclick='removeMachine(";
					row += machine.id + ")'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";
					$('#machines').append(row);
				});
			}
		}	
	});
}

function addMachine(name) {
	$.ajax({
		url: "repos/addMachine.php",
		type: "post",
		data: {
			"name": name
		},
		success: function() {
			$('#machineName').val('');
			listAllMachines();
		}
	});
}

function completeCheck(id) {
	var today = getTodayForDB();
	$.ajax({
		url: "repos/completeCheck.php",
		type: "post",
		data: {
			"id": id,
			"date": today
		},
		success: function() {
			listAllChecks();	
		}
	});
}

function editCheck(id) {
	$('#editDate').datepicker({
		format: 'd-m-yyyy', 
		autoclose: true,
		orientation: "top auto",
		todayHighlight: true
	});
	$.ajax({
		url: "repos/getCheckById.php",
		dataType: "json",
		type: "post",
		data: {
			"id": id
		},
		success: function(result) {
			if (result != null) {
				$('#editCheckModal').modal('show');
				var check = result[0];
				listMachinesInSelector($('#editMachineSelector'));
				$('#hdnEditCheck').val(check.id);
				$('#editDate').val(check.last_checked);
				$('#editDuration').val(check.duration_days);
				$('#editDescription').val(check.description);
			}
		}	
	});
}

function pushEditCheckToDB() {
	var id = $('#hdnEditCheck').val();
	var currentDate = $('#editDate').val();
	var duration = $('#editDuration').val();
	var description = $('#editDescription').val();
	$.ajax({
		url: "repos/editCheck.php",
		type: "post",
		data: {
			"id": id,
			"date": currentDate,
			"duration": duration,
			"description": description
		},
		success: function() {
			$('#editCheckModal').modal('hide');
			listAllChecks();
		}	
	});
}