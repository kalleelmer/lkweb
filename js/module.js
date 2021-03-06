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
