var module = angular.module("lkticket.admin");

var ShowsCtrl = function($scope, $http, User, Core) {

  Core.get("/shows").then(function(response) {
    $scope.shows = response.data;
  }, function(response) {
    alert("Kunde inte hämta nöjan: " + response.status);
  });

  $scope.toggleEditMode = function(show) {
		show.editToggle = !show.editToggle;
	}

  $scope.editNameOfShow = function(show) {
    //TODO Lösa riktigt mot databasen
    $scope.toggleEditMode(show);
  }

  $scope.deleteShow = function(show){
    //TODO Lösa riktigt mot databasen
    $scope.shows.splice($scope.shows.indexOf(show),1);
  }

  $scope.addNewShow = function(show) {
    //TODO koppla mot api
    $scope.shows.push(show);
  }

}

module.controller("ShowsCtrl", ShowsCtrl);
