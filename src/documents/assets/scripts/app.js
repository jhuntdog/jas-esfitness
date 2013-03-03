
// window.client = {
//   age: 30,
//   weight: 160,
//   triceps: 0,
//   pectoral: 0,
//   midaxilla: 0,
//   subscapula: 0,
//   abdomen: 0,
//   suprailiac: 0,
//   quadriceps: 0
// };

var app = angular.module('esFitApp', ['$strap.directives']);

app.controller('BodyCalcFormController', function($scope, $http) {

  // $http.get('data/calc-fields.json').success(function(data) {
  //   $scope.client = data;
  // });

  $scope.button = {active: true};
  //$scope.buttonSelect = {price: '89,99', currency: '€'};
  $scope.checkbox = {left: false, middle: true, right: false};
  $scope.radio = {left: false, middle: true, right: false};
  $scope.radioValue = 'middle';

  $scope.datepicker = {date: ''};
  $scope.timepicker = {time: ''};

  // Calculation Controllers

  // pull in defined form values
  //$scope.client = $window.client;
  $scope.client = [{
    "age": "30",
    "weight": "160",
    "triceps": "0",
    "pectoral": "0",
    "midaxilla": "0",
    "subscapula": "0",
    "abdomen": "0",
    "suprailiac": "0",
    "quadriceps": "0"
  }];

  $scope.client = {};
  $scope.client.age = 30;
  $scope.client.weight = 160;
  $scope.client.triceps = 0;
  $scope.client.pectoral = 0;
  $scope.client.midaxilla = 0;
  $scope.client.subscapula = 0;
  $scope.client.abdomen = 0;
  $scope.client.suprailiac = 0;
  $scope.client.quadriceps = 0;

  $scope.client_Density = 0;
  $scope.client_LeanWeight = 0;
  $scope.client_FatWeight = 0;
  $scope.client_PercentFat = 0;
  $scope.client_PopulationAverage = 0;
  $scope.client_Score = 0;
  $scope.client_Rating = 0;

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


  $scope.calculate = function(client) {
    console.log('calculate function');
    $scope.clientstats= angular.copy(client);

    var stDev, percRegress, zScore, PE;
    var siteNumberChoice = $scope.sitenumber;
    var sexChoice = $scope.clientgender;
    var clientAge = client.age*1;
    var clientWeight = client.weight*1;
    var sumThreeMale = client.pectoral*1 + client.abdomen*1 + client.quadriceps*1;
    var sumThreeFemale = client.triceps*1 + client.suprailiac*1 + client.quadriceps*1;
    var sumSeven = client.triceps*1 + client.pectoral*1 + client.midaxilla*1 + client.subscapula*1 + client.abdomen*1 + client.suprailiac*1 + client.quadriceps*1;

    $scope.sumThreeMale = sumThreeMale;
    $scope.sumThreeFemale = sumThreeFemale;
    $scope.sumSeven = sumSeven;

    // calculation logic

    if (siteNumberChoice == "threesite" && sexChoice == "male") {
      densityValue = 1.10938-0.0008267*sumThreeMale+0.0000016 *Math.pow(sumThreeMale,2)-0.0002574*clientAge;
    } if (siteNumberChoice == "threesite" && sexChoice == "female") {
      densityValue = 1.0994921-0.0009929*sumThreeFemale+0.0000023 *Math.pow(sumThreeFemale,2)-0.0001392*clientAge;
    } if (siteNumberChoice == "sevensite" && sexChoice == "male") {
      densityValue = 1.112-0.00043499*sumSeven+0.00000055 *Math.pow(sumSeven,2)-0.00028826*clientAge;
    } if (siteNumberChoice == "sevensite" && sexChoice == "female") {
      densityValue = 1.097-0.00046971*sumSeven+0.00000056 *Math.pow(sumSeven,2)-0.00012828*clientAge;
    }

    percentFatValue = (4.95/densityValue*1-4.5)*100;
    fatWeightValue = clientWeight*percentFatValue/100;
    leanWeightValue = clientWeight-fatWeightValue;

    if (sexChoice == "male") {
      populationAverageValue = 13.815+0.13*clientAge;
    } if (sexChoice == "female") {
      populationAverageValue = 21.55+0.1*clientAge;
    }

    if (sexChoice == "male") {
      stDev = 6;
    } if (sexChoice == "female" && percentFatValue<=populationAverageValue) {
      stDev = 8;
    } if (sexChoice == "female" && percentFatValue>populationAverageValue) {
      stDev = 7;
    }

    zScore = (populationAverageValue - percentFatValue)/stDev;
    PE = Math.exp(-1.8355027*(Math.abs(zScore)-0.23073201));
    percRegress = -0.41682992*(PE-1)/(PE+1)+0.58953708;

    if (zScore > 0) {
      scoreValue = Math.round(percRegress*100);
    } if (zScore <= 0) {
      scoreValue = Math.round(1-percRegress*100);
    }

    if (zScore >= 1) {
      ratingValue = "Excellent";
    } if (zScore < 1 && zScore >= 0.5) {
      ratingValue = "Good";
    } if (zScore < 0.5 && zScore >= -0.5) {
      ratingValue = "Average";
    } if (zScore < -0.5 && zScore >= -1) {
      ratingValue = "Fair";
    } if (zScore < -1) {
      ratingValue = "Poor";
    }

    $scope.client_Density = Math.round( densityValue * 1000) / 1000;
    $scope.client_LeanWeight = Math.round( leanWeightValue * 1000) / 1000;
    $scope.client_FatWeight = Math.round( fatWeightValue * 1000) / 1000;
    $scope.client_PercentFat = Math.round( percentFatValue * 1000) / 1000;
    $scope.client_PopulationAverage = populationAverageValue;
    $scope.client_Score = scoreValue;
    $scope.client_Rating = ratingValue;
  };

  $scope.reset = function() {
    $scope.client = angular.copy($scope.master);
  };

  //$scope.reset();

  $scope.sumThreeMale = 0;

//BodyCalcFormController.$inject = ['$scope', '$http'];



});

