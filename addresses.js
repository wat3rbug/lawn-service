// gives notification that a client is removed

function removeAddress(id) {
	$.ajax({
		url: "getAddressForId.php",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(data) {
			var address = data[0];
			var message = address.address1 + " " + address.address2 + " has been removed";
			$('#rmAddressId').val(id);
			$('#rmAddressMsg').text(message);
			$('#successRemoveAddress').modal('show');
		}	
	});
}

function editAddress(id) {
	$.ajax({
		url: "getAddressForId.php",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(data) {
			var address = data[0];
			$('#editAddress1').val(address.address1);
			$('#editAddress2').val(address.address2);
			$('#editAddressId').val(address.id);
			$('#editCity').val(address.city);
			$('#editState').val(address.state);
			$('#editZipCode').val(address.zipcode);		
 			$('#editAddressModal').modal('show');
		}
	});
}

$(document).ready(function() {

	// client modal buttons
	
	$('#addAddressBtn').on("click", function() {
		$('#addAddress').modal('show');
	});
	
	$('#cancelAddressBtn').on("click", function() {
		$('#addAddress').modal('hide');
	});
	
	$('#addSuccessBtn').on("click", function() {
		$('#successAddAddress').modal('hide');
	});
	
	$('#cancelAddressEditBtn').on("click", function() {
		$('#editAddressModal').modal('hide');
		$('#editAddress').val();
		$('#editAddress2').val();
		$('#editCity').val();
		$('#editAddressId').val();
		$('#editState').val();
		$('#editZipCode').val();
	});
	
	$('#pushAddressDBEdit').on("click", function() {
		var id = $('#editAddressId').val();
		var address1 = $('#editAddress').val();
		var address2 = $('#editAddress2').val();
		var city = $('#editCity').val();
		var state = $('#editState').val();
		var zipcode = $('#editZipCode').val();
		$.ajax({
			url: "editClient.php",
			type: "post",
			data: {
				"id": id,
				"address1": address1,
				"address2": address2,
				"city": city,
				"state": state,
				"zipcode": zipcode
			},
			success: function() {
				window.parent.window.location.reload();
			}
		});
	});
	
	// actually removes a client from active database
	
	$('#rmSuccessBtn').on("click", function() {
		$('#rmAddressMsg').text();
		$('#successRemoveAddress').modal('hide');
		var id = $('#rmAddressId').val();
		$.ajax({
			url: "removeAddress.php",
			type: "post",
			data: {
				"id": id
			},
			success: function() {
				window.parent.window.location.reload();
			}
		})
	});
	
	// setup table of address
	
	$.ajax({
	
		url: "getAllAddresses.php",
		dataType: "json",
		type: "get",
		success: function(data) {
			if (data != null) {
				data.forEach(function(address) {
					var message = "<tr><td>" + address.address1 + " " + address.address2 + "</td><td>" + address.city + "</td><td>";
	 				message += address.state + "</td><td>" + address.zipcode + "</td><td>";
	 				message += "<button type='button' class='btn btn-outline-warning' id='editAddress' ";
					message += "onclick='editAddress(" + address.id +")' data-toggle='tooltip' title='Edit Address information'>";
					message += "<span class='glyphicon glyphicon-pencil'></span></button>&nbsp;<button type='button'";
					message += " class='btn btn-outline-danger' id='removeAddress' data-toggle='tooltip' title='Remove Address'";
					message += " onclick='removeAddress(" + address.id + ")'><span class='glyphicon glyphicon-remove'></span>";
					message += "</td></tr>\n";
	 				$('#addresses tr:last').after(message);
				});
			}
			
		}
	});
	
	// adding a client from modal
	
	$('#pushAddressDB').on("click", function() {
		var address1 = $('#Address1').val();
		var address2 = $('#Address2').val();
		var city = $('#city').val();
		var state = $('#state').val();
		var zipcode = $('#zipCode').val();
		$.ajax({
			url: "addAddress.php",
			type: "post",
			data: {
				"address1": address1,
				"address2": address2,
				"city": city,
				"state": state,
				"zipcode": zipcode
			},
			success: function() {
				$('#addAddress').modal('hide');
				$('#successAddress').modal('show');
				var message = address1 + " " + address2 + " has been successfully added";
				$('#addAddressMsg').text(message);
			}
		});
	});
});
