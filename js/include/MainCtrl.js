var module = angular.module("lkticket.webb");

var MainCtrl = function($scope, User, $route, Core) {
	var ctrl = this;

	Core.get("/shows").then(function(response) {
		$scope.shows = response.data;
	}, function(error) {
		console.log(error);
	});

}

module.controller("MainCtrl", MainCtrl);
