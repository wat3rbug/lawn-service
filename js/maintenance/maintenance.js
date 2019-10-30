$(document).ready(function () {

	listAllMachines();
	$('#addMachineBtn').on("click", function() {
		var name = $('#machineName').val();
		addMachine(name);
	});
});

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
	})
}