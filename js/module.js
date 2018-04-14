var module = angular.module("lkticket.webb", ["ngRoute", "xeditable",
	"ngFileUpload", "angular.filter", "ui-notification", 'angular-google-analytics'
]);

module.run(function(editableOptions) {
	editableOptions.theme = 'bs3';
});

module.config(function(NotificationProvider) {
	NotificationProvider.setOptions({
		delay: 5000,
		startTop: 67,
		startRight: 10,
		verticalSpacing: 20,
		horizontalSpacing: 20,
		positionX: 'right',
		positionY: 'bottom',
    maxCount: 3
	});
});

module.config(['AnalyticsProvider', function(AnalyticsProvider) {
	console.log("conf analytics");

	AnalyticsProvider.setAccount('UA-117433868-1'); //UU-XXXXXXX-X should be your tracking code
	AnalyticsProvider.useECommerce(true, true);
	AnalyticsProvider.setCurrency('SEK');
	AnalyticsProvider.readFromRoute(true);

}]).run(['Analytics', function(Analytics) {
	console.log("starting analytics");
}]);
