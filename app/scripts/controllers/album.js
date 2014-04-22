'use strict';

angular.module('photoAppApp')
  .controller('AlbumCtrl', function ($scope, $location, $stateParams, Photos) {
	$scope.awesomeThings = [
	  'HTML5 Boilerplate',
	  'AngularJS',
	  'Karma'
	];

	$scope.photos = new Photos();

	$scope.albumId = $stateParams.id;

	var promise = $scope.photos.firstPage($scope.albumId);
	promise
		.then(function(message){
			console.log(message);
		}, function(error) {
			console.log(error);
		}, function(progress) {
			console.log(progress);
		});
	console.log($scope.photos);

	// $scope.$on('masonry.brick.created', function() {
	// 	console.log('test')
	// })

  });
