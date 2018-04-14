var module = angular.module("lkticket.webb");

var config = module.config(function(AnalyticsProvider, ENV) {
	console.log("conf analytics");

	AnalyticsProvider.setAccount(ENV.ANALYTICS.ID);
	AnalyticsProvider.useECommerce(true, true);
	AnalyticsProvider.setCurrency('SEK');
	AnalyticsProvider.readFromRoute(true);
});

config.run([ 'Analytics', function(Analytics) {
	console.log("starting analytics");
} ]);
