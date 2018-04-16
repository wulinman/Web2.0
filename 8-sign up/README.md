# Homework8 - Sign Up

[Click](http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+9.+Sign+up) to see details of homework 8

印象中这次作业是挺难的：）

## 题目

自行设计一个简单的Sign in 注册系统

1. 可用node signin.js 启动程序，然后通过浏览器 <http://localhost:8000/> 访问
2. 有两个界面“注册”、“详情”，使用者通过在浏览器中输入不同的URL，可进入相应界面
   - 当浏览器访问 [http://localhost:8000?username=abc](http://localhost:8000/?username=abc) 时，如果abc是已经注册的用户，则显示abc的“详情”界面
   - 其它情况均显示“注册”界面
   - “注册”界面点击“重置”，清空表单所有内容
   - “注册”界面点击“提交”，成功则跳转到对应用户的“详情”界面，不成功则回到注册界面，并显示错误原因
     - 注意，请使用POST提交
3. 校验
   - 用户名6~18位英文字母、数字或下划线，必须以英文字母开头
   - 学号8位数字，不能以0开头
   - 电话11位数字，不能以0开头
   - 邮箱按照课程讲义中的规则校验
   - 校验发现错误时，要在界面上提示具体出错的原因
   - 用户名、学号、电话、邮箱均不可重复，重复时要在界面上显示具体重复的内容

注意：直接使用文件系统读写来完成，不能够使用现成的http server包。



## 提示

1. 可参考 <http://www.sitepoint.com/creating-a-http-server-in-node-js/> ，看如何动态生成HTML
2. 利用好 [request.url](https://nodejs.org/api/http.html#http_http_incomingmessage) ，判断出浏览器的请求
3. 使用nodejs的File System api 来加载页面的css文件，返回给浏览器



## 需求规格

1. UI（10分）：UI清晰美观
2. 成功注册（20分）：能够成功提交合格数据，注册后显示正确详情
3. 查询详情（10分）：输入形如[http://localhost:8000?username=abc](http://localhost:8000/?username=abc) 时，abc是已注册用户，显示“详情”，否则回到注册页面
4. 数据格式校验（20分）：能够按要求发现格式错误，并提示用户
5. 数据唯一性校验（20分）：能够发现用户名、学号、电话、邮箱的重复，并提示用户

注册表单未采用POST提交，扣10分



## 作业截图

讲道理我的作业跑起来是有背景图，而且UI也很美的：）但是忘了怎么跑，就随便截个图算了。

#### 注册页面 sign up

![sign up](https://github.com/wulinman/Web2.0/blob/master/8-sign%20up/img/demo.png?raw=true)

#### 详情页面 details

![details](https://github.com/wulinman/Web2.0/blob/master/8-sign%20up/img/demo2.png?raw=true)