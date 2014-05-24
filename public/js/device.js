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
	// {{{ init 

	/**
	 * init
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
				'ordering':false,
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
						
			//全选
            jQuery('#device_table .group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
				if (checked) {
					$(this).parent('span').addClass('checked');	
				} else {
					$(this).parent('span').removeClass('checked');	
				}

                jQuery(set).each(function () {
                    if (checked) {
                        $(this).attr("checked", true);
						$(this).parent('span').attr("class", 'checked');
                    } else {
                        $(this).attr("checked", false);
						$(this).parent('span').attr("class", '');
                    }
                });

                jQuery.uniform.update(set);
            });

			//单选
			$('#device_table_wrapper .checkboxes').live('change', function(){
				var allBox = jQuery('.group-checkable');
				var checked = jQuery(this).is(":checked");
				var total = jQuery('#device_table .checkboxes').length;

				if (checked) {
					$(this).attr("checked", true);
					$(this).parent('span').attr("class", 'checked');
				} else {
					$(this).attr("checked", false);
					$(this).parent('span').attr("class", '');
				}
				
				if (total == jQuery('input:checked').length) {
					allBox.parent('span').addClass('checked');
				} else {
					allBox.parent('span').removeClass('checked');
				}
			});

			//分页
			jQuery('#device_table_wrapper .dataTables_filter input').addClass("m-wrap small"); 
	        jQuery('#device_table_wrapper .dataTables_length select').addClass("m-wrap small"); 
			jQuery('#device_table_wrapper .dataTables_length select').select2();
		});
	}

	/*}}}*/
	/*{{{validate device_add form*/

	/**
	 * validate device_add form
	 */
	this.initAdd = function () {
		$('#deviceForm').validate({
			debug: true,
			errorElement: 'span',
			errorClass: 'help-inline',
			focusInvalid: false,
			//忽略的字段
			ignore: '',
			rules:  {
				device_name: {required: true, minlength: 6},
				host_name: {required: true, validHost: true}
			},
			messages: {
				device_name: {
					required: 'Please enter device name!'
				},
				host_name: {
					required: 'Please enter host name!'
				}
			},
			//display error alert on form submit
			invalidHandler: function (event, validator) {               
				var errors = validator.numberOfInvalids();
				if (errors) {
					M('Error', 'You have some form errors. Please check below. ');
				}
			},
			// hightlight error inputs
			highlight: function (element) { 
				// display OK icon
				$(element).closest('.help-inline').removeClass('ok'); 
				// set error class to the control group
				$(element).closest('.control-group').removeClass('success').addClass('error'); 
            },
			// revert the change dony by hightlight
			unhighlight: function (element) { 
				// set error class to the control group
				$(element).closest('.control-group').removeClass('error');
			},
			//验证通过
			success: function (label) {
				label.addClass('valid').addClass('help-inline ok')
				.closest('.control-group').removeClass('error').addClass('success'); 
			},
			submitHandler: function () {
				M('Error', 'adasdasd');
				//form.submit();
			}
		});
		
		//验证设备IP
		$.validator.addMethod("validHost", function(value, element) {
			var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

			  return this.optional(element) || ip.test(value);
		}, "Please specify the correct IP for your Device IP");

	
		//return false;
	},

	/*}}}*/
	/*{{{ajax add device*/

	/**
	 * ajax add device
	 */
	this.addData = function() {
		var _form = $('#deviceForm'); 
		
		if (_form.valid()) {
			$.ajax({
				url : gPrefixUrl + 'device_doAdd',
				type : 'post',
				data : _form.serialize(),
				success : function (data) {
					var result = eval('(' + data + ')');
					
					if (10000 == parseInt(result.code)) {
						var content = M('Success', result.msg)	

						var el = jQuery(".tab-content");
						App.blockUI(el);
						window.setTimeout(function () {
							App.unblockUI(el);
						}, 1000);
					} else {
						var content = M('Error', result.msg);
					}
				}
			});
		}
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
