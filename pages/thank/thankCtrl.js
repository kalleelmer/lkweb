var module = angular.module("lkticket.webb");

var ThankCtrl = function($routeParams, Cart, $scope) {

  $scope.order = function() {
    return Cart.getOrder();
  }

}

module.controller("ThankCtrl", ThankCtrl);
