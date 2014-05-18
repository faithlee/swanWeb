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
  * madapter  attribute 
  +------------------------------------------------------------------------------
  * 
  * @package 
  * @version $_SWANBR_VERSION_$
  * @copyright $_SWANBR_COPYRIGHT_$
  * @author $_SWANBR_AUTHOR_$ 
  +------------------------------------------------------------------------------
  */

function SwanmAdapterAttr() {
	ModuleBase.call(this);
	
	/*{{{members*/
	var __this = this;
	/*}}}*/
	/*{{{functions*/
	/*{{{init Attr*/
	
	/**
	 * init Attr 
	 */
	this.init = function () {
		D(12312123)	
	}

	/*}}}*/
	/*{{{show attr dataTable*/
	
	/**
	 * show attr dataTable 
	 */
	this.loadIndexList = function () {
		$(document).ready(function () {
			var madapter_id = $('#madapterAttr_table').attr('madapter_id');
			$('#madapterAttr_table').dataTable({
				'processing': false,
				'serverSide': true,
				'ordering': false,
				'ajax': {
					'url': gPrefixUrl + 'mAdapterAttr_index',
					'type': 'post',
					'data': {'madapter_id' : madapter_id}
				},
				'columns': [
					{data: function (obj) {
						var checkHtml = '<div class="checker"><span><input type="checkbox" value="' + obj.attr_id + '" class="checkboxes" name="attr_id[]"></span></div>';

						return checkHtml;
					}},
					{data: 'attr_name'},
					{data: 'attr_display_name'},
					{data: 'form_type'},
					{data: 'form_data'},
					{data: 'attr_default'},
					{data: function (obj) {
						var __html = [];
						__html.push('<a class="btn mini black" href="javascript:;"><i class="icon-edit"></i> Edit</a>');
						__html.push('<a class="btn mini black" href="javascript:;"><i class="icon-trash"></i> Delete</a>');

						return __html.join('&nbsp;&nbsp;');
					}}
				]
			});

			//分页
			jQuery('#madapterAttr_table_wrapper .dataTables_filter input').addClass("m-wrap small"); 
	        jQuery('#madapterAttr_table_wrapper .dataTables_length select').addClass("m-wrap small"); 
			jQuery('#madapterAttr_table_wrapper .dataTables_length select').select2();

			
		});
	}

	/*}}}*/
	/*}}}*/
	 


}
