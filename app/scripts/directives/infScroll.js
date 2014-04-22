angular.module('photoAppApp')
	.directive('infScroll', function($window) {
		return {
			link : function(scope, element, attrs) {
				var offset = parseInt(attrs.threshold) || 0;
				var e = jQuery(element[0]);
				var doc = jQuery(document);
				angular.element(document).bind('scroll', function() {
					if (doc.scrollTop() + $window.innerHeight + offset > e.offset().top) {
						scope.$apply(attrs.infScroll);
					}
				});
			}
		};
	});
