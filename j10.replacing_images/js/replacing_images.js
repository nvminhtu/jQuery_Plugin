;(function($){
  "use strict";
  var swapImages;
  $(function(){
    setInterval(swapImages,5000);
  })

  swapImages = function (){
    var $active = $('#gallery .active'),
        $next = ($('#gallery .active').next().length > 0) ? $('#gallery .active').next() : $('#gallery img:first');;
    $active.fadeOut( function() {
      $active.removeClass('active');
      $next.fadeIn().addClass('active');
    });

  }
})(jQuery)