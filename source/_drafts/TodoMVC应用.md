---
title: TodoMVC应用
tags:
---

使用VueJs实现官方的 [TodoMVC](http://todomvc.com/) 示例，将其数据存储到后端数据库，并部署上线。
[示例](https://vuejs.org/v2/examples/todomvc.html)

<!-- more -->

- [我的项目地址](https://github.com/nsleep/todomvc)
- [我的演示](https://simon-todomvc.herokuapp.com/)


> 环境 Git、Node、npm、heroku

# 一、 TodoMVC 应用

## 1. 下载模板

GitHub[下载](https://github.com/tastejs/todomvc-app-template)模板

```bash
git clone git@github.com:tastejs/todomvc-app-template.git
```

## 2. 获取支持文件

通过`npm`下载模板的CSS和JS文件，以及之后要用到的`Vue.js`。

```bash
cd todomvc-app-template
npm install
npm install vue
```

## 3. 使用Vuejs实现Todo

主要修改`js/app.js`和`index.html`两个文件。

```javascript js/app.js
(function (Vue) {
    // 数据
    let todos=[
        {id:1,title:'吃饭',completed:false},
        {id:2,title:'睡觉',completed:true},
        {id:3,title:'打豆豆',completed:true}
    ];
    /*/ 全局自定义指令,自动获取焦点
    Vue.directive('focus', {
        inserted: function (el) {
              el.focus();
        }
    });*/

    // vue实例
    window.app=new Vue({
        el:'#todoapp',
        data:{
            todos:todos,
            currentEditing:null,
            filterState:'all',
            toggleAllstate:true,
        },
        computed:{
            leftCount:function(){
                return this.todos.filter(item => !item.completed).length
            },
            filterTodos:function(){
                switch(this.filterState){
                    case 'active':
                        return this.todos.filter(item=>!item.completed);
                        break;
                    case 'completed':
                        return this.todos.filter(item=>item.completed);
                        break;
                    default:
                        return this.todos;
                        break;
                };
            },
            // 全选的联动效果
            toggleState:function(){
                return this.todos.every(item=>item.completed);
            },
        },
        methods:{
            // 添加任务
            addTodo(event){
                let todoText=event.target.value.trim();
                if(!todoText.length){
                    return
                }
                const lastTodo=this.todos[this.todos.length-1];
                const id=lastTodo?lastTodo.id+1:1;
                this.todos.push({
                    id:id,
                    title:todoText,
                    completed:false,
                });
                event.target.value='';
            },
            // 点击全部完成或者未完成
            toggleAll(event){
                let checked=event.target.checked;
                this.todos.forEach(todo => todo.completed=checked);
            },
            // 删除单个任务项
            removeTodo(delIndex,event){
                this.todos.splice(delIndex,1);
            },
            // 显示所有未完成任务数(删除所有已完成)
            removeAllDone(){
                this.todos=this.todos.filter((item,index)=>{
                    return !item.completed;//return true,即item.completed为false
                });
            },
            // 保存编辑项
            saveEdit(item,index,event){
                var editText=event.target.value.trim();
                // 如果为空,直接删除这个item
                if(!editText.length){
                    return this.todos.splice(index,1);
                }
                // 如果不为空,修改title的值,然后去除eiditing样式
                item.title=editText;
                this.currentEditing=null;
            },
        },
        directives:{
            // 局部自定义属性
            editingFocus:{
                update(el,binding){
                    if(binding.value){
                        el.focus();
                    }
                },
            },
			focus:{
				inserted: function (el) {
				      el.focus();
				}
			}
        },
    });
    // 路由状态切换
    window.onhashchange=function(){
        var hash=window.location.hash.substr(2) || 'all';
        window.app.filterState=hash;
    };
    // 页面第一次进来,保持状态
    window.onhashchange();
})(Vue);
```

```html index.html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Template • TodoMVC</title>
		<link rel="stylesheet" href="node_modules/todomvc-common/base.css">
		<link rel="stylesheet" href="node_modules/todomvc-app-css/index.css">
		<!-- CSS overrides - remove if you don't need it -->
		<link rel="stylesheet" href="css/app.css">
	</head>
	<body>
		<section id="todoapp" class="todoapp">
			<header class="header">
				<h1>todos</h1>
				<input class="new-todo" placeholder="What needs to be done?" @keyup.enter='addTodo' v-focus>
			</header>
			<!-- This section should be hidden by default and shown when there are todos -->
			<template v-if='todos.length'>
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox" @click='toggleAll' v-bind:checked='toggleState'>
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<!-- These are here just to show the structure of the list items -->
					<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
					<!-- vue列表渲染 -->
					<li v-for="(item,index) of filterTodos" v-bind:class='{completed:item.completed,editing:item===currentEditing}'>
                        <div class="view">
                            <input class="toggle" type="checkbox" v-model='item.completed'>
                            <label @dblclick="currentEditing=item">{{item.title}}</label>
                            <button class="destroy" @click='removeTodo(index,$event)' ></button>
                        </div>
                        <input class="edit" :value='item.title' @blur='saveEdit(item,index,$event)' @keyup.enter='saveEdit(item,index,$event)' @keyup.esc='currentEditing=null' v-editing-focus="item===currentEditing">
                    </li>
				</ul>
			</section>
			<!-- This footer should hidden by default and shown when there are todos -->
			<footer class="footer">
				<!-- This should be `0 items left` by default -->
				<span class="todo-count"><strong>{{leftCount}}</strong> 个待办</span>
				<!-- Remove this if you don't implement routing -->
				<ul class="filters">
					<li>
						<a :class="{selected:filterState==='all'}" href="#/">全部</a>
					</li>
					<li>
						<a :class="{selected:filterState==='active'}" href="#/active">未完成</a>
					</li>
					<li>
						<a :class="{selected:filterState==='completed'}" href="#/completed">已完成</a>
					</li>
				</ul>
				<!-- Hidden if no completed items are left ↓ -->
				<button class="clear-completed" @click='removeAllDone'>清除已完成</button>
			</footer>
			</template>
		</section>
		<footer class="info">
			<p>Double-click to edit a todo</p>
			<!-- Remove the below line ↓ -- >
			<p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
			<!-- Change this out with your name and url ↓ -- >
			<p>Created by <a href="http://todomvc.com">you</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
			<!--  -->
		</footer>
		<!-- Scripts here. Don't remove ↓ -->
		<script src="node_modules/todomvc-common/base.js"></script>
        <script src="node_modules/vue/dist/vue.js"></script>
        <script src="node_modules/axios/dist/axios.min.js"></script>
		<script src="js/app.js"></script>
	</body>
</html>
```

至此，完成了本地Todo。

## 4. 配置本地服务

由于要在`heroku`上部署，这一节将使用`Node`创建`Web`服务。本节有一部分参考[heroku的项目](https://github.com/heroku/node-js-getting-started.git)，使用的是 Web 开发框架[Express](https://www.expressjs.com.cn/) 

通过`npm`下载`express`和`ejs`

```bash
npm install express
npm install ejs
```

在项目根目录下添加`index.js`。

```javascript index.js
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
express()
  .use(express.static(path.join(__dirname, '.')))
  .set('views', path.join(__dirname, 'views'))
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
```
 
尝试执行命令

```bash
node index.js
```

显示

	Listening on 5000

打开 [http://localhost:5000](http://localhost:5000)或者[http://127.0.0.1:5000](http://127.0.0.1:5000)访问本地服务，使用本地IP也是可以的。

## 5. 部署到heroku

部署之前需要在项目根目录添加一个文件`Procfile`

```	bash Procfile
web: node index.js
```

### 1). 通过GitHub部署

先上传到`Github`，然后登录[heroku网站](https://dashboard.heroku.com/apps)在 web控制台配置里配置即可。

### 2). 直接在本地上传部署

下载[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

```bash Windows命令
heroku create ::创建
git push heroku master ::部署
heroku ps:scale web=1 ::运行实例
heroku open ::打开预览
heroku logs --tail ::网站运行日志
```

其他可能用到的

```bash Windows命令
heroku local web ::本地启动

git add -u
git commit -m  "Todo"
git push heroku master
```

## 6. 后端数据库

在这里使用的`postgresql`数据库。在`heroku`中添加`postgresql`数据库。[查看文档](https://elements.heroku.com/addons/heroku-postgresql)。

```bash
heroku addons:create heroku-postgresql:hobby-dev
```

查看数据库(postgresql)。通过以下两种方式之一检索PG连接字符串
```bash
heroku pg:credentials DATABASE
heroku config -s | grep DATABASE_URL
```

设置主数据库(postgresql)，如果存在多个数据库
```bash
heroku pg:promote HEROKU_POSTGRESQL_RED
```

查看数据库使用信息
```bash
heroku pg:info
```

## 7. 封装对postgresql的增删改查基本操作

- [Nodejs对postgresql基本操作的封装·cheneypao·CSDN](https://blog.csdn.net/cheneypao/article/details/51378053)

```javascript PG.js
var pg = require('pg');
var conString = "postgres://username:password@localhost/databasename";
var client = new pg.Client(conString);
 
var PG = function(){
    console.log("准备向****数据库连接...");
};
 
PG.prototype.getConnection = function(){
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query('SELECT NOW() AS "theTime"', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log("hbdfxt数据库连接成功...");
        });
    });
};
 
// 查询函数
//@param str 查询语句
//@param value 相关值
//@param cb 回调函数
var clientHelper = function(str,value,cb){
    client.query(str,value,function(err,result){
        if(err) {
            cb("err");
        }
        else{
            if(result.rows != undefined)
                cb(result.rows);
            else
                cb();
        }
    });
}
//增
//@param tablename 数据表名称
//@param fields 更新的字段和值，json格式
//@param cb 回调函数
PG.prototype.save = function(tablename,fields,cb){
    if(!tablename) return;
    var str = "insert into "+tablename+"(";
    var field = [];
    var value = [];
    var num = [];
    var count = 0;
    for(var i in fields){
        count++;
        field.push(i);
        value.push(fields[i]);
        num.push("$"+count);
    }
    str += field.join(",") +") values("+num.join(",")+")";
    clientHelper(str,value,cb);
};
 
//删除
//@param tablename 数据表名称
//@param fields 条件字段和值，json格式
//@param cb 回调函数
PG.prototype.remove = function(tablename,fields,cb){
    if(!tablename) return;
    var str = "delete from "+tablename+" where ";
    var field = [];
    var value = [];
    var count = 0;
    for(var i in fields){
        count++;
        field.push(i+"=$" +count);
        value.push(fields[i]);
    }
    str += field.join(" and ");
    clientHelper(str,value,cb);
}
 
//修改
//@param tablename 数据表名称
//@param mainfields 条件字段和值，json格式
//@param fields 更新的字段和值，json格式
//@param cb 回调函数
PG.prototype.update = function(tablename,mainfields,fields,cb){
    if(!tablename) return;
    var str = "update "+tablename+" set ";
    var field = [];
    var value = [];
    var count = 0;
    for(var i in fields){
        count++;
        field.push(i+"=$"+count);
        value.push(fields[i]);
    }
    str += field.join(",") +" where ";
    field = [];
    for(var j in mainfields){
        count++;
        field.push(j+"=$"+count);
        value.push(mainfields[j]);
    }
    str += field.join(" and ");
    clientHelper(str,value,cb);
}
 
//查询
//@param tablename 数据表名称
//@param fields 条件字段和值，json格式
//@param returnfields 返回字段
//@param cb 回调函数
PG.prototype.select = function(tablename,fields,returnfields,cb){
    if(!tablename) return;
    var returnStr = "";
    if(returnfields.length == 0)
        returnStr = '*';
    else
        returnStr= returnfields.join(",");
    var str = "select "+returnStr+ " from "+tablename+" where ";
    var field = [];
    var value = [];
    var count = 0;
    for(var i in fields){
        count++;
        field.push(i+"=$"+count);
        value.push(fields[i]);
    }
    str += field.join(" and ");
    clientHelper(str,value,cb);
};
 
module.exports = new PG();
```

使用方法：

```javascript index.js
var pgclient = require('./PG.js');// 引用上述文件
pgclient.getConnection();
 
// 调用上述四个函数即可
pgclient.save('userinfo',{'name': admin},cb);
```

{% note warning %}
创建数据库表可以在`PG.js`中完善。
{% endnote %}


## 8. 后续

以上的代码并不符合我的预期，在之后我对代码稍作修改。

<details>
<summary>js/app.js(折叠)</summary>
<blockquote>

```javascript js/app.js
(function (Vue) {
	let todos=[];
    // vue实例
    window.app=new Vue({
        el:'#todoapp',
        data:{
            todos: todos,
            currentEditing:null,
            filterState:'all',
            toggleAllstate:true,
			owner:'',
        },
		created: function () {
			// this.getTodo();
		},
        computed:{
            leftCount:function(){
                return this.todos.filter(item => !item.completed).length
            },
            filterTodos:function(){
                switch(this.filterState){
                    case 'active':
                        return this.todos.filter(item=>!item.completed);
                        break;
                    case 'completed':
                        return this.todos.filter(item=>item.completed);
                        break;
                    default:
                        return this.todos;
                        break;
                };
            },
            // 全选的联动效果
            toggleState:function(){
                return this.todos.every(item=>item.completed);
            },
        },
        methods:{
			getTodo(){
				var _this = this;
				axios({
				   method:'get',
					url:'/getTodo',
					params: this.owner,
				}).then(function(res){
					//console.log(res);
					_this.todos=[];
					res.data.forEach( (item, index) => {
						_this.todos.push({
							id:index+1,
							title:item.title,
							completed:item.completed
						})
					})
					console.log('获取数据库的Todos：\n',res.data);
					console.log('_this.todos：\n',_this.todos);
				});
			},
            // 设置Owner
            setOwner(event){
				let ownerText=event.target.value.trim();//当前文本的值
				if(!ownerText.length)return;
				this.owner = ownerText;
				this.todos=[];
				this.getTodo();
			},
            // 添加任务
            addTodo(event){
                let todoText=event.target.value.trim();//当前文本的值
                if(!todoText.length)return;
                const lastTodo=this.todos[this.todos.length-1];
                const id=lastTodo?lastTodo.id+1:1;
                this.todos.push({
                    id:id,
                    title:todoText,
                    completed:false,
					//owner: this.owner
                });
				axios({
				   method:'get',
					url:'/addTodo',
					params: {
						title:todoText,
						completed:false,
						owner: this.owner,
					},
				});
                event.target.value='';
            },
            // 全部完成/全不完成
            toggleAll(event){
                let checked=event.target.checked
                this.todos.forEach(todo => todo.completed=checked)
				axios({
				   method:'get',
					url:'/toggleAll',
					params: {
						completed: checked,
						owner: this.owner,
					},
				});
            },
            // check单个任务项
            checkTodo(index,event){
				let _this = this
                let todo = this.todos[index]
				// todo.completed = !(todo.completed)
				axios({
				   method:'get',
					url:'/changeTodo',
					params: {
						filter:{
							title: todo.title,
							owner: _this.owner,
						},
						data:{
							completed: !todo.completed,
						},
					},
				})
				.then(function(res){_this.getTodo()});
            },
            // 删除单个任务项
            removeTodo(delIndex,event){
                let data = this.todos.splice(delIndex,1)[0];
				let _this = this;
				axios({
				   method:'get',
					url:'/removeTodo',
					params: {
						title:data.title,
						completed:data.completed,
						owner: _this.owner,
					},
				})
				.then(function(res){_this.getTodo()});
            },
            // 显示所有未完成任务数(删除所有已完成)
            removeAllDone(){
				let _this = this;
                this.todos=this.todos.filter((item,index)=>{
                    return !item.completed;//return true,即item.completed为false
                });
				axios({
				   method:'get',
					url:'/removeTodo',
					params: {
						completed:true,
						owner: _this.owner,
					},
				})
            },
            // 保存编辑项
            saveEdit(item,index,event){
				let _this = this;
                var editText=event.target.value.trim();
                // 如果为空,直接删除这个item
                if(!editText.length){
					this.removeTodo(index,event)
                    //return this.todos.splice(index,1);
                }
                // 如果不为空,修改title的值,然后去除eiditing样式
				axios({
				   method:'get',
					url:'/changeTodo',
					params: {
						data:{
							editText:editText,
						},
						filter:{
							title:item.title,
							owner: _this.owner,
						}
					},
				})
                item.title=editText;
                this.currentEditing=null;
            },
        },
        directives:{
            // 局部自定义属性
            editingFocus:{
                update(el,binding){
                    if(binding.value){
                        el.focus();
                    }
                },
            },
			focus:{
				inserted: function (el) {
				      el.focus();
				}
			}
        },
    });
    // 路由状态切换
    window.onhashchange=function(){
        var hash=window.location.hash.substr(2) || 'all';
        window.app.filterState=hash;
    };
    // 页面第一次进来,保持状态
    window.onhashchange();
})(Vue);
```
</blockquote>
</details>

<details>
<summary>index.html (折叠)</summary>
<blockquote>

```html index.html 
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Template • TodoMVC</title>
		<link rel="stylesheet" href="node_modules/todomvc-common/base.css">
		<link rel="stylesheet" href="node_modules/todomvc-app-css/index.css">
		<!-- CSS overrides - remove if you don't need it -->
		<link rel="stylesheet" href="css/app.css">
	</head>
	<body>
		<section id="todoapp" class="todoapp">
			<header class="header">
				<h1><input class="new-todo" placeholder="你的名字" style="display: table-cell;width: 40%;padding: 6px 12px;color: #555;background-color: #fff;border: 1px solid #ccc;box-shadow: inset 0 1px 1px rgba(0,0,0,.075);font-size: 30px;top: -12px;" @keyup.enter='setOwner' > <span>todos</span> </h1>
				<input class="new-todo" placeholder="What needs to be done?" @keyup.enter='addTodo' v-focus>
			</header>
			<!-- This section should be hidden by default and shown when there are todos -->
			<template v-if='todos.length'>
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox" @click='toggleAll' v-bind:checked='toggleState'>
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<!-- These are here just to show the structure of the list items -->
					<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
					<!-- vue列表渲染 -->
					<li v-for="(item,index) of filterTodos" v-bind:class='{completed:item.completed,editing:item===currentEditing}'>
                        <div class="view">
                            <input class="toggle" type="checkbox" @click='checkTodo(index,$event)' v-model='item.completed'>
                            <label @dblclick="currentEditing=item">{{item.title}}</label>
                            <button class="destroy" @click='removeTodo(index,$event)' ></button>
                        </div>
                        <input class="edit" :value='item.title' @blur='saveEdit(item,index,$event)' @keyup.enter='saveEdit(item,index,$event)' @keyup.esc='currentEditing=null' v-editing-focus="item===currentEditing">
                    </li>
				</ul>
			</section>
			<!-- This footer should hidden by default and shown when there are todos -->
			<footer class="footer">
				<!-- This should be `0 items left` by default -->
				<span class="todo-count"><strong>{{leftCount}}</strong> 个待办</span>
				<!-- Remove this if you don't implement routing -->
				<ul class="filters">
					<li>
						<a :class="{selected:filterState==='all'}" href="#/">全部</a>
					</li>
					<li>
						<a :class="{selected:filterState==='active'}" href="#/active">未完成</a>
					</li>
					<li>
						<a :class="{selected:filterState==='completed'}" href="#/completed">已完成</a>
					</li>
				</ul>
				<!-- Hidden if no completed items are left ↓ -->
				<button class="clear-completed" @click='removeAllDone'>清除已完成</button>
			</footer>
			</template>
		</section>
		<footer class="info">
			<p>Double-click to edit a todo</p>
			<!-- Remove the below line ↓ -- >
			<p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
			<!-- Change this out with your name and url ↓ -- >
			<p>Created by <a href="http://todomvc.com">you</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
			<!--  -->
		</footer>
		<!-- Scripts here. Don't remove ↓ -->
		<script src="node_modules/todomvc-common/base.js"></script>
        <script src="node_modules/vue/dist/vue.js"></script>
        <script src="node_modules/axios/dist/axios.min.js"></script>
		<script src="js/app.js"></script>
	</body>
</html>
```
</blockquote>
</details>

<details>
<summary>index.js(折叠)</summary>
<blockquote>

```javascript index.js
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

const tableNme = 'todos'
var cb=console.log;
var pgclient = require('./PG.js');// 引用文件
pgclient.getConnection();
app.use(express.static(path.join(__dirname, '.')))

app.set('views', path.join(__dirname, 'views'))
app
	.get('/', (req, res) => res.render('index'))
	.get('/getTodo',  (req, res) => { //async
		console.log('fields:',req.query[0])
		pgclient.select(tableNme,{owner:req.query[0]},['title','completed'],function(result){res.json(result)})
	})
	.get('/addTodo', (req, res) => {
		console.log('addTodo',req.query)
		pgclient.save(tableNme,{title:req.query.title,completed:req.query.completed,owner:req.query.owner},function(res){console.log(res)})
		pgclient.query('select * from todos','',cb)
		res.json()
	})
	.get('/toggleAll', (req, res) => {
		console.log('toggleAll',req.query)
		pgclient.update(tableNme,{owner:req.query.owner},{completed:req.query.completed},function(res){console.log(res)})
		pgclient.query('select * from todos','',cb)
		res.json()
	})
	.get('/removeTodo', (req, res) => {
		console.log('removeTodo:',req.query)
		pgclient.remove(tableNme,{title: req.query.title, completed: req.query.completed, owner: req.query.owner},function(res){console.log(res)})
		pgclient.query('select * from todos','',cb)
		res.json()
	})
	.get('/saveEdit', (req, res) => {
		console.log('saveEdit:',req.query)
		pgclient.update(tableNme,
			{
				title:req.query.title,
				owner:req.query.owner,
			},{
				completed:req.query.completed,
			},function(res){
				console.log(res)
			})
		pgclient.query('select * from todos','',cb)
		res.json()
	})
	.get('/changeTodo', (req, res) => {
		console.log('changeTodo.query:',req.query)
		pgclient.update(tableNme, JSON.parse(req.query.filter), JSON.parse(req.query.data),
			function(res){
				console.log(res)
			})
		pgclient.query('select * from todos','',cb)
		res.json()
	})
	// 直接在地址栏输入，以添加数据表，createTable/deletTable 这两个操作比较危险，仅建议在开发时使用
	.get('/createTable', (req, res) => {
		let que = pgclient.query('CREATE TABLE "public"."todos" (  "id" serial4 ,  "title" varchar(255) NOT NULL,  "completed" bool NOT NULL,  "owner" varchar(255) NOT NULL,  PRIMARY KEY ("id"));',null,cb)
		res.send(que)
	})
	.get('/deletTable', (req, res) => {
		let que = pgclient.query('DROP TABLE todos;',null,cb)
		res.send(que)
	})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
```

</blockquote>
</details>

<details>
<summary>PG.js(折叠)</summary>
<blockquote>

```javascript index.js
var pg = require('pg');
//  heroku pg:credentials DATABASE //查询数据库信息
// heroku config -s | grep DATABASE_URL
var conString = "postgres://UesrName:PassWord@Host:Port/DataBase";
var client = new pg.Client({
	connectionString: conString,
	ssl: {
		rejectUnauthorized: false
	},
});


var PG = function(){
    console.log("准备向postgres数据库连接...");
};


PG.prototype.getConnection = function(){
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query('SELECT NOW() AS "theTime"', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log("数据库连接成功...",result.rows[0].theTime);
        });
    });
};

// 执行者函数
//@param str 查询语句
//@param value 相关值
//@param cb 回调函数
var clientHelper = function(str,value,cb){
    client.query(str,value,function(err,result){
        if(err) {
            cb("err: ",err);
        }else{
            if(result.rows != undefined)
                cb(result.rows);
            else
                 cb();
        }
    });
}
//增
//@param tablename 数据表名称
//@param fields 更新的字段和值，json格式
//@param cb 回调函数
PG.prototype.save = function(tablename,fields,cb){
    if(!tablename) return;
    var str = "insert into "+tablename+"(";
    var field = [];
    var value = [];
    var num = [];
    var count = 0;
    for(var i in fields){
        count++;
        field.push(i);
        value.push(fields[i]);
        num.push("$"+count);
    }
    str += field.join(",") +") values("+num.join(",")+")";

	// str += ";";
	// str= "insert into todos (id,title,completed) values ($1::int, $2::varchar, $3::bool)"
	// value = [1,'吃饭',false]
    clientHelper(str,value,cb);
};

//删除
//@param tablename 数据表名称
//@param fields 条件字段和值，json格式
//@param cb 回调函数
PG.prototype.remove = function(tablename,fields,cb){
    if(!tablename) return;
    var str = "delete from "+tablename+" where ";
    var field = [];
    var value = [];
    var count = 0;
    for(var i in fields){
        count++;
        field.push(i+"=$" +count);
        value.push(fields[i]);
    }
    str += field.join(" and ");
    clientHelper(str,value,cb);
}

//修改
//@param tablename 数据表名称
//@param mainfields 条件字段和值，json格式
//@param fields 更新的字段和值，json格式
//@param cb 回调函数
PG.prototype.update = function(tablename,mainfields,fields,cb){
    if(!tablename) return;
    var str = "update "+tablename+" set ";
    var field = [];
    var value = [];
    var count = 0;
    for(var i in fields){
        count++;
        field.push(i+"=$"+count);
        value.push(fields[i]);
    }
    str += field.join(",") +" where ";
    field = [];
    for(var j in mainfields){
        count++;
        field.push(j+"=$"+count);
        value.push(mainfields[j]);
    }
    str += field.join(" and ");
    clientHelper(str,value,cb);
}

//查询
//@param tablename 数据表名称
//@param fields 条件字段和值，json格式 【筛选，例如：{age:25},即仅查询age=25的数据】
//@param returnfields 返回字段 数组格式【表中字段名】
//@param cb 回调函数
PG.prototype.select = function(tablename,fields,returnfields,cb){
    if(!tablename) return;
    var returnStr = "";
    if(returnfields.length == 0)
        returnStr = '*';
    else
        returnStr= returnfields.join(",");
    var str = "select "+returnStr+ " from "+ tablename;
	if(fields){
		var field = [];
		var value = [];
		var count = 0;
		for(var i in fields){
			count++;
			field.push(i+"=$"+count);
			value.push(fields[i]);
		}
		str += " where "+field.join(" and ");
	}

	//str = "select * from todo;";//######
	//str = "DELETE FROM todo;";//######
    clientHelper(str,value,cb);
};

//自定义
//@param str SQL语句
//@param value 
//@param cb 回调函数
PG.prototype.query = function(str,value,cb){
	return clientHelper(str,value,cb);
}
module.exports = new PG();
```
</blockquote>
</details>

<details>
<summary>package.json(折叠)</summary>
<blockquote>

```json package.json
{
  "private": true,
  "scripts": {
    "start": "node index.js",
    "test": "node test.js"
  },
  "dependencies": {
    "axios": "^0.19.2",
    "body-parser": "^1.19.0",
    "ejs": "^2.7.4",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "http-server": "^0.12.3",
    "node-postgres": "^0.6.0",
    "pbkdf2-password": "^1.2.1",
    "pg": "^8.2.1",
    "todomvc-app-css": "^2.0.0",
    "todomvc-common": "^1.0.0",
    "vue": "^2.6.11"
  }
}
```
</blockquote>
</details>

## X. 关于登录 

关于登录操作官网有个[示例](https://github.com/expressjs/express/blob/master/examples/auth/index.js)
下载两个模块

```bash
npm install pbkdf2-password
npm install express-session
```

# 参考资料

- [Todomvc](http://todomvc.com/)
- [框架入门经典项目TodoMVC·澎湃_L·博客园](https://www.cnblogs.com/EricZLin/p/9369260.html)
- [vuejs示例](https://vuejs.org/v2/examples/todomvc.html)
- [Nodejs对postgresql基本操作的封装·cheneypao·CSDN](https://blog.csdn.net/cheneypao/article/details/51378053)
- [Heroku 使用教程](https://www.jianshu.com/p/7bc34e56fa39)
- [使用Node.js在Heroku上开始](https://www.jianshu.com/p/5007e533eff9)