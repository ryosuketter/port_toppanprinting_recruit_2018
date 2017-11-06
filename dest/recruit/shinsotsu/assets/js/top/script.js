$(function(){

(function() {
    $('a[href^="#"]').on({
        'click':function(e){
            var speed = 500;
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;
            $('body,html').animate({scrollTop:position}, speed, 'swing');
            return false;
        }
    });
}).call(this);

(function() {
    $(window).on('load',function(){
        if (window.innerWidth < 768) {
            FastClick.attach(document.body);
        }
    }).resize();
}).call(this);

(function() {
    var $slider = $('.slider');
    if ($slider.length!=0) {
        if (window.innerWidth < 768) {
            $slider.slick({
                infinite: true,
                autoplay:true,
                autoplaySpeed:2000,
                pauseOnHover:false,
                centerMode: true,
                centerPadding: '22%',
                slidesToShow: 1,
                slidesToScroll: 1,
                speed:400,
                arrows:false,
                dots:false
            });
        }else{
            $slider.slick({
                infinite: true,
                autoplay:true,
                autoplaySpeed:2000,
                pauseOnHover:false,
                centerMode: true,
                centerPadding: '20%',
                slidesToShow: 2,
                slidesToScroll: 2,
                cssEase:'cubic-bezier(.48,.12,.41,.99)',
                speed:500,
                arrows:false,
                dots:false
            });
        }
    }
}).call(this);

//Top_message & scroll func
(function() {
    var check=0;
    var $top_header = $('#top_header');
    if (window.innerWidth < 768) {
        var $th_top = $top_header.offset().top - 50;
    }else{
        var $th_top = $top_header.offset().top - 79;
    }
    var $th_float = $top_header.find('.float_inner');
    $(window).scroll(function(){
        var y = $(this).scrollTop();

        //ヘッダー対応
        if(y>=$th_top){
            if (check!=1) {
                check=1;
                $th_float.addClass('on');
            };
        }
        if(y<$th_top){
            if (check!=0) {
                check=0;
                $th_float.removeClass('on');
            }
        }

        //パララックス対応
        if (window.innerWidth < 768) {
            $('.parallax').attr('style', 'transform:translate(0,'+parseInt( -y / 4 + 250 )+'px);');
        }else{
            $('.parallax').attr('style', 'transform:translate(0,'+parseInt( -y / 6 + 400 )+'px);');
        }

        //メッセージエリアクローズ対応
        scroll_endup();
    });

    var counter = 0;
    var gate1 = 0;
    var gate2 = 0;
    var gate3 = 0;
    var lastgate = 0;
    var upgate = 0;

    var $disc_box = $('.disc_box');
    var setWrap = $('#top_first');

    function scrollswiching(){
        if(counter===0){
            setTimeout(function(){gate1=1;},1000);
            counter++;
            $disc_box.addClass('open');
            $('#top_first__mouse').addClass('on');
        }
        if(gate1===1){
            gate1++;
            $disc_box.find('p').eq(0).addClass('on');
            setTimeout(function(){gate2=1;},500);
        }
        if(gate2===1){
            gate2++;
            $disc_box.find('p').eq(1).addClass('on');
            setTimeout(function(){gate3=1;},500);
        }
        if(gate3===1){
            gate3++;
            $disc_box.find('p').eq(2).addClass('on');
            setTimeout(function(){lastgate=1;},500);
        }
    }

    function scroll_endup(){
        if(lastgate===1){
            if ($(window).scrollTop() > window.innerHeight/3) {
                upgate=1;
            }
            if (upgate == 1) {
                if (window.innerWidth < 769) {
                    if ($(window).scrollTop() < window.innerHeight/5) {
                        $disc_box.removeClass('open');
                        $disc_box.find('p').removeClass('on');
                        $('#top_first__mouse').removeClass('on');
                    }
                }
            }
        }
    }

    var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    setWrap.on(mousewheelevent,function(e){
        if(lastgate===0){
            e.preventDefault();
        }
        var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
        if (delta < 0){
            scrollswiching();
        } else {
            $disc_box.removeClass('open');
            $disc_box.find('p').removeClass('on');
            $('#top_first__mouse').removeClass('on');
            if ($(window).scrollTop() ==0) {
                upgate=0;
            }
        }
    });

    var isTouch = ('ontouchstart' in window);
    setWrap.on({'touchstart': function(e){
            if(lastgate===0){
                e.preventDefault();
                this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
                this.topBegin = parseInt($(this).css('top'));
                this.top = parseInt($(this).css('top'));
                this.touched = true;
            }
        },'touchmove': function(e){
            if(!this.touched){return;}
            e.preventDefault();
            this.top = this.top - (this.pageY - (isTouch ? event.changedTouches[0].pageY : e.pageY));
            this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
        },'touchend': function(e){
            if (!this.touched) {return;}
            this.touched = false;
            if(((this.topBegin)-30) > this.top){
                scrollswiching()
            }else{
                console.log('up');
                if(lastgate===1){
                    console.log('up2');
                    $disc_box.removeClass('open');
                    $disc_box.find('p').removeClass('on');
                    $('#top_first__mouse').removeClass('on');
                    if ($(window).scrollTop() < 10) {
                        upgate=0;
                    }
                }
            }
        }
    });
}).call(this);

//WebGL
(function() {
var renderer_flg=0;
var compass;
var vertical;
var twist;
var c_width = window.innerWidth;
var c_height = window.innerHeight;

window.addEventListener('resize',function(){
    c_width = window.innerWidth;
    c_height = window.innerHeight;
},true);

window.addEventListener('deviceorientation', function(event2) {
    var alpha = event2.alpha;
    var beta = event2.beta;
    var gamma = event2.gamma;

    compass = alpha / 1000;

    //視点移動の範囲制限。逆さ防止
    if (-20 < beta&&beta < 80) {
        vertical = beta / 500;
        if (Math.abs(gamma) < 70) {
            twist = gamma / 1000;
        }
    }
}, true);


var main = function(){
    var scene = new THREE.Scene();
    //camera
    var width = window.innerWidth;
    var height = window.innerHeight;
    var fov = 30;
    var aspect = width / height;
    var near = 1;
    var far = 2000;
    var camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,0,120);

    //obj move var
    var theta=0;
    var r =350;
    var rad;
    var phy = 27*Math.PI/180;

    //DOM
    var cv = document.getElementById("top_first");
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width,height-120);
    renderer.setClearColor(0xffffff);
    $('#top_first').css('height', window.innerHeight-79);
    //Retina
    if (window.innerWidth < 768) {
        c_width = window.innerWidth*2;
        c_height = window.innerHeight*2;
        renderer.setSize(c_width,c_height);
        setTimeout(function(){
                $('#top_first').find('canvas').css('height', window.innerHeight);
                $('#top_first').css('height', window.innerHeight-50);
        },10);
    }
    cv.appendChild(renderer.domElement);

    //canvas resize
    function canvas_resize(){
        var windowInnerWidth=window.innerWidth;
        var windowInnerHeight=window.innerHeight;
        if (768 < window.innerWidth) {
            c_width = window.innerWidth;
            c_height = window.innerHeight;
            renderer.setSize(windowInnerWidth,windowInnerHeight - 120);
            //window aspect responsive
            camera.aspect = c_width / c_height;
            camera.updateProjectionMatrix();
            $('#top_first').css('height', window.innerHeight-79);
        }
    }
    canvas_resize();

    window.addEventListener('resize',function(){
        canvas_resize();
    },true);

    //light
    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    //First Point
    var position =[];
    for (var i = 0; i < 200; i++) {
        var x = (Math.random()-0.5) * 700;
        var y = (Math.random()-0.5) * 700;
        var z = (Math.random()-0.5) * 700;
        position.push([x,y,z]);
    }
    var position2 =[];
    for (var i = 0; i < 200; i++) {
        var x = (Math.random()-0.5) * 1000;
        var y = (Math.random()-0.5) * 1000;
        var z = (Math.random()-0.5) * 1000;
        position2.push([x,y,z]);
    }

    //Mouse controls
    var controls = new THREE.FirstPersonControls(camera);
    controls.movementSpeed = 1;
    controls.lookSpeed = 0.04;
    controls.lon = -85;
    clock = new THREE.Clock();

    //Blender obj load
    var loader = new THREE.JSONLoader();
    var mesh;

    var loader2 = new THREE.JSONLoader();
    var mesh2;

    loader.load( 'assets/js/top/toppan_block.json', function ( geometry, materials ) {
        var material = new THREE.MeshPhongMaterial({color:0x0068b5});
        var material2 = new THREE.MeshPhongMaterial({color:0x041036});
        var material3 = new THREE.MeshPhongMaterial({color:0xfdd671});
        var material4 = new THREE.MeshPhongMaterial({color:0xff5537});
        var material5 = new THREE.MeshPhongMaterial({color:0x53b3a7});

        var objs=[];
        var divi=Number(position.length)/5;
        for (var i = 0; i < position.length; i++){

            if (i <= divi) {
                objs[i] = new THREE.Mesh( geometry, material2 );
            }
            if ( divi < i && i <= Number(divi*2) ) {
                objs[i] = new THREE.Mesh( geometry, material3 );
            }
            if ( Number(divi*2) < i && i <= Number(divi*3) ) {
                objs[i] = new THREE.Mesh( geometry, material4 );
            }
            if (Number(divi*3) < i && i <= Number(divi*4)) {
                objs[i] = new THREE.Mesh( geometry, material5 );
            }
            if (Number(divi*4) < i ) {
                objs[i] = new THREE.Mesh( geometry, material );
            }

            objs[i].position.set(position[i][0],position[i][1],position[i][2]);
            objs[i].scale.set( 14, 14, 14 );
            objs[i].rotation.y += Math.random()*360;
            objs[i].rotation.z += Math.random()*360;
            scene.add(objs[i]);
        }

        // second obj
        loader2.load( 'assets/js/top/toppan_wire.json', function ( geometry2, materials2 ) {
            var objs2=[];
            var divi2=Number(position2.length)/5;
            for (var i = 0; i < position2.length; i++){

                if (i <= divi2) {
                    objs2[i] = new THREE.Mesh( geometry2, material2 );
                }
                if ( divi2 < i && i <= Number(divi2*2) ) {
                    objs2[i] = new THREE.Mesh( geometry2, material3 );
                }
                if ( Number(divi2*2) < i && i <= Number(divi2*3) ) {
                    objs2[i] = new THREE.Mesh( geometry2, material4 );
                }
                if (Number(divi2*3) < i && i <= Number(divi2*4)) {
                    objs2[i] = new THREE.Mesh( geometry2, material5 );
                }
                if (Number(divi2*4) < i ) {
                    objs2[i] = new THREE.Mesh( geometry2, material );
                }
                objs2[i].position.set(position2[i][0],position2[i][1],position2[i][2]);
                objs2[i].scale.set( 10, 10, 10 );
                objs2[i].rotation.y += Math.random()*360;
                objs2[i].rotation.z += Math.random()*360;
                scene.add(objs2[i]);
            }

            (function renderLoop(){
                controls.update(clock.getDelta());
                requestAnimationFrame(renderLoop);

                //sensor active
                if (window.innerWidth < 768) {
                    camera.rotation.y= twist;
                    camera.rotation.x= vertical - 0.045;
                }

                for (var i = 0; i < position.length; i++){
                    var m = 1;
                    if (i%2==0) {m= -0.5;}
                    if (i%3==0) {m= 2;}
                    if (i%5==0) {m= 0.5;}
                    if (i%7==0) {m= -1;}
                    objs[i].rotation.y += 0.005*m;
                    objs[i].rotation.z += 0.005*m;

                    objs2[i].rotation.y += 0.005*m;
                    objs2[i].rotation.z += 0.005*m;

                    rad = theta*Math.PI/180;
                    var px = position[i][0]+r*Math.cos(rad)*m;
                    var py = position[i][1]+r*Math.cos(rad);
                    var pz = position[i][2]+r*Math.sin(rad)*m;

                    objs[i].position.set(px,py,pz);

                    theta += 0.0005;
                    if(theta >= 360){
                        theta=0;
                    }
                };

                renderer.render(scene,camera);
                if (renderer_flg==0) {
                    renderer_flg=1;
                    $('#wrap_top').addClass('open');
                }
            })(); //renderer end
        }); // wire load & callback
    });// block load & callback
};
window.addEventListener('DOMContentLoaded', main, false);
}).call(this);







//navigation
// オーバーレイ作成
$('#contents').prepend('<div class="overlay"></div>');
// アイコンをクリックしたら
$('.navBtn').click(function() {
        $('header').toggleClass('navOpen'); // class付与/削除
        $('#wrap').toggleClass('fixed'); // コンテンツを固定/解除
        $('.overlay').toggle(); // オーバーレイ表示/非表示
        $('.float_inner').toggleClass('on_top');

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





}); // /jQuery
