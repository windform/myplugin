+function($) {

	var FxInputClear = function(element, option) {
		var show = false;
		var $element = $(element);

		$element.wrap('<div class="inputclear-box"></div>');
		$element.after('<div class="glyphicon glyphicon-remove inputclear-clear"></div>').next().click(function() {
			show = false;
			$element.val('');
			$element[0].focus();
			$(this).hide();
		});

		$element.keyup(function() {
			var v = $element.val();
			if (v.length > 0) {
				if (!show) {
					show = true;
					$element.next().show();
				}
			} else {
				if (show) {
					show = false;
					$element.next().hide();
				}
			}
		});
	},
	Plugin = function(option) {
		var args = Array.prototype.splice.call(arguments, 1);
		return this.each(function() {
			var $this = $(this), inst = $this.data('fx-input-clear');
			if (!inst) $this.data('fx-input-clear', (inst = new FxInputClear(this, option)));
			if (typeof option == 'string' && inst[option]) inst[option].apply(inst, args);
		});
	};

	$.fn.inputclear = Plugin;
	$.fn.inputclear.Constructor = FxInputClear;

}(jQuery);
