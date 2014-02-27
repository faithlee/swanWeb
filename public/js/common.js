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
* 
+------------------------------------------------------------------------------
* 
* @package 
* @version $_SWANBR_VERSION_$
* @copyright $_SWANBR_COPYRIGHT_$
* @author $_SWANBR_AUTHOR_$ 
+------------------------------------------------------------------------------
*/

function ModuleBase()
{
	var __this = this;
	// {{{ members

	/**
	 * this 对象在外部的名字
	 *
	 * @type {String}  
	 */
	this.__thisName = 'this';
	
	// }}}
	// {{{ functions
	// {{{ function setThisName()
		
	/**
	 * 设置this对象在外部的名字
	 *
	 * @param {String} thisName
	 * @return {Void}  
	 */
	this.setThisName = function (thisName) {
		__this.__thisName = thisName;	
	}
	// }}}
	// {{{ function mainPage()
		
	/**
	 * 设置this对象在外部的名字
	 *
	 * @param {String} thisName
	 * @return {Void}  
	 */
	this.mainPage = function (url)
	{
		$.ajax({
		   type: "GET",
		   url: url,
		   success: function(data){
				$('.page-content').html(data);
		   }
		});
	}

	// }}}
	// }}}
}
/*{{{Global VAR*/
var gPrefixUrl = 'http://192.168.37.130:3000/';
/*}}}*/


