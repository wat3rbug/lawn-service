function setupDropDowns() {
	
	// setup address dropdowns
	
	$.ajax({
		url: "getAllAddresses.php",	
		dataType: "json",
		type: "get",
		success: function(result) {
			if (result != null) {
				$('#addressSelector').empty();
				$('#editAddressSelector').empty();
				result.forEach(function(address) {
					var message = address.address1;
					if (address.address2 != null) message += " " + address.address2;
					message += " " + address.city + ", " + address.state;
					message += " " + address.zipcode; 
					$('#addressSelector').append($('<option>').text(message).val(address.id));
					$('#editAddressSelector').append($('<option>').text(message).val(address.id));
					// do edit job part
				});
			}
			
		}
	});
	// setup type dropdown
	
	$.ajax({
		url: "getAllTypes.php",
		dataType: "json",
		type: "get",
		success: function(result) {
			if (result != null) {
				$('#addJobType').empty();
				$('#editJobType').empty();
				result.forEach(function(type) {
					$('#addJobType').append($('<option>').text(type.type).val(type.id));
					$('#editJobType').append($('<option>').text(type.type).val(type.id));
				});
			}		
		}	
	});
	// setup client dropdown
	$.ajax({
		url: "getAllClients.php",
		dataType: "json",
		type: "get",
		success: function(result) {
			if (result != null) {
				$('#addClient').empty();
				$('#editClient').empty();
				result.forEach(function(client) {
					$('#addClient').append($('<option>').text(client.firstName + " " + client.lastName).val(client.id));
					$('#editClient').append($('<option>').text(client.firstName + " " + client.lastName).val(client.id));
				});
			}
		}	
	});
}