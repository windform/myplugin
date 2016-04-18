$(function(){
	$('input[type="text"],input[type="password"]').inputclear();
})

$.fn.inputclear=function(){
	var clear=$(this).data('clear-btn');
	//alert(clear);
	$(this).wrap('<div></div>');
	$(this).after('<span class="glyphicon glyphicon-remove"></span>');

		// 样式行为控制
	$(this).parent().css('position','relative').end().next().css({
		position:'absolute',
		right:10,
		top:$(this).height()/2,
		cursor:'pointer',
		display:'none',
	}).click(function(){
		//console.log('清除文本内容');
		//console.log($(this).prev().val());
		$(this).prev().val('');
		$(this).css('display','none');
	}).end().focus(function(){
		//console.log('获取文本焦点');
		if($(this).val()!=''){
			$(this).next().css('display','inline-block');
		}
	}).blur(function(){
		//console.log('失去文本焦点');
		$(this).next().css('display','none')
	}).keydown(function(){
		$(this).next().css('display','inline-block');
	})


	

}