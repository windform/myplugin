; (function($, window, document, undefined) {
    var methods = {
        init: function(options) {
            var options=$.extend({
                bor_col:['#0088cc','#e02222'],
                color:['#fff','#0088cc','#e02222'],
                bg:['#0088cc','#e02222'],
                speed:300
            },options)

            return $(this).each(function() {
                var font = $(this).attr('data-label').split('|');

                var brother = '<span class="fx-checkbox"><span class="checkbox-font">' + font[1] + '</span><span class="glyphicon glyphicon-remove"></span><span class="glyphicon glyphicon-ok"></span><span class="checkbox-font">' + font[0] + '</span></span>';
                var parent = '<label class="checkbox-label"></label>';

                $(this).wrap(parent).parent().append(brother);

                $(this).next().find('.glyphicon-ok').css({'backgroundColor':options.bg[1],'color':options.color[0]})
                .next().css('color',options.color[2])
                .prev().prev().css({'backgroundColor':options.bg[0],'color':options.color[0]})
                .prev().css('color',options.color[1]);

                var arr = [];
                var arr1 = [];
                var span = $(this).next().find("span");
                for (var i = 0; i < span.size(); i++) {
                    arr.push(span.eq(i).width());
                }
                for (var i = 0; i < span.size(); i++) {
                    arr1.push(span.eq(i).height());
                }
                var maxW = Math.max.apply(null, arr);
                var maxH = Math.max.apply(null, arr1);
                //alert(maxW+','+maxH);
                $(this).next().find("span").css({
                    width: maxW + 3,
                    height: maxH,

                });

                $(this).next().css({
                    width: 4 * maxW + 24,
                    height: maxH + 4
                });

                $(this).parent().css({
                    width: 2 * maxW + 14,
                    //height:maxH+6
                });

                if ($(this).attr('checked')) {
                    $(this).next().css({
                        left: -maxW * 2 - 10
                    });
                    $(this).parent().css('borderColor', options.bor_col[1]);
                } else {
                    $(this).next().css({
                        left: 0
                    });
                    $(this).parent().css('borderColor', options.bor_col[0]);
                }

                $(this).click(function() {
                    var offset = 0;
                    if ($(this).is(':checked')) {
                        $(this).attr('data-label', font[1]);
                        $(this).next().stop();
                        $(this).next().animate({
                            'left': -maxW * 2 - 10
                        },
                        options.speed,'easeInBounce').parent().css({
                            'borderColor': options.bor_col[1]
                        });
                        offset = -maxW * 2 - 10;
                    } else {
                        $(this).attr('data-label', font[0]);
                        $(this).next().stop();
                        $(this).next().animate({
                            'left': 0
                        },
                        options.speed,'easeOutQuint').parent().css({
                            'borderColor': options.bor_col[0]
                        });
                        offset = 0;
                    }
                })

            })

        }
    }

    $.fn.checkboxtoggle = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist in the checkboxtoggle');
        }
    };

})(jQuery, window, document);