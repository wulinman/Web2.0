var randomNum = [];
var isClicked = false;
var isClickAgain = false;


window.onload = function() {
	initial();

	//实现并行请求
	$.ajaxSetup ({
        cache: false //关闭AJAX缓存
    });

	$('#button').click(function() {
		if (!isClicked) {
			if (isClickAgain) $('#sum').text('');
			for (var i = 4; i >= 0; i--) {
				clickButtons($($('.button')[i]));
			}
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
	showRed(that);
	var obj = $.get('/S3', function(data) { // data：random number
		that.addClass('disable');
		getNumber(that, data);
		clickInfoBar();
	});
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
		if ($(this).find('.unread').text() == '')
			$(this).removeClass('disable');
	});
	that.addClass('disable');
}

function disableOthers(that) {
	$('.button').addClass('disable');
	//alert(that.attr('title'));
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
	});
	for (var i = 0; i < 5; i++) {
		randomNum.pop();
	}
	isClicked = false;
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
	for (var i = 0; i < 5; i++) {
		randomNum.pop();
	}
	isClicked = false;
	isClickAgain = true;
}
