var module = angular.module("lkticket.webb", [ "ngRoute", "xeditable",
	"ngFileUpload", "angular.filter"]);

module.run(function(editableOptions) {
	editableOptions.theme = 'bs3';
});
