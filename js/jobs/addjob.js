function clearAddModal() {
	$('#addShowDate').val();
	$('#cost').val();
	$('#addJobType').val();
	$('#addClient').val();
	$('#addAddressSelector').val();
}

function todaysDate() {
	var today = new Date();
	var d = today.getDate().toString();
	var m = (today.getMonth() + 1);
	var yyyy = today.getFullYear();
	return  d + "-" + m + "-" + yyyy;
}

function initAddJobModal() {
	
	// NOTE this is massive, there is need to remove the cascades to make loading 3 dropdowns easier to read
	clearAddModal();
	var noneSelected = '--- None Selected ---';
	$('#addJobModal').modal('show');
	$('#addJobDate').val(todaysDate);
	$.ajax({ 
		url: "getAllTypes.php",
	    dataType: "json",
		success: function (data) {
			if (data != null) {
				$('#addJobType').empty();
				$('#addJobType').append($('<option>').text(noneSelected).val("0"));
				$('#addJobType').val("0");
				data.forEach(function (type) {
					$('#addJobType').append($('<option>').text(type.type).val(type.id));
				});
			}
		}
	});
	$.ajax({
		url: "getAllClients.php",
		dataType: "json",
		success: function (data) {
			if (data != null) {
				$('#addClient').empty();
				$('#addClient').append($('<option>').text(noneSelected).val("0"));
				$('#addClient').val("0");
				data.forEach(function (client) {
					var cname = client.firstName + " " + client.lastName;
					$('#addClient').append($('<option>').text(cname).val(client.id));
				});
			}
		}
	});
	$.ajax({
		url: "getAllAddresses.php",
		dataType: "json",
		success: function (data) {
			if (data != null) {
				$('#addAddressSelector').empty();
				$('#addAddressSelector').append($('<option>').text(noneSelected).val("0"));
				$('#addAddressSelector').val("0");
				data.forEach(function (address) {
					$('#addAddressSelector').append($('<option>').text(address.address1).val(address.id));
				});								
			}
		}	
	});
}

function prepDateForDB(currentDate) {
	var sections = currentDate.split('-');
	var m = sections[1];
	var d = sections[0];
	var yyyy = sections[2];
	return yyyy + "-" + m + "-" + d;
}

$(document).ready(function () {
	
	$('#addJobBtn').on("click", function() {
		initAddJobModal();
	});	
	
	$('#pushJobDB').on("click", function() {
		var rawDate = $('#addJobDate').val();
		var currentDate = prepDateForDB(rawDate);
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
				buildJobTable();
			}	
		});
	});
});
