<!-- Do not copy any part of this script without permission; James T. Griffing, MS, BS; http://www.exrx.net //--><!-- 
function calc (form) {
var NS, S, SumSeven, SumThreeMale, SumThreeFemale, StandDev, PercRegress, Zscore, PE
NS=form.NumberSites.options[form.NumberSites.selectedIndex].value
S=form.Sex.options[form.Sex.selectedIndex].value
SumSeven=form.Triceps.value*1+form.Pectoral.value*1+form.Midaxilla.value*1+form.Subscapula.value*1+form.Abdomen.value*1+form.Suprailiac.value*1+form.Quadriceps.value*1
SumThreeMale=form.Pectoral.value*1+form.Abdomen.value*1+form.Quadriceps.value*1
SumThreeFemale=form.Triceps.value*1+form.Suprailiac.value*1+form.Quadriceps.value*1
  if (S == "Male" && NS=="7") {
     form.Density.value =
1.112-0.00043499*SumSeven+0.00000055 *Math.pow(SumSeven,2)-0.00028826*form.Age.value
}
  if (S == "Female" && NS=="7") {
     form.Density.value =
1.097-0.00046971*SumSeven+0.00000056 *Math.pow(SumSeven,2)-0.00012828*form.Age.value
}
  if (S == "Male" && NS=="3") {
     form.Density.value =
1.10938-0.0008267*SumThreeMale+0.0000016 *Math.pow(SumThreeMale,2)-0.0002574*form.Age.value
}
  if (S == "Female" && NS=="3") {
     form.Density.value =
1.0994921-0.0009929*SumThreeFemale+0.0000023 *Math.pow(SumThreeFemale,2)-0.0001392*form.Age.value
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
}
//--> 
