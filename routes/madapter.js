/*
 * Madapter
 */
var base = require('../lib/base');
var common = require('../lib/common');

var D = base.Debug;
var navHeader = {className: '监控器管理', subClassName: '监控器列表'};

/*{{{module of madapter_index*/

/**
 * module of madapter_index
 */
exports.index = function(req, res) {
	res.render('madapter', navHeader);
};

/*}}}*/
/*{{{ajax request index list
*/

/**
 * ajax request index list
 */
exports.indexList = function(req, res) {
	var outData = param ={};
	param.start = req.body.start;
	param.length = req.body.length;

	var options = {
		module : 'dev',
		action : 'madapter.json',
		params : param,
		success : function (chunk) {
			var results = JSON.parse(chunk);
			outData.draw = parseInt(param.page);
			outData.recordsTotal = results.data.count;
			outData.recordsFiltered = results.data.count;
			outData.data = [];
			outData.data = results.data.result;
						
			res.send(outData);
		}
	}

	common.handleData(res, options);
};
/*}}}*/
/*{{{module of  madapter_add*/

/**
 * module of madapter_add
 */
exports.add = function(req, res) {
	navHeader.subClassName = '监控器添加'
	res.render('madapter_add', navHeader);
}

/*}}}*/
/*{{{add madapter data*/

/**
 * add madapter data
 */
exports.addData = function (req, res) {
	var params = {};
	var storeType = 0;
	params.name = req.body.name;
	params.steps = req.body.steps;
	params.madapter_type = req.body.madapter_type;
	params.display_name = req.body.display_name;
	
	//处理复选框
	for (var x in req.body.store_type) {
		 storeType += parseInt(req.body.store_type[x]);	
	}

	params.store_type = storeType;

	var options = {
		module : 'dev',
		action : 'madapter.add',
		params : params,
		success : function (chunk) {
			res.send(chunk);
		}
	}	

	common.handleData(res, options);
};

/*}}}*/
/*{{{module of monitor_upate*/

/**
 * module of monitor_upate
 */
exports.update = function(req, res) {
	navHeader.subClassName = '监控器修改';
	res.render('monitor_update', navHeader);
}

/*}}}*/
/*{{{update madapter data*/

/**
 * update madapter data 
 */
exports.updateData = function (req, res) {
	var params = {};
	params.mid = req.body.mid;
	params.name = req.body.name;
	params.display_name = req.body.display_name;

	var options = {
		module : 'dev',
		action : 'madapter.mod',
		params : params,
		success : function (chunk) {
			res.send(chunk);
		}
	}

	common.handleData(res, options);
};

/*}}}*/
/*{{{delete madapter data*/

/**
 * delete madapter data 
 */
exports.delelteData = function (req, res) {
	var params = {};
	params.madapter_id = req.query.mid;

	var options = {
		module : 'dev',
		action : 'madapter.del',
		params : params,
		success : function (chunk) {
			res.send(chunk);
		}
	}

	common.handleData(res, options);
}

/*}}}*/
