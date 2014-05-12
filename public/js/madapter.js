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

function SwanMAdapter() {
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
		$('#monitorBtn').bind('click', __this.add);

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
				"ajax": {
					"url": gPrefixUrl + 'madapter_indexList',
					"type": "POST"
				},
				"columns":[ 
					{'data':'madapter_id'},
					{'data':'madapter_name'},
					{'data':'steps'},
					{'data':'madapter_display_name'},
					{'data': function (obj) {
						var detailHtml = [];
						detailHtml.push('<a attr_id="' + obj.madapter_id + '" href="javascript:;">attribute</a>');
						detailHtml.push('<a attr_id="' + obj.madapter_id + '" href="javascript:;">metric</a>');
						detailHtml.push('<a attr_id="' + obj.madapter_id + '" href="javascript:;">achives</a>');

						return detailHtml.join(' |&nbsp;');
					}},
					{'data': function (obj) {
						var editHtml = [];
						editHtml.push('<a madapter_id="' + obj.madapter_id + '" href="javascript:;" onclick="swanIndex.mainPage(\"monitor_update\")">Edit</a>')
						editHtml.push('<a madapter_id="' + obj.madapter_id + '" href="javascript:;" onClick="' + __this.__thisName + '.delete(this);">Delete</a>')
						return editHtml.join('&nbsp;&nbsp;');
					}}
				]
			} );
		} );		
	}

	/*}}}*/
	/*{{{add madapter*/

	/**
	 * add madapter
	 */
	this.add = function() {
		//todo 对数据验证
			
		//异步提交数据
		$.ajax({
			url : gPrefixUrl + 'madapter_doAdd',
			type : 'post',
			data : $('#monitorForm').serialize(),
			success : function (data) {
				console.log(data);
			}
		});
	}

	/*}}}*/
	/*{{{update madapter*/

	/**
	 * update madapter  
	 */
	this.update = function() {
		var monitorId = $(this).attr('madapter_id');

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
