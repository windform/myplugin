+function($){
    var FxFilter=function(element,option){
            var $element = $(element);
            var url=$element.attr('data-file');
            var target=$element.attr('data-target');
            $.ajax({
                url:url,
                type:'GET',
                dataType:'JSON',
                success:function(result){
                    var data=result.data;
                    var wrapper='<div class="container"><div class="row text-right"><br><a class="btn btn-default more-filter-toggle">更多筛选</a></div></div><br/><div class="container shell">'
                    // 数据渲染
                    for(var i=0; i<data.length;i++){
                        wrapper+='<div class="row bor_top_line fx-search-list"><span class="span_label">'+data[i].title+'</span><span class="span_filter"><ul class="ul_filter">'
                        for(var j=0; j<data[i].list.length; j++){
                            wrapper+='<li><i></i><a>'+data[i].list[j].name+'</a></li>'
                        }
                        wrapper+='</ul><p class="multiple-condition"><span class="multiple-str">已选条件:</span></p></span><span class="span_more_filter"><a class="btn btn-default btn-sm more-select"></a><a class="btn btn-default btn-sm multiple-select"></a></span><span class="span_more_filter cang"><a class="btn btn-default btn-sm confirm">确定</a><a class="btn btn-default btn-sm cancel">取消</a></span></div>'
                    }
                    wrapper+='<div class="row select-text"></div></div>'
                    $(target).empty().append(wrapper);
                    // 样式行为控制
                    $('.span_filter').css({
                        width:$('.row').width()-$('.span_more_filter').width()*2-$('.span_label').width(),
                        marginLeft:$('.span_label').width()
                    });
                    // 控制高度
                    $('.bor_top_line').css('height',41);
                    // 初始化设置
                    $('.ul_filter li i').addClass('yin');
                    $('.cang').css('display','none');
                    $('.multiple-condition').addClass('yin');
                    $('a.confirm').css('display','none');
                    for(var i=0;i<$('.ul_filter').size();i++){
                        if($('.ul_filter').eq(i).height()<=$('.ul_filter').eq(i).parent().parent().height()){
                            $('.ul_filter').eq(i).parent().next().find('.more-select').css('display','none');
                        }
                    }
                    //添加筛选条件至条件栏
            $('.ul_filter li').on('click',function(){
               // alert('danxuan')
                var value=$(this).find('a').text()+'、';
                if($(this).find('i').hasClass('yin')){
                    $(this).parent().parent().parent().parent().find('.select-text').append('<span class="span-select">'+value+'<i class="closeX"></i></span>');
                    $(this).parent().parent().parent().css('display','none');
                }else{
                    if($(this).find('i').hasClass('red-wrap')){
                        $(this).find('i').removeClass('red-wrap');
                        $(this).parent().next('.multiple-condition').find("span.multiple-str-detail:contains('"+value+"')").remove();
                    }else{
                        $(this).find('i').addClass('red-wrap');
                        $(this).parent().next('.multiple-condition').find('span:last-child').after('<span class="multiple-str-detail"><i class="xian red-wrap"></i>'+value+'</span>');
                    }
                }
                // 确定按钮的显示隐藏
                if($(this).parent().find('i').hasClass('red-wrap')){
                    $(this).parent().parent().next().next().find('a.confirm').css('display','inline-block');
                }else{
                    $(this).parent().parent().next().next().find('a.confirm').css('display','none');
                }

            })
            //从多选条件栏中删除单个条件
            $('.multiple-condition').on('click','span.multiple-str-detail',function(){
                var value=$(this).text().split('、')[0];
                //alert(value);
                $(this).parent().prev().find("li:contains('"+value+"')").find('i').removeClass('red-wrap');
                $(this).addClass('yin');
                var x=$(this).parent().find('span.multiple-str-detail').size();
                var y=$(this).parent().find('span.yin').size();
                if(x==y){
                    $(this).parent().parent().next().next().find('a.confirm').css('display','none');
                    $(this).parent().find('span.multiple-str-detail').remove();
                }
            })
            // 将多条件字段确定提交
            //var strBase=null;
            $('a.confirm').click(function(){
                //var text=$(this).parent().prev().parent().find('.multiple-condition span.multiple-str-detail').text();
                var demo=$(this).parent().prev().parent().find('.multiple-condition span.multiple-str-detail').not('.yin');
                var arr=[];
                for(var i=0;i<demo.size();i++){
                    arr.push(demo.eq(i).text());
                }
                //strBase=arr[0];
                var arrToStr=arr.join(' ');
                //console.log(strBase);
                //console.log($.type(arrToStr));
                $(this).parent().parent().parent().find('.select-text').append('<span class="span-select">'+arrToStr+'<i class="closeX"></i></span>');
                $(this).next().trigger('click');
                $(this).parent().parent().css('display','none');
            
            })
            // 从条件栏删除筛选条件
            $('.select-text').on('click','.span-select',function(str){
                var value=$(this).text().split('、')[0];
               // var html=$(this).parent().parent(":contains(apple)").text();
                //console.log(html);
                //console.log(value);

                //$(this).parent().parent().has(":contains('"+value+"')").css('display','block');
                $(this).parent().parent().find("div.bor_top_line:contains('"+value+"')").css('display','block');
                $(this).remove();
            })
            // 更多筛选单击显示、隐藏
            /*$element.find('.more-filter-toggle').click(function(){
                alert('hello');
                $(this).find('.bor_top_line,.select-text').toggle();
            })*/
            //for(var i=0; i<$('.more-filter-toggle').size();i++){
                $('.more-filter-toggle').click(function(){
                    $(this).parent().parent().parent().find('.bor_top_line,.select-text').toggle();
                })
            //}
            // 单击更多显示更多筛选条件
            $('.more-select').html('更多&nbsp;<span class="caret"></span>');
            $('.more-select').click(function(){
                var html=$(this).html();
                switch(html){
                    case (html='更多&nbsp;<span class="caret"></span>'):
                        $(this).parent().parent().parent().find('.more-select').html('更多&nbsp;<span class="caret"></span>');
                        $(this).parent().parent().parent().find('.bor_top_line').css('height',41);
                        $(this).html('收起&nbsp;<span class="caret"></span>');
                        $(this).parent().parent().css('height','auto');
                        break;
                    case (html='收起&nbsp;<span class="caret"></span>'):
                        $(this).parent().find('.more-select').html('更多&nbsp;<span class="caret"></span>');
                        $(this).parent().find('.more-select').parent().parent().css('height',41);
                        $(this).html('更多&nbsp;<span class="caret"></span>');
                         $('.shell').css('height',41*data.length);
                        //$(this).parent().parent().css('height',41);
                        break;
                }
                return false;
            });

            // 单击切换成多选模式
            $('.multiple-select').html('多选&nbsp;<span class="caret"></span>');
            $('.multiple-select').click(function(){
                        $(this).parent().parent().parent().find('.bor_top_line').css('height',41);
                        $(this).parent().parent().parent().find('li i').removeClass('xian').addClass('yin');
                        $(this).parent().parent().parent().find('.span_filter').next().css('display','block').next().css('display','none');;
                        $(this).parent().find('.multiple-condition').addClass('yin');
                        $(this).parent().parent().css('height','auto');
                        $(this).parent().prev().find('li i').removeClass('yin').addClass('xian');
                        $(this).parent().css('display','none').next().css('display','block');
                        $(this).parent().prev().find('.multiple-condition').removeClass('yin');
                        //var H=$(this).parent().parent().height();
                         //$('.shell').css('height',H+41*(data.length-1));
            })
            //单击取消恢复成单选模式
            $('.cancel').click(function(){
                $(this).parent().css('display','none').prev().css('display','block').prev().find('ul li i').removeClass('xian red-wrap').addClass('yin').end().end().parent().css('height',41);
                //$('.shell').css('height',41*data.length);
                $(this).parent().prev().prev().find('.multiple-condition').addClass('yin').find('span').remove('span.multiple-str-detail');
                $('.cancel').parent().parent().find('.span_more_filter').find('.more-select').html('更多&nbsp;<span class="caret"></span>');
            })

                },
                error:function(){
                    //alert('falid');
                }
            })

        };
        Plugin = function(option) {
            var args = Array.prototype.splice.call(arguments, 1);
            return this.each(function() {
                var $this = $(this), inst = $this.data('fxfilter');
                if (!inst) $this.data('fxfilter', (inst = new FxFilter(this, option)));
                if (typeof option == 'string' && inst[option]) inst[option].apply(inst, args);
            });
        };
        $.fn.fxfilter = Plugin;
        $.fn.fxfilter.Constructor = FxFilter;
    }(jQuery);