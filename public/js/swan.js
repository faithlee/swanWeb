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

	/*}}}*/
}

/*{{{Global Var*/
var swan = new swan();

var G = swan.g;
/*}}}*/

