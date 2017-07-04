var module = angular.module("lkticket.admin");

var UsersCtrl = function(Core, $scope) {
	Core.get("/admin/users").then(function(response) {
		$scope.users = response.data;
	}, function(response) {
		alert("Kunde inte hämta användare: " + response.status);
	});
}

module.controller("UsersCtrl", UsersCtrl);
