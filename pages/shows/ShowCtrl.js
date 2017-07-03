var module = angular.module("lkticket.admin");

var ShowCtrl = function($scope, $http, User, $routeParams, Core) {

	$scope.id = $routeParams.id;
	Core.get("/admin/shows/" + $scope.id + "/performances").then(
		function(response) {
			$scope.performances = response.data;
		}, function(response) {
			alert("Ett problem uppstod");
		});


		$scope.formatDate = function(date){
			return date.replace(" ", "T");
		}

}

module.controller("ShowCtrl", ShowCtrl);
