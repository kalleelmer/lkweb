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

}

module.controller("RateCtrl", RateCtrl);
