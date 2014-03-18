'use strict';

angular.module('photoAppApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngAnimate',
	'ui.router',
	'infinite-scroll',
	'mm.foundation',
	'lazyload'
	])
	.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		// $routeProvider
		// .when('/', {
		// 	templateUrl: 'views/main.html',
		// 	controller: 'MainCtrl'
		// })
		// .when('/swiper', {
		// 	templateUrl: 'views/swiper.html',
		// 	controller: 'MainCtrl'
		// })
		// .otherwise({
		// 	redirectTo: '/'
		// });
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.state('swiper', {
				url: '/swiper',
				templateUrl: 'views/swiper.html',
				controller: 'MainCtrl'
			});
	}]);
