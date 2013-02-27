

var app = angular.module('esFitApp', ['$strap.directives']);

app.controller('BodyCalcCtrl', function($scope) {
  $scope.button = {active: true};
  $scope.buttonSelect = {price: '89,99', currency: '€'};
  $scope.checkbox = {left: false, middle: true, right: false};
  $scope.radio = {left: false, middle: true, right: false};
  $scope.radioValue = 'middle';

  $scope.datepicker = {date: ''};
  $scope.timepicker = {time: ''};


  $scope.sitenumber = 'threesite';
  $scope.clientgender = 'male';

  $scope.master = {};

  $scope.clientstats= {};

  $scope.calculate = function(client) {
    $scope.clientstats= angular.copy(client);
  };

  $scope.reset = function() {
    $scope.client = angular.copy($scope.master);
  };

  $scope.reset();


});