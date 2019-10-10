$(document).ready(function() {
	
	buildCategoryTable();
	
	// adds an expense category to the list
	
	$('#addCatBtn').on("click", function() {
		var name = $('#catName').val();
		$.ajax({
			url: "php_repos/addExpenseCategory.php",
			type: "post",
			data: {
				"name": name
			},
			success: function() {
				$('#catName').val("");
				buildCategoryTable();
			}
		});	
	});
	
	buildExpenseTable();
	
	// add expense section
	
	$('#addExpenseBtn').on("click", function() {
		$('#addExpenseModal').modal('show');
		clearAddExpenseModal();
		buildCatList($('#addCategorySelector'));
	});	
	
	$('#addExpenseCancelBtn').on("click", function() {
		$('#addExpenseModal').modal('hide');
	});
	
	$('#pushExpenseDB').on("click", function() {
		var name = $('#addName').val();
		var quantity = $('#addQuantity').val();
		var expenseCat = $('#addCategorySelector').val();
		var unitCost = parseFloat($('#addUnitCost').val()).toFixed(2);
		var currentDate = getTodayForDB();
		$.ajax({
			url: "php_repos/addExpense.php",
			dataType: "json",
			type: "post",
			data: {
				"name": name,
				"quantity": quantity,
				"unitCost": unitCost,
				"category": expenseCat,
				"date": currentDate
			}, 
			success: function() {
				clearAddExpenseModal();
				buildExpenseTable();
			}	
		});
	});
	
	// edit expense section
	
	$('#editExpenseCancelBtn').on("click", function() {
		$('#editExpenseModal').modal('hide');
	});
	
	$('#editExpenseDate').datepicker({
		format: 'dd-m-yyyy'
	});
});

function clearAddExpenseModal() {
	$('#addName').val();
	$('#addQuantity').val();
	$('#addUnitCost').val();
}

function buildCatList(selector) {
	$.ajax({
		url: "php_repos/getAllExpenseCategories.php",
		dataType: "json",
		success: function(result) {
			selector.empty();
			if (result != null) {
				$('#addCategorySelector').empty();
				result.forEach(function(category) {
					selector.append($('<option>').text(category.expense_type).val(category.id));
				});
			}
		}	
	});
}

function buildExpenseTable() {
	$.ajax({
		url: "php_repos/getAllExpenses.php",
		dataType: "json",
		success: function(result) {
			$('#expenses tbody').remove();
			if (result != null) {
				result.forEach(function(expense) {
					var lineCost = parseFloat(expense.unit_cost * expense.quantity).toFixed(2);
					var date = getWebDateFromDBDate(expense.expense_date);
					var row = "<tr><td>" + date + "</td><td>" + expense.name + "</td>";
					row += "<td>" + expense.expense_type + "</td><td>$" + expense.unit_cost + "</td>";
					row += "<td>" + expense.quantity + "</td><td>$" + lineCost + "</td><td>";
					row += "<button type='button' class='btn btn-outline-warning' onclick='editExpense(";
					row += expense.id + ")'><span class='glyphicon glyphicon-pencil'></span></button></td></tr>";
					$('#expenses').append(row);
				});
			}
		}	
	});	
}

function editExpense(id) {
	buildCatList($('#editCategorySelector'));
	$('#editExpenseModal').modal('show');
	$.ajax({
		url: "php_repos/getExpenseById.php",
		dataType: "json",
		type: "get",
		data: {
			"id": id
		},
		success: function (result) {
			if (result != null) {
				result.forEach(function(expense){
					$('#editName').val(expense.name);
					$('#editExpenseId').val(expense.id);
					$('#editExpenseDatePicker').val(expense.expense_date);
					$('#editUnitCost').val(expense.unit_cost);
					$('#editQuantity').val(expense.quantity);
					$('#editCategorySelector').val(expense.expense_category);	
				});
			}
		}
	});
}

function buildCategoryTable() {
	
    $.ajax({
   		url: "php_repos/getAllExpenseCategories.php",
   	 	dataType: "json", 
		success: function(result) {
			$('#categories tbody tr').remove();
			if (result != null) {
				result.forEach(function(category) {
					var row = "<tr><td>" + category.expense_type + "</td><td class='text-right'>";
					row += "<button type='button' class='btn btn-outline-danger' onclick='removeRow(";
					row += category.id + ")'>";
					row += "<span class='glyphicon glyphicon-remove'></span></button></td></tr>";
					$('#categories tbody').append(row);	
				});
			}
		}
    });
}

function removeRow(id) {
	$.ajax({
		url: "php_repos/removeCategoryById.php",
		type: "post",
		data: {
			"id": id
		},
		success: function() {
			buildCategoryTable();
		}
	})		
}