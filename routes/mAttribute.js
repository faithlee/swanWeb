/**
 * 监控器属性
 */
var http = require('http');
var common = require('../lib/common');
/*{{{*/

/**
 * madapter attribute index
 *
 * @todo 需要做分页效果
 */
exports.index = function (req, res) {
	var attrData = {};
	var mAttrId = req.query.attr_id;	
	var indexOptions = {
		module : 'dev',
		action : 'monitor_attr.json',
		mid : mAttrId,
		success : function (chunk) {
			attrData.data = JSON.parse(chunk);
			//console.log(attrData)
			//res.end(attrData);
		}
	}	

	common.handleData(res, indexOptions);
}
/*}}}*/
