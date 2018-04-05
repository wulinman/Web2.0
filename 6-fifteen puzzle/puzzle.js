// By Wu Linman
var Begin = 0, blankRow = 3, blankCol = 3;
window.onload = function() {
	var Level = 20;
	createPuzzle();
	document.getElementById('start').onclick = function() {
		if (Begin === 0) startGame(Level);
		else {
			document.getElementById('result').textContent = "Please recover first";
		}
	};
	document.getElementById('recover').onclick = function() {
		recover();
	};
	document.getElementById('level').onclick = function() {
		if (Level === 20) {
			this.textContent = "Level: Normal";
			Level = 50;
		} 
		else if (Level === 50) {
			this.textContent = "Level: Difficult";
			Level = 100;
		}
		else if(Level === 100) {
			this.textContent = "Level: Easy";
			Level = 20;
		}
	};
};

function createPuzzle() {
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < 16; i++) {
		fragment.appendChild(document.createElement('div'));
	}
	document.getElementById('play-box').appendChild(fragment);  //将新增的块加到play-box当中
	var x = document.getElementById('play-box').childNodes;
	for (i = 0; i < x.length; i++) {
		x[i].className = "puzzle col-"+(i-1)%4+" row-"+Math.floor((i-1)/4);   //  为每块新增的拼图添加类名与id
		x[i].id = "puzzle-"+i;
	}
}

//游戏开始
function startGame(Level) {   
	document.getElementById('result').textContent = "Game Starts!";
	Begin = 1;
	blankRow = 3;
    blankCol = 3;
	breakPuzzle(Level);
	
	var x = document.getElementsByClassName('puzzle');
	for (var i = 0; i < x.length; i++) {
		x[i].onclick = function() {
			if (Begin === 1) play(this);
		};
	}
}

//打乱拼图
function breakPuzzle(Level) {
	var pathRow = [1, 0, -1, 0];  // 存ROW下一步可走的方向(上左下右)
	var pathCol = [0, -1, 0, 1];  // 存COL下一步可走的方向
	for (var i = 0; i < Level; i++) {  // 有效滑动
		while (1) {
			var randomNum = Math.floor(Math.random()*4);  // 生成随机数，决定取pathRow,pathCol数组里的第几个数
			var nextRow = blankRow + pathRow[randomNum];
			var nextCol = blankCol + pathCol[randomNum];
			
			if (nextRow < 0 || nextRow > 3 || nextCol < 0 || nextCol > 3) {  //  如果超出拼图范围，则跳出这个循环，生成下一个随机数
				continue;
			} else {
				blankRow = nextRow;
				blankCol = nextCol;
				var a = document.getElementsByClassName("puzzle col-"+blankCol+" row-"+blankRow)[0];
				slip(a);
				break;
			}
		}
	}
	
}

//空白周围的拼图移动
function play(a) {
	var pathRow = [1, -1, 0, 0];  // 存ROW下一步可走的方向(上下左右)
	var pathCol = [0, 0, -1, 1];  // 存COL下一步可走的方向
	//var flag = 0;
	for (var i = 0; i < 4; i++) {
		var nextRow = blankRow + pathRow[i]; // 可移动的row
		var nextCol = blankCol + pathCol[i]; // 可移动的col
		if (a.className == "puzzle col-"+nextCol+" row-"+nextRow) {  //检查点击的是否是可移动的拼图
			blankRow = nextRow;
			blankCol = nextCol;
			//document.getElementById('result').textContent = "Keep moving!";
			//flag = 1;
			slip(a);
			judge(); //判断是否完成拼图
		}
	}
	//if (flag === 0) document.getElementById('result').textContent = "Oops! Try to move other puzzles!";
}

//判断是否完成拼图/胜利
function judge() {
	var flag = 0;
	var count = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var x = document.getElementsByClassName("puzzle col-"+j+" row-"+i)[0];
			count++;
			if (x.id != "puzzle-"+count) flag = 1;
		}
	}
	if (flag === 0) {
		document.getElementById('result').textContent = "You Win!";
		Begin = 0;
	}
}

//滑动拼图
function slip(a) {
	document.getElementById('puzzle-16').id = a.id;
	a.id = "puzzle-16";

}

//复原拼图
function recover() {
	var count = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var x = document.getElementsByClassName("puzzle col-"+j+" row-"+i)[0];
			count++;
			x.id = "puzzle-"+count;
		}
	}
	document.getElementById('result').textContent = "";
	Begin = 0;
}