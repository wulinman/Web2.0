var randomNum = [];
var isClicked = false;
var isClickAgain = false;

window.onload = function() {
	initial();

	$('#button').click(function() {
		if (!isClicked) {
			clickButtons($($('.button')[0]));
			if (isClickAgain) $('#sum').text('');
		}
		isClicked = true;
	});

	// 鼠标离开@+后，一切复原
	$('#button').hover(function() {
		initial();
	});

}

function clickButtons(that) {
	var title = that.attr('title');
	if (title >= 'A' && title <= 'E') { // 保证点击的是A-E
		that.clicked = true;
		showRed(that);
		disableOthers(that);
		if (!isDisable(that)) {
			$.get('/S2', function(data) { // data：random number
				getNumber(that, data);
				enableOthers(that);
				clickButtons(that.next());
				clickInfoBar();
			});
		}
	}
	
}

function clickInfoBar() {
	if (isSumAble()) {
		showSum();
	}
}

function getNumber(that, data) {
	that.find('.unread').text(data.toString());
	randomNum.push(data);
}

function enableInfoBar() {
	$('#info-bar').addClass('enable');
}

function enableOthers(that) {
	$('.disable').each(function() {
		if (!this.clicked) $(this).removeClass('disable');
	});
	that.addClass('disable');
}

function disableOthers(that) {
	$('.button').addClass('disable');
	that.removeClass('disable');
}

function initial() {
	//$('.enable').removeClass('enable');
	$('#info-bar').addClass('gray');
	$('.disable').removeClass('disable');
	//$('.unread').text('');
	$('.unread').css('display','none').text('');
	$('#sum').text('');
	$('.button').each(function() {
		this.waiting = false;
		$(this).clicked = false;
	});
	for (var i = 0; i < 5; i++) {
		randomNum.pop();
	}
	isClicked = false;
	isClickAgain = false;
}

function showRed(that) {
	that.find('.unread').css('display', 'display');
	that.find('.unread').text('...');
}

function isDisable(that) {
	return that.hasClass('disable');
}

function isSumAble() {
	if (randomNum.length == 5) return 1;
	else return 0;
}

function showSum() {
	var sum = 0;
	for (var i = 0; i < 5; i++) {
		sum += parseInt(randomNum[i]);
	}
	$('#sum').text(sum);
	reset();
}

function reset() {
	$('.disable').removeClass('disable');
	$('.button').each(function() {
		$(this).clicked = false;
	});
	for (var i = 0; i < 5; i++) {
		randomNum.pop();
	}
	isClicked = false;
	isClickAgain = true;
}
