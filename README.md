# node-mysql-package
mysql进阶学习，在node中封装mysql 启动初始化建表，后台检测 ，日志打印 ，提供数据库调用接口，方便使用   

## 如何使用本项目

```js
 clone:https://github.com/qiuChengleiy/node-mysql-package.git
 
 淘宝镜像命令安装（推荐-速度很快，安装项目依赖不用等太久）
 npm install -g cnpm --registry=https://registry.npm.taobao.org
 
 //安装依赖
 cnpm install
 
 //启动项目
 node app.js
 
 或者（我在package.json里配置了一个启动项，热编译node代码，可以实时刷新，错误检测,依赖supervisor插件）
 -"hot": "./node_modules/.bin/supervisor app.js"
 cnpm run hot 
 
 在浏览器中查看 localhost:3000/  - 
 测试接口 “/koa2” 
 成功客户端会返回 数据库user用户表的所有信息 
 终端返回
 [demo] route-use-middleware 
 hello koa2 [demo] start-quick is starting at port 3000  O(∩_∩)O 
 [SUCCESS] sql脚本文件: data.sql 第1条脚本 执行成功 O(∩_∩)O !
 [SUCCESS] sql脚本文件: user.sql 第1条脚本 执行成功 O(∩_∩)O !
 [SUCCESS] sql脚本文件: user.sql 第2条脚本 执行成功 O(∩_∩)O !
 [SUCCESS] sql脚本文件: user.sql 第3条脚本 执行成功 O(∩_∩)O !
 [SUCCESS] sql脚本文件: user.sql 第4条脚本 执行成功 O(∩_∩)O !
sql脚本执行结束！

 失败请检查路由中sql语句是否正确（注意：DROP TABLE user是否被注释掉，该句会删掉user表），确保mysql服务启动端口号是否正确（默认端口3306）
 
 
```

## 学习前环境准备
nodejs安装 参考：[ runoob ](http://www.runoob.com/nodejs/nodejs-mysql.html) -- 相信绝大多数的小伙伴学习node的时候都装好了

mysql安装 ：[ 下载地址 ](https://www.mysql.com/downloads/) （我用的是mac版）--其他-参考: [ 安装 ](http://www.runoob.com/mysql/mysql-install.html) 


### 安装mysql可能遇到的问题
服务启动和配置: [ 参考 ](https://jingyan.baidu.com/article/e6c8503c51ee97e54e1a186d.html) 

如果遇到这样的问题

![image](Jietu20180406-001641.jpg)

终端输入：

```js
  1| $ sudo service mysqld stop
  
  2| $ cd /usr/bin
  
  3| $ sudo mysqld_safe --skip-grant-tables
  
  4| 打开另一个终端：（快捷键：command+t）
    1|$ mysql |不行的话 ./mysql
    
    2|mysql> use mysql;
    
    3|mysql> UPDATE user SET authentication_string=PASSWORD('输入你想要输入的密码') WHERE user = 'root';
    
    4|mysql> exit;
    
    5|sudo service mysqld start
    
    6|sudo mysqld_safe --skip-grant-tables
    
    7|mysql -u root -p
    
    输入你刚刚设置的密码出现下面，说明数据库成功开启 
    
        Welcome to the MySQL monitor.  Commands end with ; or \g.
        Your MySQL connection id is 137
        Server version: 5.7.21 MySQL Community Server (GPL)

        Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

        Oracle is a registered trademark of Oracle Corporation and/or its
        affiliates. Other names may be trademarks of their respective
        owners.

        Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
        
        //查看服务端口号
        show global variables like 'port'; 
        //查看状态信息
        status; 
        //创建数据库“ 注意！！别忘了分号”；“
        create database nodejs; 
        //使用数据库
        use nodejs; 
        
       
```


### 环境配置的差不多了 这里介绍几个工具
mysql可视化工具： RoboDB Manager (APP Store有免费下载的 界面很简洁实用 )

RAP 是阿里开发人员开发的一款假数据生成平台,可以动态配置接口返回数据,使用mock语法随机生成数据 [官网]（http://rapapi.org/org/index.do）[文档]（https://github.com/thx/RAP/wiki/home_cn）


### 项目框架选择 （本项目用的是koa）
[koa2](https://koa.bootcss.com) (推荐) 个人觉得koa写起来比较优雅，如果用过express，上手也比较快

[express](http://www.expressjs.com.cn/4x/api.html)


### 项目结构分析
``` sh
├── .js # 程序入口文件
├── node_modules/
├── package.json
├── sql   # sql脚本文件目录
│   ├── data.sql
│   └── user.sql
└── util    # 工具代码
    ├── db.js # 封装的mysql模块方法
    ├── get-sql-content-map.js # 获取sql脚本文件内容
    ├── get-sql-map.js # 获取所有sql脚本文件
    └── walk-file.js # 遍历sql脚本文件
```























## 前言
由于mysql模块的操作都是异步操作，每次操作的结果都是在回调函数中执行，现在有了async/await，就可以用同步的写法去操作数据库

