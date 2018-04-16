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
				$scope.performances = response.data;
				for ( var i in response.data) { // Group by date
					var perf = response.data[i];
					if (perf.title) {
						perf.date = null;
					} else {
						perf.date = new Date(perf.start).toISOString()
							.substring(0, 10);
					}
					ctrl.loadAvailability(perf);
				}
			}, function(response) {
				alert("Kunde inte hämta föreställningar: " + response.status);
			});
	}

	ctrl.loadAvailability = function(perf) {
		console.log(perf);
		Core.get("/performances/" + perf.id).then(function(response) {
			var available = 0;
			console.log(response.data);
			for ( var key in response.data.availability) {
				available += response.data.availability[key].available;
			}

			perf.available = available;
		}, function(error) {
			console.log(error);
		});
	}

}

module.controller("ShowCtrl", ShowCtrl);
