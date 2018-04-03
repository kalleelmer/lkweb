var module = angular.module("lkticket.webb");

var ShowCtrl = function($scope, $routeParams, $http, User, Core) {
	var ctrl = this;

	Core.get("/shows/" + $routeParams.id).then(function(response) {
		$scope.show = response.data;
		$scope.show.dates = [];
		ctrl.reloadPerformances();
	}, function(error) {
		console.log(error);
	});

	ctrl.reloadPerformances = function() {
		Core.get("/shows/" + $routeParams.id + "/performances").then(
			function(response) {
				var dates = {};
				if (response.data.length > 0) {
					for ( var i in response.data) { // Group by date
						var perf = response.data[i];
						ctrl.loadAvilivility(perf);
						var key = new Date(perf.start).toISOString().substring(
							0, 10);

						dates[key] = dates[key] ? dates[key] : [];
						dates[key].push(perf);
					}
					$scope.show.dates = dates;
					console.log(dates);
				}
			}, function(response) {
				alert("Kunde inte hämta föreställningar: " + response.status);
			});
	}

	ctrl.loadAvilivility = function(perf) {
			console.log(perf);
			Core.get("/performances/" + perf.id).then(function(response) {
				var available = 0;
				console.log(response.data);
				for (var key in response.data.availability) {
					available+= response.data.availability[key].available;
				}

				perf.available = available;
			}, function(error) {
				console.log(error);
			});
	}

}

module.controller("ShowCtrl", ShowCtrl);
