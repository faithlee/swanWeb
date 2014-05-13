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
* device
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
		$('#deviceBtn').bind('click', __this.addData);

		$('#updateDeviceBtn').bind('click', __this.update);
	}

	// }}}
	/*{{{show device dataTable*/

	/**
	 * show device dataTable   
	 */
	this.loadIndex = function () {
		$(document).ready(function() {
			$('#device_table').dataTable({
				'ajax': {
					'processing': true,
					'serverSide': true,
					'url': '/device_indexList',
					'type' : 'POST',
				},
				'columns': [
					{'data': function(obj) {
						 var checkBox = '<div class="checker"><span><input type="checkbox" value="' + obj.device_id + '" class="checkboxes" name="device_id[]"></span></div>';	

						return checkBox;
					}},
					{'data': 'device_name'},
					{'data': 'host_name'},
					{'data': 'device_display_name'},
					{'data': function (obj) {
						var editHtml = '<a href="javascript:;" onClick="swanIndex.mainPage(\' + obj.device_id + \')">Edit</a>';
						return editHtml;
					}},
					{'data': function(obj) {
						var delHtml = '<a device_id="' + obj.device_id + '" href="javascript:;" onClick="' + __this.__thisName + '.delete(this)">Delete</a>';
						
						return delHtml;	
					}}
				]
			});
			
			jQuery('#device_table_wrapper .dataTables_filter input').addClass("m-wrap small"); 
	        jQuery('#device_table_wrapper .dataTables_length select').addClass("m-wrap small"); 
			jQuery('#device_table_wrapper .dataTables_length select').select2();
		});
	}

	/*}}}*/
	/*{{{ajax add device*/
	/**
	 * ajax add device
	 */
	this.addData = function() {
		$.ajax({
			url : gPrefixUrl + 'device_doAdd',
			type : 'post',
			data : $('#deviceForm').serialize(),
			success : function (data) {
				var result = eval('(' + data + ')');

				if (10000 == data.code) {
					var content = M('Success', result.msg)	
				} else {
					var content = M('Error', result.msg);
				}
				
				$('.page-content').prepend(content)
				
			}
		});
	}
	/*}}}*/
	/*{{{ajax update device*/

	/**
	 * ajax update device  
	 */
	this.update = function() {
		var deviceId = $(this).attr('device_id');

		$.ajax({
			url : gPrefixUrl + 'device_doUpdate',
			type : 'post',
			data : $('#deviceForm').serialize(),
			success : function (data) {
				console.log(data);
			}
		});
	}

	/*}}}*/
	/*{{{ajax delete device*/

	/**
	 * ajax delete device
	 */
	this.delete = function(obj) {
		var deviceId = $(obj).attr('device_id');

		$.ajax({
			url : gPrefixUrl + 'device_doDelete',
			type : 'post',
			data : {did : deviceId},
			success : function(data) {
				console.log(data);
			}
		});
	}

	/*}}}*/
	this.checkBox = function(obj) {
		return '<div class="checker"><span><input type="checkbox" value="' + id + '" class="checkboxes" name="device_id[]"></span></div>';
	}
	// }}}
}
