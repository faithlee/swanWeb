/**
 * Device
 */

/*{{{设备管理 */
/**
 * 设备管理 
 */
exports.index = function(req, res) {
	var options = {
  hostname: '192.168.1.132',
  port: 9080,
  path: '/user/?/device.json',
  method: 'POST'
};

	
	res.render('device', {title : '设备列表', content : '设备列表内容'});
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
/*{{{设备管理修改*/
/**
 * 设备管理修改
 */

exports.update = function(req, res) {
	res.render('device_update', {title : '设备管理修改', keyword : '', content : ''});
}
/*}}}*/
