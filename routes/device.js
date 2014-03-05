/**
 * Device
 */

var http = require('http');
var common = require('../lib/common')

/*{{{设备管理 */
/**
 * 设备管理 
 */
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

	common.handleData(res, options);
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
/*{{{处理添加的数据*/
/**
 * 处理添加的数据
 */
exports.addData = function (req, res) {
	var params = {};
	params.name = req.body.device_name;
	params.display_name = req.body.display_name;
	params.host_name = req.body.host_name;

	var options = {
		module: 'user',
		action: 'device.add',	
		params: params,
		success: function(chunk) {
			res.send(chunk);
		}
	}	

	common.handleData(res, options);
}	
/*}}}*/
/*{{{设备管理修改*/
/**
 * 设备管理修改
 */
exports.update = function(req, res) {
	res.render('device_update', {title : '设备管理修改', keyword : '', content : ''});

}
/*}}}*/
/*{{{更新设备信息*/
/**
 * @todo 更新设备信息 
 */
exports.updateData = function (req, res) {
	var params = {};
	params.did = req.body.did;
	params.name = req.body.device_name;
	params.display_name = req.body.display_name;
	params.host_name = req.body.host_name;

	var options = {
		module : 'user',
		action : 'device.mod',
		params : params,
		sucess : function (chunk) {
			res.send(chunk);
		}
	};

	common.test(res, options);
}
/*}}}*/
/*{{{删除设备信息*/
/**
 * 删除设备信息 
 */
exports.deleteData = function (req, res) {
	var params = {};
	params.did = req.query.did;
	
	var options = {
		module : 'user',
		action : 'device.del',
		params : params,
		sucess : function (chunk) {
			console.log(chunk);
		}
	}
	
	common.test(res, options);
}
/*}}}*/
