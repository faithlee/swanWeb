/*
 * Madapter
 */
var common = require('../lib/common');
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
	res.render('madapter_add', {title : '添加监控器'});
}

/*}}}*/
/*{{{add madapter data*/

/**
 * add madapter data
 */
exports.addData = function (req, res) {
	var params = {};
	params.name = req.body.name;
	params.steps = req.body.steps;
	params.display_name = req.body.display_name;

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
	
	res.render('monitor_update', {title : '修改监控器', keyword : '', content : ''});
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
