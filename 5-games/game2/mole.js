

var Playing = 0, Start = 0, Pause = 0, Score = 0, Time = 30, t;
var moles = document.getElementsByTagName('input');
window.onload = function() {
	for (var i = 0; i < moles.length; i++) {
			moles[i].onclick = function() {
			this.checked = 0; //  选择打哪一个洞
		}
	}
	document.getElementById('start').onclick = function() {
		
		if (Start == 0) {  //  若状态为初始，则开始游戏
			Time = 30;
			Score = 0;
			document.getElementById('time-box').innerHTML = "30";  // 重置倒计时
			document.getElementById('score-box').innerHTML = "0";  // 重置分数
			/*for (var i = 0; i < x.length; i++) {
				var[i].checked = 0;
			}*/
			startgame();
		}
		else if (Start == 1 && Playing == 0 && Pause == 1) {
			startgame();
		}
		else if (Playing == 1 && Start == 1 && Pause == 0) {  //  若状态为游戏中，则暂停游戏
			pause();
		}
	}
	/*document.getElementsByClassName('mole')[0].checked = 1;
	document.getElementsByClassName('mole')[0].onclick = function() {
		this.checked = 0;
	}*/
}


function startgame() {
	Start = 1;
	Playing = 1;
	Pause = 0;
	document.getElementById("state").innerHTML = "Playing";
	for (var i = 1; i < moles.length; i++) {
		moles[i].checked = 0;  //  复原所有的洞
	}
	t = setInterval("count()", 1000);  //  倒计时

	var randomNum = Math.floor(Math.random()*(moles.length - 1));  //   生成随机数
	moles[randomNum + 1].checked = 1;  //  生成地鼠
	moles[randomNum + 1].className = "real-mole";  //  改变新地鼠的class

	for (var i = 0; i < moles.length; i++) {
		moles[i].onclick = function() {
			hit(this); //  选择打哪一个洞
		}
	}
}

function hit(x) {
	if (Playing != 1) return;
	else {
		x.checked = 0;
		if (x.className == "mole") {
			Score--;  //  打错地鼠，分数-1
		}
		else if (x.className == "real-mole") {
			Score++; // 打中地鼠，分数+1
			x.className = "mole";  //  复原旧地鼠的class标记
			var randomNum = Math.floor(Math.random()*(moles.length - 1));   //  生成下一个随机数
			moles[randomNum + 1].checked = 1;
			moles[randomNum + 1].className = "real-mole";  //  改变新地鼠的class
		}
		document.getElementById("score-box").innerHTML = Score;  // 刷新当前分数
	}
}

function count() {
	Time--;
	document.getElementById('time-box').innerHTML = Time;
	if (Time <= 0) {
		//document.getElementById('time-box').innerHTML = "0";
		end();
	}
}

function pause() {
	Pause = 1;
	Playing = 0;
	document.getElementById("state").innerHTML = "Pause";  // 刷新状态板
	clearInterval(t);  //暂停计时

	for (var i = 0; i < moles.length; i++) {
		moles[i].onclick = function() {
			if (this.className == 'mole') {
				this.checked = 0; //  除地鼠外的洞都无法按下
			}
		}
	}
}

function end() {
	clearInterval(t);
	document.getElementById('state').innerHTML = "Game Over";
	alert("Game Over!\nYour score is " + Score);
	for (var i = 1; i < moles.length; i++) {
		moles[i].checked = 0;  //  复原所有的洞
	}
	for (var i = 0; i < moles.length; i++) {
			moles[i].onclick = function() {
			this.checked = 0; //  所有洞都无法按下
		}
	Start = 0;
	Playing = 0;
	}
}


