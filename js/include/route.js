var module = angular.module("lkticket.webb");

module.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
} ]);

module.config([ "$routeProvider", function($routeProvider) {
	console.log("Route: " + $routeProvider);
	$routeProvider.when("/show/:id", {
		templateUrl : "/pages/show/show.html?v=BUILD_NUMBER",
		controller : "ShowCtrl"
	});
	$routeProvider.when("/cart/:id/:identifier", {
		templateUrl : "/pages/cart/cart.html?v=BUILD_NUMBER",
		controller : "CartCtrl"
	});

	$routeProvider.when("/performance/:id",{
		templateUrl : "/pages/rate/rate.html?v=BUILD_NUMBER",
		controller : "RateCtrl"
	});

	$routeProvider.when("/thanks",{
		templateUrl : "/pages/thank/thank.html?v=BUILD_NUMBER",
		controller : "ThankCtrl"
	});

	$routeProvider.when("/denied",{
		templateUrl : "/pages/denied/denied.html?v=BUILD_NUMBER",
		controller : "DeniedCtrl"
	});

	$routeProvider.when("/",{
		templateUrl : "/pages/start/start.html?v=BUILD_NUMBER",
		controller : "StartCtrl"
	});

	$routeProvider.when("/contact",{
		templateUrl : "/pages/contact/contact.html?v=BUILD_NUMBER",
		controller : "ContactCtrl"
	});

} ]);
