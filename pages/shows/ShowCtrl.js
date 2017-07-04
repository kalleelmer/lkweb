var module = angular.module("lkticket.admin");

var ShowCtrl = function($filter, $scope, $http, User, $routeParams, Core) {
	var ctrl = this;

	$scope.formatDate = function(date) {
		return date.replace(" ", "T");
	};

	$scope.id = $routeParams.id;

	$scope.addPerf = function(date) {
		var time = prompt("Ange klockslag (HH:mm)");
		if (!time) {
			return;
		}
		$scope.show.dates[date].push({
			start : date + " " + time
		});
	}

	$scope.addDate = function() {
		$scope.show.dates[$scope.newDate] = [];
		$scope.newDate = "";
	};

	Core.get("/admin/shows/" + $scope.id).then(function(response) {
		$scope.show = response.data;
		ctrl.loadShowData();
	}, function(response) {
		alert("Kunde inte hämta nöje: " + response.status);
	});

	ctrl.loadShowData = function() {
		Core.get("/admin/shows/" + $scope.id + "/performances").then(
			function(response) {
				var dates = {};
				for ( var i in response.data) { // Group by date
					var show = response.data[i];
					var key = show.start.substring(0, 10);
					dates[key] = dates[key] ? dates[key] : [];
					dates[key].push(show);
				}
				$scope.show.dates = dates;
			}, function(response) {
				alert("Kunde inte hämta föreställningar: " + response.status);
			});
		Core.get("/admin/shows/" + $scope.id + "/rates").then(
			function(response) {
				$scope.show.rates = response.data;
			}, function(response) {
				alert("Kunde inte hämta biljettyper: " + response.status);
			});
		Core.get("/admin/shows/" + $scope.id + "/categories").then(
			function(response) {
				$scope.show.categories = response.data;
			}, function(response) {
				alert("Kunde inte hämta platstyper: " + response.status);
			});
	}

	$scope.postCategory = function(category) {
		Core.post("/admin/shows/" + $scope.id + "/categories", category);
	};

	$scope.postRate = function(rate) {
		Core.post("/admin/shows/" + $scope.id + "/rates", rate);
	};

};

module.controller("ShowCtrl", ShowCtrl);
