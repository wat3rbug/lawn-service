function getBilling(id) {
	$('#viewBillingModal').modal('show');
	$.ajax({
		url: "getBillingForId.php",
		dataType: "json",
		type: "post",
		data: {
			"id": id
		},
		success: function(data) {
			if (data != null) {
				var total = 0;			
				$('#viewBillingItems').find('tbody tr').remove();
				data.forEach(function(billing) {
					var lineCost = parseFloat(billing.cost) * parseInt(billing.quantity);
					total += lineCost;
					var message = "<tr><td class='text-left'>" + billing.item + "</td><td>$";
					message += parseFloat(billing.cost).toFixed(2)+ "</td><td>" + billing.quantity;
					message += "</td><td>$" + parseFloat(lineCost).toFixed(2) +"</td></tr>";					
					$('#viewBillingItems').append(message);
				});
				var footer = "<tr><td class='text-left' colspan='3'><b>Total</b></td><td><b>$";
				footer += parseFloat(total).toFixed(2) + "</b></td></tr>";
				$('#viewBillingItems').append(footer);
				
			}
		}	
	});
}
function removeBilling(billingId) {
	$.ajax({
		url: "removeBillingItem.php",
		type: "post",
		data: {
			"id": billingId
		},
		success: function() {
			var id = $('#editBillingJobId').val();
			refreshEditBilling(id);
		}
	});	
}

function refreshEditBilling(id) {
	$.ajax({
		url: "getBillingForId.php",
		dataType: "json",
		type: "post",
		data: {
			"id": id
		},
		success: function(data) {
			var total = 0;
			$('#editBillingItems').find('tbody tr').remove();
			if (data != null) {				
				data.forEach(function(billingItem) {
					var lineCost = parseFloat(billingItem.cost) * parseInt(billingItem.quantity);
					total += lineCost;
					var message = "<tr><td class='text-left'>" + billingItem.item + "</td><td>$";
					message += parseFloat(billingItem.cost).toFixed(2)+ "</td><td>" + billingItem.quantity;
					message += "</td><td>";
					message += "<button type='button' class='btn btn-outline-warning' onclick='editBilling(";
					message += billingItem.id + ")'><span class='glyphicon glyphicon-pencil'></span></button>";
					message += "&nbsp;<button type='button' class='btn btn-outline-danger'";
					message += " onclick='removeBilling(" + billingItem.id + ")'><span class='glyphicon glyphicon-remove'>";
					message += "</span></button></td><td>$" + parseFloat(lineCost).toFixed(2) +"</td></tr>";					
					$('#editBillingItems').append(message);
				});
				var footer = "<tr><td class='text-left' colspan='4'><b>Total</b></td><td><b>$";
				footer += parseFloat(total).toFixed(2) + "</b></td></tr>";
				$('#editBillingItems').append(footer);
			}
		}	
	});
}

$(document).ready(function() {
	
	// view Billing section
	
	$('#viewBillingCloseBtn').on("click", function() {
		$('#viewBillingModal').modal("hide");	
	});
	
	$('#cancelJobBtn').on("click", function() {
		clearAddModal();
		$('#addJobModal').modal('hide');
	});
	
	// edit Billing section	
	
	$('#editBillingCloseBtn').on("click", function() {
		var id = $('#editBillingJobId').val();
		$('#editBillingModal').modal('hide');
		$('#editJobModal').modal('show');
		refreshEditBilling(id);
	});
	
	$('#addEditBillingItem').on("click", function() {
		var id = $('#editBillingJobId').val();
		$('#editBillingModal').modal('hide');
		$('#addBillingItemModal').modal('show');
		$('#addBillingItemJobId').val(id);	
	});
	
	$('#clearEditBillingBtn').on("click", function() {
		var jobId = $('#editBillingJobId').val();
		$.ajax({
			url: "clearAllJobsForId.php",
			type: "post",
			data: {
				"id": jobId
			},
			success: function() {
				refreshEditBilling(jobId);
			}	
		});
	});
	
	// add Billing Item section
	
	$('#addBillingItemBtn').on("click", function() {
		var id = $('#editBillingJobId').val();
		var item = $('#addBillingItemName').val();
		var cost = $('#addBillingItemMoney').val();
		var quantity = $('#addBillingItemNum').val();
		$.ajax({
			url: "addBillingItem.php",
			type: "post",
			data: {
				"id": id,
				"item": item,
				"cost": cost,
				"quantity": quantity
			},
			success: function() {
				$('#addBillingItemModal').modal('hide');
				refreshEditBilling(id);
				$('#editBillingModal').modal('show');			
			}
		});
	});
	
	$('#addBillingItemCloseBtn').on("click", function() {
		var id = $('#addBillingItemJobId').val();
		$('#editBillingJobId').val(id);
		$('#addBillingItemModal').modal('hide');
		$('#editBillingModal').modal('show');
		refreshEditBilling(id);
	});
	
	$('#editBillingBtn').on("click", function() {
		var id = $('#editJob').val();
		$('#editBillingJobId').val(id);
		$('#editJobModal').modal('hide');
		$('#editBillingModal').modal('show');
		$.ajax({
			url: "getBillingForId.php",
			dataType: "json",
			type: "post",
			data: {
				"id": id
			},
			success: function(data) {
				if (data != null) {
					var total = 0;
					$('#editBillingItems').find('tbody tr').remove();
					data.forEach(function(billingItem) {
						var lineCost = parseFloat(billingItem.cost) * parseInt(billingItem.quantity);
						total += lineCost;
						var message = "<tr><td class='text-left'>" + billingItem.item + "</td><td>$";
						message += parseFloat(billingItem.cost).toFixed(2)+ "</td><td>" + billingItem.quantity;
						message += "</td><td>";
						message += "<button type='button' class='btn btn-outline-warning' onclick='editBilling(";
						message += billingItem.id + ")'><span class='glyphicon glyphicon-pencil'></span></button>";
						message += "&nbsp;<button type='button' class='btn btn-outline-danger'";
						message += " onclick='removeBilling(" + billingItem.id + ")'><span class='glyphicon glyphicon-remove'>";
						message += "</span></button></td><td>$" + parseFloat(lineCost).toFixed(2) +"</td></tr>";					
						$('#editBillingItems').append(message);
					});
					var footer = "<tr><td class='text-left' colspan='4'><b>Total</b></td><td><b>$";
					footer += parseFloat(total).toFixed(2) + "</b></td></tr>";
					$('#editBillingItems').append(footer);
				}
			}	
		});
	});
});
