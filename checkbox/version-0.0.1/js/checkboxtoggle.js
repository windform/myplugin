+function($){
 	var CheckboxToggle=function(element,option){
 		var $element = $(element);
 		var font=$element.attr('data-label').split('|');

 		var brother='<span class="fx-checkbox"><span class="checkbox-font">'+font[1]+'</span><span class="glyphicon glyphicon-remove"></span><span class="glyphicon glyphicon-ok"></span><span class="checkbox-font">'+font[0]+'</span></span>';
 		var parent='<label class="checkbox-label"></label>';

 		$element.wrap(parent).parent().append(brother);
 		
 		var arr=[];
 		var arr1=[];
 		var span=$element.next().find("span");
 		for(var i=0; i<span.size();i++){
 			arr.push(span.eq(i).width());
 		}
 		for(var i=0; i<span.size();i++){
 			arr1.push(span.eq(i).height());
 		}
 		var maxW=Math.max.apply(null, arr);
 		var maxH=Math.max.apply(null, arr1);
 		//alert(maxW+','+maxH);
 		$element.next().find("span").css({
 		 	width:maxW+3,
 		 	height:maxH,

 		 });
 		
 		 $element.next().css({
 		 	width:4*maxW+24,
 		 	height:maxH+4
 		 });

 		  $element.parent().css({
 		 	width:2*maxW+14,
 		 	//height:maxH+6
 		 });

 		if($element.attr('checked')){
 			$element.next().css({left:-maxW*2-10});
 			$element.parent().css('borderColor','#6FB3E0');
 		}else{
 			$element.next().css({left:0});
 			$element.parent().css('borderColor','#aaa');
 		}

 		$element.click(function(){
 			var offset=0;
 			if($element.is(':checked')){
 				$element.attr('data-label',font[1]);
 				$element.next().stop();
 				$element.next().animate({'left':-maxW*2-10},300).parent().css({'borderColor':'#6FB3E0'});
 				offset=-maxW*2-10;
 			}else{
 				$element.attr('data-label',font[0]);
 				$element.next().stop();
 				$element.next().animate({'left':0},300).parent().css({'borderColor':'#aaa'});
 				offset=0;
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