var module = angular.module("lkticket.admin", [ "ngRoute", "xeditable",
		"ngFileUpload" ]);

module.constant('CONFIG', (function() {
	return {}
})());

module.run(function(editableOptions) {
	editableOptions.theme = 'bs3';
});
