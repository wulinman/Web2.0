$().ready(function() {
	$('p').hide();
	$('#warning').hide();
	
	$('#register').submit(function(e) {
		if (!check($('input'), $('p'))) e.preventDefault();
	});
	reset();
	if ($('#warning').text() != 'warningInfo') $('#warning').show();
});

function reset() {
	$('#reset').click(function() {
		$('p').hide();
		$('#warning').hide();
	});
}
function check(input, hint) {
	var isValid = 1;
	if ($(input[0]).val().match(/^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}$/) == null) {
		$(hint[0]).show();
		isValid = 0;
	}
	if ($(input[1]).val().match(/^[1-9]{1}[0-9]{7}$/) == null) {
		$(hint[1]).show();
		isValid = 0;
	}
	if ($(input[2]).val().match(/^[1-9]{1}[0-9]{10}$/) == null) {
		$(hint[2]).show();
		isValid = 0;
	}
	if ($(input[3]).val().match(/^[a-zA-Z0-9_\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/) == null) {
		$(hint[3]).show();
		isValid = 0;
	}
	return isValid;
}



/*function checkUsername(username) {
	return username.match(/^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}$/) != null;
}
function checkId(studentId) {
	return studentId;
}
function checkPhone(phone) {
	return phone.match(/^[1-9]{1}[0-9]{10}$/) != null;
}
function checkEmail(email) {
	return email.match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/) != null;
}*/