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
			var dateKey = shows[i].start.split(" ")[0];

			if(!this.sortedShows[dateKey]){
				this.sortedShows[dateKey] = [];
			}
			this.sortedShows[dateKey].push(shows[i]);
		}
		$scope.performancesByDate = this.sortedShows;

	}

	$scope.id = $routeParams.id;

	$scope.addNewPerformance = function(performance, date) {

		console.log($scope.performancesByDate);
		$scope.performancesByDate[date].push({start: date + " " + performance.time});

		performance.time = "";
		
		//TODO Koppla mot databasen

	}

	Core.get("/admin/shows/" + $scope.id + "/performances").then(
		function(response) {
			$scope.sortShows(response.data);
		}, function(response) {
			alert("Ett problem uppstod");
		});

}

module.controller("ShowCtrl", ShowCtrl);
