//app.js
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

//后台模拟数据
const mockdb = require('./dataBase/mock')();

//引入数据库入口文件 - mysql;
const mysql = require('./dataBase/index')();


//对跨域的简单配置
//用通配符 * 可以实现 所有 跨域的请求
app.use(async (ctx, next) => {
 ctx.set('Access-Control-Allow-Origin', '*');
 ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
 ctx.set('Access-Control-Max-Age', 3600 * 24);
 ctx.set('Access-Control-Allow-Credentials', true);
 await next();
});

//加载路由子模块
const router = require('./routes/router');
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// service port
app.listen(3000, () => {
  console.log('[demo] route-use-middleware \n hello koa2 [demo] start-quick is starting at port 3000  O(∩_∩)O ');
});

//当使用supervisor监听node时，不需要在另外node app.js启动了
//[package.json] "hot": "./node_modules/.bin/supervisor app.js"



