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

	$scope.getTimeLeft = function() {
		var minutes = Math.floor(Cart.timeLeft()/60);
		var seconds = Math.floor(Cart.timeLeft()%60);
		return (minutes + ":" + seconds);
	}

}

module.controller("MainCtrl", MainCtrl);
