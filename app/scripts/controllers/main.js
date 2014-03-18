'use strict';

angular.module('photoAppApp')
  .controller('MainCtrl', function ($scope, $location, Photos) {
	$scope.awesomeThings = [
	  'HTML5 Boilerplate',
	  'AngularJS',
	  'Karma'
	];
	$scope.photos = new Photos();

	$scope.openSwiper = function() {
		$location.path('/swiper');
	}
  });
