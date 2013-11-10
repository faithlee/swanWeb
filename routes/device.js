/**
 * Device
 */

var http = require('http');

/*{{{设备管理 */
/**
 * 设备管理 
 */
var common = require('../lib/common')

var data = {title: '设备管理', content: '', keyword: ''};
exports.index = function(req, res) {
	var options = {
		module: 'user',
		action: 'device.json',
		sucess: function(chunk) {
			var result = JSON.parse(chunk);
			data.data = result.data.result;
			res.render('device', data);
		}
	};

	common.test(res, options);
};
/*}}}*/
// {{{设备管理添加
/**
 * 设备管理添加
 */
exports.add = function(req, res) {
	res.render('device_add', {title : '设备添加', keyword : '设备添加'});
}
// }}}
/*{{{设备管理修改*/
/**
 * 设备管理修改
 */

exports.update = function(req, res) {
	res.render('device_update', {title : '设备管理修改', keyword : '', content : ''});
}
/*}}}*/
