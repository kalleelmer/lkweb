var module = angular.module("lkticket.webb");

var CartCtrl = function(Core, $scope, $routeParams, Cart) {

  $scope.getTickets = function() {
    return Cart.getTickets();
  }

  $scope.removeTicket = function(id) {
    Cart.removeTicket(id);
  }

  $scope.addTicket = function(ticket) {
    var data = {
      category_id: ticket.category_id,
      rate_id: ticket.rate_id,
      performance_id: ticket.performance_id,
      count: 1
    };
    Cart.addTicket(data);
  }

  $scope.getTotalPrice = function() {
    return Cart.getPrice();
  }

  $scope.pay = function() {
    Cart.pay($scope.customer);
  }

  $scope.getPaymentStatus = function() {
    if (Cart.getOrder()) {
      return Cart.getOrder().paid;
    } else {
      return false;
    }
  }

  $scope.getOrder = function() {
    return Cart.getOrder();
  }

  Cart.loadOrder($routeParams.id, $routeParams.identifier);

}

module.controller("CartCtrl", CartCtrl);
