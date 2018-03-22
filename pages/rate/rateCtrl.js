var module = angular.module("lkticket.webb");

var RateCtrl = function($filter, $scope, $http, User, $routeParams, Core, $sce) {

  Core.get("/shows/" + $routeParams.id + "/rates").then(function(response) {
    $scope.rates = response.data;
  }, function(error) {
    console.log(error);
  });

  Core.get("/shows/" + $routeParams.id + "/categories").then(function(response){
    $scope.categories = response.data;
  }, function(error){
    console.log(error);
  });

//Lägg till biljetten i kundvagnen
  function addTicket(rateId, cateogryId){
    var data = {category_id : categoryID, rate_id : rateID,
      performance_id : $routeParams.performance.id}
    Cart.addTicket(data);
  }

}

module.controller("RateCtrl", RateCtrl);
