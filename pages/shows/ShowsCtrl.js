var module = angular.module("lkticket.admin");

var ShowsCtrl = function($scope, $http, User, Core) {

  Core.get("/shows").then(function(response) {
    $scope.shows = response.data;
  }, function(response) {
    alert("Kunde inte hämta nöjan: " + response.status);
  });

  this.deleteShow = function(id) {
    //todo radera från databas databas

  };

}

module.controller("ShowsCtrl", ShowsCtrl);
