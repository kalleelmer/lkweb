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

		if (Cart.timeLeft() != undefined) {
			var minutes = Math.floor(Cart.timeLeft()/60);
			var seconds = Math.floor(Cart.timeLeft()%60);
			return (minutes + ":" + seconds);
		} else {
			return false;
		}
	}

}

module.controller("MainCtrl", MainCtrl);
