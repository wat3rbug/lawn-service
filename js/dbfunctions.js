Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

function dashDateFromLong(currentDate) {
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth() + 1;
	var day = currentDate.getDate();
	return year + "-" + month + "-" + day;
}

function getWebDateFromDB(currentdate) {
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var sections = currentdate.split('-');
	var year = sections[0];
	var day = sections[2];
	var month = months[sections[1]]; 
	return day + "-" + month + "-" + year;
}

function getWebDateFromDBDate(currentdate) {
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	currentDate = new Date(currentdate);
	var year = currentDate.getFullYear();
	var index = currentDate.getMonth();
	var month = months[index];
	var day =currentDate.getDate() + 1;
	return day + " " + month + " " + year;
}

function getTodayForDB() {
	var currentDate = Date.now();
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth() + 1;
	var day =currentDate.getDate();
	return year + "-" + month + "-" + day;
}