;(function ( $, window, document, undefined ) {

  $.fn.canvasizr = function ( options ) {
    options = $.extend( {}, $.fn.canvasizr.options, options );

      return this.each(function () {
        var $this = $( this ),
        pos = $this.position(),
        width = $this.outerWidth(),
        height = $this.outerHeight() 
          + parseInt( $this.css( "margin-top" ) ) 
          + parseInt( $this.css( "margin-bottom" ) ),
        canvas = document.createElement( "canvas" ),
        $canvas = $( canvas ),
        ctx = canvas.getContext( "2d" );
        $.extend( ctx,options );
        canvas.width = width;
        canvas.height = height; 
        ctx.fillRect( 0, 0, parseInt( width ), parseInt( height ));
        if( options.border){
          ctx.strokeRect( 0, 0, parseInt( width ), parseInt( height ) );
        }
        ctx.fillStyle = ctx.textColor;
        ctx.fillText( $this.text(), 8, parseInt( height )/2 );
        $canvas.css({
          "position" : "absolute",
          "left" : pos.left +"px",
          "top" : pos.top +"px",
          "z-index":1
        });
        $( "body" ).append( $canvas );
      });
    };


  $.fn.canvasizr.options = {
    textColor : "#ffffff",
    fillColor:  "#ff0000",
    strokeStyle : "#000",
    border: false,
    font : "20px sans-serif",
    lineCap : "butt",
    lineJoin : "miter",
    lineWidth :  1,
    miterLimit :  10,
    shadowBlur :  0,
    shadowColor : "rgba(0, 0, 0, 0)",
    shadowOffsetX :  0,
    shadowOffsetY :  0,
    textAlign :  "start",
    textBaseline : "alphabetic"
  };

})( jQuery, window, document ); 
