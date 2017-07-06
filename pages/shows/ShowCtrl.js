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
      start: date + " " + time
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
        for (var i in response.data) { // Group by date
          var show = response.data[i];
          var key = show.start.substring(0, 10);
          dates[key] = dates[key] ? dates[key] : [];
          dates[key].push(show);
        }
        $scope.show.dates = dates;
      },
      function(response) {
        alert("Kunde inte hämta föreställningar: " + response.status);
      });

    Core.get("/admin/shows/" + $scope.id + "/rates").then(
      function(response) {
        $scope.show.rates = response.data;

        Core.get("/admin/shows/" + $scope.id + "/categories").then(
          function(response) {
            $scope.show.categories = response.data;

            for (var i in $scope.show.categories) {
              var category = $scope.show.categories[i];
              getPrices(category);
            }

          },
          function(response) {
            alert("Kunde inte hämta platstyper: " + response.status);
          })

      },
      function(response) {
        alert("Kunde inte hämta biljettyper: " + response.status);
      });

  }

  var getPrices = function(category) {
    Core.get("/admin/shows/" + $scope.id + "/categories/" + category.id + "/prices").then(
      function(response) {
        category.prices = [];

        for (var i in response.data) {
          var price = response.data[i];
          category.prices[price.rate_id] = price;
        }

        console.log($scope.show);

      },
      function(response) {
        alert("Kunde inte hämta priserna: " + response.status);
      });
  }

  $scope.addCategory = function() {

		var name = prompt("Ange namn");
    if (!name) {
      return;
    }
		//TODO Lösa så att ett id skapas, annars går det inte att skapa nya priser

		var category = {
			name: name,
		};

		$scope.show.categories.push(category);
    Core.post("/admin/shows/" + $scope.id + "/categories", category);
  };

  $scope.addRate = function() {

		var name = prompt("Ange namn");
    if (!name) {
      return;
    }
		//TODO Lösa så att ett id skapas, annars går det inte att skapa nya priser

		var rate = {
			name: name,
		};

		$scope.show.rates.push(rate);

    Core.post("/admin/shows/" + $scope.id + "/rates", rate);
  };

  $scope.postPrice = function(price, rate_id, category_id) {

		//TODO Hantera så att det går att tabort ett pris korrekt

		var priceObject = {
      rate_id: rate_id,
      price: +price
    };

    Core.post("/admin/shows/" + $scope.id + "/categories/" + category_id + "/prices", priceObject);
  };

};

module.controller("ShowCtrl", ShowCtrl);
