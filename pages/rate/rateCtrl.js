var module = angular.module("lkticket.webb");

var RateCtrl = function($filter, $scope, $http, User, $routeParams, Core, $sce, Cart, Notification, Analytics) {

  Core.get("/performances/" + $routeParams.id).then(function(response) {

    $scope.performance = response.data;

    console.log(response.data);

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

    Analytics.addProduct($scope.performance.id, $scope.performance.show.name, categoryId, "Karneval", rateId, $scope.getPrice(rateId, categoryId), "1", 'coupon', 'position', 'custom');
    Analytics.trackCart('add');

    if (Cart.getOrder() && Cart.getOrder().paid) {
      Notification.error("Du har redan betalt din kundvagn och kan därför inte lägga till biljetter");
      return;
    }

    var data = {
      category_id: categoryId,
      rate_id: rateId,
      performance_id: $routeParams.id,
      count: 1
    };

    console.log(categoryId);
    console.log($scope.performance.availability);

    $scope.performance.availability[categoryId].available-=1;

    Cart.addTicket(data);
  }

  $scope.getPrice = function(rateId, categoryId) {

    if ($scope.prices && $scope.prices[categoryId]) {

      for (var i = 0; i < $scope.prices[categoryId].length; i++) {
        if ($scope.prices[categoryId][i].rate_id == rateId) {
          var price = $scope.prices[categoryId][i].price;
          if (price > 0) {
            return (price + $scope.performance.surcharge);
          } else {
            return price;
          }
        }
      }

    } else {
      return "-";
    }

  }

}

module.controller("RateCtrl", RateCtrl);
