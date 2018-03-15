var module = angular.module("lkticket.webb");

var ShowCtrl = function($scope, $routeParams, $http, User, Core) {

  Core.get("/shows/" + $routeParams.id).then(function(response) {
    $scope.show = response.data;
  }, function(error) {
    console.log(error);
  });
}

module.controller("ShowCtrl", ShowCtrl);
