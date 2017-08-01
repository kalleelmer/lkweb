var module = angular.module("lkticket.admin");

module.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
} ]);

module.config([ "$routeProvider", function($routeProvider) {
	console.log("Route: " + $routeProvider);
	$routeProvider.when("/", {
		templateUrl : "/pages/start/start.html",
		controller: "StartCtrl"
	});
	$routeProvider.when("/show/:id", {
		templateUrl : "/pages/show/show.html",
		controller : "ShowsCtrl"
	});
	$routeProvider.when("/cart/", {
		templateUrl : "/pages/cart/cart.html",
		controller : "CartCtrl"
	});
} ]);
