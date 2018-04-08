
$(document).ready(function(){
	input = ['0'];
	$('#output').attr('value',input.join(''));
	display();
	clear();
	recall();
	calculate();
});
function display() {
	$('.button').click(function(){
		if (input.length <= 15 && isValid(this) != 0) {  //  控制输入表达式的长度
			var clickValue = $(this).attr('value');
			if (clickValue == '.') isPoint(this);
			if (isNumber(clickValue)) checkZero(this);
			input.push(clickValue);
			$('#output').attr('value',input.join(''));
		}
	});
}
function recall() {
	$('#←').click(function() {
		if (input.length > 0) input.pop();
		if (input.length === 0) input.push('0');
		$('#output').attr('value',input.join(''));
	});
}
function clear() {
	$('#CE').click(function() {
		var num = input.length;
		for (var i = num - 1; i >= 0; i--) {
			input.pop();
		}
		input.push('0');
		$('#output').attr('value',input.join(''));
	});
	
}
function calculate() {
	$('#equal').click(function() {
		try {
			if (input.length > 0 && input[input.length-1] == '0' && input[input.length-2] == '/') {
				throw(SyntaxError);
			} else {
				var num = input.length; // 记下当前表达式的长度
				var result = eval(input.join(''));
				$('#output').attr('value', result);
				input.push(result);
				for (var i = 0; i < num; i++) input.shift(); // only the result left in array
			}
		}
		catch(SyntaxError) {
			  $('#output').attr('value', 'Error');
			  for (var i = input.length - 1; i >= 0; i--) input.pop();  // refresh the []
			}
	});
}
function isValid(that) {
	var nextInput = $(that).attr('value');
	if (input.length > 0) {
		var lastInput = input[input.length-1];
		if (lastInput === nextInput && nextInput === '.') return 0;  //不可重复输入小数点
	}
}
function isPoint(that) {
	var nextInput = $(that).attr('value');
	if (input.length == 0) {
		input.push('0');  // 第一个输入小数点时自动补0
		return 1;
	}
	else {  // 当小数点前面是符号时也自动补0
		var lastInput = input[input.length-1];
		if (isOperator(lastInput)) {
			input.push('0');
			return 1;
		}
	}
}
function checkZero(that) {
	if (input.length === 0) return;
	var lastInput = input[input.length-1];
	var nextInput = $(that).attr('value');
	if (input.length === 1 && lastInput == '0') input.pop();  // 若第一个0为多余的0，则抹去
	if (input.length > 1) {
		var priviousInput = input[input.length-2];
		if (isOperator(priviousInput) && lastInput == '0') input.pop();  // 若符号后的为多余的0，则抹去
	}
}
function isOperator(that) {
	if (that === '+' || that === '-' || that === '*' || that === '/' || that === '(' || that == ')') return 1;
}
function isNumber(that) {
	if (that >= 0 && that <= 9) return 1;
}