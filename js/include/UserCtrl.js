var module = angular.module("lkticket.admin");

var UserCtrl = function($scope, User, $route, Core) {
	var ctrl = this;

	console.log("Loading UserCtrl");

	$scope.userStatus = function(status) {
		return Core.STATE == status;
	}

	$scope.loginURL = function() {
		return Core.LOGIN_URL;
	}

	$scope.user = function() {
		return Core.user;
	}
}

module.controller("UserCtrl", UserCtrl);