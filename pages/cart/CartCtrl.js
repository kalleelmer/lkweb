var module = angular.module("lkticket.admin");

var UserCtrl = function(Core, $scope, $routeParams) {
	Core.get("/admin/users/" + $routeParams.id).then(function(response) {
		$scope.user = response.data;
	}, function(response) {
		alert("Kunde inte hämta användaren: " + response.status);
	});
}

module.controller("UserCtrl", UserCtrl);
