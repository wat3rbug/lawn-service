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
function getBillingForModal(table, id) {
	$.ajax({
		url: "getBillingForId.php",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		}, success: function(data, table) {
			var total = 0;
			table.find('tbody tr').remove();
			if (data != null) {
				data.forEach(function(billingItem) {
					var lineCost = parseFloat(billingItem.cost) * parseInt(billingItem.quantity);
					total += lineCost;
					var row = "<tr><td class='text-left'>" + billingItem.item + "</td><td>$";
					row += parseFloat(billingItem.cost).toFixed(2) + "</td><td>" +	billingItem.quantity;
					row += "</td>><td><button type='button' class='btn btn-outline-warning' onclick='editNewBilling(";
					row += billingItem.id + ")'><span class='glyphicon glyphicon-pencil'></span></button>";
					row += "&nbsp;<button type='button' class='btn btn-outline-danger' onclick='removeNewBilling(";
					row += billingItem.id + ")'><span class='glyphicon glyphicon-remove'></span></td>";
					row += "<td>" + parseFloat(lineCost).toFixed(2) + "</td></tr>";
					table.append(row);
				});
			}
		}
	})
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

function backToAddJobBillingModal() {
	
	$('#addBillingItemModalForAddJob').modal('hide');
	var id = $('#addBillingItemJobForAddJobId').val();
	$('#addBillingModal').modal('show');
	getBillingForModal($('#addBillingItems'), id);
}

$(document).ready(function() {
	
	// view Billing section
	
	$('#viewBillingCloseBtn').on("click", function() {
		$('#addJobModal').modal("hide");	
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
		getBillingForModal($('#addBillingItems'), id);
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
	// add Billing Item section for Add Job
	
	$('#addBillingItem').on("click", function() {
		var jobid = $('#addBillingItemJobForAddJobId').val();
		$('#addBillingModal').modal('hide');
		$('#addBillingItemModalForAddJob').modal('show');
		$('#addBillingItemJobForAddJobId').val(jobid);
		$('#addBillingItemNameForAddJob').val();
		$('#addBillingItemMoneyForAddJob').val();
		$('#addBillingItemNumForAddJob').val();	
	});
	
	$('#addBillingItemBtnForAddJob').on("click", function() {
		var id = $('#addBillingItemJobForAddJobId').val();
		var item = $('#addBillingItemNameForAddJob').val();
		var cost = $('#addBillingItemMoneyForAddJob').val();
		var quantity = $('#addBillingItemNumForAddJob').val();
		$.ajax({
			url: "addBillingItem.php",
			type: "post",
			data: {
				"id": id,
				"item": item,
				"cost": cost,
				"quantity": quantity
			}
		})
		backToAddJobBillingModal();
	});
	
	$('#addBillingItemCloseBtnForAddJob').on("click", function() {
		backToAddJobBillingModal();
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
		var id = $('#hdnEditJob').val();
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
