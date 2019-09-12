// gives notification that a client is removed

function removeClient(id) {
	$.ajax({
		url: "getClientNameForId.php",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(data) {
			var client = data[0];
			var message = client.firstName + " " + client.lastName + " has been removed";
			$('#rmClientId').val(id);
			$('#rmClientMsg').text(message);
			$('#successRemoveClient').modal('show');
		}	
	});
}

function editClient(id) {
	$.ajax({
		url: "getClientNameForId.php",
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
 			$('#editClientModal').modal('show');
		}
	});
}

function loadAddresses() {
	$.ajax({
		url: "getAllAddresses.php",
		type: "get",
		datatype: "json",
		success: function(data) {
			if (data != null) {
				$('#addressEditSelector').empty();
				$('#addAddressSelector').empty();
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
}

$(document).ready(function() {
	
	// load addresses ahead of time
	
	loadAddresses();

	// client modal buttons
	
	$('#addClientBtn').on("click", function() {
		$('#addClient').modal('show');
	});
	
	$('#cancelClientBtn').on("click", function() {
		$('#addClient').modal('hide');
	});
	
	$('#addSuccessBtn').on("click", function() {
		$('#successAddClient').modal('hide');
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
		$.ajax({
			url: "editClient.php",
			type: "post",
			data: {
				"id": id,
				"firstName": firstName,
				"lastName": lastName,
				"phone": phone,
				"email": email
			},
			success: function() {
				window.parent.window.location.reload();
			}
		});
	});
	
	// actually removes a client from active database
	
	$('#rmSuccessBtn').on("click", function() {
		$('#rmClientMsg').text();
		$('#successRemoveClient').modal('hide');
		var id = $('#rmClientId').val();
		$.ajax({
			url: "removeClient.php",
			type: "post",
			data: {
				"id": id
			},
			success: function() {
				window.parent.window.location.reload();
			}
		})
	});
	
	// setup table of clients
	
	$.ajax({
	
		url: "getAllClients.php",
		dataType: "json",
		type: "get",
		success: function(data) {
			data.forEach(function(client) {
				var message = "<tr><td>" + client.firstName + "</td><td>" + client.lastName + "</td><td>";
 				message += client.phone + "</td><td>" + client.email + "</td><td>";
 				message += "<button type='button' class='btn btn-outline-warning' id='editClient' ";
				message += "onclick='editClient(" + client.id +")' data-toggle='tooltip' title='Edit client information'>";
				message += "<span class='glyphicon glyphicon-pencil'></span></button>&nbsp;<button type='button'";
				message += " class='btn btn-outline-danger' id='removeClient' data-toggle='tooltip' title='Remove client'";
				message += " onclick='removeClient(" + client.id + ")'><span class='glyphicon glyphicon-remove'></span>";
				message += "</td></tr>\n";
 				$('#clients tr:last').after(message);
			});
		}
	});
	
	// adding a client from modal
	
	$('#pushClientDB').on("click", function() {
		var firstname = $('#firstName').val();
		var lastname = $('#lastName').val();
		var phone = $('#phone').val();
		var email = $('#email').val();
		$.ajax({
			url: "addClient.php",
			type: "post",
			data: {
				"firstname": firstname,
				"lastname": lastname,
				"phone": phone,
				"email": email
			},
			success: function() {
				$('#addClient').modal('hide');
				$('#successClient').modal('show');
				var message = firstname + " " + lastname + " has been successfully added";
				$('#addClientMsg').text(message);
			}
		});
	});
});
