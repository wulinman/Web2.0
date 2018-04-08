var Begin = 0, blankRow = 3, blankCol = 3, Level = 20;
$(document).ready(function() {
	Level = 3;
	$('#start').click(function() {
		if (Begin === 0) startGame();
		else $('#result').text('Please recover first');
	});
	$('#recover').click(function() {
		recover();
	});
	$('#level').click(function() {
		changeLevel();
	})	
});

function changeLevel() {
	if (Level === 3) {
		$('#level').text('Level: Normal');
		Level = 5;
	} 
	else if (Level === 5) {
		$('#level').text('Level: Difficult');
		Level = 10;
	}
	else if(Level === 10) {
		$('#level').text('Level: Easy');
		Level = 2;
	}
}

function startGame() {
	$('#result').text('Game Starts!');
	Begin = 1;
	blankRow = 3;
    blankCol = 3;
	Shuffle();
	$('.puzzle').click(function() {
		if (Begin === 1) play($(this));
	});
}

function Shuffle() {
	var pathRow = [1, 0, -1, 0];  // 存ROW下一步可走的方向(上左下右)
	var pathCol = [0, -1, 0, 1];  // 存COL下一步可走的方向
	var count = Level;
	while(count--) {  // 有效滑动
		while (1) {
			var randomNum = Math.floor(Math.random()*4);  // 生成随机数，决定取pathRow,pathCol数组里的第几个数
			var nextRow = blankRow + pathRow[randomNum];
			var nextCol = blankCol + pathCol[randomNum];
			
			if (nextRow < 0 || nextRow > 3 || nextCol < 0 || nextCol > 3) {  //  如果超出拼图范围，则跳出这个循环，生成下一个随机数
				continue;
			} else {
				blankRow = nextRow;
				blankCol = nextCol;
				for (var j = 17; j > 0; j--) {
					var thisPuzzle = $('#puzzle'+j);
					if (thisPuzzle.css('left') == nextCol*100+'px' && thisPuzzle.css('top') == nextRow*100+'px') {
						ChangePosition(thisPuzzle);
						break;
					}
				}
				break;
			}
		}
	}
}

//空白周围的拼图移动
function play(that) {
	var pathRow = [1, 0, -1, 0];  // 存ROW下一步可走的方向(上下左右)
	var pathCol = [0, -1, 0, 1];  // 存COL下一步可走的方向
	for (var i = 0; i < 4; i++) {
		var nextRow = blankRow + pathRow[i]; // 可移动的row
		var nextCol = blankCol + pathCol[i]; // 可移动的col
		if (that.css('left') == nextCol*100+'px' && that.css('top') == nextRow*100+'px') {  //检查点击的是否是可移动的拼图
			blankRow = nextRow;
			blankCol = nextCol;
			ChangePosition(that);
			judge(); //判断是否完成拼图
		}
	}
}

//判断是否完成拼图/胜利
function judge() {
	/*var flag = 0;
	for (var i = 1; i < 17; i++) {
		if (IsInPosition($('#puzzle'+i)) != 1) flag = 1;
	}
	if (flag == 0) {
		$('#result').text('You Win!');
		Begin = 0;
	}*/
	if (blankRow == 3 && blankCol == 3) {
		$('#result').text('You Win!');
		Begin = 0;
	}
}

function ChangePosition(that) {
	var left = $('#puzzle16').css('left');
	var top = $('#puzzle16').css('top');
	$('#puzzle16').css({'left':that.css('left'),'top':that.css('top')});
	that.css({'left': left, 'top': top});
}

function IsInPosition(that) {
	var PuzzleNum = 0;
	for (var i = 1; i < 17; i++) {
		if (that.attr('id') == 'puzzle'+i) {
			PuzzleNum = i;
			break;
		}
	}
	var col = (PuzzleNum-1)%4;
	var row = Math.floor((i-1)/4);
	if (that.css('left') == col*100 + 'px' && that.css('top') == row*100 + 'px') return 1;
	else return 0;
}
//复原拼图
function recover() {
	for (var i = 1; i < 17; i++) {
		var col = (i-1)%4;
		var row = Math.floor((i-1)/4);
		$('#puzzle'+i).css({'left': col*100+'px','top': row*100+'px'});
	}
	$('#result').text('');
	Begin = 0;
}