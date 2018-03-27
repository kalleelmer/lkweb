var module = angular.module("lkticket.webb");

var ThankCtrl = function($routeParams, Cart) {

  Cart.reset();

}

module.controller("ThankCtrl", ThankCtrl);
