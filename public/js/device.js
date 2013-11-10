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
* 设备
+------------------------------------------------------------------------------
* 
* @package 
* @version $_SWANBR_VERSION_$
* @copyright $_SWANBR_COPYRIGHT_$
* @author $_SWANBR_AUTHOR_$ 
+------------------------------------------------------------------------------
*/

function SwanDevice() {
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
		$('#deviceBtn').bind('click', __this.addDo);
	}

	// }}}
	
	this.addDo = function() {
		//todo 对数据验证
		
		//异步提交数据
		$.ajax({
			url : gPrefixUrl + 'device_doAdd',
			type : 'post',
			data : $('#deviceForm').serialize(),
			success : function(data) {
				console.log(data);
			}
		});
	}
	// }}}
}
