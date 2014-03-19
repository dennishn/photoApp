/*global angular*/

(function() {
	'use strict';

	angular.module('lazyload', []).
	directive('lazySrc', ['$document', '$parse', '$rootScope', function($document, $parse) {

		var count = 0;

		return {
			restrict: 'A',
			link: function(scope, iElement, iAttrs) {

				function setLoading(elm) {
					if (loader) {
						elm.html('');
						elm.parent().append(loader);
					}
				}
				var loader = null;

				if (angular.isDefined(iAttrs.lazyLoader)) {
					loader = angular.element($document[0].querySelector(iAttrs.lazyLoader)).clone();
				}

				var imgSrc = $parse(iAttrs.lazySrc);

				scope.$watch(imgSrc, function(newValue) {

					setLoading(iElement);

					var src = imgSrc(scope);

					var img = $document[0].createElement('img');

					img.onload = function() {
						if (loader) {
							loader.remove();
						}
						if (angular.isDefined(iAttrs.lazyLoadingClass)) {
							iElement.removeClass(iAttrs.lazyLoadingClass);
						}
						if (angular.isDefined(iAttrs.lazyLoadedClass)) {
							iElement.addClass(iAttrs.lazyLoadedClass);
						}
						iElement.attr({
							'src': this.src,
							'width': img.width,
							'height': img.height
						});
						count++;
						if(scope.photos.imgCount === count) {
							scope.$emit('all-images-loaded');
						}
					};

					img.onerror= function() {
						//console.log('error');
					};

					img.src = src;

					img.remove();


				});
			}
		};
	}])
	.directive('repeatDone', function($rootScope) {
		return function(scope, element, attrs) {
			if (scope.$last){
				scope.$emit('last-repeat');
			}
		};
	})
	.directive('allImagesLoaded', function($rootScope) {
		return function(scope, element, attrs) {
			console.log('someVal', count);
		};
	});
})();
