var module = angular.module("lkticket.webb");

var CartCtrl = function(Core, $scope, $routeParams, Cart, Analytics) {

  $scope.getTickets = function() {
    return Cart.getTickets();
  }
  
  var setWorking = function() {
	  $scope.working = true;
  }
  
  var setDone = function() {
	  $scope.working = false;
  }

  $scope.removeTicket = function(ticket) {
	setWorking();
    var req = Cart.removeTicket(ticket.id);
    Analytics.addProduct(ticket.performance_id, ticket.show_name, ticket.category_id, "Karneval", ticket.rate_id, ticket.price, "1", 'coupon', 'position', 'custom');
    Analytics.trackCart('remove');
    req.then(setDone, setDone);
  }

  $scope.addTicket = function(ticket) {
    var data = {
      category_id: ticket.category_id,
      rate_id: ticket.rate_id,
      performance_id: ticket.performance_id,
      count: 1
    };
    Cart.addTicket(data);
    Analytics.addProduct(ticket.performance.id, ticket.show_name, ticket.category_id, "Karneval", ticket.rate_id, ticket.price, "1", 'coupon', 'position', 'custom');
    Analytics.trackCart('add');
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
