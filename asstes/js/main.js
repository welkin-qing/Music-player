$(function(){
	//console.log($(window).width());  //980 改成 320
	var viewWidth = $(window).width();
	var viewHeight = $(window).height();
	var desWidth = 640;
	var touchstart = 'touchstart';
	var touchmove = 'touchmove';
	var touchend = 'touchend';
	var id = 0;
	var index = 0;
	var oAudio = $('#audio1').get(0);
	
	var $main = $('#main');
	var $listContent = $('#listContent');
	var $listContentUl = $('#listContentUl');
	var $listTitle = $('#listTitle');
	var $listAudio = $('#listAudio');
	var $listAudioImg = $('#listAudioImg');
	var $listAudioText = $('#listAudioText');
	var $listAudioBtn = $('#listAudioBtn');
	
	var $musicDetails = $('#musicDetails');
	var $detailsTitle = $('#detailsTitle');
	var $detailsName = $('#detailsName');
	var $detailsAudioProUp = $('#detailsAudioProUp');
	var $detailsAudioProBar = $('#detailsAudioProBar');
	var $detailsNowTime = $('#detailsNowTime');
	var $detailsAllTime = $('#detailsAllTime');
	var $detailsPlay = $('#detailsPlay');
	var $detailsPrev = $('#detailsPrev');
	var $detailsNext = $('#detailsNext');
	var $detailsLyric = $('#detailsLyric');
	var $detailsLyricUl = $('#detailsLyricUl');
	var $detailsAudio = $('#detailsAudio');
	var $detailsMessage = $('#detailsMessage');
	var $detailsMessageTa = $('#detailsMessageTa');
	var $detailsMessageBtn = $('#detailsMessageBtn');
	var $detailsMessageUl = $('#detailsMessageUl');
	var $detailsBtn = $('#detailsBtn');
	
	function init(){   //整个项目的初始化
		device();
		musicList.init();
		musicDetails.init();
		musicAudio.init();
	}
	
	function device(){   //兼容PC和移动端
		//console.log( navigator.userAgent );
		var isMobile = /Mobile/i.test(navigator.userAgent);
		if(viewWidth > desWidth){
			$main.css('width','640px');
		}
		if(!isMobile){
			touchstart = 'mousedown';
			touchmove = 'mousemove';
			touchend = 'mouseup';
		}
		$(window).resize(function(){
			viewWidth = $(window).width();
			viewHeight = $(window).height();
			musicDetails.sildeDown();
		});
	}
	
	var musicList = (function(){     //音乐列表页操作
		
		var bbsUrl = 'https://github.com/welkin-qing';
		var listUrl = './asstes/php/musicList.php';
		var downY = 0;
		var prevY = 0;
		var downT = 0;
		var parentH = $listContent.height();
		var childH = $listContentUl.height();
		var onoff1 = true;
		var onoff2 = true;
		var onoff3 = true;
		var timer = null;
		var speed = 0;
		
		function init(){  //初始
			data();
			bind();
			moveScroll();
		}
		
		function data(){  //数据
			$.ajax({
				url : listUrl,
				type : 'GET',
				dataType : 'json',
				success : function(data){
					$.each(data,function(i,obj){
						var $li = '<li musicId="'+(obj.id)+'"><h3 class="title">'+(obj.musicName)+'</h3><p class="name">'+(obj.name)+'</p></li>';
						$listContentUl.append($li);
					});
					childH = $listContentUl.height();
				}
			});
		}
		
		function bind(){   //事件
			$listTitle.on(touchstart,function(){
				window.location = bbsUrl;
			});
			$listContentUl.delegate('li',touchend,function(){
				if(onoff3){
					$(this).attr('class','active').siblings().attr('class','');
					id = $(this).attr('musicId');
					musicAudio.loadMusic(id);
					index = $(this).index();
				}
			});
			
			
			$listAudio.on(touchstart,function(){
				if(id){
					musicDetails.sildeUp();
				}
			});
		}
		
		function moveScroll(){   //滑动列表
			$(document).on(touchmove,function(ev){
				ev.preventDefault();
			});
			$listContentUl.on(touchstart,function(ev){
				//ev.pageX
				//touch.pageX
				//ev.originalEvent -> JQ的event转成JS的event
				if(parentH > childH){return false;}
				var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
				var This = this;
				downY = touch.pageY;
				prevY = touch.pageY;
				downT = $(this).position().top;
				onoff1 = true;
				onoff2 = true;
				onoff3 = true;
				clearInterval(timer);
				$(document).on(touchmove+'.move',function(ev){
					onoff3 = false;
					var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
					var iTop = $(This).position().top;
					
					speed = touch.pageY - prevY;
					prevY = touch.pageY;
					
					if(iTop >= 0){   //头
						if(onoff1){
							onoff1 = false;
							downY = touch.pageY;
						}
						$(This).css('transform','translate3d(0,'+(touch.pageY - downY)/3+'px,0)');
					}
					else if(iTop <= parentH - childH){  //尾
						if(onoff2){
							onoff2 = false;
							downY = touch.pageY;
						}
						$(This).css('transform','translate3d(0,'+((touch.pageY - downY)/3 + (parentH - childH))+'px,0)');
					}
					else{
						$(This).css('transform','translate3d(0,'+(touch.pageY - downY + downT)+'px,0)');
					}
					
				});
				$(document).on(touchend+'.move',function(){
					$(this).off('.move');
					
					//console.log(speed);
					if(!onoff3){
						clearInterval(timer);
						timer = setInterval(function(){
							var iTop = $(This).position().top;
							if(Math.abs(speed) <= 1 || iTop > 50 || iTop < parentH - childH - 50){
								clearInterval(timer);
								if(iTop >= 0){
									$(This).css('transition','.2s');
									$(This).css('transform','translate3d(0,0,0)');
								}
								else if(iTop <= parentH - childH){
									$(This).css('transition','.2s');
									$(This).css('transform','translate3d(0,'+(parentH - childH)+'px,0)');
								}
							}
							else{
								speed *= 0.9;
								$(This).css('transform','translate3d(0,'+(iTop + speed)+'px,0)');
							}
							
						},13);
					}
				});
				return false;
			});
			$listContentUl.on('transitonend webkitTransitionEnd',function(){
				$(this).css('transition','');
			});
		}
		
		function show(sName,sMusicName,sImg){   //显示
			$listAudioImg.attr('src','music/'+sImg);
			$listAudioText.find('h3').html(sMusicName);
			$listAudioText.find('p').html(sName);
			$listAudioBtn.show();
		}
		
		return {
			init : init,
			show : show
		};
		
	})();
	
	var musicDetails = (function(){    //音乐详情页操作
		var re = /\[[^[]+/g;
		var arr = [];
		var $li = null;
		var iLiH = 0;
		var downX = 0;
		var range = 20;
		var timer = null;
		function init(){    //初始
			$musicDetails.css('transform','translate3d(0,'+(viewHeight)+'px,0)');
			$detailsMessage.css('transform','translate3d('+(viewWidth)+'px,0,0)');
			bind();
		}
		function sildeUp(){    //向上展开
			$musicDetails.css('transition','.5s');
			$musicDetails.css('transform','translate3d(0,0,0)');
		}
		function sildeDown(){   //向下收缩
			$musicDetails.css('transform','translate3d(0,'+(viewHeight)+'px,0)');
			$musicDetails.one('transitionend weikitTransitionEnd',function(){
				$detailsLyric.add($detailsAudio).css('transform','translate3d(0,0,0)');
				$detailsMessage.css('transform','translate3d('+(viewWidth)+'px,0,0)');
				$detailsBtn.find('li').eq(0).attr('class','active').siblings().attr('class','');
			});
		}
		function bind(){    //事件
			$detailsTitle.on(touchstart,function(){
				sildeDown();
			});
			$musicDetails.on(touchstart,function(ev){
				var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
				downX = touch.pageX;
				$(document).on(touchend+'.move',function(ev){
					$(this).off('.move');
					var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
					if( touch.pageX - downX < -range ){   //←
						$detailsLyric.add($detailsAudio).css('transform','translate3d('+(-viewWidth)+'px,0,0)');
						$detailsMessage.css('transform','translate3d(0,0,0)');
						$detailsBtn.find('li').eq(1).attr('class','active').siblings().attr('class','');
						loadMessage();
						clearInterval(timer);
						timer = setInterval(scrollMessage,3000);
					}
					else if( touch.pageX - downX > range ){   //→
						$detailsLyric.add($detailsAudio).css('transform','translate3d(0,0,0)');
						$detailsMessage.css('transform','translate3d('+(viewWidth)+'px,0,0)');
						$detailsBtn.find('li').eq(0).attr('class','active').siblings().attr('class','');
						clearInterval(timer);
					}
				});
			});
			$detailsMessageBtn.on(touchstart,function(){
				addMessage();
			});
		}
		function show(sName,sMusicName,sLyric){   //显示
			$detailsName.html(sMusicName + ' <span>'+ sName +'</span>');
			$detailsLyricUl.empty().css('transform','translate3d(0,0,0)');
			//console.log(sLyric);
			arr = sLyric.match(re);
			//console.log(arr);
			for(var i=0;i<arr.length;i++){
				arr[i] = [formatTime(arr[i].substring(0,10)) , arr[i].substring(10).trim()];
			}
			//console.log(arr);
			for(var i=0;i<arr.length;i++){
				$detailsLyricUl.append('<li>'+arr[i][1]+'</li>');
			}
			$li = $detailsLyricUl.find('li');
			$li.first().attr('class','active');
			iLiH = $li.first().outerHeight(true);
		}
		function formatTime(num){   //格式日期
			num = num.substring(1,num.length-1);
			var arr = num.split(':');
			return (parseFloat(arr[0]*60) + parseFloat(arr[1])).toFixed(2);
		}
		function scrollLyric(ct){    //滚动歌词
			//console.log(ct);
			for(var i=0;i<arr.length;i++){
				if( i != arr.length - 1 && ct > arr[i][0] && ct < arr[i+1][0] ){
					$li.eq(i).attr('class','active').siblings().attr('class','');
					if(i>3){
						$detailsLyricUl.css('transform','translate3d(0,'+(-iLiH*(i-3))+'px,0)');
					}
					else{
						$detailsLyricUl.css('transform','translate3d(0,0,0)');
					}
				}
				else if(i == arr.length-1 && ct > arr[i][0]){
					$li.eq(i).attr('class','active').siblings().attr('class','');
					$detailsLyricUl.css('transform','translate3d(0,'+(-iLiH*(i-3))+'px,0)');
				}
			}
		}
		function loadMessage(){   //载入留言
			console.log("3333333333")
			$detailsMessageUl.empty();
			$.ajax({
				url : './asstes/php/loadMessage.php',
				type : 'GET',
				dataType : 'json',
				data : { mid : id },
				success : function(data){
					$.each(data,function(i,obj){
						var $li = $('<li>'+obj.text+'</li>');
						$detailsMessageUl.prepend($li);
					});
				}
			});	
		}
		function addMessage(){    //添加留言
			console.log("22222222222")
			var value = $detailsMessageTa.val();
			$detailsMessageTa.val('');
			$.ajax({
				url : './asstes/php/addMessage.php',
				type : 'POST',
				dataType : 'json',
				data : { mid : id , text : value},
				success : function(data){
					if(data.code){
						var $li = $('<li>'+data.message+'</li>');
						$detailsMessageUl.prepend($li);
					}
				}
			});
		}
		function scrollMessage(){   //滚动留言
			var $last = $detailsMessageUl.find('li').last();
			$detailsMessageUl.prepend($last);
			$last.css('opacity',0);
			setTimeout(function(){
				$last.css('opacity',1);
			},200);
		}
		return {
			init : init,
			sildeUp : sildeUp,
			sildeDown : sildeDown,
			show : show,
			scrollLyric : scrollLyric
		};
	})();
	
	var musicAudio = (function(){    //音乐播放器操作
		var onoff = true;
		var timer = null;
		var scale = 0;
		var disX = 0;
		var parentW = $detailsAudioProBar.parent().width();
		function init(){   //初始
			bind();
		}
		function loadMusic(id){   //载入音乐
			$.ajax({
				url : './asstes/php/musicAudio.php',
				type : 'GET',
				dataType : 'json',
				data : { id : id },
				async : false,   //苹果下能够播放
				success : function(data){
					show(data);
				}
			});
		}
		function show(obj){    //显示
			var sName = obj.name;
			var sMusicName = obj.musicName;
			var sLyric = obj.lyric;
			var sImg = obj.img;
			var sAudio = obj.audio;
			musicList.show(sName,sMusicName,sImg);
			musicDetails.show(sName,sMusicName,sLyric);
			oAudio.src = 'music/'+sAudio;
			play();
			$(oAudio).one('canplaythrough',function(){
				$detailsAllTime.html( formatTime(oAudio.duration) );
			});
			$(oAudio).one('ended',function(){
				next();
			});
		}
		function play(){   //播放
			onoff = false;
			$listAudioImg.addClass('move');
			$listAudioBtn.css('backgroundImage','url(asstes/img/list_audioPause.png)');
			$detailsPlay.css('backgroundImage','url(asstes/img/details_pause.png)');
			oAudio.play();
			playing();
			clearInterval(timer);
			timer = setInterval(playing,1000);
		}
		function pause(){  //暂停
			onoff = true;
			$listAudioImg.removeClass('move');
			$listAudioBtn.css('backgroundImage','url(asstes/img/list_audioPlay.png)');
			$detailsPlay.css('backgroundImage','url(asstes/img/details_play.png)');
			oAudio.pause();
			clearInterval(timer);
		}
		function bind(){   //事件
			$listAudioBtn.add($detailsPlay).on(touchstart,function(){
				if(onoff){
					play();
				}
				else{
					pause();
				}
				return false;
			});
			$detailsAudioProBar.on(touchstart,function(ev){
				var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
				var This = this;
				disX = touch.pageX - $(this).position().left;
				clearInterval(timer);
				$(document).on(touchmove+'.move',function(ev){
					var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
					var L = touch.pageX - disX;
					if(L<=0){
						L = 0;
					}
					else if(L >= parentW){
						L = parentW;
					}
					$(This).css('left', L );
					scale = L/parentW;
				});
				$(document).on(touchend+'.move',function(){
					$(this).off('.move');
					oAudio.currentTime = scale * oAudio.duration;
					playing();
					clearInterval(timer);
					timer = setInterval(playing,1000);
				});
				return false;
			});
			$detailsPrev.on(touchstart,function(){
				prev();
			});
			$detailsNext.on(touchstart,function(){
				next();
			});
		}
		function formatTime(num){   //格式日期
			num = parseInt(num);
			var iM = Math.floor(num%3600/60);
			var iS = Math.floor(num%60);
			return toZero(iM) + ':' + toZero(iS);
		}
		function toZero(num){    //补零操作
			if(num < 10){
				return '0' + num;
			}
			else{
				return '' + num;
			}
		}
		function playing(){    //播放进行中
			$detailsNowTime.html( formatTime(oAudio.currentTime) );
			scale = oAudio.currentTime / oAudio.duration;
			$detailsAudioProUp.css('width',scale * 100 + '%');
			$detailsAudioProBar.css('left',scale * 100 + '%');
			musicDetails.scrollLyric(oAudio.currentTime);
		}
		function next(){    //下一首歌
			var $li = $listContentUl.find('li');
			index = index == $li.length - 1 ? 0 : index + 1;
			id = $li.eq(index).attr('musicId');
			$li.eq(index).attr('class','active').siblings().attr('class','');
			loadMusic(id);
		}
		function prev(){    //上一首歌
			var $li = $listContentUl.find('li');
			index = index == 0 ? $li.length - 1 : index - 1;
			id = $li.eq(index).attr('musicId');
			$li.eq(index).attr('class','active').siblings().attr('class','');
			loadMusic(id);
		}
		return {
			init : init,
			loadMusic : loadMusic
		};
	})();
	
	init();
	
});