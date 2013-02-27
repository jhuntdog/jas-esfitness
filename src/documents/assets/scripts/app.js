

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

  $scope.getSiteNumber = function() {
    console.log('getting sitenumber');
    return $scope.sitenumber;
  };

  $scope.getClientGender = function() {
    console.log('getting gender');
    return $scope.clientgender;
  };

  $scope.master = {};

  $scope.clientstats= {};

  $scope.clientresults= {};

  $scope.client_Density = function() {
    //example -> do calculations here
    // return $scope.triceps + $scope.quads;
    //1.10938-0.0008267*SumThreeMale+0.0000016 *Math.pow(SumThreeMale,2)-0.0002574*bodyCalcForm.Age.value
  };

  $scope.calculate = function(client) {
    console.log('calculate function');
    $scope.clientstats= angular.copy(client);
  };



  $scope.reset = function() {
    $scope.client = angular.copy($scope.master);
  };

  $scope.reset();


});

function calculations () {

  // define variables
  var NS, S, SumSeven, SumThreeMale, SumThreeFemale, StandDev, PercRegress, Zscore, PE;
  NS=sitenumber.value;
  S=clientgender.value;
  SumSeven=bodyCalcForm.Triceps.value*1+bodyCalcForm.Pectoral.value*1+bodyCalcForm.Midaxilla.value*1+bodyCalcForm.Subscapula.value*1+bodyCalcForm.Abdomen.value*1+bodyCalcForm.Suprailiac.value*1+bodyCalcForm.Quadriceps.value*1;
  SumThreeMale=bodyCalcForm.Pectoral.value*1+bodyCalcForm.Abdomen.value*1+bodyCalcForm.Quadriceps.value*1;
  SumThreeFemale=bodyCalcForm.Triceps.value*1+bodyCalcForm.Suprailiac.value*1+bodyCalcForm.Quadriceps.value*1;

  if (S == "male" && NS=="sevensite") {
    bodyCalcForm.Density.value =
    1.112-0.00043499*SumSeven+0.00000055 *Math.pow(SumSeven,2)-0.00028826*bodyCalcForm.Age.value;
  }

  if (S == "female" && NS=="sevensite") {
    bodyCalcForm.Density.value =
    1.097-0.00046971*SumSeven+0.00000056 *Math.pow(SumSeven,2)-0.00012828*bodyCalcForm.Age.value
  }

  if (S == "male" && NS=="threesite") {
    bodyCalcForm.Density.value =
    1.10938-0.0008267*SumThreeMale+0.0000016 *Math.pow(SumThreeMale,2)-0.0002574*bodyCalcForm.Age.value
  }
  if (S == "female" && NS=="threesite") {
    bodyCalcForm.Density.value =
    1.0994921-0.0009929*SumThreeFemale+0.0000023 *Math.pow(SumThreeFemale,2)-0.0001392*bodyCalcForm.Age.value
  }

};

// client_Density
// client_LeanWeight
// client_FatWeight
// client_PercentFat
// client_PopulationAverage
// client_Score
// client_Rating