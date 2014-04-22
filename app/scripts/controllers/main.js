'use strict';

angular.module('photoAppApp')
	.filter('orderObjectBy', function() {
		return function(items, field, reverse) {
			var filtered = [];
			angular.forEach(items, function(item) {
			  filtered.push(item);
			});
			filtered.sort(function (a, b) {
		  		return (a[field] > b[field]);
			});
			if(reverse) filtered.reverse();
			return filtered;
		};
	})
	.controller('MainCtrl', function ($scope, $location, Albums) {
		$scope.awesomeThings = [
		  'HTML5 Boilerplate',
		  'AngularJS',
		  'Karma'
		];
		$scope.sortBy = 'date';
		$scope.sortReverse = true;

		$scope.reverseOrder = function() {
			$scope.sortReverse = !$scope.sortReverse;
		}
		$scope.orderBy = function(type) {
			$scope.sortBy = type;
		}

		$scope.albums = new Albums();


		var promise = $scope.albums.buildAlbums();
		promise
			.then(function(message){
				console.log($scope.albums.items)
			}, function(error) {
			}, function(progress) {
			});

  });
