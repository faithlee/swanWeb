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
* swan package library
+------------------------------------------------------------------------------
* 
* @package 
* @version $_SWANBR_VERSION_$
* @copyright $_SWANBR_COPYRIGHT_$
* @author $_SWANBR_AUTHOR_$ 
+------------------------------------------------------------------------------
*/
var swan = function () {
	/*{{{members*/

	/**
	 * 
	 */
	var __this = this;
	/*}}}*/
	/*{{{function*/
	/*{{{get dom node*/

	/**
	 * get dom node 
	 * 
	 * @param string id
	 * @param object dom
	 * @return object
	 */
	this.g = function (id, dom)	{
		var domObj;
		
		if (undefined != dom) {
			domObj = dom.getElementById(id);
		} else {
			domObj = document.getElementById(id);
		}

		return domObj;
	}
	/*}}}*/
	/*{{{alert message*/
		
	/**
	 * alert message
	 */
	this.alertMsg = function (status, content, time = 3000) {
		//var statusArr = ['warning', 'success', 'info', 'error'];
		var msgHtml = [];
		var status, className, msg; 
		msg = undefined == typeof(status) || '' == status ? 'Warning' : status;
		className = 'Waring' == status ? '' : ' alert-' + status.toLowerCase();

		//msg = status.replace(/(\w)/g, function ($1) {
		//	return $1.toUpperCase;	
		//});

		msgHtml.push('<div class="portlet">');
		msgHtml.push('<div class="portlet-body" style="display: block;">');
		msgHtml.push('<div class="alert' + className + '">');
		msgHtml.push('<button data-dismiss="alert" class="close"></button>');
		msgHtml.push('<strong>' + msg + '</strong> ' + content);
		msgHtml.push('</div></div></div>');
			
		jQuery('.page-content').prepend(msgHtml.join(''));
		
		setTimeout(function () {
			jQuery('.alert').fadeOut("slow")
			//jQuery('.alert').remove();	
		}, time)

		return;
	}

	/*}}}*/
	/*{{{print debug info*/

	/**
	 * print debug info  
	 */
	this.Debug = function () {
		//var debugInfo;
		if (!arguments.length) {
			return;	
		}

		//debugInfo = arguments.join(",");
		console.log(arguments);

		return;
	}
	/*}}}*/
	/*}}}*/
}

/*{{{Global Var*/
var swan = new swan();

var G = swan.g;
var D = swan.Debug;
var M = swan.alertMsg;
/*}}}*/

