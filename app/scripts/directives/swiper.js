'use strict';

angular.module('photoAppApp')
.directive('swiper', function ($rootScope) {
	var bufferOffset = 5;
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			var direction = '';
			scope.$on('all-images-loaded', function() {
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
					onSlideNext: function(swiper) {
						console.log((scope.photos.imgCount - swiper.activeIndex));
						if( (scope.photos.imgCount - swiper.activeIndex) <= bufferOffset ) {
							console.log('nu er det tid!')
							scope.photos.nextPage();
							// mySwiper.init(true, true);
							// mySwiper.calcSlides();
							// mySwiper.reInit();
							scope.$on('all-images-loaded', function() {
								setTimeout(function(){
									mySwiper.init(true, true);
									mySwiper.calcSlides();
								}, 100);
							});
						}
						//console.log(mySwiper)
						//scope.photos.nextPage();
					},
					onSwiperCreated: function(swiper) {
						var currentSlide = swiper.slides[swiper.activeIndex];
					}
				});
			});
		}
	}
});
