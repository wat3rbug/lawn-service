function convertDateForDB(currentDate) {
	var yyyy = currentDate.getFullYear();
	var m = currentDate.getMonth() + 1;
	var d = currentDate.getDate();
	return yyyy + "-" + m + "-" + d;
}

function dateFromDB(currentDate) {
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var sections = currentDate.split('-');
	var yyyy = sections[0];
	var d = sections[2];
	return d + " " + months[sections[1] -1] + " " + yyyy;
}

function buildTable(start, end, table) {
	var jobTypes = [];
	var expCategories = [];
	$.ajax({
		url: "repos/getAllTypes.php",
		dataType: "json",
		success: function(results) {
			if (results != null) {
				results.forEach(function(type) {
					jobTypes.push(type.type);	
				});
			}
		}
	});
	$.ajax({
		url: "repos/getAllExpenseCategories.php",
		dataType: "json",
		success: function(results) {
			if (results != null) {
				results.forEach(function(category) {
					expCategories.push(category.expense_category);	
				});
			}
		}
	});
	$.ajax({
		url: "repos/getProfitLossBetweenDates.php",
		dataType: "json",
		type: "post",
		data: {
			"start": start,
			"end": end
		}, 
		success: function(result) {
			if (result != null) {
				table.find('tbody tr').remove();
				var total = 0;
				result.forEach(function (profitloss) {
					total += parseFloat(profitloss.cost);
					var row = "<tr><td>" + dateFromDB(profitloss.date) + "</td>";
					row += "<td>" + profitloss.type + "</td>";
					row += "<td>" + profitloss.name_or_location +"</td><td>$" + profitloss.cost + "</td></tr>";
					table.append(row);
				});
				$('#total').text("$" + total.toFixed(2));
			}
		}	
	});
}

Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

