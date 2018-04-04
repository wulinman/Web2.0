// By Wu Linman

window.onload = function () {
	var input = []; // input is an array
	document.getElementById('7').onclick = function() {
		if (input.length == 1 && input[0] == 0) {
			input.pop();
		}
		else if (input.length > 1 && input[input.length-1] == 0) {
			if (input[input.length-2] == '+' || input[input.length-2] == '-' || input[input.length-2] == '*' || input[input.length-2] == '/' || input[input.length-2] == '(') {
				input.pop();
			}
		}
		input.push('7');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('8').onclick = function() {
		if (input.length == 1 && input[0] == 0) {
			input.pop();
		}
		else if (input.length > 1 && input[input.length-1] == 0) {
			if (input[input.length-2] == '+' || input[input.length-2] == '-' || input[input.length-2] == '*' || input[input.length-2] == '/' || input[input.length-2] == '(') {
				input.pop();
			}
		}	
		input.push('8');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('9').onclick = function() {
		if (input.length == 1 && input[0] == 0) {
			input.pop();
		}
		else if (input.length > 1 && input[input.length-1] == 0) {
			if (input[input.length-2] == '+' || input[input.length-2] == '-' || input[input.length-2] == '*' || input[input.length-2] == '/' || input[input.length-2] == '(') {
				input.pop();
			}
		}	
		input.push('9');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('/').onclick = function() {
		input.push('/');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('4').onclick = function() {
		if (input.length == 1 && input[0] == 0) {
			input.pop();
		}
		else if (input.length > 1 && input[input.length-1] == 0) {
			if (input[input.length-2] == '+' || input[input.length-2] == '-' || input[input.length-2] == '*' || input[input.length-2] == '/' || input[input.length-2] == '(') {
				input.pop();
			}
		}	
		input.push('4');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('5').onclick = function() {
		if (input.length == 1 && input[0] == 0) {
			input.pop();
		}
		else if (input.length > 1 && input[input.length-1] == 0) {
			if (input[input.length-2] == '+' || input[input.length-2] == '-' || input[input.length-2] == '*' || input[input.length-2] == '/' || input[input.length-2] == '(') {
				input.pop();
			}
		}	
		input.push('5');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('6').onclick = function() {
		if (input.length == 1 && input[0] == 0) {
			input.pop();
		}
		else if (input.length > 1 && input[input.length-1] == 0) {
			if (input[input.length-2] == '+' || input[input.length-2] == '-' || input[input.length-2] == '*' || input[input.length-2] == '/' || input[input.length-2] == '(') {
				input.pop();
			}
		}
		input.push('6');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('*').onclick = function() {
		input.push('*');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('1').onclick = function() {
		if (input.length == 1 && input[0] == 0) {
			input.pop();
		}
		else if (input.length > 1 && input[input.length-1] == 0) {
			if (input[input.length-2] == '+' || input[input.length-2] == '-' || input[input.length-2] == '*' || input[input.length-2] == '/' || input[input.length-2] == '(') {
				input.pop();
			}
		}
		input.push('1');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('2').onclick = function() {
		if (input.length == 1 && input[0] == 0) {
			input.pop();
		}
		else if (input.length > 1 && input[input.length-1] == 0) {
			if (input[input.length-2] == '+' || input[input.length-2] == '-' || input[input.length-2] == '*' || input[input.length-2] == '/' || input[input.length-2] == '(') {
				input.pop();
			}
		}
		input.push('2');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('3').onclick = function() {
		if (input.length == 1 && input[0] == 0) {
			input.pop();
		}
		else if (input.length > 1 && input[input.length-1] == 0) {
			if (input[input.length-2] == '+' || input[input.length-2] == '-' || input[input.length-2] == '*' || input[input.length-2] == '/' || input[input.length-2] == '(') {
				input.pop();
			}		
		}
		input.push('3');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('-').onclick = function() {
		input.push('-');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('0').onclick = function() {
		if (input.length == 1 && input[0] == 0) {
			input.pop();
		}
		else if (input.length > 1 && input[input.length-1] == 0) {
			if (input[input.length-2] == '+' || input[input.length-2] == '-' || input[input.length-2] == '*' || input[input.length-2] == '/' || input[input.length-2] == '(') {
				input.pop();
			}		
		}
		input.push('0');
		document.getElementById("output").value = input.join('');
	}

	document.getElementById('.').onclick = function() {
		input.push('.');
		document.getElementById("output").value = input.join('');
	}
	document.getElementById('←').onclick = function() {
		input.pop();
		document.getElementById("output").value = input.join('');
	}
	document.getElementById('+').onclick = function() {
		input.push('+');
		document.getElementById("output").value = input.join('');
	}
	document.getElementById('(').onclick = function() {
		input.push('(');
		document.getElementById("output").value = input.join('');
	}
	document.getElementById(')').onclick = function() {
		input.push(')');
		document.getElementById("output").value = input.join('');
	}
	document.getElementById("CE").onclick = function() {
		var num = input.length;
		for (var i = num - 1; i >= 0; i--) {
			input.pop();
		}
		document.getElementById("output").value = input.join('');
	}
	document.getElementById("equal").onclick = function() {
		if (input.length == 0) {
			var result = 0;
			input.push('0');
			document.getElementById("output").value = result;
			input.pop();
		} else {
			try {
				if (input.length > 0 && input[input.length-1] == '0' && input[input.length-2] == '/') {
					throw(SyntaxError);
				} else {
					var num = input.length;
					var result = eval(input.join(''));
					document.getElementById("output").value = result;
					input.push(eval(input.join(''))); 
					for (var i = 0; i < num; i++) {
						input.shift();
					}  // only the result left in array
					if (result == 0) {
						input.pop();
					}
				}
			}
			catch(SyntaxError) {
				alert("Error: Arithmetic expression illegal!");
				var num = input.length;
				for (var i = num - 1; i >= 0; i--) {
					input.pop();
				}
				document.getElementById("output").value = input.join('');
			}
		}	
	}
}