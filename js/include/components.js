var module = angular.module("lkticket.webb");

module.component("cart", {
	templateUrl : '/components/cart.html?v=BUILD_NUMBER',
	bindings : {},
	controller : "CartComponentCtrl"
});
