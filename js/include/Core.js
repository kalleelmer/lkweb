var module = angular.module("lkticket.admin");

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

var CoreFactory = function($http, $timeout) {
	var Core = {};
	Core.BASE_URL = "http://127.0.0.1:8080";
	Core.LOGIN_URL = null;
	Core.STATE = "WORKING";
	Core.LOGIN_REDIRECT = location.protocol + "//" + location.host
		+ location.pathname;
	Core.user = null;
	Core.token = sessionStorage["lkticket.api.token"];

	Core.initialize = function() {
		var state = findGetParameter("state");
		if (state && state.substring(0, 6) == "google") {
			console.log("Detected Google login");
			var code = findGetParameter("code");
			if (!code) {
				console.log("Invalid code");
			}
			$http.get(
				Core.BASE_URL + "/login/google/token?code=" + code
					+ "&redirect=" + Core.LOGIN_REDIRECT).then(
				function(response) {
					Core.user = response.data.user;
					Core.token = response.data.token;
					sessionStorage.setItem("lkticket.api.token", Core.token);
					Core.STATE = "LOGGED_IN";
					history.pushState(null, "index", "/");
				}, function(response) {
					history.pushState(null, "index", "/");
					Core.loginButton();
				});
		} else if (Core.token && Core.token != "null") {
			console.log("Using existing login token: " + Core.token);
			console.log(Core.token);
			Core.get("/users/current").then(function(response) {
				Core.user = response.data;
				Core.STATE = "LOGGED_IN";
			}, function(response) {
				console.log("Failed to use existing login token");
				Core.token = null;
				sessionStorage.setItem("lkticket.api.token", Core.token);
				Core.loginButton();
			});
		} else {
			console.log("No login detected");
			Core.loginButton();
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
				console.log("Failed to fetch login URL");
				Core.STATE = "ERROR";
				$timeout(Core.loginButton, 1000);
			});
	}

	Core.get = function(url) {
		return Core.request("GET", url, null);
	}

	Core.request = function(method, url, data) {
		var req = {
			method : method,
			url : Core.BASE_URL + url,
			headers : {
				"Authorization" : ("Token " + Core.token)
			},
			data : data
		};

		console.log("Making request to " + req.url);
		return $http(req);
	}

	Core.initialize();

	return Core;
}
console.log("Registering CoreAPI");
module.factory("Core", CoreFactory);