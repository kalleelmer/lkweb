var module = angular.module("lkticket.admin");

var shows = [
    { name: 'Azurite'},
    { name: 'Bloodstone'},
    { name: 'Zircon'}
  ];

var ShowsCtrl = function($scope, $http, User) {

  this.shows = shows;

}

module.directive("showPanel", function() {
  return {
    restrict: "E",
    templateUrl: "/pages/shows/show-panel.html"
  };
});

module.controller("ShowsCtrl", ShowsCtrl);
