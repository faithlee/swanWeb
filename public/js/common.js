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
			},
		});
	}

	// }}}
	/*{{{function handleUniform()*/
	
	/**
	 * 复选框单选框样式效果 
	 *
	 * return void
	 */
	this.handleUniform = function () {
		if (!jQuery().uniform) {
			return;
		}

		var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
		if (test.size() > 0) {
			test.each(function () {
				if ($(this).parents(".checker").size() == 0) {
					$(this).show();
					$(this).uniform();
				}
			});
		}
	}
	
	/*}}}*/
	/*{{{function initUniforma()*/

	/**
	 * todo 复选框单选框样式效果
	 */
	var initUniform = function (els) {
            if (els) {
                jQuery(els).each(function () {
					if ($(this).parents(".checker").size() == 0) {
						$(this).show();
						$(this).uniform();
					}
				});
            } else {
                handleUniform();
            }
        }

	/*}}}*/
	// }}}
}
/*{{{Global VAR*/
var gPrefixUrl = window.location;
/*}}}*/


