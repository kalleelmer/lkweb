var module = angular.module("lkticket.webb");

var CartCtrl = function(Core, $scope, $routeParams, Cart) {
  $scope.getTickets = function() {
    console.log(Cart.getTickets());
    return Cart.getTickets();
  }

  $scope.removeTicket = function(id) {

    //// TODO: Implementera att ta bort biljetter
    console.log(id);
  }

}

module.controller("CartCtrl", CartCtrl);
