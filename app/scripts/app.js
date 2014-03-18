'use strict';

angular.module('photoAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'infinite-scroll',
  'mm.foundation',
  'lazyload'
])
  .config(function ($routeProvider) {
	$routeProvider
	  .when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	  })
	  .otherwise({
		redirectTo: '/'
	  });
  });
