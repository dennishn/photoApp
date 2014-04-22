'use strict';

angular.module('photoAppApp')
	.factory('Auth', function ($firebaseSimpleLogin, $rootScope, $q) {

		var ref = new Firebase('https://cuth.firebaseio.com');

		// var deferred = $q.defer();

		var auth = $firebaseSimpleLogin(ref);

		var Auth = {
			login: function(user) {
				return auth.$login('facebook', {
					rememberMe: true,
					scope: 'publish_actions'
				}, user);
			},
			logout: function() {
				auth.$logout();
			},
			loggedIn: function() {
				return auth.user !== null;
			}
		};

		$rootScope.loggedIn = function() {
			return Auth.loggedIn();
		}

		return Auth;
	});
