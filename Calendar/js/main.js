$(document).ready(
	function(){
		generateCalendars(current_date.getMonth(), current_date.getFullYear());
});	

/*
	Set Global Variables
*/

var current_date = new Date();

var calendar_day_labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

var calendar_month_labels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];

/*
	Create the parent class Calendar
*/

function Calendar(month, year){
	this.month = (typeof month != 'number' || month == null) ? current_date.getMonth() : month;
	this.year = (typeof year != 'number' || year == null) ? current_date.getFullYear() : year;
	this.html = '';
} 

Calendar.prototype.generateHTML = function(){
	var firstDay = new Date(this.year, this.month, 1);
	var firstDayLocation = firstDay.getDay();
	var countDate = 1; //first day of the month is always 1
	
	/*
		Find last day of the month to get total days. Note that 0 in day parameter returns 
		the last day of the previous month so you need to use the index of the next month/year 
		to ensure you're getting the last day of the current month
	*/
	var nextMonth = this.nextMonth();
	var monthLength = new Date(nextMonth['year'], nextMonth['month'], 0).getDate();

	//Create calendar label
	this.html += '<div class="calendar"><div class="title"><h2>' + calendar_month_labels[this.month] + ' ' + this.year + '</h2></div>';

	//create calendar table and header row 
	this.html += '<table class="table"><tr>';
	weekHeader = '';
	calendar_day_labels.forEach(function(label){
		weekHeader += '<th>' + label + '</th>';
	});
	this.html += weekHeader;
	this.html += '</tr>';

	//create the table rows 
	for(r=0;r<6;r++){ //calendar will only have 6 rows(r)
	
		this.html += '<tr>';

		for(d=0;d<7;d++){ //row is only 7 days(d) long

				if(d < firstDayLocation && r == 0){
					this.html += '<td></td>';
				}
				else if((d >= firstDayLocation && r == 0) || (countDate <= monthLength)){
					this.html += '<td class="filled" data-month="' + this.month + '" data-year="' + this.year + '">' + countDate++ + '</td>';
				}
				else{
					this.html += '<td></td>';
				}
		}

		this.html += '</tr>';
	}

	//close table and div
	this.html += '</table></div>';

	return this.html;
}

/*
	Find previous month/year taking into account the need to 
	reduce the year by 1 if the current month is Jan.
*/

Calendar.prototype.prevMonth  = function(){
	var prevMonth = [];
	if(this.month == 0)
	{
		prevMonth['month'] = 11;
		prevMonth['year'] = this.year - 1;
	}
	else{
		prevMonth['month'] = this.month - 1;
		prevMonth['year'] = this.year;
	}
	return prevMonth;
}

/*
	Find next month/year taking into account the need to 
	increase the year by 1 if the current month is Dec.
*/

Calendar.prototype.nextMonth  = function(){
	var nextMonth = [];
	if(this.month == 11)
	{
		nextMonth['month'] = 0;
		nextMonth['year'] = this.year + 1;
	}
	else{
		nextMonth['month'] = this.month + 1;
		nextMonth['year'] = this.year;
	}
	return nextMonth;
}

/*
	Since the side calendars need added/changed functionally 
	I made a child class of the Calendar object for left calendar
*/

function CalendarLeft(month, year){
	Calendar.call(this, month, year);
}

CalendarLeft.prototype = Object.create(Calendar.prototype);
CalendarLeft.prototype.constructor = CalendarLeft;

CalendarLeft.prototype.generateHTML = function(){
	var firstDay = new Date(this.year, this.month, 1); 
	var firstDayLocation = firstDay.getDay();
	var countDate = 1;

	/*
		Find last day of the month to get total days. Note that 0 in day parameter returns 
		the last day of the previous month so you need to use the index of the next month/year 
		to ensure you're getting the last day of the current month
	*/
	var nextMonth = this.nextMonth();
	var monthLength = new Date(nextMonth['year'], nextMonth['month'], 0).getDate();

	/*
		Find the number of empty td cells in first row that need to be filled 
		with previous month's information
	*/
	var missingLength = 6 - firstDayLocation;//week index starts at 0
	var prevMonthDates = this.previousMonthDates(firstDayLocation);
	var prevMonth = this.prevMonth();//get previous month's data (month/year)

	//Create calendar label 
	this.html += '<div class="calendar"><div class="title"><a class="prevMonth" onclick="generateCalendars(' + this.month + ',' + this.year + ')">&#10094;</a><h2>' + calendar_month_labels[this.month] + ' ' + this.year + '</h2></div>';

	//create calendar table and header row 
	this.html += '<table class="table"><tr>';
	weekHeader = '';
	calendar_day_labels.forEach(function(label){
		weekHeader += '<th>' + label + '</th>';
	});
	this.html += weekHeader;
	this.html += '</tr>';

	//create the table rows 
	for(r=0;r<6;r++){ //calendar will only have 6 rows(r)
	
		this.html += '<tr>';

		for(d=0;d<7;d++){ //row is only 7 days(d) long
			if(d < firstDayLocation && r == 0){
				this.html += '<td class="not_current_month" data-month="' + prevMonth['month'] + '" data-year="' + prevMonth['year'] + '">' + prevMonthDates[d] + '</td>';
			}
			else if((d >= firstDayLocation && r == 0) || (countDate <= monthLength)){
				this.html += '<td class="filled" data-month="' + this.month + '" data-year="' + this.year + '">' + countDate++ + '</td>';
			}
			else{
				this.html += '<td></td>';
			}
		}

		this.html += '</tr>';
	}

	//close table and div
	this.html += '</table></div>';

	return this.html;
}

