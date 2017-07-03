var module = angular.module("lkticket.admin");

var catagories = [{name : "Barnplats", Prices: {barn: 30, fribiljett: 0}},
{anme : "Stol", prices: {student: 60, vuxen: 80, fribiljett: 0}},
{name : "Parkett", prices: {student: 60, vuxen: 80, fribiljett: 0}}];

var ShowCtrl = function($filter, $scope, $http, User, $routeParams, Core) {

	$scope.formatDate = function(date){
		return date.replace(" ", "T");
	}

	$scope.sortShows = function(shows) {
		this.sortedShows = {};

		for (var i in shows){

			var dateKey = $filter('date')($scope.formatDate(shows[i].start), "dd/MM/yyyy");

			if(!this.sortedShows[dateKey]){
				this.sortedShows[dateKey] = [];
			}
			this.sortedShows[dateKey].push(shows[i]);
		}
		console.log(this.sortedShows);
		$scope.performancesByDate = this.sortedShows;

	}

	$scope.id = $routeParams.id;

	Core.get("/admin/shows/" + $scope.id + "/performances").then(
		function(response) {

			$scope.sortShows(response.data);
		}, function(response) {
			alert("Ett problem uppstod");
		});





}

module.controller("ShowCtrl", ShowCtrl);
