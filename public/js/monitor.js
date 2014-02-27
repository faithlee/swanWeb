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
* monitor
+------------------------------------------------------------------------------
* 
* @package 
* @version $_SWANBR_VERSION_$
* @copyright $_SWANBR_COPYRIGHT_$
* @author $_SWANBR_AUTHOR_$ 
+------------------------------------------------------------------------------
*/

function SwanMonitor() {
	ModuleBase.call(this);
	var __this = this;

	// {{{ members

	// }}}
	// {{{ functions
	// {{{ function init()

	/**
	 * 初始化  
	 */
	this.init = function()
	{
		$('#monitorBtn').bind('click', __this.doAddData);

		$('#updateBtn').bind('click', __this.monitorUpdate);
		
		$('.deleteBtn').bind('click', __this.monitorDelete);
	}
	// }}}
	/*{{{添加监控器*/
	/**
	 * 添加监控器
	 */
	this.doAddData = function() {
		//todo 对数据验证
		
		//异步提交数据
		$.ajax({
			url : gPrefixUrl + 'monitor_doAdd',
			type : 'post',
			data : $('#monitorForm').serialize(),
			success : function (data) {
				console.log(data);
			}
		});
	}
	/*}}}*/
	/*{{{更新监控器*/
	/**
	 * @todo 更新设备数据  
	 */
	this.monitorUpdate = function() {
		var monitorId = $(this).attr('monitorId');

		$.ajax({
			url : gPrefixUrl + 'monitor_doUpdate',
			type : 'post',
			data : $('#monitorForm').serialize(),
			success : function (data) {
				console.log(data);
			}
		});
	}
	/*}}}*/
	/*{{{delete monitor*/
	/**
	 * delete monitor
	 */
	this.monitorDelete = function() {
		var monitorId = $(this).attr('monitorId');

		$.ajax({
			url : gPrefixUrl + 'monitor_doDelete',
			type : 'get',
			data : {mid : monitorId},
			success : function(data) {
				console.log(data);
			}
		});
	}
	/*}}}*/
	// }}}
}
