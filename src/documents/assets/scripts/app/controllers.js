'use strict';

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function BodyCalcCtrl($scope) {
  $scope.master= {sitenumber: 'threesite', gender: 'male'};


  $scope.calculate = function(client) {
    $scope.master= angular.copy(client);
  };

  $scope.reset = function() {
    $scope.client = angular.copy($scope.master);
  };

  $scope.isUnchanged = function(client) {
    $scope.ret = angular.equals(client, $scope.master);
    return $scope.ret;
  };

  $scope.reset();

}

