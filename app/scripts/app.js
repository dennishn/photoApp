'use strict';

angular.module('photoAppApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngAnimate',
	'firebase',
	'ui.router',
	'infinite-scroll',
	'wu.masonry',
	'angularMoment'
	])
	.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, amMoment) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'views/overview.html',
				controller: 'MainCtrl'
			})
			.state('album', {
				url: '/album/:id',
				templateUrl: 'views/album.html',
				controller: 'AlbumCtrl',
				data: {
					'id': ':id'
				}
			})
			.state('photos', {
				url: '/photos/:id',
				templateUrl: 'views/photos.html',
				controller: 'PhotoCtrl',
				data: {
					'id': ':id'
				}
			})
	}]);

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250)

angular.module('photoAppApp').run(function(amMoment) {
	amMoment.changeLanguage('da');
});
