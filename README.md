# node-mysql-package
mysql进阶学习，在node中封装mysql 启动初始化建表，后台检测 ，日志打印 ，提供数据库调用接口，方便使用   

## 学习前环境准备
nodejs安装 参考：[ runoob ](http://www.runoob.com/nodejs/nodejs-mysql.html) -- 相信绝大多数的小伙伴学习node的时候都装好了

mysql安装 ：[ 下载地址 ](https://www.mysql.com/downloads/) （我用的是mac版）--其他-参考: [ 安装 ](http://www.runoob.com/mysql/mysql-install.html) 

### 安装mysql可能遇到的问题
服务启动和配置: [ 参考 ](https://jingyan.baidu.com/article/e6c8503c51ee97e54e1a186d.html) 

如果遇到这样的问题

![Alt text](图片链接 "optional title")



## 前言
由于mysql模块的操作都是异步操作，每次操作的结果都是在回调函数中执行，现在有了async/await，就可以用同步的写法去操作数据库

### Promise封装mysql模块

#### Promise封装 ./async-db
```js
const mysql = require('mysql')
const pool = mysql.createPool({
  host     :  '127.0.0.1',
  user     :  'root',
  password :  '123456',
  database :  'my_database'
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }
```
