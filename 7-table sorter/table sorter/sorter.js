$(document).ready(function() {
	$(function () {
		sort('#todo');
		sort('#staff');
	});
});
function sort(id) {
	$(id).find('th').click(function() {
		changeColor($(this));
	var indexOfClick = $(this).index();
		var getRow = $(id).find('tbody').find('tr');
		for (var i = 0; i < 9; i++) {
			if (i === indexOfClick || i === indexOfClick+3 || i === indexOfClick+6)
				$(id).find('tbody').find('td').eq(i).addClass('compare');  // 向需要比较的列增加class
		}
		var compareData = [$('.compare').eq(0),$('.compare').eq(1),$('.compare').eq(2)];  // 将需要比较的数据放入compareData数组中
		var img = $(this).find('img').attr('src');
		if (img === 'img/ascend.png') ascendSort(compareData,getRow);
		if (img === 'img/descend.png') descendSort(compareData,getRow);	
	});
}
function ascendSort(compareData,getRow) {  //正序排列
	for (var i = 0; i < 2; i++) { // bubble sort
		for (var j = 0; j < 2-i; j++) {
			if (compareData[j].text().localeCompare(compareData[j+1].text()) > 0) { //compareData[j].text() > compareData[j+1].text()
				switchRow(getRow.eq(j),getRow.eq(j+1));
				compareData = [$('.compare').eq(0),$('.compare').eq(1),$('.compare').eq(2)];  //刷新compareData的顺序
			}
		}
	}
	$('.compare').removeClass('compare'); //排列结束，清除class
}
function descendSort(compareData,getRow) {  //倒序排列
	for (var i = 0; i < 2; i++) {  //  bubble sort
		for (var j = 0; j < 2-i; j++) {
			if (compareData[j].text().localeCompare(compareData[j+1].text()) < 0) { //compareData[j].text() < compareData[j+1].text()
				switchRow(getRow.eq(j),getRow.eq(j+1));
				compareData = [$('.compare').eq(0),$('.compare').eq(1),$('.compare').eq(2)];  //刷新compareData的顺序
			}
		}
	}
	$('.compare').removeClass('compare'); //排列结束，清除class
}
function switchRow(a, b) {  //  交换a,b的内容
	var temp = a.html();
	a.html(b.html());
	b.html(temp);
}
function changeColor(nowClick) {
		var className = nowClick.attr('class');
		var scend = nowClick.find('img');
		if (className === 'choose') {
			if (scend.attr('src') === 'img/ascend.png') {
				scend.attr('src', 'img/descend.png');
			} else {
				scend.attr('src', 'img/ascend.png');
			}
		} else if (className != 'choose') {
			$(".choose").find('img').attr('src','img/ascend.png');
			$('.choose').removeClass('choose');
			nowClick.addClass('choose');
		}
}
