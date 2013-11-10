/*
 * Monitor
 */

/*{{{module of monitor_index*/
/**
 * module of monitor_index
 */
exports.index = function(req, res) {
	res.render('monitor', { title: 'Express' , keyword: 'Express Keyword', content: 'Express Content'});
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
/*{{{module of monitor_upate*/
/**
 * module of monitor_upate
 */
exports.update = function(req, res) {
	res.render('monitor_update', {title : '修改监控器', keyword : '', content : ''});
}
/*}}}*/
