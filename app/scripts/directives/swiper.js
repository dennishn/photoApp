'use strict';

angular.module('photoAppApp')
.directive('swiper', function ($rootScope) {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			var direction = '';
			console.log($(element).children().children());
			$(element).find('img').load(function(){
				console.log('rdy!');
			});
			$rootScope.$on('last-repeat', function() {
				console.log('yoloscope');
				var mySwiper = $(element).swiper({
					mode:"horizontal",
					loop: false,
					updateOnImagesReady: true,
					progress: true,
					onProgressChange: function(swiper){
						for (var i = 0; i < swiper.slides.length; i++){
							var slide = swiper.slides[i];
							var progress = slide.progress;
							swiper.setTransform(slide,'translate3d(0px,0,'+(-Math.abs(progress*1500))+'px) rotateY(' + progress*70 + 'deg) rotateX(' + progress*20 + 'deg)');
							var opacity = 1 - Math.min(Math.abs(progress),1);
							slide.style.opacity = opacity;
						}
					},
					onImagesReady: function(swiper){
						console.log('rdy');
					},
					onTouchStart: function(swiper, event){
						for (var i = 0; i < swiper.slides.length; i++){
							swiper.setTransition(swiper.slides[i], 0);
						}
					},
					onSetWrapperTransition: function(swiper) {
						for (var i = 0; i < swiper.slides.length; i++){
							swiper.setTransition(swiper.slides[i], swiper.params.speed);
						}
					},
					onTouchEnd: function(swiper) {

					},
					onSlideChangeEnd: function(swiper) {

					},
					onSwiperCreated: function(swiper) {
						var currentSlide = swiper.slides[swiper.activeIndex];
					}
				});
			});

		}
	}
});
