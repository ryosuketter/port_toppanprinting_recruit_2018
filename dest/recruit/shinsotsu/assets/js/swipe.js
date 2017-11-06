var ua = navigator.userAgent.toLowerCase();
var isEdge = (ua.indexOf('edge') > -1);

//project_story
$(function(){
  //スクロール禁止用関数
  function no_scroll(){
    //PC用
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).on(scroll_event,function(e){e.preventDefault();});
    //SP用
    $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
  }
  //スクロール復活用関数
  function return_scroll(){
    //PC用
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).off(scroll_event);
    //SP用
    $(document).off('.noScroll');
  }
  var time = new Date().getTime();
  function slide_event(class_name){
    var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(class_name).on(mousewheelevent,function(e){
      var num = parseInt($('.wheel').text());
      e.preventDefault();
      var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
      if (((new Date().getTime()) - time) < 300) return;
      time = new Date().getTime();
      if (delta < 0){
        mySwiper.slideNext();
      } else {
        mySwiper.slidePrev();
      }
    });
  }

  function last_slide(class_name){
    return_scroll();
    var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(class_name).on(mousewheelevent,function(e){
      var num = parseInt($('.wheel').text());
      e.preventDefault();
      var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
      if (delta < 0){
        var current_scroll = $(window).scrollTop();
        $(window).scrollTop(current_scroll + 5);
      }
    });
  }
  swiper_height = $(window).height() - 80;
  mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: false,
    pagination: '.swiper-pagination',
    effect: 'fade',
    controlInverse: true,
    height: swiper_height,
    autoHeight: true,
    followFinger: false,
    passiveListeners: false,
    iOSEdgeSwipeDetection: true,
    noSwipingClass: 'not-swiper-slide',
    paginationClickable: true,
    speed: 1000,
    onSlideChangeEnd: function (swiper) {
    },
    onSlideChangeStart: function (swiper) {
      no_scroll();
    },
    onTransitionEnd: function (swiper) {
      setTimeout(function(){
        $('.swiper-slide-txt-' + (swiper.activeIndex + 1)).fadeIn(1000);
        $('.swiper-slide-txt-1-' + (swiper.activeIndex + 1)).fadeIn(1000);
        $('.slide-bg-1-' + (swiper.activeIndex + 1) + ' .slide_down_icon').fadeIn(1000);
        $('.slide-bg-' + (swiper.activeIndex + 1) + ' .slide_down_icon').fadeIn(1000);
      }, 300);
      setTimeout(function(){
        return_scroll();
        last_slide('.last-slide');
      }, 400);
    }
  });

  // ua
  var ua = navigator.userAgent;
  if(ua.indexOf('iPad') > 0){
    $('.not-swiper-slide').removeClass('not-swiper-slide');
  }

  var window_width = $(window).width();
  var window_height = $(window).height();
  if(window_width > 410){
    var scroll_position = 50;
    var scroll_margin = 350;
  }else{
    var scroll_position = 10;
  }
  if(window_height > 800 && window_width < 801){
    $('.not-swiper-slide').removeClass('not-swiper-slide');
  }
  $('.slide-bg-3').on("scroll", function() {
    if (isEdge) {
      if (((new Date().getTime()) - time) < 300) return;
      time = new Date().getTime();
    }
    var txtMargin = $('.swiper-slide-txt-3').css('margin-top').replace('px', '');
    var diffHeight = $('.header').height() + parseInt(txtMargin);
    var paddding = parseInt($('.slide-bg-3 .slide_down_icon').css('padding-bottom').replace('px', ''));
    var margin = parseInt($('.slide-bg-3 .slide_down_icon').css('margin-bottom').replace('px', ''));
    if(window_width > 1000){
      var txt = $('.swiper-slide-txt-3').height() + parseInt(txtMargin) + scroll_margin;
    }else{
      var txt = $('.slide-bg-3').height() + ($('.swiper-slide-txt-3').height() - $('.slide-bg-3').height()) + paddding + margin + $('.header').height();
    }
    var scrollHeight = $('.slide-bg-3').height();
    var scrollPosition = $('.slide-bg-3').height() + $('.slide-bg-3').scrollTop();
    if ((scrollPosition - 1) > (txt)) {
      mySwiper.slideNext();
      $('.slide-bg-3').scrollTop(scroll_position);
    }
    if ((scrollHeight - scrollPosition) / (scrollHeight + diffHeight) === 0) {
      mySwiper.slidePrev();
      $('.slide-bg-3').scrollTop(scroll_position);
    }
  });
  $('.swiper-slide-2').on("scroll", function() {
    if (isEdge) {
      if (((new Date().getTime()) - time) < 300) return;
      time = new Date().getTime();
    }
    var txtMargin = $('.swiper-slide-txt-2').css('top').replace('px', '');
    var diffHeight = $('.header').height() + parseInt(txtMargin);
    var imgheight = $('.swiper-slide-2 .product_img').height();
    if(window_width > 1000){
      var txt = $('.swiper-slide-txt-2').height() + parseInt(txtMargin) + scroll_margin;
    }else{
      var txt = $('.swiper-slide-2').height() + ($('.swiper-slide-txt-2').height() - $('.swiper-slide-2').height()) + 80 + $('.header').height() + imgheight - 30;
    }
    var scrollHeight = $('.swiper-slide-2').height();
    var scrollPosition = $('.swiper-slide-2').height() + $('.swiper-slide-2').scrollTop();
    if ((scrollPosition - 1) > (txt)) {
      mySwiper.slideNext();
      $('.swiper-slide-2').scrollTop(50);
    }
    if ((scrollHeight - scrollPosition) / (scrollHeight + diffHeight) === 0) {
      mySwiper.slidePrev();
      $('.swiper-slide-2').scrollTop(scroll_position);
    }
  });
  $('.slide-bg-4').on("scroll", function() {
    if (isEdge) {
      if (((new Date().getTime()) - time) < 300) return;
      time = new Date().getTime();
    }
    var txtMargin = $('.swiper-slide-txt-4').css('margin-top').replace('px', '');
    var diffHeight = $('.header').height() + parseInt(txtMargin);
    if(window_width > 1000){
      var txt = $('.swiper-slide-txt-4').height() + parseInt(txtMargin) + scroll_margin;
    }else{
      var txt = $('.slide-bg-4').height() + ($('.swiper-slide-txt-4').height() - $('.slide-bg-4').height()) + 80 + $('.header').height();
    }
    var scrollHeight = $('.slide-bg-4').height();
    var scrollPosition = $('.slide-bg-4').height() + $('.slide-bg-4').scrollTop();
    if ((scrollPosition - 1) > (txt)) {
      mySwiper.slideNext();
      $('.slide-bg-4').scrollTop(scroll_position);
    }
    if ((scrollHeight - scrollPosition) / (scrollHeight + diffHeight) === 0) {
      mySwiper.slidePrev();
      $('.slide-bg-4').scrollTop(scroll_position);
    }
  });
  $('.slide-bg-5').on("scroll", function() {
    if (isEdge) {
      if (((new Date().getTime()) - time) < 300) return;
      time = new Date().getTime();
    }
    var txtMargin = $('.swiper-slide-txt-5').css('margin-top').replace('px', '');
    if(window_width > 1000){
      var txt = $('.swiper-slide-txt-5').height() + parseInt(txtMargin) + scroll_margin;
    }else{
      var txt = $('.slide-bg-5').height() + ($('.swiper-slide-txt-5').height() - $('.slide-bg-5').height()) + 80 + $('.header').height();
    }
    var diffHeight = $('.header').height() + parseInt(txtMargin);
    var scrollHeight = $('.slide-bg-5').height();
    var scrollPosition = $('.slide-bg-5').height() + $('.slide-bg-5').scrollTop();
    if ((scrollPosition - 1) > (txt)) {
      mySwiper.slideNext();
      $('.slide-bg-5').scrollTop(scroll_position);
    }
    if ((scrollHeight - scrollPosition) / (scrollHeight + diffHeight) === 0) {
      mySwiper.slidePrev();
      $('.slide-bg-5').scrollTop(scroll_position);
    }
  });
  $('.slide-bg-1-3').on("scroll", function() {
    if (isEdge) {
      if (((new Date().getTime()) - time) < 300) return;
      time = new Date().getTime();
    }
    var txtMargin = $('.swiper-slide-txt-1-3').css('margin-top').replace('px', '');
    if(window_width > 1000){
      var txt = $('.swiper-slide-txt-1-3').height() + parseInt(txtMargin) + scroll_margin;
    }else{
      var txt = $('.slide-bg-1-3').height() + ($('.swiper-slide-txt-1-3').height() - $('.slide-bg-1-3').height()) + 80 + $('.header').height();
    }
    var diffHeight = $('.header').height() + parseInt(txtMargin);
    var scrollHeight = $('.slide-bg-1-3').height();
    var scrollPosition = $('.slide-bg-1-3').height() + $('.slide-bg-1-3').scrollTop();
    if ((scrollPosition - 1) > (txt)) {
      mySwiper.slideNext();
      $('.slide-bg-1-3').scrollTop(scroll_position);
    }
    if ((scrollHeight - scrollPosition) / (scrollHeight + diffHeight) === 0) {
      mySwiper.slidePrev();
      $('.slide-bg-1-3').scrollTop(scroll_position);
    }
  });
  $('.slide-bg-1-4').on("scroll", function() {
    if (isEdge) {
      if (((new Date().getTime()) - time) < 300) return;
      time = new Date().getTime();
    }
    var txtMargin = $('.swiper-slide-txt-1-4').css('margin-top').replace('px', '');
    if(window_width > 1000){
      var txt = $('.swiper-slide-txt-1-4').height() + parseInt(txtMargin) + scroll_margin;
    }else{
      var txt = $('.slide-bg-1-4').height() + ($('.swiper-slide-txt-1-4').height() - $('.slide-bg-1-4').height()) + 80 + $('.header').height();
    }
    var diffHeight = $('.header').height() + parseInt(txtMargin);
    var scrollHeight = $('.slide-bg-1-4').height();
    var scrollPosition = $('.slide-bg-1-4').height() + $('.slide-bg-1-4').scrollTop();
    if ((scrollPosition - 1) > (txt)) {
      mySwiper.slideNext();
      $('.slide-bg-1-4').scrollTop(scroll_position);
    }
    if ((scrollHeight - scrollPosition) / (scrollHeight + diffHeight) === 0) {
      mySwiper.slidePrev();
      $('.slide-bg-1-4').scrollTop(scroll_position);
    }
  });
  $('.slide-bg-1-5').on("scroll", function() {
    if (isEdge) {
      if (((new Date().getTime()) - time) < 300) return;
      time = new Date().getTime();
    }
    var txtMargin = $('.swiper-slide-txt-1-5').css('margin-top').replace('px', '');
    if(window_width > 1000){
      var txt = $('.swiper-slide-txt-1-5').height() + parseInt(txtMargin) + scroll_margin;
    }else{
      var txt = $('.slide-bg-1-5').height() + ($('.swiper-slide-txt-1-5').height() - $('.slide-bg-1-5').height()) + 80 + $('.header').height();
    }
    var diffHeight = $('.header').height() + parseInt(txtMargin);
    var scrollHeight = $('.slide-bg-1-5').height();
    var scrollPosition = $('.slide-bg-1-5').height() + $('.slide-bg-1-5').scrollTop();
    if ((scrollPosition - 1) > (txt)) {
      mySwiper.slideNext();
      $('.slide-bg-1-5').scrollTop(scroll_position);
    }
    if ((scrollHeight - scrollPosition) / (scrollHeight + diffHeight) === 0) {
      mySwiper.slidePrev();
      $('.slide-bg-1-5').scrollTop(scroll_position);
    }
  });
  slide_event('.slide-bg-1, .slide-bg-1-1, .last-slide');
  $('.swiper-slide--display').css('display', 'none');
  $('.slide_down_icon').css('display', 'none');
});

