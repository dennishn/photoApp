'use strict';

angular.module('photoAppApp')
  .factory('Photos', function ($http) {
	// Service logic
	var Photos = function() {
		this.items 	= [];
		this.busy	= false;
		this.page 	= 1;
	}

	Photos.prototype.nextPage = function() {

		if(this.busy) return;
		this.busy = true;

		var apiKey = '906c5dc3c81058f4bb34ad1d49489e52';
		var extras = 'url_l';
		var per_page = '10';
		var url = 'http://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=' + apiKey + '&extras=' + extras + '&per_page=' + per_page + '&page=' + this.page + '&format=json&nojsoncallback=1'

		$http({method: 'GET', url: url})
			.success(function(data, config) {
				var items = data.photos.photo;
				for (var i = 0; i < items.length; i++) {
					this.items.push(items[i]);
				}
				this.page++;
				this.busy = false;
			}.bind(this))
			.error(function(data, status, headers, config) {
				console.log('Error: ', status, ' ', data);
				this.busy = false;
			});
	};

	// Public API here
	return Photos;
  });
