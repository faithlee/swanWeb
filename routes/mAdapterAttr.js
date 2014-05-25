/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 foldmethod=marker: */
// +---------------------------------------------------------------------------
// | SWAN [ $_SWANBR_SLOGAN_$ ]
// +---------------------------------------------------------------------------
// | Copyright $_SWANBR_COPYRIGHT_$
// +---------------------------------------------------------------------------
// | Version  $_SWANBR_VERSION_$
// +---------------------------------------------------------------------------
// | Licensed ( $_SWANBR_LICENSED_URL_$ )
// +---------------------------------------------------------------------------
// | $_SWANBR_WEB_DOMAIN_$
// +---------------------------------------------------------------------------
 
 /**
 +------------------------------------------------------------------------------
 * mAdapter Attr 
 +------------------------------------------------------------------------------
 * 
 * @package 
 * @version $_SWANBR_VERSION_$
 * @copyright $_SWANBR_COPYRIGHT_$
 * @author $_SWANBR_AUTHOR_$ 
 +------------------------------------------------------------------------------
 */

var http = require('http');
var base = require('../lib/base.js');
var common = require('../lib/common');

var D = base.Debug;
var navHeader = {className: '适配器管理', subClassName: '适配器属性列表'};

/*{{{show mAdapter page*/

/**
 * show mAdapter page
 */
exports.index = function (req, res) {
	navHeader.madapter_id = req.query.madapter_id;		
	
	res.render('mAdapterAttr', navHeader);
};

/*}}}*/
/*{{{show mAdapter_attr data*/

/**
 * show mAdapter_attr data
 */
exports.indexList = function (req, res) {
	var param = outData = {};
	var start = req.body.start;
	var count = req.body.length;
		
	param.madapter_id = req.body.madapter_id;
	param.page = Math.ceil(start / count) + 1;	
	param.count = count;
		
	var options = {
		module: 'dev',
		action: 'madapter_attr.json',
		params: param,
		success: function (chunk) {
			var result = JSON.parse(chunk);
			
			if (result.data) {
				outData.recordsTotal = result.data.count;
				outData.recordsFiltered = result.data.count;
				
				outData.data = {};
				outData.data = result.data.result;
			}
					
			res.send(outData);
		}
	};

	common.handleData(res, options);
};

/*}}}*/
/*{{{add attr */

/**
 * add attr  
 */
exports.add = function (req, res) {
	navHeader.subClassName = '适配器属性添加';

	res.render('mAdapterAttr_add', navHeader);
};

/*}}}*/
/*{{{add attr data*/

/**
 * add attr data 
 */
exports.addData = function (req, res) {

};

/*}}}*/
/*{{{update attr*/

/**
 * update attr   
 */
exports.update = function () {

};

/*}}}*/
/*{{{update attr data */

/**
 * update attr data 
 */
exports.updateData = function (req, res) {

};

/*}}}*/
/*{{{delete attr data*/

/**
 * delete attr data 
 */
exports.deleteData = function (req, res) {

};

/*}}}*/


