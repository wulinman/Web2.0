var randomNum = [];

window.onload = function() {
	initial();
	$('.button').click(function() {
		if (!isDisable($(this)) && !this.waiting) {
			//var request;
			//if (request != null) request.abort();
			showRed($(this));
			disableOthers($(this));
			this.waiting = true; // 避免重复请求
			var that = $(this);
			$.get('http://localhost:3000/S1/', function(data) { // data：random number
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


	$('#button').click(function() {
		
		clickButtons($('.button'));
			//alert($($('.button')[i]).attr('title'));
	});

}

function clickButtons(that) {

	//if (!isDisable(that)) {

			showRed(that);
			//disableOthers(that);
		//	that.waiting = true; // 避免重复请求
			
			$.get('http://localhost:3000/S3/', function(data) { // data：random number
				getNumber(that, data);
				//enableOthers(that);
				if (isSumAble()) enableInfoBar();

			});
		//}
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
	/*$('.unread').each(function() {
		if ($(this).text() == '') {
			$(this).parent($('.button')).removeClass('disable');
		}
	});*/
}
function initial() {
	$('.enable').removeClass('enable');
	$('#info-bar').addClass('gray');
	$('.disable').removeClass('disable');
	$('.unread').text('');
	$('.unread').css('display','none');
	$('#sum').text('');
	$('.button').each(function() {
		this.waiting = false;
	});
	for (var i = 0; i < 5; i++) {
		randomNum.pop();
	}
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
}

