

'use strict';

/* App Module */



// Declare app level module which depends on filters, and services


var app = angular.module('esFitApp', ['$strap.directives']);

app.controller('BodyCalcAppController', function($scope, $http) {

  $scope.button = {active: true};
  //$scope.buttonSelect = {price: '89,99', currency: '€'};
  $scope.checkbox = {left: false, middle: true, right: false};
  $scope.radio = {left: false, middle: true, right: false};
  $scope.radioValue = 'middle';

  $scope.client = {};
  $scope.master = {};

  $scope.clientstats= {};

  $scope.clientresults= {};

  $scope.sitenumber = 'threesite';
  $scope.clientgender = 'male';

  $scope.getSiteNumber = function() {
    console.log('getting sitenumber');
    return $scope.sitenumber;
  };

  $scope.getClientGender = function() {
    console.log('getting gender');
    return $scope.clientgender;
  };




});
