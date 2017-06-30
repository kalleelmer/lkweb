var module = angular.module("lkticket.admin");

var shows = [
    { name: 'Azurite', price: 2.95 },
    { name: 'Bloodstone', price: 5.95 },
    { name: 'Zircon', price: 3.95 }
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
