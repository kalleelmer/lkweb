var module = angular.module("lkticket.webb");

module.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
} ]);

module.config([ "$routeProvider", function($routeProvider) {
	console.log("Route: " + $routeProvider);
	$routeProvider.when("/show/:id", {
		templateUrl : "/pages/show/show.html",
		controller : "ShowCtrl"
	});
	$routeProvider.when("/cart/", {
		templateUrl : "/pages/cart/cart.html",
		controller : "CartCtrl"
	});
} ]);
