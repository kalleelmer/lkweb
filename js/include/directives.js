var module = angular.module("lkticket.webb");

module.directive("loadingScreen", function() {
	return {
		restrict : "E",
		scope : {
			value : "@"
		},
		templateUrl : "/templates/loading-screen.html"
	};
});