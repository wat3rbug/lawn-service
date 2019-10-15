$(document).ready(function () {
	
	var startM = getFirstOfMonth();
	var endM = getEndOfMonth();
	var start = convertDateForDB(startM);
	var end = convertDateForDB(endM);
	buildTable(start, end, $('#thismonth'));
});

function getFirstOfMonth() {
	var date = new Date();
	var day = 1;
	return new Date(date.setDate(day));
}

function getEndOfMonth() {
	var date = new Date();
	date.setMonth(date.getMonth() + 1);
	return new Date(date.setDate(0));
}