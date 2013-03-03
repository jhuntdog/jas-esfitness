
window.client = {
  age: 30,
  weight: 160,
  triceps: 10,
  pectoral: 10,
  midaxilla: 10,
  subscapula: 10,
  abdomen: 10,
  suprailiac: 10,
  quadriceps: 10
};

var NS, S, SumSeven, SumThreeMale, SumThreeFemale, StandDev, PercRegress, Zscore, PE;

var sumSeven=bodyCalcForm.clientTriceps*1+bodyCalcForm.clientPectoral*1+bodyCalcForm.clientMidaxilla*1+bodyCalcForm.clientSubscapula*1+bodyCalcForm.clientAbdomen*1+bodyCalcForm.clientSuprailiac*1+bodyCalcForm.clientQuadriceps*1;

var sumThreeMale = bodyCalcForm.clientPectoral*1 + bodyCalcForm.clientAbdomen*1 + bodyCalcForm.Quadriceps*1;




var app = angular.module('esFitApp', ['$strap.directives']);

app.controller('BodyCalcCtrl', function($scope) {
  $scope.button = {active: true};
  $scope.buttonSelect = {price: '89,99', currency: '€'};
  $scope.checkbox = {left: false, middle: true, right: false};
  $scope.radio = {left: false, middle: true, right: false};
  $scope.radioValue = 'middle';

  $scope.datepicker = {date: ''};
  $scope.timepicker = {time: ''};

  // Calculation Controllers

  $scope.sitenumber = 'threesite';
  $scope.clientgender = 'male';

  $scope.client = {};
  $scope.client.triceps = 0;
  $scope.client.pectoral = 0;
  $scope.client.midaxilla = 0;
  $scope.client.subscapula = 0;
  $scope.client.abdomen = 0;
  $scope.client.suprailiac = 0;
  $scope.client.quadriceps = 0;

  $scope.getSiteNumber = function() {
    console.log('getting sitenumber');
    return $scope.sitenumber;
  };

  $scope.getClientGender = function() {
    console.log('getting gender');
    return $scope.clientgender;
  };

  $scope.master = {};

  $scope.sumThreeMale = sumThreeMale;

  // $scope.bodyCalcForm = {
  //   "clientAge": '0',
  //   "clientWeight": '0',
  //   "clientTriceps": '0',
  //   "clientPectoral": '0',
  //   "clientMidaxilla": '0',
  //   "clientSubscapula": '0',
  //   "clientAbdomen": '0',
  //   "clientSuprailiac": '0',
  //   "clientQuadriceps": '0'
  // };

  $scope.clientstats= {};

  $scope.clientresults= {};

  $scope.client_Density = function() {
    //example -> do calculations here
    // return $scope.triceps + $scope.quads;
    //1.10938-0.0008267*SumThreeMale+0.0000016 *Math.pow(SumThreeMale,2)-0.0002574*bodyCalcForm.Age.value
  };

  // $scope.sumThreeMale = function() {
  //   $scope.$watch('one * two', function (value) {
  //       $scope.total = value;
  //   });
  // };

  // $scope.$watch('client.triceps*1 + client.pectoral*1 + client.midaxilla*1 + client.subscapula*1 + client.abdomen*1 + client.suprailiac*1 + client.quadriceps*1', function (value) {
  //   $scope.sumThreeMale = value;
  // });

  $scope.calculate = function(client) {
    console.log('calculate function');
    $scope.clientstats= angular.copy(client);
  };



  $scope.reset = function() {
    $scope.client = angular.copy($scope.master);
  };

  $scope.reset();


});

app.controller('BodyCalcFormController', function($scope, $window) {



  $scope.button = {active: true};
  $scope.buttonSelect = {price: '89,99', currency: '€'};
  $scope.checkbox = {left: false, middle: true, right: false};
  $scope.radio = {left: false, middle: true, right: false};
  $scope.radioValue = 'middle';

  $scope.datepicker = {date: ''};
  $scope.timepicker = {time: ''};

  // Calculation Controllers

  // pull in defined form values
  $scope.client = $window.client;

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

});


function BodyCalcFormController($scope) {

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

  $scope.client = {};

  $scope.client.age = "0";

  $scope.client.triceps = 0;
  $scope.client.pectoral = 0;
  $scope.client.midaxilla = 0;
  $scope.client.subscapula = 0;
  $scope.client.abdomen = 0;
  $scope.client.suprailiac = 0;
  $scope.client.quadriceps = 0;

  $scope.clientstats= {};

  $scope.clientresults= {};

   $scope.calculate = function(client) {
    console.log('calculate function');
    $scope.clientstats= angular.copy(client);
  };



  $scope.reset = function() {
    $scope.client = angular.copy($scope.master);
  };

  $scope.reset();

}

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