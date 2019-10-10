// gives notification that a client is removed

function removeAddress(id) {
	$.ajax({
		url: "repos/removeAddress.php",
		type: "post",
		data: {
			"id": id
		},
		success: function() {
			buildAddressTable();
		}	
	});
}

function editAddress(id) {
	$.ajax({
		url: "repos/getAddressForId.php",
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

function cleanEditModal() {
	$('#editAddress1').val();
	$('#editAddress2').val();
	$('#editCity').val();
	$('#editAddressId').val();
	$('#editState').val();
	$('#editZipCode').val();
}

function cleanAddModal() {
	$('#Address1').val();
	$('#Address2').val();
	$('#city').val();
	$('#state').val();
	$('#zipCode').val();
}

$(document).ready(function() {

	// Remove Address section
	
	$('#rmSuccessCancelBtn').on("click", function() {
		$('#rmAddressMsg').text();
		$('#rmAddressId').val();
		$('#successRemoveAddress').modal('hide');
	});
	
	$('#rmSuccessBtn').on("click", function() {
		$('#rmAddressMsg').text();
		$('#successRemoveAddress').modal('hide');
		var id = $('#rmAddressId').val();
		$.ajax({
			url: "repos/removeAddress.php",
			type: "post",
			data: {
				"id": id
			},
			success: function() {
				window.parent.window.location.reload();
			}
		})
	});
	
	// Edit Address section
	
	$('#cancelAddressEditBtn').on("click", function() {
		$('#editAddressModal').modal('hide');
		cleanEditModal();
	});
	
	$('#pushAddressDBEdit').on("click", function() {
		var id = $('#editAddressId').val();
		var address1 = $('#editAddress1').val();
		var address2 = $('#editAddress2').val();
		var city = $('#editCity').val();
		var state = $('#editState').val();
		var zipcode = $('#editZipCode').val();
		$.ajax({
			url: "repos/editAddress.php",
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
				cleanEditModal();
				window.parent.window.location.reload();
			}
		});
	});
	
	// Add Address section
	
	$('#addAddressBtn').on("click", function() {
		$('#addAddressModal').modal('show');
	});
	
	$('#cancelAddressBtn').on("click", function() {
		$('#addAddressModal').modal('hide');
	});
	
	$('#pushAddressDB').on("click", function() {
		var address1 = $('#Address1').val();
		var address2 = $('#Address2').val();
		var city = $('#city').val();
		var state = $('#state').val();
		var zipcode = $('#zipCode').val();
		$.ajax({
			url: "repos/addAddress.php",
			type: "post",
			data: {
				"address1": address1,
				"address2": address2,
				"city": city,
				"state": state,
				"zipcode": zipcode
			},
			success: function() {
				$('#addAddressModal').modal('hide');
				cleanAddModal();
				buildAddressTable();
			}
		});
	});
	
	// setup table of address
	
	buildAddressTable();
});

function buildAddressTable() {
	$.ajax({	
		url: "repos/getAllAddresses.php",
		dataType: "json",
		type: "get",
		success: function(data) {
			if (data != null) {
				$('#addresses').find('tbody tr').remove();
				data.forEach(function(address) {
					var message = "<tr><td>" + address.address1 + " ";
					if (address.address2 != null) message+= address.address2;
					message += "</td><td>" + address.city + "</td><td>";
	 				message += address.state + "</td><td>" + address.zipcode + "</td><td>";
	 				message += "<button type='button' class='btn btn-outline-warning' id='editAddress' ";
					message += "onclick='editAddress(" + address.id +")' data-toggle='tooltip' title='Edit Address information'>";
					message += "<span class='glyphicon glyphicon-pencil'></span></button>&nbsp;<button type='button'";
					message += " class='btn btn-outline-danger' id='removeAddress' data-toggle='tooltip' title='Remove Address'";
					message += " onclick='removeAddress(" + address.id + ")'><span class='glyphicon glyphicon-remove'></span>";
					message += "</td></tr>\n";
	 				$('#addresses').append(message);
				});
			}		
		}
	});
}
