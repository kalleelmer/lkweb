var module = angular.module("lkticket.admin");

var ShowCtrl = function($filter, $scope, $http, User, $routeParams, Core) {

	$scope.formatDate = function(date){
		return date.replace(" ", "T");
	};

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
	};

	$scope.id = $routeParams.id;

	$scope.addNewPerformance = function(performance, date) {

		console.log($scope.performancesByDate);
		$scope.performancesByDate[date].push({start: date + " " + performance.time});

		performance.time = "";

		//TODO Koppla mot databasen

	};

	$scope.addNewDate = function(newDate) {
		$scope.performancesByDate[newDate] = [];
		newDate = "";
	};


	Core.get("/admin/shows/" + $scope.id + "/performances").then(
		function(response) {
			$scope.sortShows(response.data);
		}, function(response) {
			alert("Ett problem uppstod");
		}
	);

		//Hämta hem samt generera pristabell

		Core.get("/admin/shows/" + $scope.id+ "/rates").then(
			function(response) {
				$scope.rates = response.data;
			}, function(response) {
				alert("Ett problem uppstod");
			}
		);

		Core.get("/admin/shows/" + $scope.id+ "/categories").then(
			function(response) {
				$scope.categories = response.data;
			}, function(response) {
				alert("Ett problem uppstod");
			}
		);

		/*Core.get("/admin/shows/" + $scope.id+ "/rates").then(
			function(response) {
				console.log(response.data);
			}, function(response) {
				alert("Ett problem uppstod");
			}
		);*/

		$scope.postCategory = function(category) {
			Core.post("/admin/shows/" + $scope.id + "/categories", category);
		};

		$scope.postRate = function(rate){
			Core.post("/admin/shows/" + $scope.id + "/rates", rate);
		};

};

module.controller("ShowCtrl", ShowCtrl);
