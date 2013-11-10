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
/*{{{handle device_add data*/
/**
 * handle device_add data
 */
exports.addData = function(req, res) {
//       var deviceInfo = ''; 
//   
//       req.setEncoding('utf8');
//   
//       req.addListener('data', function(chunck) {
//           deviceInfo += chunk;
//       }); 
//   
//       req.addListener('end', function() {
//           console.log(deviceInfo);
//       }); 
//   }
	var params = {};
	params.name = req.body.device_name;
	params.display_name = req.body.display_name;
	params.host_name = req.body.host_name;

	var options = {
		module: 'user',
		action: 'device.add',	
		params: params,
		sucess: function(chunk) {
			res.send(chunk);
		}
	}	
	common.test(res, options);
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
