var url = require('url');
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

http.createServer(function(request,response) {
	//  对所提交的表单进行处理
	if (request.method == 'POST') {
		getInput(request,response);
		console.log('get user information');
	} else {
		getRequest(request,response);
		console.log('get css or js');
	}
}).listen(8080);
console.log('Server running at http://localhost:8080/');


// 处理请求
function getRequest(request,response) {
	var pathname = url.parse(request.url).pathname;
    //  请求的是JS或CSS
	if (pathname.match(/.css/) != null) {
		console.log(pathname);
		getCss(pathname, response); // 将CSS和JS写入
	}
	else if (pathname.match(/.js/) != null) {
		console.log(pathname);
		getJs(pathname, response); // 将CSS和JS写入
	}
	//  请求的是搜索的用户
	else {
		var searchInfo = querystring.parse(url.parse(request.url).query);
		searchUser(response,searchInfo);
	}
}

// 读写CSS和JS
function getCss(pathname,response) {
	fs.readFile('css'+pathname, function(err,data) {
			if (err) console.error(err);
			if (pathname.match(/.css/) != null) {
				response.writeHead(200,{'Content-Type':'text/css; charset=utf-8'}); // 写入css
				//console.log('get css success');
			}
			response.end(data);
		});
}

function getJs(pathname,response) {
	fs.readFile('js'+pathname, function(err,data) {
			if (err) console.error(err);
			if (pathname.match(/.js/) != null) {
				response.writeHead(200,{'Content-Type':'text/javascript; charset=utf-8'}); // 写入js
				//console.log('get js success');
			}
			response.end(data);
		});
}


//  搜索用户
function searchUser(response,searchInfo) {
	if (searchInfo != null) {  // 搜索的信息不为空
		fs.readFile('input.json', function(err,data) {
			if (err) console.error(err);
			if (data == null || data == undefined || data.length == 0) data += '[]';
			var oldUsers = JSON.parse(data);
			var searchResult = null;
			for (var i = 0; i < oldUsers.length; i++) {
				if (oldUsers[i].username == searchInfo.username) 
					searchResult = oldUsers[i]; // 返回找到的user对象
			}
			//var searchResult = findUser(oldUsers,searchInfo);
			if (searchResult != null) showDetail(response,searchResult); // 找到则显示该用户的详情
			else showIndex(response); // 找不到则显示主页
		})
	}
}


// 在文档中寻找搜索的用户
/*function findUser(oldUsers,searchInfo) {
	for (var i = 0; i < oldUsers.length; i++) {
		if (oldUsers[i].username == searchInfo.username) return oldUsers[i]; // 返回找到的user对象
	}
	// 找不到则返回null
	return null;
}*/


function getInput(request,response) {
	var userData = "";
	request.addListener('data',function(e) {
		if (e != undefined) userData += e;
	});
	request.addListener('end',function() {
		var user = querystring.parse(userData); // 将新用户的信息存成一个对象
		createUser(response,user);
	});
	//console.log('get input');
}

// 创建新用户，并写入文档中
function createUser(response, newUser) {
	console.log('try to create user');
	fs.readFile('input.json', function(err,data) {
		if (err) console.error(err);
		if (data == null || data == undefined || data.length == 0) data += '[]';
		var oldUsers = JSON.parse(data);  // 将文件中的旧用户转存为对象,并存入该数组中
		var warning = isRepeat(oldUsers, newUser); //比较新老用户信息是否重复
		if  (warning != null) {  // 存在重复信息
			showIndex(response,warning); // 信息重复则不跳转，继续显示主页
		} else {  // 不存在重复信息
			oldUsers.push(newUser);
			//var string = JSON.stringify(oldUsers); // 将数组中的信息转为字符串
			fs.writeFileSync('input.json', JSON.stringify(oldUsers)); // 将新用户的信息存入文档中
			showDetail(response,newUser); // 跳转到用户详情界面
		}
	});
}

// 显示登陆页面
function showIndex(response,warning) {
	console.log('show index');
	response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); // 改html
	fs.readFile('index.html',function(err,data) {
		if (err) console.error(err);
		if (warning == undefined || warning == null) {
			response.write(data);
		} else {
			var pageInfo = data.toString();
			pageInfo = pageInfo.replace('warningInfo', warning); // 修改warning的内容
			response.write(pageInfo); //将index新内容显示在当前页面
			console.log(pageInfo);
		}
		response.end();
	});
}

// 显示用户详情页面
function showDetail(response,newUser) {
	console.log('go to detail page');
	response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
	fs.readFile('signin.html',function(err,data) { // 读取signin.html
		if (err) console.error(err);
		var pageInfo = data.toString();
		//  修改信息，显示新用户详情
		pageInfo = pageInfo.replace('Username', newUser.username);
		pageInfo = pageInfo.replace('StudentId', newUser.studentId);
		pageInfo = pageInfo.replace('Phone', newUser.phone);
		pageInfo = pageInfo.replace('Email', newUser.email);
		// 刷新页面
		response.write(pageInfo);
		response.end();
	});
}

//判断输入的信息是已存的否重复
function isRepeat(old, newUser) { 
	for (var i = 0; i < old.length; i++) {
		if (newUser.username == old[i].username) return "此用户名已存在";
		if (newUser.studentId == old[i].studentId) return "此学号已存在";
		if (newUser.phone == old[i].phone) return "此电话号码已存在";
		if (newUser.email == old[i].email) return "此邮箱已存在";
	}
	return null;
}

