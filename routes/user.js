/*
 * GET users listing.
 */

var common = require('../lib/common');

/*{{{*/
var data = {title : 'monitor'};
exports.index = function(req, res){
//  res.send("respond with a resource");
	var options = {
		module : 'dev',
		action : 'monitor.json',
		success : function (chunk) {
			var results = JSON.parse(chunk);
			data.result = results.data.result;

			res.render('user', data);
		}
	}

	common.handleData(res, options);
};
/*}}}*/
