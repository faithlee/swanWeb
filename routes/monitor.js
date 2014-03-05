/*
 * Monitor
 */
var common = require('../lib/common');

/*{{{module of monitor_index*/
/**
 * module of monitor_index
 */
exports.index = function(req, res) {
	var data = { title: 'Express' , keyword: 'Express Keyword', content: 'Express Content'};
	var options = {
		module : 'dev',
		action : 'monitor.json',
		success : function (chunk) {
			var results = JSON.parse(chunk);
			data.data = results.data.result;
			
			res.render('monitor', data);
		}
	}
	
	common.handleData(res, options);
};
/*}}}*/
/*{{{module of monitor_add*/
/**
 * module of monitor_add
 */
exports.add = function(req, res) {
	res.render('monitor_add', {title : '添加监控器'});
}
/*}}}*/
/*{{{add monitor data*/
/**
 * add monitor data
 */
exports.addData = function (req, res) {
	var params = {};
	params.name = req.body.name;
	params.steps = req.body.steps;
	params.display_name = req.body.display_name;

	var options = {
		module : 'dev',
		action : 'monitor.add',
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
/*{{{update monitor data*/
/**
 * update monitor data 
 */
exports.updateData = function (req, res) {
	var params = {};
	params.mid = req.body.mid;
	params.name = req.body.name;
	params.display_name = req.body.display_name;

	var options = {
		module : 'dev',
		action : 'monitor.mod',
		params : params,
		success : function (chunk) {
			res.send(chunk);
		}
	}

	common.handleData(res, options);
};
/*}}}*/
/*{{{delete monitor data*/
/**
 * delete monitor data 
 */
exports.delelteData = function (req, res) {
	var params = {};
	params.mid = req.query.mid;

	var options = {
		module : 'dev',
		action : 'monitor.del',
		params : params,
		success : function (chunk) {
			res.send(chunk);
		}
	}

	common.handleData(res, options);
}
/*}}}*/
