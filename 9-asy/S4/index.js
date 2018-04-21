var randomNum = [];  // 存从服务器获得的随机数
var randomOrder = []; // 存随机产生的顺序
var isClicked = false; // has clicked @+ in this turn
var isClickAgain = false; // click @+ again when last turn finished

window.onload = function() {
	initial();
	$('#button').click(function() {
		if (!isClicked) {
			createOrder(); // 重新生成随机序列
			showOrder();
			console.log(randomOrder);
			clickButtons($($('.button')[randomOrder[0]]), 0);
			if (isClickAgain) {
				$('#sum').text('');
			}
		}
		isClicked = true;
	});

	// 鼠标离开@+后，一切复原
	$('#button').hover(function() {
		initial();
	});
}

function showOrder() {
	var order = "";
	for (var i = 0; i < 5; i++) {
		order += $($('.button')[randomOrder[i]]).attr('title');
		order += " ";
	}
	console.log(order);
	$('#order').text(order);
}

function createOrder() {
	for (var i = 0; i < 5; i++) { //产生5个有效随机数
		var isRepeat = false;
		console.log('number'+i);
		var num = Math.floor(Math.random()*5);
		for (var j = 0; j < 5; j++) {
			if (num == randomOrder[j]) {
				i--;
				isRepeat = true;
				break;
			}
		}
		if (isRepeat == true) continue;
		console.log(num);
		randomOrder.push(num);
	}
}

function clickButtons(that, index) {
	var title = that.attr('title');
	if (title >= 'A' && title <= 'E') {
		that.clicked = true;
		showRed(that);
		disableOthers(that);
		if (!isDisable(that)) {
			$.get('/S4', function(data) { // data：random number
				getNumber(that, data);
				enableOthers(that);
				index++;
				clickButtons($($('.button')[randomOrder[index]]), index);
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
	$('#info-bar').addClass('gray');
	$('.disable').removeClass('disable');
	$('.unread').css('display','none').text('');
	$('#sum').text('');
	$('#order').text('');
	$('.button').each(function() {
		$(this).clicked = false;
	});
	for (var i = 0; i < 5; i++) {
		randomNum.pop(); //初始化服务器随机数数组
		randomOrder.pop();
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
		randomOrder.pop();
	}
	isClicked = false;
	isClickAgain = true;
}
