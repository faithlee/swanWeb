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

		$('.m_attr_lightbox').bind('click', __this.showAttribute);
	}
	// }}}
	/*{{{add monitor*/
	/**
	 * add monitor
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
	/*{{{show monitor adpater attribute */

	/**
	 * show monitor adpater attribute  
	 */
	this.showAttribute = function () {
		var monitorDom = G('myModal');
		var attrId = $(this).attr('attr_id');
		
		$(monitorDom).show();

		$.ajax({
			'url' : gPrefixUrl + 'monitor_attr',  
			'type' : 'get',
			'data' : {attr_id : attrId},
			'success' : function (data) {
					//console.log(data);
				var result = eval('(' + data + ')');
				if (undefined != result && undefined != result.data.result) {
					var attrHtml = __this.makeTable(result.data.result);
					G('attr_list').innerHTML =  attrHtml;
				}
			}
		});
	}
	/*}}}*/
	/*{{{function makeTable()*/
		
	/**
	 * 生成属性对应的表格
	 */
	this.makeTable = function (data) 
	{
		var trHtml = [];		
		trHtml.push()	

		if (undefined == data || 'object' != typeof(data)) {
			return false;	
		}
		
		for (var i in data) {
			trHtml.push('<tr>');
			trHtml.push('<td>#' + data[i].attr_id + '</td>');
			trHtml.push('<td>' + data[i].attr_name + '</td>');
			trHtml.push('<td>' + data[i].form_type + '</td>');
			trHtml.push('<td>' + data[i].form_data + '</td>');
			trHtml.push('<td><a class="edit" onclick=""  href="javascript:;">Edit</a>&nbsp;<a class="delete deleteBtn" href="javascript:;">Delete</a></td>');
			trHtml.push('</tr>');
		}

		return trHtml.join('');
	}
	/*}}}*/
	// }}}
}
