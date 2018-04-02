var module = angular.module("lkticket.webb");

var CartCtrl = function(Core, $scope, $routeParams, Cart) {
  $scope.getTickets = function() {
    return Cart.getTickets();
  }

  $scope.removeTicket = function(id) {
    Cart.removeTicket(id);
  }

  $scope.getTotalPrice = function() {
    return Cart.getPrice();
  }

  $scope.pay = function() {
    Cart.pay();
  }

  $scope.getPaymentStatus = function() {
    if (Cart.getOrder()) {
      return Cart.getOrder().paid;
    } else {
      return false;
    }
  }

  Cart.setOrder($routeParams.id, $routeParams.identifier);

  console.log($routeParams.test);

}

module.controller("CartCtrl", CartCtrl);
