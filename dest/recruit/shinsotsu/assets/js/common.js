// <!-- スムーズスクロール部分の記述 -->
$(function(){
   // #で始まるアンカーをクリックした場合に処理
   $('a[href=#]').click(function(e) {
      e.preventDefault();
      // スクロールの速度
      var speed = 400; // ミリ秒
      // アンカーの値取得
      var href= $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top;
      // スムーススクロール
      $('body,html').animate({scrollTop:position}, speed, 'swing');
   });
});

// jQueryでスクロールしてふわっと表示させる方法
$(function(){
  $('.appear div').css("opacity","0");  //読み込み時、透過して表示されないようにする
  $(window).scroll(function (){
    $(".appear").each(function(){  //effectクラスがあれば関数を実行する
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/2){
        $("div",this).css({
          "opacity":"1",})
         $(".fiu",this).addClass("fadeInUp");
         $(".fil",this).addClass("fadeInLeft");
         $(".fir",this).addClass("fadeInRight");
      //.effect imgがウィンドウの高さ1/3に到達したら不透過にする
      }
    });
  });
});

// jQueryでスクロールしてふわっと表示させる方法
$(function(){
  $('.appear-low div').css("opacity","0");  //読み込み時、透過して表示されないようにする
  $(window).scroll(function (){
    $(".appear-low").each(function(){  //effectクラスがあれば関数を実行する
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop()-40;
      var windowHeight = $(window).height();
      if (scroll > imgPos - windowHeight + windowHeight/2){
        $("div",this).css({
          "opacity":"1",})
         $(".fiu",this).addClass("fadeInUp--low");
      }
    });
  });
});

// toggle系メソッドを使ったアコーディオン演出
$(function(){
  $(".acMenu dt").on("click", function(e) {
    var $self = $(this);
    var $next = $self.next();
    $next.slideToggle(500, function() {
      // console.log($next.is(":visible"));
      if ($next.is(":visible")) {
        $self.addClass('add_plus')
      } else {
        $self.removeClass('add_plus')
      }
    });
  });
});

// toggle系メソッドを使ったアコーディオン演出
$(function(){
  $(".acMenu li").on("click", function(e) {
    var $self = $(this);
    var $navilink = $self.find(".navi-link");
    $navilink.slideToggle(500, function() {
      // console.log($next.is(":visible"));
      if ($navilink.is(":visible")) {
        $self.addClass('add_plus')
      } else {
        $self.removeClass('add_plus')
      }
    });
  });
});

// youtube popup
$(function(){
	$('.popup-iframe').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 200,
		preloader: false
	});
});

// =========================================
// ナビゲーションアイコン
// =========================================

// オーバーレイ作成
$('#contents').prepend('<div class="overlay"></div>');

// アイコンをクリックしたら
$('.navBtn').click(function() {
        $('header').toggleClass('navOpen'); // class付与/削除
        $('#wrap').toggleClass('fixed'); // コンテンツを固定/解除
        $('.overlay').toggle(); // オーバーレイ表示/非表示

        // スマホナビゲーションがヘッダーに被らないようにする
        var headerH = $('header').outerHeight();
        if ($('header').hasClass('navOpen')) {
                // $('header nav').css('marginTop', headerH + 'px');
                //ヘッダーの高さ分マージンを付ける
        }
});

// オーバーレイをクリックしたら
$('.overlay').click(function() {
        $(this).fadeOut(300); // オーバーレイ非表示
        $('header').removeClass('navOpen'); // class削除
        $('#wrap').removeClass('fixed'); // 固定解除
});

// =========================================
// モーダルウィンドウ
// =========================================
(function($){

	$(function(){
		simpleModalWindow();
	});

	function simpleModalWindow(){

		var sp = 500;	//アニメーション速度
		var win = $(window);
		var body = $('body');
		var bg = $('<div id="modal-bg"></div>');
		bg.css('opacity', '0');

		//モーダルウィンドウ表示クリックイベント
		$(document).on('click', '.modal', function(){
			var py = win.scrollTop(); //ウィンドウ最下部のスクロール位置
			var wh = win.height(); //ウィンドウの高さ
			var self = $(this);
			var link = self.attr('href');
			var check = link.match(/^#.+/);
			var mWin = $('<div id="modal-win"><div id="modal-win-inner"></div></div>');
			var mInner = mWin.find('#modal-win-inner');
			mInner.css('opacity', '0');
			body.append(mWin);
			mWin.prepend(bg);
			if(!check){
				mInner.append('<img src="' + link + '" alt="" />');
				var img = mWin.find('img');
				img.on('load', function(){
					view(img);
				});
			}
			else {
				var contents = $(link);
				mInner.append(contents);
				contents.css({display: 'inline-block', zIndex: '101'});
				view(contents);
			}
			function view(a_elm){
				var w = a_elm.outerWidth();
				var h = a_elm.outerHeight();
				modal_height = (wh - h) > 0 ? (wh - h) : 20;
				var mt = modal_height / 2 + py;
				bg.animate({opacity: '.75'}, sp);
				mWin.css('top', mt + 'px');
				mInner.css({width: w, height: h}).animate({opacity: '1'}, sp);

        var ww = win.width();
        if (ww < 500) {
          mInner.css({width: w, height: h + 30}).animate({opacity: '1'}, sp);
        }
			}
			return false;
		});

		//モーダルウィンドウ内要素変更クリックイベント
		$(document).on('click', '.modal-move', function(){
			var py = win.scrollTop();
			var wh = win.height();
			var self = $(this);
			var link = self.attr('href');
			var check = link.match(/^#.+/i);
			var mWin = $('#modal-win');
			var mInner = mWin.find('#modal-win-inner');
			if(check){
				mInner.animate({opacity: '0'}, sp, function(){
					var nowContents = $(this).children();
					body.append(nowContents);
					nowContents.hide();
					var contents = $(link);
					mInner.append(contents);
					contents.css({display: 'inline-block', zIndex: '101'});
					var w = contents.outerWidth();
					var h = contents.outerHeight();
					modal_height = (wh - h) > 0 ? (wh - h) : 20;
					var mt = modal_height / 2 + py;
					bg.animate({opacity: '.75'}, sp);
					mWin.css('top', mt + 'px');
					mInner.css({width: w, height: h}).animate({opacity: '1'}, sp);
				});
			}
			return false;
		});

		//モーダルウィンドウクローズクリックイベント
		$(document).on('click', '#modal-bg, .modal-close', function(){
			var mWin = $('#modal-win');
			var mInner = mWin.find('#modal-win-inner');
			var contents = mInner.children();
			mInner.animate({opacity: '0'}, sp, function(){
				if(contents.attr("id")){
					body.append(contents);
					contents.hide();
				}
				mWin.remove();
			});
			bg.animate({opacity: '0'}, sp);
			return false;
		});

	}
})(jQuery);
