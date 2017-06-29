var module = angular.module("lkticket.admin");

function findGetParameter(parameterName) {
	var result = null;
	var tmp = [];
	location.search.substr(1).split("&").forEach(function(item) {
		tmp = item.split("=");
		if (tmp[0] === parameterName) {
			result = decodeURIComponent(tmp[1]);
		}
	});
	return result;
}

var CoreFactory = function($http) {
	var Core = {};
	Core.BASE_URL = "http://127.0.0.1:8080";
	Core.LOGIN_URL = null;
	Core.STATE = "WORKING";
	Core.LOGIN_REDIRECT = location.protocol + "//" + location.host
			+ location.pathname;
	Core.user = null;
	Core.token = null;

	Core.initialize = function() {
		var state = findGetParameter("state");
		if (state.substring(0, 6) == "google") {
			console.log("Detected Google login");
			var code = findGetParameter("code");
			console.log("Code: " + code);
			if (!code) {
				console.log("Invalid code");
			}
			$http.get(
					Core.BASE_URL + "/login/google/token?code=" + code
							+ "&redirect=" + Core.LOGIN_REDIRECT).then(
					function(response) {
						Core.user = response.data.user;
						Core.token = response.data.token;
						Core.STATE = "LOGGED_IN";
					}, function(response) {
						Core.loginButton();
						Core.STATE = "LOGGED_OUT";
					});
		}
	}

	Core.loginButton = function() {
		$http.get(
				Core.BASE_URL + "/login/google/url?redirect="
						+ encodeURIComponent(Core.LOGIN_REDIRECT)).then(
				function(response) {
					Core.LOGIN_URL = response.data;
					Core.STATE = "LOGGED_OUT";
				}, function(response) {
					Core.loginButton();
					Core.STATE = "ERROR";
				});
	}

	Core.initialize();

	return Core;
}
console.log("Registering CoreAPI");
module.factory("Core", CoreFactory);