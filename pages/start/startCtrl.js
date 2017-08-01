var module = angular.module("lkticket.admin");

var ShowCtrl = function($filter, $scope, $http, User, $routeParams, Core, $sce) {

  var url = "http://dynamic.xkcd.com/api-0/jsonp/comic/" + Math.floor((Math.random() * 1800) + 1);

  $http.jsonp($sce.trustAsResourceUrl(url)).then(function(data) {
    console.log(data.data);
    $scope.comicStrip = data.data.img;
  }, function (data) {
    console.log(data);
  });

}

module.controller("StartCtrl", ShowCtrl);
