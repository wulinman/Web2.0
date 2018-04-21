var randomNum = [];
var isClicked = false;
var list = [];

window.onload = function() {
	initial();
	/*$('.button').click(function() {
		if (!isDisable($(this)) && !this.waiting) {
			//var request;
			//if (request != null) request.abort();
			showRed($(this));
			disableOthers($(this));
			this.waiting = true; // 避免重复请求
			var that = $(this);
			$.get('http://localhost:3000/S2/', function(data) { // data：random number
				getNumber(that, data);
				enableOthers(that);
				if (isSumAble()) enableInfoBar();
			});
		}
	});

	$('#info-bar').click(function() {
		if (isSumAble()) {
			showSum();
		}
	});*/

	$('#button').click(function() {
		if (!isClicked) {
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
	//if (title >= 'A' && title <= 'E') {
		showRed(that);
		//disableOthers(that);
		//if (!isDisable(that)) {
			var obj = $.get('http://localhost:3000/S3/', function(data) { // data：random number
				getNumber(that, data);
				enableOthers(that);
				//if (isSumAble()) enableInfoBar();
				
				//clickButtons(that.next());
				clickInfoBar();
			});
			list.push(obj);
		//}
	//}
	
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
	for (var i = 0; i < list.length; i++) {
		var obj = list.pop();
		obj.abort();
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
}
