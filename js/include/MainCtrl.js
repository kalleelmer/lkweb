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

	$scope.getNumberOfTickets = function() {
		return Cart.getTickets().length;
	}

	$scope.getCartId = function() {
		if (Cart.getOrder()) {
				return Cart.getOrder().id;
		} else {
			return null;
		}
	}

	$scope.getCartIdentifier = function() {
		if (Cart.getOrder()) {
				return Cart.getOrder().identifier;
		} else {
			return null;
		}
	}

	$scope.getPaymentStatus = function() {
		if (Cart.getOrder()) {
			return Cart.getOrder().paid;
		} else {
			return false;
		}
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
