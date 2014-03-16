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
* 首页
+------------------------------------------------------------------------------
* 
* @package 
* @version $_SWANBR_VERSION_$
* @copyright $_SWANBR_COPYRIGHT_$
* @author $_SWANBR_AUTHOR_$ 
+------------------------------------------------------------------------------
*/

function SwanIndex() {
	ModuleBase.call(this);
	var __this = this;

	// {{{ members
	this.__detailList = {};
	// }}}
	// {{{ functions
	// {{{ function init()
		
	/**
	 * 初始化  
	 */
	this.init = function()
	{
		$(document).ready(function() {
			console.log('public/js/index.js');
		});	
	}
	// }}}
	/*{{{ 分页功能*/
	/**
	 * 分页功能
	 */
	this.setPage = function (pageParam) {
		var container = document.getElementById('setPage');
		var total = pageParam.total;
		var pageIndex = pageParam.index;
		var pageSize = pageParam.size;
		var pageTotal = Math.ceil(total / pageSize);
		var url = pageParam.url;

		var html = [];
		var pageStyle = new Object();
		var  prevStyle, nextStyle, prevUrl, nextUrl;
			
		for (var i = 1; i <= pageTotal; i++) {
			style = pageIndex == i ? ' class="active"' : '';
			html[i] = '<li' + style + '><a href="' + url + '#' + i + '">' + i + '</a></li>';
		}
		
		prevStyle = pageIndex > 1 ? '' : ' disabled';
		nextStyle = pageIndex < pageTotal ? '' : ' disabled';
		prevUrl = url + '#' + (pageIndex - 1);
		nextUrl = url + '#' + (pageIndex + 1);
		
		pageStyle.prev = '<li class="prev' + prevStyle + '"><a href="' + prevUrl + '">← <span class="hidden-480">Prev</span></a></li>';	
		pageStyle.next = '<li class="next' + nextStyle + '"><a href="' + nextUrl + '"><span class="hidden-480">Next</span> → </a></li>';

		container.innerHTML = '<ul>' + pageStyle.prev + html.join('') + pageStyle.next + '</ul>'; 
	}	
	/*}}}*/
	// }}}
}
