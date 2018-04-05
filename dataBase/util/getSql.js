const fs = require('fs');
const ergodicFile = require('./ergodicFile');

//获取sql目录下的文件目录数据
function getSqlMap () {
	let basePath = __dirname;
	basePath = basePath.replace(/\\/g,'/');

	let pathArr = basePath.split('\/');
	pathArr = pathArr.splice( 0, pathArr.length - 1 );
	basePath = pathArr.join('/') + '/sql/';

	let fileList = ergodicFile( basePath, 'sql' );
	return fileList;
};

module.exports = getSqlMap;