$(function(){
	var box = $('.swiper-slide')[0];
	var touchStartPositionX;
	var touchStartPositionY;
	var touchMovePositionX;
	var touchMovePositionY;
	var moveFarX;
	var moveFarY;
	var startScrollX;
	var startScrollY;
	var moveScrollX;
	var moveScrollY;

	box.addEventListener("touchstart",touchHandler,false);
	box.addEventListener("touchmove",touchHandler,false);

	function touchHandler(e){
		var touch = e.touches[0];
		if(e.type == "touchstart"){
			touchStartPositionX = touch.pageX;
			touchStartPositionY = touch.pageY;
			//タッチ前スクロールをとる
			startScrollX = $('#touchbox').scrollLeft();
			startScrollY = $('#touchbox').scrollTop();
		}
		if(e.type == "touchmove"){
			e.preventDefault();
			//現在の座標を取得
			touchMovePositionX = touch.pageX;
			touchMovePositionY = touch.pageY;
			//差をとる
			moveFarX = touchStartPositionX - touchMovePositionX;
			moveFarY = touchStartPositionY - touchMovePositionY;
			//スクロールを動かす
			moveScrollX = startScrollX +moveFarX;
			moveScrollY = startScrollY +moveFarY;
			$('#touchbox').scrollLeft(moveScrollX);
			$('#touchbox').scrollTop(moveScrollY);
		}
	}
});
