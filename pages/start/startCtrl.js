var module = angular.module("lkticket.webb");

var ShowCtrl = function($filter, $scope, $http, User, $routeParams, Core, $sce) {
  
  Core.get("/shows").then(function(response) {
    $scope.shows = response.data;
  }, function(error) {
    console.log(error);
  });

}

module.controller("StartCtrl", ShowCtrl);
