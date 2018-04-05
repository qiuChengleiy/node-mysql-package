//router.js
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
let home = new Router();


//调用数据库接口
const { query } = require('../dataBase/util/db');


// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/childs/helloworld">/childs/helloworld</a></li>
      <li><a href="/childs/404">/childs/404</a></li>
    </ul>
  `
  ctx.body = html;
}).get('koa2', async ( ctx ) => {
    //在路由中调用数据库接口 进行数据库操作；

    const users = {
     	name: 'node-mysql',
     	password: '123'
     };
   
   //查询 | 插入
    let sql = 'SELECT * FROM user';
    let addData = "INSERT INTO user( name, password ) VALUES( ?,? )";
    
    //使用接口
    let datas = await query(sql);
    let adds = await query(addData,[users.name,users.password]);
    
    //删除表
    let deletes = await query("DROP TABLE user");
    
    //返回给客户端
    ctx.body = datas;
    console.log('sql is using...');
});


// 子路由2
let routeChilds = new Router();
page.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
}).get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
});


// 装载所有子路由
let router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/childs', routeChilds.routes(), routeChilds.allowedMethods());

module.exports = router;