CalendarLeft.prototype.previousMonthDates = function(missingLength){
	var prevMonthLength = new Date(this.year, this.month, 0).getDate();
	var lastMonthDates = [];

	lastMonthDates.push(prevMonthLength);

	while(lastMonthDates.length < missingLength){

		lastMonthDates.push(prevMonthLength - 1);
		prevMonthLength--;
	}

	return lastMonthDates.reverse();//Changes the number order to count up not down
}

/*
	Since the side calendars need added/changed functionally 
	I made a child class of the Calendar object for right calendar
*/

function CalendarRight(month, year){
	Calendar.call(this, month, year);
}

CalendarRight.prototype = Object.create(Calendar.prototype);
CalendarRight.prototype.constructor = CalendarLeft;

CalendarRight.prototype.generateHTML = function(){
	var firstDay = new Date(this.year, this.month, 1);
	var firstDayLocation = firstDay.getDay();
	var countDate = 1; 


	/*
		Find last day of the month to get total days. Note that 0 in day parameter returns 
		the last day of the previous month so you need to use the index of the next month/year 
		to ensure you're getting the last day of the current month
	*/
	var nextMonth = this.nextMonth();
	var monthLength = new Date(nextMonth['year'], nextMonth['month'], 0).getDate();

	var nextMonthCountDate = 1;//Next month dates will count up from 1
	
	//Create calendar label
	this.html += '<div class="calendar"><div class="title"><h2>' + calendar_month_labels[this.month] + ' ' + this.year + '</h2><a class ="nextMonth" onclick="generateCalendars(' + this.month + ',' + this.year + ')">&#10095;</a></div>';

	//create calendar table and header row 
	this.html += '<table class="table"><tr>';
	weekHeader = '';
	calendar_day_labels.forEach(function(label){
		weekHeader += '<th>' + label + '</th>';
	});
	this.html += weekHeader;
	this.html += '</tr>';

	//create the table rows 
	for(r=0;r<6;r++){ //calendar will only have 6 rows(r)
	
		this.html += '<tr>';

		for(d=0;d<7;d++){ //row is only 7 days(d) long
			if(d < firstDayLocation && r == 0){
				this.html += '<td></td>';
			}
			else if((d >= firstDayLocation && r == 0) || (countDate <= monthLength)){
				this.html += '<td class="filled" data-month="' + this.month + '" data-year="' + this.year + '">' + countDate++ + '</td>';
			}
			else if(countDate > monthLength){
				this.html += '<td class="not_current_month" data-month="' + nextMonth['month'] + '" data-year="' + nextMonth['year'] + '">' + nextMonthCountDate++ + '</td>';
			}
		}
		
		this.html += '</tr>';
	}

	//close table and div
	this.html += '</table></div>';

	return this.html;
}

function generateCalendars(month, year){
	//Make main calendar
	var calMain = new Calendar(month, year);
	var htmlMain = calMain.generateHTML();

	//Get month/year values needed for right and left calendars
	var prevMonth = calMain.prevMonth();
	var nextMonth = calMain.nextMonth();

	//Make left calendar
	var calLeft = new CalendarLeft(prevMonth['month'], prevMonth['year']);
	var htmlLeft = calLeft.generateHTML();

	//make right calendar
	var calRight = new CalendarRight(nextMonth['month'], nextMonth['year']);
	var htmlRight = calRight.generateHTML();

	var html = htmlLeft + htmlMain + htmlRight;
	$('.calendar-wrap').html(html);
	$('input.input-textbox').val('Select Date');

	selectDate();
	
}

function selectDate(){
	$(function () {
        var tdInstance = $('.table').find('td.filled');
        tdInstance.click(function () {
            tdInstance.removeClass('active');
            var newInstance = $(this);
            newInstance.addClass('active');

            //Update textbox with date selected
            var day = $(this).html()
            var month = $(this).data("month");
            var year = $(this).data("year");
            var displayDate = calendar_month_labels[month] + ' ' + day + ', ' + year;
            $('input.input-textbox').val(displayDate);
        });
    });
}