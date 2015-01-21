;(function($) {
  "use strict";

  var $slider,
      timer,
      interval = 2000,
      current = 0,
      imageLength,
      imageWidth,
      $cloneFirst,
      $cloneLast,
      $pager;

  var init = function() {
    $slider = $(".slider_main");
    imageWidth = $slider.children('li').width();
    imageLength = $slider.children().length;
    $cloneFirst = $slider.children(":first").clone();
    $cloneLast = $slider.children(":last").clone();
    $pager = $(".pagination li");

    $slider.append($cloneFirst).prepend($cloneLast);
    $slider.stop().css({
      "marginLeft": - imageWidth + "px"
    });

    $(".btn_control .btn_next, .btn_control .btn_prev")
    .off().on("click", function(event) {
      event.preventDefault();
      if($slider.is(":animated") ){
        return;
      }
      var next;
      clearTimeout(timer);
      if($(this).hasClass("btn_next")) {
        next = (current + 1) > imageLength - 1 ? 0 : current + 1;
      } else {
        next = (current - 1) < 0 ? imageLength - 1 : current - 1;
      }
      slide(next);
      timer = setTimeout(autoSlide, interval);
    });

    $pager.off().on("click", function(event){
      event.preventDefault();
      if($slider.is(":animated")) {
        return;
      }
      clearTimeout(timer);
      var next = $pager.index($(this));
      slide(next);
      timer = setTimeout(autoSlide, interval );
    });
  },


  slide = function(next) {
    var nextPosition = checkPosition(next);
    $slider.stop().animate({
      "marginLeft": nextPosition + "px"
    });
    current = next;
    $pager.removeClass("active");
    $pager.eq(current).addClass("active");
  },

  checkPosition = function(next){
    var nextPosition = -(imageWidth * next + imageWidth);
    if( current === imageLength - 1 && next === 0 ){
      $slider.stop().css({
        "marginLeft": 0
      });
    } else if( current === 0 && next === imageLength - 1 ){
      $slider.stop().css({
        "marginLeft": -(imageLength * imageWidth + imageWidth) + "px"
      });
    };
    return nextPosition;
  },

  autoSlide = function(event) {
    clearTimeout(timer);
    var next = current + 1 > imageLength - 1 ? 0 : current + 1;
    slide(next);
    timer = setTimeout(autoSlide, interval);
  }

  //document.ready
  $(function() {
    init();
    timer = setTimeout(autoSlide, interval);
  });

})(jQuery);