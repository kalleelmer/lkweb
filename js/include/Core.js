var module = angular.module("lkticket.webb");

function findGetParameter(parameterName) {
	var result = null;
	var tmp = [];
	location.search.substr(1).split("&").forEach(function(item) {
		tmp = item.split("=");
		console.log(tmp);
		if (tmp[0] === parameterName) {
			result = decodeURIComponent(tmp[1]);
		}
	});
	return result;
}

var CoreFactory = function($http, $timeout, ENV) {
	var Core = {};

	Core.initialize = function() {

	}

	Core.get = function(url) {
		return Core.request("GET", url, null);
	}

	Core.post = function(url, data) {
		return Core.request("POST", url, data);
	}

	Core.put = function(url, data) {
		return Core.request("PUT", url, data);
	}

	Core.delete = function(url) {
		return Core.request("DELETE", url, null);
	}

	Core.request = function(method, url, data) {
		var req = {
			method : method,
			url : ENV.CORE.BASE_URL + url,
			data : data
		};

		console.log("Making request to " + req.url);
		return $http(req);
	}

	return Core;
}
console.log("Registering CoreAPI");
module.factory("Core", CoreFactory);
