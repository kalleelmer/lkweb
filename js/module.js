var module = angular.module("lkticket.admin", [ "ngRoute", "xeditable",
	"ngFileUpload"]);

module.run(function(editableOptions) {
	editableOptions.theme = 'bs3';
});
