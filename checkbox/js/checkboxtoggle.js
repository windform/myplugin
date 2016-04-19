+function($){
 	var CheckboxToggle=function(element,option){
 		var $element = $(element);
 		var font=$element.attr('data-label').split('|');
 		
 		//alert($element.prop('checked'));

 		var brother='<span class="fx-checkbox"><span class="checkbox-font">'+font[1]+'</span><span class="glyphicon glyphicon-remove"></span><span class="glyphicon glyphicon-ok"></span><span class="checkbox-font">'+font[0]+'</span></span>';
 		var parent='<label class="checkbox-label"></label>';

 		$element.wrap(parent).parent().append(brother);
 		
 		if($element.attr('checked')){
 			$element.next().css({left:-51});
 			$element.parent().css('borderColor','#6FB3E0');
 		}else{
 			$element.next().css({left:1});
 			$element.parent().css('borderColor','#aaa');
 		}

 		$element.click(function(){
 			var offset=1;
 			if($element.is(':checked')){
 				$element.attr('data-label',font[1]);
 				$element.next().stop();
 				$element.next().animate({'left':-51},300).parent().css({'borderColor':'#6FB3E0'});
 				offset=-51;
 			}else{
 				$element.attr('data-label',font[0]);
 				$element.next().stop();
 				$element.next().animate({'left':1},300).parent().css({'borderColor':'#aaa'});
 				offset=1;
 			}
 		})

 		};
 		Plugin = function(option) {
			var args = Array.prototype.splice.call(arguments, 1);
			return this.each(function() {
				var $this = $(this), inst = $this.data('checkbox-toggle');
				if (!inst) $this.data('checkbox-toggle', (inst = new CheckboxToggle(this, option)));
				if (typeof option == 'string' && inst[option]) inst[option].apply(inst, args);
			});
		};
		$.fn.checkboxtoggle = Plugin;
		$.fn.checkboxtoggle.Constructor = CheckboxToggle;
 	}(jQuery);