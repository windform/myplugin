/*!
 * jQuery轻量级插件样板
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// 函数自调用之前加入分号
// 引入依赖的网络脚本或插件
;(function ( $, window, document, undefined ) {

    // 创建默认的配置
    var pluginName = 'defaultPluginName',
        defaults = {
            propertyName: "value"
        };

    // 构造函数
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {

    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );
