$(document).ready(function () {
	
	var startM = getFirstOfYear();
	var endM = getEndOfYear();
	var start = convertDateForDB(startM);
	var end = convertDateForDB(endM);
	buildTable(start, end, $('#thisyear'));
});

function getFirstOfYear() {
	var year = new Date().getFullYear();
	return new Date(year, 0, 1);
}

function getEndOfYear() {
	var year = new Date().getFullYear();
	return new Date(year, 11, 31);
}