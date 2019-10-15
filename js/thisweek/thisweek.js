$(document).ready(function () {
	
	var sun = convertDateForDB(getSunday());
	var sat = convertDateForDB(getSaturday());
	buildTable(sun, sat, $('#thisweek'));
});

function getSaturday() {
	var date = new Date();
	var day = date.getDay();
	var diff = date.getDate() + (6 - day);
	return new Date(date.setDate(diff));
}

function getSunday() {
	var date = new Date();
	var day = date.getDay();
	var diff = date.getDate() - day;
	return new Date(date.setDate(diff));
}
