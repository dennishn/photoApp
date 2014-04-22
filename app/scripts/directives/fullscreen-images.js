angular.module('photoAppApp')
	.directive('fullscreenImages', function($timeout) {
		var photoSwiper;
		var buffer = 20;
		var progress;
		var cS,
			nS,
			pS;
		return {
			restrict: 'A',
			link: function($scope, el, attrs) {
				photoSwiper = el.swiper({
					progress:true,
					updateOnImagesReady: true,
					watchActiveIndex: true,
					visibilityFullFit: true,
					resizeReInit: true,
					onProgressChange: function(swiper){
						for (var i = 0; i < swiper.slides.length; i++){
					        var slide = swiper.slides[i];
					        var progress = slide.progress;
					        var scale, translate, opacity;

					        if (progress<=0) {
					        	opacity = 1 - Math.min(Math.abs(progress),1);
					        	scale = 1 - Math.min(Math.abs(progress/2),1);
					        	translate = progress*swiper.width;
					        }
					        else {
					        	opacity = 1 - Math.min(Math.abs(progress/2),1);
					        	scale=1;
					        	translate=0;
					        }
					        slide.style.opacity = opacity;
					        swiper.setTransform(slide,'translate3d(' + -Math.abs(progress*500) +'px,0,'+(-Math.abs(progress*1000))+'px)');
				        }
					},
					onTouchStart:function(swiper){
						for (var i = 0; i < swiper.slides.length; i++){
				        	swiper.setTransition(swiper.slides[i], 0);
				        }
					},
					onSetWrapperTransition: function(swiper, speed) {
						for (var i = 0; i < swiper.slides.length; i++){
				        	swiper.setTransition(swiper.slides[i], speed);
				        }
					},
					onSlideNext: function(swiper) {
						if(photoSwiper.activeIndex === photoSwiper.slides.length-buffer && $scope.photos.paging.next) {
							$scope.photos.nextPage();
						}
						el.data('swiper').reInit();
					},
					onSlideChangeStart: function(swiper, direction) {
						var length = 100/photoSwiper.slides.length;
						angular.element('.swiper-pagination-progress').css({
							width: (photoSwiper.activeIndex+1) * length + '%'
						});

					},
					onInit: function(swiper) {
						var length = 100/photoSwiper.slides.length;
						angular.element('.swiper-pagination-progress').css({
							width: (photoSwiper.activeIndex+1) * length + '%'
						})
					}
				});
				// for (var i = 0; i < photoSwiper.slides.length; i++){
				// 	photoSwiper.slides[i].style.zIndex = photoSwiper.slides.length - i;
				// }
				$scope.photoInit = function(){
					$timeout(function() {
						photoSwiper.reInit();
						angular.element('.swiper-slide').addClass('initialized');
					}, 0);
				}
			}
		}
	});
