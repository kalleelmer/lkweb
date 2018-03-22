var module = angular.module("lkticket.webb");

var MainCtrl = function($scope, User, $route, Core, Cart) {
	var ctrl = this;

	Core.get("/shows").then(function(response) {
		$scope.shows = response.data;
	}, function(error) {
		console.log(error);
	});

	$scope.getTotalPrice = function() {
		return Cart.getPrice();
	}

}

module.controller("MainCtrl", MainCtrl);
