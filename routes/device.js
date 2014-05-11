/**
 * Device
 */

var http = require('http');
var common = require('../lib/common')

/*{{{show device page*/

/**
 * show device page
 */
exports.index = function(req, res) {
	var data = {title: '设备管理', content: '', keyword: ''};

	res.render('device', data);
}

/*}}}*/
/*{{{show device dataTable*/

/**
 * show device dataTable
 */
exports.indexList = function (req, res) {
	var outData = param = {};
	param.start = req.body.start;
	param.length = req.body.length;

	var options = {
		module: 'user',
		action: 'device.json',
		params: param,
		success: function(chunk) {
			var results = JSON.parse(chunk);
			outData.draw = 1;
			outData.recordsTotal = results.data.count;
			outData.recordsFiltered = results.data.count;
			outData.data = {};
			outData.data = results.data.result;

			res.send(outData);
		}
	};

	common.handleData(res, options);
}

/*}}}*/
// {{{ add device

/**
 * add device
 */
exports.add = function(req, res) {
	res.render('device_add', {title : '设备添加', keyword : '设备添加'});
}

// }}}
/*{{{add device data*/

/**
 * add device data 
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
/*{{{update device*/

/**
 * update device
 */
exports.update = function(req, res) {
	res.render('device_update', {title : '设备管理修改', keyword : '', content : ''});

}

/*}}}*/
/*{{{update device data*/

/**
 * update device data
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
		success : function (chunk) {
			res.send(chunk);
		}
	};

	common.handleData(res, options);
}

/*}}}*/
/*{{{delete device data*/

/**
 * delete device data
 */
exports.deleteData = function (req, res) {
	var param = {};
	param.device_id = req.query.did;

	var options = {
		module : 'user',
		action : 'device.del',
		params : param,
		success : function (chunk) {
			res.send(JSON.parse(chunk));
		}
	}

	common.handleData(res, options);
}

/*}}}*/
