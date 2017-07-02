var module = angular.module("lkticket.admin");

module.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
} ]);

module.config([ "$routeProvider", function($routeProvider) {
	console.log("Route: " + $routeProvider);
	$routeProvider.when("/", {
		templateUrl : "/pages/start/start.html",
		pagetype : "start"
	});
	$routeProvider.when("/shows", {
		templateUrl : "/pages/shows/shows.html",
		controller : "ShowsCtrl",
		pagetype : "item-list"
	});
	$routeProvider.when("/packages/:id", {
		templateUrl : "/pages/shows/show.html",
		controller : "ShowCtrl",
		pagetype : "item"
	});
	$routeProvider.when("/karnevalister", {
		templateUrl : "/pages/karnevalister/karnevalister.html",
		controller : "KarnevalisterCtrl",
		pagetype : "item-list"
	});
	$routeProvider.otherwise({
		redirectTo : "/"
	});
} ]);
