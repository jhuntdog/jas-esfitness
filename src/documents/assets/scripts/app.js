

var app = angular.module('esFitApp', ['$strap.directives']);

app.controller('StrapCtrl', function($scope) {
  $scope.radio = {tressite: true, sietesite: false};
  $scope.radioValue = 'tressite';

});