var module = angular.module("lkticket.webb", [ "ngRoute", "xeditable",
	"ngFileUpload"]);

module.run(function(editableOptions) {
	editableOptions.theme = 'bs3';
});
