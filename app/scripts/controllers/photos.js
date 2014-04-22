'use strict';

angular.module('photoAppApp')
	.filter('getPhotoById', function() {
		return function(input, id) {
			var i=0, len=input.length;
			for (; i<len; i++) {
				if (+input[i].id == +id) {
					return input[i];
				}
			}
			return null;
		}
	})
	.controller('PhotoCtrl', function ($scope, $rootScope, $filter, $location, $http, $stateParams, Photos) {
		$scope.awesomeThings = [
		  'HTML5 Boilerplate',
		  'AngularJS',
		  'Karma'
		];

		var cuthCrewId = '196399840397500';

		$scope.likePhoto = function(id) {
			var url = 'https://graph.facebook.com/';
			var photo = $filter('getPhotoById')($scope.photos.items, id);
			if($rootScope.user) {
				console.log(photo)
				if (!photo.userLikes) {
					$http.post(url + id + '/likes?access_token=' + $rootScope.user.accessToken)
						.success(function(data) {
							photo.likeCount = photo.likeCount+1;
							photo.userLikes = true;
						})
						.error(function(data, status) {
						}).then(function(){
						});
				} else {
					$http.delete(url + id + '/likes?access_token=' + $rootScope.user.accessToken)
						.success(function(data) {
							photo.likeCount = photo.likeCount-1;
							photo.userLikes = false;
						})
						.error(function(data, status) {
						}).then(function(){
						});
				}
			} else {
				return;
			}
		}

		$scope.photos = new Photos();

		var promise = $scope.photos.firstPage($stateParams.id);
		promise
			.then(function(message){
				$scope.photoInit();
			}, function(error) {
			}, function(progress) {
			});

		$rootScope.$on('userLogin', function(event, user) {

			angular.forEach($scope.photos.items, function(key, value) {
				var params = 'SELECT user_id FROM like WHERE object_id=' + key.id;
				var url = 'http://graph.facebook.com/fql?q=' + encodeURIComponent(params);
				$http.get(url)
					.success(function(data){
						$scope.photos.items[value].userLikes = data.data.length != 0;
					});
			});
		});

	});
