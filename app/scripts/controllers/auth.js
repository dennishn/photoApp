'use strict';

angular.module('photoAppApp')
  .controller('AuthCtrl', function ($scope, $rootScope, $location, $stateParams, Auth) {

  	$scope.safeApply = function(fn) {
	  var phase = this.$root.$$phase;
	  if(phase == '$apply' || phase == '$digest') {
	    if(fn && (typeof(fn) === 'function')) {
	      fn();
	    }
	  } else {
	    this.$apply(fn);
	  }
	};

	if(!$rootScope.user) {
		Auth.login($scope.user).then(function (authUser) {
      		$scope.safeApply(function(){
        		$scope.user = authUser;
        		$rootScope.user = authUser;
        		$rootScope.$emit('userLogin', $rootScope.user);
      		});
      	});
	}

  	$scope.login = function () {
      	Auth.login($scope.user).then(function (authUser) {
      		$scope.safeApply(function(){
        		$scope.user = authUser;
        		$rootScope.user = authUser;
      		});
      	});
    };
    $scope.logout = function() {
    	Auth.logout();
    	$scope.safeApply(function(){
    		$scope.user = '';
    		$rootScope.user = '';
    	})
    };
    $scope.isLoggedIn = function() {
    	return !!$scope.user;
    }

  });
