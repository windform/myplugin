;(function($,window,document,undefined){
	var methods = {
	init : function(options) {
		$(this).click(function(){
			$(this).css({
				width:'300px',
				backgroundColor:'#0088cc',
				fontSize:'20px',
				padding:'10px'
			})
		})
	},
	flip : function(options) {
		$(this).wrap('<div class="par"></div>');
		var options=$.extend({
			width:'100px',
			height:'100px',
			borderRadius:'5px',
			border:'solid 1px #000',
			backgroundColor:'orange'
		},options);
		// 控制样式
		return $(this).each(function(){
			$(this).css({
				width:options.width,
				height:options.height,
				borderRadius:options.borderRadius,
				border:options.border,
				backgroundColor:options.backgroundColor
			});
			$(this).click(function(){
			alert('hello');
		})
		})
		// 控制行为
		
	},
	flop: function(options) {
		this.css({
			width:50,
			height:50,
			borderRadius:'50%',
			backgroundColor:'orange'
		})
	},
	fly : function(options) {
		this.css({
			width:150,
			height:150,
			borderRadius:'50%',
			backgroundColor:'green'
		})
	}
	};
	$.fn.tooltip = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this,
			Array.prototype.slice.call(arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply(this, arguments );
		} else {
			$.error('Method'
			+ method
			+ 'does not exist in the bestPluginEver' );
		}
	};
	$.fn.ace=function(options){
		$(this).wrap('<div class="par"></div>');
		var options=$.extend({
			width:'100px',
			height:'100px',
			borderRadius:'5px',
			border:'solid 1px #000'
		},options);

		return $(this).each(function(){
			$(this).parent('.par').css({
				width:options.width,
				height:options.height,
				borderRadius:options.borderRadius,
				border:options.border

			})
		})

	};

})($,window,document)