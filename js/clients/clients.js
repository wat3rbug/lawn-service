

function removeClient(id) {
	$.ajax({
		url: "repos/removeClient.php",
		type: "post",
		data: {
			"id": id
		},
		success: function() {
			buildClientTable();
		}	
	});
}

function editClient(id) {
	$.ajax({
		url: "repos/getClientForId.php",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(data) {
			var client = data[0];
			$('#editFirstName').val(client.firstName);
			$('#editLastName').val(client.lastName);
			$('#editClientId').val(client.id);
			$('#editPhone').val(client.phone);
			$('#editEmail').val(client.email);
			$('#addressEditSelector').val(client.billing);
 			$('#editClientModal').modal('show');
		}
	});
}

function cleanAddModal() {
	$('#firstName').val();
	$('#lastName').val();
	$('#email').val();
	$('#phone').val();
	$('#addAddressSelector').val();
}

$(document).ready(function() {
	
	// Add client section
	
	buildClientTable();
	
	$('#addClientBtn').on("click", function() {
		$('#addClientModal').modal('show');	
	});
	
	$('#addClientCancelBtn').on("click", function() {
		$('#addClientModal').modal('hide');	
	});
	
	$('#pushClientDB').on("click", function() {
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		var email = $('#email').val();
		var phone = $('#phone').val();
		var billing = $('#addAddressSelector').val();
		$.ajax({
			url: "repos/addClient.php",
			type: "post",
			data: {
				"firstname": firstName,
				"lastname": lastName,
				"email": email,
				"phone": phone,
				"billing": billing
			},
			success: function() {
				cleanAddModal();
				$('#addClientModal').modal('hide');
				window.parent.window.location.reload();
			}	
		});
	});
	
	// Edit client section
	
	$('#editClientCancelBtn').on("click", function() {
		$('#editClientModal').modal('hide');	
	});
	
	$('#cancelClientEditBtn').on("click", function() {
		$('#editClientModal').modal('hide');
		$('#editFirstName').val();
		$('#editLastName').val();
		$('#editClientId').val();
		$('#editPhone').val();
		$('#editEmail').val();
	});
	
	$('#pushClientDBEdit').on("click", function() {
		var id = $('#editClientId').val();
		var firstName = $('#editFirstName').val();
		var phone = $('#editPhone').val();
		var lastName = $('#editLastName').val();
		var email = $('#editEmail').val();
		var billing = $('#addressEditSelector').val();
		$.ajax({
			url: "repos/editClient.php",
			type: "post",
			data: {
				"id": id,
				"firstName": firstName,
				"lastName": lastName,
				"phone": phone,
				"email": email,
				"billing": billing
			},
			success: function() {
				window.parent.window.location.reload();
			}
		});
	});
	
	// Remove client section
	
	$('#rmSuccessCancelBtn').on("click", function() {
		$('#successRemoveClient').modal('hide');	
		cleanRemoveModal();
	});
	
	$('#rmSuccessBtn').on("click", function() {
		var id = $('#rmClientId').val();
		$.ajax({
			url: "repos/removeClient.php",
			type: "post",
			data: {
				"id": id
			},
			success: function() {
				cleanRemoveModal();
				window.parent.window.location.reload();
			}	
		});
	});
	
	// setup table of clients
	
	
	
	$.ajax({
		url: "repos/getAllAddresses.php",
		type: "get",
		datatype: "json",
		success: function(data) {
			if (data != null) {
				$('#addressEditSelector').empty();
				$('#addressEditSelector').append($('<option>').text('--- None selected ---').val('0'));
				$('#addAddressSelector').empty();
				$('#addAddressSelector').append($('<option>').text('--- None selected ---').val('0'));			
				data.forEach(function(address) {
					var message = address.address1;
					if (address.address2 != null) message += " " + address.address2;
					message += " " + address.city + ", " + address.state;
					message += " " + address.zipcode; 
					$('#addressEditSelector').append($('<option>').text(message).val(address.id));
					$('#addAddressSelector').append($('<option>').text(message).val(address.id));
				});
			}
		}	
	});
});

function buildClientTable() {
	
	$.ajax({	
		url: "repos/getAllClients.php",
		dataType: "json",
		type: "get",
		success: function(data) {
			if (data != null) {
				$('#clients').find('tbody tr').remove();
				data.forEach(function(client) {
					var message = "<tr><td>" + client.firstName + "</td><td>" + client.lastName + "</td><td>";
	 				message += client.phone + "</td><td>" + client.email + "</td><td>";
	 				message += "<button type='button' class='btn btn-outline-warning' ";
					message += "onclick='editClient(" + client.id +")'>";
					message += "<span class='glyphicon glyphicon-pencil'></span></button>&nbsp;<button type='button'";
					message += " class='btn btn-outline-danger' onclick='removeClient(" + client.id;
					message += ")'><span class='glyphicon glyphicon-remove'></span>";
					message += "</td></tr>\n";
	 				$('#clients').append(message);
				});
			}		
		}
	});
}
