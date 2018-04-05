//引入模块
const mysql = require('mysql');

//创建链接池
const pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	port: '3306',
	database: 'nodejs'
});

//数据库操作接口封装
let query = function( sql, value ) {
	return new Promise(( resolve, reject ) => {
		pool.getConnection(function( err, connection ) {
			if( err ) {
				reject( err )
			} else {
				connection.query( sql, value, ( err, rows ) => {
					if ( err ) {
						reject( err )
					} else {
						resolve( rows )
					}
				});
			}
		})
	})
};

module.exports = {
	query
}