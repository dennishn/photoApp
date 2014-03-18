'use strict';

angular.module('photoAppApp')
  .controller('MainCtrl', function ($scope, Photos) {
	$scope.awesomeThings = [
	  'HTML5 Boilerplate',
	  'AngularJS',
	  'Karma'
	];
	$scope.photos = new Photos();
  });
