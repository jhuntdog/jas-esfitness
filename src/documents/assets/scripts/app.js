
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

app.controller('BodyCalcFormController', function($scope, $window) {

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
  // $scope.client = [{
  //   "age": "30",
  //   "weight": "160",
  //   "triceps": "0",
  //   "pectoral": "0",
  //   "midaxilla": "0",
  //   "subscapula": "0",
  //   "abdomen": "0",
  //   "suprailiac": "0",
  //   "quadriceps": "0"
  // }];

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



    $scope.client_Density = densityValue;
    $scope.client_LeanWeight = leanWeightValue;
    $scope.client_FatWeight = fatWeightValue;
    $scope.client_PercentFat = percentFatValue;
    $scope.client_PopulationAverage = populationAverageValue;
    $scope.client_Score = scoreValue;
    $scope.client_Rating = ratingValue;
  };

  $scope.reset = function() {
    $scope.client = angular.copy($scope.master);
  };

  //$scope.reset();

  $scope.sumThreeMale = 0;





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
  form.PercentFat.value = (4.95/form.Density.value-4.5)*100
  form.FatWeight.value = form.Weight.value*form.PercentFat.value/100
  form.LeanWeight.value = form.Weight.value-form.FatWeight.value
    if (S == "Male") {
       form.PopulationAverage.value =
  13.815+0.13*form.Age.value
  }
    if (S == "Female") {
       form.PopulationAverage.value =
  21.55+0.1*form.Age.value
  }
    if (S == "Male") {
       StandDev ="6"
  }
    if (S == "Female" && form.PercentFat.value<=form.PopulationAverage.value) {
       StandDev ="8"
  }
    if (S == "Female" && form.PercentFat.value>form.PopulationAverage.value) {
       StandDev ="7"
  }
  Zscore = (form.PopulationAverage.value-form.PercentFat.value)/StandDev
  PE= Math.exp(-1.8355027*(Math.abs(Zscore)-0.23073201))
  PercRegress= -0.41682992*(PE-1)/(PE+1)+0.58953708
    if (Zscore > 0) {
       form.Score.value =
       Math.round(PercRegress*100)
  }
    if (Zscore <= 0) {
       form.Score.value =
       Math.round((1-PercRegress)*100)
  }
    if (Zscore >= 1) {
       form.Rating.value ="Excellent"
  }
    if (Zscore < 1 && Zscore >= 0.5) {
       form.Rating.value ="Good"
  }
    if (Zscore < 0.5 && Zscore >= -0.5) {
       form.Rating.value ="Average"
  }
    if (Zscore < -0.5 && Zscore >= -1) {
       form.Rating.value ="Fair"
  }
    if (Zscore < -1) {
       form.Rating.value ="Poor"
  }

};

// client_Density
// client_LeanWeight
// client_FatWeight
// client_PercentFat
// client_PopulationAverage
// client_Score
// client_Rating