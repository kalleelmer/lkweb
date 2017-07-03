var module = angular.module("lkticket.admin");

module.filter('timestamp', function() {
	return function(input) {
		return input.replace(" ", "T");
	};
})