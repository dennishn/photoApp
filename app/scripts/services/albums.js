'use strict';

angular.module('photoAppApp')
	.factory('Albums', function ($http, $q, $timeout) {
		// access initiating controllers scope

		var albumList = [
			'207908409246643',
			'205534362817381',
			'204390959598388'
		];

		// Service logic
		var Albums = function() {
			this.items = [
			];
			this.busy = false;
			// this.paging = {};
		};

		Albums.prototype.buildAlbums = function() {
			if (this.busy) return;

			var deferred = $q.defer();
			var album;

			var _this = this;

			var _temp = [];

			var url = 'http://graph.facebook.com/';

			this.busy = true;

			angular.forEach(albumList, function(key, value) {
				// console.log(key);
				$http.get(url + key)
					.success(function(data) {
						//Sanitize
						album = data;

						_this.items.push({
							'name': album.name,
							'id': album.id,
							'created': album.created_time,
							'count': album.count,
							'image': ''
						});
					}.bind(this))
					.error(function(data, status) {
						deferred.reject('Failed ' + data + ' ' + status);
						this.busy = false;
					})
					.then(function(){
						$http.get(url + album.cover_photo)
							.success(function(data) {
								_this.items[value].image = data.images;
								deferred.resolve('All albums loaded');
							})
							.error(function(data, status) {
								deferred.reject('Failed ' + data + ' ' + status);
								this.busy = false;
							})
					});
			});

			return deferred.promise;
		}

		return Albums;
	});
