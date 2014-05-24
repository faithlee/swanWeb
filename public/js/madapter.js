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

function SwanmAdapter() {
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
		$('#mAdapter_btn').bind('click', __this.addData);

		$('#updateBtn').on('click', __this.update);
		
		$('.delete_btn').on('click', __this.delete);

		$('.m_attr_lightbox').bind('click', __this.showAttribute);
	}

	// }}}
	/*{{{show madapter dataTable*/
	
	/**
	 * show madapter dataTable
	 */
	this.loadIndexList = function(){
		$(document).ready(function() {
			$('#madapter_list').dataTable( {
				"processing": false,
				"serverSide": true,
				"ordering": false,
				"ajax": {
					"url": gPrefixUrl + 'madapter_indexList',
					"type": "POST"
				},
				"columns":[ 
					{'data': function (obj) {
						var checkBox = '<div class="checker"><span>';
						checkBox += '<input class="checkboxes" type="checkbox" value="' + obj.madapter_id + '">';
						checkBox += '</span></div>';

						return checkBox; 
					}},
					{'data':'madapter_name'},
					{'data':'steps'},
					{'data':'madapter_display_name'},
					{'data': function (obj) {
						var detailHtml = [];

						detailHtml.push('<a class="btn mini green-stripe" attr_id="' + obj.madapter_id + '" onClick="swanIndex.mainPage(\'/madapter_attr?madapter_id=' + obj.madapter_id + '\')" href="javascript:;">attribute</a>');
						detailHtml.push('<a class="btn mini blue-stripe" attr_id="' + obj.madapter_id + '" href="javascript:;">metric</a>');
						detailHtml.push('<a class="btn mini red-stripe" attr_id="' + obj.madapter_id + '" href="javascript:;">achives</a>');

						return detailHtml.join('&nbsp;');
					}},
					{'data': function (obj) {
						var editHtml = [];
						editHtml.push('<a madapter_id="' + obj.madapter_id + '" href="javascript:;" onClick="swanIndex.mainPage(\"monitor_update\")">Edit</a>')
						editHtml.push('<a madapter_id="' + obj.madapter_id + '" href="javascript:;" onClick="' + __this.__thisName + '.delete(this);">Delete</a>')
						return editHtml.join('&nbsp;&nbsp;');
					}}
				]
			});
			
			//全选
			jQuery('#madapter_list .group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
				if (checked) {
					jQuery(this).parent().addClass('checked');
				} else {
					jQuery(this).parent().removeClass('checked');
				}

                jQuery(set).each(function () {
                    if (checked) {
						$(this).parent('span').addClass('checked')
                        $(this).attr("checked", true);
                    } else {
						$(this).parent('span').removeClass('checked')
                        $(this).attr("checked", false);
                    }   
                }); 

                jQuery.uniform.update(set);
            });			
			
			//单选
			jQuery('#madapter_list .checkboxes').live('change', function(){
				var allBox = jQuery('.group-checkable');
				var idChecked = $(this).attr('checked');
				var total = jQuery('#madapter_list .checkboxes').length;

				if (idChecked) {
					$(this).parent('span').addClass('checked');
				} else {
					$(this).parent('span').removeClass('checked');
				}
				
				//是否全选
				if (jQuery('input:checked').length == total) {
					allBox.parent('span').addClass('checked');
				} else {
					allBox.parent('span').removeClass('checked');
				}
			});

			jQuery('#madapter_list_wrapper .dataTables_filter input').addClass("m-wrap medium");
			jQuery('#madapter_list_wrapper .dataTables_length select').addClass("m-wrap small");
			jQuery('#madapter_list_wrapper .dataTables_length select').select2();
		});		
	}

	/*}}}*/
	/*{{{validate form */
	
	/**
	 * validate form 
	 */
	this.initAdd = function () {
		var alert1 = '名称首个字符必须是字母，由字母、数字、下划线组成，不能少于6个字符!';
		var alert2 = '请输入监控适配器储存正确的时间间隔!';
		var alert3 = '请选择一种储存类型!';
		var alert4 = '请选择适配器类型!';

		jQuery('#mAdapterForm').validate({
			debug: true,
			errorElement: 'span',
			errorClass: 'help-inline',
			focusIvalid: false,
			ignore: '',
			rules: {
				name: {validName: true, required: true},
				steps: {validSteps: true, required: true},
				"store_type[]": {required: true, minlength: 1},
				madapter_type: {required: true},
			},	
			messages: {
				name: {
					required: alert1
				},
				steps: {
					required: alert2
				},
				"store_type[]": {
					required: alert3,
					minlength: jQuery.format("请至少选择{0}种储存类型!")
				},
				madapter_type: {
					required: alert4	
				}
			},
			//处理radio及checkbox表单
			errorPlacement: function (error, element) {
				if (element.attr("name") == "madapter_type") {
					error.addClass("no-left-padding").insertAfter("#madapter_type_error");
				} else if (element.attr("name") == "store_type[]") { 
					error.addClass("no-left-padding").insertAfter("#store_type_error");
				} else {
					error.insertAfter(element); 
				}
			},
			invalidHandler: function (event, validator) {
				var errors = validator.numberOfInvalids();
				if (errors) {
					M('Error', 'You have some form errors. Please check below. ');
				}
			},
			highlight: function (element) {
				$(element).closest('.help-inline').removeClass('ok');
				$(element).closest('.control-group').removeClass('success').addClass('error');
			},
			unhighlight: function (element) {
				$(element).closest('.constrol-group').removeClass('error');
			},
			success: function (label) {
				//radio及checkbox处理
				if (label.attr('for') == 'store_type[]' || label.attr('for') == 'madapter_type') {
					label.closest('.control-group').removeClass('error').addClass('success');
					label.remove(); 				
				} else {
					label.addClass('valid').addClass('help-inline ok')
					.closest('.control-group').removeClass('error').addClass('success'); 
				}
			}	
		});
		
		//validate name
		$.validator.addMethod('validName', function(value, element) {
			var pattern = /^\w[\w|\d|-]{5,}/;
			
			return this.optional(element) || pattern.test(value);
		}, alert1);
		
		//validate steps 
		$.validator.addMethod('validSteps', function (value, element) {
			var pattern = /^\d+$/;
			return this.optional(element) || pattern.test(value);
		}, alert2);
	},

	/*}}}*/
	/*{{{add madapter*/

	/**
	 * add madapter
	 */
	this.addData = function() {
		//todo 对数据验证
		var _form = $('#mAdapterForm');
		if (_form.valid()) {
			$.ajax({
				url : gPrefixUrl + 'madapter_doAdd',
				type : 'post',
				data : _form.serialize(),
				success : function (data) {
					var result = eval('(' + data + ')');
					if (10000 == parseInt(result.code)) {
						M('Success', result.msg);

						var el = $('.tab-content');
						App.blockUI(el);
						setTimeout(function() {
							App.unblockUI(el);
						}, 1000);
					} else {
					
					}
					console.log(data);
				}
			});
		}
	}

	/*}}}*/
	/*{{{update madapter*/

	/**
	 * update madapter  
	 */
	this.initUpdate = function() {
		var madapterId = $(this).attr('madapter_id');

		$.ajax({
			url : gPrefixUrl + 'madapter_doUpdate',
			type : 'post',
			data : $('#monitorForm').serialize(),
			success : function (data) {
				console.log(data);
			}
		});
	}

	/*}}}*/
	/*{{{delete madapter*/

	/**
	 * delete madapter
	 */
	this.delete = function(obj) {
		var madapter_id = $(obj).attr('madapter_id');

		$.ajax({
			url : gPrefixUrl + 'madapter_doDelete',
			type : 'get',
			data : {mid : madapter_id},
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
