var module = angular.module("lkticket.webb");

module.filter('timestamp', function() {
	return function(input) {
		return input.replace(" ", "T");
	};
})