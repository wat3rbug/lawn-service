$(document).ready(function (){

	buildTable();
	
	$('#rmSuccessBtn').on("click", function() {
		var id = $('#rmJobId').val();
		$.ajax({
			url: "removeJobType.php",
			type: "post",
			data: {
				"id": id
			},
			success: function() {
				$('#successRemoveJobType').modal('hide');
				buildTable();
			}
		})	
	});
	
	$('#rmSuccessCancelBtn').on("click", function() {
		$('#successRemoveJobType').modal('hide');
	});
	
	// Add Job Type section
	
	$('#addTypeBtn').on("click", function() {
		$('#addJobTypeModal').modal('show');
		$('#addJobType').val();	
	});
	
	$('#cancelJobTypeBtn').on("click", function() {
		$('#addJobTypeModal').modal('hide');
	});
	
	$('#pushJobTypeDB').on("click", function() {
		var type = $('#addJobType').val();	
		$.ajax({
			url: "addJobType.php",
			type: "post",
			data: {
				"type": type
			},
			success: function() {
				$('#addJobTypeModal').modal('hide');
				buildTable();
			}	
		});
	});
	
	// Remove Job Type section
	
	$('#rmSuccessCancelBtn').on("click", function() {
		$('#successRemoveJobType').modal('hide');
	});
	
	$('#rmSuccessBtn').on("click", function() {
		var id = $('#rmJobId').val();
		$.ajax({
			url: "removeJobType.php",
			type: "post",
			data: {
				"id": id
			}, 
			success: function() {
				$('#successRemoveJobType').modal('hide');
				buildTable();
			}	
		});
	});
	
	// Edit Job Type section
	
	$('#cancelEditJobBtn').on("click", function() {
		$('#editJobTypeModal').modal('hide');
	});
	
	$('#pushEditJobTypeDB').on("click", function() {
		var id = $('#hdnEditJob').val();
		var type = $('#editJobType').val();
		$.ajax({
			url: "editJobType.php",
			type: "post",
			data: {
				"id": id,
				"type": type
			}, 
			success: function() {
				$('#editJobTypeModal').modal('hide');
				buildTable();
			}
		})	
	});
	//$('editType').on("click", editType());
});

function buildTable() {
	$.ajax({
		url: "getAllTypes.php",
		dataType: "json",
		type: "post",
		success: function(data) {
			if (data != null) {
				$('#jobtypes').find('tbody tr').remove();
				data.forEach(function(jobType) {
					var row = "<tr><td>" + jobType.type + "</td><td class='text-right'>";
					row += "<button type='button' class='btn btn-outline-warning' onclick='editType(" + jobType.id + ")'>";
					row += "<span class='glyphicon glyphicon-pencil'></span></button>&nbsp;";
					row += "<button type='button' class='btn btn-outline-danger' onclick='removeType(" + jobType.id + ")'>";
					row += "<span class='glyphicon glyphicon-remove'></span></button></td></tr>";
					$('#jobtypes').append(row);
				});
			}
		}	
	});
}

function removeType(id) {
	$.ajax({
		url: "getJobTypeById.php",
		dataType: "json",
		type: "get",
		data: { 
			"id": id
		},
		success: function(result) {
			if (result != null) {
				result.forEach(function(type) {
					$('#successRemoveJobType').modal('show');
					$('#rmJobId').val(type.id);
					$('#rmJobMsg').text("Remove " + type.type);
				});				
			}		
		}	
	});
}

function editType(id) {	
	$.ajax({
		url: "getJobTypeById.php",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(result) {
			if (result != null) {
				$('#editJobTypeModal').modal('show');
				result.forEach(function(type){
					$('#hdnEditJob').val(id);
					$('#editJobType').val(type.type);
				});
			}			
		}		
	});
}