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

	$routeProvider.when("/performance/:id",{
		templateUrl : "/pages/rate/rate.html",
		controller : "RateCtrl"
	});

	$routeProvider.when("/thanks",{
		templateUrl : "/pages/thank/thank.html",
		controller : "ThankCtrl"
	});

} ]);
