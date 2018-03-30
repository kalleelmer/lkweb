var module = angular.module("lkticket.webb");

var RateCtrl = function($filter, $scope, $http, User, $routeParams, Core, $sce, Cart) {

  Core.get("/performances/" + $routeParams.id).then(function(response) {

    $scope.performance = response.data;

    Core.get("/shows/" + $scope.performance.show.id + "/rates").then(function(response) {
      $scope.rates = response.data;
    }, function(error) {
      console.log(error);
    });

    Core.get("/shows/" + $scope.performance.show.id + "/categories").then(function(response) {
      $scope.categories = response.data;

      for (var i = 0; i < $scope.categories.length; i++) {
        Core.get("/categories/" + $scope.categories[i].id + "/prices").then(function(response) {

          var prices = response.data;

          if (!$scope.prices) {
            $scope.prices = {};
          }

          $scope.prices[prices[0].category_id] = prices;

        }, function(error) {
          console.log(error);
        });
      }

    }, function(error) {
      console.log(error);
    });

  }, function(error) {
    console.log(error);
  });

  //Lägg till biljetten i kundvagnen
  $scope.addTicket = function(rateId, categoryId) {

    var data = {
      category_id: categoryId,
      rate_id: rateId,
      performance_id: $routeParams.id,
      count: 1
    };

    Cart.addTicket(data);
  }

  $scope.getPrice = function(rateId, categoryId) {

    if ($scope.prices && $scope.prices[categoryId]) {

      for (var i = 0; i < $scope.prices[categoryId].length; i++) {
        if ($scope.prices[categoryId][i].rate_id == rateId) {
          return $scope.prices[categoryId][i].price;
        }
      }

    } else {
      return "-";
    }

  }

}

module.controller("RateCtrl", RateCtrl);
