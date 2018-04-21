var randomNum = [];
var isClickAgain = false;

window.onload = function() {
	initial();
	$('.button').click(function() {
		// 若是开始第二轮请求，灭活大气泡
		if (isClickAgain) {
				$('#sum').text('');
				$('#info-bar').removeClass('enable');
				
		}
		if (!isDisable($(this)) && !this.waiting) {
			this.clicked = true; // 标记已点过的
			showRed($(this));
			disableOthers($(this));
			this.waiting = true; // 避免重复请求
			var that = $(this);
			$.get('/S1', function(data) { // data：random number
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
	});

	// 鼠标离开@+后，一切复原
	$('.icon').hover(function() {
		initial();
	});

}

function getNumber(that, data) {
	that.find('.unread').text(data.toString());
	randomNum.push(data);
}
function enableInfoBar() {
	$('#info-bar').addClass('enable');
}
function enableOthers(that) {
	/*$('.disable').each(function() {
		if ($(this).find('.unread').text() == '')
			$(this).removeClass('disable');
	});*/
	$('.disable').each(function() {
		if (!this.clicked) $(this).removeClass('disable');
	});
	that.addClass('disable');
}
function initial() {
	$('#info-bar').removeClass('enable').addClass('gray');
	$('.disable').removeClass('disable');
	$('.unread').text('');
	$('.unread').css('display','none');
	$('#sum').text('');
	$('.button').each(function() {
		this.waiting = false;
		this.clicked = false;
	});
	for (var i = 0; i < 5; i++) {
		randomNum.pop();
	}
	isClickAgain = false;
}
function showRed(that) {
	that.find('.unread').css('display', 'display');
	that.find('.unread').text('...');
}
function disableOthers(that) {
	$('.button').addClass('disable');
	that.removeClass('disable');
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

	//重置，再次点击可以重新请求
	reset();
}
function reset() {
	$('.disable').removeClass('disable');
	$('.button').each(function() {
		this.waiting = false;
		this.clicked = false;
	});
	for (var i = 0; i < 5; i++) {
		randomNum.pop();
	}
	isClickAgain = true;
}

