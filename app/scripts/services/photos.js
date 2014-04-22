'use strict';

angular.module('photoAppApp')
	.factory('Photos', function ($rootScope, $http, $q, $timeout) {
		// access initiating controllers scope

		// Service logic
		var Photos = function() {
			this.items = [
			];
			this.busy = false;
			this.paging = {};
		};

		Photos.prototype.firstPage = function(id) {
			if (this.busy) return;

			var deferred = $q.defer();

			var url = 'http://graph.facebook.com/'+id+'/photos';

			this.busy = true;

			var _this = this;

			$http.get(url)
				.success(function(data) {
					//Sanitize
					var photos = data.data;
					//Build Photo objects
					for (var i = 0; i < photos.length; i++) {
						this.items.push({
							'name': 		(photos[i].name === undefined) ? '' : photos[i].name,
							'thumbnail': 	photos[i].images[1],
							'image': 		photos[i].images[0],
							'imageH': 		photos[i].height,
							'imageW': 		photos[i].width,
							'id': 			photos[i].id,
							'likeCount':  	(photos[i].likes === undefined) ? 0 : photos[i].likes.data.length
						});
						deferred.notify('Loaded image ' + i + 'of total ' + photos.length);
					}

					//Update pagination
					this.paging.next = data.paging.next;

					deferred.resolve('All images loaded');
					this.busy = false;

				}.bind(this))
				.error(function(data, status) {

					deferred.reject('Failed ' + data + ' ' + status);
					this.busy = false;

				});



			return deferred.promise;
		}

		Photos.prototype.nextPage = function() {
			if (this.busy || this.paging.next === '') return;

			var deferred = $q.defer();

			var url = this.paging.next;

			this.busy = true;

			var _this = this;

			$http.get(url)
				.success(function(data) {
					//Sanitize
					var photos = data.data;

					//Build Photo objects
					for (var i = 0; i < photos.length; i++) {
						this.items.push({
							'name': 		(photos[i].name === undefined) ? '' : photos[i].name,
							'thumbnail': 	photos[i].images[1],
							'image': 		photos[i].images[0],
							'imageH': 		photos[i].height,
							'imageW': 		photos[i].width,
							'id': 			photos[i].id,
							'likeCount':  	(photos[i].likes === undefined) ? 0 : photos[i].likes.data.length
						});
						deferred.notify('Loaded image ' + i + 'of total ' + photos.length);
					}
					//Update pagination
					this.paging.next = (data.paging.next === undefined) ? '' : data.paging.next;

					deferred.resolve('All images loaded');
					this.busy = false;

				}.bind(this))
				.error(function(data, status) {

					deferred.reject('Failed ' + data + ' ' + status);
					this.busy = false;

				});

			if($rootScope.user) {
				angular.forEach(_this.items, function(key, value) {
					var params = 'SELECT user_id FROM like WHERE object_id=' + key.id;
					var url = 'http://graph.facebook.com/fql?q=' + encodeURIComponent(params);
					$http.get(url)
						.success(function(data){
							_this.items[value].userLikes = data.data.length != 0;
						}.bind(_this));
				});
			}

			return deferred.promise;
		};
		return Photos;
	});
