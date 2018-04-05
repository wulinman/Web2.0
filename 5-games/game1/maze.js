var BEGIN = 0, END = 0; LOSE = 0; CHEAT = 0; // 记录

window.onload = function () {
	document.getElementById('start').onmouseover = function() {
		begin();
	}
	document.getElementById('end').onmouseover = function() {
		end();
	}
	document.getElementById('above-maze').onmouseover = function() {
		cheat();
	}
	document.getElementById('under-maze').onmouseover = function() {
		cheat();
	}
	var wall = document.getElementsByClassName('wall');
	
		//  触墙犯规
		for (var i = 0; i < wall.length; i++) {
			wall[i].onmouseover = function() {
				if (BEGIN == 1 && END == 0) {  //  游戏开始之后触墙才会变红。若已失败，触墙不再变红
					lost(this);
				}
			}
			wall[i].onmouseout = function() {
				grey(this);
			}
		}
}

function begin() {
	BEGIN = 1;
	END = 0;
	LOSE = 0;
	CHEAT = 0;
	document.getElementById('result').innerHTML = "";
	document.getElementById('result').style.opacity = "0";
}

//游戏结束，显示结果
function end() {
	END = 1;
	if (LOSE == 1) {
		document.getElementById('result').innerHTML = "You Lose";
	}
	else if (CHEAT == 1) {
		document.getElementById('result').innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
	}
	else if (BEGIN == 1 && LOSE == 0 && CHEAT == 0) {
		document.getElementById('result').innerHTML = "You Win";
	}
	document.getElementById('result').style.opacity = "1";
}

//墙色复原
function grey(x) {
	x.className = "wall";
}

//触墙
function lost(x) {
	x.className = "red-wall";
	if (BEGIN == 1) {
		LOSE = 1;
	}
	end();
}

//作弊
function cheat() {
	if (BEGIN == 1 && LOSE == 0) {
		CHEAT = 1;
	}
}
